import { getStartupEvents } from '@/access-data/event/get-startup-events';
import EventsList from './(components)/events-list';

const EventsPage = async ({
  params,
}: {
  params: Promise<{ startupId: string }>;
}) => {
  const { startupId } = await params;
  const events = await getStartupEvents({ startupId });

  return (
    <section>
      <header className='space-y-1 mb-2'>
        <h1 className='text-lg font-medium'>Events</h1>
      </header>
      <EventsList startupId={startupId} events={events} />
    </section>
  );
};

export default EventsPage;
