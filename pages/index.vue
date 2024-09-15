<template>
  <div class="max-w-4xl mx-auto">
    <ProgressBar :progress="progress" />
    <Steps :steps="steps" :currentStep="currentStep" />
    <component :is="currentStepComponent" @next="nextStep" @previous="previousStep" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useStepStore } from '@/stores/step';
import StepOne from '~/components/steps/StepOne.vue';
import StepTwo from '~/components/steps/StepTwo.vue';
import StepThree from '~/components/steps/StepThree.vue';
import StepFour from '~/components/steps/StepFour.vue';
import StepFive from '~/components/steps/StepFive.vue';
import StepSix from '~/components/steps/StepSix.vue';

const stepStore = useStepStore();

const steps = ['تحديد المشكلة', 'تحديد الأهداف', 'تحديد البدائل', 'تحليل التكاليف والفوائد', 'التشاور مع الأطراف المعنية', 'التقييم المستمر'];

const progress = computed(() => {
  return (stepStore.currentStep / (steps.length - 1)) * 100;
});

const currentStepComponent = computed(() => {
  switch (stepStore.currentStep) {
    case 0:
      return StepOne;
    case 1:
      return StepTwo;
    case 2:
      return StepThree;
    case 3:
      return StepFour;
    case 4:
      return StepFive;
    case 5:
      return StepSix;
    default:
      return StepOne;
  }
});

const nextStep = () => {
  if (stepStore.currentStep < steps.length - 1) {
    stepStore.setStep(stepStore.currentStep + 1);
  }
};

const previousStep = () => {
  if (stepStore.currentStep > 0) {
    stepStore.setStep(stepStore.currentStep - 1);
  }
};
</script>