import Image from 'next/image';

import UpvoteButton from './upvote-button';
import RoleApplicationBtn from '@/components/custom/role-application-btn';
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
    <SheetContent className='p-2 w-11/12'>
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

      <ScrollArea className='w-full h-[350px] pb-16 md:pb-2'>
        <div className='px-3 space-y-1.5'>
          <h3 className='text-sm md:text-xs font-medium text-muted-foreground'>
            Our mission
          </h3>
          <p className='text-sm'>{data.mission}</p>
        </div>
        <div className='px-3 mt-6'>
          <StartupSkills skills={data.skills} />
        </div>
        {data.roles.length > 0 && (
          <>
            <Separator className='my-5' />
            <div className='px-3 space-y-1.5'>
              <h3 className='text-sm md:text-xs text-muted-foreground font-medium'>
                Looking for
              </h3>
              <ul className='my-3 space-y-2.5'>
                {data.roles.map(role => (
                  <li
                    key={role.id}
                    className='flex items-center justify-between gap-5 w-full bg-muted/50 border border-border rounded-lg p-4 shadow'
                  >
                    <div className='flex items-center gap-5'>
                      <Avatar className='size-12 hidden md:flex'>
                        <AvatarFallback>{data.name.charAt(0)}</AvatarFallback>
                        <AvatarImage src={data.image ?? undefined} />
                      </Avatar>
                      <div>
                        <h6 className='font-semibold text-sm md:text-base'>
                          {role.name}
                        </h6>
                        <p className='text-muted-foreground text-xs md:text-sm'>
                          {role.description}
                        </p>
                      </div>
                    </div>
                    <RoleApplicationBtn
                      startupId={data.id}
                      roleId={role.id}
                      requiresSurvey={role.requiresSurvey}
                      surveyId={role.surveyId ?? undefined}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </ScrollArea>
    </SheetContent>
  );
};
export default StartupSheet;
