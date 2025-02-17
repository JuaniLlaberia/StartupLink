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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { leaveStartup as leaveStartupAction } from '@/actions/startup/leave-startup';

type LeaveStartupDialogProps = {
  startupId: string;
  startupName: string;
  trigger?: ReactElement;
  onSuccess?: () => void;
};

const LeaveStartupDialog = ({
  startupId,
  startupName,
  trigger,
  onSuccess,
}: LeaveStartupDialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { mutate: leaveStartup } = useServerActionMutation(leaveStartupAction, {
    mutationKey: ['leave-startup'],
    onSuccess: () => {
      onSuccess?.();
      setIsOpen(false);
    },
    onError: err => {
      console.log(err);
      toast.error('Failed to leave startup');
    },
    onSettled: () => setIsLoading(false),
  });

  const handleleaveStartup = async () => {
    setIsLoading(true);
    leaveStartup({ id: startupId });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <Button size='sm'>Leave Startup</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-xl'>Leave Startup</DialogTitle>
          <DialogDescription>
            You are about to leave{' '}
            <span className='font-medium'>{startupName}</span> startup.
          </DialogDescription>
        </DialogHeader>

        <Alert variant='informative'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Information</AlertTitle>
          <AlertDescription>
            You can join back if accepted by founders
          </AlertDescription>
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
            onClick={handleleaveStartup}
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

export default LeaveStartupDialog;
