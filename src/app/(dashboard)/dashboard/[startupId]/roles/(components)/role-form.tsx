'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { StartupRole } from '@prisma/client';
import { ReactNode, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { AlertCircle, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
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
import { Input } from '@/components/ui/input';
import { useServerActionMutation } from '@/hooks/use-server-action';
import { Label } from '@/components/ui/label';
import { createRole as createRoleAction } from '@/actions/role/create-role';
import { updateRole as updateRoleAction } from '@/actions/role/update-role';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

type RoleFormProps = {
  data?: StartupRole;
  startupId: string;
  trigger?: ReactNode;
  onSuccess?: () => void;
};

export type RoleFormData = {
  name: string;
  description?: string;
  active: boolean;
  requiresSurvey: boolean;
};

const RoleFormSchemaValidator = z.object({
  name: z.string().min(1, 'Must provide a name'),
  description: z.optional(z.string()),
  active: z.boolean(),
  requiresSurvey: z.boolean(),
});

const RoleForm = ({
  data: defaultData,
  startupId,
  trigger,
  onSuccess,
}: RoleFormProps) => {
  const isEditing = Boolean(defaultData?.id);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RoleFormData>({
    resolver: zodResolver(RoleFormSchemaValidator),
    defaultValues: {
      name: defaultData?.name ?? '',
      description: defaultData?.description ?? '',
      active: defaultData?.active ?? false,
      requiresSurvey: defaultData?.requiresSurvey ?? false,
    },
  });

  const { mutate: createRole, isPending: isCreating } = useServerActionMutation(
    createRoleAction,
    {
      mutationKey: ['create-role'],
      onSuccess: () => {
        toast.success('Role created successfully');
        setIsOpen(false);
        onSuccess?.();
        reset();
      },
      onError: () => toast.error('Failed to create role'),
    }
  );
  const { mutate: updateRole, isPending: isUpdating } = useServerActionMutation(
    updateRoleAction,
    {
      mutationKey: ['update-role'],
      onSuccess: () => {
        toast.success('Role updated successfully');
        setIsOpen(false);
        onSuccess?.();
      },
      onError: () => toast.error('Failed to update role'),
    }
  );

  const handleOnSubmit = handleSubmit(data => {
    if (isEditing && defaultData?.id) {
      updateRole({ id: defaultData.id, ...data, startupId });
    } else createRole({ ...data, startupId });
  });

  const isLoading = isCreating || isUpdating;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>Open form</Button>}
      </DialogTrigger>
      <DialogContent
        withCloseButton={false}
        className='max-w-md p-4 space-y-2.5'
      >
        <DialogHeader>
          <DialogTitle>
            {!isEditing ? 'Create new' : 'Edit startup'} role
          </DialogTitle>
          <DialogDescription>
            Define roles and permissions for your startup. Assign custom roles
            to members.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleOnSubmit} className='space-y-2'>
          <div>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              disabled={isLoading}
              placeholder='Role name'
              type='text'
              {...register('name')}
            />
            {errors.name && (
              <p
                id='name-error'
                className='flex items-center gap-1.5 px-1 text-red-500 mt-1 text-sm'
                role='alert'
              >
                <AlertCircle className='size-4' />
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              rows={2}
              disabled={isLoading}
              placeholder='Role description (Optional)'
              {...register('description')}
              className='resize-none'
            />
          </div>
          <div className='flex items-center justify-between border border-border rounded-lg p-2'>
            <div>
              <Label>Active</Label>
              <p className='text-sm text-muted-foreground'>
                It&apos; will show to users in the browse page.
              </p>
            </div>
            <Controller
              control={control}
              name='active'
              render={({ field: { value, onChange, ...field } }) => (
                <Switch checked={value} onCheckedChange={onChange} {...field} />
              )}
            />
          </div>
          <div className='flex items-center justify-between border border-border rounded-lg p-2'>
            <div>
              <Label>Requires survey</Label>
              <p className='text-sm text-muted-foreground'>
                Before the user applies to join the startup it will have to fill
                a survey.
              </p>
            </div>
            <Controller
              control={control}
              name='requiresSurvey'
              render={({ field: { value, onChange, ...field } }) => (
                <Switch checked={value} onCheckedChange={onChange} {...field} />
              )}
            />
          </div>

          <DialogFooter className='pt-5'>
            <div className='w-full flex flex-col items-center gap-2'>
              <Button
                disabled={isLoading}
                size='sm'
                className='w-full'
                type='submit'
              >
                {isLoading && <Loader2 className='size-4 animate-spin' />}
                {!isEditing ? 'Create' : 'Update'}
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
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RoleForm;
