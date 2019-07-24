import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'index',
			meta: {
				isShowLogo: 1,
				isShowFooter: 1
			},
			component: () => import('./views/index')
		},
		{
			path: '/auth',
			name: 'auth',
			meta: {
				isShowLogo: 0,
				isShowFooter: 0
			},
			component: () => import('./views/auth')
		},
		{
			path: '/zone',
			name: 'zone',
			meta: {
				isShowLogo: 0,
				isShowFooter: 1
			},
			component: () => import('./views/zone')
		},
		{
			path: '/zone-detail',
			name: 'zone-detail',
			meta: {
				isShowLogo: 0,
				isShowFooter: 1
			},
			component: () => import('./views/zone-detail')
		},
		{
			path: '/filtering',
			name: 'filtering',
			meta: {
				isShowLogo: 1,
				isShowFooter: 1
			},
			component: () => import('./views/filtering')
		},
		{
			path: '/lease',
			name: 'lease',
			meta: {
				isShowLogo: 1,
				isShowFooter: 1
			},
			component: () => import('./views/lease')
		},
		{
			path: '/lease-order',
			name: 'lease-order',
			meta: {
				isShowLogo: 1,
				isShowFooter: 0
			},
			component: () => import('./views/lease-order')
		},
		{
			path: '/lease-pay',
			name: 'lease-pay',
			meta: {
				isShowLogo: 1,
				isShowFooter: 0
			},
			component: () => import('./views/lease-pay')
		},
		{
			path: '/payment-detail',
			name: 'payment-detail',
			meta: {
				isShowLogo: 1,
				isShowFooter: 1
			},
			component: () => import('./views/payment-detail')
		},
		{
			path: '/goods-released',
			name: 'goods-released',
			meta: {
				isShowLogo: 1,
				isShowFooter: 1
			},
			component: () => import('./views/goods-released')
		},
		{
			path: '/announcement',
			component: () => import('./views/announcement'),
			children: [
				{
					path: '/',
					name: 'announcement',
					meta: {
						isShowLogo: 1,
						isShowFooter: 1
					},
					component: () => import('./components/announcement/notice'),
				},
				{
					path: '/activity',
					name: 'activity',
					meta: {
						isShowLogo: 1,
						isShowFooter: 1
					},
					component: () => import('./components/announcement/activity'),
				},
				{
					path: '/announcement/detail',
					name: 'announcement/detail',
					meta: {
						isShowLogo: 1,
						isShowFooter: 1
					},
					component: () => import('./components/announcement/detail'),
				},
				{
					path: '/activity/detail',
					name: 'activity/detail',
					meta: {
						isShowLogo: 1,
						isShowFooter: 1
					},
					component: () => import('./components/announcement/detail'),
				},
				{
					path: '/FAQ/detail',
					name: 'FAQ/detail',
					meta: {
						isShowLogo: 1,
						isShowFooter: 1
					},
					component: () => import('./components/announcement/detail'),
				}
			]
		},
		{
			path: '/account',
			component: () => import('./views/account'),
			children: [
				{
					path: '/',
					name: 'account',
					meta: {
						isShowLogo: 1,
						isShowFooter: 1
					},
					component: () => import('./components/account/index'),
				},
				{
					path: '/account/pay',
					name: 'account/pay',
					meta: {
						isShowLogo: 1,
						isShowFooter: 1
					},
					component: () => import('./components/account/pay'),
				},
				{
					path: '/account/refund',
					name: 'account/refund',
					meta: {
						isShowLogo: 1,
						isShowFooter: 1
					},
					component: () => import('./components/account/refund'),
				},
				{
					path: '/account/buyer-order',
					name: 'account/buyer-order',
					meta: {
						isShowLogo: 1,
						isShowFooter: 1
					},
					component: () => import('./components/account/buyer-order'),
				},
				{
					path: '/account/order-detail',
					name: 'account/order-detail',
					meta: {
						isShowLogo: 1,
						isShowFooter: 1
					},
					component: () => import('./components/account/order-detail'),
				},
				{
					path: '/account/dispute',
					name: 'account/dispute',
					meta: {
						isShowLogo: 1,
						isShowFooter: 1
					},
					component: () => import('./components/account/dispute'),
				},
				{
					path: '/account/seller-order',
					name: 'account/seller-order',
					meta: {
						isShowLogo: 1,
						isShowFooter: 1
					},
					component: () => import('./components/account/seller-order'),
				},
				{
					path: '/account/seller-account-manage',
					name: 'account/seller-account-manage',
					meta: {
						isShowLogo: 1,
						isShowFooter: 1
					},
					component: () => import('./components/account/seller-account-manage'),
				},
				{
					path: '/account/seller-account-edit',
					name: 'account/seller-account-edit',
					meta: {
						isShowLogo: 1,
						isShowFooter: 1
					},
					component: () => import('./components/account/seller-account-edit'),
				},
				{
					path: '/account/bills',
					name: 'account/bills',
					meta: {
						isShowLogo: 1,
						isShowFooter: 1
					},
					component: () => import('./components/account/bills'),
				},
				{
					path: '/account/change-account',
					name: 'account/change-account',
					meta: {
						isShowLogo: 1,
						isShowFooter: 1
					},
					component: () => import('./components/account/change-account'),
				},
				{
					path: '/account/change-pass',
					name: 'account/change-pass',
					meta: {
						isShowLogo: 1,
						isShowFooter: 1
					},
					component: () => import('./components/account/change-pass'),
				},
				{
					path: '/account/change-pay-pass',
					name: 'account/change-pay-pass',
					meta: {
						isShowLogo: 1,
						isShowFooter: 1
					},
					component: () => import('./components/account/change-pay-pass'),
				},
				{
					path: '/account/change-pay-account',
					name: 'account/change-pay-account',
					meta: {
						isShowLogo: 1,
						isShowFooter: 1
					},
					component: () => import('./components/account/change-pay-account'),
				},
				{
					path: '/account/promotion',
					name: 'account/promotion',
					meta: {
						isShowLogo: 1,
						isShowFooter: 1
					},
					component: () => import('./components/account/promotion'),
				},
				{
					path: '/account/promotion-history',
					name: 'account/promotion-history',
					meta: {
						isShowLogo: 1,
						isShowFooter: 1
					},
					component: () => import('./components/account/promotion-history'),
				},
				{
					path: '/account/promotion-store',
					name: 'account/promotion-store',
					meta: {
						isShowLogo: 1,
						isShowFooter: 1
					},
					component: () => import('./components/account/promotion-store'),
				}
			]
		},
		{
			path: '*',
			name: 'error-404',
			meta: {
				isShowLogo: 0,
				isShowFooter: 0
			},
			component: () => import('./components/error/error-404')
		}
	]
})
