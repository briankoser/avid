<template>
  <article class="draft">
    <section>
        <h1>Round {{ current.round }}</h1>
        <ol>
            <li v-for="pick in picks">
              {{ pick.team }} picked {{ pick.player }}
            </li>
        </ol>
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
  methods: {
    addPick: function () {
      const pick = {
        team: this.teams[this.current.teamIndex],
        player: this.newPick.trim(),
        round: this.current.round
      }

      this.current.teamIndex = this.getNextTeamIndex()
      if (pick) {
        this.picks.push(pick)
        this.newPick = ''
      }
    },
    getNextTeamIndex: function () {
      if (this.order === this.orderTypes.sequential) {
        if (this.current.teamIndex === this.teams.length - 1) {
          this.current.round += 1
          return 0
        } else {
          return this.current.teamIndex + 1
        }
      } else if (this.order === this.orderTypes.serpentine) {
        if (this.current.teamIndex === this.teams.length - 1 || (this.current.teamIndex === 0 && this.picks.length > 0)) {
          this.current.round += 1
        }

        return this.current.round % 2 ? this.current.teamIndex + 1 : this.current.teamIndex - 1
      } else {
        throw new this.UserException(this.order + ' order type not implemented')
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
