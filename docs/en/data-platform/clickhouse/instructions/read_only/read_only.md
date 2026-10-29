# {heading(Taking an instance out of read-only mode)[id=clickhouse_read_only]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

{note:warn}
Only for Standalone and Standalone as part of {var(cloud)}.
{/note}

When less than 10 MB of free space remains on the disk of a Cloud ClickHouse node, {var(data-p)} automatically puts the instance into read-only mode. This prevents disk overflow and loss of database operability. A write attempt will result in an error.

In read-only mode, write operations `INSERT`, `ALTER`, `CREATE`, etc. are unavailable.

The mode applies to the entire instance, even if space has run out on only one node.

## {heading(Displaying read-only mode)[id=clickhouse_read_only_view]}

When an instance goes into read-only mode, the `Read-only` status is displayed in the **Service status** column in the **Data Platform** → **Service instances** section.

To find out which node has run out of free space, go to the **Architecture** tab of the instance.

## {heading(Taking an instance out of read-only mode)[id=clickhouse_read_only_exit]}

An instance in read-only mode automatically returns to normal mode when the disk is increased. It is recommended to increase the disk size by at least 20% of the current size to avoid quick refilling.

To take an instance out of read-only mode:

{include(../../../_includes/_data_p.md)[tags=instance_disk_resize]}

After the disk is expanded, the instance will automatically return to normal mode.