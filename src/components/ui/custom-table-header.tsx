import { ArrowUpDown } from 'lucide-react';
import type { ReactElement } from 'react';

import { Button } from './button';
import { Column } from '@tanstack/react-table';

// Use a generic type parameter to specify the data type of the column
type TableHeaderProps<TData> = {
  label: string;
  icon: ReactElement;
  column: Column<TData>;
};

// Make the component generic to match the column type
const CustomTableHeader = <TData,>({
  icon,
  label,
  column,
}: TableHeaderProps<TData>) => {
  return (
    <div className='flex items-center px-2 group'>
      {icon}
      <p className='text-xs capitalize'>{label}</p>
      <Button
        size='icon'
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className='size-5 bg-primary-foreground/50 hover:bg-primary-foreground ml-2 p-1 opacity-0 group-hover:opacity-100 cursor-pointer [&_svg]:size-3'
      >
        <ArrowUpDown className='size-3' />
      </Button>
    </div>
  );
};

export default CustomTableHeader;
