'use client';

import { ThumbsUp } from 'lucide-react';
import { useOptimistic, startTransition } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useServerActionMutation } from '@/hooks/use-server-action';
import { toggleUpvote as toggleUpvoteAction } from '@/actions/up-vote/toggle-upvote';

type UpvoteButtonProps = {
  className?: string;
  startupId: string;
  hasUserUpvoted: boolean;
};

const UpvoteButton = ({
  className,
  startupId,
  hasUserUpvoted,
}: UpvoteButtonProps) => {
  const { mutate: toggleUpvote } = useServerActionMutation(toggleUpvoteAction, {
    mutationKey: ['toggle-upvote'],
    onSuccess: () => {
      startTransition(() => {
        optimisticUpdate(hasUserUpvoted);
      });
    },
    onError: () => {
      startTransition(() => {
        optimisticUpdate(hasUserUpvoted);
      });
      toast.error('Failed to process vote');
    },
  });

  const [upvoted, optimisticUpdate] = useOptimistic(
    hasUserUpvoted,
    (currentState: boolean) => !currentState
  );

  const handleUpvote = async (e: React.MouseEvent) => {
    e.stopPropagation();
    startTransition(() => {
      optimisticUpdate(undefined);
    });
    toggleUpvote({ startupId });
  };

  return (
    <Button
      size='icon'
      variant='outline'
      className={cn(
        'transition-colors',
        upvoted && 'bg-blue-100 text-blue-600',
        className
      )}
      onClick={handleUpvote}
    >
      <ThumbsUp className={cn(upvoted && 'fill-current')} />
    </Button>
  );
};

export default UpvoteButton;
