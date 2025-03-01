'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Event, EventVisibility } from '@prisma/client';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createEvent as createEventAction } from '@/actions/event/create-event';
import { updateEvent as updateEventAction } from '@/actions/event/update-event';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type EventFormProps = {
  data?: Event;
  startupId: string;
  trigger?: ReactNode;
  onSuccess?: () => void;
};

export type EventFormData = {
  name: string;
  description?: string;
  startTime: Date;
  endTime?: Date;
  visibility: EventVisibility;
  streamingLink?: string;
  embedCode?: string;
};

const EventFormSchemaValidator = z.object({
  name: z.string().min(1, 'Must provide an event name'),
  description: z.optional(z.string()),
  startTime: z.date(),
  endTime: z.optional(z.date()),
  visibility: z.nativeEnum(EventVisibility),
  streamingLink: z.optional(z.string()),
  embedCode: z.optional(z.string()),
});

const EventForm = ({
  data: defaultData,
  startupId,
  trigger,
  onSuccess,
}: EventFormProps) => {
  const isEditing = Boolean(defaultData?.id);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [streamingType, setStreamingType] = useState<'link' | 'embed'>(
    defaultData?.embedCode ? 'embed' : 'link'
  );

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(EventFormSchemaValidator),
    defaultValues: {
      name: defaultData?.name ?? '',
      description: defaultData?.description ?? '',
      startTime: defaultData?.startTime ?? undefined,
      endTime: defaultData?.endTime ?? undefined,
      visibility: defaultData?.visibility ?? 'PRIVATE',
      streamingLink: defaultData?.streamingLink ?? '',
      embedCode: defaultData?.embedCode ?? '',
    },
  });

  const { mutate: createEvent, isPending: isCreating } =
    useServerActionMutation(createEventAction, {
      mutationKey: ['create-event'],
      onSuccess: () => {
        toast.success('Event created successfully');
        setIsOpen(false);
        onSuccess?.();
        reset();
      },
      onError: () => toast.error('Failed to create event'),
    });
  const { mutate: updateEvent, isPending: isUpdating } =
    useServerActionMutation(updateEventAction, {
      mutationKey: ['update-event'],
      onSuccess: () => {
        toast.success('Event updated successfully');
        setIsOpen(false);
        onSuccess?.();
      },
      onError: () => toast.error('Failed to update event'),
    });

  const handleOnSubmit = handleSubmit(data => {
    if (isEditing && defaultData?.id) {
      updateEvent({ id: defaultData.id, ...data, startupId });
    } else createEvent({ ...data, startupId });
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
            {!isEditing ? 'Create new' : 'Edit startup'} event
          </DialogTitle>
          <DialogDescription>
            List events for your members or make them public for everyone.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleOnSubmit} className='space-y-2'>
          {/* Name */}
          <div>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              disabled={isLoading}
              placeholder='Event name'
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
          {/* Description */}
          <div>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              rows={2}
              disabled={isLoading}
              placeholder='Event description (Optional)'
              {...register('description')}
              className='resize-none'
            />
          </div>

          <div className='grid grid-cols-2 gap-2'>
            {/* Start time */}
            <div>
              <Label htmlFor='startTime'>Start Time</Label>
              <Controller
                name='startTime'
                control={control}
                render={({ field }) => (
                  <Input
                    id='startTime'
                    disabled={isLoading}
                    type='datetime-local'
                    onChange={e => field.onChange(new Date(e.target.value))}
                    value={
                      field.value
                        ? new Date(field.value).toISOString().slice(0, 16)
                        : ''
                    }
                  />
                )}
              />
              {errors.startTime && (
                <p
                  className='flex items-center gap-1.5 px-1 text-red-500 mt-1 text-sm'
                  role='alert'
                >
                  <AlertCircle className='size-4' />
                  {errors.startTime.message}
                </p>
              )}
            </div>
            {/* End time */}
            <div>
              <Label htmlFor='endTime'>End Time (Optional)</Label>
              <Controller
                name='endTime'
                control={control}
                render={({ field }) => (
                  <Input
                    id='endTime'
                    disabled={isLoading}
                    type='datetime-local'
                    onChange={e =>
                      field.onChange(
                        e.target.value ? new Date(e.target.value) : undefined
                      )
                    }
                    value={
                      field.value
                        ? new Date(field.value).toISOString().slice(0, 16)
                        : ''
                    }
                  />
                )}
              />
            </div>
          </div>

          {/* Visibility type */}
          <div>
            <Label htmlFor='visibility'>Visibility</Label>
            <Controller
              name='visibility'
              control={control}
              render={({ field }) => (
                <Select
                  disabled={isLoading}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger id='visibility'>
                    <SelectValue placeholder='Select visibility' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='PRIVATE'>
                      Private (Only members)
                    </SelectItem>
                    <SelectItem value='PUBLIC'>Public (Everyone)</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.visibility && (
              <p
                className='flex items-center gap-1.5 px-1 text-red-500 mt-1 text-sm'
                role='alert'
              >
                <AlertCircle className='size-4' />
                {errors.visibility.message}
              </p>
            )}
          </div>

          {/* Streaming option */}
          <div>
            <Label>Streaming Options</Label>
            <Tabs
              value={streamingType}
              onValueChange={value =>
                setStreamingType(value as 'link' | 'embed')
              }
              className='mt-2'
            >
              <TabsList className='grid grid-cols-2 w-full'>
                <TabsTrigger value='link'>Streaming Link</TabsTrigger>
                <TabsTrigger value='embed'>Embed Code</TabsTrigger>
              </TabsList>
              <TabsContent value='link' className='pt-2'>
                <Input
                  id='streamingLink'
                  disabled={isLoading}
                  placeholder='Zoom, Twitch, or Google Meet link'
                  type='url'
                  {...register('streamingLink')}
                />
                {errors.streamingLink && (
                  <p
                    className='flex items-center gap-1.5 px-1 text-red-500 mt-1 text-sm'
                    role='alert'
                  >
                    <AlertCircle className='size-4' />
                    {errors.streamingLink.message}
                  </p>
                )}
              </TabsContent>
              <TabsContent value='embed' className='pt-2'>
                <Textarea
                  id='embedCode'
                  rows={3}
                  disabled={isLoading}
                  placeholder='Paste YouTube or other embed code here'
                  {...register('embedCode')}
                  className='resize-none'
                />
                {errors.embedCode && (
                  <p
                    className='flex items-center gap-1.5 px-1 text-red-500 mt-1 text-sm'
                    role='alert'
                  >
                    <AlertCircle className='size-4' />
                    {errors.embedCode.message}
                  </p>
                )}
              </TabsContent>
            </Tabs>
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

export default EventForm;
