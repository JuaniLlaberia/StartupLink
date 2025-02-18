'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { useServerActionMutation } from '@/hooks/use-server-action';
import { createFeedback as createFeedbackAction } from '@/actions/feedback/create-feedback';

const FeedbackValidatorSchema = z.object({
  email: z.string().min(1, 'Must provice your email'),
  feedback: z.string().min(1, 'Must provice feedback'),
});

const FeebackDialog = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(FeedbackValidatorSchema),
    defaultValues: {
      email: '',
      feedback: '',
    },
  });

  const { mutate: createFeedback, isPending } = useServerActionMutation(
    createFeedbackAction,
    {
      mutationKey: ['create-feedback'],
      onSuccess: () => {
        setIsOpen(false);
        reset();
        setServerError('');
        toast.success('Feedback submitted successfully');
      },
      onError: error => {
        console.log(error);
        setServerError(error.message || 'Failed to submit feedback');
        toast.error('Fail to submit feedback');
      },
    }
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <li>
          <Button
            variant='link'
            size='sm'
            className='text-muted-foreground hover:text-primary transition-colors'
          >
            Feedback
          </Button>
        </li>
      </DialogTrigger>
      <DialogContent withCloseButton={false} className='max-w-md space-y-4 p-4'>
        <DialogHeader>
          <DialogTitle>Give us your feedback</DialogTitle>
          <DialogDescription>
            We&apos;d love to hear your thoughts! Share your feedback to help us
            improve and create a better experience for you.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(data => {
            createFeedback({ ...data });
          })}
          className='space-y-4'
        >
          <div className='space-y-2'>
            <Input
              disabled={isPending}
              id='email'
              placeholder='Your email address'
              {...register('email')}
            />
            {errors.email && (
              <p
                id='email-error'
                className='flex items-center gap-1.5 px-1 text-red-500 mt-1 text-sm'
                role='alert'
              >
                <AlertCircle className='size-4' />
                {errors.email.message}
              </p>
            )}

            <Textarea
              disabled={isPending}
              placeholder='Write your feedback...'
              rows={4}
              className='resize-none'
              {...register('feedback')}
            />
            {errors.feedback && (
              <p
                id='feedback-error'
                className='flex items-center gap-1.5 px-1 text-red-500 mt-1 text-sm'
                role='alert'
              >
                <AlertCircle className='size-4' />
                {errors.feedback.message}
              </p>
            )}

            {serverError && (
              <p
                id='server-error'
                className='flex items-center gap-1.5 px-1 text-red-500 mt-1 text-sm'
                role='alert'
              >
                <AlertCircle className='size-4' />
                {serverError}
              </p>
            )}
          </div>
          <DialogFooter>
            <div className='flex flex-col gap-2 w-full'>
              <Button size='sm' disabled={isPending}>
                {isPending && <Loader2 className='size-4 animate-spin' />}Submit
              </Button>
              <DialogClose asChild>
                <Button size='sm' variant='ghost' disabled={isPending}>
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

export default FeebackDialog;
