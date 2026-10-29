{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}


{include(/en/_includes/_translated_by_ai_en.md)}

Category stats:
25/10/31 14:12:56 INFO FileSourceStrategy: Pushed Filters: IsNotNull(quantity),IsNotNull(price),IsNotNull(transaction_id)
25/10/31 14:12:56 INFO FileSourceStrategy: Post-Scan Filters: isnotnull(quantity#4),isnotnull(price#5),isnotnull(transaction_id#0),isnotnull(cast(gettimestamp(date#1, yyyy-MM-dd, TimestampType, Some(GMT), false) as date)),isnotnull(cast(quantity#4 as int)),isnotnull(cast(price#5 as decimal(10,2))),(cast(quantity#4 as int) > 0),(cast(price#5 as decimal(10,2)) > 0.00)
25/10/31 14:12:56 INFO HashAggregateExec: spark.sql.codegen.aggregate.map.twolevel.enabled is set to true, but current version of codegened fast hashmap does not support this aggregate.
25/10/31 14:12:56 INFO CodeGenerator: Code generated in 100.47991 ms
25/10/31 14:12:56 INFO MemoryStore: Block broadcast_10 stored as values in memory (estimated size 222.5 KiB, free 1048.2 MiB)
25/10/31 14:12:56 INFO BlockManagerInfo: Removed broadcast_9_piece0 on csv-to-iceberg-bb44746b-6a0b669a3a9b5a27-driver-svc.sparkcluster-d6bllks6.svc:7079 in memory (size: 6.0 KiB, free: 1048.7 MiB)
25/10/31 14:12:56 INFO BlockManagerInfo: Removed broadcast_9_piece0 on 10.100.28.84:45407 in memory (size: 6.0 KiB, free: 2.1 GiB)
25/10/31 14:12:56 INFO MemoryStore: Block broadcast_10_piece0 stored as bytes in memory (estimated size 38.0 KiB, free 1048.2 MiB)
25/10/31 14:12:56 INFO BlockManagerInfo: Added broadcast_10_piece0 in memory on csv-to-iceberg-bb44746b-6a0b669a3a9b5a27-driver-svc.sparkcluster-d6bllks6.svc:7079 (size: 38.0 KiB, free: 1048.7 MiB)
25/10/31 14:12:56 INFO SparkContext: Created broadcast 10 from showString at NativeMethodAccessorImpl.java:0
25/10/31 14:12:56 INFO FileSourceScanExec: Planning scan with bin packing, max size: 47579289 bytes, open cost is considered as scanning 4194304 bytes.
25/10/31 14:12:56 INFO BlockManagerInfo: Removed broadcast_8_piece0 on csv-to-iceberg-bb44746b-6a0b669a3a9b5a27-driver-svc.sparkcluster-d6bllks6.svc:7079 in memory (size: 31.4 KiB, free: 1048.7 MiB)
25/10/31 14:12:56 INFO BlockManagerInfo: Removed broadcast_8_piece0 on 10.100.28.84:45407 in memory (size: 31.4 KiB, free: 2.1 GiB)
25/10/31 14:12:56 INFO DAGScheduler: Registering RDD 22 (showString at NativeMethodAccessorImpl.java:0) as input to shuffle 3
25/10/31 14:12:56 INFO DAGScheduler: Got map stage job 6 (showString at NativeMethodAccessorImpl.java:0) with 2 output partitions
25/10/31 14:12:56 INFO DAGScheduler: Final stage: ShuffleMapStage 9 (showString at NativeMethodAccessorImpl.java:0)
25/10/31 14:12:56 INFO DAGScheduler: Parents of final stage: List()
25/10/31 14:12:56 INFO DAGScheduler: Missing parents: List()
25/10/31 14:12:56 INFO DAGScheduler: Submitting ShuffleMapStage 9 (MapPartitionsRDD[22] at showString at NativeMethodAccessorImpl.java:0), which has no missing parents
25/10/31 14:12:56 INFO MemoryStore: Block broadcast_11 stored as values in memory (estimated size 48.8 KiB, free 1048.2 MiB)
25/10/31 14:12:57 INFO MemoryStore: Block broadcast_11_piece0 stored as bytes in memory (estimated size 21.9 KiB, free 1048.2 MiB)
25/10/31 14:12:57 INFO BlockManagerInfo: Added broadcast_11_piece0 in memory on csv-to-iceberg-bb44746b-6a0b669a3a9b5a27-driver-svc.sparkcluster-d6bllks6.svc:7079 (size: 21.9 KiB, free: 1048.7 MiB)
25/10/31 14:12:57 INFO SparkContext: Created broadcast 11 from broadcast at DAGScheduler.scala:1585
25/10/31 14:12:57 INFO DAGScheduler: Submitting 2 missing tasks from ShuffleMapStage 9 (MapPartitionsRDD[22] at showString at NativeMethodAccessorImpl.java:0) (first 15 tasks are for partitions Vector(0, 1))
25/10/31 14:12:57 INFO TaskSchedulerImpl: Adding task set 9.0 with 2 tasks resource profile 0
25/10/31 14:12:57 INFO TaskSetManager: Starting task 0.0 in stage 9.0 (TID 11) (10.100.28.84, executor 1, partition 0, PROCESS_LOCAL, 8236 bytes) 
25/10/31 14:12:57 INFO TaskSetManager: Starting task 1.0 in stage 9.0 (TID 12) (10.100.28.84, executor 1, partition 1, PROCESS_LOCAL, 8236 bytes) 
25/10/31 14:12:57 INFO BlockManagerInfo: Added broadcast_11_piece0 in memory on 10.100.28.84:45407 (size: 21.9 KiB, free: 2.1 GiB)
25/10/31 14:12:57 INFO BlockManagerInfo: Removed broadcast_6_piece0 on csv-to-iceberg-bb44746b-6a0b669a3a9b5a27-driver-svc.sparkcluster-d6bllks6.svc:7079 in memory (size: 38.0 KiB, free: 1048.7 MiB)
25/10/31 14:12:57 INFO BlockManagerInfo: Removed broadcast_6_piece0 on 10.100.28.84:45407 in memory (size: 38.0 KiB, free: 2.1 GiB)
25/10/31 14:12:58 INFO BlockManagerInfo: Added broadcast_10_piece0 in memory on 10.100.28.84:45407 (size: 38.0 KiB, free: 2.1 GiB)
25/10/31 14:13:10 INFO TaskSetManager: Finished task 1.0 in stage 9.0 (TID 12) in 13406 ms on 10.100.28.84 (executor 1) (1/2)
25/10/31 14:13:10 INFO TaskSetManager: Finished task 0.0 in stage 9.0 (TID 11) in 13830 ms on 10.100.28.84 (executor 1) (2/2)
25/10/31 14:13:10 INFO TaskSchedulerImpl: Removed TaskSet 9.0, whose tasks have all completed, from pool 
25/10/31 14:13:10 INFO DAGScheduler: ShuffleMapStage 9 (showString at NativeMethodAccessorImpl.java:0) finished in 13.901 s
25/10/31 14:13:10 INFO DAGScheduler: looking for newly runnable stages
25/10/31 14:13:10 INFO DAGScheduler: running: Set()
25/10/31 14:13:10 INFO DAGScheduler: waiting: Set()
25/10/31 14:13:10 INFO DAGScheduler: failed: Set()
25/10/31 14:13:10 INFO ShufflePartitionsUtil: For shuffle(3), advisory target size: 67108864, actual target size 1048576, minimum partition size: 1048576
25/10/31 14:13:10 INFO CodeGenerator: Code generated in 37.897044 ms
25/10/31 14:13:10 INFO HashAggregateExec: spark.sql.codegen.aggregate.map.twolevel.enabled is set to true, but current version of codegened fast hashmap does not support this aggregate.
25/10/31 14:13:11 INFO CodeGenerator: Code generated in 80.15303 ms
25/10/31 14:13:11 INFO SparkContext: Starting job: showString at NativeMethodAccessorImpl.java:0
25/10/31 14:13:11 INFO DAGScheduler: Got job 7 (showString at NativeMethodAccessorImpl.java:0) with 1 output partitions
25/10/31 14:13:11 INFO DAGScheduler: Final stage: ResultStage 11 (showString at NativeMethodAccessorImpl.java:0)
25/10/31 14:13:11 INFO DAGScheduler: Parents of final stage: List(ShuffleMapStage 10)
25/10/31 14:13:11 INFO DAGScheduler: Missing parents: List()
25/10/31 14:13:11 INFO DAGScheduler: Submitting ResultStage 11 (MapPartitionsRDD[26] at showString at NativeMethodAccessorImpl.java:0), which has no missing parents
25/10/31 14:13:11 INFO MemoryStore: Block broadcast_12 stored as values in memory (estimated size 59.0 KiB, free 1048.4 MiB)
25/10/31 14:13:11 INFO MemoryStore: Block broadcast_12_piece0 stored as bytes in memory (estimated size 25.9 KiB, free 1048.4 MiB)
25/10/31 14:13:11 INFO BlockManagerInfo: Added broadcast_12_piece0 in memory on csv-to-iceberg-bb44746b-6a0b669a3a9b5a27-driver-svc.sparkcluster-d6bllks6.svc:7079 (size: 25.9 KiB, free: 1048.7 MiB)
25/10/31 14:13:11 INFO SparkContext: Created broadcast 12 from broadcast at DAGScheduler.scala:1585
25/10/31 14:13:11 INFO DAGScheduler: Submitting 1 missing tasks from ResultStage 11 (MapPartitionsRDD[26] at showString at NativeMethodAccessorImpl.java:0) (first 15 tasks are for partitions Vector(0))
25/10/31 14:13:11 INFO TaskSchedulerImpl: Adding task set 11.0 with 1 tasks resource profile 0
25/10/31 14:13:11 INFO TaskSetManager: Starting task 0.0 in stage 11.0 (TID 13) (10.100.28.84, executor 1, partition 0, NODE_LOCAL, 7634 bytes) 
25/10/31 14:13:11 INFO BlockManagerInfo: Added broadcast_12_piece0 in memory on 10.100.28.84:45407 (size: 25.9 KiB, free: 2.1 GiB)
25/10/31 14:13:11 INFO MapOutputTrackerMasterEndpoint: Asked to send map output locations for shuffle 3 to 10.100.28.84:41154
25/10/31 14:13:11 INFO TaskSetManager: Finished task 0.0 in stage 11.0 (TID 13) in 725 ms on 10.100.28.84 (executor 1) (1/1)
25/10/31 14:13:11 INFO TaskSchedulerImpl: Removed TaskSet 11.0, whose tasks have all completed, from pool 
25/10/31 14:13:11 INFO DAGScheduler: ResultStage 11 (showString at NativeMethodAccessorImpl.java:0) finished in 0.798 s
25/10/31 14:13:11 INFO DAGScheduler: Job 7 is finished. Cancelling potential speculative or zombie tasks for this job
25/10/31 14:13:11 INFO TaskSchedulerImpl: Killing all running tasks in stage 11: Stage finished
25/10/31 14:13:11 INFO DAGScheduler: Job 7 finished: showString at NativeMethodAccessorImpl.java:0, took 0.804842 s
25/10/31 14:13:11 INFO CodeGenerator: Code generated in 14.196585 ms
25/10/31 14:13:12 INFO BlockManagerInfo: Removed broadcast_11_piece0 on csv-to-iceberg-bb44746b-6a0b669a3a9b5a27-driver-svc.sparkcluster-d6bllks6.svc:7079 in memory (size: 21.9 KiB, free: 1048.7 MiB)
25/10/31 14:13:13 INFO BlockManagerInfo: Removed broadcast_11_piece0 on 10.100.28.84:45407 in memory (size: 21.9 KiB, free: 2.1 GiB)
25/10/31 14:13:13 INFO BlockManagerInfo: Removed broadcast_12_piece0 on csv-to-iceberg-bb44746b-6a0b669a3a9b5a27-driver-svc.sparkcluster-d6bllks6.svc:7079 in memory (size: 25.9 KiB, free: 1048.8 MiB)
25/10/31 14:13:13 INFO BlockManagerInfo: Removed broadcast_12_piece0 on 10.100.28.84:45407 in memory (size: 25.9 KiB, free: 2.1 GiB)
25/10/31 14:13:13 INFO CodeGenerator: Code generated in 58.728539 ms
+-----------+------+-------------+
|   category| count|  total_sales|
+-----------+------+-------------+
|Accessories|247043|1367566162.09|
| Components|247059|1364012531.02|
|Electronics|246237|1360697691.40|
|Peripherals|246328|1359284502.35|
+-----------+------+-------------+

Region stats:
25/10/31 14:13:13 INFO FileSourceStrategy: Pushed Filters: IsNotNull(quantity),IsNotNull(price),IsNotNull(transaction_id)
25/10/31 14:13:13 INFO FileSourceStrategy: Post-Scan Filters: isnotnull(quantity#4),isnotnull(price#5),isnotnull(transaction_id#0),isnotnull(cast(gettimestamp(date#1, yyyy-MM-dd, TimestampType, Some(GMT), false) as date)),isnotnull(cast(quantity#4 as int)),isnotnull(cast(price#5 as decimal(10,2))),(cast(quantity#4 as int) > 0),(cast(price#5 as decimal(10,2)) > 0.00)
25/10/31 14:13:14 INFO CodeGenerator: Code generated in 175.925961 ms
25/10/31 14:13:14 INFO MemoryStore: Block broadcast_13 stored as values in memory (estimated size 222.5 KiB, free 1048.3 MiB)
25/10/31 14:13:14 INFO MemoryStore: Block broadcast_13_piece0 stored as bytes in memory (estimated size 38.0 KiB, free 1048.3 MiB)
25/10/31 14:13:14 INFO BlockManagerInfo: Added broadcast_13_piece0 in memory on csv-to-iceberg-bb44746b-6a0b669a3a9b5a27-driver-svc.sparkcluster-d6bllks6.svc:7079 (size: 38.0 KiB, free: 1048.7 MiB)
25/10/31 14:13:14 INFO SparkContext: Created broadcast 13 from showString at NativeMethodAccessorImpl.java:0
25/10/31 14:13:14 INFO FileSourceScanExec: Planning scan with bin packing, max size: 47579289 bytes, open cost is considered as scanning 4194304 bytes.
25/10/31 14:13:14 INFO DAGScheduler: Registering RDD 30 (showString at NativeMethodAccessorImpl.java:0) as input to shuffle 4
25/10/31 14:13:14 INFO DAGScheduler: Got map stage job 8 (showString at NativeMethodAccessorImpl.java:0) with 2 output partitions
25/10/31 14:13:14 INFO DAGScheduler: Final stage: ShuffleMapStage 12 (showString at NativeMethodAccessorImpl.java:0)
25/10/31 14:13:14 INFO DAGScheduler: Parents of final stage: List()
25/10/31 14:13:14 INFO DAGScheduler: Missing parents: List()
25/10/31 14:13:14 INFO DAGScheduler: Submitting ShuffleMapStage 12 (MapPartitionsRDD[30] at showString at NativeMethodAccessorImpl.java:0), which has no missing parents
25/10/31 14:13:14 INFO MemoryStore: Block broadcast_14 stored as values in memory (estimated size 54.8 KiB, free 1048.2 MiB)
25/10/31 14:13:14 INFO MemoryStore: Block broadcast_14_piece0 stored as bytes in memory (estimated size 24.1 KiB, free 1048.2 MiB)
25/10/31 14:13:14 INFO BlockManagerInfo: Added broadcast_14_piece0 in memory on csv-to-iceberg-bb44746b-6a0b669a3a9b5a27-driver-svc.sparkcluster-d6bllks6.svc:7079 (size: 24.1 KiB, free: 1048.7 MiB)
25/10/31 14:13:14 INFO SparkContext: Created broadcast 14 from broadcast at DAGScheduler.scala:1585
25/10/31 14:13:14 INFO DAGScheduler: Submitting 2 missing tasks from ShuffleMapStage 12 (MapPartitionsRDD[30] at showString at NativeMethodAccessorImpl.java:0) (first 15 tasks are for partitions Vector(0, 1))
25/10/31 14:13:14 INFO TaskSchedulerImpl: Adding task set 12.0 with 2 tasks resource profile 0
25/10/31 14:13:14 INFO TaskSetManager: Starting task 0.0 in stage 12.0 (TID 14) (10.100.28.84, executor 1, partition 0, PROCESS_LOCAL, 8236 bytes) 
25/10/31 14:13:14 INFO TaskSetManager: Starting task 1.0 in stage 12.0 (TID 15) (10.100.28.84, executor 1, partition 1, PROCESS_LOCAL, 8236 bytes) 
25/10/31 14:13:14 INFO BlockManagerInfo: Added broadcast_14_piece0 in memory on 10.100.28.84:45407 (size: 24.1 KiB, free: 2.1 GiB)
25/10/31 14:13:14 INFO BlockManagerInfo: Removed broadcast_10_piece0 on csv-to-iceberg-bb44746b-6a0b669a3a9b5a27-driver-svc.sparkcluster-d6bllks6.svc:7079 in memory (size: 38.0 KiB, free: 1048.7 MiB)
25/10/31 14:13:14 INFO BlockManagerInfo: Removed broadcast_10_piece0 on 10.100.28.84:45407 in memory (size: 38.0 KiB, free: 2.1 GiB)
25/10/31 14:13:15 INFO BlockManagerInfo: Added broadcast_13_piece0 in memory on 10.100.28.84:45407 (size: 38.0 KiB, free: 2.1 GiB)
25/10/31 14:13:25 INFO TaskSetManager: Finished task 1.0 in stage 12.0 (TID 15) in 10918 ms on 10.100.28.84 (executor 1) (1/2)
25/10/31 14:13:25 INFO TaskSetManager: Finished task 0.0 in stage 12.0 (TID 14) in 11215 ms on 10.100.28.84 (executor 1) (2/2)
25/10/31 14:13:25 INFO TaskSchedulerImpl: Removed TaskSet 12.0, whose tasks have all completed, from pool 
25/10/31 14:13:25 INFO DAGScheduler: ShuffleMapStage 12 (showString at NativeMethodAccessorImpl.java:0) finished in 11.226 s
25/10/31 14:13:25 INFO DAGScheduler: looking for newly runnable stages
25/10/31 14:13:25 INFO DAGScheduler: running: Set()
25/10/31 14:13:25 INFO DAGScheduler: waiting: Set()
25/10/31 14:13:25 INFO DAGScheduler: failed: Set()
25/10/31 14:13:25 INFO ShufflePartitionsUtil: For shuffle(4), advisory target size: 67108864, actual target size 1048576, minimum partition size: 1048576
25/10/31 14:13:25 INFO CodeGenerator: Code generated in 7.110871 ms
25/10/31 14:13:25 INFO HashAggregateExec: spark.sql.codegen.aggregate.map.twolevel.enabled is set to true, but current version of codegened fast hashmap does not support this aggregate.
25/10/31 14:13:25 INFO CodeGenerator: Code generated in 59.868044 ms
25/10/31 14:13:25 INFO SparkContext: Starting job: showString at NativeMethodAccessorImpl.java:0
25/10/31 14:13:25 INFO DAGScheduler: Got job 9 (showString at NativeMethodAccessorImpl.java:0) with 1 output partitions
25/10/31 14:13:25 INFO DAGScheduler: Final stage: ResultStage 14 (showString at NativeMethodAccessorImpl.java:0)
25/10/31 14:13:25 INFO DAGScheduler: Parents of final stage: List(ShuffleMapStage 13)
25/10/31 14:13:25 INFO DAGScheduler: Missing parents: List()
25/10/31 14:13:25 INFO DAGScheduler: Submitting ResultStage 14 (MapPartitionsRDD[34] at showString at NativeMethodAccessorImpl.java:0), which has no missing parents
25/10/31 14:13:25 INFO MemoryStore: Block broadcast_15 stored as values in memory (estimated size 58.7 KiB, free 1048.4 MiB)
25/10/31 14:13:25 INFO MemoryStore: Block broadcast_15_piece0 stored as bytes in memory (estimated size 25.9 KiB, free 1048.4 MiB)
25/10/31 14:13:25 INFO BlockManagerInfo: Added broadcast_15_piece0 in memory on csv-to-iceberg-bb44746b-6a0b669a3a9b5a27-driver-svc.sparkcluster-d6bllks6.svc:7079 (size: 25.9 KiB, free: 1048.7 MiB)
25/10/31 14:13:25 INFO SparkContext: Created broadcast 15 from broadcast at DAGScheduler.scala:1585
25/10/31 14:13:25 INFO DAGScheduler: Submitting 1 missing tasks from ResultStage 14 (MapPartitionsRDD[34] at showString at NativeMethodAccessorImpl.java:0) (first 15 tasks are for partitions Vector(0))
25/10/31 14:13:25 INFO TaskSchedulerImpl: Adding task set 14.0 with 1 tasks resource profile 0
25/10/31 14:13:25 INFO TaskSetManager: Starting task 0.0 in stage 14.0 (TID 16) (10.100.28.84, executor 1, partition 0, NODE_LOCAL, 7634 bytes) 
25/10/31 14:13:25 INFO BlockManagerInfo: Added broadcast_15_piece0 in memory on 10.100.28.84:45407 (size: 25.9 KiB, free: 2.1 GiB)
25/10/31 14:13:25 INFO MapOutputTrackerMasterEndpoint: Asked to send map output locations for shuffle 4 to 10.100.28.84:41154
25/10/31 14:13:26 INFO TaskSetManager: Finished task 0.0 in stage 14.0 (TID 16) in 300 ms on 10.100.28.84 (executor 1) (1/1)
25/10/31 14:13:26 INFO TaskSchedulerImpl: Removed TaskSet 14.0, whose tasks have all completed, from pool 
25/10/31 14:13:26 INFO DAGScheduler: ResultStage 14 (showString at NativeMethodAccessorImpl.java:0) finished in 0.310 s
25/10/31 14:13:26 INFO DAGScheduler: Job 9 is finished. Cancelling potential speculative or zombie tasks for this job
25/10/31 14:13:26 INFO TaskSchedulerImpl: Killing all running tasks in stage 14: Stage finished
25/10/31 14:13:26 INFO DAGScheduler: Job 9 finished: showString at NativeMethodAccessorImpl.java:0, took 0.316192 s
25/10/31 14:13:26 INFO CodeGenerator: Code generated in 12.202943 ms
+-------------+------+-----------+
|       region| count|   avg_sale|
+-------------+------+-----------+
|       Europe|198069|5526.757559|
|South America|197275|5528.127100|
|    Australia|197132|5521.741877|
|         Asia|197122|5525.530909|
|North America|197069|5523.976612|
+-------------+------+-----------+

Check Iceberg table:
25/10/31 14:13:26 INFO BaseMetastoreCatalog: Table loaded by catalog: iceberg_catalog.sales_db.sales_cleaned
25/10/31 14:13:26 INFO SnapshotScan: Scanning table iceberg_catalog.sales_db.sales_cleaned snapshot 5961610994930135230 created at 2025-10-31T14:12:54.305+00:00 with filter true
25/10/31 14:13:26 INFO BaseDistributedDataScan: Planning file tasks locally for table iceberg_catalog.sales_db.sales_cleaned
25/10/31 14:13:26 INFO V2ScanRelationPushDown: 
Pushing operators to iceberg_catalog.sales_db.sales_cleaned
Pushed Aggregate Functions:
 COUNT(*)
Pushed Group by:
 
         
25/10/31 14:13:27 INFO CodeGenerator: Code generated in 9.825075 ms
25/10/31 14:13:27 INFO CodeGenerator: Code generated in 6.450554 ms
25/10/31 14:13:27 INFO DAGScheduler: Registering RDD 37 (showString at NativeMethodAccessorImpl.java:0) as input to shuffle 5
25/10/31 14:13:27 INFO DAGScheduler: Got map stage job 10 (showString at NativeMethodAccessorImpl.java:0) with 1 output partitions
25/10/31 14:13:27 INFO DAGScheduler: Final stage: ShuffleMapStage 15 (showString at NativeMethodAccessorImpl.java:0)
25/10/31 14:13:27 INFO DAGScheduler: Parents of final stage: List()
25/10/31 14:13:27 INFO DAGScheduler: Missing parents: List()
25/10/31 14:13:27 INFO DAGScheduler: Submitting ShuffleMapStage 15 (MapPartitionsRDD[37] at showString at NativeMethodAccessorImpl.java:0), which has no missing parents
25/10/31 14:13:27 INFO MemoryStore: Block broadcast_16 stored as values in memory (estimated size 12.7 KiB, free 1048.4 MiB)
25/10/31 14:13:27 INFO MemoryStore: Block broadcast_16_piece0 stored as bytes in memory (estimated size 6.2 KiB, free 1048.4 MiB)
25/10/31 14:13:27 INFO BlockManagerInfo: Added broadcast_16_piece0 in memory on csv-to-iceberg-bb44746b-6a0b669a3a9b5a27-driver-svc.sparkcluster-d6bllks6.svc:7079 (size: 6.2 KiB, free: 1048.7 MiB)
25/10/31 14:13:27 INFO SparkContext: Created broadcast 16 from broadcast at DAGScheduler.scala:1585
25/10/31 14:13:27 INFO DAGScheduler: Submitting 1 missing tasks from ShuffleMapStage 15 (MapPartitionsRDD[37] at showString at NativeMethodAccessorImpl.java:0) (first 15 tasks are for partitions Vector(0))
25/10/31 14:13:27 INFO TaskSchedulerImpl: Adding task set 15.0 with 1 tasks resource profile 0
25/10/31 14:13:27 INFO TaskSetManager: Starting task 0.0 in stage 15.0 (TID 17) (10.100.28.84, executor 1, partition 0, PROCESS_LOCAL, 7795 bytes) 
25/10/31 14:13:27 INFO BlockManagerInfo: Added broadcast_16_piece0 in memory on 10.100.28.84:45407 (size: 6.2 KiB, free: 2.1 GiB)
25/10/31 14:13:27 INFO TaskSetManager: Finished task 0.0 in stage 15.0 (TID 17) in 45 ms on 10.100.28.84 (executor 1) (1/1)
25/10/31 14:13:27 INFO TaskSchedulerImpl: Removed TaskSet 15.0, whose tasks have all completed, from pool 
25/10/31 14:13:27 INFO DAGScheduler: ShuffleMapStage 15 (showString at NativeMethodAccessorImpl.java:0) finished in 0.109 s
25/10/31 14:13:27 INFO DAGScheduler: looking for newly runnable stages
25/10/31 14:13:27 INFO DAGScheduler: running: Set()
25/10/31 14:13:27 INFO DAGScheduler: waiting: Set()
25/10/31 14:13:27 INFO DAGScheduler: failed: Set()
25/10/31 14:13:27 INFO CodeGenerator: Code generated in 44.054907 ms
25/10/31 14:13:27 INFO SparkContext: Starting job: showString at NativeMethodAccessorImpl.java:0
25/10/31 14:13:27 INFO BlockManagerInfo: Removed broadcast_15_piece0 on csv-to-iceberg-bb44746b-6a0b669a3a9b5a27-driver-svc.sparkcluster-d6bllks6.svc:7079 in memory (size: 25.9 KiB, free: 1048.7 MiB)
25/10/31 14:13:27 INFO DAGScheduler: Got job 11 (showString at NativeMethodAccessorImpl.java:0) with 1 output partitions
25/10/31 14:13:27 INFO DAGScheduler: Final stage: ResultStage 17 (showString at NativeMethodAccessorImpl.java:0)
25/10/31 14:13:27 INFO DAGScheduler: Parents of final stage: List(ShuffleMapStage 16)
25/10/31 14:13:27 INFO DAGScheduler: Missing parents: List()
25/10/31 14:13:27 INFO DAGScheduler: Submitting ResultStage 17 (MapPartitionsRDD[40] at showString at NativeMethodAccessorImpl.java:0), which has no missing parents
25/10/31 14:13:27 INFO BlockManagerInfo: Removed broadcast_15_piece0 on 10.100.28.84:45407 in memory (size: 25.9 KiB, free: 2.1 GiB)
25/10/31 14:13:27 INFO MemoryStore: Block broadcast_17 stored as values in memory (estimated size 13.8 KiB, free 1048.4 MiB)
25/10/31 14:13:27 INFO MemoryStore: Block broadcast_17_piece0 stored as bytes in memory (estimated size 6.4 KiB, free 1048.4 MiB)
25/10/31 14:13:27 INFO BlockManagerInfo: Added broadcast_17_piece0 in memory on csv-to-iceberg-bb44746b-6a0b669a3a9b5a27-driver-svc.sparkcluster-d6bllks6.svc:7079 (size: 6.4 KiB, free: 1048.7 MiB)
25/10/31 14:13:27 INFO SparkContext: Created broadcast 17 from broadcast at DAGScheduler.scala:1585
25/10/31 14:13:27 INFO DAGScheduler: Submitting 1 missing tasks from ResultStage 17 (MapPartitionsRDD[40] at showString at NativeMethodAccessorImpl.java:0) (first 15 tasks are for partitions Vector(0))
25/10/31 14:13:27 INFO TaskSchedulerImpl: Adding task set 17.0 with 1 tasks resource profile 0
25/10/31 14:13:27 INFO TaskSetManager: Starting task 0.0 in stage 17.0 (TID 18) (10.100.28.84, executor 1, partition 0, NODE_LOCAL, 7634 bytes) 
25/10/31 14:13:27 INFO BlockManagerInfo: Removed broadcast_16_piece0 on csv-to-iceberg-bb44746b-6a0b669a3a9b5a27-driver-svc.sparkcluster-d6bllks6.svc:7079 in memory (size: 6.2 KiB, free: 1048.7 MiB)
25/10/31 14:13:27 INFO BlockManagerInfo: Removed broadcast_16_piece0 on 10.100.28.84:45407 in memory (size: 6.2 KiB, free: 2.1 GiB)
25/10/31 14:13:27 INFO BlockManagerInfo: Removed broadcast_14_piece0 on csv-to-iceberg-bb44746b-6a0b669a3a9b5a27-driver-svc.sparkcluster-d6bllks6.svc:7079 in memory (size: 24.1 KiB, free: 1048.8 MiB)
25/10/31 14:13:27 INFO BlockManagerInfo: Removed broadcast_14_piece0 on 10.100.28.84:45407 in memory (size: 24.1 KiB, free: 2.1 GiB)
25/10/31 14:13:27 INFO BlockManagerInfo: Added broadcast_17_piece0 in memory on 10.100.28.84:45407 (size: 6.4 KiB, free: 2.1 GiB)
25/10/31 14:13:27 INFO MapOutputTrackerMasterEndpoint: Asked to send map output locations for shuffle 5 to 10.100.28.84:41154
25/10/31 14:13:27 INFO BlockManagerInfo: Removed broadcast_13_piece0 on csv-to-iceberg-bb44746b-6a0b669a3a9b5a27-driver-svc.sparkcluster-d6bllks6.svc:7079 in memory (size: 38.0 KiB, free: 1048.8 MiB)
25/10/31 14:13:27 INFO BlockManagerInfo: Removed broadcast_13_piece0 on 10.100.28.84:45407 in memory (size: 38.0 KiB, free: 2.1 GiB)
25/10/31 14:13:27 INFO TaskSetManager: Finished task 0.0 in stage 17.0 (TID 18) in 192 ms on 10.100.28.84 (executor 1) (1/1)
25/10/31 14:13:27 INFO TaskSchedulerImpl: Removed TaskSet 17.0, whose tasks have all completed, from pool 
25/10/31 14:13:27 INFO DAGScheduler: ResultStage 17 (showString at NativeMethodAccessorImpl.java:0) finished in 0.199 s
25/10/31 14:13:27 INFO DAGScheduler: Job 11 is finished. Cancelling potential speculative or zombie tasks for this job
25/10/31 14:13:27 INFO TaskSchedulerImpl: Killing all running tasks in stage 17: Stage finished
25/10/31 14:13:27 INFO DAGScheduler: Job 11 finished: showString at NativeMethodAccessorImpl.java:0, took 0.202364 s
25/10/31 14:13:27 INFO CodeGenerator: Code generated in 6.029764 ms
+-------------+
|total_records|
+-------------+
|       986667|
+-------------+

25/10/31 14:13:27 INFO BlockManagerInfo: Removed broadcast_17_piece0 on csv-to-iceberg-bb44746b-6a0b669a3a9b5a27-driver-svc.sparkcluster-d6bllks6.svc:7079 in memory (size: 6.4 KiB, free: 1048.8 MiB)
25/10/31 14:13:27 INFO BlockManagerInfo: Removed broadcast_17_piece0 on 10.100.28.84:45407 in memory (size: 6.4 KiB, free: 2.1 GiB)
25/10/31 14:13:27 INFO SparkScanBuilder: Skipping aggregate pushdown: group by aggregation push down is not supported
25/10/31 14:13:27 INFO V2ScanRelationPushDown: 
Output: year#352, month#353
         
25/10/31 14:13:27 INFO SnapshotScan: Scanning table iceberg_catalog.sales_db.sales_cleaned snapshot 5961610994930135230 created at 2025-10-31T14:12:54.305+00:00 with filter true
25/10/31 14:13:27 INFO BaseDistributedDataScan: Planning file tasks locally for table iceberg_catalog.sales_db.sales_cleaned
25/10/31 14:13:27 INFO SparkPartitioningAwareScan: Reporting UnknownPartitioning with 6 partition(s) for table iceberg_catalog.sales_db.sales_cleaned
25/10/31 14:13:27 INFO MemoryStore: Block broadcast_18 stored as values in memory (estimated size 32.0 KiB, free 1048.8 MiB)
25/10/31 14:13:27 INFO MemoryStore: Block broadcast_18_piece0 stored as bytes in memory (estimated size 31.7 KiB, free 1048.7 MiB)
25/10/31 14:13:27 INFO BlockManagerInfo: Added broadcast_18_piece0 in memory on csv-to-iceberg-bb44746b-6a0b669a3a9b5a27-driver-svc.sparkcluster-d6bllks6.svc:7079 (size: 31.7 KiB, free: 1048.8 MiB)
25/10/31 14:13:27 INFO SparkContext: Created broadcast 18 from broadcast at SparkBatch.java:85
25/10/31 14:13:27 INFO MemoryStore: Block broadcast_19 stored as values in memory (estimated size 32.0 KiB, free 1048.7 MiB)
25/10/31 14:13:27 INFO MemoryStore: Block broadcast_19_piece0 stored as bytes in memory (estimated size 31.7 KiB, free 1048.7 MiB)
25/10/31 14:13:27 INFO BlockManagerInfo: Added broadcast_19_piece0 in memory on csv-to-iceberg-bb44746b-6a0b669a3a9b5a27-driver-svc.sparkcluster-d6bllks6.svc:7079 (size: 31.7 KiB, free: 1048.7 MiB)
25/10/31 14:13:27 INFO SparkContext: Created broadcast 19 from broadcast at SparkBatch.java:85
25/10/31 14:13:28 INFO CodeGenerator: Code generated in 99.917084 ms
25/10/31 14:13:28 INFO DAGScheduler: Registering RDD 44 (showString at NativeMethodAccessorImpl.java:0) as input to shuffle 6
25/10/31 14:13:28 INFO DAGScheduler: Got map stage job 12 (showString at NativeMethodAccessorImpl.java:0) with 6 output partitions
25/10/31 14:13:28 INFO DAGScheduler: Final stage: ShuffleMapStage 18 (showString at NativeMethodAccessorImpl.java:0)
25/10/31 14:13:28 INFO DAGScheduler: Parents of final stage: List()
25/10/31 14:13:28 INFO DAGScheduler: Missing parents: List()
25/10/31 14:13:28 INFO DAGScheduler: Submitting ShuffleMapStage 18 (MapPartitionsRDD[44] at showString at NativeMethodAccessorImpl.java:0), which has no missing parents
25/10/31 14:13:28 INFO MemoryStore: Block broadcast_20 stored as values in memory (estimated size 40.1 KiB, free 1048.6 MiB)
25/10/31 14:13:28 INFO MemoryStore: Block broadcast_20_piece0 stored as bytes in memory (estimated size 17.6 KiB, free 1048.6 MiB)
25/10/31 14:13:28 INFO BlockManagerInfo: Added broadcast_20_piece0 in memory on csv-to-iceberg-bb44746b-6a0b669a3a9b5a27-driver-svc.sparkcluster-d6bllks6.svc:7079 (size: 17.6 KiB, free: 1048.7 MiB)
25/10/31 14:13:28 INFO SparkContext: Created broadcast 20 from broadcast at DAGScheduler.scala:1585
25/10/31 14:13:28 INFO DAGScheduler: Submitting 6 missing tasks from ShuffleMapStage 18 (MapPartitionsRDD[44] at showString at NativeMethodAccessorImpl.java:0) (first 15 tasks are for partitions Vector(0, 1, 2, 3, 4, 5))
25/10/31 14:13:28 INFO TaskSchedulerImpl: Adding task set 18.0 with 6 tasks resource profile 0
25/10/31 14:13:28 INFO TaskSetManager: Starting task 0.0 in stage 18.0 (TID 19) (10.100.28.84, executor 1, partition 0, PROCESS_LOCAL, 15091 bytes) 
25/10/31 14:13:28 INFO TaskSetManager: Starting task 1.0 in stage 18.0 (TID 20) (10.100.28.84, executor 1, partition 1, PROCESS_LOCAL, 15097 bytes) 
25/10/31 14:13:28 INFO BlockManagerInfo: Added broadcast_20_piece0 in memory on 10.100.28.84:45407 (size: 17.6 KiB, free: 2.1 GiB)
25/10/31 14:13:28 INFO BlockManagerInfo: Added broadcast_19_piece0 in memory on 10.100.28.84:45407 (size: 31.7 KiB, free: 2.1 GiB)
25/10/31 14:13:32 INFO TaskSetManager: Starting task 2.0 in stage 18.0 (TID 21) (10.100.28.84, executor 1, partition 2, PROCESS_LOCAL, 15100 bytes) 
25/10/31 14:13:32 INFO TaskSetManager: Finished task 1.0 in stage 18.0 (TID 20) in 3719 ms on 10.100.28.84 (executor 1) (1/6)
25/10/31 14:13:32 INFO TaskSetManager: Starting task 3.0 in stage 18.0 (TID 22) (10.100.28.84, executor 1, partition 3, PROCESS_LOCAL, 15098 bytes) 
25/10/31 14:13:32 INFO TaskSetManager: Finished task 0.0 in stage 18.0 (TID 19) in 4003 ms on 10.100.28.84 (executor 1) (2/6)
25/10/31 14:13:33 INFO TaskSetManager: Starting task 4.0 in stage 18.0 (TID 23) (10.100.28.84, executor 1, partition 4, PROCESS_LOCAL, 15101 bytes) 
25/10/31 14:13:33 INFO TaskSetManager: Finished task 2.0 in stage 18.0 (TID 21) in 1010 ms on 10.100.28.84 (executor 1) (3/6)
25/10/31 14:13:33 INFO TaskSetManager: Starting task 5.0 in stage 18.0 (TID 24) (10.100.28.84, executor 1, partition 5, PROCESS_LOCAL, 15101 bytes) 
25/10/31 14:13:33 INFO TaskSetManager: Finished task 3.0 in stage 18.0 (TID 22) in 1298 ms on 10.100.28.84 (executor 1) (4/6)
25/10/31 14:13:33 INFO TaskSetManager: Finished task 4.0 in stage 18.0 (TID 23) in 802 ms on 10.100.28.84 (executor 1) (5/6)
25/10/31 14:13:34 INFO TaskSetManager: Finished task 5.0 in stage 18.0 (TID 24) in 866 ms on 10.100.28.84 (executor 1) (6/6)
25/10/31 14:13:34 INFO TaskSchedulerImpl: Removed TaskSet 18.0, whose tasks have all completed, from pool 
25/10/31 14:13:34 INFO DAGScheduler: ShuffleMapStage 18 (showString at NativeMethodAccessorImpl.java:0) finished in 6.174 s
25/10/31 14:13:34 INFO DAGScheduler: looking for newly runnable stages
25/10/31 14:13:34 INFO DAGScheduler: running: Set()
25/10/31 14:13:34 INFO DAGScheduler: waiting: Set()
25/10/31 14:13:34 INFO DAGScheduler: failed: Set()
25/10/31 14:13:34 INFO ShufflePartitionsUtil: For shuffle(6), advisory target size: 67108864, actual target size 1048576, minimum partition size: 1048576
25/10/31 14:13:34 INFO CodeGenerator: Code generated in 5.798724 ms
25/10/31 14:13:34 INFO HashAggregateExec: spark.sql.codegen.aggregate.map.twolevel.enabled is set to true, but current version of codegened fast hashmap does not support this aggregate.
25/10/31 14:13:34 INFO CodeGenerator: Code generated in 11.382556 ms
25/10/31 14:13:34 INFO SparkContext: Starting job: showString at NativeMethodAccessorImpl.java:0
25/10/31 14:13:34 INFO DAGScheduler: Got job 13 (showString at NativeMethodAccessorImpl.java:0) with 1 output partitions
25/10/31 14:13:34 INFO DAGScheduler: Final stage: ResultStage 20 (showString at NativeMethodAccessorImpl.java:0)
25/10/31 14:13:34 INFO DAGScheduler: Parents of final stage: List(ShuffleMapStage 19)
25/10/31 14:13:34 INFO DAGScheduler: Missing parents: List()
25/10/31 14:13:34 INFO DAGScheduler: Submitting ResultStage 20 (MapPartitionsRDD[48] at showString at NativeMethodAccessorImpl.java:0), which has no missing parents
25/10/31 14:13:34 INFO MemoryStore: Block broadcast_21 stored as values in memory (estimated size 41.2 KiB, free 1048.6 MiB)
25/10/31 14:13:34 INFO MemoryStore: Block broadcast_21_piece0 stored as bytes in memory (estimated size 18.7 KiB, free 1048.6 MiB)
25/10/31 14:13:34 INFO BlockManagerInfo: Added broadcast_21_piece0 in memory on csv-to-iceberg-bb44746b-6a0b669a3a9b5a27-driver-svc.sparkcluster-d6bllks6.svc:7079 (size: 18.7 KiB, free: 1048.7 MiB)
25/10/31 14:13:34 INFO SparkContext: Created broadcast 21 from broadcast at DAGScheduler.scala:1585
25/10/31 14:13:34 INFO DAGScheduler: Submitting 1 missing tasks from ResultStage 20 (MapPartitionsRDD[48] at showString at NativeMethodAccessorImpl.java:0) (first 15 tasks are for partitions Vector(0))
25/10/31 14:13:34 INFO TaskSchedulerImpl: Adding task set 20.0 with 1 tasks resource profile 0
25/10/31 14:13:34 INFO TaskSetManager: Starting task 0.0 in stage 20.0 (TID 25) (10.100.28.84, executor 1, partition 0, NODE_LOCAL, 7634 bytes) 
25/10/31 14:13:34 INFO BlockManagerInfo: Added broadcast_21_piece0 in memory on 10.100.28.84:45407 (size: 18.7 KiB, free: 2.1 GiB)
25/10/31 14:13:34 INFO MapOutputTrackerMasterEndpoint: Asked to send map output locations for shuffle 6 to 10.100.28.84:41154
25/10/31 14:13:34 INFO TaskSetManager: Finished task 0.0 in stage 20.0 (TID 25) in 226 ms on 10.100.28.84 (executor 1) (1/1)
25/10/31 14:13:34 INFO TaskSchedulerImpl: Removed TaskSet 20.0, whose tasks have all completed, from pool 
25/10/31 14:13:34 INFO DAGScheduler: ResultStage 20 (showString at NativeMethodAccessorImpl.java:0) finished in 0.284 s
25/10/31 14:13:34 INFO DAGScheduler: Job 13 is finished. Cancelling potential speculative or zombie tasks for this job
25/10/31 14:13:34 INFO TaskSchedulerImpl: Killing all running tasks in stage 20: Stage finished
25/10/31 14:13:34 INFO DAGScheduler: Job 13 finished: showString at NativeMethodAccessorImpl.java:0, took 0.289130 s
25/10/31 14:13:34 INFO CodeGenerator: Code generated in 11.611959 ms
+----+-----+-------+
|year|month|records|
+----+-----+-------+
|2023|    1|  41843|
|2023|    2|  37877|
|2023|    3|  41719|
|2023|    4|  40879|
|2023|    5|  41635|
|2023|    6|  40446|
|2023|    7|  41559|
|2023|    8|  42112|
|2023|    9|  40616|
|2023|   10|  42202|
|2023|   11|  40537|
|2023|   12|  41747|
|2024|    1|  41902|
|2024|    2|  39241|
|2024|    3|  41821|
|2024|    4|  40300|
|2024|    5|  41863|
|2024|    6|  40737|
|2024|    7|  41658|
|2024|    8|  41755|
+----+-----+-------+
only showing top 20 rows

25/10/31 14:13:34 INFO SparkContext: SparkContext is stopping with exitCode 0.
25/10/31 14:13:34 INFO SparkUI: Stopped Spark web UI at http://csv-to-iceberg-bb44746b-6a0b669a3a9b5a27-driver-svc.sparkcluster-d6bllks6.svc:4040
25/10/31 14:13:34 INFO KubernetesClusterSchedulerBackend: Shutting down all executors
25/10/31 14:13:34 INFO KubernetesClusterSchedulerBackend$KubernetesDriverEndpoint: Asking each executor to shut down
25/10/31 14:13:34 WARN ExecutorPodsWatchSnapshotSource: Kubernetes client has been closed.
25/10/31 14:13:36 INFO MapOutputTrackerMasterEndpoint: MapOutputTrackerMasterEndpoint stopped!
25/10/31 14:13:36 INFO MemoryStore: MemoryStore cleared
25/10/31 14:13:36 INFO BlockManager: BlockManager stopped
25/10/31 14:13:36 INFO BlockManagerMaster: BlockManagerMaster stopped
25/10/31 14:13:36 INFO OutputCommitCoordinator$OutputCommitCoordinatorEndpoint: OutputCommitCoordinator stopped!
25/10/31 14:13:36 INFO SparkContext: Successfully stopped SparkContext
25/10/31 14:13:36 INFO ShutdownHookManager: Shutdown hook called
25/10/31 14:13:36 INFO ShutdownHookManager: Deleting directory /tmp/spark-e60b7816-a79e-4714-b604-b3d99e596c3b
25/10/31 14:13:36 INFO ShutdownHookManager: Deleting directory /var/data/spark-78eb8144-3995-4020-b405-d958cf8ad55d/spark-816ef3c8-5c1b-4fc2-8f44-66a853d9a2e1/pyspark-72c51ad4-cb59-46ba-8221-7b7dbc433879
25/10/31 14:13:36 INFO ShutdownHookManager: Deleting directory /var/data/spark-78eb8144-3995-4020-b405-d958cf8ad55d/spark-816ef3c8-5c1b-4fc2-8f44-66a853d9a2e1
25/10/31 14:13:36 INFO MetricsSystemImpl: Stopping s3a-file-system metrics system...
25/10/31 14:13:36 INFO MetricsSystemImpl: s3a-file-system metrics system stopped.
25/10/31 14:13:36 INFO MetricsSystemImpl: s3a-file-system metrics system shutdown complete.