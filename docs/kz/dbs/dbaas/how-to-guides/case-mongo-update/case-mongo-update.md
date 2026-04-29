{include(/kz/_includes/_translated_by_ai.md)}

Бұл мақалада Ubuntu 18.04 жүйесінде MongoDB-ді қалай репликациялау және жаңарту керектігін қарастырамыз.

{note:info}

Жабдық конфигурациясы туралы, сондай-ақ MongoDB-ді қалай орнату және баптау керектігі туралы [Ubuntu жүйесінде MongoDB орнату және баптау](../../instructions/create/create-single-replica) мақаласынан біле аласыз.

{/note}

{note:info}

Төмендегі сипаттамада серверлердің келесі атаулары мен IP мекенжайларын қолданамыз:

- сервер 1 - mongo1.testdomain.com (10.0.0.2);
- сервер 2 - mongo2.testdomain.com (10.0.0.3);
- сервер 3 - mongo1.testdomain.com (10.0.0.4).

{/note}

## MongoDB ReplicaSet баптауы

Replicaset  — бұл бірдей деректер жиынын қамтитын, ақаулардан қорғанысты және деректердің жоғары қолжетімділігін қамтамасыз ететін бірнеше сервер. MongoDB  Replicaset ішінде  жазу мен оқу үшін бір primary түйіні және primary түйінімен синхрондалған әрі жүктемені азайту үшін деректерді оқу мүмкіндігін беретін бір немесе бірнеше secondary түйіндері болады. Primary түйіні істен шыққан жағдайда, secondary түйіндерінің бірі автоматты түрде primary түйіні болып тағайындалады. Жаңа primary түйінін таңдауды жеделдету үшін деректерді қамтымайтын арбитр түйіні арналған. Сонымен қатар, Replicaset  артықшылықтарының бірі — кластердің жұмысын тоқтатпай жаңарту мүмкіндігі.

1.  Барлық үш серверде 27017 порты ашық екеніне көз жеткізіңіз.
2.  Әр хосттың атауы (`mongo1.testdomain.com`, `mongo2.testdomain.com`, `mongoar.testdomain.com`) әр серверде белгілі екеніне көз жеткізіңіз. Егер атаулар DNS ішінде көрсетілмесе, әр серверде оларды `/еtc/hosts` файлына жазыңыз. Біздің жағдайда:

```text
10.0.0.2 mongo1 mongo1.testdomain.com
10.0.0.3 mongo2 mongo2.testdomain.com
10.0.0.4 mongoar mongoar.testdomain.com
```

3.  `/etc/mongod.conf` конфигурациялық файлының `replication` секциясына келесіні қосыңыз:

```yaml
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

4.  `mongod` қызметін қайта іске қосыңыз:

```sql
root@mongo1:~# systemctl restart mongod.service
```

5.  `mongo` консоліне кіріп, команданы орындаңыз:

```sql
\> rs.initiate()
{
    "info2" : "no configuration specified. Using a default configuration for the set",
    "me" : "mongo1:27017",
    "ok" : 1
}
rs0:SECONDARY>
rs0:PRIMARY>
```

`Replicaset` инициализацияланды, түйін `primary` күйінде тұр.

6.  Конфигурациялық файлдағы `host` айнымалысында `mongo1:27017` мәнінің орнына сертификаттың CommonName мәнін көрсетіңіз:

```sql
rs0:PRIMARY> cfg.members[0].host = "mongo1.testdomain.com:27017"
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

7.  `mongo2` серверінде авторизациядан өтіңіз, MongoDB репозиторийінің кілтін импорттаңыз, MongoDB репозиторийін қосыңыз және MongoDB-ді орнатыңыз (мұны қалай жасау керектігін [Ubuntu жүйесінде MongoDB орнату және баптау](../../instructions/create/create-single-replica) мақаласынан оқыңыз).
8.  Егер `/etc/hosts` файлын `mongo1` серверінде өзгерткен болсаңыз, ағымдағы серверде де соны қайталаңыз.
9.  `mongo1` серверінен `/etc/mongod.conf` конфигурациялық файлын ағымдағы серверге көшіріңіз, файлда `PEMKeyFile:` кілтінің атауын `/etc/ssl/mongo1.pem` мәнінен `PEMKeyFile: /etc/ssl/mongo2.pem` мәніне ауыстырыңыз.
10. Ағымдағы серверге `/etc/ssl/mongoCA.pem` кілтін көшіріңіз.
11. `mongo1` серверіндегідей сервер сертификатын шығарыңыз, бұл ретте CommonName ретінде `mongo2.testdomain.com` қолданыңыз:

