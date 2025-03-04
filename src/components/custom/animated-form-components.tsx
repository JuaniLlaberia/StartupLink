import { type MouseEventHandler, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

import { Button } from '../ui/button';

export const StepWrapper = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => (
  <motion.div
    initial={{ x: '50%', opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: '-50%', opacity: 0 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

type FormNavigationProps = {
  onBack?: MouseEventHandler<HTMLButtonElement>;
  isLastStep: boolean;
  isPending: boolean;
  className?: string;
  submitText?: string;
};
export const FormNavigation = ({
  onBack,
  isLastStep,
  isPending,
  className = '',
  submitText = 'submit',
}: FormNavigationProps) => (
  <div
    className={`mt-5 md:mt-7 flex flex-col gap-2 md:flex-row-reverse items-end ${className}`}
  >
    <Button
      size='sm'
      disabled={isPending}
      className='w-full md:w-auto group'
      aria-label={isLastStep ? 'Create startup' : 'Next step'}
      type='submit'
    >
      {isPending && <Loader2 className='size-4 animate-spin' />}
      {isLastStep ? (
        submitText
      ) : (
        <>
          Next
          <ChevronRight className='size-4 group-hover:translate-x-1 transition-transform' />
        </>
      )}
    </Button>
    {onBack && (
      <Button
        onClick={onBack}
        variant='outline'
        size='sm'
        className='w-full md:w-auto group'
        aria-label='Previous step'
        type='button'
      >
        <ChevronLeft className='size-4 mr-1.5 group-hover:-translate-x-1 transition-transform' />
        Go back
      </Button>
    )}
  </div>
);
