let baseUrl = ''
if(process.env.NODE_ENV === 'development'){
//开发环境
// #ifdef H5
        // 如需跨域参照以下h5跨域配置
    baseUrl = "/api"
// #endif
// #ifdef APP-PLUS ||MP
    baseUrl = "http://192.168.2.68:4000"
// #endif
}else{
    baseUrl = ""
} 

const server = (url, data = {}, method = "GET") => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			method,
			data,
			success(res) {
				// console.log(res)
				resolve(res.data)
			},
			fail(err) {
				// console.log(err)
				reject(err)
			},
		});
	})
}
const request = {
	get:(url,data={})=>server(url,data,"GET"),
	post:(url,data={})=>server(url,data,"POST")
}


// import axios from "axios"
// const request = axios.create({
// 	baseURL:"/api",
// 	timeout:10000,
// })
// request.interceptors.request.use((config)=>{
// 	return config
// })

// request.interceptors.response.use((res)=>{
// 	return res.data
// })

export default request;
