<template>
  <aside>
    <select v-model="teamSelected">
      <option v-for="team in teamsAlpha">{{ team.name }}</option>
    </select>
    <!--<button v-on:click="" class="button-primary">Start draft!</button>-->

    <table v-for="section in rosters(teamSelected)">
      <tr>
        <th rowspan="2" class="position">{{ section.positionKey }}</th>
        <th rowspan="2">Round</th>
        <th colspan="2">Overall</th>
        <th colspan="2">Position</th>
        <th rowspan="2">Bye</th>
      </tr>
      <tr>
        <th>Rank</th>
        <th>Pick</th>
        <th>Rank</th>
        <th>Pick</th>
      </tr>
      <tr v-for="pick in section.picks" track-by="$index" :class="{ 'empty-row': !pick.player }">
        <template v-if="pick.player">
          <td class="player">{{ (pick.player || {}).name }}</td>
          <td class="round">{{ pick.round }}</td>
          <td class="rank">{{ pick.player.ranking.overall }}</td>
          <td class="pick">{{ pick.pickNumber.overall }}</td>
          <td class="rank">{{ pick.player.ranking.position }}</td>
          <td class="pick">{{ pick.pickNumber.position }}</td>
          <td class="bye">{{ pick.player.nflTeam.bye }}</td>
        </template>
        <template v-else>
          <td class="player"></td>
          <td class="round"></td>
          <td class="rank"></td>
          <td class="pick"></td>
          <td class="rank"></td>
          <td class="pick"></td>
          <td class="bye"></td>
        </template>
      </tr>
    </table>
  </aside>
</template>

<script>
import { getRoster, getTeams } from '../vuex/getters'

export default {
  data () {
    return {
      teamSelected: ''
    }
  },

  computed: {
    teamsAlpha: function () {
      return this.teams.slice(0).sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
    }
  },

  vuex: {
    getters: {
      rosters: getRoster,
      teams: getTeams
    }
  }
}
</script>

<style scoped>
aside {
  padding: 20px;
}

th {
  font-size: 0.7em;
  padding: 0 10px;
}

th[colspan="2"] {
  border-bottom: none;
  text-align: center;
}

tr:not(:first-child) th {
  font-size: 0.55em;
}

th.position {
  font-size: 1.25em;
}

td {
  padding: 2px 10px;
}

td:first-child {
  padding: 2px 0;
  width: 100%;
}

td.round,
td.rank,
td.bye {
  text-align: right;
}

.empty-row {
  background-color: #bdbdbd;
  border-top: solid #424242 10px;
  height: 1.4em;
  opacity: 0.6;
}
</style>