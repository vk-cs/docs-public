## What is HOLISTIC.DEV?

[HOLISTIC.DEV](https://holistic.dev/) is a database analysis extension and data extraction tool. The representation of the data structure is based on the database schema and DML queries. This knowledge allows us to automatically monitor the consistency of relationships and provides tools to automatically find problems.

The extension helps make the database faster, more organized and more secure.

## What is HOLISTIC.DEV not?

HOLISTIC.DEV is not an operational performance analyzer. It does not parse the database configuration (eg scheduler settings, buffer sizes, etc.). HOLISTIC.DEV does not manage replication or connection pooling. There are many tools for these purposes, and most of them are really good.

The machine can take on the complexity of the database structure and queries and perform a holistic analysis of the results of executing SQL statements without actually executing them, and can process many databases at the same time.

Based on all this knowledge, our solutions can tell developers and DBAs what they need to change to make queries faster, remove excessive query complexity, and keep the entire project consistent if changes have been made to any part of it.

## What databases are supported?

We currently support PostgreSQL with most modern syntax changes (v13). You can parse all databases related to PostgreSQL syntax.

## Can I improve queries without a database schema?

Unfortunately no. Our holistic approach based on knowledge of the database structure. We link the database schema and query knowledge to determine all the deep links and suggest the most effective ways to optimize your SQL code. Sometimes it's better to make changes to the schema rather than the query.

## What are the benefits for DBAs?

The Static SQL Analyzer can significantly reduce the time spent searching for performance issues and finding problematic architectural patterns.
