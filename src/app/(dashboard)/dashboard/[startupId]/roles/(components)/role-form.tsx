'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { StartupRole, Survey } from '@prisma/client';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type ExtendedStartupRole = StartupRole & {
  requiresSurvey?: boolean;
  surveyId?: string | null;
};

type RoleFormProps = {
  data?: ExtendedStartupRole;
  surveys: Omit<Survey, 'startupId' | 'questions'>[];
  startupId: string;
  trigger?: ReactNode;
  onSuccess?: () => void;
};

export type RoleFormData = {
  name: string;
  description?: string;
  active: boolean;
  requiresSurvey: boolean;
  surveyId?: string;
};

const RoleFormSchemaValidator = z
  .object({
    name: z.string().min(1, 'Must provide a name'),
    description: z.optional(z.string()),
    active: z.boolean(),
    requiresSurvey: z.boolean(),
    surveyId: z.string().optional(),
  })
  .refine(
    data => {
      if (data.requiresSurvey) {
        return !!data.surveyId;
      }
      return true; // Otherwise no validation needed
    },
    {
      message: 'Survey is required when "Requires Survey" is checked',
      path: ['surveyId'],
    }
  );

const RoleForm = ({
  data: defaultData,
  startupId,
  surveys,
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
    watch,
    formState: { errors },
  } = useForm<RoleFormData>({
    resolver: zodResolver(RoleFormSchemaValidator),
    defaultValues: {
      name: defaultData?.name ?? '',
      description: defaultData?.description ?? '',
      active: defaultData?.active ?? false,
      requiresSurvey: defaultData?.requiresSurvey ?? false,
      surveyId: defaultData?.surveyId ?? undefined,
    },
  });

  const requiresSurvey = watch('requiresSurvey');

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
      updateRole({
        id: defaultData.id,
        ...data,
        startupId,
        surveyId: data.requiresSurvey ? data.surveyId : undefined,
      });
    } else {
      createRole({
        ...data,
        startupId,
        surveyId: data.requiresSurvey ? data.surveyId : undefined,
      });
    }
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
                It&apos;s will show to users in the browse page.
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

          {/* Survey selector that only appears when requiresSurvey is true */}
          {requiresSurvey && (
            <div>
              <Label htmlFor='surveyId'>Select Survey</Label>
              <Controller
                control={control}
                name='surveyId'
                render={({ field }) => (
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value || ''}
                  >
                    <SelectTrigger className='mt-1'>
                      <SelectValue placeholder='Select a survey' />
                    </SelectTrigger>
                    <SelectContent>
                      {surveys.map(survey => (
                        <SelectItem key={survey.id} value={survey.id}>
                          {survey.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.surveyId && (
                <p
                  id='surveyId-error'
                  className='flex items-center gap-1.5 px-1 text-red-500 mt-1 text-sm'
                  role='alert'
                >
                  <AlertCircle className='size-4' />
                  {errors.surveyId.message}
                </p>
              )}
            </div>
          )}

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
