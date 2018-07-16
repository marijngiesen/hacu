import { Component, Mixins, Prop } from 'vue-property-decorator'
import { Service } from '@/models/events'
import { HaEntity } from '@/mixins/entity'
import { CALL_SERVICE, ENTITY_STATECHANGE } from '@/helpers/api'

@Component
export default class HaSwitch extends Mixins(HaEntity) {
  @Prop({type: String})
  public icon!: string

  protected state: boolean = false
  protected validDomains: string[] = ['group', 'input_boolean', 'light', 'scene', 'script', 'switch']

  get action(): string {
    switch (this.domain) {
      case 'script':
        return this.entityId.split('.')[1]
      default:
        return this.state ? 'turn_off' : 'turn_on'
    }
  }

  get service(): Service {
    return {
      domain: this.domain === 'group' ? 'homeassistant': this.domain,
      service: this.action,
      entityId: this.entityId
    }
  }

  public created() {
    this.$bus.$on(`${ENTITY_STATECHANGE}${this.entityId}`, (state: any) => {
      this.state = state.state === 'on'
      console.log('Received state update')
      console.log(state)
    })
  }

  protected toggle() {
    this.$bus.$emit(CALL_SERVICE, this.service)
  }
}
