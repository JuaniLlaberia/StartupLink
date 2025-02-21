import Image from 'next/image';
import { User } from '@prisma/client';

import { Separator } from '@/components/ui/separator';
import { SheetContent } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DialogTitle } from '@/components/ui/dialog';
import { UserHeader, UserMetadata, UserSkills } from './user-reusable';

type UserSheetProps = { data: User };

const UserSheet = ({ data }: UserSheetProps) => {
  return (
    <SheetContent className='p-2'>
      <DialogTitle />
      <div className='relative mb-9'>
        {data.coverImage ? (
          <div className='w-full h-32 rounded-lg'>
            <Image src={data.coverImage} alt='cover image' fill />
          </div>
        ) : (
          <div className='w-full h-32 rounded-lg bg-gradient-to-r from-purple-500 to-pink-300' />
        )}
        <Avatar className='size-16 absolute -bottom-6 left-6'>
          <AvatarImage src={data.image ?? undefined} />
          <AvatarFallback>{data.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>

      <div className='px-3'>
        <UserHeader data={data} withImg={false} />
      </div>

      <div className='px-3 mt-6'>
        <UserMetadata {...data} />
      </div>

      <Separator className='my-5' />

      <ScrollArea className='w-full h-[350px] pb-2'>
        <div className='px-3'>
          <h3 className='text-xs font-medium text-muted-foreground'>
            Description
          </h3>
          <p className='text-sm'>{data.description}</p>
        </div>
        <div className='px-3 mt-6'>
          <UserSkills skills={data.skills} />
        </div>
      </ScrollArea>
    </SheetContent>
  );
};
export default UserSheet;
