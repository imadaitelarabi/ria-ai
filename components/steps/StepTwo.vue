<template>
    <div class="bg-white p-8 rounded-lg shadow-md" dir="rtl">
        <h2 class="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
            <Icon name="mdi:target" class="ml-2" /> تحديد الأهداف
        </h2>
        <form>
            <div class="mb-6">
                <label for="main-goal" class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Icon name="mdi:flag-checkered" class="ml-2" /> الهدف الرئيسي
                </label>
                <input type="text" id="main-goal"
                    class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent text-right"
                    placeholder="أدخل الهدف الرئيسي" />
            </div>
            <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Icon name="mdi:format-list-bulleted" class="ml-2" /> الأهداف الفرعية
                </label>
                <div class="space-y-2">
                    <input type="text"
                        class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent text-right"
                        placeholder="الهدف الفرعي 1" />
                    <input type="text"
                        class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent text-right"
                        placeholder="الهدف الفرعي 2" />
                    <input type="text"
                        class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent text-right"
                        placeholder="الهدف الفرعي 3" />
                </div>
            </div>
            <div class="mb-6">
                <label for="goal-description" class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Icon name="mdi:text-box-outline" class="ml-2" /> وصف الأهداف
                </label>
                <textarea id="goal-description"
                    class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent text-right"
                    rows="4" placeholder="اكتب وصفًا مفصلاً للأهداف هنا..."></textarea>
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
