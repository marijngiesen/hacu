import { Component, Mixins, Prop } from 'vue-property-decorator'
import { HaEntity } from '@/mixins/entity'
import { ENTITY_STATECHANGE } from '@/helpers/api'

@Component
export default class HaPresence extends Mixins(HaEntity) {
  @Prop({type: String})
  public icon!: string

  get location(): string {
    return this.state === 'not_home' ? 'away' : this.state
  }

  protected state: string = ''
  protected validDomains: string[] = ['device_tracker']

  public created() {
    this.$bus.$on(`${ENTITY_STATECHANGE}${this.entityId}`, (state: any) => {
      this.state = state.state
      console.log('Received state update')
      console.log(state)
    })
  }
}
