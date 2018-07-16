import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { REGISTER_ENTITY, RELOAD_STATES } from '@/helpers/api'

@Component
export class SubPage extends Vue {
  public mounted() {
    this.$bus.$emit(RELOAD_STATES)
  }
}
