<template>
  <div class="bg-white p-4 rounded-lg border border-gray-200 flex items-center space-x-4 rtl:space-x-reverse">
    <img :src="flagUrl" :alt="country + ' flag'" class="w-10 h-7 object-cover rounded border border-gray-100">
    <div class="flex flex-col">
      <span class="font-semibold text-gray-800">{{ country }}</span>
      <span class="text-sm text-gray-500">تم الكشف عن الدولة</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  country: string;
  flagUrl: string;
}>();
</script>
