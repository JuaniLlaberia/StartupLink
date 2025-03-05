'use client';

import { MoreHorizontal, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DeleteMemberDialog from './delete-member-dialog';

type MemberActionsProps = {
  memberId: string;
  startupId: string;
};

const MemberActions = ({ startupId, memberId }: MemberActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='size-6 p-0 hover:bg-muted'>
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal
            className='size-4 text-muted-foreground'
            strokeWidth={1.5}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <DeleteMemberDialog
          startupId={startupId}
          memberId={memberId}
          trigger={
            <DropdownMenuItem onSelect={e => e.preventDefault()}>
              <Trash2 className='size-3.5 mr-2' strokeWidth={1.5} />
              Remove member
            </DropdownMenuItem>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MemberActions;
