/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import { Content } from "../entities/content";
import { Notification } from "../entities/notification";
import { NotificationRepository } from "../repositories/notifications-repository";

interface SendNotificationRequest {
   recipientId: string;
   content: string;
   category: string;
}

interface SendNotificationResponse {
   notification: Notification;
}

@Injectable()
export class SendNotification {
   constructor(private readonly notificationRepository: NotificationRepository) {}

   async execute(request: SendNotificationRequest): Promise<SendNotificationResponse> {
      const { category, content, recipientId } = request;

      const notification = new Notification({
         category,
         content: new Content(content),
         recipientId
      });

      await this.notificationRepository.create(notification);

      return { notification };
   }
}
