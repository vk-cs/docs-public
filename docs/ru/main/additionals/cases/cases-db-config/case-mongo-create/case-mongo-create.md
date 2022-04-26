В данной статье рассмотрим, как установить и настроить Standalone MongoDB на Ubuntu 18.04.

**Примечание.**

В описании далее используем следующие имена и IP-адреса серверов:

- сервер 1 - mongo1.testdomain.com (10.0.0.2);
- сервер 2 - mongo2.testdomain.com (10.0.0.3);
- сервер 3 - mongo1.testdomain.com (10.0.0.4).

#### Конфигурация оборудования

Рассмотрим установку MongoDB версии 4.0. Для сервера MongoDB нам потребуются три сервера Ubuntu 18.04 LTS x86_64.

Можно установить одиночный сервер MongoDB. Если необходимо установить replicaset MongoDB, нужно минимум три сервера: два - для primary и secondary, еще один - для арбитра (подробнее и настройке [читайте тут](https://mcs.mail.ru/help/databases-configuration/mongodb-replica)). Мощности серверов primary и secondary выбираются, исходя из емкости и нагруженности базы данных, сервер арбитра требует минимум ресурсов.

Для хранения данных MongoDB рекомендует использовать файловую систему XFS, поэтому желательно подключить отдельный том XFS (подробнее см. [читайте тут](https://docs.mongodb.com/manual/administration/production-notes/#kernel-and-file-systems)).

В качестве языка консоли MongoDB используется JavaScript.

\*\*Как сэкономить время на установке MongoDB

\*\*

Воспользуйтесь нашим готовым облачным решением на базе СУБД MongoDB. При регистрации вы получаете бесплатный бонусный счет, которого достаточно для работы в течение нескольких дней.

**[**[**попробовать облачную СУБД MongoDB**](https://mcs.mail.ru/databases/)**]**

## Преимущества MongoDB

MongoDB (от англ. humongous — огромный) — [документоориентированная система управления базами данных](https://ru.wikipedia.org/wiki/%D0%94%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%BE%D0%BE%D1%80%D0%B8%D0%B5%D0%BD%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D0%B0%D1%8F_%D0%A1%D0%A3%D0%91%D0%94) [](https://ru.wikipedia.org/wiki/%D0%A1%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B0_%D1%83%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F_%D0%B1%D0%B0%D0%B7%D0%B0%D0%BC%D0%B8_%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85)(СУБД) с открытым исходным кодом, не требующая описания схемы таблиц. MongoDB классифицирована как NoSQL, использует JSON-подобные документы и схему базы данных, написана на языке C++ (подробнее см. [тут](https://ru.wikipedia.org/wiki/MongoDB)).

MongoDB удобно использовать, когда структура документов постоянно меняется, что в традиционных СУБД требует ресурсоемкой смены модели данных. Кроме того, часто MongoDB используют для хранения файлов. Для этого реализована спецификация GridFS, позволяющая хранить и извлекать файлы любого размера и в любом количестве.

## Установка Standalone MongoDB

1.  Авторизуйтесь на сервере mongo1.testdomain.com.
2.  Импортируйте ключ репозитория MongoDB:

```
root@mongo1:~# wget -qO - https://www.mongodb.org/static/pgp/server-4.0.asc | sudo apt-key add -
OK
```

3.  Добавьте репозиторий MongoDB:

```
root@mongo1:~# echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse
```

4.  Установите MongoDB:

```
root@mongo1:~# apt-get update && apt-get -y install mongodb-org
```

5.  Сгенерируйте корневой сертификат /etc/ssl/mongoCA.pem для настройки TLS в MongoDB:

```
root@mongo1:~# openssl genrsa -out /tmp/mongoCA.key 4096
Generating RSA private key, 4096 bit long modulus (2 primes)
..................................................................................................................++++
.......++++
e is 65537 (0x010001)

root@mongo1:~# openssl req -x509 -new -key /tmp/mongoCA.key -days 10000 -out /tmp/mongoCA.crt
-----
Country Name (2 letter code) [AU]:
State or Province Name (full name) [Some-State]:
Locality Name (eg, city) []:
Organization Name (eg, company) [Internet Widgits Pty Ltd]:
Organizational Unit Name (eg, section) []:
Common Name (e.g. server FQDN or YOUR name) []:
Email Address []:

root@mongo1:~# cat /tmp/mongoCA.key /tmp/mongoCA.crt > /etc/ssl/mongoCA.pem
root@mongo1:~# rm /tmp/mongoCA.key /tmp/mongoCA.crt
```

6.  Сгенерируйте сертификат сервера /etc/ssl/mongo1.pem**:**

```
root@mongo1:~# openssl genrsa -out /tmp/mongo1.key 4096
Generating RSA private key, 4096 bit long modulus (2 primes)
..........................++++
..............................................++++
e is 65537 (0x010001)

root@mongo1:~# openssl req -new -key /tmp/mongo1.key -out /tmp/mongo1.csr
-----
Country Name (2 letter code) [AU]:
State or Province Name (full name) [Some-State]:
Locality Name (eg, city) []:
Organization Name (eg, company) [Internet Widgits Pty Ltd]:
Organizational Unit Name (eg, section) []:
Common Name (e.g. server FQDN or YOUR name) []:mongo1.testdomain.com
Email Address []:

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
An optional company name []:

root@mongo1:~# openssl x509 -req -in /tmp/mongo1.csr -CA /etc/ssl/mongoCA.pem -CAcreateserial -out /tmp/mongo1.crt -days 10000
Signature ok
subject=C = AU, ST = Some-State, O = Internet Widgits Pty Ltd, CN = mongo1
Getting CA Private Key

root@mongo1:~# cat /tmp/mongo1.key /tmp/mongo1.crt > /etc/ssl/mongo1.pem
root@mongo1:~# rm /tmp/mongo1.key /tmp/mongo1.crt /tmp/mongo1.csr
```

**Внимание**

В поле CommonName укажите имя сервера (hostname).

7.  Сгенерируйте клиентский сертификат, который будет использоваться для mongo-консоли (см. предыдущий шаг), и поместите его в папку /etc/ssl/client.pem.
8.  В текстовом редакторе откройте конфигурационный файл /etc/mongod.conf и приведите его к следующему виду:

```
# mongod.conf
# for documentation of all options, see:
# http://docs.mongodb.org/manual/reference/configuration-options/

# Where and how to store data.
storage:
    dbPath: /var/lib/mongodb
    journal:
        enabled: true
# engine:
# mmapv1:
# wiredTiger:

# where to write logging data.
systemLog:
    destination: file
    logAppend: true
    path: /var/log/mongodb/mongod.log

# network interfaces
net:
    port: 27017
    bindIp: 0.0.0.0
    ssl:
        mode: requireSSL
        PEMKeyFile: /etc/ssl/mongo1.pem
        CAFile: /etc/ssl/mongoCA.pem
# how the process runs
processManagement:
    timeZoneInfo: /usr/share/zoneinfo
```

**Внимание**

Важные параметры:

- bindIp указывает, по каким адресам будет доступен Mongod. Если указано 0.0.0.0, сервер слушает все интерфейсы. Если нужен только локальный доступ, вместо 0.0.0.0 укажите localhost.
- dbPath указывает путь к базе данных. Рекомендуемая файловая система хранилища - XFS.

9.  Запустите Mongod и добавьте его в список приложений, загружаемых автоматически:

```
root@mongo1:/etc# systemctl start mongod.service
root@mongo1:/etc# systemctl enable mongod.service
```

10. Проверьте соединение с сервером:

```
root@mongo1:/etc# mongo --ssl --sslPEMKeyFile /etc/ssl/client.pem --sslCAFile /etc/ssl/mongoCA.pem --host mongo1.testdomain.com
MongoDB shell version v4.0.14
connecting to: mongodb://mongo1.testdomain.com:27017/?gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("7333b8fe-e378-48fa-87bb-d3dbd31c4b70") }
MongoDB server version: 4.0.14
Server has startup warnings:
2019-12-26T07:28:18.556+0000 I STORAGE [initandlisten]
2019-12-26T07:28:21.270+0000 I CONTROL [initandlisten]
2019-12-26T07:28:21.270+0000 I CONTROL [initandlisten] \*\* WARNING: Access control is not enabled for the database.
2019-12-26T07:28:21.270+0000 I CONTROL [initandlisten] \*\* Read and write access to data and configuration is unrestricted.
2019-12-26T07:28:21.270+0000 I CONTROL [initandlisten]
---
Enable MongoDB's free cloud-based monitoring service, which will then receive and display
metrics about your deployment (disk utilization, CPU, operation statistics, etc).

The monitoring data will be available on a MongoDB website with a unique URL accessible to you
and anyone you share the URL with. MongoDB may use this information to make product
improvements and to suggest MongoDB products and deployment options to you.

To enable free monitoring, run the following command: db.enableFreeMonitoring()
To permanently disable this reminder, run the following command: db.disableFreeMonitoring()
---
>
```

11. В консоли mongo создайте пользователя admin с правами для создания других пользователей:

```
\> use admin
switched to db admin
> db.createUser(
    {
        user: "admin",
        pwd: "<пароль>",
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

12. Отредактируйте конфигурационный файл /etc/mongod.conf, раскомментируйте секцию security и добавьте опцию authorization: enabled :

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

Пример создания дополнительного пользователя с правами чтения/записи на коллекцию test и чтения на коллекцию reporting:

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

**Примечание**

Как настроить репликацию и обновление MongoDB, [читайте тут](https://mcs.mail.ru/help/databases-configuration/mongodb-replica).

**Обратная связь**

Возникли проблемы или остались вопросы? [Напишите нам, мы будем рады вам помочь](https://mcs.mail.ru/help/contact-us).
