import React from 'react';
import { Bell } from 'lucide-react';

import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const NotificationsMenu = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='icon'>
          <Bell className='size-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent align='end'>
        <h4 className='text-sm font-medium'>Notifications (0)</h4>
        <p className='text-sm text-muted-foreground text-center py-8'>
          No notifications
        </p>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsMenu;