```sql
root@mongo2:~# openssl genrsa -out /tmp/mongo2.key 4096
root@mongo2:~# openssl req -new -key /tmp/mongo2.key -out /tmp/mongo2.csr
...
Common Name (e.g. server FQDN or YOUR name) []:mongo2.testdomain.com
...
root@mongo2:~# openssl x509 -req -in /tmp/mongo2.csr -CA /etc/ssl/mongoCA.pem -CAcreateserial -out /tmp/mongo2.crt -days 10000
root@mongo2:~# cat /tmp/mongo2.key /tmp/mongo2.crt > /etc/ssl/mongo2.pem
root@mongo2:~# rm /tmp/mongo2.key /tmp/mongo2.crt /tmp/mongo2.csr
```

12. Егер `var/lib/mongodb` директориясы бос болмаса, оның ішіндегі барлық файлдарды жойыңыз.
13. `mongod` серверін қайта іске қосыңыз және оны автоматты түрде жүктелетін қолданбалар тізіміне қосыңыз.
14. `mongo1` серверіне кіріп, mongo консоліне өтіңіз.
15. `mongo2` серверін `replicaset` құрамына қосыңыз:

```sql
root@mongo1:~# mongo --ssl --sslPEMKeyFile /etc/ssl/client.pem --sslCAFile /etc/ssl/mongoCA.pem  --host mongo1.testdomain.com -u admin
MongoDB shell version v4.0.14
Enter password:
connecting to: mongodb://mongo1.testdomain.com:27017/?gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("7a4087c2-470c-48ce-8c8d-af10fb4aa9a7") }
MongoDB server version: 4.0.14


rs0:PRIMARY> rs.add({ host: "mongo2.testdomain.com:27017" })
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

16. `replicaset` күйін тексеріңіз:

```sql
rs0:PRIMARY> rs.status()
{
    "set" : "rs0",
    "date" : ISODate("2019-12-26T13:06:09.455Z"),
    "myState" : 1,
    "term" : NumberLong(5),
    "syncingTo" : "",
    "syncSourceHost" : "",
    "syncSourceId" : -1,
    "heartbeatIntervalMillis" : NumberLong(2000),
    "optimes" : {
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
    "members" : [
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
        "syncingTo" : "",
        "syncSourceHost" : "",
        "syncSourceId" : -1,
        "infoMessage" : "",
        "electionTime" : Timestamp(1577363420, 1),
        "electionDate" : ISODate("2019-12-26T12:30:20Z"),
        "configVersion" : 70500,
        "self" : true,
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

Көріп тұрғанымыздай, `_id=1` болатын екінші түйін `Repliset` құрамына `secondary` күйінде қабылданды.

Түйінді `replicaset` құрамына қосқанда primary түйінінен синхрондау жүреді. Синхрондау аяқталғанша, екінші түйін STARTUP күйінде болады. Негізгі түйінге деректер жазу синхрондауды баяулатады, дегенмен бұл мүмкін сценарий (мысалы, көлемі шамамен 350 ГБ болатын базаға жазу кезінде синхрондау шамамен 14 сағатқа созылды).

Синхрондау аяқталғаннан кейін үшінші серверде (`mongoar`) екінші сервердегідей (`mongo2`) әрекеттерді орындаңыз, тек серверді `repliset` құрамына қосу қадамын қоспағанда:

```sql
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

`Repliset` күйін тексеріңіз (қысқалық үшін шығыстан елеусіз бөлігі алынып тасталды):

```sql
rs0:PRIMARY> rs.status()
{
    "set" : "rs0",
    "date" : ISODate("2019-12-26T13:21:20.710Z"),
    "myState" : 1,
"members" : [
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

Нәтижесінде біз `primary` түйінін, `secondary` түйінін және `arbiter` түйінін алдық. `Repliset` синхрондалған және жұмысқа қабілетті күйде тұр.

## MongoDB ReplicaSet жаңарту

Жаңартуды 4.0 нұсқасынан 4.2 нұсқасына көшу мысалында қарастырайық. Ағымдағы деректер сызбасын жұмыс істемейтін күйге әкелуі мүмкін өзгерістерді түсіну үшін [құжатпен](https://docs.mongodb.com/manual/release-notes/4.2-upgrade-replica-set/) танысыңыз.

1.  Ағымдағы деректер жиынымен қолдануға болатын MongoDB нұсқасын шектейтін `feature compatibility version` параметрін өзгертіңіз. 4.0 нұсқасынан 4.2 нұсқасына жаңарту үшін оны 4.0 мәніне орнатыңыз:

```sql
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

2.  Нәтижені тексеріңіз:

```sql
rs0:PRIMARY> db.adminCommand( { getParameter: 1, featureCompatibilityVersion: 1 } )
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

3.  Барлық үш серверде MongoDB-дің жаңа нұсқасы бар репозиторийді қосыңыз (бірінші серверге арналған мысал):

```sql
root@mongo1:~# wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
OK
root@mongo1:~# echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse
root@mongo1:~# apt-get update


```

4.  [Құжаттамаға](https://docs.mongodb.com/manual/reference/read-concern-majority/#disable-read-concern-majority) сәйкес [/etc/mongod.conf](./assets/mongod.conf "download") конфигурациялық файлына `enableMajorityReadConcern: false` опциясын қосыңыз және `net:ssl` параметрін `net:tls` параметріне ауыстырыңыз (арбитрге арналған мысал):

```yaml
net:
  port: 27017
  bindIp: 0.0.0.0
  tls:
      mode: requireTLS
      certificateKeyFile: /etc/ssl/mongoar.pem
      CAFile: /etc/ssl/mongoCA.pem


replication:
replSetName: "rs0"
enableMajorityReadConcern: false
```

5.  Арбитр түйінін жаңартыңыз:

```sql
root@mongoar:~# systemctl stop mongod.service
root@mongoar:~# apt-get install -y mongodb-org mongodb-org-mongos mongodb-org-server mongodb-org-shell mongodb-org-tools
root@mongoar:~# systemctl start mongod.service
```

6.  `rs.status()` күйін тексеріңіз. Арбитрдің жұмыс істеп тұрғанына көз жеткізіңіз және қалған екі түйіннің қайсысы `secondary` екенін қараңыз (команда шығысы қысқартылған):

```sql
rs0:PRIMARY> rs.status()
{
    "set" : "rs0",
    "date" : ISODate("2019-12-27T06:54:13.228Z"),
    "myState" : 1,
    "term" : NumberLong(6),

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
```

7.  Қазіргі сәтте `mongo2` сервері `secondary` болып тұр, онда MongoDB-ді жаңартыңыз:

```sql
root@mongo2:~# systemctl stop mongod.service
root@mongo2:~# apt-get install -y mongodb-org
The following packages will be upgraded:
mongodb-org
Preparing to unpack .../mongodb-org_4.2.2_amd64.deb ...
Unpacking mongodb-org (4.2.2) over (4.0.14) ...
Setting up mongodb-org (4.2.2) ...
root@mongo2:~# systemctl start mongod.service
```

8.  `rs.status()` командасын қарап, түйіннің жұмыс істеп тұрғанына көз жеткізіңіз:

```sql
rs0:PRIMARY> rs.status()
{
    "set" : "rs0",
    "date" : ISODate("2019-12-27T07:08:22.025Z"),
    "myState" : 1,
"members" : [
    {
        "_id" : 0,
        "name" : "mongo1.testdomain.com:27017",
        "health" : 1,
        "state" : 1,
        "stateStr" : "PRIMARY"
},
    {
        "_id" : 1,
        "name" : "mongo2.testdomain.com:27017",
        "health" : 1,
        "state" : 2,
        "stateStr" : "SECONDARY"
},
    {
        "_id" : 2,
        "name" : "mongoar.testdomain.com:27017",
        "health" : 1,
        "state" : 7,
        "stateStr" : "ARBITER"
}
}
```

9.  `primary` түйінін күшпен бұрыннан жаңартылған түйінге ауыстырыңыз (біздің жағдайда — `mongo2`):

```sql
rs0:PRIMARY> rs.stepDown()
2019-12-27T12:25:10.922+0000 I NETWORK [js] DBClientConnection failed to receive message from mongo1.testdomain.com:27017 - SocketException: stream truncated
2019-12-27T12:25:10.923+0000 E QUERY [js] Error: error doing query: failed: network error while attempting to run command 'replSetStepDown' on host 'mongo1.testdomain.com:27017' :
DB.prototype.runCommand@src/mongo/shell/db.js:168:1
DB.prototype.adminCommand@src/mongo/shell/db.js:186:16
rs.stepDown@src/mongo/shell/utils.js:1489:12
@(shell):1:1
2019-12-27T12:25:10.924+0000 I NETWORK [js] trying reconnect to mongo1.testdomain.com:27017 failed
2019-12-27T12:25:10.941+0000 I NETWORK [js] reconnect mongo1.testdomain.com:27017 ok
rs0:SECONDARY>
   
```

10. Енді mongo1 түйіні `secondary` болды, оны алдыңғысына ұқсас жаңартыңыз.
11. Жаңартудан кейін `replicaset` күйін тексеріңіз (шығыс қысқартылған):

```sql
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
    "members" : [
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

Барлығы сәтті орындалды. Егер жаңартуға дейінгі түйіндер ретін сақтау қажет болса, ағымдағы `primary` түйінінің (`mongo2`) консоліне кіріп, команданы орындаңыз:

```sql
rs.stepDown()
```

Түйін `secondary` күйіне өтеді, ал `primary` түйіні жаңартуға дейінгідей `mongo1` болады.

Біз жаңартуды кластерді жұмыстан шығармай, яғни жіксіз орындадық.

Жалғыз MongoDB серверін жаңартқан жағдайда `feature compatibility version` параметрін жаңартыңыз, `mongodb` жаңа нұсқасы бар репозиторийді қосыңыз, сервердің конфигурациялық файлын түзетіңіз және жоғарыда сипатталғандай `mongodb` серверін жаңа нұсқаға жаңартыңыз. Бұл жағдайда серверді тоқтату қажет болады.
