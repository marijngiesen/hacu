import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import Api, { RELOAD_STATES } from '@/helpers/api'
import Axios from 'axios'

@Component
export default class App extends Vue {
  private readonly api: Api = new Api()

  public mounted() {
    // TODO: Load URL from a config file
    Axios.get('/config.json')
      .then((response: any) => {
        this.api.connect(response.data.ha_url, response.data.auth_token)
      })
  }

  public reloadStates() {
    this.$bus.$emit(RELOAD_STATES)
  }
}
