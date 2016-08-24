<template>
  <aside>
    <select>
      <option v-for="team in teamsAlpha">{{ team }}</option>
    </select>

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
import { getTeams } from '../../vuex/getters'

export default {
  data () {
    return {
    }
  },

  computed: {
    teamsAlpha: function () {
      return this.teams.slice(0).sort()
    }
  },

  vuex: {
    getters: {
      teams: getTeams
    }
  }
}
</script>