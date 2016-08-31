<template>
  <div class="rankings grid">
    <div class="col-5 grid rankings-sidebar">
      <h2 class="col-8 delta">Rankings</h2>
      <div class="col-4">
        <select v-model="positionSelected">
          <option>All</option>
          <option v-for="positionKey in positionKeys">{{ positionKey }}</option>
        </select>
        <label>
          <input type="checkbox" v-model="onlyDisplayAvailable">Undrafted
        </label>
      </div>
      <div class="col-12 pickGridContainer">
        <div v-for="row in pickGridData" class="pickGrid">
          <span class="position milli">{{ row.positionKey }}</span>
          <span v-for="pick in row.pickGrid" track-by="$index" 
            :class="{ pick: true, available: pick === 'a', drafted: pick === 'd', userDrafted: pick === 'u' }">
            &nbsp;  
          </span>
        </div>
      </div>
    </div>
    <div class="col-6" data-push-left="off-1">
      <table :class="{ 'onlyDisplayAvailable': onlyDisplayAvailable }">
        <template v-for="player in playersByPosition(positionSelected)">
        <tr :class="{ 'unavailable': player.pickStatus !== 'a', 'userDrafted': player.pickStatus === 'u' }">
          <td>{{ player.ranking.overall }}</td>
          <!--<td class="milli">σ{{ player.ranking.stdDev | round }}</td>-->
          <td>{{ player.positionKey }}</td>
          <td>{{ player.name }}</td>
          <td class="bye">
            {{ player.nflTeam.bye }}
            <img v-bind:src="logoPath(player.nflTeam.name)" alt="{{ player.nflTeam.name }}" class="team-logo" />
          </td>
        </tr>
        </template>
      </table>
    </div>
</template>

<script>
import { fetchPlayers } from '../vuex/actions'
import { getPickGridData, getPicks, getPlayers, getPositionKeysLeague } from '../vuex/getters'

export default {
  created () {
    if (this.players.length === 0) {
      this.fetchPlayers()
    }
  },

  data () {
    return {
      onlyDisplayAvailable: false,
      positionSelected: 'All'
    }
  },

  methods: {
    logoPath (team) {
      return require(`assets/img/team-logos/${team.toLowerCase()}.png`)
    },
    playersByPosition: function (position) {
      return this.players.filter(player => position === 'All' || player.positionKey === position)
    }
  },

  vuex: {
    actions: {
      fetchPlayers
    },
    getters: {
      pickGridData: getPickGridData,
      picks: getPicks,
      positionKeys: getPositionKeysLeague,
      players: getPlayers
    }
  }
}
</script>

<style scoped>
input[type=checkbox] {
  margin-right: 0.4em;
}

select,
table {
  margin-top: 10px;
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

td:first-child {
  padding-left: 10px;
}

td:last-child {
  padding-right: 10px;
}

.bye {
  font-size: 0.6em;
}

.pickGridContainer {
  padding: 0;
}

.pickGrid {
  display: flex;
  line-height: 2em;
  padding: 5px 0;
  width: 500px;
}

.pickGrid .position {
  display: inline-block;
  padding-right: 0.4em;
  text-align: right;
  width: 2em;
}

.pickGrid .pick {
  display: inline-block;
  flex-grow: 1;
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

.team-logo {
  height: 20px;
  width: 30px;
  vertical-align: middle;
}

.onlyDisplayAvailable .unavailable {
  display: none;
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