'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Answer } from '@prisma/client';
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { AlertCircle, Loader2 } from 'lucide-react';

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
import { useServerActionMutation } from '@/hooks/use-server-action';
import { Label } from '@/components/ui/label';
import { createAnswer as createAnswerAction } from '@/actions/answers/create-answer';
import { updateAnswer as updateAnswerAction } from '@/actions/answers/update-answer';
import { Textarea } from '@/components/ui/textarea';
import { useParams } from 'next/navigation';

type AnswerFormProps = {
  data?: Answer;
  trigger?: ReactNode;
  onSuccess?: () => void;
};

export type AnswerFormData = {
  answer: string;
};

const AnswerFormSchemaValidator = z.object({
  answer: z.string().min(1, 'Must provide an answer'),
});

const AnswerForm = ({ data, trigger, onSuccess }: AnswerFormProps) => {
  const isEditing = Boolean(data?.id);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { questionId } = useParams<{ questionId: string }>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AnswerFormData>({
    resolver: zodResolver(AnswerFormSchemaValidator),
    defaultValues: {
      answer: data?.answer ?? '',
    },
  });

  const { mutate: createAnswer, isPending: isCreating } =
    useServerActionMutation(createAnswerAction, {
      mutationKey: ['create-answer'],
      onSuccess: () => {
        setIsOpen(false);
        onSuccess?.();
        reset();
      },
      onError: () => toast.error('Failed to create answer'),
    });
  const { mutate: updateAnswer, isPending: isUpdating } =
    useServerActionMutation(updateAnswerAction, {
      mutationKey: ['update-answer'],
      onSuccess: () => {
        setIsOpen(false);
        onSuccess?.();
      },
      onError: () => toast.error('Failed to update answer'),
    });

  const handleOnSubmit = handleSubmit(({ answer }) => {
    if (isEditing && data?.id) {
      updateAnswer({ id: data.id, answer });
    } else createAnswer({ answer, questionId });
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
            {!isEditing ? 'Create new' : 'Edit your'} answer
          </DialogTitle>
          <DialogDescription>
            Answer questions from the community with this form. Share your
            insights and help others by providing valuable responses.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleOnSubmit} className='space-y-2'>
          <div>
            <Label htmlFor='answer'>Your answer</Label>
            <Textarea
              id='answer'
              rows={5}
              className='resize-none'
              disabled={isLoading}
              placeholder='Write the question answer...'
              {...register('answer')}
            />
            {errors.answer && (
              <p
                id='answer-error'
                className='flex items-center gap-1.5 px-1 text-red-500 mt-1 text-sm'
                role='alert'
              >
                <AlertCircle className='size-4' />
                {errors.answer.message}
              </p>
            )}
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
                {!isEditing ? 'Answer' : 'Update'}
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

export default AnswerForm;
