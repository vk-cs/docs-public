The search language allows you to:

- search by one or more filter expressions,
- apply logical and comparison operations.

To filter logs, use the filter parameters in the search field:

[cols="1,1,3,2", options="header"]
|===
| Parameter
| Format
| Description
| Example

| `message`
| `message: "<VALUE>"`
| Search for records that have the specified values in their messages. It is a default parameter, you do not need to specify it in the request
| `message: "Hello world!"`

| `timestamp`
| `timestamp <COMPARISON_OPERATOR> "<VALUE>"`
| Search for records sent in a given time interval
| `timestamp >= "2022-04-10T00:00:00Z"`

| `level`
| `level <COMPARISON_OPERATOR> <VALUE>`
| Search for records with specified logging levels. Available logging levels are `DEBUG`, `INFO`, `WARN`, `ERROR`, `CRITICAL`
| `level = INFO`

| `json_payload`
| `json_payload: <VALUE>`
| Search for records whose `json_payload` text contains specified values. Instead of `json_payload`, you can use a shortened version `payload`
| `json_payload: warning`

| `json_payload.field.search`
| `json_payload.<FIELD>: <VALUE>`
| Lexicographic search of records by the `json_payload` elements. The `json_payload` prefix can be omitted if the root element of the tree does not match any of the parameters. Instead of `json_payload`, you can use a shortened version `payload`.

You can check whether an element exists in `json_payload` using the `EXISTS` operator, for example: `json_payload.result EXISTS`. This filter will output records that have a result element in their `json_payload`
| `json_payload.status: created`
|===

{note:warn}
If you do not specify an expression with fields in the search, then by default the search will be based on a substring in the `message` field.
{/note}

## Requirements

1. The characters `"`, `'` and `＼` in an expression are escaped using `＼`.
1. The value does not need to be enclosed in quotes:

   - if it starts with a letter of the Latin alphabet and contains only letters of the Latin alphabet, numbers and underscores;
   - if it is an unsigned integer.

1. Available values for `timestamp`: RFC3339.

## Comparison operators

[cols="1,2", options="header"]
|===
| Operator
| Decoding

| `=`
| Equal

| `<>`
| Not equal

| `>`
| Greater than

| `<`
| Less than

| `<=`
| Less than or equal to

| `>=`
| Greater than or equal to

| `:`
| Contains
|===

## Filters with multiple conditions

You can combine several conditions in one filter using logical operators:

- `AND`
- `OR`
- `NOT`

## The order of calculations

Use parentheses to specify a specific order of calculations:

```sql
PARAMETER_1: "VALUE_1" AND (PARAMETER_2 = "VALUE_2" OR PARAMETER_3 < "VALUE_3")
```
