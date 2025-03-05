'use client';

import { type ReactElement, useState } from 'react';

import GoogleButton from './google-button';
import GithubButton from './github-button';
import GitlabButton from './gitlab-button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type AuthDialogProps = {
  trigger?: ReactElement;
};

const AuthDialog = ({ trigger }: AuthDialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <div className='space-y-1 flex flex-col items-center mb-4'>
          <DialogTitle className='text-2xl'>Welcome to StartupLink</DialogTitle>
          <DialogDescription>
            To use StartupLink you must log into an account or create one.
          </DialogDescription>
        </div>

        <div className='flex flex-col gap-2 px-10'>
          <GoogleButton />
          <GithubButton />
          <GitlabButton />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
