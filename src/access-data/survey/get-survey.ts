'server only';

import { redirect } from 'next/navigation';

import { getAuthUser } from '@/actions/auth';
import { db } from '@/db';

type getSurveyProps = {
  surveyId: string;
};

export const getSurvey = async ({ surveyId }: getSurveyProps) => {
  await getAuthUser();

  const survey = await db.survey.findFirst({
    where: { id: surveyId },
  });

  if (!survey) redirect('/');

  return survey;
};
