There are two ways to view logs:

<tabs>
<tablist>
<tab>VK Cloud Platform</tab>
<tab>CLI</tab>
</tablist>
<tabpanel>

The maximum data storage period is 3 days. You can filter entries using filters.

To view the logs, go to the "Cloud Logging" → "Database Logs" section of your personal account. The page that opens will display the entries.

</tabpanel>
<tabpanel>

1. Get an authorization token:

```bash
curl -i -H "Content-Type: application/json" -d '
{
    "auth": {
   scope: {
   "project": { "id": "<project>"}
   },
   identity: {
   "methods": ["password"],
   "password": {
   "user": {
   "name": "<user name>",
   "domain": {"id": "users"},
   "password": "<password>"
   }
   }
   }
    }
}' "https://infra.mail.ru:35357/v3/auth/tokens" | grep X-Subject-Token | cut -d " " -f2 > token
```

2. Request logs by token:

```
curl -G -d"from=`date +%Y-%m-%dT00:00:00 --date=today`&to=`date +%Y-%m-%dT00:00:00 --date= tomorrow`"'https://mcs.mail.ru/cloudlogs/v1/logs'-H "X-Auth-Token: `cat token`"
```

</tabpanel>
</tabs>
