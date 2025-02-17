import type { ReactNode } from 'react';

const SettingsCard = ({
  children,
  title,
  description,
}: {
  children: ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <li className='grid grid-cols-2 w-full border-t border-border py-5 px-3'>
      <div>
        <h4 className='text-sm font-medium'>{title}</h4>
        <p className='text-sm text-muted-foreground max-w-lg'>{description}</p>
      </div>
      <div className='flex flex-col gap-2.5 max-w-sm'>{children}</div>
    </li>
  );
};

export default SettingsCard;
