We recommend using the following best practices to ensure effective and stable operation of ClickHouse:

- Use keys for frequently used data.

     In your queries, use primary keys in columns that contain frequent operations for filtering (`WHERE`), grouping (`GROUP BY`), and sorting (`ORDER BY`). These are usually unique or frequently used column combinations, such as the object ID or date.

     Select the partition key so that it matches the most frequent range queries and scenarios of deleting data. This is usually a date or a range of dates.

- Optimize data loading strategies.

     Combine multiple small inserts (`INSERT`) into large bulk inserts. We recommend sending at least 50000 lines at a time.
     
     To combine the inserts, use the following formats: CSV, TSV, Parquet.

     {note:warn}

     Using frequent small inserts can lead to unstable operation of the ClickHouse instance.

     {/note}
     
- Minimize or optimize JOIN operations.

     The larger the table, the slower each JOIN operation is performed. Consider combining the data in advance, either during the loading stage or by using materialized views rather than in the query itself.

- Avoid bulk mutations (`ALTER TABLE`).

     In ClickHouse, bulk mutations for updating (`ALTER TABLE ... UPDATE`) and deleting (`ALTER TABLE ... DELETE`) data create a significant load on the system and can cause locks and overloads, or even make the table unavailable for an extended period. Use these operations only in exceptional circumstances.

For more best practices for ClickHouse, refer to its [official documentation](https://clickhouse.com/docs/best-practices).