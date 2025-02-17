import SearcStartupshHeader from './(components)/search-header';
import StartupDropdownActions from './(components)/startup-dropdown-actions';
import StartupsPlaceholder from '../startups/(components)/startups-placeholder';
import { getAllUserStartups } from '@/access-data/startup/get-all-user-startups';
import { StartupHeader } from '../startups/(components)/startup-reusable';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { formatRelativeDate } from '@/lib/helpers/format-relative-date';
import { STAGE_LABELS } from '@/lib/labels';

const MyStartupsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    search: string;
    sortBy: 'name' | 'creation';
  }>;
}) => {
  const { search, sortBy } = await searchParams;
  const startups = await getAllUserStartups({
    searchTerm: search,
    sortBy,
    page: 1,
    pageSize: 10,
  });

  return (
    <section className='p-1 py-8 space-y-5'>
      <SearcStartupshHeader />
      <ul className='grid lg:grid-cols-2 xl:grid-cols-3 gap-2.5'>
        {startups.length > 0 ? (
          startups.map(({ startup, role }) => (
            <li
              key={startup.id}
              className='w-full border border-border rounded-lg p-3 hover:bg-muted/35 transition-colors relative'
            >
              <div className='flex items-start justify-between'>
                <StartupHeader data={startup} />
                <StartupDropdownActions
                  startupId={startup.id}
                  startupName={startup.name}
                  isAdmin={role.admin}
                />
              </div>
              <Separator className='my-4 pointer-events-none' />
              <div className='flex items-center justify-between pointer-events-none'>
                <div className='flex items-center gap-2'>
                  <Badge variant='secondary'>{role.name}</Badge>
                  <Badge variant='secondary'>
                    {STAGE_LABELS[startup.stage]}
                  </Badge>
                </div>
                <p className='text-xs text-muted-foreground'>
                  {startup.createdAt
                    ? formatRelativeDate(new Date(startup.createdAt))
                    : 'Unknown'}
                </p>
              </div>
            </li>
          ))
        ) : (
          <StartupsPlaceholder type='startup' redirect='/startups/new' />
        )}
      </ul>
    </section>
  );
};

export default MyStartupsPage;
