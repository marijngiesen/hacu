import Vue from 'vue'
// import Buefy from 'buefy'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

import { EventBus } from '@/helpers/bus'

import App from '@/app'
import router from '@/router'

import PageLink from '@/components/pagelink/pagelink'
import Clock from '@/components/clock/clock'
import HaButton from '@/components/habutton/habutton'
import HaSensor from '@/components/hasensor/hasensor'
import HaSwitch from '@/components/haswitch/haswitch'

EventBus.setup()
// Vue.use(Buefy)
Vue.component('icon', Icon)
Vue.component('page-link', PageLink)
Vue.component('clock', Clock)
Vue.component('ha-button', HaButton)
Vue.component('ha-sensor', HaSensor)
Vue.component('ha-switch', HaSwitch)
Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
