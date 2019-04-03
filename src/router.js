import Vue from 'vue'
import Router from 'vue-router'
import Recommend from './views/recommend/recommend.vue'
import Search from './views/search/search.vue'
import Singer from './views/singer/singer.vue'
import Rank from './views/rank/rank.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/singer',
      component: Singer
    }
  ]
})
