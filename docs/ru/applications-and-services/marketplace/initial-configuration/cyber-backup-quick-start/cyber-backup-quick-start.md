Вы можете настроить резервное копирование и восстановление ваших виртуальных машин с помощью сервиса [Кибер Бэкап Облачный](https://msk.cloud.vk.com/app/services/marketplace/v2/apps/service/630008e7-a649-4111-a21f-6d8461cd5f7a/latest/info).

{cut(Принцип работы сервиса)}

1. На целевые ВМ устанавливаются агенты сервиса.
1. Для целевых ВМ настраиваются планы резервного копирования в облако сервиса.
1. При необходимости состояние целевой ВМ восстанавливается из резервной копии, которая хранится на стороне сервиса.

{/cut}

Пройдя все шаги этой инструкции, вы:

1. Подключите в личном кабинете VK Cloud сервис Кибер Бэкап Облачный и создадите аккаунт в сервисе.
1. Зарегистрируете в сервисе ВМ, созданную на платформе VK Cloud.
1. Создадите в сервисе резервную копию этой ВМ.
1. Восстановите ВМ в VK Cloud из резервной копии, которая хранилась в сервисе.

Используя сервис, вы соглашаетесь с [лицензионным соглашением](/ru/intro/start/legal/marketplace) сервиса Marketplace и с [пользовательским соглашением](https://cyberprotect.ru/static/pdf/Cyberprotect_EULA_RUS.pdf) вендора ООО «Киберпротект».

## Подготовительные шаги

Предполагается, что в проекте уже существует виртуальная машина (ВМ), данные которой вы планируете защитить при помощи сервиса Кибер Бэкап Облачный.

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
1. [Настройте](/ru/tools-for-using-services/vk-cloud-account/instructions/account-manage/manage-2fa) двухфакторную аутентификацию (2FA) для учетной записи, если она еще не настроена.
1. Убедитесь, что ВМ, которая будет зарегистрирована в сервисе:

   - Отвечает его [системным требованиям](https://docs.cyberprotect.ru/ru-RU/CyberBackupCloud/21.06/user/#supported-operating-systems-and-environments.html).

   - Доступна для подключения по SSH:

      - Имеет внешний IP-адрес.
      - Ей назначена [группа безопасности](/ru/networks/vnet/concepts/traffic-limiting#secgroups) `ssh`.

         Если группа не назначена, [назначьте](/ru/networks/vnet/instructions/secgroups#naznachenie_gruppy_pravil_na_instans) ее.

      - У вас есть приватный SSH-ключ из [ключевой пары](/ru/computing/iaas/instructions/vm/vm-connect/vm-connect-nix#3_proverte_nalichie_klyuchevoy_pary), которая используется для доступа к ВМ. Имя ключевой пары отображается на странице ВМ в разделе **Облачные вычисления**.

   В примере в этой статье подключение описано для ВМ с Ubuntu 22.04 и именем `Ubuntu-CBC`.

   {note:info}

   Если вы увеличиваете размер загрузочного диска ВМ или добавляете новые диски, эти изменения автоматически отражаются в консоли сервиса.

   {/note}

1. [Подключитесь](/ru/computing/iaas/instructions/vm/vm-connect/vm-connect-nix) к ВМ.
1. В вашей домашней директории разместите произвольный непустой файл. Например, выполните в консоли:

    ```console

    cp --help > /home/ubuntu/cp_help.txt

    ```

    В домашней директории будет создан файл `cp_help.txt`.

## 1. Подключите сервис Кибер Бэкап Облачный

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
1. Перейдите в раздел **Магазин приложений**.
1. На карточке сервиса **Кибер Бэкап Облачный** нажмите кнопку **Подробнее**.
1. На странице сервиса нажмите кнопку **Подключить**.
1. Выберите тарифный план **Лицензирование по устройствам**.

   Он предполагает списание фиксированной суммы в месяц за каждую подключенную ВМ. Объем данных, которые хранятся в резервных копиях ВМ, и количество резервных копий на тарификацию не влияют.

1. На открывшейся странице тарифа нажмите **Подключить тариф**.
1. Дождитесь завершения установки.

   На почту, привязанную к аккаунту VK Cloud, придет письмо для активации аккаунта в сервисе Кибер Бэкап Облачный.

1. Перейдите по ссылке из письма. В окне регистрации задайте пароль для вашего аккаунта.

   Ваш логин будет совпадать с [идентификатором (PID)](/ru/tools-for-using-services/account/instructions/project-settings/manage#poluchenie_identifikatora_proekta) проекта в VK Cloud, в котором вы подключили сервис.

1. Подтвердите согласие с юридическими условиями использования сервиса: выберите все соглашения в списке и нажмите кнопку **Принять**.

Откроется консоль сервиса Кибер Бэкап Облачный — личный кабинет, доступный по адресу https://ru01-cloud.cyberprotect.ru.

## 2. Установите на ВМ агент сервиса Кибер Бэкап Облачный

Установка агента необходима:

- для синхронизации данных ВМ с копией этих данных в облаке сервиса;
- для управления ВМ — например, для ее перезагрузки.

1. [Авторизуйтесь](https://cloud.acronis-infoprotect.ru/login) в консоли, используя логин и пароль вашего аккаунта в сервисе Кибер Бэкап Облачный.
1. На главной странице консоли перейдите в раздел **Устройства** → **Все устройства** и нажмите кнопку **Добавить** в правой верхней части экрана.
1. В открывшемся окне выберите опцию **Серверы** → **Linux**. На ваше устройство будет загружен дистрибутив агента для Linux.
1. Установите агент на ВМ `Ubuntu-CBC`.

   1. В консоли сервиса создайте маркер регистрации:
      1. Выберите раздел **Устройства** → **Все устройства** и нажмите кнопку **Добавить** в правой верхней части экрана.
      1. В открывшемся окне пролистайте экран до группы полей **Маркер регистрации**, нажмите кнопку **Создать**.
      1. В окне создания задайте срок действия маркера и нажмите **Generate token**.

         Будет создан маркер — последовательность из 12 букв и цифр вида `A1B2—C3D4—E5F6`.

      1. Скопируйте и сохраните значение маркера.

         После того, как окно будет закрыто, посмотреть значение маркера будет невозможно.

   1. [Подключитесь](/ru/computing/iaas/instructions/vm/vm-connect/vm-connect-nix) к ВМ, загрузите на нее дистрибутив агента сервиса для Linux.
   1. Установите на ВМ пакет `rpm`:

      ```console

      sudo apt-get install rpm

      ```

   1. Запустите на ВМ дистрибутив, выполнив команду запуска со следующими параметрами:

      ```console

      sudo ./<Путь к дистрибутиву Linux> -i BackupAndRecoveryAgent --rain=https://cloud.acronis-infoprotect.ru --token=<маркер регистрации>

      ```

      Замените переменные:

         - <Путь к дистрибутиву Linux> — полный путь к дистрибутиву, включая имя файла и расширение, например: *ubuntu/Backup_AgentForLinux_x86_64.bin*.
         - <маркер регистрации> — маркер, который вы сгенерировали в консоли Кибер Бэкап Облачный.

      {note:info}

      В ряде случаев на Linux может потребоваться установка дополнительных пакетов, подробнее в [официальной документации сервиса](https://docs.cyberprotect.ru/ru-RU/CyberBackupCloud/21.06/user/#linux-packages.html).

      {/note}

   1. В открывшемся окне установщика выберите опцию **Agent for Linux** и следуйте шагам мастера установки.

   Дополнительные сведения об установке — в разделе [для ОС Linux](https://docs.cyberprotect.ru/ru-RU/CyberBackupCloud/21.06/user/#installing-agents.html) в документации сервиса.

После успешной установки агента ВМ `Ubuntu-CBC` будет зарегистрирована в сервисе Кибер Бэкап Облачный и появится в консоли в разделе **Устройства** → **Все устройства**. ВМ отобразится в консоли с именем `ubuntu-cbc` и с состоянием **Без защиты**.

## 3. Создайте план защиты для ВМ и первую резервную копию

План защиты позволяет настроить график резервного копирования для ВМ. Вы можете указать:

- какие данные копировать — всю ВМ, отдельные диски / тома или файлы;
- как хранить эти данные — в зашифрованном или незашифрованном виде;
- расписание автоматического резервного копирования;
- срок хранения копий.

Вы можете в любой момент применить план защиты к ВМ вручную, вне расписания.

Чтобы создать план защиты и применить его:

1. [Авторизуйтесь](https://cloud.acronis-infoprotect.ru/login) в консоли сервиса Кибер Бэкап Облачный.
1. Перейдите в раздел **Устройства** → **Все устройства**.
1. Выберите ВМ `ubuntu-cbc` с помощью флажка и нажмите кнопку **Защитить** в боковом меню справа.
1. В открывшемся окне раскройте список **Создать план**, выберите опцию **Защита**.
1. Создайте для ВМ план защиты, как описано в [официальной документации сервиса](https://docs.cyberprotect.ru/ru-RU/CyberBackupCloud/21.06/user/#backup.html). При создании плана оставьте включенной опцию шифрования и задайте пароль.

   Дождитесь создания плана.

1. Примените план:

   1. Перейдите в раздел **Устройства** → **Все устройства**, выберите ВМ в списке и нажмите кнопку **Защитить** в боковом меню справа.

      Откроется карточка плана.

   1. Наведите курсор на план и запустите его.

Запустится резервное копирование, его прогресс будет показан на карточке ВМ. После завершения копирования будет показано состояние **ОК**.

## 4. Удалите данные с ВМ

[Подключитесь](/ru/computing/iaas/instructions/vm/vm-connect/vm-connect-nix) к ВМ `Ubuntu-CBC` и удалите из вашей домашней директории файл `cp_help.txt`.

## 5. Восстановите ВМ из резервной копии

1. [Авторизуйтесь](https://cloud.acronis-infoprotect.ru/login) в консоли сервиса.
1. В разделе **Устройства** → **Все устройства** нажмите кнопку **Восстановить** в карточке вашей ВМ.
1. В открывшемся окне задайте настройки восстановления:

   1. Нажмите кнопку **Восстановление**.
   1. Выберите точку восстановления **Вся машина**.
   1. Укажите пароль, который вы задали при создании плана.

1. В открывшемся окне ознакомьтесь с настройками и нажмите **Начать восстановление**.
   1. В поле **Восстановить в** оставьте выбранной опцию **Физическая машина**.

      Сервис Кибер Бэкап Облачный считает физическими машинами ВМ, развернутые на сторонних платформах.

   1. Поле **Целевая машина** оставьте без изменений.
1. В окне подтверждения ознакомьтесь с информацией и нажмите **Начать восстановление**.

   В открывшемся окне будет показан прогресс операции в процентах.

Данные на исходной ВМ в облаке VK Cloud будут восстановлены, ВМ будет перезагружена. Все изменения, которые происходили на ВМ с момента последнего применения плана защиты, будут потеряны. Имя ВМ в VK Cloud после восстановления не изменится.

## 6. Проверьте работоспособность восстановленной ВМ

1. [Подключитесь](/ru/computing/iaas/instructions/vm/vm-connect/vm-connect-nix) к ВМ `Ubuntu-CBC`.
1. Проверьте наличие файла `cp_help.txt` в домашней директории.
1. [Выполните](/ru/computing/iaas/instructions/vm/vm-manage) произвольные операции с ВМ.
