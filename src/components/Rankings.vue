<template>
<table :class="{ 'onlyDisplayAvailable': onlyDisplayAvailable }">
    <template v-for="(player, index) in playersByPosition(positionSelected)">
        <tr :class="{ 'unavailable': player.pickStatus !== 'a', 'userDrafted': player.pickStatus === 'u', 'lastInTier': isLastInTier(positionSelected, index) }" v-bind:key="player.id">
            <td class="ranking">{{ player.userRanking.overall }}</td>
            <td :class="{'movement': true, 'up': player.userRanking.overall < player.ranking.overall, 'down': player.userRanking.overall > player.ranking.overall }"
              v-bind:title="previousRankMessage(player.userRanking.overall, player.ranking.overall)">
                {{ player.userRanking.overall < player.ranking.overall ? '↑' : '' }}
                {{ player.userRanking.overall > player.ranking.overall ? '↓' : '' }}
                <span v-if="player.ranking.stdDev > 0" class="stdDev">σ{{ player.ranking.stdDev }}</span>
            </td>
            <td>{{ player.positionKey }}</td>
            <td>{{ player.name }}</td>
            <td class="bye">
                <div class="dome-parent" v-if="isDomeKicker(player.positionKey, player.nflTeam.name)">
                  <svg class="dome" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 175.9" width="256" height="176"><path d="m247.7 175.9-239.3 0C3.8 175.9 0 168.4 0 159.2 0 115 13.9 74.2 39.1 44.1 63 15.7 94.6 0 128 0c33.5 0 65 15.7 88.9 44.1 25.2 30.1 39.1 70.9 39.1 115.1 0 9.2-3.7 16.7-8.3 16.7zM208.4 72.8C187 47.4 158.5 33.4 128 33.4 97.5 33.4 69 47.4 47.7 72.8 31.2 92.4 20.9 116.7 17.7 142.5l220.6 0C235.2 116.7 224.8 92.4 208.4 72.8Z"/></svg>
                </div>
                {{ player.nflTeam.bye }}
                <img v-bind:src="logoPath(player.nflTeam.name)" v-bind:alt="player.nflTeam.name" class="team-logo" />
            </td>
        </tr>
    </template>
</table>
</template>

<script>
import { getDomes, getPlayers, getTeamsCount, getTiers } from '../vuex/getters'
import logoMixin from '../mixins/logo'
import { fetchPlayers } from '../vuex/actions'

export default {
  created () {
    if (this.players.length === 0) {
      this.fetchPlayers()
    }
  },

  computed: {
    lastInTierIndexes: function () {
      return []
    }
  },

  methods: {
    isDomeKicker: function (positionKey, teamName) {
      return positionKey === 'PK' && this.domes.includes(teamName)
    },

    // todo: move to computed property
    // todo: allow tiers of size 1
    isLastInTier: function (positionKey, index) {
      let teamsInLeague = this.teamsCount

      let positionTiers = (this.tiers.find(tier => tier.positionKey === positionKey) || {}).sizes

      if (positionTiers === undefined || positionTiers.length === 0) { // for position without tiers and for the "All" view, create tiers based on number of teams in league
        return index > 1 && (index + 1) % teamsInLeague === 0
      }

      let lastInTierIndexes = positionTiers.map((value, index, array) => array.slice(0, index + 1)
        .reduce((sum, value) => sum + parseInt(value, 10)))
        .map(value => value - 1)
      return lastInTierIndexes.find(i => i === index)
    },

    playersByPosition: function (position) {
      return this.players
        .filter(player => position === 'All' || player.positionKey === position)
    },

    previousRankMessage: function (currentRanking, previousRanking) {
      return currentRanking !== previousRanking ? 'Prev. Overall ' + previousRanking : ''
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
      domes: getDomes,
      players: getPlayers,
      teamsCount: getTeamsCount,
      tiers: getTiers
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

.dome {
  height: 14px;
  margin-top: 3px;
  position: absolute;
  right: -90%;
}

.dome-parent {
  position: relative;
}

.lastInTier {
  border-bottom: solid black 3px;
}

.movement {
  cursor: help;
  font-size: 0.85em;
  padding-left: 0;
}

.movement.up {
  color: #4caf50;
  vertical-align: top;
}

.movement.down {
  color: #ff1744;
}

.onlyDisplayAvailable .unavailable {
  display: none;
}

.ranking {
  padding-right: 0;
}

.stdDev {
  font-size: 0.7em;
  padding-left: 0.2em;
}

.team-logo {
  height: 20px;
  width: 30px;
  vertical-align: middle;
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