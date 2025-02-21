'use client';

import Link from 'next/link';
import { Question } from '@prisma/client';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatRelativeDate } from '@/lib/helpers/format-relative-date';
import { useServerActionMutation } from '@/hooks/use-server-action';
import { updateQuestionScore } from '@/actions/questions/update-question-score';
import { QUESTIONS_TYPE_LABELS } from '@/lib/labels';
import QuestionActions from './question-actions';

type QuestionData = Question & {
  user: { name: string | null };
};
type QuestionCardProps = {
  data: QuestionData;
  authUserId?: string;
  cardType?: 'page' | 'default';
};

const QuestionCard = ({
  data,
  authUserId,
  cardType = 'default',
}: QuestionCardProps) => {
  const {
    id,
    question,
    user,
    score,
    type,
    tags,
    edited,
    createdAt,
    createdBy,
  } = data;

  const { mutate: updateScore, isPending } =
    useServerActionMutation(updateQuestionScore);

  const body = (
    <>
      <div className='flex flex-col items-center gap-3'>
        <Button
          size='icon-sm'
          variant='outline'
          onClick={() => updateScore({ id, type: 'increment' })}
          disabled={isPending}
        >
          <ChevronUp />
        </Button>
        <span>{score}</span>
        <Button
          size='icon-sm'
          variant='outline'
          onClick={() => updateScore({ id, type: 'decrement' })}
          disabled={isPending}
        >
          <ChevronDown />
        </Button>
      </div>
      <div className='space-y-3 w-full'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Badge variant='secondary'>{QUESTIONS_TYPE_LABELS[type]}</Badge>
            <p className='text-xs text-muted-foreground'>
              asked by <span className='font-medium'>{user.name}</span>
            </p>
            {edited && (
              <p className='text-xs text-muted-foreground'>(edited)</p>
            )}
          </div>
          {authUserId === createdBy && cardType === 'page' && (
            <QuestionActions data={data} />
          )}
        </div>
        <h4 className='text-lg font-medium px-0.5'>{question}</h4>
        <div className='flex items-center justify-between w-full'>
          <ul className='flex flex-wrap gap-2 pt-3'>
            {tags.map(tag => (
              <Badge key={tag} variant='secondary'>
                {tag}
              </Badge>
            ))}
          </ul>
          <p className='text-xs text-muted-foreground'>
            {formatRelativeDate(createdAt)}
          </p>
        </div>
      </div>
    </>
  );

  if (cardType === 'default')
    return (
      <li className='list-none'>
        <Link
          href={`/forum/${id}`}
          className='w-full flex items-start gap-8 border border-border rounded-lg p-5 shadow cursor-pointer hover:bg-muted/35 transition-colors'
        >
          {body}
        </Link>
      </li>
    );
  else if (cardType === 'page')
    return (
      <li className='w-full flex items-start gap-8 border border-border rounded-lg p-5 shadow hover:bg-muted/35 transition-colors list-none'>
        {body}
      </li>
    );
};

export default QuestionCard;
