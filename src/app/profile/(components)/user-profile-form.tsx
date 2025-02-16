'use client';

import Image from 'next/image';
import { AlertCircle, CloudUpload, Loader2, Settings } from 'lucide-react';
import { User } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';

import SettingsCard from './settings-card';
import SkillsInput from './skills-input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useServerActionMutation } from '@/hooks/use-server-action';
import { updateUser as updateUserAction } from '@/actions/user/update-user';

export type ProfileFormData = {
  name: string;
  position?: string;
  description?: string;
  image?: string;
  coverImage?: string;
  skills: string[];
};

const UserProfileValidatorSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.optional(z.string()),
  position: z.optional(z.string()),
  skills: z.array(z.string()),
});

const UserProfileForm = ({ user }: { user: User }) => {
  const { name, email, image, coverImage, description, position, skills } =
    user;

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
          <div className='w-full h-32 rounded-lg'>
            <Image src={coverImage} alt='cover image' fill />
          </div>
        ) : (
          <div className='w-full h-32 rounded-lg bg-gradient-to-r from-purple-500 to-pink-300' />
        )}
        <div className='absolute w-[calc(100%-4rem)] -bottom-14 left-8 flex items-end gap-6'>
          <Avatar className='size-24 border border-border shadow-lg'>
            <AvatarImage src={image ?? undefined} alt={name ?? 'Profile'} />
            <AvatarFallback className='text-lg'>
              {name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className='w-full flex items-center justify-between'>
            <div>
              <h1 className='text-xl font-semibold'>{name}</h1>
              <p className='text-muted-foreground text-sm'>{email}</p>
            </div>
            <div className='flex gap-4 ml-auto'>
              <Button size='sm' type='submit' disabled={isPending}>
                {isPending && <Loader2 className='size-4 animate-spin' />}
                Save changes
              </Button>
            </div>
          </div>
        </div>
      </header>
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
          {/* Profile image */}
          <SettingsCard
            title='Profile picture'
            description='Upload your profile picture.'
          >
            <input id='profile-image' className='hidden' type='file' />
            <label
              htmlFor='profile-image'
              className='bg-gray-100 rounded-lg w-full h-28 flex flex-col items-center justify-center gap-1'
            >
              <CloudUpload className='size-5 mb-1' />
              <h3 className='text-sm font-medium'>
                <span className='underline'>Click to upload</span> or drag and
                drop
              </h3>
              <p className='text-xs text-muted-foreground'>
                SVG, PNG, JPEG, JPG (max 5MB)
              </p>
            </label>
          </SettingsCard>
          {/* Cover image */}
          <SettingsCard
            title='Cover picture'
            description='Upload your cover picture.'
          >
            <input id='cover-image' className='hidden' type='file' />
            <label
              htmlFor='cover-image'
              className='bg-gray-100 rounded-lg w-full h-28 flex flex-col items-center justify-center gap-1'
            >
              <CloudUpload className='size-5 mb-1' />
              <h3 className='text-sm font-medium'>
                <span className='underline'>Click to upload</span> or drag and
                drop
              </h3>
              <p className='text-xs text-muted-foreground'>
                SVG, PNG, JPEG, JPG (max 5MB)
              </p>
            </label>
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
