1. [Получите](/ru/additionals/cases/case-keystone-token) токен доступа `{auth_token}`.
1. Запросите логи с помощью команды:

	```bash
	curl -G -d"from=`date +%Y-%m-%dT00:00:00 --date=today`&to=`date +%Y-%m-%dT00:00:00 --date=tomorrow`" 'https://mcs.mail.ru/cloudlogs/v1/logs' -H "X-Auth-Token: `{auth_token}`"
	```
