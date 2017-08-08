<template>
<div class="draft-order milli">
    <h1 class="primary-bg white keno">DRAFT ORDER</h1>
    <ol class="subtle-grey-bg tight">
        <li v-for="team in teams">
            <span v-if="team.name === currentTeam">
                <b class="primary" v-bind:title="team.owner">{{ team.name }}</b>
            </span>
            <span v-else>
                <span :class="{ 'user-team': team.isUser }" v-bind:title="team.owner">{{ team.name }}</span>
            </span>
        </li>
    </ol>
</div>
</template>

<script>
import { getTeams } from '../vuex/getters'

export default {
  props: {
    currentTeam: {
      type: String
    }
  },

  vuex: {
    getters: {
      teams: getTeams
    }
  }
}
</script>

<style scoped>
.draft-order > * {
  padding: 5px 10px;
}

.draft-order,
.draft-order h1 {
  border-radius: 4px 4px 0 0;
}

.draft-order h1 {
  font-weight: bold;
  padding: 10px 0 5px 10px;
}

.draft-order ol {
  list-style-type: none;
}

.user-team {
  font-weight: bold;
}
</style>
