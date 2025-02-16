import { Button } from '../ui/button';
import { GitLabLogo } from './gitlab-logo';
import { signInAction } from '@/actions/auth/sign-in';

const GitlabButton = () => {
  return (
    <form
      action={async () => {
        await signInAction('gitlab');
      }}
    >
      <Button
        className='flex-1 w-full max-w-md'
        variant='outline'
        type='submit'
      >
        <GitLabLogo className='mr-2 size-4' /> Gitlab
      </Button>
    </form>
  );
};

export default GitlabButton;
