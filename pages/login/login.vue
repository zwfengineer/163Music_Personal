<template>
	<view class="main">
		<view class="main_container">
			<view class="user">
				<uni-row>
					<uni-col :span='8'>
						<view class="title">
							<text>用户名</text>
						</view>
						<view class="title">
							<text>密码</text>
						</view>
					</uni-col>
					<uni-col :span='12'>
						<input type="text" v-model="phone">
						<input password type="text" v-model="password">
					</uni-col>
				</uni-row>
				<uni-row>
					<uni-col>
						<button @click="login">登录</button>
					</uni-col>
					<uni-col>
						<button @click="back">取消</button>
					</uni-col>
				</uni-row>
			</view>
		</view>
	</view>
</template>

<script setup>
	import useUserStore from "@/store/user.js"
	import {
		ref
	} from "vue";
	import pinia from "../../store";


	const phone = ref('15132892786')
	const password = ref('S9uksLYaAZp83Kb')
	const userStore = useUserStore(pinia)
	const login = async () => {
		// await userStore.reqLogin({
		// 	phone: phone.value,
		// 	password: password.value
		// })
		await userStore.reqGetStatus()
		back()
	}
	const back = () => {
		uni.navigateBack({
			detail: 1
		});
	}
</script>

<style lang="less">
	.main_container {
		width: 100%;
		height: 400px;
		display: flex;
		align-items: center;
		justify-items: center;

		.user {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}

	.main {
		width: 100%;
		height: 100%;
	}
</style>
