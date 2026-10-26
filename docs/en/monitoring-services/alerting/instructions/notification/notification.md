# {heading(Notification channels)[id=alerting-notification]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Creating a notification channel)[id=alerting-notification-add]}

To receive incident notifications, you need to configure a notification channel. A notification channel contains information about the recipient and delivery methods.

{note:info}
You can specify multiple notification channels. A single channel can be reused in multiple triggers.
{/note}

To create a notification channel:

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Navigate to the **Monitoring → Alerting** section.
1. Open the **Notification channels** tab.
1. Click **Add**.
1. Configure the notification channel parameters:

   - **Channel name**: enter a name for the channel.
   {ifdef(public)}
   - **Notification type**: select the `Email` or `SMS` option.
   {/ifdef}
   - **Recipient**: enter the email address or phone number of the notification recipient.

1. Click **Create channel**.

## {heading(Editing a notification channel)[id=alerting-notification-edit]}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Navigate to the **Monitoring → Alerting** section.
1. Open the **Notification channels** tab.
1. Click ![more-icon](../../../../assets/more-icon.svg "inline") for the desired channel and select **Edit**.
1. Make the necessary changes.
1. Click **Save channel**.

## {heading(Deleting a notification channel)[id=alerting-notification-delete]}

{note:info}
Before deleting a channel, {linkto(../triggers#alerting-triggers-delete)[text=delete]} all triggers associated with it.
{/note}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Navigate to the **Monitoring → Alerting** section.
1. Open the **Notification channels** tab.
1. Click ![more-icon](../../../../assets/more-icon.svg "inline") for the desired channel and select **Delete**.
1. Confirm the deletion.
