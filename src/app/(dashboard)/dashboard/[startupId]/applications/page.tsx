import Pagination from '@/components/custom/pagination';
import { getApplications } from '@/access-data/application/get-startup-applications';
import { DataTable } from '@/components/custom/data-table';
import { columns } from './(components)/columns';
import { INITIAL_PAGE_SIZE } from '@/lib/consts';

const ApplicationsPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ startupId: string }>;
  searchParams: Promise<{ page: number }>;
}) => {
  const { startupId } = await params;
  const { page } = await searchParams;

  const applications = await getApplications({
    startupId,
    page: page || 1,
    pageSize: INITIAL_PAGE_SIZE,
  });

  return (
    <section>
      <header className='space-y-1 mb-2'>
        <h1 className='text-lg font-medium'>Applications</h1>
      </header>
      <DataTable columns={columns} data={applications} />
      <Pagination
        totalPages={Math.ceil(applications.length / INITIAL_PAGE_SIZE)}
      />
    </section>
  );
};

export default ApplicationsPage;
