import { Button } from '../ui/button';
import { GoogleLogo } from './google-logo';
import { signInAction } from '@/actions/auth/sign-in';

const GoogleButton = () => {
  return (
    <form
      action={async () => {
        await signInAction('google');
      }}
    >
      <Button
        className='flex-1 w-full max-w-md'
        variant='outline'
        type='submit'
      >
        <GoogleLogo className='mr-2 size-4' /> Google
      </Button>
    </form>
  );
};

export default GoogleButton;
