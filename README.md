# avid
Fantasy Football draft helper. Vue.js under the hood. Hosted at [avid.koser.us](http://avid.koser.us).

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Season Set Up

1. Update players.json
  1. Get the XML file from My Fantasy League
    - [Example API Call](https://www72.myfantasyleague.com/2018/export?TYPE=players&DETAILS=&SINCE=&PLAYERS=&JSON=0)
    - [Developers API](https://www72.myfantasyleague.com/2018/api_info?STATE=test&CMD=export&TYPE=players)
  2. Convert the XML to JSON
  3. Move file to /static/players.json




For detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# Logging

Log entire object:

``` javascript 
this.$util.inspect(myObject))
```
