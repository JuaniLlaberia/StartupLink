'use client';

import { JsonValue } from '@prisma/client/runtime/library';
import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { QuestionSchema } from '@/actions/survey/survey-types';
import { useMultiStepForm } from '@/hooks/use-multistep-form';
import {
  FormNavigation,
  StepWrapper,
} from '@/components/custom/animated-form-components';
import { useServerActionMutation } from '@/hooks/use-server-action';
import { createApplication as createApplicationAction } from '@/actions/applications/create-application';

type Question = z.infer<typeof QuestionSchema>;

type QuestionsComponentProps = {
  startupId: string;
  roleId: string;
  questions: JsonValue;
};

const QuestionsComponent = ({
  startupId,
  roleId,
  questions,
}: QuestionsComponentProps) => {
  const router = useRouter();
  const [parsedQuestions, setParsedQuestions] = useState<Question[]>([]);

  // Parse questions
  useEffect(() => {
    try {
      const questionData =
        typeof questions === 'string' ? JSON.parse(questions) : questions;

      const validatedQuestions = z.array(QuestionSchema).parse(questionData);
      setParsedQuestions(validatedQuestions.sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error('Error parsing questions:', error);
      setParsedQuestions([]);
    }
  }, [questions]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const questionSteps = parsedQuestions.map(question => {
    const questionId = question.id || `question_${question.order}`;

    return (
      <StepWrapper key={questionId}>
        <p className='text-3xl font-medium tracking-tight mb-3 text-center'>
          {question.text}
        </p>
        {question.type === 'text' && (
          <>
            <Input
              id={questionId}
              type='text'
              placeholder={question.placeholder || ''}
              {...register(question.text)}
              className='h-12 lg:mt-4'
              aria-invalid={!!errors[questionId]}
              aria-describedby={
                errors[questionId] ? `${questionId}-error` : undefined
              }
              maxLength={question.maxLength}
            />
          </>
        )}

        {question.type === 'textarea' && (
          <>
            <Textarea
              id={questionId}
              placeholder={question.placeholder || ''}
              {...register(question.text)}
              className='lg:mt-4 resize-none'
              aria-invalid={!!errors[questionId]}
              aria-describedby={
                errors[questionId] ? `${questionId}-error` : undefined
              }
              maxLength={question.maxLength}
              rows={5}
            />
          </>
        )}

        {question.type === 'dropdown' && (
          <>
            <Select onValueChange={value => setValue(question.text, value)}>
              <SelectTrigger className='w-full mt-4'>
                <SelectValue placeholder='Select an option' />
              </SelectTrigger>
              <SelectContent>
                {question.options.map(option => {
                  const optionId = option.id || `option_${option.order}`;
                  return (
                    <SelectItem key={optionId} value={option.text}>
                      {option.text}
                    </SelectItem>
                  );
                })}

                {question.allowOther && (
                  <SelectItem value='other'>Other</SelectItem>
                )}
              </SelectContent>
            </Select>

            {watch(questionId) === 'other' && question.allowOther && (
              <Input
                id={`${questionId}_other_text`}
                className='mt-2'
                placeholder='Please specify'
                {...register(`${questionId}_other`)}
                onChange={() => setValue(`${questionId}_other_selected`, true)}
                aria-invalid={!!errors[`${questionId}_other`]}
              />
            )}
          </>
        )}

        {errors[questionId] && (
          <p
            id={`${questionId}-error`}
            className='flex items-center gap-1.5 px-1 text-red-500 mt-1 text-sm'
            role='alert'
          >
            <AlertCircle className='size-4' />
            This field is required
          </p>
        )}
      </StepWrapper>
    );
  });

  const { mutate: createApplication, isPending } = useServerActionMutation(
    createApplicationAction,
    {
      mutationKey: ['create-application'],
      onSuccess: () => {
        toast.success('You have applied successfully');
        router.back();
      },
      onError: () => toast.error('Failed to apply'),
    }
  );

  const { crrStep, nextStep, prevStep, isLastStep, crrIndex } =
    useMultiStepForm(questionSteps);

  const processSubmit = (data: any) => {
    if (!isLastStep) {
      nextStep();
      return;
    }

    // Submit data
    const responses = JSON.stringify(data);
    createApplication({
      startupId,
      roleId,
      surveyResponse: responses.length > 0 ? responses : undefined,
    });
  };

  if (parsedQuestions.length === 0) {
    return <div>No questions available</div>;
  }

  return (
    <div className='w-full max-w-lg mx-auto py-16'>
      <form onSubmit={handleSubmit(processSubmit)}>
        {/* Progress indicator */}
        <div className='text-end mb-6'>
          <p className='text-muted-foreground font-medium'>
            <span className='text-3xl'>{crrIndex + 1}</span>/
            {questionSteps.length}
          </p>
        </div>

        {/* Current question */}
        {crrStep}

        {/* Navigation */}
        <FormNavigation
          isPending={isPending}
          isLastStep={isLastStep}
          onBack={crrIndex > 0 ? prevStep : undefined}
          submitText='Apply to role'
        />
      </form>
    </div>
  );
};

export default QuestionsComponent;
