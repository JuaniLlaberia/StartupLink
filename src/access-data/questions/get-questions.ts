'server only';

import { Prisma, QuestionType } from '@prisma/client';

import { db } from '@/db';

type getQuestionsParams = {
  sortBy: 'score' | 'question' | 'createdAt';
  searchTerm?: string;
  type?: QuestionType;
  edited?: string;
  pageSize: number;
  page: number;
};

export async function getQuestions({
  sortBy,
  searchTerm = '',
  type,
  edited,
  page,
  pageSize,
}: getQuestionsParams) {
  const conditions: Prisma.QuestionWhereInput[] = [];

  if (searchTerm) {
    conditions.push({
      question: {
        contains: searchTerm,
        mode: 'insensitive' as Prisma.QueryMode,
      },
    });
  }
  if (type) conditions.push({ type });
  if (edited) conditions.push({ edited: edited === 'true' ? true : false });

  const questions = await db.question.findMany({
    where: conditions.length > 0 ? { AND: conditions } : {},
    select: {
      id: true,
      question: true,
      type: true,
      tags: true,
      edited: true,
      createdAt: true,
      user: { select: { name: true, image: true } },
    },
    orderBy: [{ [sortBy]: 'desc' }],
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return questions;
}
