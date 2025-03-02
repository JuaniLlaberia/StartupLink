import Image from 'next/image';

import UpvoteButton from './upvote-button';
import { Separator } from '@/components/ui/separator';
import { SheetContent } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  StartupHeader,
  StartupMetadata,
  StartupSkills,
  StartupData,
} from './startup-reusable';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DialogTitle } from '@/components/ui/dialog';

type StartupSheetProps = { data: StartupData };

const StartupSheet = ({ data }: StartupSheetProps) => {
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
          <AvatarFallback>{data.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <UpvoteButton
          className='absolute top-2 right-2'
          startupId={data.id}
          hasUserUpvoted={data.hasUserUpvoted}
        />
      </div>

      <div className='px-3'>
        <StartupHeader data={data} withImg={false} />
      </div>

      <div className='px-3 mt-6'>
        <StartupMetadata {...data} />
      </div>

      <Separator className='my-5' />

      <ScrollArea className='w-full h-[350px] pb-2'>
        <div className='px-3'>
          <h3 className='text-xs font-medium text-muted-foreground'>
            Our mission
          </h3>
          <p className='text-sm'>{data.mission}</p>
        </div>
        <div className='px-3 mt-6'>
          <StartupSkills skills={data.skills} />
        </div>
        <Separator className='my-5' />
        <div className='px-3'>
          <h3 className='text-xs text-muted-foreground font-medium'>
            Looking for
          </h3>
        </div>
        <Separator className='my-5' />
        <div className='px-3'>
          <h3 className='text-xs text-muted-foreground font-medium'>
            Our milestones
          </h3>
        </div>
      </ScrollArea>
    </SheetContent>
  );
};
export default StartupSheet;
