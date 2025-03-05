import Pagination from '@/components/custom/pagination';
import { getMembers } from '@/access-data/member/get-members';
import { INITIAL_PAGE_SIZE } from '@/lib/consts';
import { columns } from './(components)/columns';
import { DataTable } from '@/components/custom/data-table';

const MembersPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ startupId: string }>;
  searchParams: Promise<{ page: number }>;
}) => {
  const { startupId } = await params;
  const { page } = await searchParams;

  const members = await getMembers({
    startupId,
    page: page || 1,
    pageSize: INITIAL_PAGE_SIZE,
  });

  return (
    <section>
      <header className='space-y-1 mb-2'>
        <h1 className='text-lg font-medium'>Members</h1>
      </header>
      <DataTable data={members} columns={columns} />
      <Pagination totalPages={Math.ceil(members.length / INITIAL_PAGE_SIZE)} />
    </section>
  );
};

export default MembersPage;
