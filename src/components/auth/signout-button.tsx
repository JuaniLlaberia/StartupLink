import type { ReactNode } from 'react';

import { Button } from '../ui/button';
import { signOutAction } from '@/actions/auth/sign-out';

type SignOutButtonProps = {
  trigger?: ReactNode;
};

const SignOutButton = ({ trigger }: SignOutButtonProps) => {
  return (
    <form
      action={async () => {
        'use server';
        await signOutAction();
      }}
    >
      {trigger ? (
        <button className='w-full' type='submit'>
          {trigger}
        </button>
      ) : (
        <Button asChild type='submit'>
          Sign Out
        </Button>
      )}
    </form>
  );
};

export default SignOutButton;
