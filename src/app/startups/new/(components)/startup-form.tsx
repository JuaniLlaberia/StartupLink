'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Industry, Stage, TeamSize } from '@prisma/client';
import { motion } from 'framer-motion';
import { AlertCircle, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { MouseEvent, ReactNode } from 'react';

import Radio from '@/components/ui/radio';
import { createStartup as createStartupAction } from '@/actions/startup/create-startup';
import { useMultiStepForm } from '@/hooks/use-multistep-form';
import { useServerActionMutation } from '@/hooks/use-server-action';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { INDUSTRY_LABELS, STAGE_LABELS, TEAM_SIZE_LABELS } from '@/lib/labels';

type FormData = {
  name: string;
  mission: string;
  industry: Industry;
  stage: Stage;
  teamSize: TeamSize;
};

const StepWrapper = ({
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
  onBack?: (e: MouseEvent) => void;
  isLastStep: boolean;
  isPending: boolean;
  className?: string;
};
const FormNavigation = ({
  onBack,
  isLastStep,
  isPending,
  className = '',
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
        'Create startup'
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

const StartupValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  mission: z.string().min(25, 'Mission should be at least 25 characters'),
  industry: z.nativeEnum(Industry, { message: 'Industry is required' }),
  stage: z.nativeEnum(Stage, { message: 'Stage is required' }),
  teamSize: z.nativeEnum(TeamSize, { message: 'Team size is required' }),
});

const StartupForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(StartupValidationSchema),
    defaultValues: {
      name: '',
      mission: '',
      industry: undefined,
      stage: undefined,
      teamSize: undefined,
    },
  });

  const { mutate: createStartup, isPending } = useServerActionMutation(
    createStartupAction,
    {
      mutationKey: ['create-startup'],
      onSuccess: () => {
        router.push('/my-startups');
        toast.success('Startup created successfully');
      },
      onError: () => {
        toast.error('Failed to create startup');
      },
    }
  );

  const steps: (keyof FormData)[] = [
    'name',
    'mission',
    'industry',
    'stage',
    'teamSize',
  ];

  const { crrIndex, crrStep, nextStep, prevStep, isLastStep } =
    useMultiStepForm([
      // Name step
      <StepWrapper key='name-step'>
        <p className='text-3xl font-medium tracking-tight mb-3 text-center'>
          What is the name of your Startup?
        </p>
        <Input
          id='name'
          type='text'
          placeholder='Startup name'
          {...register('name')}
          className='h-12 lg:mt-4'
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p
            id='name-error'
            className='flex items-center gap-1.5 px-1 text-red-500 mt-1 text-sm'
            role='alert'
          >
            <AlertCircle className='size-4' />
            {errors.name.message}
          </p>
        )}

        <FormNavigation isPending={isPending} isLastStep={false} />
      </StepWrapper>,

      // Mission step
      <StepWrapper key='mission-step'>
        <p className='text-3xl font-medium tracking-tight mb-3 text-center'>
          Tell us about your startup&apos;s mission
        </p>
        <Textarea
          id='mission'
          placeholder='Startup mission'
          rows={6}
          className='lg:mt-4 resize-none'
          {...register('mission')}
          aria-invalid={!!errors.mission}
          aria-describedby={errors.mission ? 'mission-error' : undefined}
        />
        {errors.mission && (
          <p
            id='name-error'
            className='flex items-center gap-1.5 px-1 text-red-500 mt-1 text-sm'
            role='alert'
          >
            <AlertCircle className='size-4' />
            {errors.mission.message}
          </p>
        )}
        <FormNavigation
          onBack={e => prevStep(e)}
          isPending={isPending}
          isLastStep={false}
        />
      </StepWrapper>,

      //Industry step
      <StepWrapper key='industry-step'>
        <p className='text-3xl font-medium tracking-tight mb-3 text-center'>
          What industry is your startup in?
        </p>
        <div className='py-2 text-center lg:pt-4 lg:text-start'>
          <Radio
            options={Object.entries(Industry).map(([key, value]) => ({
              label: INDUSTRY_LABELS[key],
              value,
            }))}
            fieldName='industry'
            register={register}
          />
          {errors.industry && (
            <p
              id='name-error'
              className='flex items-center gap-1.5 px-1 text-red-500 mt-1 text-sm'
              role='alert'
            >
              <AlertCircle className='size-4' />
              {errors.industry.message}
            </p>
          )}
          <FormNavigation
            onBack={e => prevStep(e)}
            isPending={isPending}
            isLastStep={false}
          />
        </div>
      </StepWrapper>,

      // Stage step
      <StepWrapper key='stage-step'>
        <p className='text-3xl font-medium tracking-tight mb-3 text-center'>
          At what stage is your startup in?
        </p>
        <div className='py-2 text-center lg:pt-4 lg:text-start'>
          <Radio
            options={Object.entries(Stage).map(([key, value]) => ({
              label: STAGE_LABELS[key],
              value,
            }))}
            fieldName='stage'
            register={register}
          />
          {errors.stage && (
            <p
              id='name-error'
              className='flex items-center gap-1.5 px-1 text-red-500 mt-1 text-sm'
              role='alert'
            >
              <AlertCircle className='size-4' />
              {errors.stage.message}
            </p>
          )}
          <FormNavigation
            onBack={e => prevStep(e)}
            isPending={isPending}
            isLastStep={false}
          />
        </div>
      </StepWrapper>,

      // Team size step
      <StepWrapper key='teamSize-step'>
        <p className='text-3xl font-medium tracking-tight mb-3 text-center'>
          How big is the founding team?
        </p>
        <div className='py-2 text-center lg:pt-4 lg:text-start'>
          <Radio
            options={Object.entries(TeamSize).map(([key, value]) => ({
              label: TEAM_SIZE_LABELS[key],
              value,
            }))}
            fieldName='teamSize'
            register={register}
          />
          {errors.teamSize && (
            <p
              id='name-error'
              className='flex items-center gap-1.5 px-1 text-red-500 mt-1 text-sm'
              role='alert'
            >
              <AlertCircle className='size-4' />
              {errors.teamSize.message}
            </p>
          )}
          <FormNavigation
            onBack={e => prevStep(e)}
            isPending={isPending}
            isLastStep={true}
          />
        </div>
      </StepWrapper>,
    ]);

  return (
    <form
      onSubmit={
        isLastStep
          ? handleSubmit(data => {
              createStartup({
                name: data.name,
                mission: data.mission,
                industry: data.industry,
                stage: data.stage,
                teamSize: data.teamSize,
              });
            })
          : async e => {
              e.preventDefault();

              const fields = steps[crrIndex];
              const isValid = await trigger(fields);

              if (!isValid) return;

              nextStep();
            }
      }
    >
      {crrStep}
    </form>
  );
};

export default StartupForm;
