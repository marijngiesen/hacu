import Vue from 'vue'

const bus = new Vue()

export class EventBus {
  public static setup() {
    Object.defineProperties(Vue.prototype, {
      $bus: {
        get: () => {
          return bus
        }
      }
    })
  }
}

export default bus
