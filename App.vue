<script setup>
	import {
		onMounted
	} from "vue";
	import request from "./util/request"
	onMounted(() => {
		request.get("/banner?type=1").then((value) => {
			console.log(value)
		}).catch((value) => {
			console.log(value)
		})
	})
	console.log("App Start")
</script>
<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';

	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
