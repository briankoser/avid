<template>
  <div id="app" class="grid-spaceAround">
    <div class="col-7">
      <draft></draft>
    </div>

    <div class="col-4">
      <h1>avid</h1>
      Rosters
    </div>
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
*, 
*:before, 
*:after { 
  box-sizing: border-box;
}

body {
  background-color: #fafafa;
  color: #333;
  margin: 10px;
}

#app {
  font: 26px/1.4 'PT Sans', Helvetica, sans-serif;
}

a {
  color: #42b983;
  text-decoration: none;
}

.center {
  text-align: center;
}

.site-title {
  background-color: #4caf50;
  color: #fafafa;
  text-align: center;
  border-left: 30px solid #bdbdbd;
  border-right: 30px solid #bdbdbd;
}


</style>
