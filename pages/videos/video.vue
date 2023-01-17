<template>
	<view class="container">
		<!-- #ifdef H5 -->
		<video class="video" :src="props.src" :controls="props.controls" :id="props.id" :data-vid="props.id"
			@timeupdate="emit('timeupdate')" @ended="emit('ended')" :key="props.id">
		</video>
		<!-- #endif -->
		<!-- #ifdef APP || APP-PLUS -->
		<view class="videoContainer"></view>
		<!-- #endif -->
	</view>
</template>

<script setup>
	import {
		defineProps
	} from "vue"
	const props = defineProps(['controls', 'id', 'key', 'src'])
	const emit = defineEmits(['timeupdate', 'ended'])
</script>
<script moduld="videoContainer" lang="renderjs">
	export default{
		mounted(){
			console.log("renderjs")
		},
	}
</script>
<style>

</style>
