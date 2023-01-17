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
		defineProps
	} from "vue"
	const props = defineProps(['controls', 'id', 'key', 'src'])
	const emit = defineEmits(['timeupdate', 'ended'])
	const option = props
	const timeupdate = (event) => {
		emit('timeupdate', {
			vid: event.currentTarget.dataset,
			currentTime: event.detail.currentTime
		})
	}
	const ended = (event) => {
		emit('ended', event)
	}
</script>
<script module="videoContainer" lang="renderjs">
	export default{
		mounted(){
			this.init()
		},
		methods:{
			video(){
				let video = document.createElement("video")
				video.className = "video"
				video.src = this.option.src
				video.controls = this.option.controls
				video.id = this.option.id
				return video
			},
			init(){
				let container = this.$ownerInstance.$el.querySelector(".videoContainer")
				container.append(this.video())
			},
			update(nv){
				this.option = nv
			}
		}
	}
</script>
<style>

</style>
