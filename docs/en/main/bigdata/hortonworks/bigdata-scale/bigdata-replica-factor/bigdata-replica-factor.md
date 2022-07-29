By default, Hadoop and Spark clusters in VK Cloud Solutions use a data replication factor (dfs.replication) of 1. Using this replication factor value means that HDFS data will be stored in a single instance in the cluster. At the same time, the redundancy and reliability of data storage are provided exclusively by the underlying SDS (Software Defined Storage) infrastructure connected to the cluster servers via a high-speed communication channel.

If necessary, the HDFS replication factor can be changed to higher values. In this case, data storage redundancy will be provided both at the level of HDFS itself and at the level of block data storage in SDS, which will provide even greater reliability and speed of data processing.

To change the replication factor for individual files, use the "hdfs dfs -setrep" command:

```
hdfs dfs -setrep 3 /user/admin/superstore.csv
```

To recursively apply to a directory, add the -R flag:

```
hdfs dfs -setrep 3 -R /user/admin
```

To obtain a given number of copies, use the "hdfs dfs -stat" command:

```
hdfs dfs -stat %r /path/to/file
```

To get the actual number of copies, you can use "hdfs fsck":

```
$ hdfs fsck /user/admin/data.csv
/user/admin/data.csv: Under replicated BP-1014754436-192.168.99.119-1532095262675:blk\_1073743175\_2396. Target Replicas is 3 but found 1 live replica(s), 0 decommissioned replica(s) and 0 decommissioning replica(s).
Status: HEALTHY
Total size: 2878934 B
Total dirs: 0
Total files: 1
Total symlinks: 0
Total blocks (validated): 1 (avg. block size 2878934 B)
Minimally replicated blocks: 1 (100.0%)
Over-replicated blocks: 0 (0.0%)
Under-replicated blocks: 1 (100.0%)
Mis-replicated blocks: 0 (0.0%)
Default replication factor: 1
Average block replication: 1.0
Corrupt blocks: 0
Missing replicas: 2 (66.666664%)
Number of data-nodes: 1
Number of racks: 1
FSCK ended at Mon Jul 23 17:20:46 UTC 2018 in 1 millisecond
The filesystem under path '/user/admin/data.csv' is HEALTHY
```

A non-zero number of "Under-replicated blocks" in the fsck output may mean that the specified number of data copies for the specified file has not yet been reached, for example, due to the lack of the required number of nodes.

When reducing the cluster size during scaling, the VK Cloud Solutions BigData service automatically waits for data to move to other nodes and for the number of under-replicated blocks to decrease to zero before shutting down the decommissioned node. If one or more files have a replication factor greater than the target number of worker nodes, then the scaling process will wait indefinitely until the number of copies is reduced to the target number of worker nodes.

To change the replication factor for all new files, go to the Ambari interface, HDFS section, Configs tab, Advanced tab:

In the General section, change the "Blocks Replication" (dfs.replication) value to what you need and apply the configuration:

If you need to change the default replication factor for all new clusters, please contact [support](https://help.mail.ru/infra/support).
