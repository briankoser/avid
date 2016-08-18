<template>
  <div id="app">
    <h1 class="site-title">avid</h1>

    <draft></draft>
  </div>
</template>

<script>
import Draft from './components/Draft'
import store from '../vuex/store'

export default {
  components: {
    Draft
  },
  store
}
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  color: #2c3e50;
  max-width: 600px;
  font-family: Rubik, 'Source Sans Pro', Helvetica, sans-serif;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.site-title {
  background-color: #4caf50;
  color: #fafafa;
  text-align: center;
  border-left: 30px solid #bdbdbd;
  border-right: 30px solid #bdbdbd;
}
</style>
