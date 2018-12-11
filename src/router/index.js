import Vue from 'vue'
import Router from 'vue-router'
import UserList from '@/components/user/UserList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'UserList',
      component: UserList
    }
  ]
})
