'use client';

import { useState } from 'react';
import { Question } from '@prisma/client';
import { Ellipsis, PencilLine, Trash2 } from 'lucide-react';

import QuestionForm from './question-form';
import DeleteQuestionDialog from './delete-question-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type QuestionActionsProps = {
  data: Question;
};

const QuestionActions = ({ data }: QuestionActionsProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button size='icon-sm' variant='ghost'>
          <Ellipsis className='size-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <QuestionForm
          data={data}
          onSuccess={() => setIsOpen(false)}
          trigger={
            <DropdownMenuItem onSelect={e => e.preventDefault()}>
              <PencilLine className='text-muted-foreground' />
              <span>Edit question</span>
            </DropdownMenuItem>
          }
        />
        <DropdownMenuSeparator />
        <DeleteQuestionDialog
          questionId={data.id}
          onSuccess={() => setIsOpen(false)}
          trigger={
            <DropdownMenuItem onSelect={e => e.preventDefault()}>
              <Trash2 className='text-muted-foreground' />
              <span>Delete</span>
            </DropdownMenuItem>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default QuestionActions;
