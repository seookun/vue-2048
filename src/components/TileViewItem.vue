<template>
  <div :class="tileClasses(tile)">
    <div
      v-if="!!tile.value"
      :class="`tile-${tile.value}`"
    >
      {{ tile.value }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { filter } from 'lodash-es';
import { Tile, TileState } from '@/vue-2048';

export default defineComponent({
  name: 'TileViewItem',
  props: {
    tile: {
      type: Object as PropType<Tile>,
      required: true,
    },
  },
  setup() {
    const tileClasses = (tile: Tile) => {
      const classes = [
        'tile',
        tile.position > -1 && `tile-position-${tile.position}`,
        tile.state !== TileState.None && `tile-${tile.state}`,
      ];

      return filter(classes, (e) => !!e).join(' ');
    };

    return {
      tileClasses,
    };
  },
});
</script>
