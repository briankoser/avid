# avid
Fantasy Football draft helper

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
- [ ] Save draft results

## Private draft Requirements
- [x] Timer for each pick
- [x] Enter picks with keyboard only
- [ ] Pre-draft ranking view
- [ ] Roster view
- [ ] Zoomed-out position view: see at a glance which positions have high-rated players left
- [ ] Bye-week view, so you can see when each of your players has a bye week
- [ ] Mark target players

## Multiple-user draft Requirements
- [ ] SignalR
- [ ] When timer runs out: auto-pick highest ranked player, skip pick, pause until pick entered

## Enhancements
- [ ] Input settings: team names, positions, league size, draft type, etc.
- [ ] Select first option by default on autopick
- [ ] Work offline
- [ ] Load player list from online
- [ ] Transitions ([vue-animate](https://github.com/haydenbbickerton/vue-animate))
- [ ] SASS

## Colors
[FlatUI](https://material.google.com/style/color.html#color-color-palette) colors: 
Green: #4caf50
Black: #212121
Grey: #bdbdbd
White: #fafafa