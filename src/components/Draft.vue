<template>
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
    Current pick: {{ teams[current.teamIndex] }}
    <input v-model="newPick" v-on:keyup.enter="addPick">
  </div>
</template>

<script>
export default {
  data () {
    return {
      current: {
        pickNumberOverall: 1,
        pickNumberRound: 1,
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

      // todo: reset countdown timer

      const pick = {
        numberOverall: this.current.pickNumberOverall,
        numberRound: this.current.pickNumberRound,
        player: this.newPick.trim(),
        round: this.current.round,
        team: this.teams[this.current.teamIndex]
      }

      this.updateCurrentState()

      if (pick) {
        this.picks.push(pick)
        this.newPick = ''
      }
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
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #333;
}
</style>
