'server only';

import { redirect } from 'next/navigation';

import { getAuthUser } from '@/actions/auth';
import { isStartupMember } from '../helper';
import { db } from '@/db';

type getSurveyProps = {
  startupId: string;
  surveyId: string;
};

export const getSurvey = async ({ startupId, surveyId }: getSurveyProps) => {
  const userId = await getAuthUser();

  const isMember = await isStartupMember(startupId, userId);
  if (!isMember) return redirect('/');

  const survey = await db.survey.findFirst({
    where: { id: surveyId },
  });

  if (!survey) redirect('/');

  return survey;
};
