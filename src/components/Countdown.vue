<template>
  <div class="timer">
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

  data () {
    return {
      now: this.seconds
    }
  },

  computed: {
    minutesLeft () {
      return Math.floor(this.now / 60)
    },
    secondsLeft () {
      return this.now % 60
    }
  },

  ready () {
    window.setInterval(() => {
      if (this.now > 0) {
        this.now -= 1
      }
    }, 1000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.timer {
  font-family: 'Consolas', monospace;
  font-size: 2em;
}
</style>
