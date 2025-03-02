'use client';

import { useState, type ReactElement } from 'react';
import { toast } from 'sonner';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

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
import { deleteQuestion as deleteQuestionAction } from '@/actions/questions/delete-question';

type DeleteQuestionDialogProps = {
  questionId: string;
  trigger?: ReactElement;
  onSuccess?: () => void;
};

const DeleteQuestionDialog = ({
  questionId,
  trigger,
  onSuccess,
}: DeleteQuestionDialogProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { mutate: deleteQuestion } = useServerActionMutation(
    deleteQuestionAction,
    {
      mutationKey: ['delete-question'],
      onSuccess: () => {
        router.push('/forum');
        onSuccess?.();
        toast.success('Question deleted successfully');
        setIsOpen(false);
      },
      onError: () => toast.error('Failed to delete question'),
      onSettled: () => setIsLoading(false),
    }
  );

  const handleDeleteQuestion = async () => {
    setIsLoading(true);
    deleteQuestion({ id: questionId });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <Button size='sm'>Delete question</Button>}
      </DialogTrigger>
      <DialogContent withCloseButton={false} className='max-w-md space-y-6 p-4'>
        <DialogHeader className='flex flex-col items-center gap-2'>
          <AlertCircle className='text-red-400 size-7' />
          <div className='text-center space-y-2'>
            <DialogTitle className='text-base'>
              Delete this question?
            </DialogTitle>
            <DialogDescription className='text-center max-w-sm'>
              You are about to delete your question. All data and answers
              related to this question will be deleted.{' '}
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
              onClick={handleDeleteQuestion}
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

export default DeleteQuestionDialog;
