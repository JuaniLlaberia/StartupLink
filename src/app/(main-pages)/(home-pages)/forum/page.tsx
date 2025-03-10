import { QuestionType } from '@prisma/client';
import { HelpCircle } from 'lucide-react';

import FiltersForm from '@/components/custom/filters-form';
import Placeholder from '@/components/custom/placeholder';
import { getQuestions } from '@/access-data/questions/get-questions';
import QuestionCard from './(components)/question-card';
import QuestionForm from './(components)/question-form';
import { Button } from '@/components/ui/button';
import { getAuthUser } from '@/actions/auth';
import Pagination from '@/components/custom/pagination';
import { INITIAL_PAGE_SIZE } from '@/lib/consts';

const QUESTIONS_FILTERS = [
  {
    key: 'type',
    label: 'Question type',
    placeholder: 'Filter by type',
    values: QuestionType
      ? Object.values(QuestionType).map(type => ({
          label: type
            .replace(/_/g, ' ')
            .toLowerCase()
            .replace(/\b\w/g, char => char.toUpperCase()),
          value: type,
        }))
      : [],
  },
  {
    key: 'edited',
    label: 'Edited',
    placeholder: 'Filter by edit status',
    values: [
      { label: 'Edited', value: 'true' },
      { label: 'Not edited', value: 'false' },
    ],
  },
];

const QUESTIONS_SORTS = [
  {
    key: 'sortBy',
    label: 'Sort questions by',
    placeholder: 'Sort by',
    values: [
      { label: 'Question', value: 'question' },
      { label: 'Score', value: 'score' },
      { label: 'Creation time', value: 'createdAt' },
    ],
    defaultValue: 'createdAt',
  },
];

const ForumPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    search: string;
    type: QuestionType;
    edited: string;
    sortBy: 'createdAt' | 'score' | 'question';
    page: number;
  }>;
}) => {
  const userId = await getAuthUser();
  const { search: searchTerm, type, edited, sortBy, page } = await searchParams;

  const questions = await getQuestions({
    sortBy,
    searchTerm,
    type,
    edited,
    page: page || 1,
    pageSize: INITIAL_PAGE_SIZE,
  });

  return (
    <section className='grid md:grid-cols-[300px_1fr] gap-3 md:gap-8 p-1 py-8'>
      <FiltersForm filters={QUESTIONS_FILTERS} sorts={QUESTIONS_SORTS} />
      <div className='min-h-[75dvh]'>
        <div className='flex flex-col gap-1 md:flex-row md:items-center md:justify-between mb-5 md:mb-3'>
          <h1 className='text-sm font-semibold'>Questions</h1>
          <div className='flex items-center gap-2.5'>
            <h2 className='text-xs font-medium'>
              Have a question of your own?
            </h2>
            <QuestionForm
              trigger={
                <Button size='sm' variant='outline'>
                  <HelpCircle className='size-4' />
                  Ask here
                </Button>
              }
            />
          </div>
        </div>
        <ul className='space-y-3'>
          {questions.length > 0 ? (
            questions.map(question => (
              <QuestionCard
                key={question.id}
                data={question}
                authUserId={userId}
              />
            ))
          ) : (
            <Placeholder type='question' />
          )}
        </ul>
        <Pagination
          totalPages={Math.ceil(questions.length / INITIAL_PAGE_SIZE)}
        />
      </div>
    </section>
  );
};

export default ForumPage;
