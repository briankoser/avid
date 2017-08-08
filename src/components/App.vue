<template>
  <div id="app" class="grid">
    <div class="main-container col-8">
      <router-view></router-view>
    </div>

    <div class="side-container col-4 dark-grey-bg white">
      <h1 class="site-header primary-bg">avid</h1>
      <nav class="site-nav secondary-bg">
        <router-link to="/ranking">Rank</router-link>
        <router-link to="/draft">Draft</router-link>
        <!-- <router-link to="/report">Report</router-link>
        <router-link to="/settings">Settings</router-link>
        <router-link to="/about">About</router-link> -->
      </nav>
      <roster></roster>
    </div>
  </div>
</template>

<script>
import Roster from './Roster'
import store from '../vuex/store'

export default {
  components: {
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

.secondary {
  color: #ff8f00;
}

.secondary-bg {
  background-color: #ff8f00;
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
.site-header,
.site-nav {
  padding-left: 20px;
}

.site-header {
  font-weight: 700;
}

.site-nav a {
  color: #fafafa;
}

.site-title {
  background-color: #4caf50;
  color: #fafafa;
  text-align: center;
  border-left: 30px solid #bdbdbd;
  border-right: 30px solid #bdbdbd;
}

.site-nav a::before {
  content: '🏈';
  display: inline-block;
  font-size: .75em;
  padding-right: 10px;
  vertical-align: text-top;
}

.site-nav a:not(:first-child)::before {
  padding-left: 20px;
}

.rankings {
  margin-top: 1em;
}

.tight li {
  margin-bottom: 0.5rem;
}
</style>
