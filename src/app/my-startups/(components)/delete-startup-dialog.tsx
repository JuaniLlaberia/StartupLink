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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type DeleteStartupDialogProps = {
  startupId: string;
  startupName: string;
  trigger?: ReactElement;
  onSuccess?: () => void;
};

const DeleteStartupDialog = ({
  startupId,
  startupName,
  trigger,
  onSuccess,
}: DeleteStartupDialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { mutate: deleteStartup } = useServerActionMutation(
    deleteStartupAction,
    {
      mutationKey: ['delete-startup'],
      onSuccess: () => {
        onSuccess?.();
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-xl'>Delete Startup</DialogTitle>
          <DialogDescription>
            You are about to delete{' '}
            <span className='font-medium'>{startupName}</span> startup. All data
            related to this startup will be deleted.
          </DialogDescription>
        </DialogHeader>

        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>This action is ireversible</AlertDescription>
        </Alert>

        <DialogFooter className='justify-end'>
          <DialogClose asChild>
            <Button size='sm' variant='outline' disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={isLoading}
            size='sm'
            variant='destructive'
            onClick={handleDeleteStartup}
            className='min-w-16'
          >
            {isLoading && <Loader2 className='size-4 animate-spin' />}
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteStartupDialog;
