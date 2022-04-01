<template>
  <div class="control-view">
    <h1 class="title">
      2048
    </h1>

    <div class="infos">
      <div class="score">
        {{ score }}
      </div>

      <div class="moves">
        {{ moves }}
      </div>
    </div>

    <div class="intro">
      <p>
        Join the tiles, get to <strong>2048!</strong>
      </p>

      <a
        @click="emitRestart"
        @keyup="emitRestart"
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
  emits: ['restart'],
  setup(props, context) {
    const emitRestart = () => {
      context.emit('restart');
    };

    return {
      emitRestart,
    };
  },
});
</script>
