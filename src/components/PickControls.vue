<template>
<div class="pickControls grid">
    <div class="pickInfo col-4">
        <div class="zeta">Pick {{ currentPick }}</div> 
        <div class="team epsilon">{{ currentTeam }}</div>
    </div>
    <div class="col-8">
        <picker :current-team="currentTeam"></picker>
    </div>
    <div class="col-12 right">
        <button v-on:click="removePick">Undo</button>
    </div>
</div>
</template>

<script>
import Picker from './Picker'

export default {
  props: {
    currentPick: {
      type: Number
    },
    currentTeam: {
      type: String
    }
  },

  components: {
    Picker
  },

  methods: {
    removePick: function () {
      this.$emit('removePick')
    }
  }
}
</script>

<style scoped>
.pickInfo {
  line-height: 1em;
}

.pickInfo div {
  margin: 0;
}

.pickInfo .team {
  margin-top: -0.3em;
}

.pickInfo .position {
  font-family: Consolas, monospace;
  text-transform: uppercase;
}
</style>
