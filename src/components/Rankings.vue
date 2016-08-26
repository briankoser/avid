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
        <template v-for="player in players" track-by="id">
        <tr :class="{ 'unavailable': !player.available }">
          <td>{{ player.ranking }}</td>
          <td>{{ player.position }}</td>
          <td>{{ player.name }}</td>
        </tr>
        </template>
      </table>
    </div>
</template>

<script>
import { fetchRankings } from '../vuex/actions'
import { getPicks, getPositionsLeague, getRankings } from '../vuex/getters'

export default {
  created () {
    if (this.players.length === 0) {
      this.fetchRankings()
    }
  },

  data () {
    return {
      teamSelected: 'All'
    }
  },

  vuex: {
    actions: {
      fetchRankings
    },
    getters: {
      picks: getPicks,
      positions: getPositionsLeague,
      players: getRankings
    }
  }
}
</script>

<style scoped>
select,
table {
  margin-top: 10px;
}

select {
  width: 100%;
}

tr:nth-child(2n + 1) {
  background-color: #ececec;
}

td {
  padding-left: 20px;
}

td:first-child {
  text-align: right;
}

.unavailable {
  font-style: italic;
  opacity: .3;
}
</style>