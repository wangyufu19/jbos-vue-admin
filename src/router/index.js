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
    redirect: '/profile/index',
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
          router.options.isInitMenuRoute = true
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
    if (menuList[i].funcList && menuList[i].funcList.length >= 1) {
      funcRoute.children = fnAddDynamicMenuRoutes(menuList[i].funcList)
      funcRoute.component = Layout
    } else {
      funcRoute.path = menuList[i].funcPath
      funcRoute.component = loadView(menuList[i].funcUrl)
    }
    funcRoutes.push(funcRoute)
  }
  return funcRoutes
}
function fnAddDynamicMenuRoute(func) {
  const route = {
    path: '',
    name: func.funcCode,
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
