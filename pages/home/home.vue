<template>
	<view class="container">
		<view class="swiper_container">
			<!-- swiper 组件 首页轮播图 -->
			<swiper>
				<swiper-item v-for="item in banners">
					<image :src="item.pic" alt=""></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="main_container">
			<view class="home_navbar">
				<view class="ball_item" v-for="ball in balls">
					<image :src="ball.iconUrl"></image>
					<text>{{ball.name}}</text>
				</view>
			</view>
		</view>
		<!-- 每日推荐 -->
		<text class="title">推荐歌曲</text>
		<view class="recommend_container" v-show="account.status == 0">
			<uni-nav-bar leftWidth="80px" leftText="为您精心推荐">
			</uni-nav-bar>
			<scroll-view class="recommend_music" scroll-x="true">
				<view class="recommend_item" v-for="song in recommendMusic.dailySongs">
					<image :src='song.al.picUrl'></image>
					<text>{{song.al.name}}</text>
				</view>
			</scroll-view>
		</view>
		<text class="title">排行榜</text>
		<uni-nav-bar leftWidth="80px" leftText="热歌风向标"></uni-nav-bar>
		<swiper class="toplist">
			<swiper-item v-for="item in toplist">
				<view class="songs_list">
					<text class="title">{{item.name}}</text>
					<view class="songs_list_body">
						<view class="songs_item" v-for='song in item.tracks'>
							<view class="image">
								<image :src='song.al.picUrl'></image>
							</view>
							<text>{{song.name}}</text>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup>
	import request from "@/util/request.js"
	import {
		onMounted,
		onActivated,
		ref,
		onDeactivated
	} from "vue"
	import useHomeStore from '@/store/home.js'
	import useUserStore from "@/store/user.js"
	import {
		storeToRefs
	} from "pinia"
	import pinia from "../../store";
	const homeStore = useHomeStore(pinia)
	const userStore = useUserStore(pinia)
	const {
		account
	} = storeToRefs(userStore)
	const {
		recommendMusic,
		banners,
		balls,
		toplist
	} = storeToRefs(homeStore)
	const init = async () => {
		homeStore.reqGetBanners()
		homeStore.reqGetBalls()
		homeStore.reqGetTopList()
	}
	init()
</script>
<style lang="less">
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}

	.home_navbar {
		bottom: 100px;
		display: flex;
		overflow-x: scroll;
		margin-bottom: 10px;
	}

	.ball_item image {
		height: 80px;
		width: 80px;
	}

	.ball_item text {
		display: flex;
		justify-content: center;
	}

	.ball_item {
		background-color: red;
	}

	.swiper_container image {
		width: 100%;
	}

	.swiper_container swiper {
		height: 220px;
	}

	.recommend_music .recommend_item {
		display: inline-block;
		margin-left: 10px;
		height: 160px;
		width: 100px;

		image {
			width: 100px;
			height: 100px;
		}

		text {
			width: 100px;
			height: 60px;
			text-overflow: ellipsis;
			white-space: pre-line;
			display: -webkit-box;
		}
	}

	.recommend_music {
		white-space: nowrap;
		width: 100%;
		display: flex;
	}

	.toplist {
		height: 270px;

		.songs_list {
			margin-left: 20px;

			.title {
				height: 20px;
			}

			.songs_item {
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				background-color: seagreen;
				height: 50px;

				.image {
					width: 50px;

					image {
						width: 50px;
						height: 50px;
					}
				}

				text {
					width: 80%;
					margin-left: 10px;
					font-size: 20px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}
	}
</style>
