<template>
  <div id="app" class="grid">
    <div class="main-container col-8">
      <draft></draft>
      <command-center></command-center>
    </div>

    <div class="side-container col-4 dark-grey-bg white">
      <h1 class="site-header primary-bg">avid</h1>
      <roster></roster>
    </div>
  </div>
</template>

<script>
import CommandCenter from './components/CommandCenter'
import Draft from './components/Draft'
import Roster from './components/Roster'
import store from './vuex/store'

export default {
  components: {
    'command-center': CommandCenter,
    Draft,
    Roster
  },
  store
}
</script>

<style>
/*
  LAYOUT
*/
*, 
*:before, 
*:after { 
  box-sizing: border-box;
}

body {
  background-color: #fafafa;
  color: #333;
}

table {
  border-collapse: collapse;
}

#app {
  font: 26px/1.4 'PT Sans', Helvetica, sans-serif;
  margin: 0;
}

.main-container {
  padding: 20px 40px;
}

.side-container {
  padding: 0;
}

.site-header {
  font-weight: 700;
  padding-left: 20px;
}

.rankings {
  margin-top: 1em;
}


/*
  ELEMENTS
*/
a {
  color: #42b983;
  text-decoration: none;
}


/*
  FONT SIZING
*/
.kilo {
  font-size: 6rem;
}

.mega {
  font-size: 7rem;
}

.giga {
  font-size: 8rem;
}

.milli {
  font-size: 0.8em;
}


/*
  COLORS
*/
.primary {
  color: #4caf50;
}

.primary-bg {
  background-color: #4caf50;
}

.black {
  color: #212121;
}

.black-bg {
  background-color: #212121;
}

.dark-grey {
  color: #424242;
}

.dark-grey-bg {
  background-color: #424242;
}

.light-grey {
  color: #bdbdbd;
}

.light-grey-bg {
  background-color: #bdbdbd;
}

.subtle-grey {
  color: #ececec;
}

.subtle-grey-bg {
  background-color: #ececec;
}

.white {
  color: #fafafa;
}

.white-bg {
  background-color: #fafafa;
}


/*
  HELPER CLASSES
*/
.center {
  text-align: center;
}

.right {
  text-align: right;
}

.small-caps {
  font-variant-caps: small-caps;
}


/*
  OTHER STYLES
*/
.tight li {
  margin-bottom: 0.5rem;
}

.site-title {
  background-color: #4caf50;
  color: #fafafa;
  text-align: center;
  border-left: 30px solid #bdbdbd;
  border-right: 30px solid #bdbdbd;
}
</style>
