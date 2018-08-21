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

    <app-footer></app-footer>
  </div>
</template>

<script>
import AppFooter from './AppFooter'
import Roster from './Roster'
import store from '../vuex/store'

export default {
  components: {
    AppFooter,
    Roster
  },
  store
}
</script>

<style>
/*
  VARIABLES
*/
:root {
    --color-black-true: hsl(0, 0%, 0%);
    --color-black-dark: hsl(0, 0%, 13%);
    --color-black: hsl(0, 0%, 20%);
    --color-grey-dark: hsl(0, 0%, 26%);
    --color-grey-light: hsl(0, 0%, 74%);
    --color-grey-subtle: hsl(0, 0%, 93%);
    --color-white: hsl(0, 0%, 98%);
    --color-white-true: hsl(0, 0%, 100%);

    --color-primary: hsl(122, 39%, 49%);
    --color-secondary-bright: hsl(34, 100%, 50%);
    --color-secondary-dark: hsl(41, 87%, 52%);

    --color-blue: hsl(218, 100%, 58%);
    --color-green: hsl(93, 100%, 51%);
    --color-red: hsl(348, 100%, 55%);
}

/*
  LAYOUT
*/
*, 
*:before, 
*:after { 
  box-sizing: border-box;
}

body {
  background-color: var(--color-white);
  color: var(--color-black);
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
  color: hsl(153, 47%, 49%);
  text-decoration: none;
}

input[type="checkbox"],
input[type="radio"] {
  height: 1em; 
  width: 1em;
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
  color: var(--color-primary);
}

.primary-bg {
  background-color: var(--color-primary);
}

.secondary {
  color: var(--color-secondary-bright);
}

.secondary-bg {
  background-color: var(--color-secondary-dark);
}

.black {
  color: var(--color-black-dark);
}

.black-bg {
  background-color: var(--color-black-dark);
}

.dark-grey {
  color: var(--color-grey-dark);
}

.dark-grey-bg {
  background-color: var(--color-grey-dark);
}

.light-grey {
  color: var(--color-grey-light);
}

.light-grey-bg {
  background-color: var(--color-grey-light);
}

.subtle-grey {
  color: var(--color-grey-subtle);
}

.subtle-grey-bg {
  background-color: var(--color-grey-subtle);
}

.white {
  color: var(--color-white);
}

.white-bg {
  background-color: var(--color-white);
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
  color: var(--color-white);
}

.site-nav a + a {
  margin-left: 1em;
}

.site-nav a + a.router-link-active {
  margin-left: 0;
}

.site-nav a.router-link-active::before {
  content: '🏈';
  display: inline-block;
  font-size: .75em;
  padding-right: 10px;
  vertical-align: text-top;
}

.site-nav a:not(:first-child)::before {
  padding-left: 20px;
}

.site-title {
  background-color: var(--color-primary);
  color: var(--color-white);
  text-align: center;
  border-left: 30px solid var(--color-grey-light);
  border-right: 30px solid var(--color-grey-light);
}

.rankings {
  margin-top: 1em;
}

.tight li {
  margin-bottom: 0.5rem;
}
</style>
