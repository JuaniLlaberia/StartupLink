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
import { deleteStartup as deleteStartupAction } from '@/actions/startup/delete-startup';
import { useRouter } from 'next/navigation';

type DeleteStartupDialogProps = {
  startupId: string;
  startupName?: string;
  trigger?: ReactElement;
  onSuccess?: () => void;
};

const DeleteStartupDialog = ({
  startupId,
  startupName,
  trigger,
  onSuccess,
}: DeleteStartupDialogProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { mutate: deleteStartup } = useServerActionMutation(
    deleteStartupAction,
    {
      mutationKey: ['delete-startup'],
      onSuccess: () => {
        onSuccess?.();
        router.push('/my-startups');
        toast.success('Startup deleted successfully');
        setIsOpen(false);
      },
      onError: () => toast.error('Failed to delete startup'),
      onSettled: () => setIsLoading(false),
    }
  );

  const handleDeleteStartup = async () => {
    setIsLoading(true);
    deleteStartup({ id: startupId });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <Button size='sm'>Delete Startup</Button>}
      </DialogTrigger>
      <DialogContent withCloseButton={false} className='max-w-md space-y-6 p-4'>
        <DialogHeader className='flex flex-col items-center gap-2'>
          <AlertCircle className='text-red-400 size-7' />
          <div className='text-center space-y-2'>
            <DialogTitle className='text-base'>
              Delete this startup?
            </DialogTitle>
            <DialogDescription className='text-center max-w-sm'>
              You are about to delete{' '}
              {startupName ? (
                <span className='font-medium'>{startupName}</span>
              ) : (
                'this'
              )}{' '}
              startup. All data related to this startup will be deleted.{' '}
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
              onClick={handleDeleteStartup}
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

export default DeleteStartupDialog;
