{tabs}

{tab(Linux (bash))}

1. `zip` және `unzip` пакеттері орнатылмаған болса, оларды орнатыңыз:

   ```console
   sudo apt install zip unzip
   ```

1. Терминалда келесі пәрменді орындаңыз:

   ```console
   curl -sSL \
     https://hub.mcs.mail.ru/repository/client-keystone-auth/latest/linux/client-install.sh \
   | bash
   ```

   `keystone-auth` утилитасын орнату басталады.

1. Егер `bash`-тен өзгеше командалық қабықты пайдалансаңыз, утилитаға дейінгі жолды `PATH` орта айнымалысына қосыңыз.

1. Командалық қабықты қайта іске қосыңыз немесе `source` пәрменін орындаңыз.

   Қажетті пәрмендер бойынша нұсқау орнату аяқталғаннан кейін көрсетіледі.

{/tab}

{tab(macOS (zsh))}

1. Терминалда келесі пәрменді орындаңыз:

   ```console
   curl -sSL \
     https://hub.mcs.mail.ru/repository/client-keystone-auth/latest/linux/client-install.sh \
   | bash
   ```

   `keystone-auth` утилитасын орнату басталады.

1. Егер `zsh`-тен өзгеше командалық қабықты пайдалансаңыз, утилитаға дейінгі жолды `PATH` орта айнымалысына қосыңыз.

1. Командалық қабықты қайта іске қосыңыз немесе `source` пәрменін орындаңыз.

   Қажетті пәрмендер бойынша нұсқау орнату аяқталғаннан кейін көрсетіледі.

{/tab}

{tab(Windows (PowerShell))}

1. PowerShell ішінде келесі пәрменді орындаңыз:

   ```console
   iex (New-Object System.Net.WebClient).DownloadString( `
   'https://hub.mcs.mail.ru/repository/client-keystone-auth/latest/windows/client-install.ps1' `
   )

   ```

   `keystone-auth` утилитасын орнату басталады.

1. Сұрауға жауап ретінде `Y` енгізіп, утилита директориясын `PATH` орта айнымалысына қосуды растаңыз:

   ```text
   Add client-keystone-auth installation dir to your PATH? [Y/n]
   ```

{/tab}

{/tabs}