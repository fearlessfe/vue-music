import Vue from 'vue'
import Router from 'vue-router'
import Recommend from './views/recommend/recommend.vue'
import Search from './views/search/search.vue'
import Singer from './views/singer/singer.vue'
import Rank from './views/rank/rank.vue'
import SingerDetail from './views/singer-detail/singer-detail.vue'
import Disc from './views/disc/disc.vue'
import TopList from './views/top-list/top-list.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
    },
    {
      path: '/search',
      component: Search,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    }
  ]
})
