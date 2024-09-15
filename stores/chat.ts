import { defineStore } from 'pinia';
import axios from 'axios';

interface Message {
  text: string;
  sender: 'user' | 'assistant';
  type?: 'text' | 'country';
  country?: string;
  flagUrl?: string;
  isTyping?: boolean;
}

interface Problem {
  title: string;
  category: string;
  description: string;
}

interface ChatState {
  messages: Message[];
  isDetectingCountry: boolean;
  detectedCountry: string;
  selectedProblem: Problem | null;
}

export const useChatStore = defineStore('chat', {
  state: (): ChatState => ({
    messages: [
      { text: 'مرحبًا! دعني أساعدك في تحديد المشكلة لعملية تقييم الأثر التنظيمي.', sender: 'assistant', isTyping: false, type: 'text' }
    ],
    isDetectingCountry: false,
    detectedCountry: '',
    selectedProblem: null,
  }),
  actions: {
    async sendMessage(message: string) {
      console.log('Sending message:', message);
      this.messages.push({ text: message, sender: 'user', isTyping: false, type: 'text' });
      
      // Call AI response function
      await this.getAIResponse(message);
    },
    receiveMessage(message: string) {
      console.log('Receiving message:', message);
      this.messages.push({ text: message, sender: 'assistant', isTyping: true, type: 'text' });
    },
    async getAIResponse(userMessage: string) {
      try {
        const response = await $fetch('/api/ai-response', {
          method: 'POST',
          body: { message: userMessage }
        });
        this.receiveMessage(response.message);
      } catch (error) {
        console.error('Error getting AI response:', error);
        this.receiveMessage('عذرًا، حدث خطأ أثناء معالجة رسالتك.');
      }
    },
    async detectCountry() {
      console.log('Detecting country - start');
      this.isDetectingCountry = true;
      this.receiveMessage('جاري الكشف عن الدولة...');
      
      try {
        const response = await axios.get('/api/country');
        console.log('data', response.data);
        const { country, flagUrl } = response.data;
        
        this.detectedCountry = country;
        
        console.log('Pushing country message');
        this.messages.push({
          text: 'تم الكشف عن الدولة:',
          sender: 'assistant',
          type: 'country',
          country: this.detectedCountry,
          flagUrl: flagUrl,
        });
        
        console.log('Country detected:', this.detectedCountry);
      } catch (error) {
        console.error('Error detecting country:', error);
      } finally {
        this.isDetectingCountry = false;
        console.log('Detecting country - end');
      }
    },
    setProblem(problem: Problem) {
      console.log('Setting problem:', problem);
      this.selectedProblem = problem;
    },
    async suggestProblems() {
      console.log('Suggesting problems');
      try {
        const response = await axios.get('/api/problems');
        const suggestedProblems = response.data as Problem[];

        this.receiveMessage('إليك بعض المشكلات المقترحة:');
        suggestedProblems.forEach((problem: Problem) => {
          this.messages.push({
            text: problem.title,
            sender: 'assistant',
            type: 'problem',
            problem: problem
          });
        });
        this.receiveMessage('يمكنك اختيار إحدى هذه المشكلات أو إدخال مشكلة جديدة.');
      } catch (error) {
        console.error('Error fetching suggested problems:', error);
      }
    },
  }
});