import 'normalize.css'
import 'gridlex/docs/gridlex.css'
import 'assets/css/skeleton.css'
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

var router = new VueRouter()

router.map({
  '/draft': {
    component: DraftView
  },
  '/ranking': {
    component: RankingView
  }
})

router.beforeEach(() => window.scrollTo(0, 0))

router.redirect({
  '*': '/draft'
})

router.start(App, '#app')

// /* eslint-disable no-new */
// new Vue({
//   el: 'body',
//   components: { App },
//   methods: {
//     UserException: function (message) {
//       this.message = message
//       this.name = 'UserException'
//     }
//   }
// })
