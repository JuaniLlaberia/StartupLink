import { LogOut, Trash2 } from 'lucide-react';

import DeleteStartupDialog from '@/app/(main-pages)/my-startups/(components)/delete-startup-dialog';
import LeaveStartupDialog from '@/app/(main-pages)/my-startups/(components)/leave-startup-dialog';
import SettingsCard from '@/app/(main-pages)/profile/(components)/settings-card';
import { Button } from '@/components/ui/button';

type StartupSettingsProps = {
  startupId: string;
};

const StartupSettings = ({ startupId }: StartupSettingsProps) => {
  return (
    <ul>
      <SettingsCard
        title='Leave startup'
        description='You will no longer be a member of this startup'
      >
        <LeaveStartupDialog
          startupId={startupId}
          trigger={
            <Button variant='destructive' size='sm'>
              <LogOut /> Leave startup
            </Button>
          }
        />
      </SettingsCard>
      <SettingsCard
        title='Delete startup'
        description='The startup will be permanently deleted, including all of its information. This action is irreversible and can not be undone'
      >
        <DeleteStartupDialog
          startupId={startupId}
          trigger={
            <Button variant='destructive' size='sm'>
              <Trash2 /> Delete startup
            </Button>
          }
        />
      </SettingsCard>
    </ul>
  );
};

export default StartupSettings;
