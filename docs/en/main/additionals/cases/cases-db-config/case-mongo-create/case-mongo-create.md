In this article, we will look at how to install and configure Standalone MongoDB on Ubuntu 18.04.

<info>

**Note.**

In the description below, we use the following server names and IP addresses:

- server 1 - mongo1.testdomain.com (10.0.0.2);
- server 2 - mongo2.testdomain.com (10.0.0.3);
- server 3 - mongo1.testdomain.com (10.0.0.4).

</info>

## Hardware configuration

Consider installing MongoDB version 4.0. For the MongoDB server, we need three Ubuntu 18.04 LTS x86_64 servers.

You can install a single MongoDB server. If you need to install MongoDB replicaset, you need at least three servers: two - for primary and secondary, one more - for the arbitrator (more details and settings can be found in the article [Replicating and updating MongoDB on Ubuntu](https://mcs.mail.ru/ help/databases-configuration/mongodb-replica)). The capacities of the primary and secondary servers are selected based on the capacity and load of the database, the arbiter server requires a minimum of resources.

MongoDB recommends using the XFS file system for storing data, so it is advisable to mount a separate XFS volume (for more details, see the article [Kernel and File Systems](https://docs.mongodb.com/manual/administration/production-notes/#kernel-and -file-systems)).

MongoDB uses JavaScript as its console language.

## How to save time installing MongoDB

[Use](https://mcs.mail.ru/databases/) our turnkey cloud solution based on MongoDB DBMS. When you sign up, you get a free bonus account, which is enough to work for several days.

## Benefits of MongoDB

[MongoDB](https://en.wikipedia.org/wiki/MongoDB) 94%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%BE%D0%BE%D1%80%D0%B8%D0%B5% D0%BD%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D0%B0%D1%8F_%D0%A1%D0% A3%D0%91%D0%94)(DBMS) is open source and does not require a description of the table schema. MongoDB is classified as NoSQL, uses JSON-like documents and a database schema, and is written in C++.

MongoDB is convenient to use when the structure of documents is constantly changing, which in traditional DBMS requires a resource-intensive change in the data model. In addition, MongoDB is often used to store files. To do this, the GridFS specification has been implemented, which allows storing and retrieving files of any size and in any quantity.

## Install Standalone MongoDB

1. Log in to the `mongo1.testdomain.com` server.
2. Import the MongoDB repository key:

```
root@mongo1:~# wget -qO - https://www.mongodb.org/static/pgp/server-4.0.asc | sudo apt key add -
OK
```

3. Add the MongoDB repository:

```
root@mongo1:~# echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse
```

4. Install MongoDB:

```
root@mongo1:~# apt-get update && apt-get -y install mongodb-org
```

5. Generate a root certificate `/etc/ssl/mongoCA.pem` to set up TLS in MongoDB:

```
root@mongo1:~# openssl genrsa -out /tmp/mongoCA.key 4096
Generating RSA private key, 4096 bit long modulus (2 primes)
................................................. ................................................. ..............++++
.......++++
e is 65537 (0x010001)

root@mongo1:~# openssl req -x509 -new -key /tmp/mongoCA.key -days 10000 -out /tmp/mongoCA.crt
-----
Country Name (2 letter code) [AU]:
State or Province Name (full name) [Some-State]:
Locality Name (eg, city) []:
Organization Name (eg, company) [Internet Widgits Pty Ltd]:
Organizational Unit Name (eg, section) []:
Common Name (e.g. server FQDN or YOUR name) []:
Email Address[]:

root@mongo1:~# cat /tmp/mongoCA.key /tmp/mongoCA.crt > /etc/ssl/mongoCA.pem
root@mongo1:~# rm /tmp/mongoCA.key /tmp/mongoCA.crt
```

6. Generate server certificate `/etc/ssl/mongo1.pem`:

```
root@mongo1:~# openssl genrsa -out /tmp/mongo1.key 4096
Generating RSA private key, 4096 bit long modulus (2 primes)
.........................++++
.............................................++++
e is 65537 (0x010001)

root@mongo1:~# openssl req -new -key /tmp/mongo1.key -out /tmp/mongo1.csr
-----
Country Name (2 letter code) [AU]:
State or Province Name (full name) [Some-State]:
Locality Name (eg, city) []:
Organization Name (eg, company) [Internet Widgits Pty Ltd]:
Organizational Unit Name (eg, section) []:
Common Name (e.g. server FQDN or YOUR name) []:mongo1.testdomain.com
Email Address[]:

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password[]:
An optional company name[]:

root@mongo1:~# openssl x509 -req -in /tmp/mongo1.csr -CA /etc/ssl/mongoCA.pem -CAcreateserial -out /tmp/mongo1.crt -days 10000
Signature ok
subject=C=AU, ST=Some-State, O=Internet Widgits Pty Ltd, CN=mongo1
Getting CA Private Key

root@mongo1:~# cat /tmp/mongo1.key /tmp/mongo1.crt > /etc/ssl/mongo1.pem
root@mongo1:~# rm /tmp/mongo1.key /tmp/mongo1.crt /tmp/mongo1.csr
```

<warn>

**Attention**

Enter the server name (hostname) in the CommonName field.

</warn>

7. Generate a client certificate to be used for the mongo console (see previous step) and place it in the `/etc/ssl/client.pem` folder.
8. In a text editor, open the configuration file `/etc/mongod.conf` and make it look like this:

```
#mongod.conf
# for documentation of all options, see:
# http://docs.mongodb.org/manual/reference/configuration-options/

# Where and how to store data.
storage:
dbPath: /var/lib/mongodb
journal:
enabled: true
# engine:
#mmapv1:
# wiredTiger:

# where to write logging data.
systemLog:
destination:file
logappend:true
path: /var/log/mongodb/mongod.log

# network interfaces
net:
port: 27017
bindIP: 0.0.0.0
ssl:
mode: requireSSL
PEMKeyFile: /etc/ssl/mongo1.pem
CAFile: /etc/ssl/mongoCA.pem
# how the process runs
process management:
timeZoneInfo: /usr/share/zoneinfo
```

<warn>

**Attention**

Important parameters:

- bindIp specifies at what addresses Mongod will be available. If 0.0.0.0 is specified, the server listens on all interfaces. If you only want local access, replace 0.0.0.0 with localhost.
- dbPath specifies the path to the database. The recommended storage file system is XFS.

</warn>

9. Start Mongod and add it to the list of apps to load automatically:

```
root@mongo1:/etc# systemctl start mongod.service
root@mongo1:/etc# systemctl enable mongod.service
```

10. Check the connection to the server:

```
root@mongo1:/etc# mongo --ssl --sslPEMKeyFile /etc/ssl/client.pem --sslCAFile /etc/ssl/mongoCA.pem --host mongo1.testdomain.com
MongoDB shell version v4.0.14
connecting to: mongodb://mongo1.testdomain.com:27017/?gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("7333b8fe-e378-48fa-87bb-d3dbd31c4b70") }
MongoDB server version: 4.0.14
Server has startup warnings:
2019-12-26T07:28:18.556+0000 I STORAGE[initandlisten]
2019-12-26T07:28:21.270+0000 I CONTROL [initandlisten]
2019-12-26T07:28:21.270+0000 I CONTROL [initandlisten] \*\* WARNING: Access control is not enabled for the database.
2019-12-26T07:28:21.270+0000 I CONTROL [initandlisten] \*\* Read and write access to data and configuration is unrestricted.
2019-12-26T07:28:21.270+0000 I CONTROL [initandlisten]
---
Enable MongoDB's free cloud-based monitoring service, which will then receive and display
metrics about your deployment (disk utilization, CPU, operation statistics, etc).

The monitoring data will be available on a MongoDB website with a unique URL accessible to you
and any one you share the URL with. MongoDB may use this information to make product
improvements and to suggest MongoDB products and deployment options to you.

To enable free monitoring, run the following command: db.enableFreeMonitoring()
To permanently disable this reminder, run the following command: db.disableFreeMonitoring()
---
>
```

11. In the mongo console, create an admin user with rights to create other users:

```
\> use admin
switched to db admin
> db.createUser(
{
user: "admin",
pwd: "<password>",
 roles: [
 { role: "userAdminAnyDatabase", db: "admin" },
 { role: "readWriteAnyDatabase", db: "admin" },
 { role: "dbAdminAnyDatabase", db: "admin" },
 { role: "clusterAdmin", db: "admin" }
 ]
 }
)
Successfully added user: {
 "user" : "admin",
 "roles" : [
 {
 "role" : "userAdminAnyDatabase",
 "db" : "admin"
 },
 {
 "role" : "readWriteAnyDatabase",
 "db" : "admin"
 },
 {
 "role" : "dbAdminAnyDatabase",
 "db" : "admin"
 },
 {
 "role" : "clusterAdmin",
 "db" : "admin"
 }
 ]
}
>
```

Чтобы выйти из консоли, нажмите Ctrl+D.

12. Отредактируйте конфигурационный файл `/etc/mongod.conf`, раскомментируйте секцию `security` и добавьте опцию `authorization: enabled` :

```
security:
    authorization: enabled
```

13. Перезапустите сервер mongod:

```
root@mongo1:~# systemctl restart mongod.service
```

14. Проверьте соединение:

```
root@mongo1:~# mongo --ssl --sslPEMKeyFile /etc/ssl/client.pem --sslCAFile /etc/ssl/mongoCA.pem --host mongo1.testdomain.com -u admin
MongoDB shell version v4.0.14
Enter password:
connecting to: mongodb://mongo1.testdomain.com:27017/?gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("66b0b8f8-a4ad-4095-9e42-c0b462c24a1c") }
MongoDB server version: 4.0.14
> quit()
```

Пример создания дополнительного пользователя с правами чтения/записи на коллекцию `test` и чтения на коллекцию `reporting`:

```
use test
db.createUser(
    {
        user: "myTester",
        pwd: "xyz123",
        roles: [ { role: "readWrite", db: "test" },
                 { role: "read", db: "reporting" } ]
    }
)
```

Кроме того, MongoDB версии 4 содержит встроенный мониторинг, который можно включить в консоли следующей командой:

```
\> db.enableFreeMonitoring()
{
    "state" : "enabled",
    "message" : "To see your monitoring data, navigate to the unique URL below. Anyone you share the URL with will also be able to view this page. You can disable monitoring at any time by running db.disableFreeMonitoring().",
    "url" : "https://cloud.mongodb.com/freemonitoring/cluster/2I5YXIJTKLUMTXMB2O4SKQBPSPCMLPU4",
    "userReminder" : "",
    "ok" : 1
}
```

В результате вы получите URL для просмотра метрик сервера.

<info>

**Примечание**

Как настроить репликацию и обновление MongoDB, [читайте тут](https://mcs.mail.ru/help/databases-configuration/mongodb-replica).

</info>
