import Vue from 'vue'
import Router from 'vue-router'
import Full from './components/layout/full'
import Lump from './components/layout/lump'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			component: Lump,
			children: [
				{
					path: '/',
					name: 'index',
					meta: {
						isShowLogo: 1
					},
					component: () => import('./views/index')
				},
				{
					path: '/filtering',
					name: 'filtering',
					meta: {
						isShowLogo: 1
					},
					component: () => import('./views/filtering')
				},
				{
					path: '/lease',
					name: 'lease',
					meta: {
						isShowLogo: 1
					},
					component: () => import('./views/lease')
				},
				{
					path: '/lease-order',
					name: 'lease-order',
					meta: {
						isShowLogo: 1
					},
					component: () => import('./views/lease-order')
				},
				{
					path: '/lease-pay',
					name: 'lease-pay',
					meta: {
						isShowLogo: 1
					},
					component: () => import('./views/lease-pay')
				},
				{
					path: '/payment',
					name: 'payment',
					meta: {
						isShowLogo: 1
					},
					component: () => import('./views/payment')
				},
				{
					path: '/zone',
					name: 'zone',
					meta: {
						isShowLogo: 0
					},
					component: () => import('./views/zone')
				},
				{
					path: '/zone-detail',
					name: 'zone-detail',
					meta: {
						isShowLogo: 0
					},
					component: () => import('./views/zone-detail')
				},
				{
					path: '/release',
					name: 'release',
					meta: {
						isShowLogo: 1
					},
					component: () => import('./views/release')
				},
				{
					path: '/release-change',
					name: 'release-change',
					meta: {
						isShowLogo: 1
					},
					component: () => import('./views/release-change')
				},
				{
					path: '/notice',
					component: () => import('./views/notice'),
					children: [
						{
							path: '/',
							name: 'notice',
							meta: {
								isShowLogo: 1
							},
							component: () => import('./components/notice/notice'),
						},
						{
							path: '/activity',
							name: 'activity',
							meta: {
								isShowLogo: 1
							},
							component: () => import('./components/notice/activity'),
						},
						{
							path: '/notice/detail',
							name: 'notice/detail',
							meta: {
								isShowLogo: 1
							},
							component: () => import('./components/notice/detail'),
						},
						{
							path: '/activity/detail',
							name: 'activity/detail',
							meta: {
								isShowLogo: 1
							},
							component: () => import('./components/notice/detail'),
						},
						{
							path: '/FAQ/detail',
							name: 'FAQ/detail',
							meta: {
								isShowLogo: 1
							},
							component: () => import('./components/notice/detail'),
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
								isShowLogo: 1
							},
							component: () => import('./components/account/index'),
						},
						{
							path: '/account/pay',
							name: 'account/pay',
							meta: {
								isShowLogo: 1
							},
							component: () => import('./components/account/pay'),
						},
						{
							path: '/account/refund',
							name: 'account/refund',
							meta: {
								isShowLogo: 1
							},
							component: () => import('./components/account/refund'),
						},
						{
							path: '/account/buyer-order',
							name: 'account/buyer-order',
							meta: {
								isShowLogo: 1
							},
							component: () => import('./components/account/buyer-order'),
						},
						{
							path: '/account/order-detail',
							name: 'account/order-detail',
							meta: {
								isShowLogo: 1
							},
							component: () => import('./components/account/order-detail'),
						},
						{
							path: '/account/dispute',
							name: 'account/dispute',
							meta: {
								isShowLogo: 1
							},
							component: () => import('./components/account/dispute'),
						},
						{
							path: '/account/seller-order',
							name: 'account/seller-order',
							meta: {
								isShowLogo: 1
							},
							component: () => import('./components/account/seller-order'),
						},
						{
							path: '/account/seller-account-manage',
							name: 'account/seller-account-manage',
							meta: {
								isShowLogo: 1
							},
							component: () => import('./components/account/seller-account-manage'),
						},
						{
							path: '/account/bills',
							name: 'account/bills',
							meta: {
								isShowLogo: 1
							},
							component: () => import('./components/account/bills'),
						},
						{
							path: '/account/change-account',
							name: 'account/change-account',
							meta: {
								isShowLogo: 1
							},
							component: () => import('./components/account/change-account'),
						},
						{
							path: '/account/change-pass',
							name: 'account/change-pass',
							meta: {
								isShowLogo: 1
							},
							component: () => import('./components/account/change-pass'),
						},
						{
							path: '/account/change-pay-pass',
							name: 'account/change-pay-pass',
							meta: {
								isShowLogo: 1
							},
							component: () => import('./components/account/change-pay-pass'),
						},
						{
							path: '/account/change-pay-account',
							name: 'account/change-pay-account',
							meta: {
								isShowLogo: 1
							},
							component: () => import('./components/account/change-pay-account'),
						},
						{
							path: '/account/promotion',
							name: 'account/promotion',
							meta: {
								isShowLogo: 1
							},
							component: () => import('./components/account/promotion'),
						},
						{
							path: '/account/promotion-history',
							name: 'account/promotion-history',
							meta: {
								isShowLogo: 1
							},
							component: () => import('./components/account/promotion-history'),
						},
						{
							path: '/account/promotion-store',
							name: 'account/promotion-store',
							meta: {
								isShowLogo: 1
							},
							component: () => import('./components/account/promotion-store'),
						}
					]
				}
			]
		},
		{
			path: '/auth',
			component: Full,
			children: [
				{
					path: '/',
					name: 'auth',
					component: () => import('./views/auth')
				}
			]
		},
		{
			path: '*',
			component: Full,
			children: [
				{
					path: '/',
					name: 'error-404',
					component: () => import('./components/error/error-404')
				}
			]
		},
		
	]
})
