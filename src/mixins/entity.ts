import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { REGISTER_ENTITY } from '@/helpers/api'

@Component
export class HaEntity extends Vue {
  @Prop({type: String, required: true})
  public name!: string

  @Prop({type: String, required: true})
  public entityId!: string

  protected validDomains: string[] = []

  get domain(): string {
    return this.entityId.split('.')[0]
  }

  get entity(): string {
    return this.entityId.split('.')[1]
  }

  public created() {
    // Do some simple validation on entityId
    if (this.validDomains.indexOf(this.domain) !== -1) {
      this.$bus.$emit(REGISTER_ENTITY, this.entityId)
    } else {
      console.log(`Error: invalid entityId ${this.entityId}`)
    }
  }
}
