<template>
<div class="draft-picks">
    <template v-for="round in rounds"> 
      <div v-bind:key="round.number">
        <h1 class="epsilon">Round {{ round.number }} <span v-if="areUsingKeepers && round.number === 1">(Keepers)</span></h1>
        <ol class="tight">
            <li v-for="pick in round.picks" v-bind:key="pick">
                {{ pick.team.name }} → <strong>{{ pick.player.name }}</strong> 
                <span class="position milli">{{ pick.player.position }}</span>
            </li>
        </ol>
      </div>
    </template>
</div>
</template>

<script>
import { EventBus } from '../event-bus.js'
import { getAreUsingKeepers } from '../vuex/getters'

export default {
  mounted () {
    EventBus.$on('save-pick', player => {
      setTimeout(this.scrollToEnd, 50) // give Vue time to re-render
    })
  },

  methods: {
    scrollToEnd: function () {
      var container = this.$el
      container.scrollTop = container.scrollHeight
    }
  },

  props: {
    rounds: {
      type: Array
    }
  },

  vuex: {
    getters: {
      areUsingKeepers: getAreUsingKeepers
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
