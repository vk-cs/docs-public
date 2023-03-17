## Конфигурационные файлы

Создание каждого инстанса Баз Данных происходит с помощью конфигурационного файла, уникального для каждой БД. Файл конфигурации недоступен для редактирования пользователем, однако может быть изменён по [запросу в службу поддержки](https://mcs.mail.ru/help/contact-us).

Например:

```
X # формула в зависимости от RAM (размер RAM минус 512 МБ)
```

Эта формула срабатывает при сканировании кластера (горизонтальное масштабирование тома). Строчка объясняет, какие параметры в конфигурации скалируются при проведении этой операции, остальные параметры - статичные.

## PostgreSQL

```
listen\_addresses='\*'
port=5432
wal\_keep\_segments=64
update\_process\_title=off
wal\_log\_hints=on
max\_stack\_depth=7MB # можно менять через параметры БД
max\_wal\_senders=8 # можно менять через параметры БД
wal\_level=replica
archive\_mode=on
effective\_cache\_size=X # формула в зависимости от RAM (размер RAM минус 512 МБ)
shared\_buffers=X # формула в зависимости от RAM (25% RAM если оно 3 ГБ и выше, если меньше - 10%)
 
data\_directory='/var/lib/postgresql/12/data'
unix\_socket\_directories='/var/run/postgresql/'
external\_pid\_file='/var/run/postgresql/postgresql.pid'
hba\_file='/var/lib/postgresql/12/data/pg\_hba.conf'
ident\_file='/var/lib/postgresql/12/data/pg\_ident.conf'
 
# для cluster дополнительно выставляется
max\_wal\_senders: 50
max\_replication\_slots: 64
```

## MySQL

```
\[client\]
port = 3306
socket = /var/run/mysqld/mysqld.sock
 
\[mysqld\_safe\]
pid-file = /var/run/mysqld/mysqld.pid
socket = /var/run/mysqld/mysqld.sock
nice = 0
 
\[mysqld\]
user = mysql
port = 3306
basedir = /usr
datadir = /var/lib/mysql/data
tmpdir = /var/tmp
pid-file = /var/run/mysqld/mysqld.pid
socket = /var/run/mysqld/mysqld.sock
skip-external-locking = 1
key\_buffer\_size = X # формула в зависимости от RAM (50 МБ на каждые 512 МБ RAM)
max\_allowed\_packet = X # формула в зависимости от RAM (1 МБ на каждые 512 МБ RAM)
thread\_stack = 192K
thread\_cache\_size = X # формула в зависимости от RAM (4 на каждые 512 МБ RAM)
myisam-recover-options = BACKUP,FORCE
query\_cache\_type = 1 # можно менять через параметры БД
query\_cache\_limit = 1M # можно менять через параметры БД
query\_cache\_size = X # формула в зависимости от RAM (8 МБ на каждые 512 МБ RAM)
innodb\_data\_file\_path = ibdata1:10M:autoextend
innodb\_buffer\_pool\_size = X # формула в зависимости от RAM (150 МБ на каждые 512 МБ RAM)
innodb\_file\_per\_table = 1 # можно менять через параметры БД
innodb\_log\_files\_in\_group = 2
innodb\_log\_file\_size=50M
innodb\_log\_buffer\_size=25M # можно менять через параметры БД
connect\_timeout = 15 # можно менять через параметры БД
wait\_timeout = 120 # можно менять через параметры БД
join\_buffer\_size = 1M # можно менять через параметры БД
read\_buffer\_size = 512K # можно менять через параметры БД
read\_rnd\_buffer\_size = 512K # можно менять через параметры БД
sort\_buffer\_size = 1M # можно менять через параметры БД
tmp\_table\_size = X # формула в зависимости от RAM (16 МБ на каждые 512 МБ RAM)
max\_heap\_table\_size = X # формула в зависимости от RAM (16 МБ на каждые 512 МБ RAM)
table\_open\_cache = X # формула в зависимости от RAM (256 на каждые 512 МБ RAM)
table\_definition\_cache = X # формула в зависимости от RAM (256 на каждые 512 МБ RAM)
open\_files\_limit = X # формула в зависимости от RAM (512 на каждые 512 МБ RAM)
max\_user\_connections = X # формула в зависимости от RAM (100 на каждые 512 МБ RAM)
max\_connections = X # формула в зависимости от RAM (100 на каждые 512 МБ RAM)
default\_storage\_engine = innodb
local-infile = 0
server\_id = X # генерируется дл инстанса
performance\_schema = ON # можно менять через параметры БД
expire\_logs\_days = 1 # можно менять через параметры БД
 
\[mysqldump\]
quick = 1
quote-names = 1
max\_allowed\_packet = 16M # можно менять через параметры БД
 
\[isamchk\]
key\_buffer = 16M
 
!includedir /etc/mysql/conf.d/
```

## MongoDB

```
net.bindIp: 172.16.0.8,127.0.0.1
net.port: 27017
processManagement.fork: false
processManagement.pidFilePath: /var/run/mongodb/mongodb.pid
security.authorization: enabled
setParameter:
  enableLocalhostAuthBypass: false
storage.dbPath: /var/lib/mongodb
storage.journal.enabled: true # можно менять через параметры БД
storage.mmapv1.smallFiles: false # можно менять через параметры БД
systemLog.destination: syslog
systemLog.logAppend: true # можно менять через параметры БД
```
