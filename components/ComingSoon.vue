<template>
    <div class="bg-white p-8 rounded-lg  text-center" dir="rtl">
      <h2 class="text-2xl font-semibold mb-6 text-gray-800 flex items-center justify-center">
        <Icon :name="icon" class="ml-2" /> {{ title }}
      </h2>
      <p class="text-lg text-gray-600">التجربة قادمة قريباً</p>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    title: string;
    icon: string;
  }>();
  </script>