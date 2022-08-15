`client-keystone-auth` необходим для прохождения процедуры Single Sign-On (SSO) при подключении к кластеру.

<tabs>
<tablist>
<tab>Windows</tab>
<tab>Linux/Mac OS</tab>
</tablist>
<tabpanel>

1. Выполните команду в PowerShell:

```bash
iex (New-Object System.Net.WebClient).DownloadString('https://hub.mcs.mail.ru/repository/client-keystone-auth/latest/windows/client-install.ps1')
```

2. Добавьте путь до `client-keystone-auth` в переменные среды:

```bash
Add client-keystone-auth installation dir to your PATH? [Y/n]
```

3. Введите «Y». После этого установка будет завершена.

</tabpanel>
<tabpanel>

1. Выполните команду в терминале:

```bash
curl -sSL https://hub.mcs.mail.ru/repository/client-keystone-auth/latest/linux/client-install.sh | bash
```

2. Скрипт установит `client-keystone-auth` и автоматически добавит путь до него в переменные среды.

<warn>

Если вы используете командную оболочку, отличную от Bash и Zsh, то Вам придется самостоятельно добавить путь до `client-keystone-auth` в переменные среды.

</warn>

3. Перезапустите командную оболочку.

В случае возникновения проблем обратитесь в техподдержку.

</tabpanel>
</tabs>
