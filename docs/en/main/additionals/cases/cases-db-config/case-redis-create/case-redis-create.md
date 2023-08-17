In this article, we will look at how to install standalone [Redis](https://redis.io/), create a database user, configure rights and network access.

## Hardware configuration

- Ubuntu Server 18.04 LTS x86_64.

## How to save time installing Redis

[Use](https://mcs.mail.ru/databases/) our turnkey cloud solution based on Redis DBMS. When you sign up, you get a free bonus account, which is enough to work for several days.

## Install standalone Redis

1. Log in to the Ubuntu 18.04 server.
1. Update the repository lists:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ sudo apt-get update
    ```

1. Redis 4 is located in the repositories by default on Ubuntu 18.04. Do one of the following:

    - If this version is sufficient, install it:

        ```
        ubuntu@ubuntu-standard-2-4-40gb:~$ sudo apt-get install redis-server
        ```

    - If an up-to-date version of Redis is required:
        1. Add a PPA repository with a new version of Redis:

            ```
            ubuntu@ubuntu-standard-2-4-40gb:~$ sudo add-apt-repository ppa:chris-lea/redis-server
            Redis is an open source, advanced key-value store. It is often referred to as a data structure server since keys can contain strings, hashes, lists, sets and sorted sets.
            More info: https://launchpad.net/~chris-lea/+archive/ubuntu/redis-server
            Press [ENTER] to continue or Ctrl-c to cancel adding it.
            ```

        1. Install the new version of Redis:

            ```
            ubuntu@ubuntu-standard-2-4-40gb:~$ sudo apt-get install redis-server
            ```

1. After installation, make sure the server is running:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ ps ax | grep redis
    335? Ssl 0:00 /usr/bin/redis-server 127.0.0.1:6379
    ```

1. Check the connection to the base. By default, no password is required to access the database:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ redis-cli
    127.0.0.1:6379> PING
    PONG
    127.0.0.1:6379>
    ```

1. Add the service to the list of applications that start automatically:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ sudo systemctl enable redis-server
    Synchronizing state of redis-server.service with SysV service script with /lib/systemd/systemd-sysv-install.
    Executing: /lib/systemd/systemd-sysv-install enable redis-server
    Created symlink /etc/systemd/system/redis.service → /lib/systemd/system/redis-server.service.
    ```

Installation completed.

## Setting permissions

By default, no password is required to access Redis. To set permissions, edit the configuration file `/etc/redis/redis.conf`. According to the documentation, Redis is a high performance database that allows an attacker to check up to 150,000 passwords per second. Therefore, it is recommended to use a strong password:

1. Generate a 32 character password:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ openssl rand 32 | openssl base64 -A
    JvDoH6XbAaFHHYnHEH0O0voURJCd5XoZ64W2lf1hyXQ=
    ```

2. Specify this password in the `/etc/redis/redis.conf` file in the `SECURITY` section in the `requirepass` command:

    ```
    ################################## SECURITY ############### #####################

    # Require clients to issue AUTH <PASSWORD> before processing any other
    # commands. This might be useful in environments in which you do not trust
    # others with access to the host running redis-server.
    #
    # This should stay commented out for backward compatibility and because most
    # people do not need auth (e.g. they run their own servers).
    #
    # Warning: since Redis is pretty fast an outside user can try up to
    # 150k passwords per second against a good box. This means that you should
    # use a very strong password otherwise it will be very easy to break.
    #
    # requirepass foobared

    requirepass JvDoH6XbAaFHHYnHEH0O0voURJCd5XoZ64W2lf1hyXQ=

    ```

To increase the level of security, you can use renaming commands or prohibiting the execution of commands for working with the database. For example:

```
# Command renaming.
#
# It is possible to change the name of dangerous commands in a shared
#environment. For instance the CONFIG command may be renamed into something
# hard to guess so that it will still be available for internal-use tools
# but not available for general clients.
#
#Example:
#
# rename-command CONFIG b840fc02d524045429941cc15f59e41cb7be6c52
#
# It is also possible to completely kill a command by renaming it into
# an empty string:
#
# rename-command CONFIG ""
#
# Please note that changing the name of commands that are logged into the
# AOF file or transmitted to replicas may cause problems.
```

After changing the configuration file, check the availability of the database:

1. Restart the Redis server:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ sudo systemctl restart redis-server.service
    ```

2. Connect to the server and check your settings:```
    ubuntu@ubuntu-standard-2-4-40gb:~$ redis-cli
    127.0.0.1:6379>ping
    (error) NOAUTH Authentication required.
    127.0.0.1:6379> auth JvDoH6XbAaFHHYnHEH0O0voURJCd5XoZ64W2lf1hyXQ=
    OK
    127.0.0.1:6379>ping
    PONG
    127.0.0.1:6379>
    ```

## Set up network access

By default, Redis only listens on 127.0.0.1. To set up network access to the server, follow these steps:

1. Edit the `_/etc/redis/redis.conf_` file. Find the line `_bind 127.0.0.1 ::1_` and comment it out:

    ```
    #IF YOU ARE SURE YOU WANT YOUR INSTANCE TO LISTEN TO ALL THE INTERFACES
    # JUST COMMENT THE FOLLOWING LINE.
    # ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~
    #bind 127.0.0.1 ::1
    ```

1. Restart Redis:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ sudo systemctl restart redis-server.service
    ```

1. Make sure Redis is listening on the network:

    ```
    ubuntu@ubuntu-standard-2-4-40gb:~$ sudo netstat -tulpn | grep redis
    tcp 0 0 0.0.0.0:6379 0.0.0.0:\* LISTEN 1562/redis-server \*
    tcp6 0 0 :::6379 1562/redis-server \*
    ```

1. Check the network connection to the database from another computer:

    ```
    root@ash:~# redis-cli -h <REDIS_SERVER_IP>
    REDIS:6379> ping
    (error) NOAUTH Authentication required.
    REDIS:6379> auth JvDoH6XbAaFHHYnHEH0O0voURJCd5XoZ64W2lf1hyXQ=
    OK
    REDIS:6379> ping
    PONG
    REDIS:6379>
    ```

<warn>

**Attention**

Since Redis is not a secure database by default, use a strong password and also restrict access to the database with a firewall.

</warn>

## Interesting about Redis

The following part of the configuration file defines the maximum amount of memory that can be used by the Redis server and the key eviction mechanism when this amount of memory is full:

```
############################## MEMORY MANAGEMENT ################## ###############

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
# maxmemory<bytes>

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

- The `_maxmemory_` parameter specifies the maximum amount of memory in bytes that Redis can use.

- The `_maxmemory-policy_` parameter defines the key eviction policy when this amount of memory is full. Possible values:- _noeviction_ - do not force out data, that is, if the memory is over, give an error when trying to write to the database (by default);
  - _volatile-lru_ — delete the least recently used keys with the expire setting;
  - _allkeys-lru_ — delete the least recently used keys, regardless of the expire setting;
  - _volatile-lfu_ - delete the least frequently used keys with the expire setting;
  - _allkeys-lfu_ - delete the least frequently used keys, regardless of the expire setting;
  - _volatile-random_ — delete random keys with expire setting;
  - _allkeys-random_ — delete random keys regardless of the expire setting;
  - _volatile-ttl_ - remove keys that expire faster than others (that is, the lifetime of which approaches expire).

Another interesting feature of Redis is single-threading. This makes it pointless to attempt to scale by increasing the processor core - as a result, under high loads, the performance of the Redis server can noticeably degrade. Official developers recommendation: to reduce the load, re-architect the application architecture that uses Redis. Since this solution is not suitable for everyone, a multi-threaded KeyDB server was created that is fully compatible with Redis and is gaining popularity at the present time. You can learn more about KeyDB at the [developer site](https://keydb.dev/).
