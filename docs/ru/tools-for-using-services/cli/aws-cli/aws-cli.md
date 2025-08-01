Интерфейс командной строки AWS (AWS CLI) позволяет работать с сервисами VK Cloud через консоль.

AWS CLI доступен в двух версиях:

- Версия 2.X — текущая общедоступная версия, предпочтительно использовать эту версию.
- Версия 1.X — предыдущая версия, доступная для обеспечения обратной совместимости.

 {note:info}

Сервис Cloud Storage поддерживает следующие версии AWS CLI: 1.36.40 или ниже, 2.22.35 или ниже.

{/note}

Полная информация о наборе команд и дополнительных настройках AWS CLI доступна на [сайте разработчика](https://docs.aws.amazon.com/cli/index.html).

## 1. Установите клиент AWS

{tabs}

{tab(Linux)}
Требования:

- 64-разрядная версия CentOS, Fedora, Ubuntu, Amazon Linux 1, Amazon Linux 2 and Linux ARM;
- возможность разархивировать загруженный пакет: команда `unzip` или подобные;
- установлены и доступны пакеты `glibc`, `groff` и `less`.

Для Linux x86 (64-бит) выполните:

  ```console
  curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
  unzip awscliv2.zip
  sudo ./aws/install
  ```

Для Linux ARM выполните:

  ```console
  curl "https://awscli.amazonaws.com/awscli-exe-linux-aarch64.zip" -o "awscliv2.zip"
  unzip awscliv2.zip
  sudo ./aws/install
  ```

{/tab}

{tab(macOS)}

Требования:

- 64-разрядная версия macOS.

Установка:

1. Загрузите и откройте [установщик MSI AWS CLI](https://awscli.amazonaws.com/AWSCLIV2.pkg) или выполните команду в консоли:

    ```console
    curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o   "AWSCLIV2.pkg"
    sudo installer -pkg AWSCLIV2.pkg -target /
    ```

1. Следуйте инструкциям мастера установки.

{/tab}

{tab(Windows)}

Требования:

- 64-разрядная версия Windows;
- права администратора.

Установка:

1. Загрузите и откройте [установщик MSI AWS CLI](https://awscli.amazonaws.com/AWSCLIV2.msi) или выполните команду в консоли:

    ```console
   msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi
   ```

1. Следуйте инструкциям мастера установки. По умолчанию AWS CLI устанавливается в `C:\\Program Files\\Amazon\\AWSCLIV2`.

{/tab}

{/tabs}

## 2. Проверьте установку AWS

Выполните команду в консоли:

  ```console
  aws --version
  ```
Если клиент AWS установлен, в выводе консоли отобразится его версия.
