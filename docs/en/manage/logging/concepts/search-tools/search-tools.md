The search language allows you to:

- search by one or more filter expressions;
- apply logical and comparison operations.

To filter logs, use the filter parameters in the search bar:

| Parameter              | Format                                    | Description | Example |
| ---------------------- | ----------------------------------------- | ------ | ------ |
| `message`              | `message: "value"` | Search for records that have specified values in their messages. It is the default parameter, you do not need to specify it in the request | `"Hello world!"` |
| `timestamp`            | `timestamp <comparison operation> "value"` | Search for records sent in a given time interval | `timestamp >= "2022-04-10T00:00:00Z"` |
| `level`                | `level <comparison operation> value` | Search for records with specified logging levels. Available logging levels — `DEBUG`, `INFO`, `WARN`, `ERROR`, `CRITICAL` | `level >= INFO` |
| `payload`              | `payload: "value"` | Search through the text of records with specified values in the `payload` | `payload: warning` |
| `payload.field.search` | `payload.<field>: "value"` | Lexicographic search of records by `payload` elements. The `payload` prefix can be omitted if the root element of the tree does not match any of the parameters. You can check the existence of an element in the `payload` using the `EXISTS` operator: `json_payload.result EXISTS`. Such a filter will output records that have a `result` element in their `payload` | `payload.status: created` |

To filter records by multiple values of the same parameter, list the values one by one.

<warn>

If you do not specify an expression with fields in the search, then by default the search will be based on a substring in the `message` field.

</warn>

## Requirements

1. The special characters `"`, `'`, and `＼` in an expression are escaped using `＼`.
1. The value can be omitted from quotation marks if it:

   - starts with a letter of the Latin alphabet and contains only letters of the Latin alphabet, numbers and underscores;
   - is an unsigned integer.

1. Available values for `timestamp`: RFC3339.

## Comparison operators

| Operator | Decoding |
| -------- | ----------- |
| `=` | Equally |
| `<>` | Not equal |
| `>` | More than |
| `<` | Less than |
| `<=` | Less than or equal to |
| `>=` | Greater than or equal to |
| `:` | Contains |

## Filters with multiple conditions

You can combine several conditions in one filter using logical operators:

- `AND`
- `OR`
- `NOT`

## The order of calculations

Use parentheses to specify a specific order of calculations:

```sql
parameter1: "value1" AND (parameter2 = "value2" OR parameter3 < "value3")
```
