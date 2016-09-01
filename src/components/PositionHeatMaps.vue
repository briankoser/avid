<template>
    <div v-for="row in pickGridData" class="pickGrid">
        <span class="position milli">{{ row.positionKey }}</span>
        <span v-for="pick in row.pickGrid" track-by="$index" 
        :class="{ pick: true, available: pick === 'a', drafted: pick === 'd', userDrafted: pick === 'u' }">
            &nbsp;
        </span>
    </div>
</template>

<script>
import { getPickGridData } from '../vuex/getters'

export default {
  vuex: {
    getters: {
      pickGridData: getPickGridData
    }
  }
}
</script>

<style scoped>
.pickGrid {
  display: flex;
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