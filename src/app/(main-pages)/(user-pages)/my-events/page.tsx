import UserEventsList from './(components)/user-events-list';
import { getUserEvents } from '@/access-data/event/get-user-events';

const MyEventsPage = async () => {
  const events = await getUserEvents();

  return (
    <section className='px-2 md:px-16 py-8 space-y-2.5'>
      <header className='space-y-2.5'>
        <h1 className='font-medium'>Your events</h1>
      </header>
      <UserEventsList events={events} />
    </section>
  );
};

export default MyEventsPage;
