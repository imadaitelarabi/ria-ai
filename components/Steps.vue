<template>
    <div class="flex justify-between mb-8 rtl">
      <div v-for="(step, index) in steps" :key="index" class="text-center flex flex-col items-center">
        <div :class="['rounded-full w-10 h-10 flex items-center justify-center mb-2', index <= currentStep ? 'bg-black text-white' : 'bg-gray-300 text-gray-600']">
          {{ index + 1 }}
        </div>
        <div class="text-sm" :class="index === currentStep ? 'text-black font-semibold' : 'text-gray-500'">{{ step }}</div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    steps: {
      type: Array,
      required: true,
    },
    currentStep: {
      type: Number,
      required: true,
    },
  });
  </script>