<template>
  <aside>
    <select v-model="teamSelected">
      <template v-for="team in orderedTeams">
      <option v-bind:selected="team.isUser ? 'selected' : null" :key="team.draftOrder">{{ team.name }}</option>
      </template>
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
      <tr v-for="(pick, index) in section.picks" v-bind:key="index" 
        :class="[{ 'empty-row': !pick.player }, spotRequired(section.positionKey, index) ? 'required' : 'not-required']">
        <template v-if="pick.player">
          <td class="player">{{ (pick.player || {}).name }}</td>
          <td class="round">{{ pick.round }}</td>
          <td class="rank">{{ (pick.player.ranking || {}).overall || 'U' }}</td>
          <td class="pick">{{ pick.pickNumber.overall || (areUsingKeepers ? 'K' : '') }}</td>
          <td class="rank">{{ (pick.player.ranking || {}).position || 'U' }}</td>
          <td class="pick">{{ pick.pickNumber.position || (areUsingKeepers ? 'K' : '') }}</td>
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
import { getAreUsingKeepers, getRoster, getRosterMinMaxSize, getTeams } from '../vuex/getters'

export default {
  data () {
    return {
      teamSelected: this.teams.find(team => team.isUser).name
    }
  },

  computed: {
    orderedTeams: function () {
      return this.$lodash.orderBy(this.teams, this.teamsByAlpha)
    }
  },

  methods: {
    spotRequired: function (positionKey, index) {
      return this.rosterMinMaxSize.find(position => position.key === positionKey).min >= index + 1
    },
    teamsByAlpha: function (a, b) {
      const getLowerCaseName = (team) => {
        const name = (team || {}).name
        return typeof (name || {}).toLowerCase === 'function' ? name.toLowerCase() : ''
      }

      return getLowerCaseName(a) > getLowerCaseName(b) ? 1 : -1
    }
  },

  vuex: {
    getters: {
      areUsingKeepers: getAreUsingKeepers,
      rosters: getRoster,
      rosterMinMaxSize: getRosterMinMaxSize,
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
  border-top: solid #424242 10px;
  height: 1.4em;
}

.empty-row.not-required {
  background-color: #bdbdbd;
  opacity: 0.6;
}

.empty-row.required {
  background-color: #fafafa;
}
</style>