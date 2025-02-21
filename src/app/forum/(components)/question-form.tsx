'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Question, QuestionType } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { AlertCircle, Loader2 } from 'lucide-react';

import TagsInput from './question-tags-input';
import { createQuestion as createQuestionAction } from '@/actions/questions/create-question';
import { updateQuestion as updateQuestionAction } from '@/actions/questions/update-question';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useServerActionMutation } from '@/hooks/use-server-action';
import { QUESTIONS_TYPE_LABELS } from '@/lib/labels';
import { Label } from '@/components/ui/label';

type QuestionFormProps = {
  data?: Question;
  trigger?: ReactNode;
  onSuccess?: () => void;
};

export type QuestionFormData = {
  question: string;
  tags: string[];
  type: QuestionType;
};

const QuestionFormSchemaValidator = z.object({
  question: z.string().min(1, 'Must provide a question'),
  tags: z.array(z.string()),
  type: z.nativeEnum(QuestionType),
});

const QuestionForm = ({ data, trigger, onSuccess }: QuestionFormProps) => {
  const isEditing = Boolean(data?.id);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuestionFormData>({
    resolver: zodResolver(QuestionFormSchemaValidator),
    defaultValues: {
      question: data?.question ?? '',
      type: data?.type ?? 'QUESTION',
      tags: data?.tags ?? [],
    },
  });

  const { mutate: createQuestion, isPending: isCreating } =
    useServerActionMutation(createQuestionAction, {
      mutationKey: ['create-question'],
      onSuccess: questionId => {
        router.push(`/forum/${questionId}`);
        toast.success('Question created successfully');
        setIsOpen(false);
        onSuccess?.();
        reset();
      },
      onError: () => toast.error('Failed to create question'),
    });
  const { mutate: updateQuestion, isPending: isUpdating } =
    useServerActionMutation(updateQuestionAction, {
      mutationKey: ['update-question'],
      onSuccess: questionId => {
        router.push(`/forum/${questionId}`);
        toast.success('Question updated successfully');
        setIsOpen(false);
        onSuccess?.();
      },
      onError: () => toast.error('Failed to update question'),
    });

  const handleOnSubmit = handleSubmit(({ question, tags, type }) => {
    if (isEditing && data?.id) {
      updateQuestion({ id: data.id, question, tags, type });
    } else createQuestion({ question, tags, type });
  });

  const isLoading = isCreating || isUpdating;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>Open form</Button>}
      </DialogTrigger>
      <DialogContent
        withCloseButton={false}
        className='max-w-md p-4 space-y-2.5'
      >
        <DialogHeader>
          <DialogTitle>
            {!isEditing ? 'Create new' : 'Edit your'} question
          </DialogTitle>
          <DialogDescription>
            Ask questions, get recommendations, and receive valuable advice for
            your startup.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleOnSubmit} className='space-y-2'>
          <div>
            <Label>Question</Label>
            <Input
              disabled={isLoading}
              placeholder='Your question...'
              type='text'
              {...register('question')}
            />
            {errors.question && (
              <p
                id='question-error'
                className='flex items-center gap-1.5 px-1 text-red-500 mt-1 text-sm'
                role='alert'
              >
                <AlertCircle className='size-4' />
                {errors.question.message}
              </p>
            )}
          </div>
          <div>
            <Label>Type</Label>
            <Controller
              disabled={isLoading}
              control={control}
              name='type'
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? ''}
                  defaultValue={field.value ?? ''}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select question type' />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(QuestionType).map(([key, value]) => (
                      <SelectItem key={value} value={value}>
                        {QUESTIONS_TYPE_LABELS[key]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.type && (
              <p
                id='type-error'
                className='flex items-center gap-1.5 px-1 text-red-500 mt-1 text-sm'
                role='alert'
              >
                <AlertCircle className='size-4' />
                {errors.type.message}
              </p>
            )}
          </div>
          <div>
            <Label>Tags</Label>
            <TagsInput control={control} isLoading={isLoading} />
          </div>

          <DialogFooter className='pt-2.5'>
            <div className='w-full flex flex-col items-center gap-2'>
              <Button
                disabled={isLoading}
                size='sm'
                className='w-full'
                type='submit'
              >
                {isLoading && <Loader2 className='size-4 animate-spin' />}
                {!isEditing ? 'Create' : 'Update'}
              </Button>
              <DialogClose asChild>
                <Button
                  size='sm'
                  variant='ghost'
                  disabled={isLoading}
                  className='w-full'
                >
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionForm;
