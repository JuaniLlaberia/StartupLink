'use client';

import Image from 'next/image';
import { Startup, StartupDesignConfig } from '@prisma/client';
import { useState } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

import { updateDesignConfig as updateDesignConfigAction } from '@/actions/design/update-design-config';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useServerActionMutation } from '@/hooks/use-server-action';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  StartupMetadata,
  StartupSkills,
} from '@/app/(main-pages)/(home-pages)/startups/(components)/startup-reusable';
import { Separator } from '@/components/ui/separator';

type ConfigOptions = {
  mainBackground: string;
  secondaryBackground: string;
  mainText: string;
  secondaryText: string;
  borderRadius: number;
};

type DesignFormProps = {
  startupId: string;
  startupData: Startup;
  designConfig: StartupDesignConfig;
};

const themePresets = [
  {
    name: 'Light',
    mainBackground: '#ffffff',
    secondaryBackground: '#f0f0f0',
    mainText: '#111827',
    secondaryText: '#868b94ca',
    borderRadius: 8,
  },
  {
    name: 'Dark',
    mainBackground: '#0A0A0A',
    secondaryBackground: '#18181B',
    mainText: '#f9fafb',
    secondaryText: '#d1d5dbc3',
    borderRadius: 12,
  },
  {
    name: 'Purple',
    mainBackground: '#292044',
    secondaryBackground: '#1c162c',
    mainText: '#ffffff',
    secondaryText: '#ecf0ffd3',
    borderRadius: 16,
  },
  {
    name: 'Special',
    mainBackground: '#4BD4B7',
    secondaryBackground: '#191919',
    mainText: '#000000',
    secondaryText: '#cacacaab',
    borderRadius: 4,
  },
];

