## Конфигурационные файлы

Создание каждого инстанса Баз Данных происходит с помощью конфигурационного файла, уникального для каждой БД. Файл конфигурации недоступен для редактирования пользователем, однако может быть изменён по [запросу в службу поддержки](https://mcs.mail.ru/help/contact-us).

Например:

```
X # формула в зависимости от RAM (размер RAM минус 512 МБ)
```

Эта формула срабатывает при сканировании кластера (горизонтальное масштабирование тома). Строчка объясняет, какие параметры в конфигурации скалируются при проведении этой операции, остальные параметры - статичные.

## PostgreSQL

```
listen_addresses='\*'
port=5432
wal_keep_segments=64
update_process_title=off
wal_log_hints=on
max_stack_depth=7MB # можно менять через параметры БД
max_wal_senders=8 # можно менять через параметры БД
wal_level=replica
archive_mode=on
effective_cache_size=X # формула в зависимости от RAM (размер RAM минус 512 МБ)
shared_buffers=X # формула в зависимости от RAM (25% RAM если оно 3 ГБ и выше, если меньше - 10%)
 
data_directory='/var/lib/postgresql/12/data'
unix_socket_directories='/var/run/postgresql/'
external_pid_file='/var/run/postgresql/postgresql.pid'
hba_file='/var/lib/postgresql/12/data/pg_hba.conf'
ident_file='/var/lib/postgresql/12/data/pg_ident.conf'
 
# для cluster дополнительно выставляется
max_wal_senders: 50
max_replication_slots: 64
```

## MySQL

```
[client]
port = 3306
socket = /var/run/mysqld/mysqld.sock
 
[mysqld_safe]
pid-file = /var/run/mysqld/mysqld.pid
socket = /var/run/mysqld/mysqld.sock
nice = 0
 
[mysqld]
user = mysql
port = 3306
basedir = /usr
datadir = /var/lib/mysql/data
tmpdir = /var/tmp
pid-file = /var/run/mysqld/mysqld.pid
socket = /var/run/mysqld/mysqld.sock
skip-external-locking = 1
key_buffer_size = X # формула в зависимости от RAM (50 МБ на каждые 512 МБ RAM)
max_allowed_packet = X # формула в зависимости от RAM (1 МБ на каждые 512 МБ RAM)
thread_stack = 192K
thread_cache_size = X # формула в зависимости от RAM (4 на каждые 512 МБ RAM)
myisam-recover-options = BACKUP,FORCE
query_cache_type = 1 # можно менять через параметры БД
query_cache_limit = 1M # можно менять через параметры БД
query_cache_size = X # формула в зависимости от RAM (8 МБ на каждые 512 МБ RAM)
innodb_data_file_path = ibdata1:10M:autoextend
innodb_buffer_pool_size = X # формула в зависимости от RAM (150 МБ на каждые 512 МБ RAM)
innodb_file_per_table = 1 # можно менять через параметры БД
innodb_log_files_in_group = 2
innodb_log_file_size=50M
innodb_log_buffer_size=25M # можно менять через параметры БД
connect_timeout = 15 # можно менять через параметры БД
wait_timeout = 120 # можно менять через параметры БД
join_buffer_size = 1M # можно менять через параметры БД
read_buffer_size = 512K # можно менять через параметры БД
read_rnd_buffer_size = 512K # можно менять через параметры БД
sort_buffer_size = 1M # можно менять через параметры БД
tmp_table_size = X # формула в зависимости от RAM (16 МБ на каждые 512 МБ RAM)
max_heap_table_size = X # формула в зависимости от RAM (16 МБ на каждые 512 МБ RAM)
table_open_cache = X # формула в зависимости от RAM (256 на каждые 512 МБ RAM)
table_definition_cache = X # формула в зависимости от RAM (256 на каждые 512 МБ RAM)
open_files_limit = X # формула в зависимости от RAM (512 на каждые 512 МБ RAM)
max_user_connections = X # формула в зависимости от RAM (100 на каждые 512 МБ RAM)
max_connections = X # формула в зависимости от RAM (100 на каждые 512 МБ RAM)
default_storage_engine = innodb
local-infile = 0
server_id = X # генерируется дл инстанса
performance_schema = ON # можно менять через параметры БД
expire_logs_days = 1 # можно менять через параметры БД
 
[mysqldump]
quick = 1
quote-names = 1
max_allowed_packet = 16M # можно менять через параметры БД
 
[isamchk]
key_buffer = 16M
 
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
