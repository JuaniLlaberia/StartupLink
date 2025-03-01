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
import { deleteEvent as deleteEventAction } from '@/actions/event/delete-event';

type DeleteEventDialogProps = {
  eventId: string;
  eventName: string;
  startupId: string;
  trigger?: ReactElement;
  onSuccess?: () => void;
};

const DeleteEventDialog = ({
  eventId,
  eventName,
  startupId,
  trigger,
  onSuccess,
}: DeleteEventDialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { mutate: deleteEvent, isPending } = useServerActionMutation(
    deleteEventAction,
    {
      mutationKey: ['delete-event'],
      onSuccess: () => {
        onSuccess?.();
        toast.success('Event deleted successfully');
        setIsOpen(false);
      },
      onError: () => toast.error('Failed to delete event'),
    }
  );

  const handleDeleteAnswer = async () => {
    deleteEvent({ eventId, startupId });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <Button size='sm'>Delete event</Button>}
      </DialogTrigger>
      <DialogContent withCloseButton={false} className='max-w-md space-y-6 p-4'>
        <DialogHeader className='flex flex-col items-center gap-2'>
          <AlertCircle className='text-red-400 size-7' />
          <div className='text-center space-y-2'>
            <DialogTitle className='text-base'>Delete this event?</DialogTitle>
            <DialogDescription className='text-center max-w-sm'>
              You are about to delete{' '}
              <span className='font-medium'>{eventName}</span> event.{' '}
              <span className='text-red-500 font-medium'>
                This action is irreversible.
              </span>
            </DialogDescription>
          </div>
        </DialogHeader>

        <DialogFooter>
          <div className='w-full flex flex-col items-center gap-2'>
            <Button
              disabled={isPending}
              size='sm'
              variant='destructive'
              onClick={handleDeleteAnswer}
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

export default DeleteEventDialog;
