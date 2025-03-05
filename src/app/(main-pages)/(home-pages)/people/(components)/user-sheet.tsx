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
    <SheetContent className='p-2 w-11/12'>
      <DialogTitle />
      <div className='relative mb-9'>
        {data.coverImage ? (
          <div className='w-full h-32 rounded-lg overflow-hidden'>
            <Image
              src={data.coverImage}
              alt='cover image'
              fill
              className='rounded-lg object-cover'
              placeholder='blur'
              blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR0XFyAeIB4gHh4gIB4dHR0eHh0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAP/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
              loading='lazy'
            />
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
        <div className='px-3 space-y-1.5'>
          <h3 className='text-xs font-medium text-muted-foreground'>
            Description
          </h3>
          <p className='text-sm'>{data.description || 'Not specified'}</p>
        </div>
        <div className='px-3 mt-6'>
          <UserSkills skills={data.skills} />
        </div>
      </ScrollArea>
    </SheetContent>
  );
};
export default UserSheet;
