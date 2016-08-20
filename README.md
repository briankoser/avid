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

## Colors
[FlatUI](https://material.google.com/style/color.html#color-color-palette) colors: 
Green: #4caf50
Black: #212121
Grey: #bdbdbd
White: #fafafa

## Requirements
- [ ] Autofill picks
- [ ] Remove already drafter player from autofill
- [ ] Input settings: team names, positions, etc.
- [ ] Save draft results
- [ ] Pre-draft ranking view
- [ ] Roster view
- [ ] Zoomed-out position view: see at a glance which positions have high-rated players left
- [ ] When timer runs out: auto-pick highest ranked player, skip pick, pause until pick entered
- [ ] Transitions ([vue-animate](https://github.com/haydenbbickerton/vue-animate))
- [ ] Bye-week view, so you can see when each of your players has a bye week
- [ ] Mark target players
- [ ] SASS
- [ ] Work offline
- [ ] Variable league size
- [ ] Load player list from online
- [ ] Multi-user mode (SignalR)
- [x] Timer for each pick
- [x] Enter picks with keyboard only