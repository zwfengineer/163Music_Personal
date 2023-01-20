<template>
	<view class="container">
		<!-- #ifdef H5 -->
		<video class="video" :src="props.src" :controls="props.controls" :id="props.id" :data-vid="props.id"
			@timeupdate="timeupdate" @ended="ended" :key="props.id">
		</video>
		<!-- #endif -->
		<!-- #ifdef APP || APP-PLUS -->
		<view class="videoContainer" :prop="option" :ctx="ctx" :change:prop="videoContainer.update"
			:change:ctx="videoContainer.updatectx"></view>
		<!-- #endif -->
	</view>
</template>

<script setup>
	import {
		defineComponent,
		defineProps,
		getCurrentInstance,
		onMounted,
		ref
	} from "vue"
	const props = defineProps(['controls', 'id', 'key', 'src'])
	const emit = defineEmits(['timeupdate', 'ended'])
	const ctx = ref("")
	const option = props
	const context = {
		id: props.id,
		src: props.src,
		play: () => {
			ctx.value = 'play'
		},
		pause: () => {
			ctx.value = 'pause'
		},
		stop: () => {
			ctx.value = 'stop'
		}
	}
	onMounted(() => {
		context.play()
	})
</script>
<script>
	// #ifdef APP
	export default defineComponent({
		mounted() {
			this.$props.play = true
			console.log(this.videoContainer)
		},
		methods: {
			timeupdate(event) {
				this.$emit("timeupdate", {
					vid: event.dataset,
					currentTime: event.timeStamp
				})
			},
			ended(vent) {
				this.$emit("ended", {
					vid: event.dataset,
					currentTime: event.timeStamp
				})
			},
			setContext() {}
		}
	})
	// #endif
</script>
<script module="videoContainer" lang="renderjs">
	// #ifdef APP-PLUS||APP


	export default {
		mounted() {
			this.init()
		},
		methods: {
			video() {
				let video = document.createElement("video")
				video.className = "video"
				video.src = this.option.src
				video.controls = this.option.controls
				video.id = this.option.id
				video.addEventListener("timeupdate", this.timeupdate)
				video.addEventListener("ended", this.ended)
				video.addEventListener("loadeddata", this.loaded)
				video.addEventListener("canplaythrough", this.canplaythrough)
				// video.ontimeupdate = this.timeupdate
				// video.onended = this.ended
				// video.loadeddata = this.loaded
				// video.canplay = this.canplay
				this.video = video
				return video
			},
			init() {
				let container = this.$ownerInstance.$el.querySelector(".videoContainer")
				container.append(this.video())
			},
			update(nv) {
				this.option = nv
			},
			updatectx(nv) {
				this.status = nv
				// console.log(nv)
			},
			timeupdate(event) {
				console.log(event)
				this.$ownerInstance.callMethod("timeupdate", event)
			},
			ended(event) {
				console.log(event)
				this.$ownerInstance.callMethod("ended", event)
			},
			loaded(event) {
				console.log("loaded")
				// switch (this.status){
				// 	case "play":
				// 	this.video.play()
				// 		break;
				// 	default:
				// 		break;
				// }
			},
			canplaythrough(event) {
				console.log("canplay")
				switch (this.status) {
					case "play":
						this.video.play()
						break;
					default:
						break;
				}
			}
		}
	}
	// #endif
</script>
<style>

</style>
