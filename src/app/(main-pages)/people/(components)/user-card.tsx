import { ChevronRight } from 'lucide-react';
import { User } from '@prisma/client';

import UserSheet from './user-sheet';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { UserHeader, UserMetadata, UserSkills } from './user-reusable';

export type UserCardProps = {
  data: User;
};

const UserCard = ({ data }: UserCardProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <li className='border border-border rounded-lg p-5 space-y-5 shadow cursor-pointer hover:bg-muted/35 transition-colors'>
          <UserHeader data={data} withImg />
          <div className='px-0.5'>
            <UserMetadata {...data} />
          </div>
          <div className='px-0.5'>
            <UserSkills skills={data.skills} />
          </div>
          <div className='flex items-center justify-end gap-3'>
            {data.looking && (
              <p className='text-xs text-muted-foreground'>
                Looking for startup
              </p>
            )}
            <Button size='sm' className='group'>
              View profile
              <ChevronRight className='size-4 group-hover:translate-x-0.5 transition-transform' />
            </Button>
          </div>
        </li>
      </SheetTrigger>
      <UserSheet data={data} />
    </Sheet>
  );
};

export default UserCard;
