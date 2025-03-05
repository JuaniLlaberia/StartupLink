import { getRoles } from '@/access-data/role/get-roles';
import RolesList from './(components)/roles-list';
import { getStartupSurveys } from '@/access-data/survey/get-startup-surveys';

const RolesPage = async ({
  params,
}: {
  params: Promise<{ startupId: string }>;
}) => {
  const { startupId } = await params;
  const [roles, surveys] = await Promise.all([
    getRoles({ startupId }),
    getStartupSurveys({ startupId }),
  ]);

  return (
    <section>
      <header className='space-y-1 mb-2'>
        <h1 className='text-lg font-medium'>Roles</h1>
        <p className='text-sm text-muted-foreground'>
          Add yours to your startup. Users will be able to apply to join with
          one of the created roles.
        </p>
      </header>
      <RolesList startupId={startupId} roles={roles} surveys={surveys} />
    </section>
  );
};

export default RolesPage;
