declare module '*.vue' {
  import Vue from 'vue';

  export default Vue;
}

declare module 'vue-awesome/components/Icon' {
    export class Icon {
    }
}

declare module 'vue-eventbus' {
    module 'vue/types/vue' {
        interface Vue {
            $bus: Vue
        }
    }
}
