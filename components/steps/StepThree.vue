<template>
    <div class="bg-white p-8 rounded-lg " dir="rtl">
      <ComingSoon title="تحديد البدائل" icon="mdi:format-list-checks" />
      <div class="flex justify-between mt-6">
        <button @click="$emit('previous')"
          class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors">
          السابق
        </button>
        <button @click="$emit('next')"
          class="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
          التالي
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import ComingSoon from '../ComingSoon.vue';
  </script>