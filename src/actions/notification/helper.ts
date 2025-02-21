type NotificationType = 'STARTUP_INVITE' | 'STARTUP_REQUEST' | 'FORUM_ANSWER';

interface NotificationData {
  type: NotificationType;
  startupName?: string;
  userName?: string;
  role?: string;
  questionId?: string;
  answererName?: string;
}

export const generateNotificationMessage = (data: NotificationData) => {
  switch (data.type) {
    case 'STARTUP_INVITE':
      if (!data.startupName) throw new Error('Startup name is required');
      return `You have been invited to join ${data.startupName}.`;

    case 'STARTUP_REQUEST':
      if (!data.userName || !data.startupName || !data.role) {
        throw new Error('User name, startups, and role are required');
      }
      return `${data.userName} has requested to join your startup ${data.startupName} as a ${data.role}.`;

    case 'FORUM_ANSWER':
      if (!data.answererName || !data.questionId) {
        throw new Error('Answerer name and question ID are required');
      }
      return `${data.answererName} answered your question.`;

    default:
      throw new Error('Invalid notification type');
  }
};
