import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import Api, { RELOAD_STATES } from '@/helpers/api'

@Component
export default class App extends Vue {
  private api: Api = new Api()

  public mounted() {
    // TODO: Find a way to load the URL from a config file
    this.api.connect('localhost:8123')
    // this.api.connect('192.168.1.4:8123')
  }

  public reloadStates() {
    this.$bus.$emit(RELOAD_STATES)
  }
}
