# {heading(Triggers)[id=alerting-triggers]}

## {heading(Creating a trigger)[id=alerting-triggers-add]}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Add a trigger using one of the following methods:

    - From the **Triggers** tab:
        1. Go to **Monitoring → Alerting**.
        1. Open the **Triggers** tab and click **Add**.
    - From the monitoring page:
        1. Go to **Monitoring**.
        1. In the **Alerting** section, click **Create triggers**.
1. Select a data source:

   - `Monitoring` — based on metrics from the {linkto(../../../monitoring/concepts/architecture#monitoring-architecture)[text=Cloud Monitoring]} service
   - `Logging` — based on records from the {linkto(../../../logging/concepts/about#event-log-about)[text=Cloud Logging]} service
   - `Event log` — based on events from the {linkto(../../../event-log/concepts/about#logging-about)[text=Cloud Audit]} service
Logging
1. Specify the trigger name.
1. (Optional) Click ![plus-icon](../../../../assets/plus-icon.svg "inline") **Add description** and add a trigger description.
1. Specify the trigger parameters:

   {tabs}
   {tab(Monitoring)}
   - **Resource type**: select from the list the {var(cloud)} resource type from which monitoring data is collected.
   - **Source**: select from the list a source (VM name, DB, container, etc.).
   - **Metric name**: select the required metric from the list. If the list is empty, monitoring is not enabled for the instance. {linkto(../../../monitoring/instructions/mon-setup-current#monitoring-mon-setup-current)[text=Install]} the monitoring agent on the required VM.
   - (Optional) ![plus-icon](../../../../assets/plus-icon.svg "inline") **Add label**: click the button and select the {linkto(../../../monitoring/concepts/architecture#monitoring-label)[text=label]} name and value from the lists.
   - **Trigger condition**: select a comparison operation from the list and specify the threshold value.
   - **Comparison interval**: select from the list the interval during which the condition must be met for the trigger to fire.
   {/tab}
   {tab(Logging)}
   - **Service**: select one of the {var(cloud)} services from the list.
   - **Enter a query to create a trigger**: to find the required log record, enter a query in the [search language](../../../logging/concepts/search-tools) and click **Verify query**.

     If the query is correct, a preview chart of trigger firings based on the records found will be displayed on the right side of the screen.
   {/tab}
   {tab(Event log)}
   - **Layer**: select from the list the layer from which events will be collected:
     - `Control plane` — {linkto(../../../event-log/concepts/logged-events#event-log-logged-events)[text=events]} of internal components responsible for the operation of {var(cloud)} services
     - `Data plane` — events of data processing and transfer in service components deployed by the user
   - **Product**: select one of the {var(cloud)} services from the list.
   - **Enter a query to create a trigger**: to find the required event, enter a query in the [search language](../../../logging/concepts/search-tools) and click **Verify query**.

     If the query is correct, a preview chart of trigger firings based on the records found will be displayed on the right side of the screen.
   {/tab}
   {/tabs}

1. Select an existing notification channel from the list or the `Create new channel` option. If you are creating a new notification channel, specify its parameters:

   - **Channel name**: enter a name for the channel.
   - **Notification type**: select `Email` or `SMS`.
   - **Recipient**: enter the email address or phone number of the notification recipient.

1. (Optional) Click ![plus-icon](../../../../assets/plus-icon.svg "inline") **Add channel** to add another notification channel and specify its parameters.
1. Click **Create trigger**.

## {heading(Editing a trigger)[id=alerting-triggers-edit]}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to **Monitoring → Alerting**.
1. Click ![more-icon](../../../../assets/more-icon.svg "inline") for the required trigger and select **Edit**.
1. Enter the required changes.
1. Click **Save**.

## {heading(Starting a trigger)[id=alerting-triggers-start]}

If a trigger fires more than 100 times within 24 hours, it is automatically disabled. You will receive an email with recommendations.

The most common reason for frequent trigger firings is incorrect configuration. Before starting the trigger, {linkto(#alerting-triggers-add)[text=check]} that it is configured correctly.

To start a trigger:

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to **Monitoring → Alerting**.
1. Click ![more-icon](../../../../assets/more-icon.svg "inline") for the required trigger, select **Enable**, and confirm the action.

## {heading(Deleting a trigger)[id=alerting-triggers-delete]}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to **Monitoring → Alerting**.
1. Click ![more-icon](../../../../assets/more-icon.svg "inline") for the required trigger and select **Delete**.
1. Confirm the deletion.
