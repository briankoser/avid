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

1. Update players
    1. Get the JSON file from My Fantasy League
        - Example API Call: https://www72.myfantasyleague.com/{year}/export?TYPE=players&DETAILS=&SINCE=&PLAYERS=&JSON=1
        - Developers API: https://www72.myfantasyleague.com/{year}/api_info?STATE=test&CMD=export&TYPE=players
        - make sure to update the year in the URL
    2. [Format JSON](http://jsonlint.com)
    3. Move file to /static/players.json
2. Update rankings
    1. Go to http://www03.myfantasyleague.com/{year}/adp
    2. Select parameters: league size, scoring system, etc.
    3. Click "Now!"
    4. Copy URL query string parameters and paste them after the API URL: http://www03.myfantasyleague.com/{year}/export?TYPE=adp&JSON=1&COUNT=100&POS=QB%2BRB%2BWR%2BTE%2BPK%2BDef{queryStringParams}
        - eg http://www03.myfantasyleague.com/2018/export?TYPE=adp&JSON=1&COUNT=100&POS=QB%2BRB%2BWR%2BTE%2BPK%2BDef&INJURED=0&CUTOFF=5&FRANCHISES=12&IS_PPR=-1&IS_KEEPER=0&IS_MOCK=-1&TIME=1533096000
    5. Download json file
    6. [Format JSON](http://jsonlint.com)
    6. Move file to /static/adpRankings-{teamCount}teams-{specialScoring}.json
        - eg /static/adpRankings-12teams-2qb-half.json
    7. Update `rankings` in /src/services/fetchJson.js to get the new rankings file.
3. Update personal rankings
    1. File is located at /static/rankings.json
    2. Format is: `[{id": "7836", "ranking": 24}]`
4. Build for deployment: `npm run build`
5. Deploy files from /dist folder

For detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# Logging

Log entire object:

``` javascript 
this.$util.inspect(myObject))
```
