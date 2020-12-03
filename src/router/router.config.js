/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/layouts'),
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
        path: '/about',
        name: 'About',
        component: () => import('@/views/home/about'),
        meta: { title: '关于我', keepAlive: false }
      }
    ]
  },
  {
    path: '/workSpace',
    name: '办公',
    hidden: true,
    component: () =>
      import(/* webpackChunkName: "workSpace" */ '@/views/workSpace/'),
    meta: {
      keepAlives: true
    }
  }
]
