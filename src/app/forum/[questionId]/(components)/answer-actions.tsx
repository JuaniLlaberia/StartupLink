'use client';

import { useState } from 'react';
import { Answer } from '@prisma/client';
import { Ellipsis, PencilLine, Trash2 } from 'lucide-react';

import AnswerForm from './answer-form';
import DeleteAnswerDialog from './delete-answer-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type AnswerActionsProps = {
  data: Answer;
};

const AnswerActions = ({ data }: AnswerActionsProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button size='icon-sm' variant='ghost'>
          <Ellipsis className='size-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <AnswerForm
          data={data}
          onSuccess={() => setIsOpen(false)}
          trigger={
            <DropdownMenuItem onSelect={e => e.preventDefault()}>
              <PencilLine className='text-muted-foreground' />
              <span>Edit answer</span>
            </DropdownMenuItem>
          }
        />
        <DropdownMenuSeparator />
        <DeleteAnswerDialog
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

export default AnswerActions;
