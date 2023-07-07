## Hardware configuration

To run this monitoring scenario, install and configure servers using the following hardware:

- Prometheus 2.13 on Ubuntu 18.04 LTS x86_64.
- Grafana 6.4.2 on Ubuntu 18.04 LTS x86_64.
- Redis 5 on Ubuntu 18.04 LTS x86_64.

<warn>

**Attention**

When using servers and hardware of other versions, some steps of the script may differ from those described below.

</warn>

## Scheme of work

**![](./assets/1572296721838-1572296721838-png)**

To monitor Redis settings and collect metrics, Prometheus uses an exporter that queries the Redis server and sends data to the Prometheus server. Data can be visualized in Grafana using Dashboard.

## Install redis_exporter

1. Log in to the Redis server as root.
2. Specify the current version of the exporter:

```
root@redis:~# export VERSION="<version>"
```

<info>

**Note**

The current version of redis_exporter can be [found and downloaded here](https://github.com/oliver006/redis_exporter/releases) [or here](https://prometheus.io/download/#mysqld_exporter).

</info>

3. Create a prometheus user and a prometheus group to run redis_exporter as:

```
root@redis:~# groupadd --system prometheus
root@redis:~# useradd --system -g prometheus -s /bin/false prometheus
```

4. Download redis_exporter and unzip to /tmp folder:

```
root@redis:~# wget https://github.com/oliver006/redis_exporter/releases/download/v$VERSION/redis_exporter-v$VERSION.linux-amd64.tar.gz -O - | tar -xzv -C /tmp
```

5. Copy the contents of the unpacked file to the /usr/local/bin folder:

```
root@redis:~# cp /tmp/redis_exporter-v$VERSION.linux-amd64/redis_exporter /usr/local/bin
```

6. Delete the contents of the unpacked archive from the /tmp folder:

```
root@redis:~# rm -rf /tmp/redis_exporter-v$VERSION.linux-amd64
```

7. Change the owner of redis_exporter to prometheus:

```
root@redis:~# chown -R prometheus:prometheus /usr/local/bin/redis_exporter
```

8. Create a script to start the systemd service redis_exporter. To do this, create a file /etc/systemd/system/redis_exporter.service with the following content:

```
[unit]
Description=Prometheus Redis Exporter
After=network.target

[Service]
Type=simple
Restart=always
User=prometheus
Group=prometheus
ExecStart=/usr/local/bin/redis_exporter -include-system-metrics
[Install]
WantedBy=multi-user.target
```

<warn>

**Attention**

The address and port used by redis_exporter must be accessible from the Prometheus server. To do this, [configure the firewall policy for the server with redis_exporter](https://mcs.mail.ru/help/network/security).

</warn>

9. Run redis_exporter:

```
root@redis:~# systemctl daemon-reload
root@redis:~# systemctl start redis_exporter
root@redis:~# systemctl enable redis_exporter
Created symlink /etc/systemd/system/multi-user.target.wants/redis_exporter.service → /etc/systemd/system/redis_exporter.service.
```

10. Make sure the service has started:

```
root@redis:~# systemctl status redis_exporter
● redis_exporter.service - Prometheus Redis Exporter
Loaded: loaded (/etc/systemd/system/redis_exporter.service; enabled; vendor preset: enabled)
Active: active (running) since Fri 2019-10-11 07:10:00 UTC; 3min 31s ago
Main PID: 16236 (redis_exporter)
Tasks: 3 (limit: 1152)
CGroup: /system.slice/redis_exporter.service
└─16236 /usr/local/bin/redis_exporter -include-system-metrics -redis.addr 10.0.0.7

Oct 11 07:10:00 redis systemd[1]: Started Prometheus Redis Exporter.
Oct 11 07:10:00 redis redis_exporter[16236]: time="2019-10-11T07:10:00Z" level=info msg="Redis Metrics Exporter v1.3.1 build date: 2019-10-08-14:33 :37 sha1: c3213a117be9f65d93ce0c099a419e913
Oct 11 07:10:00 redis redis_exporter[16236]: time="2019-10-11T07:10:00Z" level=info msg="Providing metrics at :9121/metrics"
```

## Set up the Prometheus server to receive redis_exporter data

1. Log in to the Prometheus server.

2. In the prometheus.yml file for working with redis_exporter:

- In scrape_configs add the following section:

```
scrape_configs:
- job_name: redis
    static_configs:
        - targets: ['10.0.0.4:9121']
        labels:
          alias: redis
```

```
scrape_configs:
- job_name: redis
static_configs:
- targets: ['10.0.0.4:9121']
labels:
          alias: redis
```

- In the targets section, enter the IP address of the redis_exporter server.

3. Restart the Prometheus service:

```
root@prometheuskit-11102019-instance-5bqp2hk6nrgk:~# systemctl reload prometheus.service
```

## Setting up Grafana

To visualize the received data, install the [appropriate Dashboard](https://grafana.com/grafana/dashboards/763).

After installing and configuring receiving data from the Prometheus server, something like the following will be displayed:

**![](./assets/1572300537338-1572300537337-png)**

## Create test load

To see how the graphs change when the Redis server is under load, use the redis-benchmark utility included with redis-tools.root@redis:

```
~# redis-benchmark -n 1000000 -c 100 -q
PING_INLINE: 39514.76 requests per second
PING_BULK: 37774.34 requests per second
SET: 37871.61 requests per second
GET: 34598.48 requests per second
INCR: 35792.26 requests per second
LPUSH: 37345.48 requests per second
RPUSH: 37873.05 requests per second
LPOP: 37661.95 requests per second
RPOP: 37936.27 requests per second
SADD: 37854.41 requests per second
HSET: 39003.08 requests per second
SPOP: 37636.43 requests per second
LPUSH (needed to benchmark LRANGE): 36524.34 requests per second
LRANGE_100 (first 100 elements): 19450.71 requests per second
LRANGE_300 (first 300 elements): 7574.84 requests per second
LRANGE_500 (first 450 elements): 5414.83 requests per second
LRANGE_600 (first 600 elements): 4037.40 requests per second
MSET (10 keys): 24537.47 requests per second
```

Now look at how graphs have changed as a result of the load test in Grafana:**![](./assets/1572300626800-1572300626800-png)**

## Remove redis_exporter

1. Remove Dashboard from Grafana.
2. Remove the section - job_name: redis from the prometheus configuration file.
3. Run the following commands on the redis_exporter node:

```
root@redis:~# systemctl stop redis_exporter.service
root@redis:~# systemctl disable redis_exporter.service
Removed /etc/systemd/system/multi-user.target.wants/redis_exporter.service.
root@redis:~# rm /etc/systemd/system/redis_exporter.service
root@redis:~# systemctl daemon-reload
root@redis:~# rm -f /usr/local/bin/redis_exporter
root@redis:~# userdel prometheus
root@redis:~# groupdel prometheus
```

## **Feedback**

Any problems or questions? [Write to us, we will be happy to help you](https://mcs.mail.ru/help/contact-us).
