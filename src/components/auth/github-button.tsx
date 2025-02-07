import { signIn } from '@/auth';
import { Button } from '../ui/button';
import { GitHubLogo } from './github-logo';

const GithubButton = () => {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('github');
      }}
    >
      <Button
        className='flex-1 w-full max-w-md'
        variant='outline'
        type='submit'
      >
        <GitHubLogo className='mr-2 size-4' /> GitHub
      </Button>
    </form>
  );
};

export default GithubButton;
