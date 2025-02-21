import { Industry, Stage, TeamSize } from '@prisma/client';

import FiltersForm from '@/components/custom/filters-form';
import Pagination from '@/components/custom/pagination';
import Placeholder from '../../components/custom/placeholder';
import StartupCard from './(components)/startup-card';
import { searchStartups } from '@/access-data/startup/get-startups';
import { TEAM_SIZE_LABELS } from '@/lib/labels';
import { INITIAL_PAGE_SIZE } from '@/lib/consts';

const STARTUP_FILTERS = [
  {
    key: 'industry',
    label: 'Industry',
    placeholder: 'Filter by industry',
    values: Industry
      ? Object.values(Industry).map(industry => ({
          label: industry
            .replace(/_/g, ' ')
            .toLowerCase()
            .replace(/\b\w/g, char => char.toUpperCase()),
          value: industry,
        }))
      : [],
  },
  {
    key: 'stage',
    label: 'Stage',
    placeholder: 'Filter by stage',
    values: Stage
      ? Object.values(Stage).map(stage => ({
          label: stage
            .replace(/_/g, ' ')
            .toLowerCase()
            .replace(/\b\w/g, char => char.toUpperCase()),
          value: stage,
        }))
      : [],
  },
  {
    key: 'team-size',
    label: 'Team size',
    placeholder: 'Filter by team size',
    values: TeamSize
      ? Object.values(TeamSize).map(teamSize => ({
          label: TEAM_SIZE_LABELS[teamSize],
          value: teamSize,
        }))
      : [],
  },
  {
    key: 'verified',
    label: 'Verified',
    placeholder: 'Filter by verification status',
    values: [
      { label: 'Verified', value: 'true' },
      { label: 'Not verified', value: 'false' },
    ],
  },
];

const StartupsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    search: string;
    industry: Industry;
    stage: Stage;
    teamSize: TeamSize;
    verified: string;
    page: number;
  }>;
}) => {
  const {
    search: searchTerm,
    industry,
    stage,
    teamSize,
    verified,
    page,
  } = await searchParams;

  const startups = await searchStartups({
    searchTerm,
    industry,
    stage,
    teamSize,
    verified,
    page: page || 1,
    pageSize: INITIAL_PAGE_SIZE,
  });

  return (
    <section className='grid md:grid-cols-[300px_1fr] gap-8 p-1 py-8'>
      <aside className='hidden md:block'>
        <FiltersForm filters={STARTUP_FILTERS} />
      </aside>
      <div className='min-h-[75dvh]'>
        <h1 className='text-sm font-semibold mb-3'>Startups</h1>
        <ul className='space-y-3'>
          {startups.length > 0 ? (
            startups.map(startup => (
              <StartupCard key={startup.id} data={startup} />
            ))
          ) : (
            <Placeholder type='startup' redirect='/startups/new' />
          )}
        </ul>
        <Pagination
          totalPages={Math.ceil(startups.length / INITIAL_PAGE_SIZE)}
        />
      </div>
    </section>
  );
};

export default StartupsPage;
