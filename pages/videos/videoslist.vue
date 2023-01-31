<template>
	<view>
		<view class="video_container">
			<view class="header">
				<image src="../../static/c1.png" mode=""></image>
				<input type="text" placeholder="输入搜索关键字" placeholder-style="color:yellowgreen;font-size:24rpx"
					focus="{{true}}" />
				<image src="../../static/c6.png" mode=""></image>
			</view>
			<scroll-view scroll-x="true" class="tags_container" :scroll-into-view="'navid'+navid" scroll-with-animation>
				<view class="tag" v-for="item in tags" :id="'navid'+item.id" :key="item.id" :data-navId="item.id"
					@click="changenav">
					<text class="tag_title">{{item.name}}</text>
				</view>
			</scroll-view>
			<scroll-view scroll-y="true" class="video_list" refresher-enabled=true :refresher-triggered="refreshflag"
				@refresherrefresh="refreshvideo" @scrolltolower="downrefresh">
				<view class="video_list_item" v-for="video in currentVideos">
					<view v-if="video.type==1">
						<CusVideo v-show="video.data.vid == videoid" class="video" :info="video.info" :controls="true"
							:id="video.data.vid" :data-vid="video.data.vid" :CusContext="videoContextList"
							@timeupdate="TimeUpdate" @ended="VideoEnd" :key="video.data.vid">
							<cover-view class="cover_video" :data-vid="video.data.vid" @click="changeVid">
							</cover-view>
						</CusVideo>

						<!-- <video v-if="video.data.vid==videoid" class="video" :src="video.info.url" :id="video.data.vid" autoplay="true" :data-vid="video.data.vid" @click="changeVid" bindtap="changeVid"></video> -->
						<image v-show="video.data.vid != videoid " class="cover" :src="video.data.coverUrl"
							:data-vid="video.data.vid" @click="changeVid"></image>
						<view class="video_info">
							<view class="title" @click="titleclick">
								{{video.data.title}}
							</view>

							<view class="creator">
								<image class="avatar" :src="video.data.creator.avatarUrl"></image>
								<text class="username">{{video.data.creator.nickname}}</text>
								<view class="right">
									<text class="comment">{{video.data.commentCount}}</text>
									<text class="praised">{{video.data.praisedCount}}</text>
								</view>
							</view>

						</view>

					</view>

					<view v-if="video.type==2">
						<CusVideo v-show="video.data.id == videoid" class="video" :info="video.info" :controls="true"
							:id="video.data.id" :data-vid="video.data.id" @timeupdate="TimeUpdate" @ended="VideoEnd"
							:key="video.data.id" :CusContext="videoContextList">
							<cover-view class="cover_video" :data-vid="video.data.id" @click="changeVid">
							</cover-view>
						</CusVideo>

						<!-- <video v-if="video.data.vid==videoid" class="video" :src="video.info.url" :id="video.data.vid" autoplay="true" :data-vid="video.data.vid" @click="changeVid" bindtap="changeVid"></video> -->
						<image v-show="video.data.id != videoid " class="cover" :src="video.data.coverUrl"
							:data-vid="video.data.id" @click="changeVid"></image>
						<view class="video_info">
							<view class="title" @click="titleclick">
								{{video.data.name}}
							</view>
							<scroll-view scroll-y class="creator_box">
								<view class="creator" v-for="art in video.data.artists">
									<image class="avatar" :src="art.img1v1Url"></image>
									<text class="username">{{art.name}}</text>
									<view class="right">
										<text class="comment">{{video.data.commentCount}}</text>
										<text class="praised">{{video.data.likeCount}}</text>
									</view>
								</view>
							</scroll-view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>


