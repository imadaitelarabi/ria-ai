import { defineStore } from 'pinia';

interface StepState {
  currentStep: number;
}

export const useStepStore = defineStore('step', {
  state: (): StepState => ({
    currentStep: 0,
  }),
  actions: {
    setStep(step: number) {
      this.currentStep = step;
    },
  },
});
