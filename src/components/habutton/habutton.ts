import { Component, Mixins, Prop } from 'vue-property-decorator'
import { Service } from '@/models/events'
import { HaEntity } from '@/mixins/entity'
import { CALL_SERVICE } from '@/helpers/api'

@Component
export default class HaButton extends Mixins(HaEntity) {
  @Prop({type: String})
  public icon!: string

  @Prop({type: Number, default: 1000})
  public onDuration!: number

  protected state: boolean = false
  protected validDomains: string[] = ['scene', 'script']

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
      domain: this.domain,
      service: this.action,
      entityId: this.entityId
    }
  }

  protected toggle() {
    this.$bus.$emit(CALL_SERVICE, this.service)
    this.state = true

    setTimeout(() => {
      this.state = false
    }, this.onDuration)
  }
}
