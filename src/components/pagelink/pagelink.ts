import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class PageLink extends Vue {
  @Prop({type: String, required: true})
  public url!: string

  @Prop({type: String})
  public name!: string

  @Prop({type: String, default: 'cogs'})
  public icon!: string
}
