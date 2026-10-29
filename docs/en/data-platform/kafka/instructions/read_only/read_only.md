# {heading(Taking an instance out of read-only mode)[id=kafka_read_only]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

If less than 10% of free space remains on the disk of at least one Cloud Kafka broker, {var(data-p)} automatically switches the instance to read-only mode. This prevents disk overflow and helps maintain cluster operability. When attempting to publish messages, an error will occur and writing to topics will fail.

In read-only mode:

- Writing messages to topics is unavailable;
- Reading messages is available.

The mode applies to the entire instance, even if space has run out on only one broker.

## {heading(Displaying read-only mode)[id=kafka_read_only_view]}

When an instance switches to read-only mode, the `Read-only` status will be displayed in the **Service status** column for the service instance in the **Data Platform** → **Service instances** section.

You can find out on which broker's disk the free space has run out in the **Data Platform** → **Service instances** section on the **Architecture** tab.

## {heading(Taking an instance out of read-only mode)[id=kafka_read_only]}

To take an instance out of read-only mode, increase the disk sizes for the brokers:

{include(../../../_includes/_data_p.md)[tags=instance_disk_resize]}