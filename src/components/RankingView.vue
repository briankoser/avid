<template>
<div class="ranking-view">
  <h1 class="delta">Rankings</h1>
  <file-upload file-description="rankings.json"></file-upload>
</div>
</template>

<script>
import FileUpload from './FileUpload'
import { setTeamRankings } from '../vuex/actions'

export default {
  name: 'RankingView',
  vuex: {
    actions: {
      setTeamRankings
    }
  },
  components: {
    'file-upload': FileUpload
  },
  events: {
    'send-file': function (ext, rankings) {
      this.setTeamRankings(ext, rankings)
    }
  }
}
</script>

<style scoped>
</style>