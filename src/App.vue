<template>
  <control-view
    :score="score"
    :moves="moves"
    @new-game="onNewGame"
  />

  <div class="game-view">
    <tile-view
      :key="resetCount"
      :tiles="tiles"
    />

    <game-end-overlay
      :stuck="stuck"
    />
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, onBeforeUnmount, onMounted, ref, watch, watchEffect,
} from 'vue';
import Vue2048 from '@/vue-2048';

import ControlView from '@/components/ControlView.vue';
import TileView from '@/components/TileView.vue';
import GameEndOverlay from '@/components/GameEndOverlay.vue';

export default defineComponent({
  name: 'App',
  components: {
    ControlView,
    TileView,
    GameEndOverlay,
  },
  setup() {
    const vue2048 = ref(new Vue2048());
    const tiles = computed(() => vue2048.value.tiles);
    const score = computed(() => vue2048.value.score);
    const moves = computed(() => vue2048.value.moves);
    const stuck = computed(() => vue2048.value.stuck);

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

    // new game
    const resetCount = ref(0);
    const onNewGame = () => {
      vue2048.value = new Vue2048();
      resetCount.value += 1;
    };

    return {
      tiles,
      score,
      moves,
      stuck,
      resetCount,
      onNewGame,
    };
  },
});
</script>
