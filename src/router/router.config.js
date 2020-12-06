/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/layouts/BottomView/'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', keepAlive: false }
      },
      {
        path: '/workSpace',
        name: 'WorkSpace',
        hidden: true,
        component: () =>
          import(/* webpackChunkName: "workSpace" */ '@/views/workSpace/'),
        meta: {
          keepAlives: true
        }
      },
      {
        path: '/mailList',
        name: 'MailList',
        component: () => import(/* webpackChunkName: "mailList" */ '@/views/mailList/'),
        meta: { title: '通讯录', keepAlive: false }
      },
      {
        path: '/mine',
        name: 'Mine',
        component: () => import(/* webpackChunkName: "mine" */ '@/views/mine/'),
        meta: { title: '我的', keepAlive: false }
      }
    ]
  },
  {
    path: '/',
    name: 'page',
    redirect: '/home',
    component: () => import('@/layouts/HeaderView/'),
    children: [
      {
        path: '/about',
        name: 'About',
        hidden: true,
        component: () =>
          import(/* webpackChunkName: "about" */ '@/views/about/'),
        meta: {
          keepAlives: true
        }
      }
    ]
  }

]
