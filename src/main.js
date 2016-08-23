import 'normalize.css'
import 'gridlex/docs/gridlex.css'
import 'assets/css/skeleton.css'
import Vue from 'vue'
import App from './App'

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
  }
})
