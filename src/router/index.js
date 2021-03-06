import Vue from 'vue'
import Router from 'vue-router'
import { getToken } from '@/utils/auth' // get token from cookie

Vue.use(Router)

import Layout from '@/layout'
import NProgress from 'nprogress'
import store from '@/store'
import http from '@/utils/request'
import { isURL } from '@/utils/validate'

const loadView = (view) => { // 路由懒加载
  return resolve => require([`@/views/${view}`], resolve)
}

// 全局路由
const globalRoutes = [
  { path: '/login', component: () => import('@/views/login/index'), name: 'login', hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/profile',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/', component: Layout, redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '工作平台',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '工作平台', icon: 'dashboard' }
    }]
  }
]

const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  isInitMenu: false, // 是否初始化菜单
  routes: globalRoutes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  // 添加动态(菜单)路由
  // 1. 已初始化或全局路由, 直接访问
  if (router.options.isInitMenu || fnCurrentRouteType(to, globalRoutes) === 'global') {
    next()
  } else {
    const token = getToken()
    if (!token || !/\S/.test(token)) {
      next({ name: 'login' })
    } else {
      http({
        url: '/sys/func/getUserFunc',
        method: 'get',
        params: { token }
      }).then(({ data }) => {
        if (data && data.retCode === '0000') {
          const funcRoutes = fnAddDynamicMenuRoutes(data.userFuncs)
          for (let i = 0; i < funcRoutes.length; i++) {
            globalRoutes.push(funcRoutes[i])
          }
          router.addRoutes(globalRoutes)
          router.options.isInitMenu = true
          next({ ...to, replace: true })
        } else {
          next()
        }
      })
    }
  }
  NProgress.done()
})

/**
 * 判断当前路由类型, global: 全局路由, main: 主入口路由
 * @param {*} route 当前路由
 */
function fnCurrentRouteType(route, globalRoutes = []) {
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
/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function fnAddDynamicMenuRoutes(menuList = []) {
  const funcRoutes = []
  for (let i = 0; i < menuList.length; i++) {
    const funcRoute = fnAddDynamicMenuRoute(menuList[i])
    if (menuList[i].children && menuList[i].children.length >= 1) {
      funcRoute.path = '/' + menuList[i].funcCode
      funcRoute.component = Layout
      funcRoute.children = fnAddDynamicMenuRoutes(menuList[i].children)
      funcRoutes.push(funcRoute)
    } else {
      funcRoutes.push(funcRoute)
    }
  }
  return funcRoutes
}
function fnAddDynamicMenuRoute(func) {
  const route = {
    path: func.funcCode,
    name: func.funcCode,
    component: loadView(func.funcUrl),
    meta: {
      menuId: func.id,
      title: func.funcName,
      icon: 'dashboard'
    }
  }
  return route
}

export function resetRouter() {
  const newRouter = router
  router.matcher = newRouter.matcher // reset router
}

export default router
