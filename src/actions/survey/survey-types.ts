import { z } from 'zod';

const QuestionTypeEnum = z.enum([
  'text',
  'textarea',
  'single_choice',
  'dropdown',
]);

const OptionSchema = z.object({
  id: z.string().optional(),
  text: z.string(),
  order: z.number().int(),
});

const BaseQuestionSchema = z.object({
  id: z.string().optional(),
  text: z.string(),
  order: z.number().int(),
  type: QuestionTypeEnum,
});

// Text question schema
const TextQuestionSchema = BaseQuestionSchema.extend({
  type: z.enum(['text', 'textarea']),
  placeholder: z.string().optional(),
  maxLength: z.number().int().positive().optional(),
});

// Choice question schema
const ChoiceQuestionSchema = BaseQuestionSchema.extend({
  type: z.enum(['single_choice', 'dropdown']),
  options: z.array(OptionSchema),
  allowOther: z.boolean().optional(),
});

// Discriminated union of all question types
export const QuestionSchema = z.discriminatedUnion('type', [
  TextQuestionSchema,
  ChoiceQuestionSchema,
]);
