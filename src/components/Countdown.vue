<template>
  <div class="countdown">
      <span class="digit">{{ minutesLeft | two_digits }}</span>:<span class="digit">{{ secondsLeft | two_digits }}</span>
  </div>
</template>

<script>
export default {
  props: {
    seconds: {
      type: Number
    }
  },

  computed: {
    minutesLeft () {
      return Math.floor(this.seconds / 60)
    },
    secondsLeft () {
      return this.seconds % 60
    }
  },

  ready () {
    window.setInterval(() => {
      if (this.seconds > 0) {
        this.seconds -= 1
      }
    }, 1000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.countdown {
  font-family: 'Consolas', monospace;
  font-size: 2em;
}
</style>
