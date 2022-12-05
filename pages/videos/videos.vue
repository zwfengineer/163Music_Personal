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
					<image class="cover" :src="video.data.coverUrl"></image>
					<!-- <video class="video" :src="video.data.previewUrl"></video> -->
					<view class="video_info">
						<view class="title">
							{{video.data.title}}
						</view>
						<view class="creator">
							<image class="avatar" :src="video.data.creator.avatarUrl"></image>
							<text class="username">{{video.data.creator.nickname}}</text>
							<text class="comment">{{video.data.commentCount}}</text>
							<text class="praised">{{video.data.praisedCount}}</text>
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
	const changenav = (event) => {
		navid.value = event.currentTarget.dataset.navId
		if (!videoStore.videos.has(navid.value)) {
			videoStore.reqGetVideo(navid.value)
		}
	}
	const currentVideos = computed({
		get: () => {
			return videoStore.videos.get(navid.value)
		}
	})

	const init = async () => {
		await videoStore.init()
		navid.value = videoStore.tags[0].id
	}
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

			.cover {
				width: 100%;
			}

			.video_info {
				display: flex;
				flex-direction: column;

				.creator {
					display: flex;
					align-items: center;

					.avatar {
						width: 40px;
						height: 40px;
						border-radius: 50%;
					}

					.comment {
						margin-left: 180px;
					}

					.praised {
						margin-left: 20px;
					}

					.username {}
				}

				.title {
					padding-left: 15px;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					overflow: hidden;
					text-overflow: ellipsis;

				}

			}
		}
	}
</style>
