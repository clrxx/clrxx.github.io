
import Axios from 'axios'
import Qs from 'qs';
import { Loading } from 'element-ui';
// 公共参数
let baseURL = 'http://127.0.0.1:3000/';
// let baseURL = 'https://app.51jja.cn/';
Axios.defaults.baseURL = baseURL;
// 请求拦截器
Axios.interceptors.request.use((config) => {
    // 在请求之前做些什么
	Loading.service({ 
		lock: true,
		text: '加载中.'
	});
	return config;
}, error => {
	// 对请求错误做些什么
	return Promise.reject(error);
});
// 响应拦截器
Axios.interceptors.response.use((response) => {
    // 在响应成功做点什么
	Loading.service().close();
	return Promise.resolve(response);
}, error => {
    // 对响应错误做点什么
	return Promise.reject(error);
});

let apiURL = {
    ArticleType_index: `api/ArticleType/index`,
    info: `api/info`,
}

let post = (url, data) => {
    return new Promise((resolve, reject) => {
		Axios.post(apiURL[url], Qs.stringify(data))
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err.data)
			})
	})
}

let get = (url) => {
    return new Promise((resolve, reject) => {
		Axios.get(url)
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err.data)
			})
	})
}

export default {
    post, get
}
