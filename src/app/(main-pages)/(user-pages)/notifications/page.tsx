import { redirect } from 'next/navigation';

import { getUserNotifications } from '@/access-data/notification/get-user-notifications';
import { auth } from '@/auth';

const NotificationsPage = async () => {
  const session = await auth();
  if (!session) redirect('/');

  const notifications = await getUserNotifications({ page: 1, pageSize: 10 });

  return (
    <section className='px-2 md:px-16 py-8 space-y-2.5'>
      <header className='space-y-2.5'>
        <h1 className='font-medium'>Your notifications</h1>
      </header>
    </section>
  );
};

export default NotificationsPage;
