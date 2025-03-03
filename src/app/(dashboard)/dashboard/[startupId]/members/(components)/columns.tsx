'use client';

import { ColumnDef } from '@tanstack/react-table';
import { AtSign, CalendarDays, Tag, User } from 'lucide-react';

import MemberActions from './member-actions';
import CustomTableHeader from '@/components/ui/custom-table-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/helpers/format-date';

export type Member = {
  id: string;
  user: {
    name: string | null;
    email: string;
    image: string | null;
  };
  role: {
    name: string;
  };
  startupId: string;
  createdAt: Date;
};

export const columns: ColumnDef<Member>[] = [
  // Member name + image
  {
    accessorKey: 'user.name',
    header: ({ column }) => {
      return (
        <CustomTableHeader
          icon={<User className='size-3 mr-1.5' />}
          label='Full name'
          column={column}
        />
      );
    },
    cell: ({ row }) => {
      const values = row.original;
      const name = values.user.name;
      const image = values.user.image;

      return (
        <div className='flex items-center gap-1.5 px-1.5'>
          <Avatar className='size-7 shrink-0'>
            <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
            <AvatarImage src={image ? image : undefined} alt='Profile photo' />
          </Avatar>
          <p className='px-2'>{name}</p>
        </div>
      );
    },
  },
  // Member email
  {
    id: 'email',
    accessorKey: 'user.email',
    header: ({ column }) => {
      return (
        <CustomTableHeader
          icon={<AtSign className='size-3 mr-1.5' />}
          label='Email address'
          column={column}
        />
      );
    },
  },
  // Member role
  {
    accessorKey: 'role.name',
    header: ({ column }) => {
      return (
        <CustomTableHeader
          icon={<Tag className='size-3 mr-1.5' />}
          label='Role'
          column={column}
        />
      );
    },
    cell: ({ row }) => {
      const role = row.original.role.name;

      return (
        <div>
          <Badge className='bg-purple-200/60 text-purple-500 hover:bg-purple-200/80'>
            {role}
          </Badge>
        </div>
      );
    },
  },
  // Member joined day
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <CustomTableHeader
          icon={<CalendarDays className='size-3 mr-1.5' />}
          label='Joined Date'
          column={column}
        />
      );
    },
    cell: ({ row }) => {
      const date = row.original.createdAt;
      return <p>{formatDate(date)}</p>;
    },
  },
  // Member actions
  {
    id: 'actions',
    enableResizing: false,
    enableHiding: false,
    size: 10,
    cell: ({ row }) => {
      const data = row.original;
      return <MemberActions startupId={data.startupId} memberId={data.id} />;
    },
  },
];
