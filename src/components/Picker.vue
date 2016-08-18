<template>
  <div class="pick">
    <span class="current-pick">Current pick: {{ teams[current.teamIndex] }}</span>
    <input class="typeahead" v-model="newPick" type="text" v-on:keyup.enter="addPick">
  </div>

  <button @click='addKoserVuex'>Increment +1</button>
</template>

<script>
import { addKoser } from '../../vuex/actions'
var $ = require('jquery')
require('typeahead.js')

export default {
  vuex: {
    actions: {
      addKoserVuex: addKoser
    }
  },

  data () {
    return {
      current: {
        pickNumberOverall: 1,
        pickNumberRound: 1,
        pickSecondsLeft: 0,
        round: 1,
        teamIndex: 0
      },
      newPick: ''
    }
  }
}

var substringMatcher = function (strs) {
  return function findMatches (q, cb) {
    var matches, substrRegex

    // an array that will be populated with substring matches
    matches = []

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i')

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function (i, str) {
      if (substrRegex.test(str)) {
        matches.push(str)
      }
    })

    cb(matches)
  }
}

var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
  'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
]

$(document).ready(function () {
  let pick = $('.pick .typeahead')
  pick.typeahead({
    hint: true,
    highlight: true,
    minLength: 1
  },
    {
      name: 'states',
      source: substringMatcher(states)
    })

  pick.bind('typeahead:select', function (ev, suggestion) {
    // addPick()
  })
})
</script>

<style>
.typeahead,
.tt-query,
.tt-hint {
  width: 396px;
  height: 30px;
  padding: 8px 12px;
  font-size: 24px;
  line-height: 30px;
  border: 2px solid #ccc;
          border-radius: 8px;
  outline: none;
}

.typeahead {
  background-color: #fff;
}

.typeahead:focus {
  border: 2px solid #0097cf;
}

.tt-query {
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
}

.tt-hint {
  color: #999
}

.tt-menu {
  width: 422px;
  margin: 12px 0;
  padding: 8px 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(0,0,0,.2);
}

.tt-suggestion {
  padding: 3px 20px;
  font-size: 18px;
  line-height: 24px;
}

.tt-suggestion:hover {
  cursor: pointer;
  color: #fff;
  background-color: #0097cf;
}

.tt-suggestion.tt-cursor {
  color: #fff;
  background-color: #0097cf;

}

.tt-suggestion p {
  margin: 0;
}

/* example specific styles */
/* ----------------------- */

#custom-templates .empty-message {
  padding: 5px 10px;
  text-align: center;
}



#scrollable-dropdown-menu .tt-menu {
  max-height: 150px;
  overflow-y: auto;
}
</style>
