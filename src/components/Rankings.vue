<template>
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
</template>

<script>
import { getPlayers } from '../vuex/getters'
import logoMixin from '../mixins/logo'
import { fetchPlayers } from '../vuex/actions'

export default {
  created () {
    if (this.players.length === 0) {
      this.fetchPlayers()
    }
  },

  props: {
    onlyDisplayAvailable: {
      type: Boolean
    },
    positionSelected: {
      type: String
    }
  },

  mixins: [logoMixin],

  vuex: {
    actions: {
      fetchPlayers
    },
    getters: {
      players: getPlayers
    }
  },

  methods: {
    playersByPosition: function (position) {
      return this.players.filter(player => position === 'All' || player.positionKey === position)
    }
  }
}
</script>

<style scoped>
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