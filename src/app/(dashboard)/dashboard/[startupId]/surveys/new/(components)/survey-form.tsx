'use client';

import Link from 'next/link';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Survey } from '@prisma/client';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { QuestionSchema } from '@/actions/survey/survey-types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useServerActionMutation } from '@/hooks/use-server-action';
import { createSurvey as createSurveyAction } from '@/actions/survey/create-survey';
import { updateSurvey as updateSurveyAction } from '@/actions/survey/update-survey';

const formSchema = z.object({
  name: z.string().min(1, 'Must provide a survey name'),
  description: z.string().optional(),
  questions: z
    .array(QuestionSchema)
    .min(1, 'At least one question is required')
    .max(10, 'Maximum 10 questions allowed'),
});

type FormValues = z.infer<typeof formSchema>;

type SurveyFormProps = {
  startupId: string;
  data?: Survey;
};

const SurveyForm = ({ startupId, data }: SurveyFormProps) => {
  const isEditing = Boolean(data?.id);

  // Default values when creating a new survey
  const defaultValues: FormValues = {
    name: data?.name || '',
    description: data?.description || '',
    questions: data?.questions
      ? (data.questions as any)
      : [
          {
            id: uuidv4(),
            text: '',
            order: 0,
            type: 'text',
            placeholder: '',
          },
        ],
  };

  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const watchQuestionTypes = watch('questions');

  // Function to handle question type change
  const handleQuestionTypeChange = (index: number, newType: string) => {
    const baseQuestion = {
      id: watchQuestionTypes[index].id || uuidv4(),
      text: watchQuestionTypes[index].text || '',
      order: watchQuestionTypes[index].order || index,
      type: newType,
    };

    let updatedQuestion;

    // Add type-specific fields based on the new type
    switch (newType) {
      case 'text':
      case 'textarea':
        updatedQuestion = {
          ...baseQuestion,
          placeholder: '',
          maxLength: undefined,
        };
        break;
      case 'dropdown':
        updatedQuestion = {
          ...baseQuestion,
          options: [{ id: uuidv4(), text: 'Option 1', order: 0 }],
          allowOther: false,
        };
        break;
      default:
        updatedQuestion = baseQuestion;
    }

    setValue(`questions.${index}`, updatedQuestion as any);
  };

  const { mutate: createSurvey, isPending: isCreating } =
    useServerActionMutation(createSurveyAction, {
      mutationKey: ['create-survey'],
      onSuccess: () => {
        router.push(`/dashboard/${startupId}/surveys`);
        toast.success('Survey created successfully');
      },
      onError: () => toast.error('Failed to create survey'),
    });
  const { mutate: updateSurvey, isPending: isUpdating } =
    useServerActionMutation(updateSurveyAction, {
      mutationKey: ['update-survey'],
      onSuccess: () => {
        router.push(`/dashboard/${startupId}/surveys`);
        toast.success('Survey updated successfully');
      },
      onError: () => toast.error('Failed to update survey'),
    });

  const isPending = isCreating || isUpdating;

  const handleOnSubmit = async (values: FormValues) => {
    // Ensure question order is set correctly
    const questionsWithOrder = values.questions.map((question, index) => ({
      ...question,
      order: index,
    }));

    if (isEditing && data?.id) {
      updateSurvey({
        surveyId: data.id,
        ...values,
        questions: questionsWithOrder,
        startupId,
      });
    } else {
      createSurvey({
        ...values,
        questions: questionsWithOrder,
        startupId,
      });
    }
  };

  const addQuestion = () => {
    if (fields.length < 10) {
      append({
        id: uuidv4(),
        text: '',
        order: fields.length,
        type: 'text',
        placeholder: '',
      });
    }
  };

  return (
    <>
      <header className='flex items-center gap-5 mb-2'>
        <h1 className='text-lg font-medium'>
          {isEditing ? 'Edit Survey' : 'Create New Survey'}
        </h1>

        <Link
          href={`/dashboard/${startupId}/surveys`}
          className={buttonVariants({ size: 'sm', variant: 'link' })}
        >
          Go back
        </Link>
      </header>

      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className='space-y-6 p-4 max-w-3xl'
      >
        {/* Survey Basic Info */}
        <div className='space-y-4'>
          <div>
            <Label htmlFor='name'>Survey Name</Label>
            <Input
              id='name'
              type='text'
              {...register('name')}
              placeholder='The name that users will see'
            />
            {errors.name && (
              <p className='mt-1 text-sm text-red-600'>{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label
              htmlFor='description'
              className='block text-sm font-medium text-gray-700'
            >
              Description (Optional)
            </Label>
            <Textarea
              id='description'
              rows={4}
              {...register('description')}
              placeholder='Describe in a few words this survey'
              className='resize-none'
            />
          </div>
        </div>

        {/* Questions Section */}
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-medium'>Questions</h2>
            <Badge variant='outline' className='text-xs'>
              Max. 10 questions
            </Badge>
          </div>

          {errors.questions?.message && (
            <p className='text-sm text-red-600'>{errors.questions.message}</p>
          )}

          {fields.map((field, index) => (
            <div
              key={field.id}
              className='border border-gray-200 rounded-md p-4 space-y-4'
            >
              <div className='flex justify-between items-start'>
                <Badge
                  variant='secondary'
                  className='text-violet-500 bg-violet-200/60'
                >
                  Question {index + 1}
                </Badge>
                {fields.length > 1 && (
                  <Button
                    size='sm'
                    variant='outline'
                    type='button'
                    onClick={() => remove(index)}
                    className='text-red-600 hover:text-red-800'
                  >
                    <Trash2 className='size-3 mr-1' />
                    Remove
                  </Button>
                )}
              </div>

              {/* Question Text */}
              <div>
                <Label>Text</Label>
                <Input
                  type='text'
                  placeholder='Your question'
                  {...register(`questions.${index}.text`)}
                />
                {errors.questions?.[index]?.text && (
                  <p className='mt-1 text-sm text-red-600'>
                    {errors.questions[index]?.text?.message}
                  </p>
                )}
              </div>

              {/* Question Type */}
              <div>
                <Label>Question Type</Label>
                <Controller
                  control={control}
                  name={`questions.${index}.type`}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={value => {
                        field.onChange(value);
                        handleQuestionTypeChange(index, value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select a question type' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='text'>Short Answer</SelectItem>
                        <SelectItem value='textarea'>Long Answer</SelectItem>
                        <SelectItem value='single_choice'>
                          Multiple Choice
                        </SelectItem>
                        <SelectItem value='dropdown'>Dropdown</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Type-specific fields */}
              {['text', 'textarea'].includes(
                watchQuestionTypes?.[index]?.type
              ) && (
                <div>
                  <Label>Placeholder (Optional)</Label>
                  <Input
                    type='text'
                    placeholder='Question placeholder...'
                    {...register(`questions.${index}.placeholder`)}
                  />
                </div>
              )}

              {['dropdown'].includes(watchQuestionTypes?.[index]?.type) && (
                <div className='space-y-3'>
                  <Label>Options</Label>

                  <Controller
                    control={control}
                    name={`questions.${index}.options`}
                    defaultValue={[
                      { id: uuidv4(), text: 'Option 1', order: 0 },
                    ]}
                    render={({ field }) => (
                      <div className='space-y-2'>
                        {(field.value || []).map((option, optIdx) => (
                          <div
                            key={option.id || optIdx}
                            className='flex items-center gap-2'
                          >
                            <Input
                              type='text'
                              value={option.text || ''}
                              onChange={e => {
                                const newOptions = [...(field.value || [])];
                                newOptions[optIdx] = {
                                  ...newOptions[optIdx],
                                  text: e.target.value,
                                };
                                field.onChange(newOptions);
                              }}
                              placeholder={`Option ${optIdx + 1}`}
                            />
                            {(field.value || []).length > 1 && (
                              <Button
                                size='icon'
                                type='button'
                                variant='outline'
                                onClick={() => {
                                  const newOptions = [...(field.value || [])];
                                  newOptions.splice(optIdx, 1);
                                  field.onChange(newOptions);
                                }}
                              >
                                <Trash2 className='size-4' />
                              </Button>
                            )}
                          </div>
                        ))}

                        <Button
                          type='button'
                          variant='outline'
                          size='sm'
                          onClick={() => {
                            field.onChange([
                              ...(field.value || []),
                              {
                                id: uuidv4(),
                                text: '',
                                order: (field.value || []).length,
                              },
                            ]);
                          }}
                        >
                          <Plus className='size-4 mr-1 text-muted-foreground' />{' '}
                          Add Option
                        </Button>
                      </div>
                    )}
                  />
                </div>
              )}
            </div>
          ))}

          {fields.length < 10 && (
            <Button
              size='sm'
              variant='outline'
              type='button'
              onClick={addQuestion}
            >
              <Plus className='size-4 mr-1 text-muted-foreground' />
              Add Question
            </Button>
          )}
        </div>

        <div className='flex justify-end'>
          <Button
            variant='default'
            size='sm'
            type='submit'
            disabled={isPending}
          >
            {isPending && <Loader2 className='size-4 animate-spin' />}
            {isEditing ? 'Update Survey' : 'Create Survey'}
          </Button>
        </div>
      </form>
    </>
  );
};

export default SurveyForm;
