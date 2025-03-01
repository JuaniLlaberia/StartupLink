export const formatDateTime = (
  date: Date | string | undefined | null,
  options: {
    includeWeekday?: boolean;
    includeSeconds?: boolean;
    includeYear?: boolean;
    shortMonth?: boolean;
  } = {}
): string => {
  if (!date) return '';

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const {
    includeWeekday = true,
    includeSeconds = false,
    includeYear = true,
    shortMonth = false,
  } = options;

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: shortMonth ? 'short' : 'long',
    day: 'numeric',
    year: includeYear ? 'numeric' : undefined,
    weekday: includeWeekday ? 'long' : undefined,
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    second: includeSeconds ? '2-digit' : undefined,
    hour12: true,
  };

  const formattedDate = dateObj.toLocaleDateString(undefined, dateOptions);
  const formattedTime = dateObj.toLocaleTimeString(undefined, timeOptions);

  return `${formattedDate} at ${formattedTime}`;
};

export const formatEventTime = (
  startTime: Date | string | undefined | null,
  endTime?: Date | string | undefined | null
): string => {
  if (!startTime) return '';

  const formattedStart = formatDateTime(startTime);

  if (!endTime) return formattedStart;

  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  const sameDay =
    startDate.getFullYear() === endDate.getFullYear() &&
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getDate() === endDate.getDate();

  if (sameDay) {
    const endTimeOnly = endDate.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    return `${formattedStart} to ${endTimeOnly}`;
  } else {
    return `${formattedStart} to ${formatDateTime(endTime)}`;
  }
};
