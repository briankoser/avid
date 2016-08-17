import Vue from 'vue'
import App from './App'

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

Vue.filter('two_digits', function (n) {
  return ('0' + n).slice(-2)
})
