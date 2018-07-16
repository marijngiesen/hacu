import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'

@Component
export default class Clock extends Vue {
    @Prop({type: Boolean, default: true})
    public showDate!: boolean

    @Prop({type: Boolean, default: false})
    public is12Hour!: boolean

    @Prop({type: String, default: 'nl-NL'})
    public locale!: string

    private currentTime: string = 'updating'
    private currentDate: string = 'updating'

    public mounted() {
        this.updateCurrentTime()
        setInterval(() => {
            this.updateCurrentTime()
        }, 1000)
    }

    private updateCurrentTime() {
        const datetime = new Date()
        this.currentTime = `${('0' + datetime.getHours()).slice(-2)}:${('0' + datetime.getMinutes()).slice(-2)}`
        this.currentDate = datetime.toLocaleDateString(this.locale)
    }
}
