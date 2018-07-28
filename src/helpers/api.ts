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
export const RESULT_ERROR: string = 'result_error'
export const AUTH_REQUIRED: string = 'auth_required'
export const ENTITY_STATECHANGE: string = 'entity_'
export const AUTH_LOGIN: string = 'auth_login'
export const CALL_SERVICE: string = 'call_service'
export const RELOAD_STATES: string = 'reload_states'
export const REGISTER_ENTITY: string = 'register_entity'

function getSocket(url: string, isReconnect: boolean = false) {
  function connect(resolve: any, reject: any) {
    const socket: WebSocket = new WebSocket(url)

    const closeHandler = () => {
      if (!isReconnect) {
        return
      }

      socket.removeEventListener('close', closeHandler)

      setTimeout(() => connect(resolve, reject), 1000)
    }

    const messageHandler = (event: any) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case 'auth_required':
          console.log('Not yet implemented')
          break
        case 'auth_ok':
          socket.removeEventListener('message', messageHandler)
          socket.removeEventListener('close', closeHandler)
          socket.removeEventListener('error', closeHandler)
          resolve(socket)
          break
        default:
          console.log(`Received unhandled message type ${message.type}`)
      }
    }

    socket.addEventListener('message', messageHandler)
    socket.addEventListener('close', closeHandler)
    socket.addEventListener('error', closeHandler)
  }

  return new Promise<WebSocket>((resolve, reject) => connect(resolve, reject));
}

export default class Api {
  private url!: string
  private webSocket: WebSocket | null = null
  private connected: boolean = false
  private subscribed: boolean = false
  private reconnecting: boolean = false
  private messageId: number = 1
  private messageHistory: string[] = []
  private entityRegistry: string[] = []
  private stateHistory: string[] = []

  constructor() {
    this._setupEventListeners()
  }

  public connect(url: string) {
    this.url = `ws://${url}/api/websocket`
    this._connect()
  }

  public getStates() {
    this._call({type: 'get_states'})
  }

  public subscribeEvents(eventType: string = 'state_changed') {
    this._call({type: 'subscribe_events', event_type: eventType})
  }

  public callService(domain: string, service: string, entityId?: string) {
    const command = {type: 'call_service', domain, service, service_data: {}}
    if (domain !== 'script') {
      command.service_data = {entity_id: entityId}
    }

    console.log(`Calling service ${domain} - ${service} - ${entityId}`)
    console.log(command)
    this._call(command)
  }

  private _connect() {
    getSocket(this.url, this.reconnecting).then((socket) => {
      this.webSocket = socket

      console.log('Websocket connected')
      bus.$emit(SOCK_CONNECTED)

      // Set connection status
      this.connected = true
      this.reconnecting = false
      this.subscribed = false

      this._setupSocketListeners()
      this.getStates()
    })
  }

  private _call(message: any) {
    if (!this.connected) {
      console.log('Websocket connection not ready!')
      return
    }

    // Add unique identifier to message and add it to history
    message = this._prepare(message)
    this.webSocket!.send(message)
  }

  private _prepare(message: any) {
    message.id = this.messageId
    this.messageHistory[this.messageId] = message.type
    this.messageId++

    return JSON.stringify(message) + '\n'
  }

  private _onMessage(message: any) {
    const data = JSON.parse(message.data)

    switch (data.type) {
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

    delete this.messageHistory[data.id]

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

  private _reconnect() {
    // Reset message history
    this.messageHistory = []
    this.messageId = 1

    this.reconnecting = true
    this.subscribed = false

    this._connect()
  }

  private _setupEventListeners() {
    bus.$on(REGISTER_ENTITY, (entityId: string) => {
      if (this.entityRegistry.indexOf(entityId) !== -1) {
        console.log(`Entity already registered ${entityId}`)
        return
      }

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
    this.webSocket!.onclose = (status: any) => {
      this.connected = false
      bus.$emit(SOCK_DISCONNECTED)

      switch (status) {
        case 1000:
          console.log('Socket closed')
          break
        default:
          console.log('Socket closed, reconnecting...')
          setTimeout(() => this._reconnect(), 2000)
      }
    }

    this.webSocket!.onmessage = (message: any) => {
      this._onMessage(message)
    }
  }
}
