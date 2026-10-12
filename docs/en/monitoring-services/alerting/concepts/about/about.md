# {heading(About the service)[id=alerting-about]}

Cloud Alerting is a service that lets you configure notifications about events that require attention in {var(cloud)} monitoring services. Notifications help you respond promptly to changes in the state of cloud resources and prevent disruptions in your applications.

For example, a notification about increased CPU utilization will help you determine that a VM is overloaded with tasks, and a notification about assigning the administrator role to an unknown user will help you detect and stop unwanted access to your infrastructure in time.

Cloud Alerting records the occurrence of an event using _triggers_ and then sends a notification via SMS or email.

You can {linkto(../../instructions/triggers#alerting-triggers)[text=configure]} trigger firing based on the following sources:

- Based on metric values from the {linkto(../../../monitoring/concepts/architecture#monitoring-architecture)[text=Cloud Monitoring]} service. Metrics are collected from a specific resource (for example, a VM or DB). Metric values can be retrieved by querying the monitoring [API](/ru/tools-for-using-services/api/api-spec/monitoring-api "change-lang") using PromQL.
- Based on records from the {linkto(../../../logging/concepts/about#logging-about)[text=Cloud Logging]} service. Records are collected from resources within a specific {var(cloud)} service, and that service acts as the data source for the trigger. The trigger condition is specified in the [search language](../../../logging/concepts/search-tools).
- Based on events from the {linkto(../../../event-log/concepts/about#event-log-about)[text=Cloud Audit]} service. Events are collected from the control plane or the data plane of a {var(cloud)} service. The trigger condition is specified in the [search language](../../../logging/concepts/search-tools).

Triggers based on metric values let you track changes in a resource’s numeric indicators, for example, a drop in VM performance or DB access speed. Triggers based on records and events let you respond quickly to incidents by receiving a notification about a specific event recorded in logs or in the audit log. Such triggers are useful for infrastructure administrators and security specialists to quickly detect anomalies and incidents without manually analyzing logs.
