import Link from 'next/link';
import { ChevronLeft, PlusCircle } from 'lucide-react';

import QuestionCard from '../(components)/question-card';
import AnswerForm from './(components)/answer-form';
import AnswerCard from './(components)/answer-card';
import { Button, buttonVariants } from '@/components/ui/button';
import { getQuestionsWithAnswers } from '@/access-data/questions/get-question-with-answers';
import { cn } from '@/lib/utils';
import { getAuthUser } from '@/actions/auth';

const QuestionPage = async ({
  params,
}: {
  params: Promise<{ questionId: string }>;
}) => {
  const userId = await getAuthUser();

  const { questionId } = await params;
  const { question, answers } = await getQuestionsWithAnswers({ questionId });

  return (
    <section className='px-2 md:px-16 py-8 space-y-2.5'>
      <header className='flex items-center justify-between'>
        <Link
          href='/forum'
          className={cn(
            buttonVariants({ size: 'sm', variant: 'outline' }),
            'group'
          )}
        >
          <ChevronLeft className='size-4 group-hover:-translate-x-1 transition-transform' />{' '}
          Go back
        </Link>
        <AnswerForm
          trigger={
            <Button size='sm'>
              <PlusCircle /> Create answer
            </Button>
          }
        />
      </header>
      <QuestionCard data={question} cardType='page' authUserId={userId} />

      <div className='space-y-2.5 py-5'>
        <h2 className='text-sm font-medium'>Answers ({answers.length})</h2>
        <ul className='space-y-3'>
          {answers.length > 0 ? (
            answers.map(answer => (
              <AnswerCard key={answer.id} data={answer} authUserId={userId} />
            ))
          ) : (
            <div className='flex flex-col items-center justify-center gap-0.5'>
              <h2 className='font-medium'>No answers yet</h2>
              <p className='text-sm text-muted-foreground'>
                Be the first one to respond
              </p>
            </div>
          )}
        </ul>
      </div>
    </section>
  );
};

export default QuestionPage;
