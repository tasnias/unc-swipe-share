import Vue from 'vue'
import Router from 'vue-router'
import SwipeSettings from '@/components/swipesettings'
import Login from '@/components/auth/login'
import Register from '@/components/auth/register'
import Recover from '@/components/auth/recover'
import firebase from 'firebase'
import FindPeople from '@/components/findpeople'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/',
      name: 'findpeople',
      component: FindPeople,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/swipesettings',
      name: 'swipesettings',
      component: SwipeSettings,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/recover',
      name: 'recover',
      component: Recover,
      meta: {
        requiresGuest: true
      }
    }
  ]
})

//navguards
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      next({
        path: '/login',
        query: {
          rederict: to.fullPath
        }
      })
    }
    else {
      next()
    }
  }
  else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (firebase.auth().currentUser) {
      next({
        path: '/',
        query: {
          rederict: to.fullPath
        }
      })
    }
    else {
      next()
    }
  }
  else {
    next()
  }
})

export default router
