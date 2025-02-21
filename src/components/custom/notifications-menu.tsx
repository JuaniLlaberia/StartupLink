import Link from 'next/link';
import { Bell, ChevronRight } from 'lucide-react';

import { Button, buttonVariants } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { getUserNotifications } from '@/access-data/notification/get-user-notifications';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { timeAgo } from '@/lib/helpers/format-time-ago';
import { ScrollArea } from '../ui/scroll-area';

const NotificationsMenu = async () => {
  const notifications = await getUserNotifications({ page: 1, pageSize: 5 });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='icon'>
          <Bell className='size-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent align='end' className='p-0'>
        <div className='flex items-center justify-between p-3'>
          <h4 className='text-sm font-medium'>
            Notifications{' '}
            <span className='text-violet-500 bg-violet-200/60 rounded py-0.5 px-1.5 text-xs ml-1'>
              {notifications.length}
            </span>
          </h4>
          <Link
            href='/notifications'
            className={buttonVariants({ size: 'sm', variant: 'ghost' })}
          >
            View all
          </Link>
        </div>
        <ScrollArea className='w-full h-[300px]'>
          {notifications.length > 0 ? (
            <ul className='last:border-b'>
              {notifications.map(notification => (
                <li
                  key={notification.id}
                  className='p-3 border-t border-border space-y-5'
                >
                  <div className='space-y-1'>
                    <div className='flex items-center gap-1.5'>
                      <h6 className='text-sm font-medium'>
                        {notification.type === 'STARTUP_INVITE'
                          ? 'Invitation'
                          : notification.type === 'FORUM_ANSWER'
                          ? 'Answer'
                          : 'Join request'}
                      </h6>
                      {!notification.isRead && (
                        <Badge
                          variant='secondary'
                          className='text-[.6rem] text-violet-500 bg-violet-200/60'
                        >
                          Unread
                        </Badge>
                      )}
                    </div>
                    <p className='text-xs text-muted-foreground'>
                      {notification.message}
                    </p>
                  </div>
                  <div className='flex items-center justify-between'>
                    <p className='text-xs text-muted-foreground'>
                      {timeAgo(notification.createdAt)}
                    </p>
                    <div className='space-x-1'>
                      <Link
                        href={
                          notification.type === 'STARTUP_INVITE'
                            ? `/invitation/${notification.entityId}`
                            : notification.type === 'FORUM_ANSWER'
                            ? `/forum/${notification.entityId}`
                            : `/dashboard/${notification.entityId}/applications`
                        }
                        className={cn(
                          buttonVariants({ size: 'sm', variant: 'outline' }),
                          'group'
                        )}
                      >
                        View{' '}
                        <ChevronRight className='size-4 group-hover:translate-x-1 transition-transform' />
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className='text-sm text-muted-foreground text-center py-8'>
              No notifications
            </p>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsMenu;
