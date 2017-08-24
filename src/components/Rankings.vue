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
            <td class="tags">
                <div class="tagIconParent">
                    <svg class="tagIcon target" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M388.4 123.6l3.8-42.2c0.4-4.1 2.2-8 5.1-10.9l52.9-52.9c3.4-3.4 9-3.4 12.5 0l31.7 31.7c3.4 3.4 3.4 9 0 12.5l-52.9 52.9c-2.9 2.9-6.8 4.7-10.9 5.1L388.4 123.6z" class="a"/><circle cx="211.9" cy="300.1" r="211.9" class="b"/><circle cx="211.9" cy="300.1" r="158.9" class="c"/><circle cx="211.9" cy="300.1" r="105.9" class="b"/><circle cx="211.9" cy="300.1" r="53" class="c"/><path d="M211.9 309c-2.3 0-4.5-0.9-6.2-2.6 -3.4-3.4-3.4-9 0-12.5l291.3-291.3c3.4-3.4 9-3.4 12.5 0 3.4 3.4 3.4 9 0 12.5l-291.3 291.3C216.4 308.1 214.1 309 211.9 309z" fill="#464655"/><path d="M509.4 2.6c-3.4-3.4-9-3.4-12.5 0l-15.1 15.1 12.5 12.5 15.1-15.1C512.9 11.6 512.9 6 509.4 2.6z" class="a"/></svg>
                </div>
                <div class="tagIconParent" v-if="isDomeKicker(player.positionKey, player.nflTeam.name)">
                    <svg class="tagIcon dome" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 175.9"><path d="m247.7 175.9-239.3 0C3.8 175.9 0 168.4 0 159.2 0 115 13.9 74.2 39.1 44.1 63 15.7 94.6 0 128 0c33.5 0 65 15.7 88.9 44.1 25.2 30.1 39.1 70.9 39.1 115.1 0 9.2-3.7 16.7-8.3 16.7zM208.4 72.8C187 47.4 158.5 33.4 128 33.4 97.5 33.4 69 47.4 47.7 72.8 31.2 92.4 20.9 116.7 17.7 142.5l220.6 0C235.2 116.7 224.8 92.4 208.4 72.8Z"/></svg>
                </div>
            </td>
            <td class="bye">
                {{ player.nflTeam.bye }}
                <img v-bind:src="logoPath(player.nflTeam.name)" v-bind:alt="player.nflTeam.name" class="team-logo" />
            </td>
        </tr>
    </template>
</table>
</template>

<script>
import { getDomes, getPlayers, getTeamsCount, getTags, getTiers } from '../vuex/getters'
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
      return this.tiers.map(tier => {
        let updatedTier = { positionKey: tier.positionKey }
        updatedTier.lastInTier = tier.sizes
          .map((value, index, array) => array.slice(0, index + 1).reduce((sum, value) => sum + parseInt(value, 10)))
          .map(value => value - 1)
        return updatedTier
      })
    }
  },

  methods: {
    isDomeKicker: function (positionKey, teamName) {
      return positionKey === 'PK' && this.domes.includes(teamName)
    },

    // todo: allow tiers of size 1
    isLastInTier: function (positionKey, index) {
      let teamsInLeague = this.teamsCount
      let positionTiers = (this.lastInTierIndexes.find(tier => tier.positionKey === positionKey) || {}).lastInTier
      if (positionTiers === undefined || positionTiers.length === 0) { // for position without tiers and for the "All" view, create tiers based on number of teams in league
        return index > 1 && (index + 1) % teamsInLeague === 0
      }

      return positionTiers.find(i => i === index) !== undefined
    },

    isTarget: function (playerId) {
      return true
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
      tags: getTags,
      tiers: getTiers
    }
  }
}
</script>

<style scoped>
/* Elements */
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
  padding-left: 0;
}

td:last-child {
  padding-right: 10px;
}



/* Tags */
.bye {
  font-size: 0.6em;
}

.dome {
  width: 25px;
}

.tagIcon {
  height: 25px;
  margin-top: 3px;
}

.target .a {
  fill: #ff6464;
}

.target .b {
  fill: #4caf50;
}

.target .c {
  fill: #fff;
}

.tagIconParent {
  display: inline-block;
}



/* Other Classes */
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