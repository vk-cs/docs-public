The search query language allows you to:

- search using one or more filter expressions;
- apply logical operations and comparison operations.

{ifdef(public,private,private-pg)}
To filter logs, use filter parameters in the search bar.
{/ifdef}

{includetag(event-log)}
{ifdef(private-pdf,private-pg-pdf,private-cert)}
To filter logs, use the filter parameters in the search bar listed in {linkto(#tab_search_filter_options_audit)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_search_filter_options_audit]} — Search filter parameters)[align=right;position=above;id=tab_search_filter_options_audit;number={const(numb_tab_search_filter_options_audit)}]}{/ifdef}
[cols="1,3", options="header"]
|===
|Parameter
|Description

|`event_id`
|Unique event identifier

|`timestamp`
|Event occurrence time, [RFC3339](https://www.ietf.org/rfc/rfc3339.txt).

Example: 2006-01-02T15:04:05Z07:00

|`action`
|Event type

|`request_id`
|Request identifier, used to link to Cloud Logging

|`severity`
|Event severity. Available values: `DEFAULT`,`DEBUG`, `INFO`, `NOTICE`, `WARNING`, `ERROR`, `CRITICAL`, `ALERT`, `EMERGENCY`

|`message`
|Human-readable event description

|`source.id`
|Event source identifier

|`source.address`
|IP address of the event source

|`subject.user_id`
|Subject identifier — the user whose actions are associated with the event

|`subject.address`
|User IP address

|`subject.project_id`
|Project identifier in OpenStack

|`subject.metadata`
|Additional metadata identifying the user.

For example: `subject.metadata.email` — user's email

|`resource.id`
|Resource identifier in OpenStack or similar

|`resource.type`
|Resource type

|`resource.metadata`
|Additional metadata identifying the resource.

For example:

- `resource.metadata.service_id` — service name (`DBaaS`);
- `resource.metadata.group_id` — subservice name (`Redis`);
- `resource.metadata.stream_id` — the name of the object where the resource is located (`DB_id`)

|`status.code`
|Operation execution status code.

For example, an [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) code or a [gRPC](https://developers.google.com/maps-booking/reference/grpc-api/status_codes) code

|`status.message`
|Description of the operation execution status

|`labels`
|Labels used to search for events
|===
{ifdef(private-pdf,private-pg-pdf,private-cert)}
{/caption}{/ifdef}
{/includetag}

{includetag(logging)}
{ifdef(private-pdf,private-pg-pdf,private-cert)}
To filter logs, use the filter parameters in the search bar listed in {linkto(#tab_search_filter_options)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_search_filter_options]} — Search filter parameters)[align=right;position=above;id=tab_search_filter_options;number={const(numb_tab_search_filter_options)}]}{/ifdef}
[cols="1,1,3,2", options="header"]
|===
|Parameter
|Format
|Description
|Example

|`message`
|`message: "value"` 
|Search for entries that contain the specified values in their messages. This is the default parameter and may be omitted in the query 
|`message: "Hello world!"`

|`timestamp`
|`timestamp <COMPARISON_OPERATOR> "<VALUE>"`
|Search for entries sent within a given time range
|`timestamp >= "2022-04-10T00:00:00Z"`

|`level`
|`level <COMPARISON_OPERATOR> <VALUE>`
|Search for entries with the specified logging levels. Available logging levels — `DEBUG`, `INFO`, `WARN`, `ERROR`, `CRITICAL` 
|`level = INFO`

| `json_payload`
| `json_payload: <VALUE>`
| Full-text search for entries whose `json_payload` contains the specified values. You can use the abbreviation `payload` instead of `json_payload`
| `json_payload: warning`

| `json_payload.field.search`
| `json_payload.<FIELD>: <VALUE>`
| Lexicographic search for entries by `json_payload` elements. The `json_payload` prefix can be omitted if the root element of the tree does not match any of the parameters. You can use the abbreviation `payload` instead of `json_payload`.

You can check whether an element exists in `json_payload` using the `EXISTS` operator: `json_payload.result EXISTS`. Such a filter will return entries whose `json_payload` contains the `result` element
| `json_payload.status: created`

{ifdef(private,private-pg,private-pdf,private-pg-pdf)}
|`stream_id`
|`stream_id: "<RESOURCE_IDENTIFIER>"`
|Search by resource identifier (database, VM, Kubernetes cluster)
|`stream_id: "4dd2038a-2c88-45df-8e4d-64e0e1bfe82f"`
{/ifdef}

|===
{ifdef(private-pdf,private-pg-pdf,private-cert)}
{/caption}{/ifdef}
{/includetag}

To filter the list of entries in the log, use `<PARAMETER_NAME>`/`<PARAMETER_VALUE>` pairs in the search bar. 

{note:info}
If you enter only the parameter value without its name in the search bar, entries will be filtered by the occurrence of this value in the `message` parameter.
{/note}

{includetag(event-log)}
## {heading(Search features)[id=event-log-search-lang-prop]}
{/includetag}

{includetag(logging)}
## {heading(Search features)[id=logging-search-tools-prop]}
{/includetag}

1. The characters `"`, `'`, and `＼` in the search bar are escaped using `＼`.
1. A value may be used without quotes if it:

    - starts with a Latin letter and contains only Latin letters, digits, and underscores;
    - is an unsigned integer.

1. Time value format: [RFC3339](https://www.ietf.org/rfc/rfc3339.txt).
   {includetag(event-log)}
1. All values in nested objects are treated as strings and compared in lexicographic order.
1. Search by array parameters is supported using the `:`, `=`, `<>` operators.
{/includetag}

{includetag(event-log)}
## {heading(Comparison operators)[id=event-log-search-lang-operators]}
{/includetag}

{includetag(logging)}
## {heading(Comparison operators)[id=logging-search-tools-operators]}
{/includetag}

{includetag(event-log)}
{ifdef(private-pdf,private-pg-pdf,private-cert)}
Comparison operators are listed in {linkto(#tab_comparison_operators_audit)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_comparison_operators_audit]} — Comparison operators)[align=right;position=above;id=tab_comparison_operators_audit;number={const(numb_tab_comparison_operators_audit)}]}{/ifdef}
{/includetag}
{includetag(logging)}
{ifdef(private-pdf,private-pg-pdf,private-cert)}
Comparison operators are listed in {linkto(#tab_comparison_operators)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_comparison_operators]} — Comparison operators)[align=right;position=above;id=tab_comparison_operators;number={const(numb_tab_comparison_operators)}]}{/ifdef}
{/includetag}
[cols="1,2,2", options="header"]
|===
|Operator
|Description
|Example

|`=`
|Equal to
|`message="SEARCH_TEXT"`

|`<>`
|Not equal to
|`message<>"SEARCH_TEXT"`

|`>`
|Greater than
{includetag(event-log)}
|`severity > DEBUG`
{/includetag}
{includetag(logging)}
|`level > DEBUG`
{/includetag}

|`<`
| Less than
{includetag(event-log)}
|`severity < DEBUG`
{/includetag}
{includetag(logging)}
|`level < DEBUG`
{/includetag}

|`>=`
|Greater than or equal to
|`timestamp >= "2023-04-10T10:20:00Z"`

|`<=`
|Less than or equal to
|`timestamp <= "2023-04-10T10:20:00Z"`

|`:`
|Contains
|`message: "SEARCH_TEXT"`
|===
{ifdef(private-pdf,private-pg-pdf,private-cert)}
{/caption}{/ifdef}

{includetag(event-log)}
## {heading(Logical operators)[id=event-log-search-lang-filters]}
{/includetag}
{includetag(logging)}
## {heading(Logical operators)[id=logging-search-tools-filters]}
{/includetag}

{ifdef(public,private,private-pg)}
You can combine several conditions in a single filter using logical operators.
{/ifdef}

{includetag(event-log)}
{ifdef(private-pdf,private-pg-pdf,private-cert)}
You can combine several conditions in a single filter using logical operators ({linkto(#tab_logical_union_operators_audit)[text=table %number]}).

{caption(Table {counter(table)[id=numb_tab_logical_union_operators_audit]} — Logical operators)[align=right;position=above;id=tab_logical_union_operators_audit;number={const(numb_tab_logical_union_operators_audit)}]}{/ifdef}
{/includetag}
{includetag(logging)}
{ifdef(private-pdf,private-pg-pdf,private-cert)}
You can combine several conditions in a single filter using logical operators ({linkto(#tab_logical_union_operators)[text=table %number]}).

{caption(Table {counter(table)[id=numb_tab_logical_union_operators]} — Logical operators)[align=right;position=above;id=tab_logical_union_operators;number={const(numb_tab_logical_union_operators)}]}{/ifdef}
{/includetag}
[cols="1,2,2", options="header"]
|===
|Operator
|Description
|Example

|`AND`
|Satisfies all conditions
|`service_id=databases AND severity=ERROR`

|`OR`
|Satisfies at least one condition
|`severity=ERROR OR status.code=500`

|`NOT`
|Does not satisfy this condition
|`NOT message: hello`

|`EXIST`
|The entry contains this parameter
|`subject.metadata.email EXIST`
|===
{ifdef(private-pdf,private-pg-pdf,private-cert)}
{/caption}{/ifdef}

{includetag(event-log)}
## {heading(Order of evaluation)[id=event-log-search-lang-order]}
{/includetag}
{includetag(logging)}
## {heading(Order of evaluation)[id=logging-search-tools-order]}
{/includetag}

Use parentheses to set a specific order of evaluation, for example:

```sql
PARAMETER_1: "VALUE_1" AND (PARAMETER_2 = "VALUE_2" OR PARAMETER_3 "VALUE_3")
```
In this example, entries will be found in which the `PARAMETER_1` parameter contains the substring `"VALUE_1"` and at least one of the two conditions is met:

- The value of the `PARAMETER_2` parameter is equal to `"VALUE_2"`.
- The value of the `PARAMETER_3` parameter is less than `"VALUE_3"` in the lexicographic sense.

{includetag(event-log)}
{ifdef(public)}
## {heading(Expression examples)[id=event-log-search-lang-examples]}

[cols="1,1", options="header"]
|===
|Expression
|Search result

|`source.id=iam AND (subject.address="127.0.0.1" OR status.code=500)`
|All IAM service events that occurred with the user at IP address `127.0.0.1` or that caused error code 500

|`severity=CRITICAL AND subject.metadata.email: "@example.ru"`
|All critical events that occurred for users with the `example.ru` email domain

|`timestamp > "2023-06-02T15:04:05Z03:00" AND source.address="127.0.0.1" AND resource.metadata.stream_id="2278584446"`
|All events that occurred on the object named `2278584446` from IP address `127.0.0.1` after 15:04:05 on June 2, 2023. The time is given for the UTC+3 time zone
|===
{/ifdef}
{/includetag}
