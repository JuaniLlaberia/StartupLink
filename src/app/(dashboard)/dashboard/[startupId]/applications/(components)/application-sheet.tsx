'use client';

import { Eye } from 'lucide-react';
import { JsonValue } from '@prisma/client/runtime/library';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

type SurveyResponsesSheetProps = {
  surveyResponses: JsonValue;
  applicantName?: string | null;
};

const SurveyResponsesSheet = ({
  surveyResponses,
  applicantName,
}: SurveyResponsesSheetProps) => {
  // Safely parse surveyResponses
  const parseResponses = () => {
    if (typeof surveyResponses === 'string') {
      try {
        return JSON.parse(surveyResponses);
      } catch {
        return {};
      }
    }
    return (surveyResponses as Record<string, string>) || {};
  };

  const responses = parseResponses();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' className='size-6 p-0 hover:bg-muted'>
          <span className='sr-only'>View survey responses</span>
          <Eye className='size-4 text-muted-foreground' strokeWidth={1.5} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {applicantName ? `${applicantName}'s` : 'Applicant'} Survey
            Responses
          </SheetTitle>
          <SheetClose />
        </SheetHeader>
        <div className='mt-4 space-y-4'>
          {Object.entries(responses).map(([question, answer]) => (
            <div key={question} className='border-b pb-3 last:border-b-0'>
              <p className='font-medium text-sm text-muted-foreground mb-1'>
                {question}
              </p>
              <p>
                {typeof answer === 'string'
                  ? answer
                  : JSON.stringify(answer) || 'No response'}
              </p>
            </div>
          ))}
          {Object.keys(responses).length === 0 && (
            <p className='text-muted-foreground text-center'>
              No survey responses found
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SurveyResponsesSheet;
