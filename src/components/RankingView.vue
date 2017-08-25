<template>
<div class="ranking-view">
  <h1 class="delta">Rankings</h1>
  <file-upload file-description="rankings.json" v-on:upload="uploadFile"></file-upload>
</div>
</template>

<script>
import { EventBus } from '../event-bus.js'
import FileUpload from './FileUpload'
import { setTeamRankings } from '../vuex/actions'

export default {
  name: 'RankingView',

  mounted () {
    EventBus.$on('upload', (ext, rankings) => {
      this.uploadFile(ext, rankings)
    })
  },

  vuex: {
    actions: {
      setTeamRankings
    }
  },

  components: {
    'file-upload': FileUpload
  },

  methods: {
    uploadFile: function (ext, rankings) {
      this.setTeamRankings(ext, rankings)
    }
  }
}
</script>