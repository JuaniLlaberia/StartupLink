import QuestionsComponent from './(components)/questions-component';
import { getSurvey } from '@/access-data/survey/get-survey';

const SurveyPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ surveyId: string }>;
  searchParams: Promise<{ roleId: string }>;
}) => {
  const { surveyId } = await params;
  const { roleId } = await searchParams;
  const survey = await getSurvey({ surveyId });

  return (
    <section className='p-1 py-8'>
      <header>
        <h1 className='text-3xl font-semibold'>{survey.name}</h1>
        <p className='text-lg text-muted-foreground'>{survey.description}</p>
      </header>
      <QuestionsComponent
        questions={survey.questions}
        roleId={roleId}
        startupId={survey.startupId}
      />
    </section>
  );
};

export default SurveyPage;
