/* eslint-disable prettier/prettier */
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { SendNotification } from './send-notification';

describe('Send notification', () => {
   it('should be able to send a notification', async () => {
      const fakeNotificationsRepository = new InMemoryNotificationsRepository();
      const sendNotification = new SendNotification(fakeNotificationsRepository);

      const { notification } = await sendNotification.execute({
         content: 'This is a notification',
         category: 'social',
         recipientId: 'example-recipient-id',
      });

      expect(fakeNotificationsRepository.notifications).toHaveLength(1);
      expect(fakeNotificationsRepository.notifications[0]).toEqual(notification);
   });
});
