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
  ready () {
    let scrollDown = (self) => {
      self.scrollTop = self.scrollHeight - self.clientHeight
    }

    $('.draft-picks').on('pickAdd', function (event) {
      setTimeout(scrollDown, 50, this) // give Vue time to re-render
    })
  },

  props: {
    rounds: {
      type: Array
    }
  },

  events: {
    'pick-added': function (playerID) {
      $('.draft-picks').trigger('pickAdd')
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
