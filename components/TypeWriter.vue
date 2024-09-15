<template>
    <span>{{ displayText }}</span>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  
  const props = defineProps<{
    text: string;
    isTyping: boolean;
  }>();
  
  const displayText = ref('');
  
  const typeWriter = (text: string, index: number = 0) => {
    if (index < text.length && props.isTyping) {
      displayText.value += text.charAt(index);
      setTimeout(() => typeWriter(text, index + 1), 50);
    }
  };
  
  onMounted(() => {
    if (props.isTyping) {
      typeWriter(props.text);
    } else {
      displayText.value = props.text;
    }
  });
  
  watch(() => props.text, (newText) => {
    displayText.value = '';
    if (props.isTyping) {
      typeWriter(newText);
    } else {
      displayText.value = newText;
    }
  });
  
  watch(() => props.isTyping, (newIsTyping) => {
    if (newIsTyping) {
      displayText.value = '';
      typeWriter(props.text);
    } else {
      displayText.value = props.text;
    }
  });
  </script>