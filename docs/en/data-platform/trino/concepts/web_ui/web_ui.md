# {heading(Trino Web Interface)[id=trino-web-ui]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

Cloud Trino provides a web interface that allows you to view active and completed queries, track their statuses and progress, and analyze performance. For more information, see the [official Trino documentation](https://trino.io/docs/current/admin/web-interface.html).

## {heading(Accessing the interface)[id=trino-ui-access]}

The link to the Trino web interface is displayed on the **General information** tab of the service instance in the **Trino Admin UI** field. For authentication, use the username and password of the Cloud Trino user. For more information about connecting via the web interface, see the instructions {linkto(../../instructions/connect#trino_connect-ui)[text=Connecting to the service instance]}.

## {heading(Main interface sections)[id=trino-ui-sections]}

### {heading(Main page)[id=trino-ui-overview]}

The main page of the web interface is **Cluster overview**. The page displays the following information:

- Information about the Trino version, environment, and coordinator uptime.
- A monitoring panel displaying the main cluster metrics:

   - **Running queries**: the number of queries being executed.
   - **Queued queries**: the number of queries in the queue.
   - **Blocked queries**: the number of blocked queries.
   - **Active workers**: the number of active Trino worker nodes.
   - **Runnable drivers**: the number of operational drivers at the current moment.
   - **Reserved memory**: the amount of reserved memory for running queries.
   - **Rows/sec**: the number of table rows processed per second at the current moment.
   - **Bytes/sec**: the data processing rate (rows per second, bytes per second).
   - **Worker parallelism**: the efficiency of worker node utilization.

- A list of queries. Active queries are at the beginning of the list, followed by completed ones. For each query, the following is displayed: ID, SQL query text, status, completion percentage, the user who started the query, and the query source.

Use the following tools to navigate through queries:

- search by query text, ID, user, source;
- filtering by status:

   - **Running** — in progress;
   - **Queued** — in the queue;
   - **Finished** — completed;
   - **Failed** — with an error.

- sorting by various parameters;
- display settings: number of queries per page, refresh rate.

### {heading(Query page)[id=trino-ui-query-detail]}

To go to the page with detailed information about a query, click its ID. The page contains the following tabs:

- **Overview**: a summary with query parameters, a timeline, resource usage statistics, the full SQL query text, and a list of execution stages.
- **Live plan**: the query execution plan by stages. The plan can be zoomed in and moved. Clicking a stage opens the **Stage performance** tab.
- **Stage performance**: details of the selected execution stage: resource usage, processed data.
- **Splits**: a chart of timelines for each stage.
- **JSON**: the full JSON representation of the query with all statistics.
- **References**: the tables referenced by the query and the invoked functions.