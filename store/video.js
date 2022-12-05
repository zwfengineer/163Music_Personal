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
			let result = await request.get("/video/group/list")
			this.tags = result.data
		},
		async reqGetVideo(id) {
			let result = await request.get("/video/group", {
				id
			})
			this.videos.set(id, result.datas)
		},
		async init() {
			await this.reqGetTags()
			await this.reqGetVideo(this.tags[0].id)
		}
	}

})

export default useVideoStore;
