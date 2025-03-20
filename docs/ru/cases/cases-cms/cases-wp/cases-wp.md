[WordPress](https://wordpress.org) ― система управления контентом (CMS), написанная на PHP и использующая базу данных MySQL. Позволяет создавать блоги, сайты или веб-приложения.

Данная инструкция поможет развернуть CMS WordPress последней версии в операционной системе Almalinux 9 в VK Cloud, а также настроить DNS-запись для доступа по доменному имени. В качестве СУБД используется MySQL 8.0 конфигурации Single.

## Подготовительные шаги

1. [Зарегистрируйтесь](/ru/intro/start/account-registration) в VK Cloud.
1. [Создайте](/ru/networks/vnet/service-management/net#sozdanie_seti) сеть `network1` с доступом в интернет и подсетью `10.0.0.0/24`.
1. [Создайте ВМ](/ru/computing/iaas/service-management/vm/vm-create):

   - имя: `Almalinux_9_WP`;
   - операционная система: Almalinux 9;
   - сеть: `network1` с подсетью `10.0.0.0/24`;
   - назначьте публичный IP-адрес. В примере будет использоваться `212.233.95.135`;
   - группы безопасности: `default`, `ssh+www`.

1. [Создайте инстанс БД](/ru/dbs/dbaas/service-management/create/create-single-replica):

   - имя: `MySQL-9341`;
   - СУБД: MySQL 8.0;
   - тип конфигурации: Single;
   - сеть: `network1`;
   - название БД: `wordpress-db`;
   - имя пользователя БД: `wordpress`;
   - пароль пользователя: `AN0r25e0ae4d626p`;

   В примере внутренний IP созданного инстанса: `10.0.0.7`.

1. [Создайте](/ru/networks/dns/publicdns#sozdanie_dns_zony) DNS-зону.

   <warn>

   Убедитесь, что DNS-зона делегирована успешно и NS-записи настроены верно: зона должна находиться в статусе **NS-записи настроены верно**.

   </warn>

1. [Создайте](/ru/networks/dns/publicdns#dobavlenie_resursnyh_zapisey) запись в выделенной зоне:

   - тип записи: `A`;
   - имя: например, `site-wp.example.vk.cloud`;
   - IP-адрес: внешний адрес ВМ `212.233.95.135`.

1. (Опционально) Проверьте резолвинг имени в IP-адрес с помощью команды `nslookup site-wp.example.vk.cloud`. Вывод при успешной операции:

   ```bash
   Non-authoritative answer:
   Name:   site-wp.example.vk.cloud
   Address: 212.233.95.135
   ```

## 1. Установите WordPress на ВМ

1. [Подключитесь](/ru/computing/iaas/service-management/vm/vm-connect/vm-connect-nix) к ВМ `Almalinux_9_WP`.
1. Обновите пакеты до актуальной версии и перезагрузите ВМ с помощью команд:

   ```bash
   sudo dnf update -y
   sudo systemctl reboot
   ```

1. Загрузите необходимые репозитории, последовательно выполнив команды:

   ```bash
   sudo dnf install https://dl.fedoraproject.org/pub/epel/epel-release-latest-9.noarch.rpm -y
   sudo dnf install https://rpms.remirepo.net/enterprise/remi-release-9.rpm -y
   sudo dnf module enable php:remi-8.2 -y
   sudo dnf install wget httpd php php-mysqlnd php-gd php-intl php-bcmath php-pecl-zip -y
   ```

1. Запустите httpd-демон:

   ```bash
   sudo systemctl enable httpd.service --now
   ```

1. Скачайте репозиторий CMS WordPress и разверните его на запущенном веб-сервере:

   ```bash
   sudo wget https://wordpress.org/latest.tar.gz
   sudo tar xzf latest.tar.gz -C /var/www/html/
   sudo chown -R apache:apache /var/www/html/wordpress/
   ```

1. Установите параметры SELinux для корректной работы веб-сервера:

   ```bash
   sudo setsebool -P httpd_can_network_connect on
   sudo setsebool -P httpd_unified on
   sudo setsebool -P httpd_enable_cgi on
   sudo setsebool -P httpd_builtin_scripting on
   ```

1. В браузере введите публичный IP-адрес ВМ с `/wordpress`. В текущей инструкции это `site-wp.example.vk.cloud/wordpress`.
1. В мастере установки укажите английский язык и ознакомьтесь с информацией об установке CMS.
1. Укажите параметры `MySQL-9341`:

   - **Database name**: `wordpress-db`.
   - **Username**: `wordpress`.
   - **Password**: `AN0r25e0ae4d626p`.
   - **Database Host**: `10.0.0.7`.
   - **Table Prefix**: `wp_`

1. Укажите учетные данные CMS:

   - **Site Title**: `site-wp.example.vk.cloud`.
   - **Username**: `admin`.
   - **Password**: придумайте пароль администратора.
   - **Your Email**: укажите email администратора CMS.

1. Нажмите кнопку **Install WordPress**.

## 2. Проверьте работоспособность WordPress

1. В браузере перейдите по адресу `http://site-wp.example.vk.cloud/wordpress/`.
1. В окне авторизации введите логин и пароль администратора CMS.

Откроется панель администратора CMS WordPress.

## Удалите неиспользуемые ресурсы

Развернутые виртуальные ресурсы тарифицируются. Если они вам больше не нужны:

- [Удалите](/ru/computing/iaas/service-management/vm/vm-manage#delete_vm) ВМ `Almalinux_9_WP`.
- [Удалите](/ru/dbs/dbaas/service-management/manage-instance/mysql#udalenie_instansa_bd_ili_ego_hostov) инстанс БД `MySQL-9341`.
- При необходимости [удалите](/ru/networks/vnet/service-management/floating-ip#udalenie_plavayushchego_ip_adresa_iz_proekta) плавающий IP-адрес `212.233.95.135`.
- [Удалите](/ru/networks/dns/publicdns#udalenie_resursnyh_zapisey) созданную DNS-запись `site-wp.example.vk.cloud`.
