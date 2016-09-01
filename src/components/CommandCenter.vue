<template>
<div class="rankings grid">
    <div class="col-5 grid rankings-sidebar">
        <h2 class="col-8 delta">Rankings</h2>
        <div class="col-4">
            <select v-model="positionSelected">
                <option>All</option>
                <option v-for="positionKey in positionKeys">{{ positionKey }}</option>
            </select>
            <label>
                <input type="checkbox" v-model="onlyDisplayAvailable">Undrafted
            </label>
        </div>
        <div class="col-12 pickGridContainer">
            <position-heat-maps></position-heat-maps>
        </div>
    </div>
    <div class="col-6" data-push-left="off-1">
        <rankings :only-display-available="onlyDisplayAvailable" :position-selected="positionSelected"></rankings>
    </div>
</div>
</template>

<script>
import PositionHeatMaps from './PositionHeatMaps'
import Rankings from './Rankings'
import { getPicks, getPositionKeysLeague } from '../vuex/getters'

export default {
  vuex: {
    getters: {
      picks: getPicks,
      positionKeys: getPositionKeysLeague
    }
  },

  components: {
    'position-heat-maps': PositionHeatMaps,
    Rankings
  },

  data () {
    return {
      onlyDisplayAvailable: false,
      positionSelected: 'All'
    }
  }
}
</script>

<style scoped>
input[type=checkbox] {
  margin-right: 0.4em;
}

select {
  margin-top: 10px;
  width: 100%;
}

.pickGridContainer {
  padding: 0;
}

.rankings-sidebar {
  height: 100px;
}
</style>