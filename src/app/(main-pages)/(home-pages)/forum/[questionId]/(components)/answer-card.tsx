import { ChevronDown, ChevronUp } from 'lucide-react';
import { Answer } from '@prisma/client';

import AnswerActions from './answer-actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatRelativeDate } from '@/lib/helpers/format-relative-date';

type AnswerData = Answer & {
  user: { name: string | null };
};
type AnswerCardProps = { data: AnswerData; authUserId?: string };

const AnswerCard = ({ data, authUserId }: AnswerCardProps) => {
  const { id, answer, user, score, edited, createdAt, createdBy } = data;

  return (
    <li
      key={id}
      className='w-full flex items-start gap-8 border border-border rounded-lg p-5 shadow cursor-pointer hover:bg-muted/35 transition-colors'
    >
      <div className='flex flex-col items-center gap-3'>
        <Button size='icon-sm' variant='outline'>
          <ChevronUp />
        </Button>
        <span>{score}</span>
        <Button size='icon-sm' variant='outline'>
          <ChevronDown />
        </Button>
      </div>
      <div className='space-y-4 w-full'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Badge
              variant='secondary'
              className='text-violet-500 bg-violet-200/60'
            >
              Answer
            </Badge>
            <p className='text-xs text-muted-foreground'>
              by <span className='font-medium'>{user.name}</span>
            </p>
            {edited && (
              <p className='text-xs text-muted-foreground'>(edited)</p>
            )}
          </div>
          {authUserId === createdBy && <AnswerActions data={data} />}
        </div>

        <p className='text-base font-normal max-w-4xl'>{answer}</p>

        <p className='text-xs text-muted-foreground text-end'>
          {formatRelativeDate(createdAt)}
        </p>
      </div>
    </li>
  );
};

export default AnswerCard;
