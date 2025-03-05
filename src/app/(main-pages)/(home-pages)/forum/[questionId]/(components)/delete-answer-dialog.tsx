'use client';

import { useState, type ReactElement } from 'react';
import { toast } from 'sonner';
import { AlertCircle, Loader2 } from 'lucide-react';

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
import { Button } from '@/components/ui/button';
import { useServerActionMutation } from '@/hooks/use-server-action';
import { deleteAnswer as deleteAnswerAction } from '@/actions/answers/delete-answer';

type DeleteAnswerDialogProps = {
  questionId: string;
  trigger?: ReactElement;
  onSuccess?: () => void;
};

const DeleteAnswerDialog = ({
  questionId,
  trigger,
  onSuccess,
}: DeleteAnswerDialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { mutate: deleteAnswer } = useServerActionMutation(deleteAnswerAction, {
    mutationKey: ['delete-answer'],
    onSuccess: () => {
      onSuccess?.();
      toast.success('Answer deleted successfully');
      setIsOpen(false);
    },
    onError: () => toast.error('Failed to delete answer'),
    onSettled: () => setIsLoading(false),
  });

  const handleDeleteAnswer = async () => {
    setIsLoading(true);
    deleteAnswer({ id: questionId });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <Button size='sm'>Delete answer</Button>}
      </DialogTrigger>
      <DialogContent withCloseButton={false} className='max-w-md space-y-6 p-4'>
        <DialogHeader className='flex flex-col items-center gap-2'>
          <AlertCircle className='text-red-400 size-7' />
          <div className='text-center space-y-2'>
            <DialogTitle className='text-base'>Delete this answer?</DialogTitle>
            <DialogDescription className='text-center max-w-sm'>
              You are about to delete your answer.{' '}
              <span className='text-red-500 font-medium'>
                This action is irreversible.
              </span>
            </DialogDescription>
          </div>
        </DialogHeader>

        <DialogFooter>
          <div className='w-full flex flex-col items-center gap-2'>
            <Button
              disabled={isLoading}
              size='sm'
              variant='destructive'
              onClick={handleDeleteAnswer}
              className='w-full'
            >
              {isLoading && <Loader2 className='size-4 animate-spin' />}
              Confirm
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
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAnswerDialog;
