В данной статье рассмотрим, как установить standalone [Redis](https://redis.io/), создать пользователя базы данных, настроить права и сетевой доступ.

## Конфигурация оборудования

Сервер Ubuntu 18.04 LTS x86_64.

\*\*Как сэкономить время на установке Redis

\*\*

Воспользуйтесь нашим готовым облачным решением на базе СУБД Redis. При регистрации вы получаете бесплатный бонусный счет, которого достаточно для работы в течение нескольких дней.

**[**[**попробовать облачную СУБД Redis**](https://mcs.mail.ru/databases/)**]**

## Установка standalone Redis

1.  Авторизуйтесь на сервере Ubuntu 18.04.
2.  Обновите списки репозиториев:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ sudo apt-get update
```

3.  По умолчанию в Ubuntu 18.04 в репозиториях располагается Redis 4. Выполните одно из действий:

- Если этой версии достаточно, установите ее:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ sudo apt-get install redis-server
```

- Если требуется актуальная версия Redis, добавьте PPA-репозиторий с новой версией Redis:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ sudo add-apt-repository ppa:chris-lea/redis-server
Redis is an open source, advanced key-value store. It is often referred to as a data structure server since keys can contain strings, hashes, lists, sets and sorted sets.
More info: https://launchpad.net/~chris-lea/+archive/ubuntu/redis-server
Press [ENTER] to continue or Ctrl-c to cancel adding it.
```

Затем установите Redis новой версии:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ sudo apt-get install redis-server
```

4.  После установки убедитесь, что сервер запущен:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ ps ax | grep redis
  335 ?        Ssl    0:00 /usr/bin/redis-server 127.0.0.1:6379
```

5.  Проверьте подключение к базе. По умолчанию для доступа к базе пароль не требуется:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ redis-cli
127.0.0.1:6379> PING
PONG
127.0.0.1:6379>
```

6.  Добавьте сервис в список приложений, запускаемых автоматически:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ sudo systemctl enable redis-server
Synchronizing state of redis-server.service with SysV service script with /lib/systemd/systemd-sysv-install.
Executing: /lib/systemd/systemd-sysv-install enable redis-server
Created symlink /etc/systemd/system/redis.service → /lib/systemd/system/redis-server.service.
```

Установка завершена.\*\*

## Настройка прав доступа

\*\*По умолчанию для доступа к Redis не требуется пароль. Для настройки прав доступа отредактируйте конфигурационный файл /etc/redis/redis.conf. В соответствии с документацией, Redis - высокопроизводительная база данных, которая позволяет злоумышленнику проверять до 150 000 паролей в секунду. Поэтому рекомендуется использовать надежный пароль. Например, сгенерируем пароль из 32 символов:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ openssl rand 32 | openssl base64 -A
JvDoH6XbAaFHHYnHEH0O0voURJCd5XoZ64W2lf1hyXQ=
```

Укажем этот пароль в файле /etc/redis/redis.conf в разделе SECURITY в команде requirepass:

```
################################## SECURITY ###################################

# Require clients to issue AUTH <PASSWORD> before processing any other
# commands. This might be useful in environments in which you do not trust
# others with access to the host running redis-server.
#
# This should stay commented out for backward compatibility and because most
# people do not need auth (e.g. they run their own servers).
#
# Warning: since Redis is pretty fast an outside user can try up to
# 150k passwords per second against a good box. This means that you should
# use a very strong password otherwise it will be very easy to break.
#
# requirepass foobared

requirepass JvDoH6XbAaFHHYnHEH0O0voURJCd5XoZ64W2lf1hyXQ=

```

Для повышения уровня безопасности можно использовать переименование команд либо запрет выполнения команд для работы с базой данных. Например:

```
# Command renaming.
#
# It is possible to change the name of dangerous commands in a shared
# environment. For instance the CONFIG command may be renamed into something
# hard to guess so that it will still be available for internal-use tools
# but not available for general clients.
#
# Example:
#
# rename-command CONFIG b840fc02d524045429941cc15f59e41cb7be6c52
#
# It is also possible to completely kill a command by renaming it into
# an empty string:
#
# rename-command CONFIG ""
#
# Please note that changing the name of commands that are logged into the
# AOF file or transmitted to replicas may cause problems.
```

Перезагрузите сервер Redis:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ sudo systemctl restart redis-server.service
```

Подключитесь к серверу  и проверьте выполненные настройки:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ redis-cli
127.0.0.1:6379> ping
(error) NOAUTH Authentication required.
127.0.0.1:6379> auth JvDoH6XbAaFHHYnHEH0O0voURJCd5XoZ64W2lf1hyXQ=
OK
127.0.0.1:6379> ping
PONG
127.0.0.1:6379>
```

## Настройка сетевого доступа

По умолчанию Redis слушает только 127.0.0.1. Чтобы настроить сетевой доступ к серверу, отредактируйте  файл _/etc/redis/redis.conf_ . Найдите строку _bind 127.0.0.1 ::1_ и закомментируйте ее:

```
# IF YOU ARE SURE YOU WANT YOUR INSTANCE TO LISTEN TO ALL THE INTERFACES
# JUST COMMENT THE FOLLOWING LINE.
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#bind 127.0.0.1 ::1
```

Перезапустите Redis:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ sudo systemctl restart redis-server.service
```

Убедитесь, что Redis слушает сеть:

```
ubuntu@ubuntu-standard-2-4-40gb:~$ sudo netstat -tulpn | grep redis
tcp 0 0 0.0.0.0:6379 0.0.0.0:\* LISTEN 1562/redis-server \*
tcp6       0      0 :::6379                 :::\*                    LISTEN      1562/redis-server \*
```

Проверьте сетевое подключение к базе данных с другого компьютера:

```
root@ash:~# redis-cli -h <REDIS_SERVER_IP>
REDIS:6379> ping
(error) NOAUTH Authentication required.
REDIS:6379> auth JvDoH6XbAaFHHYnHEH0O0voURJCd5XoZ64W2lf1hyXQ=
OK
REDIS:6379> ping
PONG
REDIS:6379>
```

**Внимание**

Поскольку Redis по умолчанию не является надежно защищенной базой данной, используйте надежный пароль, а также ограничьте доступ к базе данных с помощью firewall.

## Интересное о Redis

Следующая часть конфигурационного файла определяет предельный объем памяти, который может использоваться сервером Redis, и механизм вытеснения ключей при заполнении этого объема памяти:

```
############################## MEMORY MANAGEMENT ################################

# Set a memory usage limit to the specified amount of bytes.
# When the memory limit is reached Redis will try to remove keys
# according to the eviction policy selected (see maxmemory-policy).
#
# If Redis can't remove keys according to the policy, or if the policy is
# set to 'noeviction', Redis will start to reply with errors to commands
# that would use more memory, like SET, LPUSH, and so on, and will continue
# to reply to read-only commands like GET.
#
# This option is usually useful when using Redis as an LRU or LFU cache, or to
# set a hard memory limit for an instance (using the 'noeviction' policy).
#
# WARNING: If you have replicas attached to an instance with maxmemory on,
# the size of the output buffers needed to feed the replicas are subtracted
# from the used memory count, so that network problems / resyncs will
# not trigger a loop where keys are evicted, and in turn the output
# buffer of replicas is full with DELs of keys evicted triggering the deletion
# of more keys, and so forth until the database is completely emptied.
#
# In short... if you have replicas attached it is suggested that you set a lower
# limit for maxmemory so that there is some free RAM on the system for replica
# output buffers (but this is not needed if the policy is 'noeviction').
#
# maxmemory <bytes>

# MAXMEMORY POLICY: how Redis will select what to remove when maxmemory
# is reached. You can select among five behaviors:
#
# volatile-lru -> Evict using approximated LRU among the keys with an expire set.
# allkeys-lru -> Evict any key using approximated LRU.
# volatile-lfu -> Evict using approximated LFU among the keys with an expire set.
# allkeys-lfu -> Evict any key using approximated LFU.
# volatile-random -> Remove a random key among the ones with an expire set.
# allkeys-random -> Remove a random key, any key.
# volatile-ttl -> Remove the key with the nearest expire time (minor TTL)
# noeviction -> Don't evict anything, just return an error on write operations.
#
# LRU means Least Recently Used
# LFU means Least Frequently Used
#
# Both LRU, LFU and volatile-ttl are implemented using approximated
# randomized algorithms.
#
# Note: with any of the above policies, Redis will return an error on write
# operations, when there are no suitable keys for eviction.
#
# At the date of writing these commands are: set setnx setex append
# incr decr rpush lpush rpushx lpushx linsert lset rpoplpush sadd
# sinter sinterstore sunion sunionstore sdiff sdiffstore zadd zincrby
# zunionstore zinterstore hset hsetnx hmset hincrby incrby decrby
# getset mset msetnx exec sort
#
# The default is:
#
# maxmemory-policy noeviction
```

Параметр _maxmemory_ определяет максимальный объем памяти в байтах, который может использоваться Redis.

Параметр _maxmemory-policy_ определяет политику вытеснения ключей при заполнении этого объема памяти.

Возможные значения:

- _noeviction_ - не вытеснять данные, то есть если память закончилась, при попытке записи в базу данных выдавать ошибку (по умолчанию);
- _volatile-lru_ - удалить наименее используемые в последнее время ключи с настройкой expire;
- _allkeys-lru_ - удалить наименее используемые в последнее время ключи вне зависимости от настройки expire;
- _volatile-lfu_ - удалить наименее часто используемые ключи с настройкой expire;
- _allkeys-lfu_ - удалить наименее часто используемые ключи вне зависимости от настройки expire;
- _volatile-random_ - удалить случайные ключи с настройкой expire;
- _allkeys-random_ - удалить случайные ключи вне зависимости от настройки expire;
- _volatile-ttl_ - удалить ключи, срок действия которых истекает быстрее остальных (то есть время жизни которых приближается к expire).

Еще одной интересной особенностью Redis является однопоточность. Это делает  бессмысленными попытки масштабирования путем наращивания ядра процессора - в результате при высоких нагрузках может заметно деградировать производительность сервера Redis. Официальная рекомендация разработчиков: для снижения нагрузки пересматривать архитектуру приложения, использующего Redis. Поскольку такое решение подходит не всем, был создан многопоточный сервер KeyDB, полностью совместимый с Redis и набирающий популярность в настоящее время. Подробнее о KeyDB [читайте тут](https://keydb.dev/).

Обратная связь

Возникли проблемы или остались вопросы? [Напишите нам, мы будем рады вам помочь](https://mcs.mail.ru/help/contact-us).
