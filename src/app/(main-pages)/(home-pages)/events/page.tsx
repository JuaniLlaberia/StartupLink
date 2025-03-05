import Pagination from '@/components/custom/pagination';
import Placeholder from '@/components/custom/placeholder';
import { getPublicEvents } from '@/access-data/event/get-public-events';
import { INITIAL_PAGE_SIZE } from '@/lib/consts';
import EventCard from './(components)/event-card';

const EventsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    search: string;

    page: number;
  }>;
}) => {
  const { search: searchTerm, page } = await searchParams;
  const events = await getPublicEvents({
    searchTerm,
    page: page || 1,
    pageSize: INITIAL_PAGE_SIZE,
  });

  return (
    <section className='grid gap-8 p-1 py-8'>
      <div className='min-h-[75dvh]'>
        <h1 className='text-sm font-semibold mb-3'>Events</h1>
        <ul className='space-y-3'>
          {events.length > 0 ? (
            events.map(event => <EventCard key={event.id} data={event} />)
          ) : (
            <Placeholder type='event' redirect='my-startups' />
          )}
        </ul>
        <Pagination totalPages={Math.ceil(events.length / INITIAL_PAGE_SIZE)} />
      </div>
    </section>
  );
};

export default EventsPage;
