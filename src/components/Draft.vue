<template>
  <article class="draft">
    <section>
        <h1>Round {{ round }}</h1>
        <ol>
            <li v-for="pick in picks">
              {{ pick.team }} picked {{ pick.player }}
            </li>
        </ol>
    </section>
  </article>

  <input v-model="newPick" v-on:keyup.enter="addPick">
</template>

<script>
export default {
  data () {
    return {
      currentTeamIndex: 0,
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
      round: 1,
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
      const pick = { team: this.teams[this.currentTeamIndex], player: this.newPick.trim() }
      this.currentTeamIndex = this.getNextTeamIndex()
      if (pick) {
        this.picks.push(pick)
        this.newPick = ''
      }
    },
    getNextTeamIndex: function () {
      if (this.order === this.orderTypes.sequential) {
        if (this.currentTeamIndex === this.teams.length - 1) {
          this.round += 1
          return 0
        } else {
          return this.currentTeamIndex + 1
        }
      } else if (this.order === this.orderTypes.serpentine) {
        if (this.currentTeamIndex === this.teams.length - 1 || (this.currentTeamIndex === 0 && this.picks.length > 0)) {
          this.round += 1
        }

        return this.round % 2 ? this.currentTeamIndex + 1 : this.currentTeamIndex - 1
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
