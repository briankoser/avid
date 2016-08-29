<template>
  <div class="rankings grid">
    <div class="col-5 grid rankings-sidebar">
      <h2 class="col-8 delta">Rankings</h2>
      <div class="col-4">
        <select v-model="positionSelected">
          <option>All</option>
          <option v-for="position in positions">{{ position }}</option>
        </select>
      </div>
      <div class="col-12">
        <div v-for="row in pickGridData" class="pickGrid">
          <span class="position milli">{{ row.position }}</span>
          <span v-for="pick in row.pickGrid" track-by="$index" 
            :class="{ pick: true, available: pick === 'a', drafted: pick === 'd', userDrafted: pick === 'u' }">
            &nbsp;  
          </span>
        </div>
      </div>
    </div>
    <div class="col-6" data-push-left="off-1">
      <table>
        <template v-for="player in playersByPosition(positionSelected)">
        <tr :class="{ 'unavailable': !!player.pick, 'userDrafted': ((player.pick || {}).team || {}).user }">
          <td>{{ player.ranking }}</td>
          <td>{{ player.position }}</td>
          <td>{{ player.name }}</td>
          <td class="milli">{{ player.team }} ({{ player.bye }})</td>
        </tr>
        </template>
      </table>
    </div>
</template>

<script>
import { fetchRankings } from '../vuex/actions'
import { getPickGridData, getPicks, getPositionsLeague, getRankings } from '../vuex/getters'

export default {
  created () {
    if (this.players.length === 0) {
      this.fetchRankings()
    }
  },

  data () {
    return {
      positionSelected: 'All'
    }
  },

  methods: {
    playersByPosition: function (position) {
      return this.players.filter(x => position === 'All' || x.position === position)
    }
  },

  vuex: {
    actions: {
      fetchRankings
    },
    getters: {
      pickGridData: getPickGridData,
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

tr:nth-child(12n) {
  border-bottom: solid black 3px;
}

td {
  padding-left: 20px;
}

td:first-child,
td:last-child {
  text-align: right;
}

.pickGrid {
  line-height: 2em;
  padding: 5px 0;
  width: 500px;
}

.pickGrid .position {
  display: inline-block;
  width: 1.5em;
}

.pickGrid .pick {
  display: inline-block;
  width: 4px;
}

.pickGrid .pick.available {
  background-color: #76ff03;
}

.pickGrid .pick.drafted {
  background-color: #ff1744;
}

.pickGrid .pick.userDrafted {
  background-color: #2979ff;
}

.rankings-sidebar {
  height: 100px;
}

.unavailable {
  font-style: italic;
  opacity: .3;
}

.unavailable.userDrafted {
  color: #4caf50;
  font-style: normal;
  opacity: 1;
}
</style>