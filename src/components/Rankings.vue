<template>
  <select v-model="teamSelected">
    <option>All</option>
    <option v-for="position in positions">{{ position }}</option>
  </select>
</template>

<script>
import { getPositionsLeague } from '../../vuex/getters'

export default {
  data () {
    return {
      teamSelected: 'All'
    }
  },

  vuex: {
    getters: {
      positions: getPositionsLeague
    }
  }
}
</script>