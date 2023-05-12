Cloud Database is a service for creating cloud databases, read more in [article](https://mcs.mail.ru/databases/).

Running PostgreSQL, MySQL, MongoDB and ClickHouse DBMS in a couple of minutes.

- Flexible database scaling as the business grows.
- Payment for used computing power, per-second billing.
- Geo-distributed replicas for greater reliability and less response delay.
- Backup to fault-tolerant storage in one click.
- SLA 99.95% with financial guarantees.

The list of DB instances available for creation can be viewed:

- to the **Databases** [section](https://mcs.mail.ru/app/services/databases/list) when creating an instance;
- to the [materials](https://mcs.mail.ru/databases/) VK Cloud.

After creation, the database becomes available by certain parameters for any of your applications using connectors, below is an example for Python:

```python
from pymongo import MongoClient

client = MongoClient("mongodb://<USERNAME>:<PASSWORD>@172.00.0.0")

db = client.<DATABASE>
```
