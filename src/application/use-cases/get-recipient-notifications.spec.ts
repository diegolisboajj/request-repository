/* eslint-disable prettier/prettier */

import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotification } from './get-recipient-notifications';

describe('Count recipients notifications', () => {
   it('should be able to count notifications by ', async () => {
      const fakeNotificationsRepository = new InMemoryNotificationsRepository();
      const getRecipientNotifications = new GetRecipientNotification(fakeNotificationsRepository);

      await fakeNotificationsRepository.create(
         makeNotification({ recipientId: 'example-recipient-id' })
      )

      await fakeNotificationsRepository.create(
         makeNotification({ recipientId: 'example-recipient-id' })
      )

      await fakeNotificationsRepository.create(
         makeNotification({ recipientId: 'another-example-recipient-id' })
      )

      const { notifications } = await getRecipientNotifications.execute({
         recipientId: 'example-recipient-id'
      });

      expect(notifications).toHaveLength(2);
      expect(notifications).toEqual(expect.arrayContaining([
         expect.objectContaining({ recipientId: 'example-recipient-id' }),
         expect.objectContaining({ recipientId: 'example-recipient-id' }),
      ]))
   });
});
