import { CalendarDays, MapPin, Target } from 'lucide-react';
import { User } from '@prisma/client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { OBJECTIVE_LABELS } from '@/lib/labels';
import { Badge } from '@/components/ui/badge';

type UserHeaderProps = {
  data: Pick<User, 'name' | 'position' | 'image'>;
  withImg?: boolean;
};

export const UserHeader = ({
  data: { name, position, image },
  withImg = true,
}: UserHeaderProps) => (
  <div className='flex gap-4 items-center'>
    {withImg && (
      <Avatar className='size-14 border border-border'>
        <AvatarImage src={image ?? undefined} />
        <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
      </Avatar>
    )}
    <div>
      <h2 className='flex items-center gap-1.5 font-medium'>{name}</h2>
      <p className='text-sm text-muted-foreground'>{position}</p>
    </div>
  </div>
);

export const UserMetadata = ({
  objective,
  location,
  weeklyAvailability,
}: Pick<User, 'objective' | 'location' | 'weeklyAvailability'>) => (
  <ul className='grid grid-cols-1 gap-y-2'>
    <li className='flex items-center gap-2 text-sm'>
      <Target className='size-4 text-muted-foreground' />{' '}
      {OBJECTIVE_LABELS[objective]}
    </li>
    <li className='flex items-center gap-2 text-sm'>
      <MapPin className='size-4 text-muted-foreground' />{' '}
      {location ? location : 'Not specified'}
    </li>
    <li className='flex items-center gap-2 text-sm'>
      <CalendarDays className='size-4 text-muted-foreground' />{' '}
      {weeklyAvailability ? weeklyAvailability : 'Not specified'}
    </li>
  </ul>
);

export const UserSkills = ({ skills }: Pick<User, 'skills'>) => (
  <div className='space-y-1.5'>
    <h3 className='text-xs text-muted-foreground font-medium'>Skills</h3>
    <ul className='flex flex-wrap gap-2'>
      {skills.length > 0 ? (
        skills.map(skill => (
          <Badge key={skill} variant='secondary'>
            {skill}
          </Badge>
        ))
      ) : (
        <p className='text-sm'>Not specified</p>
      )}
    </ul>
  </div>
);
