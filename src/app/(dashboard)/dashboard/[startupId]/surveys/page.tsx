import SurveysList from './(components)/surveys-list';
import { getStartupSurveys } from '@/access-data/survey/get-startup-surveys';

const SurveysPage = async ({
  params,
}: {
  params: Promise<{ startupId: string }>;
}) => {
  const { startupId } = await params;
  const surveys = await getStartupSurveys({ startupId });

  return (
    <section>
      <header className='space-y-1 mb-2'>
        <h1 className='text-lg font-medium'>Surveys</h1>
        <p className='text-sm text-muted-foreground'>
          This are application forms that members will have to fill when they
          apply to a role in your startup.
        </p>
      </header>
      <SurveysList startupId={startupId} surveys={surveys} />
    </section>
  );
};

export default SurveysPage;
