/* eslint-disable prettier/prettier */
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { UnreadNotification } from './unread-notification copy';
import { NotificationNotFound } from './errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';

describe('Unread notification', () => {
   it('should be able to unread a notification', async () => {
      const fakeNotificationsRepository = new InMemoryNotificationsRepository();
      const unreadNotification = new UnreadNotification(fakeNotificationsRepository);

      const notification = makeNotification({
         readAt: new Date()
      })

      fakeNotificationsRepository.create(notification);

      await unreadNotification.execute({
         notificationId: notification.id,
      });

      expect(fakeNotificationsRepository.notifications[0].readAt).toBeNull()
   });

   it('should not be able to unread a non existing notification', async () => {
      const fakeNotificationsRepository = new InMemoryNotificationsRepository();
      const unreadNotification = new UnreadNotification(fakeNotificationsRepository);

      await expect(() => {
         return unreadNotification.execute({
            notificationId: 'fake-notification-id'
         });
      }).rejects.toThrow(new NotificationNotFound())
   });
});
