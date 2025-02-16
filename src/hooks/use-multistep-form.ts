import { FormEvent, ReactNode, useState } from 'react';

export const useMultiStepForm = (steps: ReactNode[]) => {
  const [crrIndex, setCrrIndex] = useState(0);

  const nextStep = () => {
    setCrrIndex(i => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  };

  const prevStep = (e: FormEvent) => {
    e.preventDefault();
    setCrrIndex(i => {
      if (i === 0) return i;
      return i - 1;
    });
  };

  return {
    crrIndex,
    crrStep: steps[crrIndex],
    nextStep,
    prevStep,
    isFirstStep: crrIndex === 0,
    isLastStep: crrIndex === steps.length - 1,
  };
};