const DesignForm = ({
  startupId,
  startupData,
  designConfig,
}: DesignFormProps) => {
  const {
    mainBackground,
    secondaryBackground,
    mainText,
    secondaryText,
    borderRadius,
  } = designConfig;

  const [config, setConfig] = useState<ConfigOptions>({
    mainBackground,
    secondaryBackground,
    mainText,
    secondaryText,
    borderRadius,
  });

  const colorInputs = [
    {
      id: 'mainBackground',
      label: 'Main Background',
      value: config.mainBackground,
    },
    {
      id: 'secondaryBackground',
      label: 'Secondary Background',
      value: config.secondaryBackground,
    },
    { id: 'mainText', label: 'Main Text', value: config.mainText },
    {
      id: 'secondaryText',
      label: 'Secondary Text',
      value: config.secondaryText,
    },
  ];

  // Handle color change
  const handleColorChange = (id: string, value: string) => {
    setConfig(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle theme selection
  const handleThemeSelect = (theme: (typeof themePresets)[0]) => {
    setConfig({
      mainBackground: theme.mainBackground,
      secondaryBackground: theme.secondaryBackground,
      mainText: theme.mainText,
      secondaryText: theme.secondaryText,
      borderRadius: theme.borderRadius,
    });
  };

  // Handle border radius change
  const handleRadiusChange = (value: number[]) => {
    setConfig(prev => ({
      ...prev,
      borderRadius: value[0],
    }));
  };

  const { mutate: updateDesignConfig, isPending } = useServerActionMutation(
    updateDesignConfigAction,
    {
      mutationKey: ['update-design-config'],
      onSuccess: () => toast.success('Design saved successully'),
      onError: err => toast.error(err.message),
    }
  );

  return (
    <div className='w-full grid md:grid-cols-2 gap-8 mt-5'>
      <div className='space-y-4'>
        <div>
          <h2 className='text-sm font-medium mb-1'>Themes</h2>
          <ul className='w-full grid grid-cols-2 md:grid-cols-4 gap-2.5'>
            {themePresets.map((theme, index) => (
              <li
                key={index}
                onClick={() => handleThemeSelect(theme)}
                className='h-32 p-3 border border-border rounded-lg flex flex-col justify-between cursor-pointer hover:border-primary transition-colors'
                style={{
                  backgroundColor: theme.mainBackground,
                  color: theme.mainText,
                }}
              >
                <span
                  className='text-xs font-medium'
                  style={{ color: theme.mainText }}
                >
                  {theme.name}
                </span>
                <div
                  className='w-full h-14 rounded-md flex items-center justify-center'
                  style={{
                    backgroundColor: theme.secondaryBackground,
                    borderRadius: `${theme.borderRadius / 2}px`,
                  }}
                >
                  <span style={{ color: theme.secondaryText }}>Aa</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className='text-sm font-medium mb-1'>Customize theme</h2>
          <ul className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {colorInputs.map(color => (
              <li
                key={color.id}
                className='flex items-center justify-between p-3 bg-muted/25 border border-border rounded-lg'
              >
                <label htmlFor={color.id} className='text-sm'>
                  {color.label}
                </label>
                <input
                  disabled={isPending}
                  type='color'
                  id={color.id}
                  className='h-8 w-8 rounded-md cursor-pointer border-0 bg-transparent p-0 overflow-hidden color-input'
                  value={color.value}
                  onChange={e => handleColorChange(color.id, e.target.value)}
                />
              </li>
            ))}
          </ul>
          <div className='mt-6 p-3 bg-muted/25 border border-border rounded-lg'>
            <div className='flex items-center justify-between mb-4'>
              <label htmlFor='borderRadius' className='text-sm'>
                Border Radius
              </label>
              <span className='text-sm text-gray-500'>
                {config.borderRadius}px
              </span>
            </div>

            <Slider
              defaultValue={[config.borderRadius]}
              max={36}
              step={1}
              value={[config.borderRadius]}
              onValueChange={handleRadiusChange}
              className='w-full'
              disabled={isPending}
            />
          </div>

          <div className='flex items-center justify-end gap-2 mt-5'>
            <Button
              size='sm'
              variant='outline'
              onClick={() => setConfig({ ...designConfig })}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              size='sm'
              onClick={() =>
                updateDesignConfig({
                  designConfigId: designConfig.id,
                  startupId,
                  ...config,
                })
              }
              disabled={isPending}
            >
              {isPending && <Loader2 className='size-4 animate-spin' />}
              Save changes
            </Button>
          </div>
        </div>
      </div>

      <div>
        <h2 className='text-sm font-medium mb-1'>Preview</h2>

        <div
          className='w-full p-4 border shadow-sm'
          style={{
            backgroundColor: config.mainBackground,
            color: config.mainText,
            borderRadius: `${config.borderRadius}px`,
          }}
        >
          <div className='relative mb-9'>
            {startupData.coverImage ? (
              <div
                className='w-full h-32 rounded-lg'
                style={{ borderRadius: `${config.borderRadius / 1.5}px` }}
              >
                <Image src={startupData.coverImage} alt='cover image' fill />
              </div>
            ) : (
              <div
                className='w-full h-32 bg-gradient-to-r from-purple-500 to-pink-300'
                style={{ borderRadius: `${config.borderRadius / 1.5}px` }}
              />
            )}
            <Avatar
              className='size-16 absolute -bottom-6 left-6 rounded-none overflow-hidden'
              style={{ borderRadius: `${config.borderRadius}px` }}
            >
              <AvatarImage src={startupData.image ?? undefined} />
              <AvatarFallback className='rounded-none text-primary'>
                {startupData.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>

          <h2 className='flex items-center gap-1.5 font-medium text-xl'>
            {startupData.name}
          </h2>

          <div className='px-3 mt-6' style={{ color: config.secondaryText }}>
            <StartupMetadata {...startupData} />
          </div>

          <Separator className='my-5' />

          <div className='px-3'>
            <h3 className='text-xs font-medium text-muted-foreground'>
              Our mission
            </h3>
            <p className='text-sm'>{startupData.mission}</p>
          </div>

          <div className='px-3 mt-6'>
            <StartupSkills skills={startupData.skills} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignForm;
