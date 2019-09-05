import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 清除和重置
import '@/common/reset.css';
// Element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// Axios
import api from './common/api'
Vue.prototype.$api = api;
// moment
import moment from 'moment';
Vue.prototype.$moment = moment;
// clipboard2
import Clipboard from 'vue-clipboard2'
Vue.use(Clipboard)
// 无数据组件
import nullData from './components/null-data/index'
Vue.use(nullData);
// 时间过滤器
Vue.filter('formatDateTime', times => {
	return moment(times).format('YYYY-MM-DD HH:mm:ss')
})

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
