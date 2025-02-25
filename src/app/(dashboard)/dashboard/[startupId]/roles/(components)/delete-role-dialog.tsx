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
import { deleteRole as deleteRoleAction } from '@/actions/role/delete-role';

type DeleteRoleDialogProps = {
  roleId: string;
  roleName: string;
  startupId: string;
  trigger?: ReactElement;
  onSuccess?: () => void;
};

const DeleteRoleDialog = ({
  roleId,
  roleName,
  startupId,
  trigger,
  onSuccess,
}: DeleteRoleDialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { mutate: deleteRole } = useServerActionMutation(deleteRoleAction, {
    mutationKey: ['delete-role'],
    onSuccess: () => {
      onSuccess?.();
      toast.success('Role deleted successfully');
      setIsOpen(false);
    },
    onError: () => toast.error('Failed to delete role'),
    onSettled: () => setIsLoading(false),
  });

  const handleDeleteAnswer = async () => {
    setIsLoading(true);
    deleteRole({ id: roleId, startupId });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <Button size='sm'>Delete role</Button>}
      </DialogTrigger>
      <DialogContent withCloseButton={false} className='max-w-md space-y-6 p-4'>
        <DialogHeader className='flex flex-col items-center gap-2'>
          <AlertCircle className='text-red-400 size-7' />
          <div className='text-center space-y-2'>
            <DialogTitle className='text-base'>Delete this role?</DialogTitle>
            <DialogDescription className='text-center max-w-sm'>
              You are about to delete{' '}
              <span className='font-medium'>{roleName}</span> role.{' '}
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

export default DeleteRoleDialog;
