'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Industry, Stage, Startup, TeamSize } from '@prisma/client';
import { AlertCircle, Loader2, Settings, Verified } from 'lucide-react';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import SettingsCard from '@/app/(main-pages)/profile/(components)/settings-card';
import TechStackInput from './tech-stack-input';
import UploadImage from '@/components/custom/upload-image';
import { updateStartup as updateStartupAction } from '@/actions/startup/update-startup';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useServerActionMutation } from '@/hooks/use-server-action';
import { INDUSTRY_LABELS, STAGE_LABELS, TEAM_SIZE_LABELS } from '@/lib/labels';
import { Switch } from '@/components/ui/switch';

type StartupProfileFormProps = {
  startup: Startup;
};

export type StartupFormData = {
  name: string;
  slug: string;
  mission: string;
  stage: Stage;
  industry: Industry;
  teamSize: TeamSize;
  looking: boolean;
  image?: string;
  coverImage?: string;
  skills: string[];
  location?: string;
};

const StartupProfileValidatorSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  mission: z.string().min(25, 'Mission should be at least 25 characters'),
  industry: z.nativeEnum(Industry, { message: 'Industry is required' }),
  stage: z.nativeEnum(Stage, { message: 'Stage is required' }),
  looking: z.boolean(),
  teamSize: z.nativeEnum(TeamSize, { message: 'Team size is required' }),
  location: z.optional(z.string()),
  skills: z.array(z.string()),
});

const StartupProfileForm = ({ startup }: StartupProfileFormProps) => {
  const {
    id,
    name,
    mission,
    image,
    coverImage,
    skills,
    industry,
    verified,
    teamSize,
    stage,
    looking,
    location,
    slug,
  } = startup;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<StartupFormData>({
    resolver: zodResolver(StartupProfileValidatorSchema),
    defaultValues: {
      name,
      slug,
      mission,
      stage,
      location: location ?? undefined,
      looking,
      industry,
      teamSize,
      skills: skills?.map(skill => String(skill)) ?? [],
    },
  });

  const { mutate: updateStartup, isPending } = useServerActionMutation(
    updateStartupAction,
    {
      mutationKey: ['update-startup'],
      onSuccess: () =>
        toast.success('Startup information updated successfully'),
      onError: () => toast.error('Failed to update startup information'),
    }
  );

  const handleOnSubmit = (data: StartupFormData) => {
    updateStartup({ id, ...data });
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
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
        <div className='absolute w-[calc(100%-4rem)] -bottom-10 left-2 md:left-8 flex items-end gap-6'>
          <Avatar className='size-24 border border-border shadow-lg'>
            <AvatarImage src={image ?? undefined} alt={name ?? 'Profile'} />
            <AvatarFallback className='text-lg'>
              {name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className='w-full flex items-start justify-between'>
            <div className='flex items-center gap-2'>
              <h1 className='text-lg md:text-xl font-semibold'>{name}</h1>
              {verified && (
                <span>
                  <Verified className='size-5 stroke-blue-500 fill-blue-50' />
                </span>
              )}
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
            <Settings className='size-3.5 mr-1' /> Dashboard / Information
          </p>
          <h2 className='font-medium text-lg'>Startup information</h2>
        </div>
        <ul>
          {/* Name  */}
          <SettingsCard
            title='Startup name'
            description='Update your startup name that is visible to others'
          >
            <Input
              placeholder='Your startup name'
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
          </SettingsCard>
          {/* Slug  */}
          <SettingsCard
            title='Startup slug'
            description="It's part of the url that users will use to find your startup (Spaces will be transform insto '-' )"
          >
            <div className='flex w-full max-w-sm items-center rounded-md border bg-background focus-within:ring-1 focus-within:ring-ring'>
              <span className='flex h-9 items-center rounded-l-md border-r bg-muted px-3 text-sm text-muted-foreground'>
                startuplink.vercel.app/
              </span>
              <Input
                className='rounded-l-none border-0'
                placeholder='Your startup slug'
                {...register('slug')}
                disabled={isPending}
              />
            </div>
          </SettingsCard>
          {/* Mission */}
          <SettingsCard
            title='Mission'
            description='Tell other users about your startup objectives, vision, techologies and projects.'
          >
            <Textarea
              placeholder='Tell us about you'
              rows={5}
              className='resize-none'
              {...register('mission')}
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
            title='Industry'
            description='Let other users know what industry is your startup in'
          >
            <Controller
              control={control}
              name='industry'
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? ''}
                  defaultValue={field.value ?? ''}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select your industry' />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(INDUSTRY_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </SettingsCard>
          {/* Stage */}
          <SettingsCard
            title='Stage'
            description='At what stage is your startup?'
          >
            <Controller
              control={control}
              name='stage'
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? ''}
                  defaultValue={field.value ?? ''}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select your stage' />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(STAGE_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </SettingsCard>
          {/* Team size */}
          <SettingsCard
            title='Team size'
            description='What is the size of your team?'
          >
            <Controller
              control={control}
              name='teamSize'
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? ''}
                  defaultValue={field.value ?? ''}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select the team size' />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(TEAM_SIZE_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </SettingsCard>
          {/* Looking for members */}
          <SettingsCard
            title='Are you looking for members?'
            description='This tells the other users/startups if you are looking for new members to join your startup.'
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
            title='Startup picture'
            description='Upload your startup picture.'
          >
            <UploadImage entityType='startup' imageType='image' entityId={id} />
          </SettingsCard>
          {/* Cover image */}
          <SettingsCard
            title='Cover picture'
            description='Upload your cover picture.'
          >
            <UploadImage
              entityType='startup'
              imageType='coverImage'
              entityId={id}
            />
          </SettingsCard>
          {/* Skills */}
          <SettingsCard
            title='Your tech stack'
            description='Add the technologies used at your startup'
          >
            <TechStackInput control={control} />
          </SettingsCard>
        </ul>
      </div>
    </form>
  );
};

export default StartupProfileForm;
