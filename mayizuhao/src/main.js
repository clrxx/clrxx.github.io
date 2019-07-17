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
import api from '@/common/api'
Vue.prototype.$api = api;

import { formatDateTime } from '@/common/utils'
Vue.prototype.$formatDateTime = formatDateTime;

import Clipboard from 'vue-clipboard2'
Vue.use(Clipboard)

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
