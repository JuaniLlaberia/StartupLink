'use client';

import Link from 'next/link';
import { Edit, Ellipsis, Expand, LogOut, Trash2 } from 'lucide-react';
import { useState } from 'react';

import DeleteStartupDialog from './delete-startup-dialog';
import LeaveStartupDialog from './leave-startup-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type StartupDropdownActionsProps = {
  startupId: string;
  startupName: string;
};

const StartupDropdownActions = ({
  startupId,
  startupName,
}: StartupDropdownActionsProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button size='icon-sm' variant='ghost'>
          <Ellipsis className='size-4 text-muted-foreground' />
          <span className='sr-only'>Actions menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {/* Link to dashboard => ALL */}
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/${startupId}/information`}>
            <Expand className='size-4' /> Go to dashboard
          </Link>
        </DropdownMenuItem>

        {/* Link to edit page  */}
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/${startupId}/information`}>
            <Edit className='size-4' /> Modify startup
          </Link>
        </DropdownMenuItem>

        {/* Leave startup modal => ALL */}
        <DropdownMenuSeparator />
        <LeaveStartupDialog
          startupId={startupId}
          startupName={startupName}
          onSuccess={() => setIsDropdownOpen(false)}
          trigger={
            <DropdownMenuItem onSelect={e => e.preventDefault()}>
              <LogOut className='size-4' />
              <span>Leave startup</span>
            </DropdownMenuItem>
          }
        />

        {/* Delete startup modal  */}
        <>
          <DropdownMenuSeparator />
          <DeleteStartupDialog
            startupId={startupId}
            startupName={startupName}
            onSuccess={() => setIsDropdownOpen(false)}
            trigger={
              <DropdownMenuItem onSelect={e => e.preventDefault()}>
                <Trash2 className='size-4' />
                <span>Delete startup</span>
              </DropdownMenuItem>
            }
          />
        </>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StartupDropdownActions;
