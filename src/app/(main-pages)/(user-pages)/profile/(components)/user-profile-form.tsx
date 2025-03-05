'use client';

import Image from 'next/image';
import { AlertCircle, Loader2, Settings } from 'lucide-react';
import { Objective, User, WeeklyAvailability } from '@prisma/client';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';

import SettingsCard from './settings-card';
import SkillsInput from './skills-input';
import UploadImage from '../../../../../components/custom/upload-image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useServerActionMutation } from '@/hooks/use-server-action';
import { updateUser as updateUserAction } from '@/actions/user/update-user';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  OBJECTIVE_LABELS,
  USERS_WEEKLY_AVAILABILITY_LABELS,
} from '@/lib/labels';
import { Switch } from '@/components/ui/switch';

export type ProfileFormData = {
  name: string;
  position?: string;
  description?: string;
  location?: string;
  objective?: Objective;
  weeklyAvailability?: WeeklyAvailability;
  looking: boolean;
  image?: string;
  coverImage?: string;
  skills: string[];
};

const UserProfileValidatorSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.optional(z.string()),
  position: z.optional(z.string()),
  location: z.optional(z.string()),
  weeklyAvailability: z.optional(z.nativeEnum(WeeklyAvailability)),
  looking: z.boolean(),
  objective: z.optional(z.nativeEnum(Objective)),
  skills: z.array(z.string()),
});

const UserProfileForm = ({ user }: { user: User }) => {
  const {
    name,
    email,
    image,
    coverImage,
    description,
    weeklyAvailability,
    looking,
    position,
    skills,
    location,
    objective,
  } = user;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(UserProfileValidatorSchema),
    defaultValues: {
      name: name ?? undefined,
      description: description ?? undefined,
      position: position ?? undefined,
      location: location ?? undefined,
      weeklyAvailability: weeklyAvailability ?? undefined,
      looking: looking ?? false,
      objective: objective ?? undefined,
      skills: skills?.map(skill => String(skill)) ?? [],
    },
  });

  const { mutate: updateUser, isPending } = useServerActionMutation(
    updateUserAction,
    {
      mutationKey: ['update-user'],
      onSuccess: () => toast.success('Account settings updated successfully'),
      onError: () => toast.error('Failed to update account settings'),
    }
  );

  const onSubmit = (data: ProfileFormData) => {
    updateUser({ ...data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <header className='relative mb-20'>
        {coverImage ? (
          <div className='w-full h-32 rounded-lg overflow-hidden'>
            <Image
              src={coverImage}
              alt='cover image'
              fill
              className='rounded-lg object-cover'
              placeholder='blur'
              blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR0XFyAeIB4gHh4gIB4dHR0eHh0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAP/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
              loading='lazy'
            />
          </div>
        ) : (
          <div className='w-full h-32 rounded-lg bg-gradient-to-r from-purple-500 to-pink-300' />
        )}
        <div className='absolute w-[calc(100%-4rem)] -bottom-14 left-2 md:left-8 flex items-end gap-6'>
          <Avatar className='size-24 border border-border shadow-lg'>
            <AvatarImage src={image ?? undefined} alt={name ?? 'Profile'} />
            <AvatarFallback className='text-lg'>
              {name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className='w-full flex items-center justify-between'>
            <div>
              <h1 className='text-lg md:text-xl font-semibold'>{name}</h1>
              <p className='text-muted-foreground text-sm'>{email}</p>
            </div>
            <div className='gap-4 ml-auto hidden md:flex'>
              <Button size='sm' type='submit' disabled={isPending}>
                {isPending && <Loader2 className='size-4 animate-spin' />}
                Save changes
              </Button>
            </div>
          </div>
        </div>
      </header>
      <Button type='submit' disabled={isPending} className='w-full md:hidden'>
        {isPending && <Loader2 className='size-4 animate-spin' />}
        Save changes
      </Button>
      <div>
        <div className='p-3 mt-3'>
          <p className='text-xs flex items-center text-muted-foreground'>
            <Settings className='size-3.5 mr-1' /> Settings / Profile
          </p>
          <h2 className='font-medium text-lg'>Account settings</h2>
        </div>
        <ul>
          {/* Name + Position */}
          <SettingsCard
            title='Public profile'
            description='Update your public profile information that is visible to others'
          >
            <Input
              placeholder='Your account name'
              {...register('name')}
              disabled={isPending}
            />
            {errors.name && (
              <p
                id='name-error'
                className='flex items-center gap-1.5 px-1 text-red-500 text-xs'
                role='alert'
              >
                <AlertCircle className='size-3' />
                {errors.name.message}
              </p>
            )}
            <Input
              placeholder='Your position (e.g. Software developer)'
              {...register('position')}
              disabled={isPending}
            />
          </SettingsCard>
          {/* Description */}
          <SettingsCard
            title='Description'
            description='Tell other users about yourself, your objective, vision, techologies and projects.'
          >
            <Textarea
              placeholder='Tell us about you'
              rows={5}
              className='resize-none'
              {...register('description')}
              disabled={isPending}
            />
          </SettingsCard>
          {/* Location */}
          <SettingsCard
            title='Location'
            description='Enter your city and country to help others discover and connect with you based on your location'
          >
            <Input
              placeholder='Your location'
              {...register('location')}
              disabled={isPending}
            />
          </SettingsCard>
          {/* Objective */}
          <SettingsCard
            title='Objective'
            description='Let other users know what are you looking for'
          >
            <Controller
              control={control}
              name='objective'
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? ''}
                  defaultValue={field.value ?? ''}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select your objective' />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(OBJECTIVE_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </SettingsCard>
          {/* Weekly Availability */}
          <SettingsCard
            title='Weekly availabily'
            description='This represent the aproximate amount of hours you can spend working on a startup'
          >
            <Controller
              control={control}
              name='weeklyAvailability'
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? ''}
                  defaultValue={field.value ?? ''}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select your availability' />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(USERS_WEEKLY_AVAILABILITY_LABELS).map(
                      ([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              )}
            />
          </SettingsCard>
          {/* Looking */}
          <SettingsCard
            title='Are you looking for startups?'
            description='This tells the other users/startups if you seek to join a startup'
          >
            <Controller
              control={control}
              name='looking'
              render={({ field: { value, onChange, ...field } }) => (
                <Switch checked={value} onCheckedChange={onChange} {...field} />
              )}
            />
          </SettingsCard>
          {/* Profile image */}
          <SettingsCard
            title='Profile picture'
            description='Upload your profile picture.'
          >
            <UploadImage entityType='user' imageType='image' />
          </SettingsCard>
          {/* Cover image */}
          <SettingsCard
            title='Cover picture'
            description='Upload your cover picture.'
          >
            <UploadImage entityType='user' imageType='coverImage' />
          </SettingsCard>
          {/* Skills */}
          <SettingsCard
            title='Skills'
            description='Add your technical skills and expertise'
          >
            <SkillsInput control={control} />
          </SettingsCard>
        </ul>
      </div>
    </form>
  );
};

export default UserProfileForm;
