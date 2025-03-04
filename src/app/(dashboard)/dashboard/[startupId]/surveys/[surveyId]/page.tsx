import { getSurvey } from '@/access-data/survey/get-survey';
import SurveyForm from '../new/(components)/survey-form';

const SurveyPage = async ({
  params,
}: {
  params: Promise<{ startupId: string; surveyId: string }>;
}) => {
  const { startupId, surveyId } = await params;
  const survey = await getSurvey({ surveyId });

  return (
    <section>
      <SurveyForm startupId={startupId} data={survey} />
    </section>
  );
};

export default SurveyPage;
