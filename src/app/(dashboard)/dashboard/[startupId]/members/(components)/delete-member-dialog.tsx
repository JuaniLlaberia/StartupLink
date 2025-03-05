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
import { deleteMember as deleteMemberAction } from '@/actions/member/delete-member';

type DeleteMemberDialogProps = {
  memberId: string;
  startupId: string;
  trigger?: ReactElement;
  onSuccess?: () => void;
};

const DeleteMemberDialog = ({
  memberId,
  startupId,
  trigger,
  onSuccess,
}: DeleteMemberDialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { mutate: deleteMember, isPending } = useServerActionMutation(
    deleteMemberAction,
    {
      mutationKey: ['delete-member'],
      onSuccess: () => {
        onSuccess?.();
        toast.success('Member deleted successfully');
        setIsOpen(false);
      },
      onError: () => toast.error('Failed to delete member'),
    }
  );

  const handleDeleteMember = async () => {
    deleteMember({ id: memberId, startupId });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <Button size='sm'>Delete member</Button>}
      </DialogTrigger>
      <DialogContent withCloseButton={false} className='max-w-md space-y-6 p-4'>
        <DialogHeader className='flex flex-col items-center gap-2'>
          <AlertCircle className='text-red-400 size-7' />
          <div className='text-center space-y-2'>
            <DialogTitle className='text-base'>Delete this member?</DialogTitle>
            <DialogDescription className='text-center max-w-sm'>
              You are about to delete this member.{' '}
              <span className='text-red-500 font-medium'>
                User can join again if accepted.
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
              onClick={handleDeleteMember}
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

export default DeleteMemberDialog;
