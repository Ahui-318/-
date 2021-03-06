import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const Discover = () => import('@/views/discover/Discover.vue')

const NewMv = () => {
  return import('@/views/NewMv.vue')
}
const PlayLists = () => {
  return import('@/views/PlayLists.vue')
}
const Songs = () => {
  return import('@/views/Songs.vue')
}

const Result = () => {
  return import('@/views/Result.vue')
}
const ListDetail = () => {
  return import('@/views/PlayListDetail.vue')
}
const MvDetail = () => {
  return import('@/views/MvDetail.vue')
}


const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/discovery'
    },
    {
      path: '/discovery',
      component: Discover,
    },
    {
      path: '/playlists',
      component: PlayLists,
    },
    {
      path: '/songs',
      component: Songs,
    },
    {
      path: '/newmvs',
      component: NewMv,
    },
    {
      path: '/result',
      component: Result,
    },
    {
      path: '/playListDetail',
      component: ListDetail,
    },
    {
      path: '/playMvDetail',
      component: MvDetail,
    },
  ],
  mode: 'history'
})
export default router
