'server only';

import { db } from '@/db';

type getQuestionWithAnswersParams = {
  questionId: string;
};

export const getQuestionsWithAnswers = async ({
  questionId,
}: getQuestionWithAnswersParams) => {
  const question = await db.question.findUnique({ where: { id: questionId } });
  if (!question) throw new Error('Question not found');

  const answers = await db.answer.findMany({
    where: { questionId: question.id },
  });

  return {
    question,
    answers,
  };
};
