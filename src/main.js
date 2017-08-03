import 'normalize.css'
import 'gridlex/docs/gridlex.css'
import 'assets/css/skeleton.css'
import util from 'util'
import lodash from 'lodash'
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import App from './components/App'
import DraftView from './components/DraftView'
import RankingView from './components/RankingView'

Vue.use(VueResource)
Vue.use(VueRouter)

Vue.filter('round', function (n) {
  return Math.round(n)
})

Vue.filter('two_digits', function (n) {
  return ('0' + n).slice(-2)
})

const routes = [
  { path: '/draft', component: DraftView },
  { path: '/ranking', component: RankingView },
  { path: '*', redirect: '/draft' }
]

const router = new VueRouter({routes})

// router.beforeEach(() => window.scrollTo(0, 0))

// all components inherit from Vue, so these will add js libraries to every component
Object.defineProperty(Vue.prototype, '$lodash', { value: lodash })
Object.defineProperty(Vue.prototype, '$util', { value: util })

const app = new Vue({
  router,
  render: createEle => createEle(App)
}).$mount('#app')

console.log(app) // prevents compiler from complaining about unused var
