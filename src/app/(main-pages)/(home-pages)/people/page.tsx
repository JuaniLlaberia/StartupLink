import { Objective, WeeklyAvailability } from '@prisma/client';

import FiltersForm from '@/components/custom/filters-form';
import Placeholder from '@/components/custom/placeholder';
import UserCard from './(components)/user-card';
import { getUsers } from '@/access-data/user/get-users';
import { USERS_WEEKLY_AVAILABILITY_LABELS } from '@/lib/labels';
import Pagination from '@/components/custom/pagination';
import { INITIAL_PAGE_SIZE } from '@/lib/consts';

const PEOPLE_FILTERS = [
  {
    key: 'objective',
    label: 'Objective',
    placeholder: 'Filter by objective',
    values: Objective
      ? Object.values(Objective).map(objective => ({
          label: objective
            .replace(/_/g, ' ')
            .toLowerCase()
            .replace(/\b\w/g, char => char.toUpperCase()),
          value: objective,
        }))
      : [],
  },
  {
    key: 'weeklyAvailability',
    label: 'Weekly availability',
    placeholder: 'Filter by availability',
    values: WeeklyAvailability
      ? Object.values(WeeklyAvailability).map(availability => ({
          label: USERS_WEEKLY_AVAILABILITY_LABELS[availability],
          value: availability,
        }))
      : [],
  },
  {
    key: 'looking',
    label: 'Looking to join',
    placeholder: 'Filter by looking status',
    values: [
      { label: 'Looking', value: 'true' },
      { label: 'Not looking', value: 'false' },
    ],
  },
];

const PeoplePage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    search: string;
    objective: Objective;
    weeklyAvailability: WeeklyAvailability;
    looking: string;
    page: number;
  }>;
}) => {
  const {
    search: searchTerm,
    objective,
    weeklyAvailability,
    looking,
    page,
  } = await searchParams;

  const users = await getUsers({
    searchTerm,
    objective,
    weeklyAvailability,
    looking,
    page: page || 1,
    pageSize: INITIAL_PAGE_SIZE,
  });

  return (
    <section className='grid md:grid-cols-[300px_1fr] gap-3 md:gap-8 p-1 py-8'>
      <FiltersForm filters={PEOPLE_FILTERS} />
      <div className='min-h-[75dvh]'>
        <h1 className='text-sm font-semibold mb-3'>People</h1>
        <ul className='space-y-3'>
          {users.length > 0 ? (
            users.map(user => <UserCard key={user.id} data={user} />)
          ) : (
            <Placeholder type='people' />
          )}
        </ul>
        <Pagination totalPages={Math.ceil(users.length / INITIAL_PAGE_SIZE)} />
      </div>
    </section>
  );
};

export default PeoplePage;
