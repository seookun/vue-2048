<template>
  <div class="control-view">
    <h1 class="title">
      2048
    </h1>

    <div class="score-view">
      <div class="score">
        {{ score }}
      </div>

      <div class="moves">
        {{ moves }}
      </div>
    </div>

    <div class="intro-view">
      <p class="intro-message">
        Join the tiles, get to <strong>2048!</strong>
      </p>

      <a
        class="new-game"
        @click="emitNewGame"
        @keyup="emitNewGame"
      >
        New Game
      </a>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ControlView',
  props: {
    score: {
      type: Number,
      required: true,
    },
    moves: {
      type: Number,
      required: true,
    },
  },
  emits: ['new-game'],
  setup(props, context) {
    const emitNewGame = () => {
      context.emit('new-game');
    };

    return {
      emitNewGame,
    };
  },
});
</script>
