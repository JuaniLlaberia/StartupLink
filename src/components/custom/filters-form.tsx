'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { useCreateQueryString } from '@/hooks/use-create-query-string';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Label } from '../ui/label';

type FilterValue = {
  label: string;
  value: string;
};

type Filter = {
  key: string;
  label: string;
  placeholder: string;
  values: FilterValue[];
};

type SelectedFilters = {
  [K in Filter['key']]?: string;
};

type FiltersFormProps = {
  filters: Filter[];
};

const FiltersForm = ({ filters: FILTERS }: FiltersFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { createQueryString, removeParams } = useCreateQueryString();

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>(
    () => {
      return FILTERS.reduce((acc, filter) => {
        acc[filter.key] = searchParams.get(filter.key) || 'any';
        return acc;
      }, {} as SelectedFilters);
    }
  );

  const handleApplyFilters = () => {
    const validFilters = Object.entries(selectedFilters).reduce<
      Record<string, string>
    >((acc, [key, value]) => {
      if (value && value !== 'any') {
        acc[key] = value;
      }
      return acc;
    }, {});

    const queryString = createQueryString(validFilters);
    router.push(`${pathname}${queryString}`);
  };

  const handleResetFilters = () => {
    setSelectedFilters({});
    const queryString = removeParams(FILTERS.map(filter => filter.key));
    router.push(`${pathname}${queryString}`);
  };

  return (
    <div className='space-y-4'>
      <h3 className='text-sm font-semibold'>Filter & Sort</h3>
      <ul>
        {FILTERS.map(({ key, label, placeholder, values }) => (
          <li key={label} className='mb-2 px-0.5'>
            <Label>{label}</Label>
            <Select
              defaultValue='any'
              value={selectedFilters[key] ? selectedFilters[key] : 'any'}
              onValueChange={val =>
                setSelectedFilters(prev => {
                  return { ...prev, [key]: val };
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='any'>Any</SelectItem>
                {values.map(val => (
                  <SelectItem key={val.value} value={val.value}>
                    {val.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </li>
        ))}
      </ul>
      <div className='space-x-2.5'>
        <Button size='sm' onClick={handleApplyFilters}>
          Apply
        </Button>
        <Button size='sm' variant='outline' onClick={handleResetFilters}>
          Reset all
        </Button>
      </div>
    </div>
  );
};

export default FiltersForm;
