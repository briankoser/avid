# avid
Fantasy Football draft helper. Vue.js under the hood.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Milestones
- [x] Public draft, one input
- [x] Private draft, one input
- [ ] Private draft, multiple inputs

## Public draft Requirements
- [x] Autofill picks
- [x] Allow unlisted pick
- [x] Restrict autofill by position
- [x] Display player name, position in autofill
- [x] Remove already-drafted players from autofill
- [x] Set team size and positions, restrict autofill to limits
- [x] Save draft results
- [x] Undo button
- [x] Use addPick action
- [x] Stop drafting when teams are full
- [x] Team view (shows all teams in draft order, current team highlighted)
- [x] Roster view (sidebar)
- [x] Display empty roster spots

## Private draft Requirements
- [x] Timer for each pick
- [x] Enter picks with keyboard only
- [x] Use ideal team size for optional roster spots
- [x] Rankings view

## Multiple-user draft Requirements
- [ ] SignalR
- [ ] When timer runs out: auto-pick highest ranked player, skip pick, pause until pick entered

## Enhancements
- [x] Style empty optional roster spots
- [x] Style user team in draft order
- [x] Highlight user-drafted players in rankings
- [x] Bye weeks 
- [x] Zoomed-out position view: see at a glance which positions have high-rated players left
- [x] Rankings players teams
- [x] Restrict rounds to top of screen
- [x] Rankings players team logos
- [x] Roster column: number of position selected in draft (eg 3rd RB overall)
- [x] Keep draft rounds scrolled to bottom as picks are made
- [x] Option to hide already drafted players from rankings
- [x] Use flex to extend width of pick grids
- [x] Default to user's roster
- [x] Display player team in autofill

- [ ] Position tiers
- [ ] Instead of static draft order, show next X picks (where X is number of teams) to make snake draft order easier to follow
- [ ] Style empty required roster spots
- [ ] Display remaining pick count
- [ ] Option to switch between public and private at start
- [ ] Export rankings
- [ ] Pre-draft ranking
- [ ] Player tags: target, avoid, coming off injury
- [ ] Start draft button
- [ ] Conditionally show/hide elements before and after draft
- [ ] Option to automatically switch to roster of currently picking team
- [ ] Input settings: team names, positions, league size, draft type, etc.
- [ ] Display position max
- [ ] Keepers
- [ ] Injury information
- [ ] Work offline
- [ ] Load player list from online (vue-resource)
- [ ] Load player list from different sources (ESPN, Yahoo, MyFantasyLeague)
- [ ] Transitions ([vue-animate](https://github.com/haydenbbickerton/vue-animate))
- [ ] Switch user, at least for post-draft reports
- [ ] About link in sidebar
- [ ] Use standard deviation to color the overall ranking background to show confidence in ranking

## Refactor
- [x] Better structure objects (players, rankings, etc.)
- [ ] Split Draft.vue into smaller components
- [ ] Use Vuex modules (https://vuex.vuejs.org/en/structure.html)
- [ ] SASS for variables

## Bugs
- [ ] Enter one character and select the first player. Enter the same character again: you are able to draft the same player twice.
- [ ] Undo a pick. That pick now stays in the picker textbox until manually removed, even if further undos are made.
