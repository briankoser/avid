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
                <div class="tagIconParent" v-if="isDomeKicker(player.positionKey, player.nflTeam.name)" title="Dome">
                    <svg class="tagIcon dome" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 175.9"><path d="m247.7 175.9-239.3 0C3.8 175.9 0 168.4 0 159.2 0 115 13.9 74.2 39.1 44.1 63 15.7 94.6 0 128 0c33.5 0 65 15.7 88.9 44.1 25.2 30.1 39.1 70.9 39.1 115.1 0 9.2-3.7 16.7-8.3 16.7zM208.4 72.8C187 47.4 158.5 33.4 128 33.4 97.5 33.4 69 47.4 47.7 72.8 31.2 92.4 20.9 116.7 17.7 142.5l220.6 0C235.2 116.7 224.8 92.4 208.4 72.8Z"/></svg>
                </div>
                <div class="tagIconParent" v-if="isTarget(player.id)" title="Target">
                    <svg class="tagIcon target" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M388.4 123.6l3.8-42.2c0.4-4.1 2.2-8 5.1-10.9l52.9-52.9c3.4-3.4 9-3.4 12.5 0l31.7 31.7c3.4 3.4 3.4 9 0 12.5l-52.9 52.9c-2.9 2.9-6.8 4.7-10.9 5.1L388.4 123.6z" class="a"/><circle cx="211.9" cy="300.1" r="211.9" class="b"/><circle cx="211.9" cy="300.1" r="158.9" class="c"/><circle cx="211.9" cy="300.1" r="105.9" class="b"/><circle cx="211.9" cy="300.1" r="53" class="c"/><path d="M211.9 309c-2.3 0-4.5-0.9-6.2-2.6 -3.4-3.4-3.4-9 0-12.5l291.3-291.3c3.4-3.4 9-3.4 12.5 0 3.4 3.4 3.4 9 0 12.5l-291.3 291.3C216.4 308.1 214.1 309 211.9 309z" fill="#464655"/><path d="M509.4 2.6c-3.4-3.4-9-3.4-12.5 0l-15.1 15.1 12.5 12.5 15.1-15.1C512.9 11.6 512.9 6 509.4 2.6z" class="a"/></svg>
                </div>
                <div class="tagIconParent" v-if="isAvoid(player.id)" title="Avoid">
                    <svg class="tagIcon avoid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M507.5 140.5l-136-136C368.8 1.5 364.9 0 361 0H151c-3.9 0-7.8 1.5-10.5 4.5l-136 136C1.5 143.2 0 147.1 0 151v210c0 3.9 1.5 7.8 4.5 10.5l136 136C143.2 510.5 147.1 512 151 512h210c3.9 0 7.8-1.5 10.5-4.5l136-136C510.5 368.8 512 364.9 512 361V151C512 147.1 510.5 143.2 507.5 140.5z" class="a"/><path d="M512 151v210c0 3.9-1.5 7.8-4.5 10.5l-136 136C368.8 510.5 364.9 512 361 512H256V0h105c3.9 0 7.8 1.5 10.5 4.5l136 136C510.5 143.2 512 147.1 512 151z" class="b"/><path d="M446.5 165.4L346.6 65.5C343.9 62.5 340 61 336.1 61H175.9c-3.9 0-7.8 1.5-10.5 4.5L65.5 165.4C62.5 168.1 61 172 61 175.9V336.1c0 3.9 1.5 7.8 4.5 10.5L165.4 446.5c2.7 3 6.6 4.5 10.5 4.5H336.1c3.9 0 7.8-1.5 10.5-4.5l99.9-99.9c3-2.7 4.5-6.6 4.5-10.5v-160.2C451 172 449.5 168.1 446.5 165.4z" fill="#E0E4EC"/><path d="M451 175.9V336.1c0 3.9-1.5 7.8-4.5 10.5L346.6 446.5c-2.7 3-6.6 4.5-10.5 4.5H256V61h80.1c3.9 0 7.8 1.5 10.5 4.5l99.9 99.9C449.5 168.1 451 172 451 175.9z" fill="#D1D7E3"/><path d="M329.8 91H182.2L91 182.2v147.6L182.2 421H329.8l91.2-91.2v-147.6L329.8 91z" class="a"/><polygon points="421 182.2 421 329.8 329.8 421 256 421 256 91 329.8 91 " class="b"/></svg>
                </div>
                <div class="tagIconParent" v-if="isOverpriced(player.id)" title="Overpriced">
                    <svg class="tagIcon overpriced" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M448.8 152.9L359.1 63.2c-27.2 27.2-71.3 27.2-98.5 0L0 323.8 188.2 512l260.6-260.6C421.6 224.2 421.6 180.1 448.8 152.9zM364.1 189.4c-11.4 11.4-30 11.4-41.4 0 -11.4-11.4-11.4-30 0-41.4 11.4-11.4 30-11.4 41.4 0C375.5 159.4 375.5 177.9 364.1 189.4z" fill="orange"/><path d="M350 174.3c-3.1 0-6.3-1.2-8.7-3.6 -4.8-4.8-4.8-12.6 0-17.4L491 3.6c4.8-4.8 12.6-4.8 17.4 0 4.8 4.8 4.8 12.6 0 17.4L358.7 170.7C356.3 173.1 353.2 174.3 350 174.3z" fill="#006b9f"/><path d="M99.4 349.6c-3.1 0-6.3-1.2-8.7-3.6 -4.8-4.8-4.8-12.6 0-17.4l142.6-142.6c4.8-4.8 12.6-4.8 17.4 0 4.8 4.8 4.8 12.6 0 17.4L108.1 346C105.7 348.4 102.6 349.6 99.4 349.6z" class="a"/><path d="M137.1 387.2c-3.1 0-6.3-1.2-8.7-3.6 -4.8-4.8-4.8-12.6 0-17.4l142.6-142.6c4.8-4.8 12.6-4.8 17.4 0 4.8 4.8 4.8 12.6 0 17.4L145.8 383.6C143.4 386 140.2 387.2 137.1 387.2z" class="a"/><path d="M174.7 424.8c-3.1 0-6.3-1.2-8.7-3.6 -4.8-4.8-4.8-12.6 0-17.4l93-93c4.8-4.8 12.6-4.8 17.4 0 4.8 4.8 4.8 12.6 0 17.4l-93 93C181 423.6 177.9 424.8 174.7 424.8z" class="a"/></svg>
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
    isAvoid: function (playerId) {
      return this.isInTag('avoid', playerId)
    },

    isDomeKicker: function (positionKey, teamName) {
      return positionKey === 'PK' && this.domes.includes(teamName)
    },

    isInTag: function (tag, playerId) {
      return this.tags.find(t => t.name === tag).players.find(p => p === playerId)
    },

    isLastInTier: function (positionKey, index) {
      let teamsInLeague = this.teamsCount
      let positionTiers = (this.lastInTierIndexes.find(tier => tier.positionKey === positionKey) || {}).lastInTier
      if (positionTiers === undefined || positionTiers.length === 0) { // for position without tiers and for the "All" view, create tiers based on number of teams in league
        return index > 1 && (index + 1) % teamsInLeague === 0
      }

      return positionTiers.find(i => i === index) !== undefined
    },

    isOverpriced: function (playerId) {
      return this.isInTag('overpriced', playerId)
    },

    isTarget: function (playerId) {
      return this.isInTag('target', playerId)
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
.tagIcon {
  height: 25px;
  margin-top: 3px;
}

.tagIconParent {
  cursor: help;
  display: inline-block;
}

.avoid .a {
  fill: #d94158;
}

.avoid .b {
  fill: #cc2944;
}

.dome {
  width: 25px;
}

.overprice .a {
  fill:#181818;
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



/* Other Classes */
.bye {
  font-size: 0.6em;
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