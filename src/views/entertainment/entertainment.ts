import { Component, Mixins } from 'vue-property-decorator'
import { SubPage } from '@/mixins/subpage'

@Component
export default class Entertainment extends Mixins(SubPage) {
}
