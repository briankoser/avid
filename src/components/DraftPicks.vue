<template>
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
</template>

<script>
let $ = require('jquery')

export default {
  mounted () {
    this.$on('savePick', player => {
      setTimeout(scrollDown, 50, $('.draft-picks')) // give Vue time to re-render
    })

    let scrollDown = (self) => {
      self.scrollTop = self.scrollHeight - self.clientHeight
    }
  },

  props: {
    rounds: {
      type: Array
    }
  }
}
</script>

<style scoped>
.draft-picks {
  max-height: 22em;
  overflow: auto;
}
</style>
