<template>
	<view class="container">
		<!-- #ifdef H5 -->
		<video class="video" :src="src" :controls="props.controls" :id="props.id" :data-vid="props.id"
			@timeupdate="timeupdate" @ended="ended" :key="props.id">
		</video>
		<!-- #endif -->
		<!-- #ifdef APP -->
		<view class="videoContainer" :prop="option" :ctx="ctx" :change:prop="videoContainer.update"
			:change:ctx="videoContainer.updatectx" :vinfo="info" :change:vinfo="videoContainer.updatevinfo"></view>
		<!-- #endif -->
	</view>
</template>

<script setup>
	import {
		defineComponent,
		computed,
		// defineProps,
		getCurrentInstance,
		onMounted,
		ref
	} from "vue"
	const props = defineProps(['controls', 'id', 'key', 'info', 'CusContext'])
	const emit = defineEmits(['timeupdate', 'ended'])
	const ctx = ref("")
	const option = props
	const src = computed(() => {
		return props.info ? props.info.url : ""
	})
	const info = computed(() => {
		return props.info ? props.info : ""
	})
	const context = {
		id: props.id,
		src: src.value,
		type: "ctx",
		play: () => {
			ctx.value = {ctrl:'play'}
		},
		pause: () => {
			ctx.value = {ctrl:'pause'}
		},
		stop: () => {
			ctx.value = {ctrl:'stop'}
		},
		seek:(val)=>{
			ctx.value = {ctrl:'seek',time:val}
		}
	}
	onMounted(() => {
		// #ifdef APP
		props.CusContext.set(context)
		
		// #endif

	})
</script>
<script>
	// #ifdef APP
	export default defineComponent({
		mounted() {
			this.$props.play = true
		},
		methods: {
			timeupdate(event) {
				this.$emit("timeupdate", {
					vid: event.dataset,
					currentTime: event.timeStamp
				})
			},
			ended(event) {
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
	// #ifdef APP
	export default {
		mounted() {
			this.init()
		},
		data() {
			return {
				staus: "",
				option:""
			}
		},
		methods: {
			video() {
				let video = document.createElement("video")
				video.className = "video"
				video.src = this.option.info ? this.option.info.url : ''
				video.controls = this.option.controls
				video.id = this.option.id
				video.addEventListener("timeupdate", this.timeupdate)
				video.addEventListener("ended", this.ended)
				video.addEventListener("loadeddata", this.loaded)
				video.addEventListener("canplaythrough", this.canplaythrough)
				this.video = video
				return video
			},
			init() {
				let container = this.$ownerInstance.$el.querySelector(".videoContainer")
				// if(this.status.ctrl=='play') this.video.play()
				container.append(this.video())
			},
			update(nv) {
				this.option = nv
			},
			updatectx(nv) {
				this.status = nv
				if(this.video){
					switch (this.status.ctrl){
						case 'play':
							this.video.play()
							break;
						case 'pause':
							this.video.pause()
							break;
						case 'stop':
							this.video.pause()
							break;
						case 'seek':
							this.video.seek(this.status.val)
							break;
						default:
							break;
					}
				}
			},
			updatevinfo(nv) {
				this.info = nv
				this.video.src = this.info.url
			},
			timeupdate(event) {
				this.$ownerInstance.callMethod("timeupdate", event)
			},
			ended(event) {
				this.$ownerInstance.callMethod("ended", event)
			},
			loaded(event) {
				// console.log("loaded")
			},
			canplaythrough(event) {
				switch (this.status.ctrl) {
					case "play":
						this.video.play()
						break;
					default:
						break;
				}
			}
		},
	}
	// #endif
</script>
<style>
	video {
		width: 100%
	}
</style>
