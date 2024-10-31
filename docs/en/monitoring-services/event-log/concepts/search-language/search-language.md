The search language allows you to:

- Filter the list of event log entries by one or more parameters;
- Apply logical and comparison operations in filter expressions.

Filtering is available by the following parameters:

[cols="1,3", options="header"]
|===
|Parameter
|Description

|`event_id`
|The unique event identifier

|`timestamp`
|The event occurrence time, [RFC3339](https://www.ietf.org/rfc/rfc3339.txt).

Example: 2006-01-02T15:04:05Z07:00

|`action`
|The event type

|`request_id`
|The request ID used to communicate with Cloud Logging

|`severity`
|The event severity. Available values: `DEFAULT`,`DEBUG`, `INFO`, `NOTICE`, `WARNING`, `ERROR`, `CRITICAL`, `ALERT`, `EMERGENCY`

|`message`
|The human-readable description of the event

|`source.id`
|The event source identifier

|`source.address`
|The IP address of the event source

|`subject.user_id`
|The identifier of the user whose actions are associated with the event

|`subject.address`
|The IP address of the user

|`subject.project_id`
|The project ID in OpenStack

|`subject.metadata`
|Additional metadata identifying the user.

Example: the `subject.metadata.email` parameter is the user's email

|`resource.id`
|The OpenStack resource ID or similar

|`resource.type`
|The resource type

|`resource.metadata`
|Additional metadata that defines the resource.

For example:

- `resource.metadata.service_id` — service name (`DBaaS`)
- `resource.metadata.group_id` — subservice name (`Redis`)
- `resource.metadata.stream_id` — name of the object where the resource is located (`DB_id`)

|`status.code`
|The status code of operation execution.

For example, [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) or [gRPC](https://developers.google.com/maps-booking/reference/grpc-api/status_codes)

|`status.message`
|The status description of operation execution

|`labels`
|The tags to search for events
|===

To filter the list of log entries, use the `<PARAMETER_NAME>/<PARAMETER_VALUE>` pairs in the search string. To filter entries by multiple values of one parameter, list the values one after another.

<info>

If you specify only the parameter value without its name in the search line, the entries will be filtered by the existence of this value in the `message` parameter.

</info>

## Search features

1. `"`, `'`, and `＼` characters in the search string are escaped with `＼`.
1. The value does not need to be quoted if it:

   - Starts with a Latin letter and contains only Latin letters, numbers, and underscores.
   - Is an unsigned integer.
1. Time value format: [RFC3339](https://www.ietf.org/rfc/rfc3339.txt).
1. All values in nested objects are treated as strings and compared in lexicographic order.
1. Search by array parameters is supported using the `:`, `=`, `<>` operators.

## Comparison operators

[cols="1,2,2", options="header"]
|===
|Operator
|Description
|Example

|`=`
|Equal
|`message="search string"`

|`<>`
|Not equal
|`message<>"search string"`

|`>`
|More
|`severity > DEBUG`

|`<`
| Less
|`severity < DEBUG`

|`>=`
|More or less
|`timestamp >= "2023-04-10T10:20:00Z"`

|`<=`
|Less or more
|`timestamp <= "2023-04-10T10:20:00Z"`

|`:`
|Include
|`message: "строка"`
|===

## Logical operators

You can combine multiple conditions in one filter expression using logical operators:

[cols="1,2,2", options="header"]
|===
|Operator
|Description
|Example

|`AND`
|Meets all conditions
|`service_id=databases AND severity=ERROR`

|`OR`
|Meets at least one condition
|`severity=ERROR OR status.code=500`

|`NOT`
|Does not meet this condition
|`NOT message: hello`

|`EXIST`
|This parameter is exist
|`subject.metadata.email EXIST`
|===

## Calculation order

Use parentheses to specify a specific order of evaluation, for example:

```sql
parameter1: "value1" AND (parameter2 = "value2" OR parameter3 < "value3")
```
This example will find records where `parameter1` contains the substring `"value1"` and at least one of the following conditions is met:

- The value of `parameter2` is equal to `"value2"`.
- The value of `parameter3` is less than `"value3"` in the lexicographic order.

## Examples of expressions

[cols="1,1", options="header"]
|===
|Expression
|Search result

|`source.id=iam AND (subject.address="127.0.0.1" OR status.code=500)`
|All IAM service events that occurred to a user at the `127.0.0.1` IP address or that resulted in the 500 error code

|`severity=CRITICAL AND subject.metadata.email: "@example.ru"`
|All critical events that occurred for users with the `example.ru` mail domain

|`timestamp > "2023-06-02T15:04:05Z03:00" AND source.address="127.0.0.1" AND resource.metadata.stream_id="2278584446"`
|All events that occurred on the `2278584446` object at the `127.0.0.1` IP address after 15:04:05 on June 2, 2023. The time is specified for the UTC+3 time zone
|===
