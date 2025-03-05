'use client';

import { KeyboardEvent, useState } from 'react';
import { Control, useController } from 'react-hook-form';
import { X } from 'lucide-react';

import { ProfileFormData } from './user-profile-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type SkillsInputProps = {
  control: Control<ProfileFormData>;
};

const SkillsInput = ({ control }: SkillsInputProps) => {
  const [newSkill, setNewSkill] = useState<string>('');

  const {
    field: { value, onChange },
  } = useController<ProfileFormData>({
    name: 'skills',
    control,
  });

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      onChange([...(value as string[]), newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (index: number) => {
    const newSkills = (value as string[]).filter((_, i) => i !== index);
    onChange(newSkills);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex gap-2'>
        <Input
          value={newSkill}
          onChange={e => setNewSkill(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder='Add a skill (e.g. React, TypeScript)'
          className='flex-1'
        />
        <Button
          type='button'
          onClick={handleAddSkill}
          disabled={!newSkill.trim()}
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
              onClick={() => handleRemoveSkill(index)}
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

export default SkillsInput;
