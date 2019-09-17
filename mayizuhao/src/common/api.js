import Vue from 'vue'
import router from '../router'
import Axios from 'axios'
import { Notification } from 'element-ui';
let tempRouter = new Vue({ router });
// 公共参数
let baseURL = 'https://api_test.myzuhao.top';
// let baseURL = 'https://api.myzuhao.top';
let MYtoken = localStorage.getItem('MYtoken');
Axios.defaults.baseURL = baseURL;
Axios.defaults.timeout = 30000;
Axios.defaults.headers.common['Authorization'] = MYtoken? `Bearer ${MYtoken}`:'';
Axios.defaults.headers.post['Content-Type'] = 'application/json';
// 请求拦截器
Axios.interceptors.request.use((config) => {
	return config;
}, error => {
	// return Promise.reject(error);
	console.log(error);
});
// 响应拦截器
Axios.interceptors.response.use((response) => {
	let data = response.data;
	let _url = response.config.url;
	if (!data.flag && data.msgLevel == 1) {
		Notification.closeAll();
		Notification.warning({
			title: '温馨提示',
			message: '系统繁忙，请稍候。'
		});
	} else if (!data.flag && data.msgLevel == 3) {
		Notification.closeAll();
		Notification.warning({
			title: '温馨提示',
			message: '用户验证失败，请重新登录。'
		});
		localStorage.clear();
		tempRouter.$router.push('/auth');
	} else if (!data.flag) {
		if (_url.indexOf('GetChildrenType') > -1) {
			// ...
		} else if (_url.indexOf('CheckSpreadCode') > -1) {
			// ...
		} else if (_url.indexOf('CheckWangbaInfo') > -1) {
			// ...
		} else {
			Notification.closeAll();
			Notification({
				title: '温馨提示',
				message: data.res
			});
		}
	}
	return Promise.resolve(data);
}, error => {
	// return Promise.reject(error);
	console.log(error);
});

