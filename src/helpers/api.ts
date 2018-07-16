import bus from '@/helpers/bus'
import { Service } from '@/models/events'

/*
Events
------
OUT:
- sock_connected     => <empty>
- sock_disconnected  => <empty>
- sock_error         => string (the error)
- result_error       => object (the error)
- auth_required      => <empty>
- entity_<entity_id> => HaEntity

IN:
- auth_login      => { username, password }
- call_service    => Service
- reload_states   => <empty>
- register_entity => entity_id
 */

export const SOCK_CONNECTED: string = 'sock_connected'
export const SOCK_DISCONNECTED: string = 'sock_disconnected'
export const SOCK_ERROR: string = 'sock_error'
export const RESULT_ERROR: string = 'result_error'
export const AUTH_REQUIRED: string = 'auth_required'
export const ENTITY_STATECHANGE: string = 'entity_'
export const AUTH_LOGIN: string = 'auth_login'
export const CALL_SERVICE: string = 'call_service'
export const RELOAD_STATES: string = 'reload_states'
export const REGISTER_ENTITY: string = 'register_entity'

export default class Api {
  private webSocket!: WebSocket
  private connected: boolean = false
  private ready: boolean = false
  private subscribed: boolean = false
  private messageId: number = 1
  private messageHistory: string[] = []
  private entityRegistry: string[] = []
  private stateHistory: string[] = []

  constructor() {
    this._setupEventListeners()
  }

  public connect(url: string) {
    this.webSocket = new WebSocket(`ws://${url}/api/websocket`)
    this._setupSocketListeners()
  }

  public getStates() {
    this._call({type: 'get_states'})
  }

  public subscribeEvents(eventType: string = 'state_changed') {
    this._call({type: 'subscribe_events', event_type: eventType})
  }

  public callService(domain: string, service: string, entityId?: string) {
    let command = {type: 'call_service', domain: domain, service: service, service_data: {}}
    if (domain !== 'script') {
      command.service_data = {entity_id: entityId}
    }

    console.log(`Calling service ${domain} - ${service} - ${entityId}`)
    console.log(command)
    this._call(command)
  }

  private _call(message: any) {
    if (!this.ready) {
      console.log('Websocket connection not ready!')
      return
    }

    // Add unique identifier to message
    message = this._addUniqueId(message)

    this.webSocket.send(JSON.stringify(message) + '\n')
  }

  private _addUniqueId(message: any) {
    message.id = this.messageId
    this.messageHistory[this.messageId] = message.type
    this.messageId++

    return message
  }

  private _onMessage(message: any) {
    const data = JSON.parse(message.data)

    switch (data.type) {
      case 'auth_ok':
        this.ready = true
        this.getStates()
        break
      case 'auth_required':
        bus.$emit(AUTH_REQUIRED)
        break
      case 'result':
        this._handleResult(data)
        break
      case 'event':
        this._handleEvent(data)
    }
  }

  private _handleResult(data: any) {
    // Check if result is success, else emit an error
    if (!data.success) {
      bus.$emit(RESULT_ERROR, data.error)
      return
    }

    // Lookup message type
    const type = this.messageHistory[data.id]
    if (type === undefined) {
      bus.$emit(RESULT_ERROR, {message: 'Cannot find the source message'})
      return
    }

    switch (type) {
      case 'get_states':
        // Update all entities
        this._emitStates(data.result)

        // Subscribe to events
        if (!this.subscribed) {
          this.subscribeEvents()
        }
        break
      case 'subscribe_events':
        this.subscribed = true
        break
      case 'camera_thumbnail':
        break
      case 'media_player_thumbnail':
        break
    }
  }

  private _handleEvent(data: any) {
    const eventData = data.event.data
    const entityIndex = this.entityRegistry.indexOf(eventData.entity_id)

    // Check if state has actually changed to prevent unnecessary events
    if (eventData.new_state.state === this.stateHistory[entityIndex]) {
      console.log(`State event: ${eventData.entity_id} new_state.state equals cached state, ignoring`)
      return
    }

    this._emitState(eventData.new_state)
  }

  private _emitStates(states: any[]) {
    for (const state of states) {
      this._emitState(state)
    }
  }

  private _emitState(state: any) {
    const entityIndex = this.entityRegistry.indexOf(state.entity_id)
    if (entityIndex === -1) {
      return
    }

    this.stateHistory[entityIndex] = state.state

    bus.$emit(`${ENTITY_STATECHANGE}${state.entity_id}`, state)
  }

  private _setupEventListeners() {
    bus.$on(REGISTER_ENTITY, (entityId: string) => {
      this.entityRegistry.push(entityId)
    })
    bus.$on(AUTH_LOGIN, (login: object) => {
      console.log('Not implemented yet')
    })
    bus.$on(CALL_SERVICE, (service: Service) => {
      this.callService(service.domain, service.service, service.entityId)
    })
    bus.$on(RELOAD_STATES, () => {
      this.getStates()
    })
  }

  private _setupSocketListeners() {
    this.webSocket.onopen = () => {
      bus.$emit(SOCK_CONNECTED)
      console.log('Socket connected')
      this.connected = true
    }
    this.webSocket.onclose = () => {
      bus.$emit(SOCK_DISCONNECTED)
      console.log('Socket disconnected')
      this.connected = false
    }
    this.webSocket.onerror = (error: any) => {
      bus.$emit(SOCK_ERROR, error)
      console.log('Socket error: ' + error)
    }

    this.webSocket.onmessage = (message: any) => {
      this._onMessage(message)
    }
  }
}
