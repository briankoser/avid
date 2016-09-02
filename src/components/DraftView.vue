<template>
    <div class="draft-view">
        <div class="grid">
            <div class="col-8">
                <draft-picks :rounds="rounds"></draft-picks>
                <button id="saveDraft" class="save-draft">Download</button>
            </div>
            <div class="col-4">
                <draft-queue :current-team="currentTeam"></draft-queue>
            </div>
        </div>

        <div v-if="pickCountRemaining > 0" class="pickerArea"> <!--subtle-grey-bg-->
            <div class="center">
                <countdown :seconds.sync="current.pickSecondsLeft"></countdown>
            </div>

            <pick-controls :current-pick="current.pickNumber.overall" :current-team="currentTeam"></pick-controls>
        </div>
    </div>

    <div v-if="pickCountRemaining === 0" class="postDraft">
      Draft over!
    </div>

    <command-center></command-center>
</template>

<script>
import NflTeam from '../classes/nflTeam'
import Pick from '../classes/pick'
import PickNumber from '../classes/pickNumber'
import Player from '../classes/player'

import CommandCenter from './CommandCenter'
import Countdown from './Countdown'
import DraftPicks from './DraftPicks'
import DraftQueue from './DraftQueue'
import PickControls from './PickControls'

import { addPick, addStateEntry, undoLastPick, undoStateEntry } from '../vuex/actions'
import { getDraftOrderTypes, getDraftOrderTypeLeague, getLastStateEntry, getPickCountRemaining, getPicks, getPlayer, getSecondsPerPick, getTeams } from '../vuex/getters'

export default {
  created: function () {
    window.vueDraft = this
  },

  components: {
    'command-center': CommandCenter,
    Countdown,
    'draft-queue': DraftQueue,
    'draft-picks': DraftPicks,
    'pick-controls': PickControls
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
      this.$broadcast('pick-added', playerID)
    },
    'remove-pick': function () {
      this.removePick()
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
})
</script>

<style scoped>
.save-draft {
  margin: 2rem 0 0 0;
}

.user-team {
  font-weight: bold;
}
</style>
