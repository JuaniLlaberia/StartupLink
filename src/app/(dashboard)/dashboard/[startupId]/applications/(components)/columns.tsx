'use client';

import { ColumnDef } from '@tanstack/react-table';
import { AtSign, CalendarDays, Tag, User } from 'lucide-react';
import { JsonValue } from '@prisma/client/runtime/library';

import ApplicationActions from './application-actions';
import CustomTableHeader from '@/components/ui/custom-table-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/helpers/format-date';

export type Applicant = {
  id: string;
  startupId: string;
  surveyResponse: JsonValue;
  createdAt: Date;
  user: {
    name: string | null;
    email: string;
    image: string | null;
    position: string | null;
  };
  role: {
    name: string;
  };
};

export const columns: ColumnDef<Applicant>[] = [
  // Applicant name + image
  {
    accessorKey: 'user.name',
    header: ({ column }) => {
      return (
        <CustomTableHeader
          icon={<User className='size-3 mr-1.5' />}
          label='Applicant name'
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
  // Applicant email
  {
    id: 'email',
    accessorKey: 'user.email',
    header: ({ column }) => {
      return (
        <CustomTableHeader
          icon={<AtSign className='size-3 mr-1.5' />}
          label='Applicant email'
          column={column}
        />
      );
    },
  },
  // Applicant position
  {
    accessorKey: 'role.position',
    header: ({ column }) => {
      return (
        <CustomTableHeader
          icon={<Tag className='size-3 mr-1.5' />}
          label='Applicant position'
          column={column}
        />
      );
    },
  },
  // Application role
  {
    accessorKey: 'role.name',
    header: ({ column }) => {
      return (
        <CustomTableHeader
          icon={<Tag className='size-3 mr-1.5' />}
          label='Applying to'
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
  // Applied date
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
      return (
        <ApplicationActions
          startupId={data.startupId}
          applicationId={data.id}
          applicantName={data.user.name}
          applicationRole={data.role.name}
          surveyResponses={data.surveyResponse}
        />
      );
    },
  },
];
