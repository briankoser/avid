<template>
  <div class="draft">
    <div class="grid">
      <div class="col-8">
        <div class="draft-picks">
          <template v-for="round in rounds"> 
          <h1 class="epsilon">Round {{ round.number }}</h1>
          <ol class="tight">
              <li v-for="pick in round.picks">
                {{ pick.team.name }} → <strong>{{ pick.player.name }}</strong> 
                <span class="position milli">{{ pick.player.position }}</span>
              </li>
          </ol>
          </template>
        </div>
        <button id="saveDraft" class="save-draft">Download</button>
      </div>
      <div class="draft-order milli col-4">
        <h1 class="primary-bg white keno">DRAFT ORDER</h1>
        <ol class="subtle-grey-bg tight">
          <li v-for="team in teams">
            <span v-show="team.name === currentTeam">
              <b class="primary" title="{{ team.owner }}">{{ team.name }}</b>
            </span>
            <span v-else>
              <span :class="{ 'user-team': team.isUser }" title="{{ team.owner }}">{{ team.name }}</span>
            </span>
          </li>
        </ol>
      </div>
    </div>

    <div v-if="pickCountRemaining > 0" class="pickerArea"> <!--subtle-grey-bg-->
      <div class="center">
        <countdown :seconds.sync="current.pickSecondsLeft" ></countdown>
      </div>

      <div class="pickControls grid">
        <div class="pickInfo col-4">
          <div class="zeta">Pick {{ current.pickNumber.overall }}</div> 
          <div class="team epsilon">{{ currentTeam }}</div>
        </div>
        <div class="col-8">
          <picker :current-team="currentTeam"></picker>
        </div>
        <div class="col-12 right">
          <button v-on:click="removePick">Undo</button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="pickCountRemaining === 0" class="postDraft">
    Draft over!
  </div>
</template>

<script>
import NflTeam from '../classes/nflTeam'
import Pick from '../classes/pick'
import PickNumber from '../classes/pickNumber'
import Player from '../classes/player'
import Countdown from './Countdown'
import Picker from './Picker'
import { addPick, addStateEntry, undoLastPick, undoStateEntry } from '../vuex/actions'
import { getDraftOrderTypes, getDraftOrderTypeLeague, getLastStateEntry, getPickCountRemaining, getPicks, getPlayer, getSecondsPerPick, getTeams } from '../vuex/getters'

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
      draftOrderTypes: getDraftOrderTypes,
      draftOrderType: getDraftOrderTypeLeague,
      getPlayer: getPlayer,
      lastStateEntry: getLastStateEntry,
      pickCountRemaining: getPickCountRemaining,
      picks: getPicks,
      secondsPerPick: getSecondsPerPick,
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
        pickNumber: {
          overall: 1,
          round: 1
        },
        pickSecondsLeft: 0,
        round: 1,
        teamIndex: 0
      }
    }
  },

  computed: {
    currentTeam: function () {
      return this.teams[this.current.teamIndex].name
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
    addPick: function (newPlayer) {
      this.addStateEntry(Object.assign({}, this.current))
      this.resetPickSecondsLeft()

      let player = this.getPlayer(newPlayer.id)
      if (player === undefined) { // unranked player
        let nflTeam = new NflTeam(newPlayer.team, 0)
        player = new Player(newPlayer.id, newPlayer.name, newPlayer.position, nflTeam)
      }
      let pickNumberPosition = this.picks.filter(pick => pick.player.positionKey === player.positionKey).length + 1
      let pickNumber = new PickNumber(this.current.pickNumber.overall, pickNumberPosition, this.current.pickNumber.round)
      let pick = new Pick(pickNumber, player, this.current.round, this.teams[this.current.teamIndex])

      this.updateCurrentState()
      this.addPickToState(pick)
    },
    removePick: function () {
      this.undoLastPick()
      this.retreatCurrentState()
      this.resetPickSecondsLeft()
    },
    resetPickSecondsLeft: function () {
      this.current.pickSecondsLeft = this.secondsPerPick
    },
    retreatCurrentState: function () {
      this.current = this.lastStateEntry
      this.undoStateEntry()
    },
    updateCurrentState: function () {
      if (this.draftOrderType === this.draftOrderTypes.sequential) {
        this.updateCurrentStateSequential()
      } else if (this.draftOrderType === this.draftOrderTypes.serpentine) {
        this.updateCurrentStateSerpentine()
      } else {
        throw new this.UserException(this.draftOrderType + ' order type not implemented')
      }
    },
    updateCurrentStateSequential: function () {
      if (this.current.teamIndex === this.teams.length - 1) {
        this.current.round += 1
        this.current.pickNumber.round = 1
        this.current.teamIndex = 0
      } else {
        this.current.pickNumber.overall += 1
        this.current.pickNumber.round += 1
        this.current.teamIndex += 1
      }
    },
    updateCurrentStateSerpentine: function () {
      this.current.pickNumber.overall += 1

      if (this.current.pickNumber.overall % (this.teams.length) === 1) {
        this.current.round += 1
        this.current.pickNumber.round = 1
      } else {
        this.current.pickNumber.round += 1
      }

      if (this.current.pickNumber.round === 1) {
        return
      } else {
        const isEvenRound = this.current.round % 2
        this.current.teamIndex = isEvenRound ? this.current.teamIndex + 1 : this.current.teamIndex - 1
      }
    }
  },

  events: {
    'add-pick': function (playerID) {
      this.addPick(playerID)
      $('.draft-picks').trigger('pickAdd')
    }
  }
}

let $ = require('jquery')
$(document).ready(function () {
  var saveDraft = () => {
    var a = document.createElement('a')
    a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(JSON.stringify(window.vueDraft.picks)))
    a.setAttribute('download', `avid-draft-${new Date().toISOString().slice(0, 10)}-${window.vueDraft.current.pickNumber.overall - 1}`)
    a.click()
  }

  $('#saveDraft').on('click', saveDraft)

  var scrollDown = (self) => {
    self.scrollTop = self.scrollHeight - self.clientHeight
  }

  $('.draft-picks').on('pickAdd', function (event) {
    setTimeout(scrollDown, 50, this) // give Vue time to re-render
  })
})
</script>

<style scoped>
.draft-order > * {
  padding: 5px 10px;
}

.draft-order,
.draft-order h1 {
  border-radius: 4px 4px 0 0;
}

.draft-order h1 {
  font-weight: bold;
  padding: 10px 0 5px 10px;
}

.draft-order ol {
  list-style-type: none;
}

.draft-picks {
  max-height: 22em;
  overflow: auto;
}

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

.save-draft {
  margin: 2rem 0 0 0;
}

.user-team {
  font-weight: bold;
}
</style>
