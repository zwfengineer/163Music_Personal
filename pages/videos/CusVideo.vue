<template>
	<view class="container">
		<!-- #ifdef H5 -->
		<video class="video" :src="props.src" :controls="props.controls" :id="props.id" :data-vid="props.id"
			@timeupdate="timeupdate" @ended="props.ended" :key="props.id">
		</video>
		<!-- #endif -->
		<!-- #ifdef APP || APP-PLUS -->
		<view class="videoContainer" :prop="option" :change:prop="videoContainer.update"></view>
		<!-- #endif -->
	</view>
</template>

<script setup>
	import {
		defineComponent,
		defineProps,
		getCurrentInstance,
		onMounted
	} from "vue"
	const props = defineProps(['controls', 'id', 'key', 'src'])
	const emit = defineEmits(['timeupdate', 'ended'])
	const option = props
	const timeupdate = (event) => {
		console.log("video timeupdate")
		emit('timeupdate', {
			vid: event.currentTarget.dataset,
			currentTime: event.detail.currentTime
		})
	}
	const ended = (event) => {
		emit('ended', event)
	}
</script>
<script>
	// #ifdef APP
	export default defineComponent({
		mounted(){
			console.log(this)
		},
		data() {
			return {
				context:null
			}
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
			setContext(){
				// let video = this.$el.querySelector("video")
				console.log(this)
			}
		}
	})
	// #endif
</script>
<script module="videoContainer" lang="renderjs">
	export default {
		mounted() {
			// console.log(this)
			this.init()
		},
		methods: {
			video() {
				let video = document.createElement("video")
				video.className = "video"
				video.src = this.option.src
				video.controls = this.option.controls
				video.id = this.option.id
				video.ontimeupdate = this.timeupdate
				video.onended = this.ended
				return video
			},
			init() {
				let container = this.$ownerInstance.$el.querySelector(".videoContainer")
				container.append(this.video())
				this.setcontext()
			},
			update(nv) {
				this.option = nv
			},
			timeupdate(event) {
				this.$ownerInstance.callMethod("timeupdate", event)
			},
			ended(event) {
				this.$ownerInstance.callMethod("ended", event)
			},
			setcontext(){
				this.$ownerInstance.callMethod("setContext")
			}
		}
	}
</script>
<style>

</style>
