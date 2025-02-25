'use client';

import { KeyboardEvent, useState } from 'react';
import { Control, useController } from 'react-hook-form';
import { X } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QuestionFormData } from './question-form';

type TagsInputProps = {
  control: Control<QuestionFormData>;
  isLoading: boolean;
};

const TagsInput = ({ control, isLoading }: TagsInputProps) => {
  const [newTag, setNewTag] = useState<string>('');

  const {
    field: { value, onChange },
  } = useController<QuestionFormData>({
    name: 'tags',
    control,
  });

  const handleAddTag = () => {
    if (newTag.trim()) {
      onChange([...(value as string[]), newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (index: number) => {
    const newTags = (value as string[]).filter((_, i) => i !== index);
    onChange(newTags);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex gap-2'>
        <Input
          value={newTag}
          onChange={e => setNewTag(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder='Add a tag (e.g. React, Bussines model)'
          className='flex-1'
          disabled={isLoading}
        />
        <Button
          type='button'
          onClick={handleAddTag}
          disabled={!newTag.trim() || isLoading}
        >
          Add
        </Button>
      </div>

      <div className='flex flex-wrap gap-2'>
        {(value as string[]).map((skill, index) => (
          <Badge
            key={index}
            variant='secondary'
            className='flex items-center gap-1 px-3 py-1'
          >
            {skill}
            <button
              type='button'
              onClick={() => handleRemoveTag(index)}
              className='ml-1 hover:bg-background focus:outline-none'
            >
              <X className='size-3' />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default TagsInput;
