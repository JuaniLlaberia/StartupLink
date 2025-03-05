'use client';

import { useState, type ReactElement } from 'react';
import { toast } from 'sonner';
import { Loader2, LogOut } from 'lucide-react';

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
import { leaveStartup as leaveStartupAction } from '@/actions/startup/leave-startup';

type LeaveStartupDialogProps = {
  startupId: string;
  startupName?: string;
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
    onError: () => 
      toast.error('Failed to leave startup')
    ,
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
      <DialogContent withCloseButton={false} className='max-w-md space-y-6 p-4'>
        <DialogHeader className='flex flex-col items-center gap-2'>
          <LogOut className='text-red-400 size-7' />
          <div className='text-center space-y-2'>
            <DialogTitle className='text-base'>Leave this startup?</DialogTitle>
            <DialogDescription className='text-center max-w-sm'>
              You are about to leave{' '}
              {startupName ? (
                <span className='font-medium'>{startupName}</span>
              ) : (
                'this'
              )}{' '}
              startup.{' '}
              <span className='font-medium'>
                You can join back if accepted by founders
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
              onClick={handleleaveStartup}
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

export default LeaveStartupDialog;
