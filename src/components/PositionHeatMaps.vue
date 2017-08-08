<template>
<div class="position-heat-maps-parent">
  <div v-for="(positionHeatMap, index) in positionHeatMaps" class="positionHeatMaps" v-bind:key="positionHeatMap.positionKey">
      <span class="position milli">{{ positionHeatMap.positionKey }}</span>
      <span v-for="(pick, index) in positionHeatMap.heatMap" :key="index" 
      :class="{ pick: true, available: pick === 'a', drafted: pick === 'd', userDrafted: pick === 'u' }">
          &nbsp;
      </span>
  </div>
</div>
</template>

<script>
import { getPositionHeatMaps } from '../vuex/getters'

export default {
  vuex: {
    getters: {
      positionHeatMaps: getPositionHeatMaps
    }
  }
}
</script>

<style scoped>
.positionHeatMaps {
  display: flex;
  height: 60px;
  line-height: 2em;
  padding: 5px 0;
  width: 500px;
}

.position {
  display: inline-block;
  padding-right: 0.4em;
  text-align: right;
  width: 2em;
}

.pick {
  display: inline-block;
  flex-grow: 1;
  width: 4px;
}

.pick.available {
  background-color: #76ff03;
}

.pick.drafted {
  background-color: #ff1744;
}

.pick.userDrafted {
  background-color: #2979ff;
}
</style>