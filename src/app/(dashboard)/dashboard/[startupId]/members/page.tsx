import Pagination from '@/components/custom/pagination';
import { getMembers } from '@/access-data/member/get-members';
import { INITIAL_PAGE_SIZE } from '@/lib/consts';
import { DataTable } from './(components)/data-table';
import { columns } from './(components)/columns';

const MembersPage = async ({
  params,
}: {
  params: Promise<{ startupId: string; page: number }>;
}) => {
  const { startupId, page } = await params;
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
