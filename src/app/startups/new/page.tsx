import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import StartupForm from './(components)/startup-form';

const NewStartupPage = async () => {
  const session = await auth();
  if (!session) redirect('/');

  return (
    <section className='p-1 py-8'>
      <div className='min-h-[75dvh] flex items-center justify-center'>
        <StartupForm />
      </div>
    </section>
  );
};

export default NewStartupPage;
