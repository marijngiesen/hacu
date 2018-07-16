import { Component, Mixins } from 'vue-property-decorator'
import { SubPage } from '@/mixins/subpage'

@Component
export default class Climate extends Mixins(SubPage) {
}
