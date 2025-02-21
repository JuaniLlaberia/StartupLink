'server only';

import { db } from '@/db';

type getQuestionWithAnswersParams = {
  questionId: string;
};

export const getQuestionsWithAnswers = async ({
  questionId,
}: getQuestionWithAnswersParams) => {
  const question = await db.question.findUnique({
    where: { id: questionId },
    select: {
      id: true,
      question: true,
      type: true,
      tags: true,
      score: true,
      edited: true,
      createdAt: true,
      createdBy: true,
      user: { select: { name: true } },
    },
  });
  if (!question) throw new Error('Question not found');

  const answers = await db.answer.findMany({
    where: { questionId: question.id },
    select: {
      id: true,
      answer: true,
      edited: true,
      score: true,
      user: { select: { name: true } },
      createdAt: true,
      createdBy: true,
    },
  });

  return {
    question,
    answers,
  };
};
