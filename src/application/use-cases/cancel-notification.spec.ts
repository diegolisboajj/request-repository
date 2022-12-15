/* eslint-disable prettier/prettier */
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';

describe('Cancel notification', () => {
   it('should be able to cancel a notification', async () => {
      const fakeNotificationsRepository = new InMemoryNotificationsRepository();
      const cancelNotification = new CancelNotification(fakeNotificationsRepository);

      const notification = makeNotification()

      fakeNotificationsRepository.create(notification);

      await cancelNotification.execute({
         notificationId: notification.id,
      });

      expect(fakeNotificationsRepository.notifications[0].canceledAt).toEqual(expect.any(Date))
   });

   it('should not be able to cancel a non existing notification', async () => {
      const fakeNotificationsRepository = new InMemoryNotificationsRepository();
      const cancelNotification = new CancelNotification(fakeNotificationsRepository);

      await expect(() => {
         return cancelNotification.execute({
            notificationId: 'fake-notification-id'
         });
      }).rejects.toThrow(new NotificationNotFound())
   });
});
