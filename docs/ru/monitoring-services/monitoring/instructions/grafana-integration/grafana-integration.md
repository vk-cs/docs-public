# {heading(Подключение Grafana)[id=monitoring-grafana-integration]}

{ifdef(public)}
Визуализировать данные мониторинга ресурсов, собранные сервисом Cloud Monitoring, можно двумя способами:

- в разделе **Мониторинг → Дашборды** личного кабинета, как описано в статье {linkto(../mon-setup-new#monitoring-mon-setup-new)[text=%text]};
- с помощью сервиса Grafana.

Чтобы использовать сервис Grafana, {linkto(../../../../applications-and-services/marketplace/initial-configuration/grafana-start#marketplace-grafana-start)[text=разверните]} его из [Магазина приложений](https://msk.cloud.vk.com/app/services/marketplace) в вашем проекте.

При развертывании сервиса он будет автоматически интегрирован с Cloud Monitoring:

- Будет установлена связь, позволяющая Grafana получать данные мониторинга из сервиса Cloud Monitoring.
- В Grafana будут настроены следующие источники данных (data sources), связанные с Cloud Monitoring:

  - `[VK Cloud] Базы данных`;
  - `[VK Cloud] Виртуальные машины` (источник данных по умолчанию);
  - `[VK Cloud] Контейнеры (K8S)`;
  - `[VK Cloud] Приложения из Marketplace`;
  - `[VK Cloud] Резервное копирование`;
  - `[VK Cloud] Сервис JupiterHub`;
  - `[VK Cloud] Сервис MLFlow`;
  - `[VK Cloud] Сервис MLflow Deploy`;
  - `[VK Cloud] Сервис Spark в k8s`.
  
{note:info}
Получить можно только данные мониторинга того проекта, в котором развернут сервис Grafana.
{/note}

{/ifdef}

{ifdef(private,private-pg,private-pdf,private-pg-pdf)}
Вы можете визуализировать данные мониторинга ресурсов с помощью сервиса мониторинга и визуализации данных [Grafana](https://grafana.com).

<!--- #todo на раздел есть ссылка в Руководстве администратора VK Private Cloud. -->

Чтобы установить сервис Grafana в проекте:

1. {linkto(../../../../networks/vnet/instructions/net#vnet-net-add)[text=Создайте]} сеть, если она не была создана ранее.

   {note:warn}
   ВМ для Grafana должна иметь доступ к API {var(cloud)}.
   {/note}

1. {linkto(../../../../applications-and-services/marketplace/instructions/pr-instance-add#marketplace-pr-instance-add)[text=Разверните]} сервис Grafana.

1. Настройте параметры сервиса Grafana:

  * **Как будет размещена Grafana** — выберите внешнюю или внутреннюю сеть.

    Если выбрана внешняя сеть, установите параметр:

    * **Внешняя сеть** — из выпадающего списка выберите необходимую внешнюю сеть.

    Если выбрана внутренняя сеть, установите параметр:

    * **Подсеть** — из выпадающего списка выберите необходимую подсеть внутренней сети.

  * **Виртуальная машина** — установите зону доступности и тип виртуальной машины.
  * **Системный диск** — установите тип и размер системного диска.
  * **Диск с данными** — установите тип и размер диска для хранения данных Grafana.

  * **Включить отправку метрик в Мониторинг {var(cloud)}** — установите переключатель в активное положение, чтобы отправлять метрики для мониторинга инстанса Grafana в сервис Cloud Monitoring {var(cloud)}.
  * **Добавить источники данных Мониторинга {var(cloud)}** — установите переключатель в активное положение, чтобы автоматически настроить в Grafana интеграцию с сервисом Cloud Monitoring {var(cloud)} для чтения метрик.

  * **Настроить HTTPS** — установите переключатель в активное положение и введите доменное имя, сертификат и ключ. Инстанс Grafana будет настроен для доступа по указанному доменному имени по HTTPS. После окончания установки назначенный IP-адрес будет указан в письме или в настройках виртуальной машины. Для завершения настройки создайте DNS-запись для указанного доменного имени, используя полученный IP-адрес.

    {note:info}
    Если оставить переключатель в неактивном положении — сервис Grafana будет доступен по IP-адресу виртуальной машины.
    {linkto(#monitoring-grafana-https)[text=Настроить]} HTTPS можно вручную после установки сервиса.
    {/note}

<!--- В релизах до 4.3 включительно не предусмотрено резервное копирование. Этот раздел должен вернуться, когда это будет реализовано в Платформе
   * **Резервное копирование в S3** — установите переключатель в активное положение и настройте параметры хранилища S3 Cloud Storage:

     * **API Endpoint** — входная точка в сервис S3, по умолчанию задан URL {var(cloud)}.
     * **Название bucket-а** — имя бакета в объектном хранилище куда будут загружаться резервные копии.
     * **Префикс (подпапка)** — имя, которое будет добавлено к загруженным резервным копиям. Рекомендуется использовать, если в бакете хранятся и другие данные.
     * **Access Кey** и **Secret Key** — ключи доступа до бакета в сервисе S3.
     * **Шифрование объектов на стороне S3** — необходимо задать в соответствии с настройками сервиса S3, который будет использоваться.

     {note:info}
     Запустить резервное копирование можно вручную после установки сервиса (подробнее — в разделе {linkto(#monitoring-grafana-backup)[text=Резервное копирование]})
     {/note}
-->

1. Перейдите в консоль Grafana по ссылке `grafana_url` из письма.

1. Нажмите кнопку **Sign in**.

1. В появившемся окне введите логин `admin` и пароль из письма.

1. Укажите новый пароль.

1. Создайте дашборд Grafana. Подробнее — в [официальной документации](https://grafana.com/docs/grafana/v10.0/getting-started/build-first-dashboard/).

## {heading(Настройка HTTPS вручную для сервиса Grafana)[id=monitoring-grafana-https]}

Чтобы настроить HTTPS для Grafana, выполните следующие шаги:

1. Установите Grafana.
1. Скопируйте файлы сертификата и ключа на виртуальную машину. Переместите их в директорию `/data`, чтобы они сохранились при пересоздании виртуальной машины. Пример:
  * Сертификат — `/data/manual_certs/grafana.crt`.
  * Ключ — `/data/manual_certs/grafana.key`.
1. Задайте права файлам:

   ```console
   chmod 644 /data/manual_certs/grafana.crt
   chmod 600 /data/manual_certs/grafana.key
   ```
1. Укажите путь к сертификатам в конфигурации Grafana. Для этого откройте файл `/data/grafana/grafana.ini` и добавьте или измените следующие строки:

   ```ini
   # https certs & key file
   cert_file = /data/manual_certs/grafana.crt
   cert_key = /data/manual_certs/grafana.key
   ```
1. Настройте HTTPS и доменное имя. Для этого в файле `/data/grafana/grafana.ini` внесите изменения в раздел `[server]`:

   ```ini
   [server]
   # Protocol (http, https, h2, socket)
   protocol = https  # <= Установите значение "https"
   
   # The ip address to bind to, empty will bind to all interfaces
   ;http_addr =

   # The http port  to use
   http_port = 443  # <= Установите значение "443"

   # The public facing domain name used to access grafana from a browser
   domain = grafana.my.org  # <= Укажите доменное имя

   # Redirect to correct domain if host header does not match domain
   # Prevents DNS rebinding attacks
   enforce_domain = true

   # The full public facing url you use in browser, used for redirects and emails
   # If you use reverse proxy and sub path specify full url (with sub path)
   root_url = https://grafana.my.org  # <= Укажите полный URL
   ```

1. Перезапустите Grafana для применения изменений с помощью команды `systemctl`:

   ```console
   sudo systemctl restart grafana
   ```
   После перезапуска убедитесь, что Grafana успешно запущена:

   ```console
   sudo systemctl status grafana
   ```

<!--- В релизах до 4.3 включительно не предусмотрено резервное копирование. Этот раздел должен вернуться, когда это будет реализовано в Платформе
## {heading(Резервное копирование)[id=monitoring-grafana-backup]}

Резервное копирование опционально. Если включено, то резервное копирование выполняется раз в сутки в `00:00` по времени виртуальной машины. Настроить время резервного копирования можно в файле: `/etc/systemd/system/backup.timer`. Чтобы применить изменения, перезагрузите `systemd` с помощью команды `systemctl daemon-reload`.

Резервное копирование будет производиться автоматически в соответствии с параметром `backup.timer`. Сохраняется целиком папка `/data/grafana`, которая архивируется и загружается на S3.

Чтобы запустить резервное копирование вручную:

1. На виртуальной машине выполните команду:

   ```bash
   # systemctl start backup.service
   ```
1. Проверьте логи выполнения в журнале событий системы с помощью команды:
   
   ```bash
   # journalctl -u backup
   ```
### {heading(Просмотр доступных резервных копий)[id=monitoring-grafana-backup-list]}

Чтобы посмотреть доступные для восстановления резервные копии, запустите скрипт `/opt/backup_list.sh` от имени администратора `root`. 

{caption(Пример вывода скрипта)[align=left;position=above]}

```console
ok: [localhost] => {
    "msg": [
        "grafana/2024-02-13-00-00-30/2024-02-13-00-00-30.tar.gz (Size: 74.66 MB)",
        "grafana/2024-02-14-00-00-30/2024-02-14-00-00-30.tar.gz (Size: 75.11 MB)",
        "grafana/2024-02-15-00-00-31/2024-02-15-00-00-31.tar.gz (Size: 81.33 MB)"
    ]
}
```
{/caption}

### {heading(Восстановление из резервной копии)[id=monitoring-grafana-backup-recovery]}

Чтобы восстановить Grafana из резервной копии, запустите скрипт `/opt/backup_restore.sh` с параметром в виде имени резервной копии. Пример: `/opt/backup_restore.sh grafana/2024-02-14-00-00-30/2024-02-14-00-00-30.tar.gz`. Имя необходимо указать с префиксом.

-->

{/ifdef}
