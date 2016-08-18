<template>
  <countdown :seconds.sync="current.pickSecondsLeft" ></countdown>

  <button v-on:click="resetPickSecondsLeft">Start draft!</button>

  <article class="draft">
    <section>
        <template v-for="round in rounds"> 
        <h1>Round {{ round.number }}</h1>
        <ol>
            <li v-for="pick in round.picks">
              {{ pick.team }} picked {{ pick.player }}
            </li>
        </ol>
        </template>
    </section>
  </article>

  <div class="pick">
    <span class="current-pick">Current pick: {{ teams[current.teamIndex] }}</span>
    <input class="typeahead" v-model="newPick" type="text" v-on:keyup.enter="addPick">
  </div>

<button @click='addKoserVuex'>Increment +1</button>
Kosers: {{ koserValue }}
</template>

<script>
var $ = require('jquery')
require('typeahead.js')
import Countdown from './Countdown'
import { addKoser } from '../../vuex/actions'
import { getKosers } from '../../vuex/getters'

export default {
  components: {
    Countdown
  },

  vuex: {
    actions: {
      addKoserVuex: addKoser
    },
    getters: {
      koserValue: getKosers
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
      newPick: '',
      order: 'ser',
      orderTypes: {
        'random': 'ran',
        'sequential': 'seq',
        'serpentine': 'ser'
      },
      picks: [
        // { team: 'From Wentz it Came', player: 'Dawkins' }
      ],
      settings: {
        secondsPerPick: 60
      },
      teams: [
        'Team A',
        'Team B',
        'Team C',
        'Team D',
        'Team E'
      ]
    }
  },

  computed: {
    rounds: function () {
      let rounds = []

      for (let pick of this.picks) {
        let round = rounds.find(x => x.number === pick.round)
        if (!round) {
          round = { number: pick.round, picks: [] }
          rounds.push(round)
        }

        rounds.find(x => x.number === pick.round).picks.push(pick)
      }

      return rounds
    }
  },

  methods: {
    addPick: function () {
      if (this.newPick.trim() === '') {
        return
      }

      this.resetPickSecondsLeft()

      const pick = {
        numberOverall: this.current.pickNumberOverall,
        numberRound: this.current.pickNumberRound,
        player: this.newPick,
        round: this.current.round,
        team: this.teams[this.current.teamIndex]
      }

      this.updateCurrentState()

      if (pick) {
        this.picks.push(pick)
        this.newPick = ''
      }
    },
    resetPickSecondsLeft: function () {
      this.current.pickSecondsLeft = this.settings.secondsPerPick
    },
    updateCurrentState: function () {
      if (this.order === this.orderTypes.sequential) {
        this.updateCurrentStateSequential()
      } else if (this.order === this.orderTypes.serpentine) {
        this.updateCurrentStateSerpentine()
      } else {
        throw new this.UserException(this.order + ' order type not implemented')
      }
    },
    updateCurrentStateSequential: function () {
      if (this.current.teamIndex === this.teams.length - 1) {
        this.current.round += 1
        this.current.pickNumberRound = 1
        this.current.teamIndex = 0
      } else {
        this.current.pickNumberOverall += 1
        this.current.pickNumberRound += 1
        this.current.teamIndex += 1
      }
    },
    updateCurrentStateSerpentine: function () {
      this.current.pickNumberOverall += 1

      if (this.current.pickNumberOverall % (this.teams.length) === 1) {
        this.current.round += 1
        this.current.pickNumberRound = 1
      } else {
        this.current.pickNumberRound += 1
      }

      if (this.current.pickNumberRound === 1) {
        return
      } else {
        const isEvenRound = this.current.round % 2
        this.current.teamIndex = isEvenRound ? this.current.teamIndex + 1 : this.current.teamIndex - 1
      }
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1 {
  color: #333;
}

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
