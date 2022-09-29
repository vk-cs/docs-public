Проссматривать логи можно двумя способами:

<tabs>
<tablist>
<tab>Платформа VK Cloud</tab>
<tab>CLI</tab>
</tablist>
<tabpanel>

Максимальный срок хранения данных — 3 дня. Вы можете отфильтровать записи с помощью фильтров.

Для просмотра логов перейдите в раздел «Логирование в облаке» → «Логи баз данных» личного кабинета. На открывшейся странице отобразятся записи.

</tabpanel>
<tabpanel>

1. Получите токен авторизации:

```bash
curl -i -H "Content-Type: application/json" -d '
{
    "auth": {
   	 "scope": {
   		 "project": { "id": "<project>"}
   	 },
   	 "identity": {
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
}' "https://infra.mail.ru:35357/v3/auth/tokens"  | grep X-Subject-Token | cut -d " " -f2 > token
```

2. Запросите логи по токену:

```bash
curl -G -d"from=`date +%Y-%m-%dT00:00:00 --date=today`&to=`date +%Y-%m-%dT00:00:00 --date=tomorrow`" 'https://mcs.mail.ru/cloudlogs/v1/logs' -H "X-Auth-Token: `cat token`"
```

</tabpanel>
</tabs>
