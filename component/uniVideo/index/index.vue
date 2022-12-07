<template>
	<view>
		<video :src="src"></video>
	</view>
</template>

<script setup>
	import {defineProps} from "vue"
	defineProps(['src','click'])
</script>

<style>

</style>
