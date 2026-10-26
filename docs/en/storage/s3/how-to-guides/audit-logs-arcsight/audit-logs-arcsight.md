# {heading(Uploading audit logs to ArcSight SIEM and searching for events)[id=audit-logs-arcsight]}

{include(/en/_includes/_translated_by_ai_en.md)}

Using the Cloud Audit service and {var(s3)}, you can configure the transfer of {var(cloud)} platform audit logs to the ArcSight SIEM system to comply with security policy requirements (PCI DSS, GDPR, 152-FZ). The Cloud Audit service collects security events from {var(cloud)} cloud services and virtual machines — both from the management layer (who created a bucket, who changed settings) and the data layer — and sends them to ArcSight in CEF (Common Event Format).

The following data is used as an example below:

- IP address of the deployed ArcSight system instance: `192.168.1.100`
- ArcSight port for receiving messages: `514`
- Connection name: `ArcSight-Production`
- Data transfer protocol: `TCP over TLS`
- Test user address: `admin@example.com`
- Test user IP address: `203.0.113.50`

## {heading(Preparation steps)[id=audit-logs-arcsight-prepare]}

1. {linkto(../../../../access/iam/instructions/access-manage#iam-access-manage-view-user)[text=Make sure]} that you have access to the {var(cloud)} management console with one of the {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-basic)[text=basic roles]}: `Project Owner`, `Superadministrator`, `Project Administrator`, or `Viewer`.

1. Create an account for the {var(s3)} service, if this has not been done yet:
   1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.
   1. Select a project.
   1. Go to the **Object Storage** → **Accounts** section.
   1. Click the **Add Account** or **Add** button.
   1. Set the account name.
   1. Click the **Create** button.
   1. In the window that opens, copy and save the access key identifier (**Access Key ID**) and the secret key (**Secret Key**).

      {note:warn}
      After closing the window, it will be impossible to restore the secret key. If the key is lost, create a new one.
      {/note}

1. Make sure that the ArcSight SIEM system is deployed and available for network connection from {var(cloud)}.
1. Open the port of your SIEM system to receive messages from {var(cloud)}. For more details on the required settings, see the official ArcSight documentation.

   {note:warn}
   To use data encryption during transmission, prepare a TLS key in PEM format from your provider. It will be required when configuring a connection with the `TCP over TLS` protocol.
   {/note}

1. (Optional) {linkto(../../instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=Create]} a bucket in {var(s3)} if you need to store the audit log archive. To ensure log immutability, enable {linkto(../../concepts/objects-lock#s3-concepts-object-lock)[text=object lock]} in strict mode (`COMPLIANCE`).

## {heading(1. Create a SIEM connection in the management console)[id=audit-logs-arcsight-create-connection]}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to the **Monitoring → Event Log** section.
1. Click the **Settings** button and go to the **SIEM** tab.
1. Click the **Create Connection** button.
1. Specify the connection parameters:

   - **Name**: `ArcSight-Production`.
   - **Connection endpoint**: `192.168.1.100:514` — the IP address of your ArcSight SIEM system and the port opened to receive messages from {var(cloud)}.
   - **Data transfer protocol**: select `TCP over TLS` to encrypt the transmitted data.
   - **TLS key**: paste the TLS key value from your provider in PEM format.
   - **Message format**: select `CEF (Common Event Format)` — the standard format for transferring security events to SIEM systems, including ArcSight. Alternatively, the `RAW (Syslog RFC5424)` format is available.

1. (Optional) Configure message filtering so that only relevant events are sent to ArcSight:

   - **Disabled** — receive information about all events.
   - **System filters** — select events by the **Status** or **Source** parameters. Available values: `Send only selected`, `Send all except`.
   - **Custom query** — create a filter using the {linkto(../../../../monitoring-services/event-log/concepts/search-language#event-log-search-language)[text=search query language]}.

1. Click the **Create** button.
1. Wait for the connection check to complete and click the **Activate** button.

   {note:info}
   Only one SIEM connection can be active. If you activate a new connection, the previous one will be stopped. You will be able to {linkto(#event-log-activate-siem-connection)[text=activate]} the stopped connection later.
   {/note}

## {heading(2. Configure event reception in ArcSight)[id=audit-logs-arcsight-configure-arcsight]}

After the connection is activated in {var(cloud)}, events will start arriving in ArcSight in CEF format via the TCP over TLS protocol.

To receive events in ArcSight, configure SmartConnector (or a similar receiver) to listen for TCP traffic in CEF format on port `514`. The specific steps depend on the ArcSight version and are described in the Micro Focus documentation.

{note:warn}
Make sure that network rules (firewall, security groups) allow incoming TCP traffic on port `514` from {var(cloud)} IP addresses.
{/note}

## {heading(3. Configure event filtering for transfer to ArcSight)[id=audit-logs-arcsight-filter]}

To reduce the amount of transferred data and receive in ArcSight only the events relevant to compliance requirements, configure filtering using the Cloud Audit search query language.

1. Go to the **Monitoring → Event Log** section.
1. Click the **Settings** button and go to the **SIEM** tab.
1. Click ![](../../../../assets/more-icon.svg "inline") for the `ArcSight-Production` connection and select **Configure**.
1. In the **Filtering Type** section, select **Custom query** and specify a filter. For example, to transfer only events related to {var(s3)} and critical events:

   ```sql
   resource.type: "s3" OR severity >= WARNING
   ```

   Available filtering parameters:

   | Parameter | Description |
   |---|---|
   | `action` | Event type |
   | `severity` | Event severity: `DEFAULT`, `DEBUG`, `INFO`, `NOTICE`, `WARNING`, `ERROR`, `CRITICAL`, `ALERT`, `EMERGENCY` |
   | `source.id` | Event source identifier |
   | `source.address` | IP address of the event source |
   | `subject.user_id` | User identifier |
   | `subject.address` | User IP address |
   | `subject.metadata.email` | User email |
   | `resource.id` | Resource identifier |
   | `resource.type` | Resource type |
   | `resource.metadata.service_id` | Service name |
   | `resource.metadata.stream_id` | Object name |
   | `status.code` | Operation execution status code |

1. Click the **Save Changes** button.
1. Wait for the connection check to complete and click the **Activate** button.

## {heading(4. Search for suspicious activity in the event log)[id=audit-logs-arcsight-search]}

The Cloud Audit service provides a {linkto(../../../../monitoring-services/event-log/concepts/search-language#event-log-search-language)[text=search query language]} for searching for suspicious activity in the event log. Use search queries in the {var(cloud)} management console to investigate incidents identified in ArcSight or to perform independent analysis.

1. Go to the **Monitoring → Event Log** section.
1. Click the **Search and Filters** button.
1. In the search field, specify a query and click the **Find** button.

Examples of search queries for detecting suspicious activity:

{cut(Access from a new IP address)}

Find all events from the user `admin@example.com` performed from an IP address other than the expected `203.0.113.50`:

```sql
subject.metadata.email: "admin@example.com" AND subject.address <> "203.0.113.50"
```

{/cut}

{cut(Critical events and errors)}

Find all critical events and events with errors for a specific period:

```sql
severity >= ERROR AND timestamp >= "2025-01-01T00:00:00Z"
```

{/cut}

{cut(Events of a specific service)}

Find all events related to a specific service, for example IAM:

```sql
source.id=iam AND (subject.address="203.0.113.50" OR status.code=500)
```

{/cut}

{cut(Events on a specific resource)}

Find all events that occurred on the object with identifier `2278584446` from the specified IP address:

```sql
timestamp > "2025-06-02T15:04:05Z03:00" AND source.address="203.0.113.50" AND resource.metadata.stream_id="2278584446"
```

{/cut}

{note:info}
A detailed description of the filtering parameters, comparison operators, and logical operators is provided in the {linkto(../../../../monitoring-services/event-log/concepts/search-language#event-log-search-language)[text=search query language documentation]}.
{/note}

## {heading(5. Export events for reporting)[id=audit-logs-arcsight-export]}

To provide reports on compliance with security standards, export the filtered events from the log.

1. Go to the **Monitoring → Event Log** section.
1. {linkto(../../../../monitoring-services/event-log/instructions/view-event-log#event-log-filter)[text=Configure]} the contents of the list using a search query and filters.
1. (Optional) Sort the list by the event registration time.
1. Click the **Download** button.

   A TSV format file will be downloaded. The entries in the file will be arranged in the order determined by the applied search query, filters, and sorting.

   {note:warn}
   The maximum number of entries in the saved file is 1000.
   {/note}

## {heading(Verify the operation)[id=audit-logs-arcsight-check]}

1. Perform any action in {var(cloud)} — for example, {linkto(../../instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=create]} a test bucket or {linkto(../../instructions/objects/upload-object#s3-instructions-upload-object)[text=upload]} an object to an existing bucket.

1. Go to the **Monitoring → Event Log** section and make sure the new event has appeared in the log.
1. Check that the event has arrived in ArcSight: open the ArcSight ESM console and find the corresponding entry in CEF format.
1. Make sure that the event parameters (user IP address, action type, time) are displayed correctly in ArcSight.

## {heading(Delete unused resources)[id=audit-logs-arcsight-delete]}

The created resources are {linkto(../../tariffication#s3-tariffication)[text=billed]}. If you no longer need them:

1. {linkto(../../../../monitoring-services/event-log/instructions/siem-integration#event-log-delete-siem-connection)[text=Delete the SIEM connection]} `ArcSight-Production` if it is no longer needed.

1. If a bucket was created in {var(s3)} for storing archived logs, {linkto(../../instructions/buckets/manage-bucket#s3-instructions-manage-bucket-delete)[text=delete the bucket]}. Before deleting, make sure that the data stored in it is no longer needed.