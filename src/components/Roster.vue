<template>
  <aside>
    <select v-model="teamSelected">
      <option v-for="team in teamsAlpha">{{ team }}</option>
    </select>

    <table>
      <tr>
          <th>Position</th>
          <th>Player</th>
          <th>Pick</th>
      </tr>
      <tr v-for="pick in rosters(teamSelected)"> <!-- { numberOverall, numberRound, player, round, team } -->
        <td>{{ pick.player.position }}</td>
        <td>{{ pick.player.name }}</td>
        <td>{{ pick.numberOverall }}</td>
      </tr>
    </table>

    <table>
      <tr>
        <th>QB</th>
        <th>Bye</th>
        <th>Rank</th>
        <th>Round</th>
      </tr>
      <tr>
        <td>Player1</td>
        <td>7</td>
        <td>1</td>
        <td>1</td>
      </tr>
      <tr></tr><!-- available slot -->
    </table>

    <table>
      <tr>
        <th>RB</th>
        <th>Bye</th>
        <th>Rank</th>
        <th>Round</th>
      </tr>
      <tr>
        <td>Player3</td>
        <td>8</td>
        <td>3</td>
        <td>3</td>
      </tr>
      <tr></tr><!-- available slot -->
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
      return this.teams.slice(0).sort()
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