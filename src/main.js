import 'normalize.css'
import 'gridlex/docs/gridlex.css'
import 'assets/css/skeleton.css'
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'

Vue.use(VueResource)

Vue.filter('two_digits', function (n) {
  return ('0' + n).slice(-2)
})

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App },
  methods: {
    UserException: function (message) {
      this.message = message
      this.name = 'UserException'
    }
  },
  data: {
    initialRankings: {}
  },
  ready () {
    this.$http.get('/static/adpRankings.json').then((response) => {
      this.$set('initialRankings', response.json().adp.player)
    }, (response) => {
      console.log('Rankings could not be loaded')
    })
  }
})
