In this article, we'll show you how to set up your first exporter to export data to S3 compatible storage. We will use S3 storage in the VK CS cloud as an S3 compatible storage, and an emulator as the data source for export.

To export a data stream to object storage, you need to:

1. Set up access to the object storage.
2. Create an exporter.
3. Create a rule.
4. Assign the rule to the emulator.

## Configuring access to object storage

To configure access to object storage, follow these steps:

1. In your VK CS personal account, go to the "Object storage" section.
2. Create a new private bucket called `s3_exporter`.
3. Create a new account and remember the given Access Key ID and Secret Key.

## Creating an exporter in IoT

1. Go to the Exporters page.
2. Click the "Add Exporter" button.
3. Specify the following values ​​in the form fields:
    - Identifier: s3
    - Name: s3
    - Description: S3 exporter
    - Exporter type: s3

4. Click Next Step.
5. Specify the following values ​​in the form fields:

    - CONNECTION_URL_STRING: hb.bizmrg.com
    - BUCKET: s3_exporter
    - REGION: ru-msk
    - SSL: 1
    - ACCESS_KEY_ID: previously received Access Key ID
    - SECRET_ACCESS_KEY: previously acquired Secret Key
    - MAX_BULK_INSERT_SIZE: 100
    - PERIOD_BETWEEN_RETRIES: 5s
    - FORMAT: jsonl
    - BULK_INSERT_TIMEOUT: 1m

6. Click Save.

## Creating rules in IoT

1. Go to the "Rules" page.
2. Click Add Rule.
3. Specify the following values ​​in the form fields:

    - Title: Export to S3
    - Identifier: export_s3
    - Rule type: reactive
    - Rule active: Yes

4. Click on the "Next step" button.
5. Fill in the following code in the rule body:

```python
from coiiot_sdk import exporters, context, user_logs

logger = user_logs.get_logger()
exporter = exporters.get_by_name("s3")
ctx = context.current()

logger.info("sending event into s3 storage")
try:
    exporter.send({
        "tag": ctx.tag.full_name,
        "value": ctx.msg.value,
        "timestamp": ctx.msg.timestamp,
    })
except Exception as e:
    logger.error("failed to send event into s3 storage")
else:
    logger.info("successfully sent event into s3 storage")
```

6. Click Add.

## Assign rule to emulator

1. Go to the Devices page.
2. Select an emulator from the list.
3. Click the "General structure" tab.
4. For the temperature sensor, select "Edit".
5. In the "Stream Processing Rules" field, add the _export_s3_ rule.
6. Click Save.

Now, with each temperature measurement from the emulator, a rule will be triggered that will export data to object storage. On the Logging → Rule Logs page, you can see how the rule is executed.

With the emulator enabled, the files in the S3 bucket should appear in a few minutes.
