To get access to new PostgreSQL features, you need to upgrade your DBMS versions. Patch management allows you to upgrade Postgres and Postgres Pro from a lower version to a higher version.

To upgrade PostgreSQL, use the [pg_upgrade](https://postgrespro.ru/docs/postgresql/13/pgupgrade) utility.

<warn>

A backup will be made before the update. Plan ahead for the upgrade because PostgreSQL will be unavailable at the time of the upgrade.

</warn>

<tabs>
<tablist>
<tab>Single instance</tab>
<tab>Mater + replicas</tab>
<tab>Cluster</tab>
</tablist>
<tabpanel>

Make an API request:

```bash
curl --location --request PATCH '/v1.0/project_id/instances/instance_id' \
--header 'X-Auth-Token:  <user token>' \
--header 'Content-Type: application/json' \
-d '{
  "instance":{
      "datastore_version": <id new datastore version>
  }
}'
```

</tabpanel>
<tabpanel>

To update the replicas, a new version of PostgreSQL will be installed on the servers and the data on the replication tools will be synchronized with the master.

Make an API request:

```bash
curl --location --request PATCH '/v1.0/project_id/instances/instance_id' \
--header 'X-Auth-Token:  <user token>' \
--header 'Content-Type: application/json' \
-d '{
  "instance":{
      "datastore_version": <id new datastore version>
  }
}'
```

</tabpanel>
<tabpanel>

To update the replicas, a new version of the DBMS will be installed and Patroni will synchronize the data on them.

Make an API request:
``` bash
curl --location --request POST '/v1.0/project_id/clusters/cluster_id' \
--header 'X-Auth-Token: <user token>' \
--header 'Content-Type: application/json' \
--data-raw '{
  "upgrade": [
      {
          "datastore_version": <id new datastore version>
      }
  ]
}'
```

</tabpanel>
</tabs>
