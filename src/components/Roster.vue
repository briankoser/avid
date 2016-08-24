<template>
  <aside>
    <select v-model="teamSelected">
      <option v-for="team in teamsAlpha">{{ team.name }}</option>
    </select>

    <!-- { numberOverall, numberRound, player, round, team } -->
    <table v-for="section in rosters(teamSelected)">
      <tr>
        <th>{{ section.position }}</th>
        <th>Round</th>
        <th>Pick</th>
        <th>Rank</th>
        <th>Bye</th>
      </tr>
      <tr v-for="pick in section.picks" track-by="$index">
        <td>{{ pick.player ? pick.player.name : '' }}</td>
        <td>{{ pick.round }}</td>
        <td>{{ pick.numberOverall }}</td>
        <td></td>
        <td></td>
      </tr>
    </table>
  </aside>
</template>

<script>
import { getRoster, getTeams } from '../../vuex/getters'

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
</style>