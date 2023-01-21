import {
	defineStore
} from "pinia"
import request from "../util/request"

const useVideoStore = defineStore('video', {
	state() {
		return {
			tags: [],
			videos: new Map()
		}
	},
	actions: {
		async reqGetTags() {
			let result = await request.get("/video/category/list")
			this.tags = result.data
		},
		async reqGetVideo(id) {
			let result = await request.get("/video/group", {
				id
			})
			console.log(result.datas)
			result.datas.forEach(async (item) => {
				if (item.type == 2) {
					await this.reqGetMVInfo(item.data.id, item)
				}
				if (item.type == 1) {
					await this.reqGetVideoInfo(item.data.vid, item)
				}
			})
			this.videos.set(id, result.datas)

		},
		async reqGetVideoInfo(id, item) {
			let result = await request.get("/video/url", {
				id
			})
			item.info = {
				...result.urls[0],
				flag: true
			}
		},
		async reqGetMVInfo(id, item) {
			let result = await request.get("/mv/url", {
				id
			})
			item.info = {
				...result.data,
				flag: true
			}
		},
		async init() {
			await this.reqGetTags()
			await this.reqGetVideo(this.tags[0].id)
		}
	}

})

export default useVideoStore;
