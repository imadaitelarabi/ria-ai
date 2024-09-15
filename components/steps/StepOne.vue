<template>
    <div class="bg-white p-8 rounded-lg shadow-md" dir="rtl">
        <h2 class="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
            <Icon name="mdi:magnify" class="ml-2" /> تحديد المشكلة
        </h2>
        <form>
            <div class="mb-6">
                <label for="country" class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Icon name="mdi:flag" class="ml-2" /> الدولة
                </label>
                <div class="relative">
                    <select id="country"
                        v-model="selectedCountry"
                        :disabled="isDetectingCountry"
                        class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent text-right appearance-none"
                        :class="{ 'opacity-0': isDetectingCountry }"
                    >
                        <option value="">اختر الدولة</option>
                        <option v-for="country in countries" :key="country.code" :value="country.code">
                            {{ country.name }}
                        </option>
                    </select>
                    <div v-if="isDetectingCountry" class="absolute inset-0 flex items-center justify-center bg-white">
                        <Icon name="mdi:loading" class="animate-spin h-5 w-5 text-gray-400" />
                    </div>
                    <transition name="fade">
                        <div v-if="!isDetectingCountry && selectedCountry" class="absolute inset-0 bg-black bg-opacity-10 pointer-events-none"></div>
                    </transition>
                </div>
            </div>
            <div class="mb-6">
                <label for="problem-title" class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Icon name="mdi:text" class="ml-2" /> عنوان المشكلة
                </label>
                <input type="text" id="problem-title"
                    v-model="problemTitle"
                    class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent text-right"
                    placeholder="أدخل عنوان المشكلة"
                />
            </div>
            <div class="mb-6">
                <label for="problem-category" class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Icon name="mdi:folder-outline" class="ml-2" /> فئة المشكلة
                </label>
                <select id="problem-category"
                    v-model="problemCategory"
                    class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent text-right"
                >
                    <option value="">اختر فئة المشكلة</option>
                    <option value="economy">اقتصادية</option>
                    <option value="social">اجتماعية</option>
                    <option value="environmental">بيئية</option>
                    <option value="health">صحية</option>
                    <option value="education">تعليمية</option>
                </select>
            </div>
            <div class="mb-6">
                <label for="problem-description" class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Icon name="mdi:text-box-outline" class="ml-2" /> وصف المشكلة
                </label>
                <textarea id="problem-description"
                    v-model="problemDescription"
                    class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent text-right"
                    rows="4" placeholder="اكتب وصف المشكلة هنا..."
                ></textarea>
            </div>
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
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useChatStore } from '@/stores/chat';

const chatStore = useChatStore();

const selectedCountry = ref('');
const problemTitle = ref('');
const problemCategory = ref('');
const problemDescription = ref('');
const isDetectingCountry = ref(false);

const countries = [
    { code: 'AE', name: 'الإمارات العربية المتحدة' },
    { code: 'SA', name: 'المملكة العربية السعودية' },
    { code: 'EG', name: 'مصر' },
    { code: 'JO', name: 'الأردن' },
    // Add more countries as needed
];

onMounted(() => {
    isDetectingCountry.value = chatStore.isDetectingCountry;
    watchCountryDetection();
    watchSelectedProblem();
});

const watchCountryDetection = () => {
    watch(() => chatStore.isDetectingCountry, (newValue) => {
        isDetectingCountry.value = newValue;
        if (!newValue) {
            const detectedCountry = chatStore.messages.find(m => m.type === 'country');
            if (detectedCountry && detectedCountry.country) {
                const foundCountry = countries.find(c => c.name === detectedCountry.country);
                if (foundCountry) {
                    selectedCountry.value = foundCountry.code;
                }
            }
        }
    });
};

const watchSelectedProblem = () => {
    watch(() => chatStore.selectedProblem, (newProblem) => {
        if (newProblem) {
            problemTitle.value = newProblem.title;
            problemCategory.value = newProblem.category;
            problemDescription.value = newProblem.description;
        }
    });
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
