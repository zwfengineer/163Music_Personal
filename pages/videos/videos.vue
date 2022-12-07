<template>
	<view>
		<view class="video">
			<view class="header">
				<image src="../../static/c1.png" mode=""></image>
				<input type="text" placeholder="输入搜索关键字" placeholder-style="color:yellowgreen;font-size:24rpx"
					focus="{{true}}" />
				<image src="../../static/c6.png" mode=""></image>
			</view>
			<scroll-view scroll-x="true" class="tags_container">
				<view class="tag" v-for="item in tags" :data-navId="item.id" @click="changenav">
					<text class="tag_title">{{item.name}}</text>
				</view>
			</scroll-view>
			<scroll-view scroll-y="true" class="video_list">
				<view class="video_list_item" v-for="video in currentVideos">

					<video v-if="video.data.vid == videoid" class="video" :src="video.info.url" :id="video.data.vid"
						autoplay="true">
						<cover-view class="cover_video" :data-vid="video.data.vid" @click="changeVid">
						</cover-view>
					</video>

					<!-- <video v-if="video.data.vid==videoid" class="video" :src="video.info.url" :id="video.data.vid" autoplay="true" :data-vid="video.data.vid" @click="changeVid" bindtap="changeVid"></video> -->
					<image v-else class="cover" :src="video.data.coverUrl" :data-vid="video.data.vid"
						@click="changeVid"></image>
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
			</scroll-view>
		</view>
	</view>
</template>
<script setup>
	import {
		computed,
		onActivated,
		onUnmounted,
		reactive,
		ref
	} from "vue"
	import {
		storeToRefs
	} from "pinia"
	import pinia from "@/store/index.js"
	import useVideoStore from "@/store/video.js"


	const videoStore = useVideoStore(pinia)
	const {
		tags
	} = storeToRefs(videoStore)


	const navid = ref()
	const videoid = ref()
	const videoContext = reactive({})
	const videoArr = ref([])
	const timeArr = ref([])

	const changenav = async (event) => {
		navid.value = event.currentTarget.dataset.navId
		if (!videoStore.videos.has(navid.value)) {
			await videoStore.reqGetVideo(navid.value)
		}
	}


	const init = async () => {
		console.log("Video init")
		await videoStore.init()
		navid.value = videoStore.tags[0].id
	}
	const changeVid = (event) => {
		let vid = event.currentTarget.dataset.vid
		console.log(vid)
		if (!videoContext.value) {
			videoid.value = vid
			videoContext.value = uni.createVideoContext(vid)
			videoContext.value.play()
		} else {
			if (vid == videoid.value) {
				let video = currentVideos.value.find((item) => item.data.vid == vid)
				video.info.flag ? videoContext.value.pause() : videoContext.value.play()
				video.info.flag = !video.info.flag
			} else {
				videoContext.value.pause()
				videoContext.value = null
				videoContext.value = uni.createVideoContext(vid)
				videoContext.value.play()
				videoid.value = vid
			}
		}
	}

	const titleclick = async () => {
		console.log("title click")
		videoContext.value.pause()
	}

	const currentVideos = computed({
		get: () => {
			return videoStore.videos.get(navid.value)
		}
	})

	init()
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
		.video_list_item {
			margin-bottom: 10px;

			.cover {
				width: 100%;
			}

			.video {
				position: relative;
				width: 100%;
				.cover_video {
					height: 85%;
					width: 100%;
					position: absolute;
				}
			}

			.video_info {
				display: flex;
				flex-direction: column;

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

			}
		}
	}
</style>
