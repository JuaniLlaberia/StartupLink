import { ChevronRight } from 'lucide-react';

import StartupSheet from './startup-sheet';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import {
  StartupHeader,
  StartupMetadata,
  StartupSkills,
  type StartupData,
} from './startup-reusable';
import UpvoteButton from './upvote-button';
import { Badge } from '@/components/ui/badge';

export type StartupCardProps = {
  data: StartupData;
};

const StartupCard = ({ data }: StartupCardProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <li className='relative border border-border rounded-lg p-5 space-y-5 shadow cursor-pointer hover:bg-muted/35 transition-colors'>
          <StartupHeader data={data} withImg />
          <div className='px-0.5'>
            <StartupMetadata {...data} />
          </div>
          <div className='px-0.5'>
            <StartupSkills skills={data.skills} />
          </div>
          <div className='flex items-center justify-end gap-3'>
            {data.looking && (
              <p className='text-xs text-muted-foreground'>
                Looking for people
              </p>
            )}
            {data.openRoles && (
              <Badge
                variant='secondary'
                className='bg-violet-200/60 text-violet-500 py-1.5 px-3'
              >
                {data.openRoles} Open roles
              </Badge>
            )}
            <Button size='sm' className='group'>
              View startup
              <ChevronRight className='size-4 group-hover:translate-x-0.5 transition-transform' />
            </Button>
          </div>
          <UpvoteButton
            startupId={data.id}
            className='absolute top-0 right-5'
            hasUserUpvoted={data.hasUserUpvoted}
          />
        </li>
      </SheetTrigger>
      <StartupSheet data={data} />
    </Sheet>
  );
};

export default StartupCard;
