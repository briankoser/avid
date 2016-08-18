<template>
  <div id="app">
    <img class="logo" src="./assets/logo.png">

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
  margin-top: -100px;
  max-width: 600px;
  font-family: Rubik, Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
