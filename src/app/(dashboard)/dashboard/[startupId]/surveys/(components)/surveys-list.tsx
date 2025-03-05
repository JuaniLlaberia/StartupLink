import Link from 'next/link';
import { Edit, List, Plus, Trash2 } from 'lucide-react';

import DeleteSurveyDialog from './delete-survey-dialog';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { formatRelativeDate } from '@/lib/helpers/format-relative-date';
import { cn } from '@/lib/utils';

const SurveysList = ({
  startupId,
  surveys,
}: {
  startupId: string;
  surveys: {
    id: string;
    name: string;
    description: string | null;
    active: boolean;
    createdAt: Date;
  }[];
}) => {
  return (
    <>
      {surveys.length > 0 ? (
        <>
          <ul className='mt-4 space-y-2'>
            {surveys.map(survey => (
              <li
                key={survey.id}
                className='w-full max-w-2xl flex flex-col gap-4 md:flex-row md:gap-0 items-center border border-border rounded-lg p-4'
              >
                <div className='w-full'>
                  <h3 className='text-sm font-medium'>{survey.name}</h3>
                  <p className='text-sm text-muted-foreground'>
                    {survey.description}
                  </p>
                  <div className='flex mt-3 space-x-2.5'>
                    {survey.active ? (
                      <Badge
                        variant='secondary'
                        className='flex items-center gap-1.5 w-auto text-green-500 bg-green-200/60 hover:bg-green-200/80'
                      >
                        <div className='size-[6px] shrink-0 rounded-full animate-pulse bg-green-500' />
                        Active
                      </Badge>
                    ) : (
                      <Badge
                        variant='secondary'
                        className='flex items-center gap-1.5 w-auto text-red-500 bg-red-200/60 hover:bg-red-200/80'
                      >
                        <div className='size-[0.4rem] shrink-0 rounded-full bg-red-500' />
                        Inactive
                      </Badge>
                    )}
                    <p className='text-sm text-muted-foreground'>
                      {formatRelativeDate(survey.createdAt)}
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-1.5 w-full'>
                  <Link
                    href={`/dashboard/${startupId}/surveys/${survey.id}`}
                    className={cn(
                      buttonVariants({
                        size: 'sm',
                        variant: 'outline',
                      }),
                      'w-full md:w-auto'
                    )}
                  >
                    <Edit className='size-3 text-muted-foreground' />
                    Edit survey
                  </Link>

                  <DeleteSurveyDialog
                    surveyId={survey.id}
                    startupId={startupId}
                    surveyName={survey.name}
                    trigger={
                      <Button
                        size='icon'
                        variant='outline'
                        className='size-7 [&_svg]:size-4'
                      >
                        <Trash2 className='text-red-500' />
                      </Button>
                    }
                  />
                </div>
              </li>
            ))}
          </ul>
          <Link
            href={`/dashboard/${startupId}/surveys/new`}
            className={cn(buttonVariants({ size: 'sm' }), 'mt-4')}
          >
            <Plus /> Add new survey
          </Link>
        </>
      ) : (
        <div className='flex flex-col col-span-full gap-2 justify-center items-center py-10 lg:py-20 px-2'>
          <div className='border border-border rounded-xl p-3'>
            <List className='size-6' />
          </div>
          <h6 className='font-semibold'>No surveys found</h6>
          <p className='text-muted-foreground text-center max-w-[400px]'>
            You can start by creating one and assign it to a role.
          </p>
          <Link
            href={`/dashboard/${startupId}/surveys/new`}
            className={cn(
              buttonVariants({ variant: 'default', size: 'sm' }),
              'mt-4'
            )}
          >
            <Plus />
            Create survey
          </Link>
        </div>
      )}
    </>
  );
};

export default SurveysList;
