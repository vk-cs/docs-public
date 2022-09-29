В данной статье рассмотрим, как реплицировать и обновить MongoDB на Ubuntu 18.04.

<info>

**Примечание**

О конфигурации оборудования, а также о том, как установить и настроить MongoDB, вы можете узнать в статье [Установка и настройка MongoDB на Ubuntu](https://mcs.mail.ru/help/databases-configuration/mongodb-installation).

</info>

<info>

В описании далее используем следующие имена и IP-адреса серверов:

- сервер 1 - mongo1.testdomain.com (10.0.0.2);
- сервер 2 - mongo2.testdomain.com (10.0.0.3);
- сервер 3 - mongo1.testdomain.com (10.0.0.4).

</info>

## Настройка ReplicaSet MongoDB

Replicaset  - это несколько серверов, которые содержат один и тот же набор данных, обеспечивают защиту от сбоев и высокую доступность данных. В Replicaset MongoDB  есть одна primary нода для  записи и чтения и одна или несколько secondary нод, синхронизированных с primary нодой и предоставляющих возможность чтения данных для снижения нагрузки. В случае сбоя в работе primary ноды одна из secondary нод автоматически назначается primary нодой. Для ускорения выбора новой primary ноды предназначена нода - арбитр, которая не содержит данных. Также преимуществом Replicaset  является возможность обновления кластера без необходимости останова его работы.

1.  Убедитесь, что на всех трех серверах открыт порт 27017.
2.  Убедитесь, что имя каждого хоста (`mongo1.testdomain.com`, `mongo2.testdomain.com`, `mongoar.testdomain.com`) известно на каждом сервере. Если имена не прописаны в DNS, на каждом сервере укажите их в файле `/еtc/hosts`. В нашем случае:

```
10.0.0.2 mongo1 mongo1.testdomain.com
10.0.0.3 mongo2 mongo2.testdomain.com
10.0.0.4 mongoar mongoar.testdomain.com
```

3.  В конфигурационный файл `/etc/mongod.conf` в секцию `replication` добавьте следующее:

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

4.  Перезапустите `mongod`:

```
root@mongo1:~# systemctl restart mongod.service
```

5.  Войдите в консоль `mongo` и выполните команду:

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

`Replicaset` инициализирован, нода находится в состоянии `primary`.

6.  В конфигурационном файле в переменной `host` вместо значения `mongo1:27017` укажите значение CommonName сертификата:

```
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

7.  Авторизуйтесь на сервере `mongo2`, импортируйте ключ репозитория MongoDB, добавьте репозиторий MongoDB и установите MongoDB (как это сделать, читайте в статье [Установка и настройка MongoDB на Ubuntu](https://mcs.mail.ru/help/databases-configuration/mongodb-installation).
8.  Если вы правили файл `/etc/hosts` на сервере `mongo1`, на текущем сервере сделайте то же самое.
9.  С сервера mongo1 скопируйте конфигурационный файл `/etc/mongod.conf` на текущий сервер, поменяйте в файле название ключа `PEMKeyFile:` с `/etc/ssl/mongo1.pem` на `PEMKeyFile: /etc/ssl/mongo2.pem`.
10. На текущий сервер скопируйте ключ `/etc/ssl/mongoCA.pem`.
11. Выпишите серверный сертификат, так же как на сервере `mongo1`, используя `mongo2.testdomain.com` в качестве CommonName:

```
root@mongo2:~# openssl genrsa -out /tmp/mongo2.key 4096
root@mongo2:~# openssl req -new -key /tmp/mongo2.key -out /tmp/mongo2.csr
...
Common Name (e.g. server FQDN or YOUR name) []:mongo2.testdomain.com
...
root@mongo2:~# openssl x509 -req -in /tmp/mongo2.csr -CA /etc/ssl/mongoCA.pem -CAcreateserial -out /tmp/mongo2.crt -days 10000
root@mongo2:~# cat /tmp/mongo2.key /tmp/mongo2.crt > /etc/ssl/mongo2.pem
root@mongo2:~# rm /tmp/mongo2.key /tmp/mongo2.crt /tmp/mongo2.csr
```

12. Если папка `var/lib/mongodb` не пустая, удалите все файлы из нее.
13. Перезапустите сервер `mongod` и добавьте его в список приложений, загружаемых автоматически.
14. Выполните логин на сервер `mongo1` и войдите в консоль mongo.
15. Добавьте сервер `mongo2` в `replicaset`:

```
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

16. Проверьте состояние `replicaset`:

```
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

Как видим, вторая нода с `_id=1` принята в `Repliset` в состоянии `secondary`.

При добавлении ноды в `replicaset` происходит синхронизация c primary ноды. Пока синхронизация не завершена, вторая нода будет находиться в состоянии STARTUP. Запись данных на основную ноду замедляет синхронизацию, однако, это возможный сценарий (например, при записи в базу база размером около 350 ГБ синхронизировалась около 14 часов).

Как только синхронизация будет завершена, на третьем сервере (`mongoar`) выполните то же, что и на втором (`mongo2`), кроме шага добавления сервера в `repliset`:

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

Проверьте состояние `Repliset` (для краткости из вывода выброшено несущественное):

```
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

В результате мы получили `primary` ноду, `secondary` ноду и `arbiter` ноду. `Repliset` синхронизирован и находится в работоспособном состоянии.

## Обновление Replicaset MongoDB

Рассмотрим обновление на примере перехода с версии 4.0 на версию 4.2. Чтобы понимать, какие изменения могут привести к неработоспособности текущей схемы данных, ознакомьтесь с [документом](https://docs.mongodb.com/manual/release-notes/4.2-upgrade-replica-set/).

1.  Измените параметр `feature compatibility version`, ограничивающий версию MongoDB, которую можно использовать с текущим набором данных. Для обновления с версии 4.0 на версию 4.2 установите его в 4.0:

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

2.  Проверьте результат:

```
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

3.  На всех трех серверах подключите репозиторий с новой версией MongoDB (пример для первого сервера):

```
root@mongo1:~# wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
OK
root@mongo1:~# echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse
root@mongo1:~# apt-get update


```

4.  Исходя из [документации](https://docs.mongodb.com/manual/reference/read-concern-majority/#disable-read-concern-majority), в конфигурационный файл [/etc/mongod.conf](../case-mongo-update/assets/mongod.conf_4 "download") добавьте опцию `enableMajorityReadConcern: false` и замените `net:ssl` на `net:tls` (пример для арбитра):

```
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

5.  Обновите ноду арбитра:

```
root@mongoar:~# systemctl stop mongod.service
root@mongoar:~# apt-get install -y mongodb-org mongodb-org-mongos mongodb-org-server mongodb-org-shell mongodb-org-tools
root@mongoar:~# systemctl start mongod.service
```

6.  Проверьте статус `rs.status()`. Убедитесь, что арбитр работает, и посмотрите, какая из двух оставшихся нод является `secondary` (вывод команды сокращен):

```
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

7.  В текущий момент сервер `mongo2` является `secondary`, обновите MongoDB на нем:

```
root@mongo2:~# systemctl stop mongod.service
root@mongo2:~# apt-get install -y mongodb-org
The following packages will be upgraded:
mongodb-org
Preparing to unpack .../mongodb-org_4.2.2_amd64.deb ...
Unpacking mongodb-org (4.2.2) over (4.0.14) ...
Setting up mongodb-org (4.2.2) ...
root@mongo2:~# systemctl start mongod.service
```

8.  Посмотрите `rs.status()`, убедитесь, что нода работает:

```
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

9.  Принудительно измените `primary` ноду на ту, которую уже обновили (в нашем случае - `mongo2`):

```
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

10. Теперь нода mongo1 стала `secondary`, обновите ее по аналогии с предыдущей.
11. Проверьте состояние `replicaset` после обновления (вывод сокращен):

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

Все выполнено успешно. Если есть необходимость сохранения порядка нод, который был до обновления, зайдите в консоль текущей `primary` ноды (`mongo2`) и выполните команду:

```
rs.stepDown()
```

Нода станет `secondary`, `primary` нодой станет `mongo1`, как и было до обновления.

Мы выполнили обновление без вывода кластера из работы, то есть бесшовно.

В случае обновления одиночного сервера MongoDB обновите параметр `feature compatibility version`, подключите репозиторий с новой версией `mongodb` , поправьте конфигурационный файл сервера и обновите сервер `mongodb` на новую версию, как описано выше. В этом случае потребуется останов сервера.

## Обратная связь

Возникли проблемы или остались вопросы? [Напишите нам, мы будем рады вам помочь](https://mcs.mail.ru/help/contact-us).
