import {
	defineStore
} from "pinia"
import request from "@/util/request.js"

const useUserStore = defineStore('user', {
	state() {
		return {
			account: {},
			token: '',
			profile: {},
			bindings: {},
			cookie: '',
		}
	},
	actions: {
		async init() {
			try {
				await this.reqGetStatus()
			} catch (err) {
				console.log(err)
			} finally {
				if (this.account.status == -10) {
					uni.navigateTo({
						url: `/pages/login/login?redirect=${decodeURI("/pages/videos/videoslist")}`,
						success: res => {},
						fail: (err) => {
							console.log(err)
						},
						complete: () => {}
					});
				}	
			}

		},
		async reqLogin(data) {
			let {
				phone,
				password
			} = data
			let res = await request.post('/login/cellphone', {
				phone,
				password
			});
			this.cookie = res.cookie
			this.bindings = res.bindings
			this.account = res.account
			this.profile = res.profile
			this.token = res.token
		},
		async reqGetStatus() {
			let res = await request.get('/login/status')
			this.account = res.data.account
			if (res.data.account.status == 0) {
				this.profile = res.data.profile
			}
		},
		async reqLogout() {
			let res = await request.get('/logout')
			this.account = res.account
		},
		async reqLoginRefresh() {
			let res = await request.get('/login/refresh')
			this.cookie = res.cookie
		}
	}
})

export default useUserStore;