<script setup>
	import {
		computed,
		getCurrentInstance,
		nextTick,
		onMounted,
		reactive,
		ref
	} from "vue"
	import {
		storeToRefs
	} from "pinia"
	import pinia from "@/store/index.js"
	import useVideoStore from "@/store/video.js"
	import useUserStore from "@/store/user.js"
	import CusVideo from "@/pages/videos/CusVideo.vue"

	const videoStore = useVideoStore(pinia)
	const userStore = useUserStore(pinia)

	const {
		tags
	} = storeToRefs(videoStore)

	const navid = ref()
	const videoid = ref()
	const videoContext = reactive({})
	const videoArr = ref([])
	const timeArr = ref([])
	const refreshflag = ref(true)

	const Pages = getCurrentPages()
	const Page = Pages[0]
	const page = Pages[Pages.length - 1].$page

	// #ifdef APP
	let videoctxs = []
	const videoContextList = {
		get: (id) => {
			// console.log(id, videoctxs.length,Date())
			videoctxs.filter((item) => {
				// console.log(item.id, id, item.id == id)
				return item.id == id
			})
			return videoctxs.filter(item => item.id == id)[0]
		},
		set: (val) => {
			// if (! videoctxs.find((item)=>item.id == val.id)){
			// console.log(val, val.type,Date())
			if (val.type == 'ctx') {
				videoctxs = videoctxs.filter(item => val.id !== item.id)
				videoctxs.push(val)
			}
			// }
		}
	}
	const getContext = (id) => {
		// console.log("getContext", videoctxs.length)
		let ctx = videoContextList.get(id)
		// console.log("ctx", ctx)
		return ctx
	}
	uni.createVideoContext = getContext
	// #endif

	const init = async () => {
		await userStore.init(page.fullPath)
		await videoStore.init()
		navid.value = videoStore.tags[0].id
	}

	const changenav = async (event) => {
		let nid = event.currentTarget.dataset.navId
		if (nid != navid.value) {
			navid.value = nid
			videoid.value = null
			if (videoContext.value) {
				videoContext.value.stop()
			}
			videoContext.value = null
		}
		if (!videoStore.videos.has(navid.value)) {
			await videoStore.reqGetVideo(navid.value)
		}
		nextTick()
	}



	const changeVid = async (event) => {
		let vid = event.currentTarget.dataset.vid
		if (!videoContext.value) {
			videoid.value = vid
			// console.log(uni.createVideoContext(vid))
			videoContext.value = uni.createVideoContext(vid)
			// console.log(videoContextList)
			await nextTick()

			// console.log(videoContext.value)
			videoContext.value.play()

		} else {
			if (vid == videoid.value) {
				let video = currentVideos.value.find((item) => item.data.vid == vid || item.data.id == vid)
				video.info.flag ? videoContext.value.pause() : videoContext.value.play()
				video.info.flag = !video.info.flag
			} else {
				videoid.value = vid
				videoContext.value.pause()
				videoContext.value = null
				// console.log(uni.createVideoContext(vid))
				videoContext.value = uni.createVideoContext(vid)
				let record = timeArr.value.find(item => item.vid == vid)
				if (record) {
					videoContext.value.seek(record.time)
				}
				videoContext.value.play()
				// console.log(videoContext)
			}
		}
	}

	const titleclick = async () => {
		// console.log("title click")
		videoContext.value.pause()
	}

	const VideoPlay = (event) => {

	}
	const VideoEnd = (event) => {
		// console.log(event)
		let vid = event.vid
		let record = timeArr.value.find(item => item.vid == vid)
		videoContext.value.seek(0)
		videoContext.value.play()
		// console.log(videoContext)
		// timeArr.value.splice(timeArr.value.indexOf(record), 1)
	}
	const TimeUpdate = (event) => {
		let vid = event.vid
		let time = event.currentTime
		let records = timeArr.value.find(item => item.vid == vid)
		if (records) {
			records.time = time
		} else {
			timeArr.value.push({
				vid,
				time
			})
		}
	}

	const refreshvideo = async () => {
		// console.log("refreshvideo")
		refreshflag.value = true
		videoid.value = null
		if (videoContext.value) {
			videoContext.value.stop()
		}
		videoContext.value = null
		await videoStore.reqGetVideo(navid.value)
		refreshflag.value = false
	}

	const downrefresh = () => {


	}

	const currentVideos = computed({
		get: () => {
			return videoStore.videos.get(navid.value)
		}
	})
	onMounted(() => {
		// console.log("videolist mounted")
		init()
	})
</script>

<style lang="less">
	.header {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: center;

		image {
			width: 30px;
			height: 25px;
		}
	}

	.tags_container {
		width: 100%;
		white-space: nowrap;

		.tag {
			display: inline-block;
			margin-left: 5px;
			font-size: 25px;
		}
	}

	.video_list {
		height: 90%;
		margin-bottom: 10px;

		.video_list_item {
			margin-bottom: 10px;

			.cover {
				width: 100%;
			}

			.video {
				width: 100%;

				.cover_video {
					height: 85%;
					width: 100%;
					// background-color: green;
					position: absolute;
				}
			}

			.video_info {
				display: flex;
				flex-direction: column;

				.title {
					margin-bottom: 10px;
					padding-left: 15px;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					overflow: hidden;
					text-overflow: ellipsis;
					text-align: center;
				}

				.creator {
					display: flex;
					align-items: center;
					flex-wrap: wrap;

					.avatar {
						width: 40px;
						height: 40px;
						border-radius: 50%;
					}

					.right {
						position: absolute;
						right: 0;

						.comment {
							margin-right: 20px;
						}

						.praised {
							margin-right: 20px;
						}
					}
				}

				.creator_box {
					.creator {
						display: flex;
						align-items: center;
						flex-wrap: wrap;

						.avatar {
							width: 40px;
							height: 40px;
							border-radius: 50%;
						}

						.right {
							position: absolute;
							right: 0;

							.comment {
								margin-right: 20px;
							}

							.praised {
								margin-right: 20px;
							}
						}
					}
				}
			}
		}
	}

	.video_container {
		height: 100%;
		width: 100%;
		position: absolute;
		overflow: hidden;
	}
</style>
