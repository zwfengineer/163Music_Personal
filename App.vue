<script>
	import pinia from "@/store/index.js"
	import useUserStore from "@/store/user.js"
	import useHomeStore from "@/store/home.js"
	import useVideoStore from "@/store/video.js"
	import {
		storeToRefs
	} from "pinia"
	import {onMounted, watch} from "vue"
	export default {
		setup() {
			const userStore = useUserStore(pinia)
			const homeStore = useHomeStore(pinia)
			const {
				account
			} = userStore
			userStore.$subscribe((mutation,state)=>{
				if(state.account.status == 0){
					homeStore.reqGetRecommendMusic()
				}
			},{
				detached:true
			})
			const init = () => {
				homeStore.reqGetBanners()
				homeStore.reqGetBalls()
				homeStore.reqGetTopList()
			}
			init()
		}
	}
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
