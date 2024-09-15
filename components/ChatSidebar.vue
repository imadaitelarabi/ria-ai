<template>
  <div class="h-full flex flex-col">
    <h2 class="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
      <Icon name="mdi:robot" class="mr-2" /> المساعد الذكي
    </h2>
    <div ref="chatContainer" class="flex-1 overflow-y-auto mb-6">
      <TransitionGroup name="message" tag="div">
        <div v-for="(message, index) in chatStore.messages" :key="index" :class="{'text-right': message.sender === 'user', 'text-left': message.sender === 'assistant'}">
          <p v-if="message.type === 'text'" :class="{'bg-gray-100': message.sender === 'assistant', 'bg-black text-white': message.sender === 'user'}" class="p-3 rounded-lg mb-3 inline-block max-w-[80%]">
            <Icon :name="message.sender === 'user' ? 'mdi:account' : 'mdi:robot'" class="inline-block mr-2" />
            <span v-if="message.sender === 'user'">{{ message.text }}</span>
            <TypeWriter v-else :text="message.text" :key="index" />
          </p>
          <div v-else-if="message.type === 'country'" class="mb-3">
            <CountryCard :country="message.country" :flagUrl="message.flagUrl" />
          </div>
          <div v-else-if="message.type === 'problem'" class="mb-3">
            <button @click="selectProblem(message.problem)" class="w-full text-left bg-white border border-gray-300 rounded-lg p-3 hover:bg-gray-50 transition-colors">
              <h3 class="font-semibold">{{ message.problem.title }}</h3>
              <p class="text-sm text-gray-600">{{ message.problem.category }}</p>
            </button>
          </div>
        </div>
      </TransitionGroup>
    </div>
    <div class="mt-auto">
      <input 
        v-model="newMessage" 
        @keyup.enter="sendMessage"
        type="text" 
        class="w-full p-3 border border-gray-300 rounded-md mb-3 focus:ring-2 focus:ring-black focus:border-transparent" 
        placeholder="اكتب سؤالك هنا..." 
      />
      <button @click="sendMessage" type="button" class="w-full p-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center">
        <Icon name="mdi:send" class="mr-2" /> إرسال
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useChatStore } from '@/stores/chat';
import { useStepStore } from '@/stores/step';
import CountryCard from './CountryCard.vue';

const chatStore = useChatStore();
const stepStore = useStepStore();
const { messages } = storeToRefs(chatStore);
const newMessage = ref('');
const chatContainer = ref<HTMLElement | null>(null);

const sendMessage = () => {
  if (newMessage.value.trim() !== '') {
    chatStore.sendMessage(newMessage.value);
    newMessage.value = '';
    scrollToBottom();
  }
};

const selectProblem = (problem: any) => {
  chatStore.setProblem(problem);
  chatStore.receiveMessage(`تم اختيار المشكلة: ${problem.title}`);
};

const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
};

onMounted(() => {
  console.log('ChatSidebar mounted');
  console.log('Initial messages:', messages.value);
  scrollToBottom();
  chatStore.detectCountry();
});

watch(messages, (newMessages) => {
  console.log('Messages updated:', newMessages);
  scrollToBottom();
}, { deep: true });

watch(() => chatStore.detectedCountry, (newCountry) => {
  console.log('Detected country:', newCountry);
  if (newCountry) {
    chatStore.suggestProblems();
  }
});
</script>

<style scoped>
.message-enter-active,
.message-leave-active {
  transition: all 0.5s ease;
}
.message-enter-from,
.message-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>