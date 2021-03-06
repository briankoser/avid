<template>
<div class="draft-view-parent">
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
              <countdown :seconds="current.pickSecondsLeft"></countdown>
          </div>

          <pick-controls :current-pick="current.pickNumber.overall" :current-team="currentTeam"></pick-controls>
      </div>
  </div>

  <div v-if="pickCountRemaining === 0" class="postDraft">
    Draft over!
  </div>

  <command-center></command-center>
</div>
</template>

<script>
import { EventBus } from '../event-bus.js'

import NflTeam from '../classes/nflTeam'
import Pick from '../classes/pick'
import PickNumber from '../classes/pickNumber'
import Player from '../classes/player'

import CommandCenter from './CommandCenter'
import Countdown from './Countdown'
import DraftPicks from './DraftPicks'
import DraftQueue from './DraftQueue'
import PickControls from './PickControls'

import { addPick, addStateEntry, undoLastPick, undoStateEntry, updateKeepers } from '../vuex/actions'
import { getAreUsingKeepers, getDraftOrderTypes, getDraftOrderTypeLeague, getLastStateEntry, getPickCountRemaining, getPicks, getPlayer, getPlayers, getSecondsPerPick, getTeams } from '../vuex/getters'

let $ = require('jquery')

export default {
  name: 'DraftView',

  created: function () {
    window.vueDraft = this
  },

  mounted () {
    let saveDraft = () => {
      let a = document.createElement('a')
      a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(JSON.stringify(window.vueDraft.picks)))
      a.setAttribute('download', `avid-draft-${new Date().toISOString().slice(0, 10)}-${window.vueDraft.current.pickNumber.overall - 1}`)
      a.click()
    }

    $('#saveDraft').on('click', saveDraft)

    EventBus.$on('save-pick', newPlayer => {
      this.addPick(newPlayer)
    })

    EventBus.$on('remove-pick', () => {
      this.removePick()
    })

    if (this.areUsingKeepers) {
      setTimeout(this.updateKeepers, 50)
    }
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
      areUsingKeepers: getAreUsingKeepers,
      draftOrderTypes: getDraftOrderTypes,
      draftOrderType: getDraftOrderTypeLeague,
      getPlayer: getPlayer,
      lastStateEntry: getLastStateEntry,
      pickCountRemaining: getPickCountRemaining,
      picks: getPicks,
      players: getPlayers,
      secondsPerPick: getSecondsPerPick,
      teams: getTeams
    },
    actions: {
      addPickToState: addPick,
      addStateEntry,
      undoLastPick,
      undoStateEntry,
      updateKeepersState: updateKeepers
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
      if (this.current.pickNumber.overall > 1) {
        this.undoLastPick()
        this.current.pickNumber.overall -= 1
        this.retreatCurrentState()
        this.resetPickSecondsLeft()
      }
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

      // update current round and round pick number
      if (this.current.pickNumber.overall % (this.teams.length) === 1) {
        this.current.round += 1
        this.current.pickNumber.round = 1
      } else {
        this.current.pickNumber.round += 1
      }

      // update team picking
      if (this.current.pickNumber.round === 1 || (this.areUsingKeepers && this.current.round === 1)) {
        return
      } else {
        const isEvenRound = this.current.round % 2 === 0
        this.current.teamIndex = isEvenRound === this.areUsingKeepers ? this.current.teamIndex + 1 : this.current.teamIndex - 1 // without keepers, move down (add) in odd rounds (eg round 1) and move up (subtract in even rounds); with keepers, it's the opposite
      }
    },
    updateKeepers: function () {
      if (this.current.round === 1) { // only add keepers once
        let teams = this.teams.slice() // slice makes a copy of the array so we are not modifying the original

        if (this.draftOrderType === this.draftOrderTypes.serpentine) {
          teams.reverse()
        }

        teams.forEach(team => {
          let player = this.players.find(p => p.id === team.keeper)
          let overallPosition = this.draftOrderType === this.draftOrderTypes.serpentine
            ? this.teams.length - team.draftOrder + 1
            : team.draftOrder
          let pickNumberPosition = this.picks.filter(pick => pick.player.positionKey === player.positionKey).length + 1
          let pickNumber = new PickNumber(overallPosition, pickNumberPosition, 1)
          let pick = player === undefined ? undefined : new Pick(pickNumber, player, 1, team)

          if (pick !== undefined) {
            this.updateCurrentState()
            this.addPickToState(pick)
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.save-draft {
  margin: 2rem 0 0 0;
}

.user-team {
  font-weight: bold;
}
</style>
