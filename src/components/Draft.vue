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
      round: 1,
      newPick: '',
      picks: [
        { team: 'From Wentz it Came', player: 'Dawkins' }
      ]
    }
  },
  methods: {
    addPick: function () {
      const pick = { team: 'From Wentz it Came', player: this.newPick.trim() }
      console.log(pick)
      if (pick) {
        this.picks.push(pick)
        this.newPick = ''
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
