import {
	defineStore
} from "pinia"
import request from "../util/request"

const useHomeStore = defineStore('home', {
	state() {
		return {
			banners: [],
			balls: [],
			recommendMusic: {},
			toplist: [],
		}
	},
	actions: {
		async reqGetBanners() {
			let res = await request.get('/banner?type=1')
			this.banners = res.banners
		},
		async reqGetBalls() {
			let res = await request.get('/homepage/dragon/ball')
			this.balls = res.data
		},
		async reqRefreshLogin() {
			let res = await request.get('/login/refresh')
			console.log(res);
		},
		async reqGetRecommendMusic() {
			let res = await request.get("/recommend/songs")
			if (res.code == 302) {

			} else {
				this.recommendMusic = res.data
			}

		},
		async reqGetTopList() {
			let res = await request.get('/toplist')
			this.toplist = res.list
			console.log(res)
			this.toplist.forEach((item) => {
				this.reqGetSongs(item)
			})
		},
		async reqGetSongs(item) {
			const {
				id
			} = item
			let res = await request.get(`/playlist/track/all?id=${id}&limit=5`)
			item.tracks = res.songs
		}
	}

})

export default useHomeStore;
