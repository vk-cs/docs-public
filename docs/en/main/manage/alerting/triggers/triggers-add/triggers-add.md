Trigger - defines a rule that applies to the metric value and notification condition.

The trigger has a comparison interval. If it is set, then the metric value must fall under the condition during this interval in order for an incident to be created.

To create a trigger:
1. Go to the "Alerting" page in the "Monitoring" section.
2. On the "Triggers" tab, click on the "Add Trigger" button.
3. Fill in all the necessary fields:
    - Give a name to the trigger.
    - Select the resource type: virtual machine or database.
    - Select the source and metric.
    - Set the trigger conditions.
    - Select the comparison interval.
4. Click "Next Step". Here you need to select the notification channel.
5. Click on the "+ Add Channel" button.
6. In the window that appears, select an existing channel from the suggested list or create a new one:
    - Give it a name.
    - Select the type of notification: phone or email.
    - Enter the recipient's email or phone number.
    7. Click on the "Add Channel" button.
8. Then click "Create Trigger".