let apiURL = {
    Login: '/apiv2/User/Baseinfo/Login', // <<---------->>登录用户
    AddUser: '/apiv2/User/Baseinfo/AddUser', // <<---------->>添加用户
    UpPwd: '/apiv2/User/Baseinfo/Update/UpPwd', // <<---------->>更新登录密码
    LogOut: '/apiv2/User/Baseinfo/LogOut', // <<---------->>登出用户
	SendTelCode: '/apiv2/Info/SendCodeControll/SendTelCode', // <<---------->>发送指定手机验证码
	
    GetPopularGoodType: '/apiv2/Good/TimingOder/ChargeArea/ChoseGoodType/GetPopularGoodType', // <<---------->>获取热门类型
    GetNewGoodType: '/apiv2/Good/TimingOder/ChargeArea/ChoseGoodType/GetNewGoodType', // <<---------->>新游推荐
    GetChildrenType: '/apiv2/Good/TimingOder/ChargeArea/GoodType/GetChildrenType', // <<---------->>获取游戏的第一级子级
    GetSupportFixedTags: '/apiv2/Good/TimingOder/ChargeArea/GoodType/GetSupportFixedTags', // <<---------->>获取游戏路径所支持的所有固定值标签
    GetSupportScopeTags: '/apiv2/Good/TimingOder/ChargeArea/GoodType/GetSupportScopeTags', // <<---------->>获取游戏类型所支持的所有返回值筛选
    GoodPage: '/apiv2/Good/TimingOder/ChargeArea/RentalHall/GoodPage', // <<---------->>商品分页
    GoodInfo: '/apiv2/Good/TimingOder/ChargeArea/RentalHall/GoodInfo', // <<---------->>商品详情
    CreateOrder: '/apiv2/Good/TimingOder/ChargeArea/GoodOrder/CreateOrder', // <<---------->>创建订单
	PayOrder: '/apiv2/Good/TimingOder/ChargeArea/GoodOrder/PayOrder', // <<---------->>支付订单
	
    GoodPlatformPage: '/apiv2/Good/TimingOder/SpaceArea/GoodTypeSpc/GoodPlatformPage', // <<---------->>专区游戏类型的分页
    AddComment: '/apiv2/Good/TimingOder/SpaceArea/Comment/AddComment', // <<---------->>添加评论
    CommentPage: '/apiv2/Good/TimingOder/SpaceArea/Comment/CommentPage', // <<---------->>评论分页
    UpComment: '/apiv2/Good/TimingOder/SpaceArea/Comment/UpComment', // <<---------->>顶
    CancelUpComment: '/apiv2/Good/TimingOder/SpaceArea/Comment/CancelUpComment', // <<---------->>取消顶
    DownComment: '/apiv2/Good/TimingOder/SpaceArea/Comment/DownComment', // <<---------->>踩
    CancelDownComment: '/apiv2/Good/TimingOder/SpaceArea/Comment/CancelDownComment', // <<---------->>踩
    GoodOrderSpc_GetInfo: '/apiv2/Good/TimingOder/SpaceArea/GoodOrderSpc/GetInfo', // <<---------->>获取专区游戏详细类型的信息
    GoodOrderSpc_CreateOrder: '/apiv2/Good/TimingOder/SpaceArea/GoodOrderSpc/CreateOrder', // <<---------->>检查当前ip是否在记录录入的网吧信息中
    CheckWangbaInfo: '/apiv2/Info/WangBaInfo/CheckWangbaInfo', // <<---------->>检查当前ip是否在记录录入的网吧信息中
	AddWangbaInfo: '/apiv2/Info/WangBaInfo/AddWangbaInfo', // <<---------->>提交网吧信息
	CheckSpreadCode: '/apiv2/Info/WangBaInfo/CheckSpreadCode', // <<---------->>检查当前的推广码

	GetInfoType: '/apiv2/Info/WebInfo/GetInfoType', // <<---------->>获取所有信息分类
	GetInfoPage: '/apiv2/Info/WebInfo/GetInfoPage', // <<---------->>网站消息的分页
	SelectInfo: '/apiv2/Info/WebInfo/SelectInfo', // <<---------->>查看信息的详情

    BaseInfo: '/apiv2/User/Baseinfo/BaseInfo', // <<---------->>用户信息
    GetRoles: '/apiv2/User/Baseinfo/Update/GetRoles', // <<---------->>获取用户的权限
    Cash: '/apiv2/User/UserCash/Details/Cash', // <<---------->>获取用户的资产简略信息
    MsgPage: '/apiv2/User/UserMsg/MsgPage', // <<---------->>获取用户所有的数据分页
    Recharge: '/apiv2/User/UserCash/Recharge', // <<---------->>充值
    RechargeDetails: '/apiv2/User/UserCash/Details/RechargeDetails', // <<---------->>获取充值提款的详细记录
	OrderPage: '/apiv2/User/UserBuy/OrderPage', // <<---------->>自己的订单分页
	SellGoodPage: '/apiv2/User/UserSell/SellGoodPage', // <<---------->>卖家的商品分页
	SellGoodOrderPage: '/apiv2/User/UserSell/SellGoodOrderPage', // <<---------->>上架商品出售的订单分页
    OrderDetails: '/apiv2/User/UserBuy/OrderDetails', // <<---------->>订单详情
    CerateOrderRight: '/apiv2/User/UserBuy/OrderRight/CerateOrderRight', // <<---------->>创建维权
    OrderRightInfo: '/apiv2/User/UserBuy/OrderRight/OrderRightInfo', // <<---------->>获取维权详情
    CashChangedPage: '/apiv2/User/UserCash/Details/CashChangedPage', // <<---------->>资金变动记录
	UpBaseInfo: '/apiv2/User/Baseinfo/Update/UpBaseInfo', // <<---------->>更新用户的基础资料
    UpPayPwd: '/apiv2/User/Baseinfo/Update/UpPayPwd', // <<---------->>更改支付密码
    UpAliCount: '/apiv2/User/Baseinfo/Update/UpAliCount', // <<---------->>更新阿里账号（提款用）
    CreateSpread: '/apiv2/User/UserSpread/CreateSpread', // <<---------->>创建自己的推广连接
    GetSpreadInfo: '/apiv2/User/UserSpread/GetSpreadInfo', // <<---------->>获取自己的推广数据
    SpreadRecordPage: '/apiv2/User/UserSpread/SpreadRecordPage', // <<---------->>获取推广的分页
    IPPage: '/apiv2/User/UserIPs/IPPage', // <<---------->>ip分页
    AddIP: '/apiv2/User/UserIPs/AddIP', // <<---------->>添加ip
	UpdateIP: '/apiv2/User/UserIPs/UpdateIP', // <<---------->>修改ip

	AddGood: '/apiv2/User/UserSell/Good/AddGood', // <<---------->>添加商品
	GetGoodBaseInfo: '/apiv2/User/UserSell/Good/GetGoodBaseInfo', // <<---------->>获取商品的基础信息
	UpdateGoodBaseInfo: '/apiv2/User/UserSell/Good/UpdateGoodBaseInfo', // <<---------->>修改商品的基础信息
	GetGoodImage: '/apiv2/User/UserSell/Good/GetGoodImage', // <<---------->>获取商品的图片
	UpdateGoodImage: '/apiv2/User/UserSell/Good/UpdateGoodImage', // <<---------->>修改商品的图片
	GetGoodPrice: '/apiv2/User/UserSell/Good/GetGoodPrice', // <<---------->>获取商品的价格信息
	UpdateGoodPrice: '/apiv2/User/UserSell/Good/UpdateGoodPrice', // <<---------->>修改商品的价格信息
	SetGoodState: '/apiv2/User/UserSell/Good/SetGoodState', // <<---------->>更改商品的状态
}
export const upImgUrl = `${baseURL}/apiv2/Info/Other/UpImgFile`; // <<---------->>上传图片

let post = (url, data) => {
    return new Promise((resolve, reject) => {
		Axios.post(apiURL[url], data)
			.then(response => {
				if (response.flag) {
					resolve(response);
				}
			})
			.catch(error => {
				reject(error)
			})
	})
}
let postBack = (url, data) => {
    return new Promise((resolve, reject) => {
		Axios.post(apiURL[url], data)
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				reject(error)
			})
	})
}

let get = (url) => {
    return new Promise((resolve, reject) => {
		Axios.get(url)
			.then(response => {
				if (response.flag) {
					resolve(response);
				}
			})
			.catch(error => {
				reject(error)
			})
	})
}

export default {
    post, postBack, get
}
