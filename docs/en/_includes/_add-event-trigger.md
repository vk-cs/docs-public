{includetag(alerting)}
1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Go to the **Monitoring → Logging** section.
1. {linkto(../../../logging/instructions/view-logs#logging-view-logs)[text=Find]} the required event.
1. Add a trigger using one of the following methods:

    - In the `Stream` view, click ![more-icon](../../../../assets/more-icon.svg "inline") for the required log and select **Create alert**.
    - In the `Table` view, click the required log, then click the **Create trigger** button on the panel that opens.
1. Specify the trigger name.
1. (Optional) Edit the query using the {linkto(../../../logging/concepts/search-tools#logging-search-tools)[text=search query language]}.
1. Click the **Verify query** button.

   If the query is correct, a preview chart of trigger firings based on the records found will be displayed on the right side of the screen.

1. Select an existing notification channel from the list or the `Create new channel` option. If you are creating a new notification channel, specify its parameters:

   - **Channel name**: enter a name for the channel.
   {ifdef(public)}
   - **Notification type**: select `Email` or `SMS`.
   {/ifdef}
   - **Recipient**: enter the email address or phone number of the notification recipient.

1. (Optional) Click ![plus-icon](../../../../assets/plus-icon.svg "inline") **Add channel** to add another notification channel and specify its parameters.
1. Click the **Create trigger** button.
{/includetag}
{includetag(logging)}
1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Go to the **Monitoring → Logging** section.
1. {linkto(#logging-filter)[text=Find]} the required event.
1. Add a trigger using one of the following methods:

    - In the `Stream` view, click ![more-icon](../../../../assets/more-icon.svg "inline") for the required log and select **Create alert**.
    - In the `Table` view, click the required log, then click the **Create trigger** button on the panel that opens.
1. Enter the trigger name.
1. (Optional) Edit the query using the {linkto(../../../logging/concepts/search-tools#logging-search-tools)[text=search query language]}.
1. Click the **Verify query** button.

   If the query is correct, a preview chart of trigger firings based on the records found will be displayed on the right side of the screen.

1. Select an existing notification channel from the list or the `Create new channel` option. If you are creating a new notification channel, specify its parameters:

   - **Channel name**: enter a name for the channel.
   {ifdef(public)}
   - **Notification type**: select `Email` or `SMS`.
   {/ifdef}
   - **Recipient**: enter the email address or phone number of the notification recipient.

1. (Optional) Click ![plus-icon](../../../../assets/plus-icon.svg "inline") **Add channel** to add another notification channel and specify its parameters.
1. Click the **Create trigger** button.
{/includetag}
