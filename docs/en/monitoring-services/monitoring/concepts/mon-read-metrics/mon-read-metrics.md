Cloud Monitoring provides API for receiving metrics values. It has support for a subset of the PromQL language for working with query-based metrics.

You can create and execute a query for reading metrics with the following syntax:

- The name of the metric and the aggregation operation:

  - `cpu:Minimum`

- Filtering by the `Label` value:

  - `\=` — labels that exactly match the specified string
  - `!=` — labels that don't match the specified string
  - `\=~` — labels with regular expressions that match the specified string
  - `!~` — labels that do not match the regular expression of the specified string

- Grouping by:

  - `SUM` — sum over dimensions
  - `MIN` — minimum over dimensions
  - `MAX` — maximum over dimensions
  - `AVG` — average over dimensions
  - `STDDEV` — standard deviation of the population over dimensions
  - `STDVAR` — standard variance of the general population over dimensions
  - `COUNT` — number of elements in the vector
  - `QUANTILE` — calculate φ-quantile (`0 ≤ φ ≤ 1`) over dimensions

Query examples:

```promql
SUM BY(host) (cpu:Minimum{instance="server1", app!="system"})
```

```promql
SUM BY(job) (cpu:Average{host="server1", job!="system"}[12h] offset 24h)
```

For the full syntax and functions of the query language, refer to the [official Prometheus documentation](https://prometheus.io/docs/prometheus/latest/querying/basics/).