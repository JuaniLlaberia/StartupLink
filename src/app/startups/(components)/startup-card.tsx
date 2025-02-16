import {
  Building,
  ChevronRight,
  MapPin,
  Tag,
  Users,
  Verified,
} from 'lucide-react';
import { Startup } from '@prisma/client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Sheet } from '@/components/ui/sheet';
import { INDUSTRY_LABELS, STAGE_LABELS, TEAM_SIZE_LABELS } from '@/lib/labels';

type StartupCard = {
  data: Startup & { user: { name: string | null } };
};

const StartupCard = ({ data }: StartupCard) => {
  const {
    name,
    user,
    image,
    industry,
    skills,
    stage,
    location,
    teamSize,
    verified,
    // mission,
    // coverImage,
  } = data;

  return (
    <Sheet>
      <li className='border border-border rounded-lg p-5 space-y-5 shadow cursor-pointer hover:bg-muted/35 transition-colors'>
        <div className='flex gap-4 items-center'>
          <Avatar className='size-14'>
            <AvatarImage src={image ? image : undefined} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className='flex items-center gap-1.5 font-medium'>
              {name}
              {verified && (
                <span>
                  <Verified className='size-5 stroke-blue-500 fill-blue-50' />
                </span>
              )}
            </h2>
            <p className='text-sm text-muted-foreground'>
              Founded by {user.name}
            </p>
          </div>
        </div>
        <ul className='grid grid-cols-2 gap-y-2 grid-rows-2 px-0.5'>
          <li className='flex items-center gap-2 text-sm'>
            <Tag className='size-4 text-muted-foreground' /> In{' '}
            {STAGE_LABELS[stage]}
          </li>
          <li className='flex items-center gap-2 text-sm'>
            <Building className='size-4 text-muted-foreground' />{' '}
            {INDUSTRY_LABELS[industry]}
          </li>
          <li className='flex items-center gap-2 text-sm'>
            <Users className='size-4 text-muted-foreground' />{' '}
            {TEAM_SIZE_LABELS[teamSize]} members
          </li>
          <li className='flex items-center gap-2 text-sm'>
            <MapPin className='size-4 text-muted-foreground' />{' '}
            {location ? location : 'Not specified'}
          </li>
        </ul>
        <div className='px-0.5 space-y-1.5'>
          <h3 className='text-xs text-muted-foreground font-medium'>
            Application stack
          </h3>
          <ul className='flex flex-wrap gap-2'>
            {skills.length > 0 ? (
              skills.map(skill => (
                <li
                  key={skill}
                  className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-muted'
                >
                  {skill}
                </li>
              ))
            ) : (
              <p className='text-sm'>Not specified</p>
            )}
          </ul>
        </div>
        <div className='flex items-center justify-end gap-3'>
          <p className='text-xs text-muted-foreground'>Looking for people</p>
          <Button size='sm' className='group'>
            View startup
            <ChevronRight className='size-4 group-hover:translate-x-0.5 transition-transform' />
          </Button>
        </div>
      </li>
    </Sheet>
  );
};

export default StartupCard;
