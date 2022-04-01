<template>
  <control-view
    :score="score"
    :moves="moves"
    @restart="onRestart"
  />

  <tile-view :tiles="tiles" />
</template>

<script lang="ts">
import {
  computed, defineComponent, onBeforeUnmount, onMounted, readonly, ref,
} from 'vue';
import Vue2048, { sleep } from '@/vue-2048';

import ControlView from '@/components/ControlView.vue';
import TileView from '@/components/TileView.vue';

export default defineComponent({
  name: 'App',
  components: {
    ControlView,
    TileView,
  },
  setup() {
    const vue2048 = ref(new Vue2048());

    const tiles = computed(() => readonly(vue2048.value.tiles));
    const score = computed(() => vue2048.value.score);
    const moves = computed(() => vue2048.value.moves);

    // bind keydown event
    const onKeydown = async (ev: KeyboardEvent) => {
      if (ev.key === 'ArrowLeft' || ev.keyCode === 37) {
        await vue2048.value.move(0);
      } if (ev.key === 'ArrowUp' || ev.keyCode === 38) {
        await vue2048.value.move(1);
      } if (ev.key === 'ArrowRight' || ev.keyCode === 39) {
        await vue2048.value.move(2);
      } else if (ev.key === 'ArrowDown' || ev.keyCode === 40) {
        await vue2048.value.move(3);
      }
    };

    onMounted(() => {
      window.addEventListener('keydown', onKeydown);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('keydown', onKeydown);
    });

    // restart
    const onRestart = async () => {
      vue2048.value.clearTiles();
      await sleep();

      vue2048.value = new Vue2048();
    };

    return {
      tiles,
      score,
      moves,
      onRestart,
    };
  },
});
</script>
