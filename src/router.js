import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Admin from '@/views/Admin'
import store from './store'
Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/register',
      name: 'Register',
      component: Register

    }, {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: {
        requireAuth: true,
        is_admin: true
      }
    }, {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.dispatch('checkStatus')
  store.dispatch('clearErr')
  if (to.matched.some(x => x.meta.requireAuth)) {
    if (localStorage.getItem('jwt') === null) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      let user = JSON.parse(localStorage.getItem('user'))
      if (to.matched.some(x => x.meta.is_admin)) {
        if (user.is_admin === 1) {
          next()
        } else {
          next({ name: 'Home' })
        }
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

export default router
