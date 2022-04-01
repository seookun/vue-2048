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

    <a
      class="restart-button"
      @click="$emit('restart')"
      @keyup="$emit('restart')"
    >
      New Game
    </a>
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
  setup() {
    return {
    };
  },
});
</script>
