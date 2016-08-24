<template>
  <div class="picker">
    <input class="typeahead alpha" type="text" placeholder="Player" v-model="player">
  </div>
</template>

<script>
import { getPicksIDs, getPositionsLeague, getPositionsTeamRemaining } from '../../vuex/getters'
let $ = require('jquery')
require('typeahead.js')
let Bloodhound = require('typeahead.js/dist/bloodhound.js')

export default {
  created: function () {
    window.vuePicker = this
  },

  props: {
    currentTeam: {
      type: String
    }
  },

  data () {
    return {
      player: ''
    }
  },

  vuex: {
    getters: {
      picks: getPicksIDs,
      positions: getPositionsLeague,
      positionLimits: getPositionsTeamRemaining
    }
  },

  methods: {
    addPick: function (player) {
      this.$dispatch('add-pick', player)
      this.player = ''
    }
  }
}

let playersTokenizer = function (datum) {
  return Bloodhound.tokenizers.whitespace(datum.name)
}

let playersIdentifier = function (datum) {
  return datum.id
}

let engine = new Bloodhound({
  datumTokenizer: playersTokenizer,
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  identify: playersIdentifier,
  local: [{
    'position': 'XX',
    'name': 'Unlisted',
    'id': '1',
    'team': 'FA'
  }],
  prefetch: {
    url: '../static/players.json',
    transform: (response) => response.players.player.filter(x => window.vuePicker.positions.includes(x.position))
  }
})

let teamPositionsRemaining = (id) => window.vuePicker.positionLimits(id)
let filterLimits = (suggestions) => suggestions.filter(x => teamPositionsRemaining(window.vuePicker.currentTeam).includes(x.position))

let filterPicked = (suggestions) => suggestions.filter(x => !window.vuePicker.picks.includes(x.id))

$(document).ready(function () {
  let pick = $('.picker .typeahead')
  let options = {
    autoSelect: true,
    hint: true,
    minLength: 1
  }

  pick.typeahead(options, {
    name: 'players',
    source: function (query, callback) {
      engine.search(query, function (suggestions) {
        callback(filterLimits(filterPicked(suggestions)))
      })
    },
    display: 'name',
    templates: {
      empty: '<div class="empty-message">No players found</div>',
      suggestion: function (data) {
        return `<p>${data.name} (${data.position.toUpperCase()}) </p>`
      }
    }
  })

  pick.bind('typeahead:select', function (ev, suggestion) {
    window.vuePicker.addPick(suggestion)
  })
})
</script>

<style>
.picker .typeahead,
.picker .tt-hint {
  border: 2px solid #ccc;
  border-radius: 8px;
  line-height: 30px;
  outline: none;
  padding: 8px 12px;
}

.picker .twitter-typeahead,
.picker .typeahead,
.picker .tt-menu {
  width: 100%;
}

.picker .typeahead {
  background-color: #fff;
  font-size: 2em;
  height: 1.6em;
}

.picker .typeahead:focus {
  border: 2px solid #4caf50;
}

.picker .tt-hint {
  color: #999
}

.picker .tt-menu {
  background-color: #fff;
  border: 1px solid #ccc;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0 0 8px 8px;
  box-shadow: 0 5px 10px rgba(0,0,0,.2);
  margin-top: 5px;
}

.picker .tt-suggestion,
.picker .empty-message {
  font-size: 1.25em;
}

.picker .tt-suggestion {
  font-size: 1.25em;
  line-height: 50px;
  padding: 0 20px;
  margin: 0;
}

.picker .tt-suggestion:hover {
  cursor: pointer;
  color: #fff;
  background-color: #4caf50;
}

.picker .tt-suggestion.tt-cursor {
  color: #fff;
  background-color: #4caf50;
}

.picker .tt-suggestion p {
  margin: 0;
}

.picker .empty-message {
  padding: 5px 10px;
  text-align: center;
}
</style>
