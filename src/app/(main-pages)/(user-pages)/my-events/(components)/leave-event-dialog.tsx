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
import { leaveEvent as leaveEventAction } from '@/actions/event/leave-event';

type LeaveEventDialogProps = {
  eventId: string;
  trigger?: ReactElement;
  onSuccess?: () => void;
};

const LeaveEventDialog = ({
  eventId,
  trigger,
  onSuccess,
}: LeaveEventDialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { mutate: leaveEvent, isPending } = useServerActionMutation(
    leaveEventAction,
    {
      mutationKey: ['leave-event'],
      onSuccess: () => {
        onSuccess?.();
        toast.success('You left the event');
      },
      onError: () => toast.error('Failed to leave event'),
    }
  );

  const handleleaveEvent = async () => {
    leaveEvent({ eventId });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <Button size='sm'>Leave Event</Button>}
      </DialogTrigger>
      <DialogContent withCloseButton={false} className='max-w-md space-y-6 p-4'>
        <DialogHeader className='flex flex-col items-center gap-2'>
          <LogOut className='text-red-400 size-7' />
          <div className='text-center space-y-2'>
            <DialogTitle className='text-base'>Leave this event?</DialogTitle>
            <DialogDescription className='text-center max-w-sm'>
              You are about to leave this event.{' '}
              <span className='font-medium'>You can join again.</span>
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter>
          <div className='w-full flex flex-col items-center gap-2'>
            <Button
              disabled={isPending}
              size='sm'
              variant='destructive'
              onClick={handleleaveEvent}
              className='w-full'
            >
              {isPending && <Loader2 className='size-4 animate-spin' />}
              Confirm
            </Button>
            <DialogClose asChild>
              <Button
                size='sm'
                variant='ghost'
                disabled={isPending}
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

export default LeaveEventDialog;
