<template>
  <div class="rankings grid">
    <h2 class="delta col-3">Rankings</h2>
    <div class="col-2">
      <select v-model="teamSelected">
        <option>All</option>
        <option v-for="position in positions">{{ position }}</option>
      </select>
    </div>
    <div class="col-6" data-push-left="off-1">
      <table>
        <tr v-for="player in players">
          <td>{{ player.ranking }}</td>
          <td>{{ player.position }}</td>
          <td>{{ player.name }}</td>
        </tr>
      </table>
    </div>
</template>

<script>
import { getPositionsLeague } from '../../vuex/getters'

export default {
  data () {
    return {
      teamSelected: 'All'
    }
  },
  props: {
    players: {
      type: Array
    }
  },
  vuex: {
    getters: {
      positions: getPositionsLeague
    }
  }
}
</script>

<style scoped>
  select {
    margin-top: 10px;
    width: 100%;
  }
</style>