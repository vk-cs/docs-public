The Cloud Flink architecture is built around the concept of distributed stream computing and consists of several components:

- *Job Manager* is a master node that coordinates all data processes in the service:

  - Responsible for task scheduling, resource allocation, and coordination of Task Manager nodes.
  - Monitors the status of task execution and ensures fault tolerance.
  - Monitors the execution of requests and monitors their progress.

  There is only one Job Manager node in the cluster, regardless of the configuration.

- *Task Manager* is a worker node that performs specific data processing tasks:

  - Processes tasks received from the Job Manager node.
  - Responsible for executing operators in the data stream and storing states.
  - Exchanges data with the Job Manager node to receive tasks and reports.

  A cluster can have from 1 to 10 Task Manager nodes that process different tasks in parallel.

- *DataStream API/DataSet API* is an API for programming stream and batch processing, respectively. Provide a set of operators for filtering, transforming, and aggregating data.

- *Data Streams* are ordered sequences of events that are processed and transformed through chains of operators. Support various data types.

- *State* is a snapshot of intermediate results and data at a specific point in time.

- *Operators* are elements that perform transformations and operations on data streams: filters, aggregations, merges, sorts, etc. Optimized for execution on Task Manager nodes.

- *Distributed storage*. Depending on the task, Cloud Flink can interact with various data storage facilities (for example, file systems, databases). Provides resilience to disk or node issues.

- *Task Scheduler* is responsible for distributing tasks between Task Manager nodes for optimal resource use.

The Cloud Flink architecture is a distributed system, where the Job Manager node coordinates the work of the Task Manager nodes. Each Task Manager node processes data streams using operators. This provides scalability and high performance. Distributed state storage allows Cloud Flink to continue working during partial system failures.
