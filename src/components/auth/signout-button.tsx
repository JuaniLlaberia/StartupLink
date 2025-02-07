import type { ReactNode } from 'react';

import { Button } from '../ui/button';
import { signOut } from '@/auth';

type SignOutButtonProps = {
  children?: ReactNode;
};

const SignOutButton = ({ children }: SignOutButtonProps) => {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <Button className='flex-1 w-full max-w-md' type='submit'>
        {children || 'Sign Out'}
      </Button>
    </form>
  );
};

export default SignOutButton;
