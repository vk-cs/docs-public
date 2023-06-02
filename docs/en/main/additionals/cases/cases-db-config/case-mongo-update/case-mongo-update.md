In this article, we will look at how to replicate and upgrade MongoDB on Ubuntu 18.04.

<info>

**Note**

You can learn about the hardware configuration, as well as how to install and configure MongoDB in the article [Installing and configuring MongoDB on Ubuntu](https://mcs.mail.ru/help/databases-configuration/mongodb-installation).

</info>

<info>

In the description below, we use the following server names and IP addresses:

- server 1 - mongo1.testdomain.com (10.0.0.2);
- server 2 - mongo2.testdomain.com (10.0.0.3);
- server 3 - mongo1.testdomain.com (10.0.0.4).

</info>

## Set up ReplicaSet MongoDB

Replicaset is multiple servers that contain the same set of data, provide failover protection, and provide high data availability. Replicaset MongoDB has one primary node for writing and reading, and one or more secondary nodes that are synchronized with the primary node and provide the ability to read data to reduce load. In the event of a failure in the operation of the primary node, one of the secondary nodes is automatically assigned as the primary node. To speed up the selection of a new primary node, an arbiter node is designed that does not contain data. Also, the advantage of Replicaset is the ability to update the cluster without having to stop its operation.

1. Make sure port 27017 is open on all three servers.
2. Make sure the name of each host (`mongo1.testdomain.com`, `mongo2.testdomain.com`, `mongoar.testdomain.com`) is known on each server. If the names are not registered in DNS, on each server, specify them in the `/etc/hosts` file. In our case:

```
10.0.0.2 mongo1 mongo1.testdomain.com
10.0.0.3 mongo2 mongo2.testdomain.com
10.0.0.4 mongoar mongoar.testdomain.com
```

3. Add the following to the `/etc/mongod.conf` configuration file in the `replication` section:

```
replication:
    replSetName: "rs0"
security:
    authorization: enabled
    clusterAuthMode: x509
    clusterIpSourceWhitelist:
    - 10.0.0.2
    - 10.0.0.3
    - 10.0.0.4
- 127.0.0.1
```

4. Restart `mongod`:

```
root@mongo1:~# systemctl restart mongod.service
```

5. Log into the `mongo` console and run the command:

```
\> rs.initiate()
{
    "info2" : "no configuration specified. Using a default configuration for the set",
    "me" : "mongo1:27017",
    "ok" : 1
}
rs0:SECONDARY>
rs0:PRIMARY>
```

`Replicaset` is initialized, node is in `primary` state.

6. In the configuration file, in the `host` variable, instead of the value `mongo1:27017`, specify the CommonName value of the certificate:

```
rs0:PRIMARY> cfg.members[0].host = "mongo1.testdomain.com:27017"
mongo1.testdomain.com:27017
rs0:PRIMARY> rs.reconfig(cfg)
{
    "ok" : 1,
    "operationTime" : Timestamp(1577365311, 1),
    "$clusterTime" : {
    "clusterTime" : Timestamp(1577365311, 1),
    "signature" : {
 "hash" : BinData(0,"4b6xDb/6y5tuq9jDjEDjbscYmGk="),
    "keyId" : NumberLong("6774685910094053378")
        }
    }
}
rs0:PRIMARY>
```

7. Log in to the `mongo2` server, import the MongoDB repository key, add the MongoDB repository and install MongoDB (how to do this, see the article [Installing and configuring MongoDB on Ubuntu](https://mcs.mail.ru/help/databases-configuration/mongodb-installation)).
8. If you edited the `/etc/hosts` file on the `mongo1` server, do the same on the current server.
9. From the mongo1 server, copy the configuration file `/etc/mongod.conf` to the current server, change the key name in the file `PEMKeyFile:` from `/etc/ssl/mongo1.pem` to `PEMKeyFile: /etc/ssl/mongo2 .pem`.
10. Copy the `/etc/ssl/mongoCA.pem` key to the current server.
11. Issue the server certificate, just like on the `mongo1` server, using `mongo2.testdomain.com` as the CommonName:

```
root@mongo2:~# openssl genrsa -out /tmp/mongo2.key 4096
root@mongo2:~# openssl req -new -key /tmp/mongo2.key -out /tmp/mongo2.csr
...
Common Name (e.g. server FQDN or YOUR name) []:mongo2.testdomain.com
...
root@mongo2:~# openssl x509 -req -in /tmp/mongo2.csr -CA /etc/ssl/mongoCA.pem -CAcreateserial -out /tmp/mongo2.crt -days 10000
root@mongo2:~# cat /tmp/mongo2.key /tmp/mongo2.crt > /etc/ssl/mongo2.pem
root@mongo2:~# rm /tmp/mongo2.key /tmp/mongo2.crt /tmp/mongo2.csr
```

12. If the `var/lib/mongodb` folder is not empty, delete all files from it.
13. Restart the `mongod` server and add it to the list of applications to load automatically.
14. Login to the `mongo1` server and log into the mongo console.
15. Add the `mongo2` server to `replicaset`:

```
root@mongo1:~# mongo --ssl --sslPEMKeyFile /etc/ssl/client.pem --sslCAFile /etc/ssl/mongoCA.pem --host mongo1.testdomain.com -u admin
MongoDB shell version v4.0.14
Enter password:
connecting to: mongodb://mongo1.testdomain.com:27017/?gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("7a4087c2-470c-48ce-8c8d-af10fb4aa9a7") }
MongoDB server version: 4.0.14rs0:PRIMARY> rs.add({ host: "mongo2.testdomain.com:27017" })
{
    "ok" : 1,
    "operationTime" : Timestamp(1577364817, 1),
    "$clusterTime" : {
        "clusterTime" : Timestamp(1577364817, 1),
        "signature" : {
            "hash" : BinData(0,"t5nfdP1DMgNaAcUsvYXy2luwNvg="),
            "keyId" : NumberLong("6774685910094053378")
        }
    }
}
rs0:PRIMARY>

```

16. Check the status of `replicaset`:

```
rs0:PRIMARY> rs.status()
{
    "set" : "rs0",
    "date" : ISODate("2019-12-26T13:06:09.455Z"),
    "myState" : 1,
    "term" : NumberLong(5),
    "syncTo" : "",
    "syncSourceHost" : "",
    "syncSourceId" : -1,
    "heartbeatIntervalMillis" : NumberLong(2000),
    "optimum" : {
        "lastCommittedOpTime" : {
            "ts" : Timestamp(1577365562, 1),
            "t" : NumberLong(5)
        },
        "readConcernMajorityOpTime" : {
            "ts" : Timestamp(1577365562, 1),
            "t" : NumberLong(5)
        },
        "appliedOpTime" : {
            "ts" : Timestamp(1577365562, 1),
            "t" : NumberLong(5)
        },
        "durableOpTime" : {
            "ts" : Timestamp(1577365562, 1),
            "t" : NumberLong(5)
        }
    },
    "lastStableCheckpointTimestamp" : Timestamp(1577365562, 1),
    "electionCandidateMetrics" : {
        "lastElectionReason" : "electionTimeout",
        "lastElectionDate" : ISODate("2019-12-26T12:30:20.224Z"),
        "electionTerm" : NumberLong(5),
        "lastCommittedOpTimeAtElection" : {
            "ts" : Timestamp(0, 0),
            "t" : NumberLong(-1)
        },
        "lastSeenOpTimeAtElection" : {
            "ts" : Timestamp(1577363413, 1),
            "t" : NumberLong(4)
    },
    "numVotesNeeded" : 1,
    "priorityAtElection" : 1,
    "electionTimeoutMillis" : NumberLong(10000),
    "newTermStartDate" : ISODate("2019-12-26T12:30:22.224Z"),
    "wMajorityWriteAvailabilityDate" : ISODate("2019-12-26T12:30:22.358Z")
    },
    "member" : [
        {
            "_id" : 0,
            "name" : "mongo1.testdomain.com:27017",
            "health" : 1,
            "state" : 1,
            "stateStr" : "PRIMARY",
            "uptime" : 2154,
            "optime" : {
                "ts" : Timestamp(1577365562, 1),
                "t" : NumberLong(5)
        },
        "optimeDate" : ISODate("2019-12-26T13:06:02Z"),
        "syncTo" : "",
        "syncSourceHost" : "",
        "syncSourceId" : -1,
        "infoMessage" : "",
        "electionTime" : Timestamp(1577363420, 1),
        "electionDate" : ISODate("2019-12-26T12:30:20Z"),
        "configVersion" : 70500,
        "self" : true
        "lastHeartbeatMessage" : ""
    },
    {
        "_id" : 1,
        "name" : "mongo2.testdomain.com:27017",
        "health" : 1,
        "state" : 2,
        "stateStr" : "SECONDARY",
        "uptime" : 26,
        "optime" : {
            "ts" : Timestamp(1577365562, 1),
            "t" : NumberLong(5)
    },
    "optimeDurable" : {
        "ts" : Timestamp(1577365562, 1),
"t" : NumberLong(5)
},
            "optimeDate" : ISODate("2019-12-26T13:06:02Z"),
            "optimeDurableDate" : ISODate("2019-12-26T13:06:02Z"),
            "lastHeartbeat" : ISODate("2019-12-26T13:06:08.795Z"),
            "lastHeartbeatRecv" : ISODate("2019-12-26T13:06:09.139Z"),
            "pingMs" : NumberLong(1),
            "lastHeartbeatMessage" : "",
            "syncingTo" : "mongo1.testdomain.com:27017",
            "syncSourceHost" : "mongo1.testdomain.com:27017",
            "syncSourceId" : 0,
            "infoMessage" : "",
            "configVersion" : 70500
        }
    ],
    "ok" : 1,
    "operationTime" : Timestamp(1577365562, 1),
    "$clusterTime" : {
        "clusterTime" : Timestamp(1577365562, 1),
        "signature" : {
            "hash" : BinData(0,"9Y9LWPudizuTGUP0+M2wMihAFO8="),
            "keyId" : NumberLong("6774685910094053378")
        }
    }
}
rs0:PRIMARY>
```

As you can see, the second node with `_id=1` is accepted into `Repliset` in the `secondary` state.

When a node is added to `replicaset`, synchronization occurs with the primary node. Until the synchronization is completed, the second node will be in the STARTUP state. Writing data to the main node slows down the synchronization, however, this is a possible scenario (for example, when writing to the database, the database of about 350 GB was synchronized for about 14 hours).Once the synchronization is complete, on the third server (`mongoar`) do the same as on the second (`mongo2`), except for the step of adding the server to `repliset`:

```
rs0:PRIMARY> rs.addArb("mongoar.testdomain.com:27017")
{
"ok" : 1,
"operationTime" : Timestamp(1577366355, 1),
"$clusterTime" : {
"clusterTime" : Timestamp(1577366355, 1),
"signature" : {
"hash" : BinData(0,"pA6zLoq8JmYCFM2HZVAhr4pvK1A="),
"keyId" : NumberLong("6774685910094053378")
}
}
}
rs0:PRIMARY>
```

Check the status of `Repliset` (nothing is omitted from the output for brevity):

```
rs0:PRIMARY> rs.status()
{
"set" : "rs0",
"date" : ISODate("2019-12-26T13:21:20.710Z"),
"myState" : 1,
"members" : [
{
"_id" : 0,
"name" : "mongo1.testdomain.com:27017",
"health" : 1,
"state" : 1,
"stateStr" : "PRIMARY",
"uptime" : 3065,
},
{
"_id" : 1,
"name" : "mongo2.testdomain.com:27017",
"health" : 1,
"state" : 2,
"stateStr" : "SECONDARY",
"uptime" : 937,
},
{
"_id" : 2,
"name" : "mongoar.testdomain.com:27017",
"health" : 1,
"state" : 7,
"stateStr" : "ARBITER",
"uptime" : 125,
}
}
```

As a result, we got a `primary` node, a `secondary` node and an `arbiter` node. `Repliset` is synchronized and is in a healthy state.

## Update Replicaset MongoDB

Let's consider an update using the transition from version 4.0 to version 4.2 as an example. To understand what changes might break the current data schema, please refer to [document](https://docs.mongodb.com/manual/release-notes/4.2-upgrade-replica-set/).

1. Change the `feature compatibility version` parameter to limit the version of MongoDB that can be used with the current dataset. To upgrade from version 4.0 to version 4.2, set it to 4.0:

```
rs0:PRIMARY> db.adminCommand( { setFeatureCompatibilityVersion: "4.0" } )
{
    "ok" : 1,
    "operationTime" : Timestamp(1577429084, 1),
    "$clusterTime" : {
        "clusterTime" : Timestamp(1577429084, 1),
        "signature" : {
            "hash" : BinData(0,"mL6lecQQeLB8QkjNqrJIGA+ICiY="),
            "keyId" : NumberLong("6774685910094053378")
        }
    }
}

```

2. Check the result:

```
rs0:PRIMARY> db.adminCommand( { getParameter: 1, featureCompatibilityVersion: 1 } )
{
        "featureCompatibilityVersion" : {
            "version" : "4.0"
    },
    "ok" : 1,
    "operationTime" : Timestamp(1577429094, 1),
    "$clusterTime" : {
        "clusterTime" : Timestamp(1577429094, 1),
        "signature" : {
            "hash" : BinData(0,"Mo5HB7K+IVwAivtJ4ZCC4GMKOAk="),
            "keyId" : NumberLong("6774685910094053378")
    }
}

```

3. Connect the repository with the new version of MongoDB on all three servers (example for the first server):

```
root@mongo1:~# wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt key add -
OK
root@mongo1:~# echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
deb [arch=amd64] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2multiverse
root@mongo1:~# apt-get update


```

4. Based on [documentation](https://docs.mongodb.com/manual/reference/read-concern-majority/#disable-read-concern-majority), into the configuration file [/etc/mongod.conf](./assets/mongod.conf_4 "download") add the option `enableMajorityReadConcern: false` and replace `net:ssl` with `net:tls` (arbiter example):

```
net:
  port: 27017
  bindIP: 0.0.0.0
  tls:
      mode: requireTLS
      certificateKeyFile: /etc/ssl/mongoar.pem
      CAFile: /etc/ssl/mongoCA.pem


replication:
replSetName: "rs0"
enableMajorityReadConcern: false
```

5. Update the arbiter node:

```
root@mongoar:~# systemctl stop mongod.service
root@mongoar:~# apt-get install -y mongodb-org mongodb-org-mongos mongodb-org-server mongodb-org-shell mongodb-org-tools
root@mongoar:~# systemctl start mongod.service
```

6. Check the status of `rs.status()`. Make sure the arbiter is running and see which of the two remaining nodes is `secondary` (command output shortened):

```
rs0:PRIMARY> rs.status()
{
    "set" : "rs0",
    "date" : ISODate("2019-12-27T06:54:13.228Z"),
    "myState" : 1,
    "term" : NumberLong(6),

    "member" : [
        {
            "_id" : 0,
            "name" : "mongo1.testdomain.com:27017",
            "health" : 1,
            "state" : 1,
            "stateStr" : "PRIMARY",
        },
        {
            "_id" : 1,
            "name" : "mongo2.testdomain.com:27017",
            "health" : 1,
            "state" : 2,
            "stateStr" : "SECONDARY",
        },
        {
            "_id" : 2,
            "name" : "mongoar.testdomain.com:27017",
            "health" : 1,
            "state" : 7,
            "stateStr" : "ARBITER",
}
```

7. Currently `mongo2` server is `secondary`, update MongoDB on it:

```
root@mongo2:~# systemctl stop mongod.service
root@mongo2:~# apt-get install -y mongodb-org
The following packages will be upgraded:
mongodb-org
Preparing to unpack .../mongodb-org_4.2.2_amd64.deb ...
Unpacking mongodb-org (4.2.2) over (4.0.14) ...
Setting up mongodb-org (4.2.2) ...
root@mongo2:~# systemctl start mongod.service
```

8. Check `rs.status()` to make sure the node is running:

```
rs0:PRIMARY> rs.status()
{
    "set" : "rs0",
    "date" : ISODate("2019-12-27T07:08:22.025Z"),
    "myState" : 1,
"members" : [
    {
        "_id" : 0,
        "name" : "mongo1.testdomain.com:27017",
        "health" : 1,
        "state" : 1,
        "stateStr" : "PRIMARY",
    },
    {
        "_id" : 1,
        "name" : "mongo2.testdomain.com:27017",
        "health" : 1,
        "state" : 2,
        "stateStr" : "SECONDARY",
    },
    {
        "_id" : 2,
        "name" : "mongoar.testdomain.com:27017",
        "health" : 1,
        "state" : 7,
        "stateStr" : "ARBITER",
    }
}
```

9. Force change the `primary` node to the one you have already updated (in our case, `mongo2`):

```
rs0:PRIMARY> rs.stepDown()
2019-12-27T12:25:10.922+0000 I NETWORK [js] DBClientConnection failed to receive message from mongo1.testdomain.com:27017 - SocketException: stream truncated
2019-12-27T12:25:10.923+0000 E QUERY [js] Error: error doing query: failed: network error while attempting to run command 'replSetStepDown' on host 'mongo1.testdomain.com:27017' :
DB.prototype.runCommand@src/mongo/shell/db.js:168:1
DB.prototype.adminCommand@src/mongo/shell/db.js:186:16
rs.stepDown@src/mongo/shell/utils.js:1489:12
@(shell):1:1
2019-12-27T12:25:10.924+0000 I NETWORK [js] trying to reconnect to mongo1.testdomain.com:27017 failed
2019-12-27T12:25:10.941+0000 I NETWORK [js] reconnect mongo1.testdomain.com:27017 ok
rs0:SECONDARY>

```

10. Now the mongo1 node has become `secondary`, update it in the same way as the previous one.
11. Check the status of `replicaset` after the update (output shortened):

```
rs0:SECONDARY> rs.status()
{
    "set" : "rs0",
    "date" : ISODate("2019-12-27T12:30:03.888Z"),
    "myState" : 2,
    "term" : NumberLong(6),
    "syncingTo" : "mongo2.testdomain.com:27017",
    "syncSourceHost" : "mongo2.testdomain.com:27017",
    "syncSourceId" : 1,
    "heartbeatIntervalMillis" : NumberLong(2000),
    "majorityVoteCount" : 2,
    "writeMajorityCount" : 2,
    "member" : [
        {
            "_id" : 0,
            "name" : "mongo1.testdomain.com:27017",
            "ip" : "89.208.223.162",
            "health" : 1,
            "state" : 2,
            "stateStr" : "SECONDARY",

        },
        {
            "_id" : 1,
            "name" : "mongo2.testdomain.com:27017",
            "ip" : "95.163.212.165",
            "health" : 1,
            "state" : 1,
            "stateStr" : "PRIMARY",
        },
        {
            "_id" : 2,
            "name" : "mongoar.testdomain.com:27017",
            "ip" : "95.163.215.118",
            "health" : 1,
            "state" : 7,
        "stateStr" : "ARBITER",
        }
    ],
    "ok" : 1,
    "$clusterTime" : {
        "clusterTime" : Timestamp(1577449801, 1),
        "signature" : {
            "hash" : BinData(0,"cC03fOHq3hLJX5oorqgTGlDuick="),
            "keyId" : NumberLong("6775081949028417537")
        }
    },
    "operationTime" : Timestamp(1577449801, 1)
}
rs0:SECONDARY>
```

All completed successfully. If there is a need to preserve the order of the nodes that was before the update, go to the console of the current `primary` node (`mongo2`) and run the command:

```
rs.stepDown()
```

The node will become `secondary`, the `primary` node will become `mongo1`, as it was before the upgrade.

We performed the upgrade without taking the cluster out of service, that is, seamlessly.

If upgrading a single MongoDB server, update the `feature compatibility version` parameter, link the repository with the new `mongodb` version, fix the server configuration file, and upgrade the `mongodb` server to the new version as described above. In this case, a server shutdown will be required.

## Feedback

Any problems or questions? [Write to us, we will be happy to help you](https://mcs.mail.ru/help/contact-us).
