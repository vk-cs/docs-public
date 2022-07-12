## Introduction

To manage a PostgreSQL-based cloud cluster in our cloud, Patroni is used. It is he who performs the automatic switching of the master VM in case of problems. Due to the high consistency guarantees, switching the master (that is, turning one of the replicas into a head node) is a rather destructive action.

It is assumed that the following steps occur when switching:

- The selected replica (preferably with synchronous replication) receives a command to detach from the master (stops receiving WAL from him).
- On the tail of the WAL that it has, it does redo (application of completed transactions, rollback of outstanding ones), increments the Timeline, and switches to normal operation (that is, it accepts both read and write requests).
- The former master must be destroyed ([STONITH](https://en.wikipedia.org/wiki/STONITH)) since he does not have a tool for understanding that he is not a legitimate master, and so that he does not continue to serve customers, it is easiest to repay him.

All this is done by the Patroni service (and for consensus between nodes, it uses an external DCS — etcd). At the same time, the former master (if the server itself is in order as a whole) is immediately transferred to the replica status (using the pg_rewind utility). Thus, the cluster as a whole continues to work. It was mentioned that switching is destructive, what does that mean?

- Transactions that have passed commit on both the current master and the potential master are out of the risk zone. Therefore, you should choose a synchronous replica, since, in theory, they have completely identical information.
- For transactions that have not passed committed completely, adventures begin. If the current master manages to respond to the client about the success of the transaction, but it does not reach the future master, the client will think that everything was successful, but this data will be lost. If the master does not have time to respond, then the client will receive a stop command (got immediate shutdown request), or a TCP break (depending on the method of the master's death) and must consider the transaction to be committed. The most important pattern of writing applications is that the captured transactions should be deleted by the application itself. That is, data loss in such a situation is the fault of the application. The next connection to the cluster should go to the new master.

## Switching

How the switching was carried out:

- All connections were made via LB, which is created together with the cluster.
- During the switch, the load was supplied via pgbench so that the cluster would not be idle.
- A special script was used, which was inserted every second.

Keep in mind that switching may take longer if there are a lot of requests to the cluster and there may be a lot of WAL for redo.

## Regular switching

It is also possible to manually switch the wizard. Such switches are the fastest since patroni does not expect a timeout (suddenly it's just a flop on the master).

| Disk type | Switching time |
|--------------|--------------------|
| dp1-ssd | no more than 15 seconds |
| dp1-highiops | no more than 8 seconds |

## Freelance switching

As a way to disable the wizard — disabling the network interface on the wizard. This is a rather rigid scheme since both the patroni daemon and etcd disappear from the cluster. Why is it taking longer here? Because Patroni has a TTL setting (default is 30 seconds). He will wait so long to make sure that this is not just a master's collapse. And then the real switching will begin.

| Disk type | Switching time |
|--------------|--------------------|
| dp1-ssd | no more than 45 seconds |
| dp1-highiops | no more than 40 seconds |
