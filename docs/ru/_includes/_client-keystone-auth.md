{tabs}

{tab(Linux (bash))}

1. Установите пакеты `zip` и `unzip`, если они не установлены:

   ```console
   sudo apt install zip unzip
   ```

1. В терминале выполните команду:

   ```console
   curl -sSL \
     https://hub.mcs.mail.ru/repository/client-keystone-auth/latest/linux/client-install.sh \
   | bash
   ```

   Начнется установка утилиты `keystone-auth`.

1. Если вы используете командную оболочку, отличную от `bash`, добавьте путь до утилиты в переменную окружения `PATH`.

1. Перезапустите командную оболочку или выполните команду `source`.

   Подсказка с нужными командами будет выведена после окончания установки.

{/tab}

{tab(macOS (zsh))}

1. В терминале выполните команду:

   ```console
   curl -sSL \
     https://hub.mcs.mail.ru/repository/client-keystone-auth/latest/linux/client-install.sh \
   | bash
   ```

   Начнется установка утилиты `keystone-auth`.

1. Если вы используете командную оболочку, отличную от `zsh`, добавьте путь до утилиты в переменную окружения `PATH`.

1. Перезапустите командную оболочку или выполните команду `source`.

   Подсказка с нужными командами будет выведена после окончания установки.

{/tab}

{tab(Windows (PowerShell))}

1. В PowerShell выполните команду:

   ```console
   iex (New-Object System.Net.WebClient).DownloadString( `
   'https://hub.mcs.mail.ru/repository/client-keystone-auth/latest/windows/client-install.ps1' `
   )

   ```

   Начнется установка утилиты `keystone-auth`.

1. Подтвердите добавление директории с утилитой в переменную окружения `PATH`, введя `Y` в ответ на запрос:

   ```text
   Add client-keystone-auth installation dir to your PATH? [Y/n]
   ```

{/tab}

{/tabs}