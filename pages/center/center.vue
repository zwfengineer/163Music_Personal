<template>
	<view class="main_container">
		<uni-row>
			<uni-col :span='8' :offset="8">
				<view class="avatar_container" @click="tologin">
					<image class="avatar" :src="account.status==0?profile.avatarUrl:'../../static/logo.png'"></image>
					<text>{{account.status==0?profile.nickname:"未登录"}}</text>
				</view>
			</uni-col>
		</uni-row>
	</view>
</template>

<script setup>
	import {
		storeToRefs
	} from "pinia"
	import useUserStore from "@/store/user.js"
	import pinia from "@/store/index.js"
	import {
		computed,
		ref
	} from "vue";
	const userStore = useUserStore(pinia)
	const pages = getCurrentPages()
	const page = pages.pop().$page
	const {
		account,
		profile
	} = storeToRefs(userStore)
	const tologin = () => {
		let path = encodeURI(page.fullPath)
		console.log(page,page.fullPath)
		uni.navigateTo({
			url: `/pages/login/login?redirect=${path}`,
		})
		
	}
</script>

<style lang="less">
	.avatar {
		// background-color: red;
		height: 50px;
		width: 50px;
	}

	.avatar_container {
		display: flex;
		width: 100%;
		flex-direction: column;
		align-items: center;
	}
</style>
