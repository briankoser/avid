<template>
  <div class="draft">
    <div class="center">
      <button v-on:click="resetPickSecondsLeft" class="button-primary">Start draft!</button>
    </div>

    <article class="draft-rounds">
      <section>
          <template v-for="round in rounds"> 
          <h1 class="epsilon">Round {{ round.number }}</h1>
          <ol class="tight">
              <li v-for="pick in round.picks">
                {{ pick.team }} → <strong>{{ pick.player.name }}</strong> 
                <span class="position milli">{{ pick.player.position }}</span>
              </li>
          </ol>
          </template>
      </section>
    </article>
    Teams: {{ teams }}

    <div class="grid-1-right">
      <button id="saveDraft">Download</button>
    </div>

    <div class="center">
      <countdown :seconds.sync="current.pickSecondsLeft" ></countdown>
    </div>

    <div v-if="pickCountRemaining > 0" class="pickControls grid-center">
      <div class="pickInfo col-4">
        <div class="zeta">Pick {{ pickCountRemaining }}</div> 
        <div class="team epsilon">{{ currentTeam }}</div>
      </div>
      <div class="col-6">
        <picker :current-team="currentTeam"></picker>
      </div>
      <div class="col-1">
        <button v-on:click="removePick">Undo</button>
      </div>
    </div>
  </div>

  <div v-if="pickCountRemaining === 0" class="postDraft">
    Draft over!
  </div>
</template>

<script>
import Countdown from './Countdown'
import Picker from './Picker'
import { addPick, addStateEntry, undoLastPick, undoStateEntry } from '../../vuex/actions'
import { getLastStateEntry, getPickCountRemaining, getPicks, getTeams } from '../../vuex/getters'

export default {
  created: function () {
    window.vueDraft = this
  },

  components: {
    Countdown,
    Picker
  },

  vuex: {
    getters: {
      lastStateEntry: getLastStateEntry,
      pickCountRemaining: getPickCountRemaining,
      picks: getPicks,
      teams: getTeams
    },
    actions: {
      addPickToState: addPick,
      addStateEntry,
      undoLastPick,
      undoStateEntry
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
      order: 'ser',
      orderTypes: {
        'random': 'ran',
        'sequential': 'seq',
        'serpentine': 'ser'
      },
      settings: {
        secondsPerPick: 60
      }
    }
  },

  computed: {
    currentTeam: function () {
      return this.teams[this.current.teamIndex]
    },
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
    addPick: function (player) {
      this.addStateEntry(Object.assign({}, this.current))
      this.resetPickSecondsLeft()

      const pick = {
        numberOverall: this.current.pickNumberOverall,
        numberRound: this.current.pickNumberRound,
        player,
        round: this.current.round,
        team: this.teams[this.current.teamIndex]
      }

      this.updateCurrentState()
      this.addPickToState(pick)
    },
    removePick: function () {
      this.undoLastPick()
      this.retreatCurrentState()
      this.resetPickSecondsLeft()
    },
    resetPickSecondsLeft: function () {
      this.current.pickSecondsLeft = this.settings.secondsPerPick
    },
    retreatCurrentState: function () {
      this.current = this.lastStateEntry
      this.undoStateEntry()
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
  },

  events: {
    'add-pick': function (player) {
      this.addPick(player)
    }
  }
}

let $ = require('jquery')
$(document).ready(function () {
  var saveDraft = () => {
    var a = document.createElement('a')
    a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(JSON.stringify(window.vueDraft.picks)))
    a.setAttribute('download', `avid-draft-${new Date().toISOString().slice(0, 10)}-${window.vueDraft.current.pickNumberOverall - 1}`)
    a.click()
  }

  $('#saveDraft').on('click', saveDraft)
})
</script>

<style scoped>
.pickInfo {
  line-height: 1em;
}

.pickInfo div {
  margin: 0;
}

.pickInfo .team {
  margin-top: -0.3em;
}

.pickInfo .position {
  font-family: Consolas, monospace;
  text-transform: uppercase;
}
</style>
