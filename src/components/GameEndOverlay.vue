<template>
  <div
    class="game-end-overlay"
    :class="{'show-overlay': stuck}"
  >
    <p class="game-end-message">
      Game over!
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GameEndOverlay',
  props: {
    stuck: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    return {

    };
  },
});
</script>
