'use client';

import { Check, Loader2, X } from 'lucide-react';
import { toast } from 'sonner';
import { JsonValue } from '@prisma/client/runtime/library';

import { Button } from '@/components/ui/button';
import { useServerActionMutation } from '@/hooks/use-server-action';
import { acceptApplication as acceptApplicationAction } from '@/actions/applications/accept-application';
import { rejectApplication as rejectApplicationAction } from '@/actions/applications/reject-application';
import SurveyResponsesSheet from './application-sheet';

type ApplicationActionsProps = {
  startupId: string;
  applicationId: string;
  applicantName: string | null;
  applicationRole: string;
  surveyResponses: JsonValue;
};

const ApplicationActions = ({
  startupId,
  applicationId,
  applicantName,
  applicationRole,
  surveyResponses,
}: ApplicationActionsProps) => {
  const { mutate: acceptApplication, isPending: isAccepting } =
    useServerActionMutation(acceptApplicationAction, {
      mutationKey: ['accept-application'],
      onSuccess: () =>
        toast.success('Application accepted', {
          description: `${applicantName} has joined as a "${applicationRole}"`,
        }),
      onError: err => toast.error(err.message),
    });

  const { mutate: rejectApplication, isPending: isRejecting } =
    useServerActionMutation(rejectApplicationAction, {
      mutationKey: ['reject-application'],
      onSuccess: () => toast.success('Rejected application'),
      onError: err => toast.error(err.message),
    });

  const isLoading = isAccepting || isRejecting;

  return (
    <div className='flex items-center gap-3'>
      <Button
        disabled={isLoading}
        variant='ghost'
        className='size-6 p-0 hover:bg-green-200/25'
        onClick={() => acceptApplication({ startupId, applicationId })}
      >
        <span className='sr-only'>Accept applicant</span>
        {isAccepting ? (
          <Loader2 className='size-4 text-muted-foreground animate-spin' />
        ) : (
          <Check className='size-4 text-green-500' strokeWidth={1.5} />
        )}
      </Button>
      <Button
        disabled={isLoading}
        variant='ghost'
        className='size-6 p-0 hover:bg-red-200/25'
        onClick={() => rejectApplication({ startupId, applicationId })}
      >
        <span className='sr-only'>Reject applicant</span>
        {isRejecting ? (
          <Loader2 className='size-4 text-muted-foreground animate-spin' />
        ) : (
          <X className='size-4 text-red-500' strokeWidth={1.5} />
        )}
      </Button>

      {surveyResponses && (
        <SurveyResponsesSheet
          surveyResponses={surveyResponses}
          applicantName={applicantName}
        />
      )}
    </div>
  );
};

export default ApplicationActions;
