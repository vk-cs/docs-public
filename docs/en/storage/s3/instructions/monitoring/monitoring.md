# {heading(Monitoring)[id=s3-instructions-monitoring]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Viewing the event log)[id=s3-instructions-monitoring-view]}

IAM Only maintains an event log using the Cloud Logging service.

To view the event log in your management console, go to the **Monitoring** → **Event log** section.

To view detailed information about an event, click on the entry in the log table.

To refresh the event log, click the **Refresh** button.

To download the event log as a single file, click the **Download** button.

{note:info}
The file may contain up to 1000 entries.
{/note}

## {heading(Filtering events)[id=s3-instructions-monitoring-filter]}

1. Go to the **Monitoring** → **Event log** section.
1. Click the **Search and filters** button.
1. In the filter area, specify one or more filter values:

   - **Status** — filter by log status.
   - **Product** — filter by product.
   - A fixed time period for which events should be displayed in the log. It can take the following values: `5 minutes`, `15 minutes`, `Hour`, `Day`, or `3 days`.
   - A custom time period for which events should be displayed in the log. Set it manually or using the calendar.

1. Click the **Find** button.

## {heading(Searching for events)[id=s3-instructions-monitoring-search]}

1. Go to the **Monitoring** → **Event log** section.
1. Click the **Search and filters** button.
1. In the search field, enter a query (for more details, see the section {linkto(#s3-instructions-monitoring-language)[text=%text]}).
1. Click the **Find** button.

## {heading(Search query language)[id=s3-instructions-monitoring-language]}

The search query language allows you to:

- search by one or more filter expressions;
- apply logical operations and comparison operations.

To filter event logs, use the filter parameters listed in {ifndef(s3-pdf)}the table below.{/ifndef}{ifdef(s3-pdf)}{linkto(#tab_search_filter_options)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_search_filter_options]} — Search filter parameters)[align=right;position=above;id=tab_search_filter_options;number={const(numb_tab_search_filter_options)}]}
{/ifdef}
[cols="1,1,3", options="header"]
|===
|Parameter
|Format
|Description

|`message`
|`message: "<VALUE>"`
|Search for entries whose messages contain the specified values. This is the default parameter and can be omitted in the query

|`timestamp`
|`timestamp <COMPARISON_OPERATOR> "<VALUE>"`
|Search for entries sent within the specified time range

|`level`
|`level <COMPARISON_OPERATOR> <LOGGING_LEVEL>`
|Search for entries with the specified logging levels. Available logging levels are `DEBUG`, `INFO`, `WARN`, `ERROR`, `CRITICAL`

|`payload`
|`payload: "<VALUE>"`
|Search by entry text whose payload contains the specified values

|`payload.field.search`
|`payload.<field>: "<VALUE>"`
|Lexicographic search of entries by `payload` elements. The `payload` prefix can be omitted if the root element of the tree does not match any of the parameters. You can check for the existence of an element in the `payload` using the `EXISTS` operator: `json_payload.result EXISTS`. Such a filter will return entries whose `payload` contains the `result` element

|`stream_id`
|`stream_id: "<RESOURCE_ID>"`
|Search by resource ID (database, VM, Kubernetes cluster)
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

To filter entries by multiple values of the same parameter, list the values one after another.

{note:info}
If no field is specified in the search, the search will be performed on the string in the `message` field.
{/note}

### {heading(Requirements)[id=s3-instructions-monitoring-requirements]}

1. The `"`, `'`, and `\` characters in an expression are escaped using `\`.
1. The value can be left unquoted if it:

   - Starts with a Latin alphabet letter and contains only Latin alphabet letters, digits, and underscores.
   - Is an unsigned integer.

1. Values for `timestamp` are provided in the `RFC3339` format (for more details, see the [official documentation](https://www.ietf.org/rfc/rfc3339.txt)).

### {heading(Comparison operators)[id=s3-instructions-monitoring-comparison]}

{ifdef(s3-pdf)}
Comparison operators are listed in {linkto(#tab_comparison_operators)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_comparison_operators]} — Comparison operators)[align=right;position=above;id=tab_comparison_operators;number={const(numb_tab_comparison_operators)}]}
{/ifdef}
[cols="1,1", options="header"]
|===
|Operator
|Description

|`=`
|Equal to

|`<>`
|Not equal to

|`>`
|Greater than

|`<`
|Less than

|`>=`
|Greater than or equal to

|`<=`
|Less than or equal to

|`:`
|Contains
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

### {heading(Filters with multiple conditions)[id=s3-instructions-monitoring-multiple-filters]}

You can combine multiple conditions in a single filter using logical operators:

- `AND`,
- `OR`,
- `NOT`.

Use parentheses to specify a particular order of evaluation:

Example:

```console
<PARAMETER_1>: "<VALUE_1>" AND (<PARAMETER_2> = "<VALUE_2>" OR <PARAMETER_3> "<VALUE_3>")
```

In this example, entries will be found where the `<PARAMETER_1>` parameter contains the `"<VALUE_1>"` value and at least one of the two conditions is met:

1. The value of the `<PARAMETER_2>` parameter equals `"<VALUE_2>"`.
1. The value of the `<PARAMETER_3>` parameter is less than `"<VALUE_3>"` in the lexicographic sense.