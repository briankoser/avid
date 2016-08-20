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

  <picker></picker>
  Kosers: {{ koserValue }}
  Teams: {{ teams }}
</template>

<script>
import Countdown from './Countdown'
import Picker from './Picker'
import { getKosers, getPicks, getTeams } from '../../vuex/getters'

export default {
  components: {
    Countdown,
    Picker
  },

  vuex: {
    getters: {
      koserValue: getKosers,
      picks: getPicks,
      teams: getTeams
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
      this.resetPickSecondsLeft()

      const pick = {
        numberOverall: this.current.pickNumberOverall,
        numberRound: this.current.pickNumberRound,
        player,
        round: this.current.round,
        team: this.teams[this.current.teamIndex]
      }

      this.updateCurrentState()
      this.picks.push(pick)
      this.newPick = ''
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
  },

  events: {
    'add-pick': function (player) {
      this.addPick(player)
    }
  }
}
</script>

<style scoped>
h1 {
  color: #333;
}
</style>
