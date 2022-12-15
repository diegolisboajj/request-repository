/* eslint-disable prettier/prettier */

import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notifications';

describe('Count recipients notifications', () => {
   it('should be able to count notifications by ', async () => {
      const fakeNotificationsRepository = new InMemoryNotificationsRepository();
      const countRecipientNotifications = new CountRecipientNotification(fakeNotificationsRepository);

      await fakeNotificationsRepository.create(
         makeNotification({ recipientId: 'example-recipient-id'})
      )

      await fakeNotificationsRepository.create(
         makeNotification({ recipientId: 'example-recipient-id'})
      )

      await fakeNotificationsRepository.create(
         makeNotification({ recipientId: 'another-example-recipient-id'})
      )

      const { count } = await countRecipientNotifications.execute({
         recipientId: 'example-recipient-id'
      });

      expect(count).toEqual(2);
   });
});
