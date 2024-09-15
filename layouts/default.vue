<template>
    <div class="flex h-screen bg-gray-50">
      <div class="w-1/4 p-6 border-r border-gray-200 bg-white shadow-lg">
        <ChatSidebar />
      </div>
      <div class="flex-1 flex flex-col">
        <header class="bg-white p-6 shadow-sm">
          <h1 class="text-3xl font-bold text-center text-gray-800 flex items-center justify-center">
            <Icon name="mdi:clipboard-text-outline" class="mr-2" /> أداة تقييم الأثر التنظيمي
          </h1>
        </header>
        <main class="flex-1 p-6 overflow-auto bg-gray-50">
          <slot />
        </main>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import ChatSidebar from '~/components/ChatSidebar.vue';

  console.log('Default layout loaded');
  </script>
