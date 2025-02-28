import { StartupRole } from '@prisma/client';
import { Edit, Plus, Tag, Trash2 } from 'lucide-react';

import DeleteRoleDialog from './delete-role-dialog';
import RoleForm from './role-form';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const RolesList = ({
  startupId,
  roles,
}: {
  startupId: string;
  roles: StartupRole[];
}) => {
  return (
    <>
      {roles.length > 0 ? (
        <>
          <ul className='mt-4 space-y-2'>
            {roles.map(role => (
              <li
                key={role.id}
                className='w-full max-w-2xl flex items-center border border-border rounded-lg p-4'
              >
                <div className='w-full'>
                  <h3 className='text-sm font-medium'>{role.name}</h3>
                  <p className='text-sm text-muted-foreground'>
                    {role.description}
                  </p>
                  <div className='flex mt-3 space-x-2.5'>
                    {role.active ? (
                      <Badge className='flex items-center gap-1.5 w-auto text-green-500 bg-green-200/60 hover:bg-green-200/80'>
                        <div className='size-[6px] shrink-0 rounded-full animate-pulse bg-green-500' />
                        Active
                      </Badge>
                    ) : (
                      <Badge className='flex items-center gap-1.5 w-auto text-red-500 bg-red-200/60 hover:bg-red-200/80'>
                        <div className='size-[0.4rem] shrink-0 rounded-full bg-red-500' />
                        Inactive
                      </Badge>
                    )}
                    {role.admin && (
                      <Badge className='bg-orange-200/60 text-orange-500 hover:bg-orange-200/80'>
                        Admin
                      </Badge>
                    )}
                  </div>
                </div>
                <div className='flex items-center gap-1.5'>
                  <RoleForm
                    startupId={startupId}
                    data={role}
                    trigger={
                      <Button size='sm' variant='outline'>
                        <Edit className='size-3 text-muted-foreground' />
                        Edit role
                      </Button>
                    }
                  />
                  <DeleteRoleDialog
                    roleId={role.id}
                    startupId={role.startupId}
                    roleName={role.name}
                    trigger={
                      <Button size='icon' variant='outline' className='size-7'>
                        <Trash2 className='text-red-500' />
                      </Button>
                    }
                  />
                </div>
              </li>
            ))}
          </ul>
          <RoleForm
            startupId={startupId}
            trigger={
              <Button size='sm' className='mt-4'>
                <Plus /> Add new role
              </Button>
            }
          />
        </>
      ) : (
        <div className='flex flex-col col-span-full gap-2 justify-center items-center py-10 lg:py-20 px-2'>
          <div className='border border-border rounded-xl p-3'>
            <Tag className='size-6' />
          </div>
          <h6 className='font-semibold'>No surveys found</h6>
          <p className='text-muted-foreground text-center max-w-[400px]'>
            You can start by creating one and assign it to a role.
          </p>
          <RoleForm
            startupId={startupId}
            trigger={
              <Button size='sm' className='mt-4'>
                <Plus /> Add new role
              </Button>
            }
          />
        </div>
      )}
    </>
  );
};

export default RolesList;
