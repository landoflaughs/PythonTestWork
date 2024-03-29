import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import SignUp from '../components/SignUp.vue'
import Main from '../components/Main.vue'
import TestReport from '../components/TestReport.vue'
import TestCase from '../components/TestCase.vue'

Vue.use(VueRouter)

const routes = [
  // 配置首页的路由为 Login 组件
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  // children 代表子路由，子路由加载前，会加载其父路由
  {
    path: '/main',
    name: 'Main',
    component: Main,
    // 代表路由元信息，控制一个路由是否需要校验
    meta: { requiresAuth: true },
    children: [
      {
        path: '/report',
        name: 'TestReport',
        component: TestReport,
      },
      {
        path: '/testcase',
        name: 'TestCase',
        component: TestCase,
      },
    ]
  },
]

const router = new VueRouter({
  routes
});

// beforeEach 会在路由跳转前进行回调
// to 去哪里  from 从哪里来 next 结果
router.beforeEach((to, from, next) => {
  // 判断路由的元路由信息中，是否有requireAuth字段，如果有就进行校验
  // 如果没有 直接返回next()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 判断本地是否有token
    if (!localStorage.getItem("token")) {
      // next跳转到一个路由
      next({
        "name": 'Login',
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router
