'use client';

import React from 'react';
import { ChevronRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

import { Button, buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';
import { useServerActionMutation } from '@/hooks/use-server-action';
import { createApplication as createApplicationAction } from '@/actions/applications/create-application';

type RoleAppBtnProps = {
  startupId: string;
  roleId: string;
  requiresSurvey?: boolean;
  surveyId?: string;
  size?: 'sm' | 'default' | 'lg';
};

const RoleApplicationBtn = ({
  startupId,
  roleId,
  requiresSurvey,
  surveyId,
  size = 'sm',
}: RoleAppBtnProps) => {
  const { mutate: createApplication, isPending } = useServerActionMutation(
    createApplicationAction,
    {
      mutationKey: ['create-application'],
      onSuccess: () => toast.success('You have applied successfully'),
      onError: () => toast.error('Failed to apply'),
    }
  );

  if (requiresSurvey)
    return (
      <Link
        href={`/survey/${surveyId}?roleId=${roleId}`}
        className={cn(buttonVariants({ size }), 'group')}
      >
        Apply to join
        <ChevronRight className='size-4 group-hover:translate-x-1 transition-transform' />
      </Link>
    );

  return (
    <Button
      size={size}
      className='group'
      onClick={() => {
        createApplication({ startupId, roleId });
      }}
      disabled={isPending}
    >
      {isPending && <Loader2 className='size-4 animate-spin' />}
      Apply to join
      {!isPending && (
        <ChevronRight className='size-4 group-hover:translate-x-1 transition-transform' />
      )}
    </Button>
  );
};

export default RoleApplicationBtn;
