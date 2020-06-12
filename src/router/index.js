import Vue from 'vue'
import Router from 'vue-router'
import { getToken } from '@/utils/auth' // get token from cookie

Vue.use(Router)

import Layout from '@/layout'
import NProgress from "nprogress";



// 全局路由
const globalRoutes = [
  { path: '/login', component: () => import('@/views/login/index'), name: 'login', hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/', component: Layout, redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '工作平台',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '工作平台', icon: 'dashboard' }
    }],
    beforeEnter(to, from, next) {
      const token = getToken()
      if (!token || !/\S/.test(token)) {
        next({ name: 'login' })
      }
      next()
    }
  }
]


const menuRoutes = {
  path: '',
  component: Layout,
  name: 'sysMgr',
  meta: { title: '系统管理', icon: 'example'},
  children: [
    {
      path: 'table',
      name: 'Table',
      component: () => import('@/views/table/index'),
      meta: { title: 'Table', icon: 'table' }
    },
    {
      path: 'tree',
      name: 'Tree',
      component: () => import('@/views/tree/index'),
      meta: { title: 'Tree', icon: 'tree' }
    }
  ]
}

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  isInitMenuRoute: false, // 是否初始化菜单
  routes: globalRoutes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  // 添加动态(菜单)路由
  // 1. 已初始化或全局路由, 直接访问
  if (router.options.isInitMenuRoute || fnCurrentRouteType(to, globalRoutes) === 'global') {
    next()
  } else {
    globalRoutes.push(menuRoutes)
    router.addRoutes(globalRoutes)
    router.options.isInitMenuRoute = true
    next({ ...to, replace: true })
  }
  NProgress.done()
})

/**
 * 判断当前路由类型, global: 全局路由, main: 主入口路由
 * @param {*} route 当前路由
 */
function fnCurrentRouteType (route, globalRoutes = []) {
  var temp = []
  for (var i = 0; i < globalRoutes.length; i++) {
    if (route.path === globalRoutes[i].path) {
      return 'global'
    } else if (globalRoutes[i].children && globalRoutes[i].children.length >= 1) {
      temp = temp.concat(globalRoutes[i].children)
    }
  }
  return temp.length >= 1 ? fnCurrentRouteType(route, temp) : 'main'
}

export function resetRouter() {
  const newRouter = router
  router.matcher = newRouter.matcher // reset router
}

export default router
