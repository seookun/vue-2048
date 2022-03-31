<template>
  <div class="tile-view">
    <div
      v-for="i of 16"
      :key="i"
      :class="`tile tile-position-${i - 1}` "
    />
    <tile-view-item
      v-for="(tile, i) of tiles"
      :key="i"
      :tile="tile"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Tile } from '@/vue-2048';

import TileViewItem from './TileViewItem.vue';

export default defineComponent({
  name: 'TileView',
  components: {
    TileViewItem,
  },
  props: {
    tiles: {
      type: Array as PropType<Array<Tile>>,
      required: true,
    },
  },
  setup() {
    return {

    };
  },
});
</script>
