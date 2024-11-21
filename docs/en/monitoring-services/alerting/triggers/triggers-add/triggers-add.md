Trigger defines a rule that applies to the metric value and notification condition.

The trigger has a comparison interval. If set, the metric value must satisfy the condition during that interval for an incident to be created.

To create a trigger:

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Go to the **Monitoring → Alerts** section.
1. Open the **Triggers** tab, click the **Add** button.
1. Set the trigger parameters:

   - **Trigger name**: enter a name for the trigger.
   - **Resource type**: select the resource type from the list.
   - **Source**: select the source (name of VM, DB, container, etc.) from the list.
   - **Metric name**: select the metric from the list.
   - **Trigger trigger condition**: select the operation from the list and specify the threshold value.
   - **Comparison interval**: select from the list the interval during which the condition must be met for the trigger to work.

1. Click the **Next step** button.
1. Click the **Add channel** button.
1. In the window that appears, select an existing channel from the list or select the **Create new channel** option.
1. (Optional) Specify the parameters of the new notification channel:

   - **Channel name**: enter a name for the channel.
   - **Notification type**: select the `Email` or `SMS` option.
   - **Recipient**: enter the email address or phone number of the notification recipient.

1. Click the **Add channel** button.
1. Click the **Create trigger** button.
