import { Component, Mixins, Prop } from 'vue-property-decorator'
import { HaEntity } from '@/mixins/entity'
import { ENTITY_STATECHANGE } from '@/helpers/api'

@Component
export default class HaSensor extends Mixins(HaEntity) {
  @Prop({type: String})
  public unit!: string

  protected value: any = null
  protected displayUnit: string|null = this.unit || null
  protected validDomains: string[] = ['sensor']

  public created() {
    this.$bus.$on(`${ENTITY_STATECHANGE}${this.entityId}`, (state: any) => {
      this.value = state.state

      if (this.displayUnit === null) {
        this.displayUnit = state.attributes.unit_of_measurement
      }

      console.log('Received state update')
      console.log(state)
    })
  }

}
