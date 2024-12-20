<tabs>
<tablist>
<tab>Windows (PowerShell)</tab>
<tab>Linux (bash)/macOS (zsh)</tab>
</tablist>
<tabpanel>

1. В PowerShell выполните команду:

   ```powershell
   iex (New-Object System.Net.WebClient).DownloadString( `
   'https://hub.mcs.mail.ru/repository/client-keystone-auth/latest/windows/client-install.ps1' `
   )

   ```

   Начнется установка утилиты `keystone-auth`.

1. Подтвердите добавление директории с утилитой в переменную окружения `PATH`, введя `Y` в ответ на запрос:

   ```text
   Add client-keystone-auth installation dir to your PATH? [Y/n]
   ```
   
</tabpanel>
<tabpanel>

1. В терминале выполните команду:

   ```bash
   curl -sSL \
     https://hub.mcs.mail.ru/repository/client-keystone-auth/latest/linux/client-install.sh \
   | bash
   ```

   Начнется установка утилиты `keystone-auth`.

1. Если вы используете командную оболочку, отличную от `bash` или `zsh`, самостоятельно добавьте путь до утилиты в переменную окружения `PATH`.

1. Перезапустите командную оболочку или выполните команду `source`.

   Подсказка с нужными командами будет выведена по завершении установки.
   
</tabpanel>
</tabs>