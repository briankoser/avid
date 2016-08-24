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
- [ ] Public draft, one input
- [ ] Private draft, one input
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
- [ ] Roster view (sidebar)
- [ ] Automatically switch to roster of currently picking team
- [ ] Reverse draft order during reverse snake order rounds
- [ ] Move start button to sidebar

## Private draft Requirements
- [x] Timer for each pick
- [x] Enter picks with keyboard only
- [ ] Option to switch between public and private at start
- [ ] Pre-draft ranking view
- [ ] Zoomed-out position view: see at a glance which positions have high-rated players left
- [ ] Bye-week view, so you can see when each of your players has a bye week
- [ ] Mark target players

## Multiple-user draft Requirements
- [ ] SignalR
- [ ] When timer runs out: auto-pick highest ranked player, skip pick, pause until pick entered

## Enhancements
- [ ] Restrict rounds to top of screen
- [ ] Input settings: team names, positions, league size, draft type, etc.
- [ ] Select first option by default on autopick
- [ ] Display player team in autofill
- [ ] Work offline
- [ ] Load player list from online
- [ ] Transitions ([vue-animate](https://github.com/haydenbbickerton/vue-animate))
- [ ] SASS

## Bugs
- [ ] Enter one character and select the first player. Enter the same character again: you are able to draft the same player twice.
- [ ] Undo a pick. That pick now stays in the picker textbox until manually removed, even if further undos are made.
