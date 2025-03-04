import { Building, MapPin, Tag, Users, Verified } from 'lucide-react';
import { Startup } from '@prisma/client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { INDUSTRY_LABELS, STAGE_LABELS, TEAM_SIZE_LABELS } from '@/lib/labels';
import { Badge } from '@/components/ui/badge';

export type StartupData = Startup & { user: { name: string | null } } & {
  hasUserUpvoted: boolean;
} & { openRoles: number } & {
  roles: {
    id: string;
    name: string;
    description: string;
    requiresSurvey: boolean;
    surveyId: string;
  }[];
};

type StartupHeaderProps = {
  data: Pick<StartupData, 'name' | 'user' | 'image' | 'verified'>;
  withImg?: boolean;
};

export const StartupHeader = ({
  data: { name, user, image, verified },
  withImg = true,
}: StartupHeaderProps) => (
  <div className='flex gap-4 items-center'>
    {withImg && (
      <Avatar className='size-14 border border-border'>
        <AvatarImage src={image ?? undefined} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
    )}
    <div>
      <h2 className='flex items-center gap-1.5 font-medium'>
        {name}
        {verified && (
          <span>
            <Verified className='size-5 stroke-blue-500 fill-blue-50' />
          </span>
        )}
      </h2>
      <p className='text-sm text-muted-foreground'>Founded by {user.name}</p>
    </div>
  </div>
);

export const StartupMetadata = ({
  stage,
  industry,
  teamSize,
  location,
}: Pick<StartupData, 'stage' | 'industry' | 'teamSize' | 'location'>) => (
  <ul className='grid grid-cols-2 gap-y-2 grid-rows-2'>
    <li className='flex items-center gap-2 text-sm'>
      <Tag className='size-4 text-muted-foreground' /> In {STAGE_LABELS[stage]}
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
);

export const StartupSkills = ({ skills }: Pick<StartupData, 'skills'>) => (
  <div className='space-y-1.5'>
    <h3 className='text-xs text-muted-foreground font-medium'>
      Application stack
    </h3>
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
