<template>
  <div class="w-full bg-gray-200 rounded-full h-2 mb-6 rtl">
    <div class="bg-black h-2 rounded-full transition-all duration-300 ease-in-out" :style="{ width: progress + '%' }"></div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  progress: {
    type: Number,
    required: true,
  },
});
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>
