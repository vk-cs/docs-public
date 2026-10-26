#!/usr/bin/perl
use utf8;
use Encode qw(decode encode);

my $infile = $ARGV[0] // 'docs/ru/_includes/_iam_permissions.md';
my $outfile = $ARGV[1] // 'docs/en/_includes/_iam_permissions.md';

open my $in, '<:utf8', $infile or die "Cannot open $infile: $!";
my $raw = do { local $/; <$in> };
close $in;
$raw =~ s/\r\n/\n/g;
my @lines = split(/\n/, $raw, -1);

my @out;
for my $line (@lines) {
    $line =~ s/\r+\z//;

    if ($line =~ /^Название в личном кабинете: `(.+)`\.$/) {
        push @out, "Name in management console: `" . name_trans($1) . "`.";
    }
    elsif ($line =~ /^Позволяет\s+(.+)\.$/) {
        push @out, "Allows " . allow_trans($1);
    }
    elsif ($line =~ /^Позволяют\s+(.+)\.$/) {
        push @out, "Allows " . allow_trans($1);
    }
    elsif ($line eq 'Для подключения используются имя пользователя БД и его пароль.') {
        push @out, 'The database username and password are used to connect.';
    }
    elsif ($line eq 'Роль предоставляет разрешения на просмотр записей в менеджере секретов.') {
        push @out, 'The role provides permissions to view records in the secrets manager.';
    }
    elsif ($line eq 'Роль предоставляет разрешения на создание и изменение записей в менеджере секретов.') {
        push @out, 'The role provides permissions to create and modify records in the secrets manager.';
    }
    else {
        push @out, $line;
    }
}

open my $out, '>:utf8', $outfile or die "Cannot open $outfile: $!";
print $out join("\n", @out, "");
close $out;
print "Done: " . scalar(@out) . " lines\n";

# --- Allow rules: complete phrase translations ---
# Sorted longest-first for greedy matching.
# Input is lowercase verbs after "Позволяет" so rules include both cases.
my @allow_rules = (
    # === Exact full-sentence translations ===
    ['получать доступ к консоли сервера.', 'accessing the server console.'],
    ['получать список флейворов.', 'getting the flavor list.'],
    ['просматривать информацию о флейворе.', 'viewing flavor information.'],
    ['получать список образов.', 'getting the image list.'],
    ['просматривать информацию об образе.', 'viewing image information.'],
    ['устанавливать приоритет загрузки сервера.', 'setting the server boot order.'],
    ['возвращать сервер.', 'returning a server.'],
    ['выполнять действия с устройствами сервера.', 'performing actions with server devices.'],
    ['получать список устройств сервера.', 'getting the server device list.'],
    ['просматривать информацию об устройстве на сервере.', 'viewing server device information.'],
    ['получать список серверов.', 'getting the server list.'],
    ['блокировать сервер.', 'locking a server.'],
    ['вызывать функции управления питанием сервера.', 'calling server power management functions.'],
    ['переустанавливать операционную систему на сервере.', 'reinstalling the operating system on the server.'],
    ['арендовать серверы.', 'renting servers.'],
    ['разблокировать сервер.', 'unlocking a server.'],
    ['обновлять свойства сервера, включая переименование.', 'updating server properties, including renaming.'],
    ['просматривать информацию о сервере.', 'viewing server information.'],

    # === Cloud Kafka exact ===
    ['масштабировать инстанс сервиса Cloud Kafka вертикально или горизонтально. разрешено любое изменение количества CPU/RAM.', 'scaling the Cloud Kafka service instance vertically or horizontally. Any changes to CPU/RAM count are allowed.'],
    ['просматривать события инстанса Cloud Kafka.', 'viewing Cloud Kafka instance events.'],
    ['просматривать список инстансов сервиса Cloud Kafka.', 'viewing the Cloud Kafka service instance list.'],
    ['просматривать события в инстансе сервиса Cloud Kafka.', 'viewing events in the Cloud Kafka service instance.'],
    ['увеличивать объем диска в инстансе сервисе Cloud Kafka.', 'increasing the disk volume in a Cloud Kafka service instance.'],
    ['просматривать список пользователей сервиса Cloud Kafka.', 'viewing the Cloud Kafka service user list.'],
    ['просматривать свойства инстансов сервиса Cloud Kafka.', 'viewing Cloud Kafka service instance properties.'],
    ['изменять название или описание Kafka (legacy).', 'modifying the name or description of Kafka (legacy).'],
    ['просматривать историю изменений настроек Kafka.', 'viewing the change history of Kafka settings.'],
    ['просматривать настройки продукта Kafka.', 'viewing the Kafka product settings.'],
    ['редактировать и сбрасывать настройки Kafka.', 'modifying and resetting Kafka settings.'],
    ['просматривать показатели мониторинга Kafka.', 'viewing Kafka monitoring metrics.'],
    ['получить список mirror-подключений Kafka.', 'getting the list of Kafka mirror connections.'],
    ['удалить mirror-подключение Kafka.', 'deleting a Kafka mirror connection.'],
    ['создать новое mirror-подключение Kafka.', 'creating a new Kafka mirror connection.'],

    # === NiFi exact ===
    ['просматривать историю изменения настроек NiFi.', 'viewing the change history of NiFi settings.'],
    ['просматривать список подключений NiFi.', 'viewing the NiFi connection list.'],
    ['удалять подключения NiFi.', 'deleting NiFi connections.'],
    ['обновлять подключения NiFi.', 'updating NiFi connections.'],
    ['просматривать историю изменения настроек подключений NiFi.', 'viewing the change history of NiFi connection settings.'],
    ['просматривать историю изменения расширений NiFi.', 'viewing the change history of NiFi extensions.'],
    ['просматривать события инстанса NiFi.', 'viewing NiFi instance events.'],
    ['создавать инстансы NiFi.', 'creating NiFi instances.'],
    ['удалять инстансы NiFi.', 'deleting NiFi instances.'],
    ['просматривать список инстансов NiFi.', 'viewing the NiFi instance list.'],
    ['перезагружать инстансы NiFi.', 'rebooting NiFi instances.'],
    ['увеличивать размер диска инстанса NiFi.', 'increasing the disk size of a NiFi instance.'],
    ['просматривать свойства инстансов NiFi.', 'viewing NiFi instance properties.'],
    ['просматривать историю изменения экземпляра NiFi.', 'viewing the change history of a NiFi instance.'],
    ['просматривать журналы событий NiFi.', 'viewing NiFi event logs.'],
    ['просматривать показатели мониторинга NiFi.', 'viewing NiFi monitoring metrics.'],
    ['просматривать историю изменения учетных записей NiFi.', 'viewing the change history of NiFi accounts.'],
    ['управлять горизонтальным или вертикальным масштабированием инстансов NiFi. разрешено любое изменение количества CPU/RAM.', 'managing horizontal or vertical scaling of NiFi instances. Any changes to CPU/RAM count are allowed.'],
    ['изменять настройки обслуживания инстанса NiFi: время резервного копирования, расписание операций и т.п.', 'modifying the NiFi instance maintenance settings: backup time, operation schedule, etc.'],

    # === OpenSearch ===
    ['просматривать настройки обслуживания инстанса OpenSearch: расписание резервного копирования, расписание операций и т.п.', 'viewing the OpenSearch instance maintenance settings: backup schedule, operation schedule, etc.'],

    # === Cloud Airflow ===
    ['устанавливать подключения Cloud Airflow.', 'installing Cloud Airflow connections.'],
    ['просматривать список подключений Cloud Airflow.', 'viewing the Cloud Airflow connection list.'],
    ['удалять подключения Cloud Airflow.', 'deleting Cloud Airflow connections.'],
    ['обновлять подключения Cloud Airflow.', 'updating Cloud Airflow connections.'],
    ['просматривать историю изменения настроек подключений Cloud Airflow.', 'viewing the change history of Cloud Airflow connection settings.'],
    ['просматривать историю изменения расширений Cloud Airflow.', 'viewing the change history of Cloud Airflow extensions.'],
    ['управлять масштабированием инстансов Cloud Airflow.', 'managing scaling of Cloud Airflow instances.'],
    ['создавать инстансы Cloud Airflow.', 'creating Cloud Airflow instances.'],
    ['удалять инстансы Cloud Airflow.', 'deleting Cloud Airflow instances.'],
    ['просматривать список инстансов Cloud Airflow.', 'viewing the Cloud Airflow instance list.'],
    ['управлять настройками обслуживания инстансов Cloud Airflow.', 'managing maintenance settings of Cloud Airflow instances.'],
    ['перезагружать инстансы Cloud Airflow.', 'rebooting Cloud Airflow instances.'],
    ['увеличивать размер диска инстансов Cloud Airflow.', 'increasing the disk size of Cloud Airflow instances.'],
    ['просматривать свойства инстанса Cloud Airflow.', 'viewing Cloud Airflow instance properties.'],
    ['просматривать историю изменения экземпляра Cloud Airflow.', 'viewing the change history of a Cloud Airflow instance.'],
    ['просматривать журналы событий инстанса Cloud Airflow.', 'viewing Cloud Airflow instance event logs.'],
    ['просматривать показатели мониторинга Cloud Airflow.', 'viewing Cloud Airflow monitoring metrics.'],
    ['просматривать историю изменения учетных записей Cloud Airflow.', 'viewing the change history of Cloud Airflow accounts.'],

    # === Cloud Flink ===
    ['управлять масштабированием инстансов Cloud Flink.', 'managing scaling of Cloud Flink instances.'],
    ['создавать инстансы Cloud Flink.', 'creating Cloud Flink instances.'],
    ['удалять инстансы Cloud Flink.', 'deleting Cloud Flink instances.'],
    ['просматривать список инстансов Cloud Flink.', 'viewing the Cloud Flink instance list.'],
    ['управлять настройками обслуживания инстансов Cloud Flink.', 'managing maintenance settings of Cloud Flink instances.'],
    ['перезагружать инстансы Cloud Flink.', 'rebooting Cloud Flink instances.'],
    ['увеличивать размер диска инстансов Cloud Flink.', 'increasing the disk size of Cloud Flink instances.'],
    ['просматривать свойства инстанса Cloud Flink.', 'viewing Cloud Flink instance properties.'],
    ['просматривать историю изменения экземпляра Cloud Flink.', 'viewing the change history of a Cloud Flink instance.'],
    ['просматривать журналы событий инстанса Cloud Flink.', 'viewing Cloud Flink instance event logs.'],
    ['просматривать показатели мониторинга Cloud Flink.', 'viewing Cloud Flink monitoring metrics.'],
    ['управлять настройками продукта Cloud Flink.', 'managing Cloud Flink product settings.'],
    ['просматривать настройки продукта Cloud Flink.', 'viewing Cloud Flink product settings.'],
    ['просматривать историю изменения настроек Cloud Flink.', 'viewing the change history of Cloud Flink settings.'],
    ['добавлять пользователей Cloud Flink.', 'adding Cloud Flink users.'],
    ['удалять пользователей Cloud Flink.', 'deleting Cloud Flink users.'],
    ['просматривать список пользователей Cloud Flink.', 'viewing the Cloud Flink user list.'],
    ['изменять данные пользователей Cloud Flink.', 'modifying Cloud Flink user data.'],
    ['просматривать историю изменений учетных записей Cloud Flink.', 'viewing the change history of Cloud Flink accounts.'],
    ['просматривать историю изменений резервных копий Cloud Flink.', 'viewing the change history of Cloud Flink backups.'],

    # === Iceberg Metastore ===
    ['управлять масштабированием инстансов Iceberg Metastore.', 'managing scaling of Iceberg Metastore instances.'],
    ['создавать инстансы Iceberg Metastore.', 'creating Iceberg Metastore instances.'],
    ['удалять инстансы Iceberg Metastore.', 'deleting Iceberg Metastore instances.'],
    ['просматривать список инстансов Iceberg Metastore.', 'viewing the Iceberg Metastore instance list.'],
    ['управлять настройками обслуживания инстансов Iceberg Metastore.', 'managing maintenance settings of Iceberg Metastore instances.'],
    ['перезагружать инстансы Iceberg Metastore.', 'rebooting Iceberg Metastore instances.'],
    ['увеличивать размер диска инстансов Iceberg Metastore.', 'increasing the disk size of Iceberg Metastore instances.'],
    ['просматривать свойства инстанса Iceberg Metastore.', 'viewing Iceberg Metastore instance properties.'],
    ['просматривать историю изменения экземпляра Iceberg Metastore.', 'viewing the change history of an Iceberg Metastore instance.'],
    ['просматривать журналы событий инстанса Iceberg Metastore.', 'viewing Iceberg Metastore instance event logs.'],
    ['просматривать показатели мониторинга Iceberg Metastore.', 'viewing Iceberg Metastore monitoring metrics.'],
    ['управлять настройками продукта Iceberg Metastore.', 'managing Iceberg Metastore product settings.'],
    ['просматривать настройки продукта Iceberg Metastore.', 'viewing Iceberg Metastore product settings.'],
    ['просматривать историю изменений Iceberg Metastore.', 'viewing the change history of Iceberg Metastore.'],
    ['добавлять пользователей Iceberg Metastore.', 'adding Iceberg Metastore users.'],
    ['удалять пользователей Iceberg Metastore.', 'deleting Iceberg Metastore users.'],
    ['просматривать список пользователей Iceberg Metastore.', 'viewing the Iceberg Metastore user list.'],
    ['изменять данные пользователей Iceberg Metastore.', 'modifying Iceberg Metastore user data.'],
    ['просматривать историю изменений учетных записей Iceberg Metastore.', 'viewing the change history of Iceberg Metastore accounts.'],

    # === JupyterHub ===
    ['управлять масштабированием инстансов JupyterHub.', 'managing scaling of JupyterHub instances.'],
    ['создавать инстансы JupyterHub.', 'creating JupyterHub instances.'],
    ['удалять инстансы JupyterHub.', 'deleting JupyterHub instances.'],
    ['просматривать список инстансов JupyterHub.', 'viewing the JupyterHub instance list.'],
    ['управлять настройками обслуживания инстансов JupyterHub.', 'managing maintenance settings of JupyterHub instances.'],
    ['перезагружать инстансы JupyterHub.', 'rebooting JupyterHub instances.'],
    ['увеличивать размер диска инстансов JupyterHub.', 'increasing the disk size of JupyterHub instances.'],
    ['просматривать свойства инстанса JupyterHub.', 'viewing JupyterHub instance properties.'],
    ['просматривать историю изменения экземпляра JupyterHub.', 'viewing the change history of a JupyterHub instance.'],
    ['просматривать журналы событий инстанса JupyterHub.', 'viewing JupyterHub instance event logs.'],
    ['просматривать показатели мониторинга JupyterHub.', 'viewing JupyterHub monitoring metrics.'],
    ['управлять настройками продукта JupyterHub.', 'managing JupyterHub product settings.'],
    ['просматривать настройки продукта JupyterHub.', 'viewing JupyterHub product settings.'],
    ['просматривать историю изменений JupyterHub.', 'viewing the change history of JupyterHub.'],
    ['добавлять пользователей JupyterHub.', 'adding JupyterHub users.'],
    ['удалять пользователей JupyterHub.', 'deleting JupyterHub users.'],
    ['просматривать список пользователей JupyterHub.', 'viewing the JupyterHub user list.'],
    ['изменять данные пользователей JupyterHub.', 'modifying JupyterHub user data.'],
    ['просматривать историю изменений учетных записей JupyterHub.', 'viewing the change history of JupyterHub accounts.'],

    # === Cloud Kafka ===
    ['управлять масштабированием инстансов Cloud Kafka.', 'managing scaling of Cloud Kafka instances.'],
    ['создавать инстансы Cloud Kafka.', 'creating Cloud Kafka instances.'],
    ['удалять инстансы Cloud Kafka.', 'deleting Cloud Kafka instances.'],
    ['просматривать список инстансов Cloud Kafka.', 'viewing the Cloud Kafka instance list.'],
    ['управлять настройками обслуживания инстансов Cloud Kafka.', 'managing maintenance settings of Cloud Kafka instances.'],
    ['перезагружать инстансы Cloud Kafka.', 'rebooting Cloud Kafka instances.'],
    ['увеличивать размер диска инстансов Cloud Kafka.', 'increasing the disk size of Cloud Kafka instances.'],
    ['просматривать свойства инстанса Cloud Kafka.', 'viewing Cloud Kafka instance properties.'],
    ['просматривать историю изменения экземпляра Cloud Kafka.', 'viewing the change history of a Cloud Kafka instance.'],
    ['просматривать журналы событий инстанса Cloud Kafka.', 'viewing Cloud Kafka instance event logs.'],
    ['просматривать показатели мониторинга Cloud Kafka.', 'viewing Cloud Kafka monitoring metrics.'],
    ['управлять настройками продукта Cloud Kafka.', 'managing Cloud Kafka product settings.'],
    ['просматривать настройки продукта Cloud Kafka.', 'viewing Cloud Kafka product settings.'],
    ['просматривать историю изменений Cloud Kafka.', 'viewing the change history of Cloud Kafka.'],
    ['добавлять пользователей Cloud Kafka.', 'adding Cloud Kafka users.'],
    ['удалять пользователей Cloud Kafka.', 'deleting Cloud Kafka users.'],
    ['просматривать список пользователей Cloud Kafka.', 'viewing the Cloud Kafka user list.'],
    ['изменять данные пользователей Cloud Kafka.', 'modifying Cloud Kafka user data.'],
    ['просматривать историю изменений учетных записей Cloud Kafka.', 'viewing the change history of Cloud Kafka accounts.'],

    # === Lakekeeper ===
    ['просматривать историю изменений резервных копий Lakekeeper.', 'viewing the change history of Lakekeeper backups.'],
    ['просматривать список подключений Lakekeeper.', 'viewing the Lakekeeper connection list.'],
    ['удалять подключения Lakekeeper.', 'deleting Lakekeeper connections.'],
    ['обновлять подключения Lakekeeper.', 'updating Lakekeeper connections.'],
    ['просматривать историю изменений настроек подключений Lakekeeper.', 'viewing the change history of Lakekeeper connection settings.'],
    ['просматривать историю изменений расширений Lakekeeper.', 'viewing the change history of Lakekeeper extensions.'],
    ['управлять масштабированием инстансов Lakekeeper.', 'managing scaling of Lakekeeper instances.'],
    ['создавать инстансы Lakekeeper.', 'creating Lakekeeper instances.'],
    ['удалять инстансы Lakekeeper.', 'deleting Lakekeeper instances.'],
    ['просматривать список инстансов Lakekeeper.', 'viewing the Lakekeeper instance list.'],
    ['управлять настройками обслуживания инстансов Lakekeeper.', 'managing maintenance settings of Lakekeeper instances.'],
    ['перезагружать инстансы Lakekeeper.', 'rebooting Lakekeeper instances.'],
    ['увеличивать размер диска инстансов Lakekeeper.', 'increasing the disk size of Lakekeeper instances.'],
    ['просматривать свойства инстанса Lakekeeper.', 'viewing Lakekeeper instance properties.'],
    ['просматривать историю изменения экземпляра Lakekeeper.', 'viewing the change history of a Lakekeeper instance.'],
    ['просматривать журналы событий инстанса Lakekeeper.', 'viewing Lakekeeper instance event logs.'],
    ['просматривать показатели мониторинга Lakekeeper.', 'viewing Lakekeeper monitoring metrics.'],
    ['просматривать пользовательские роли Lakekeeper.', 'viewing Lakekeeper custom roles.'],
    ['управлять настройками продукта Lakekeeper.', 'managing Lakekeeper product settings.'],
    ['просматривать настройки продукта Lakekeeper.', 'viewing Lakekeeper product settings.'],
    ['просматривать историю изменений Lakekeeper.', 'viewing the change history of Lakekeeper.'],
    ['просматривать историю изменений учетных записей Lakekeeper.', 'viewing the change history of Lakekeeper accounts.'],

    # === MLflow ===
    ['просматривать историю изменений резервных копий MLflow.', 'viewing the change history of MLflow backups.'],
    ['просматривать список подключений MLflow.', 'viewing the MLflow connection list.'],
    ['удалять подключения MLflow.', 'deleting MLflow connections.'],
    ['обновлять подключения MLflow.', 'updating MLflow connections.'],
    ['просматривать историю изменений настроек подключений MLflow.', 'viewing the change history of MLflow connection settings.'],
    ['просматривать историю изменений расширений MLflow.', 'viewing the change history of MLflow extensions.'],
    ['управлять масштабированием инстансов MLflow.', 'managing scaling of MLflow instances.'],
    ['создавать инстансы MLflow.', 'creating MLflow instances.'],
    ['удалять инстансы MLflow.', 'deleting MLflow instances.'],
    ['просматривать список инстансов MLflow.', 'viewing the MLflow instance list.'],
    ['управлять настройками обслуживания инстансов MLflow.', 'managing maintenance settings of MLflow instances.'],
    ['перезагружать инстансы MLflow.', 'rebooting MLflow instances.'],
    ['увеличивать размер диска инстансов MLflow.', 'increasing the disk size of MLflow instances.'],
    ['просматривать свойства инстанса MLflow.', 'viewing MLflow instance properties.'],
    ['просматривать историю изменения экземпляра MLflow.', 'viewing the change history of an MLflow instance.'],
    ['просматривать журналы событий инстанса MLflow.', 'viewing MLflow instance event logs.'],
    ['просматривать показатели мониторинга MLflow.', 'viewing MLflow monitoring metrics.'],
    ['управлять настройками продукта MLflow.', 'managing MLflow product settings.'],
    ['просматривать настройки продукта MLflow.', 'viewing MLflow product settings.'],
    ['просматривать историю изменений MLflow.', 'viewing the change history of MLflow.'],
    ['добавлять пользователей MLflow.', 'adding MLflow users.'],
    ['удалять пользователей MLflow.', 'deleting MLflow users.'],
    ['просматривать список пользователей MLflow.', 'viewing the MLflow user list.'],
    ['изменять данные пользователей MLflow.', 'modifying MLflow user data.'],
    ['просматривать историю изменений учетных записей MLflow.', 'viewing the change history of MLflow accounts.'],

    # === Cloud PostgreSQL ===
    ['управлять масштабированием инстансов Cloud PostgreSQL.', 'managing scaling of Cloud PostgreSQL instances.'],
    ['создавать инстансы Cloud PostgreSQL.', 'creating Cloud PostgreSQL instances.'],
    ['удалять инстансы Cloud PostgreSQL.', 'deleting Cloud PostgreSQL instances.'],
    ['просматривать список инстансов Cloud PostgreSQL.', 'viewing the Cloud PostgreSQL instance list.'],
    ['управлять настройками обслуживания инстансов Cloud PostgreSQL.', 'managing maintenance settings of Cloud PostgreSQL instances.'],
    ['перезагружать инстансы Cloud PostgreSQL.', 'rebooting Cloud PostgreSQL instances.'],
    ['увеличивать размер диска инстансов Cloud PostgreSQL.', 'increasing the disk size of Cloud PostgreSQL instances.'],
    ['просматривать свойства инстанса Cloud PostgreSQL.', 'viewing Cloud PostgreSQL instance properties.'],
    ['просматривать историю изменения экземпляра Cloud PostgreSQL.', 'viewing the change history of a Cloud PostgreSQL instance.'],
    ['просматривать журналы событий инстанса Cloud PostgreSQL.', 'viewing Cloud PostgreSQL instance event logs.'],
    ['просматривать показатели мониторинга Cloud PostgreSQL.', 'viewing Cloud PostgreSQL monitoring metrics.'],
    ['управлять настройками продукта Cloud PostgreSQL.', 'managing Cloud PostgreSQL product settings.'],
    ['просматривать настройки продукта Cloud PostgreSQL.', 'viewing Cloud PostgreSQL product settings.'],
    ['просматривать историю изменений Cloud PostgreSQL.', 'viewing the change history of Cloud PostgreSQL.'],
    ['добавлять пользователей Cloud PostgreSQL.', 'adding Cloud PostgreSQL users.'],
    ['удалять пользователей Cloud PostgreSQL.', 'deleting Cloud PostgreSQL users.'],
    ['просматривать список пользователей Cloud PostgreSQL.', 'viewing the Cloud PostgreSQL user list.'],
    ['изменять данные пользователей Cloud PostgreSQL.', 'modifying Cloud PostgreSQL user data.'],
    ['просматривать историю изменений учетных записей Cloud PostgreSQL.', 'viewing the change history of Cloud PostgreSQL accounts.'],

    # === Connection Store ===
    ['управлять каталогом подключений Connection Store.', 'managing the Connection Store connection catalog.'],
    ['добавлять пользователей Connection Store.', 'adding Connection Store users.'],
    ['удалять пользователей Connection Store.', 'deleting Connection Store users.'],
    ['просматривать список пользователей Connection Store.', 'viewing the Connection Store user list.'],
    ['изменять данные пользователей Connection Store.', 'modifying Connection Store user data.'],
    ['изменять имя пользователя и роль.', 'modifying the username and role.'],
    ['создавать подключения к БД.', 'creating database connections.'],

    # === БД (database) operations ===
    ['просматривать список БД.', 'viewing the database list.'],
    ['создавать БД.', 'creating databases.'],
    ['удалять БД.', 'deleting databases.'],
    ['обновлять БД.', 'updating databases.'],

    # === SQL query operations ===
    ['выполнять SQL-запросы к инстансу.', 'executing SQL queries to the instance.'],
    ['отменить запрос к инстансу.', 'terminating a query to the instance.'],
    ['получить список исполняемых запросов к инстансу.', 'getting the list of running queries to the instance.'],

    # === Backup operations ===
    ['запускать резервное копирование.', 'running a backup.'],
    ['скачивать резервную копию.', 'downloading a backup.'],
    ['скачивать резервные копии.', 'downloading backups.'],
    ['восстанавливать инстанс.', 'restoring an instance.'],

    # === Extension operations ===
    ['устанавливать расширения.', 'installing extensions.'],

    # === Partial matches - verb + noun phrases ===
    ['просматривать историю изменения резервных копий ', 'viewing the change history of backups of '],
    ['просматривать историю изменения настроек ', 'viewing the change history of settings of '],
    ['просматривать историю изменений учетных записей ', 'viewing the change history of accounts of '],
    ['просматривать историю изменений прав доступа ', 'viewing the change history of access permissions of '],
    ['просматривать историю изменения расширений ', 'viewing the change history of extensions of '],
    ['просматривать историю изменения экземпляра ', 'viewing the change history of an instance of '],
    ['просматривать историю изменений ', 'viewing the change history of '],
    ['просматривать журналы событий инстанса ', 'viewing event logs of the instance of '],
    ['просматривать журналы событий ', 'viewing event logs of '],
    ['просматривать события инстанса ', 'viewing events of the instance of '],
    ['просматривать события по инстансу ', 'viewing events of the instance of '],
    ['просматривать события ', 'viewing events of '],
    ['просматривать список подключений ', 'viewing the list of connections of '],
    ['просматривать список расширений ', 'viewing the list of extensions of '],
    ['просматривать список пользователей ', 'viewing the list of users of '],
    ['просматривать список инстансов ', 'viewing the list of instances of '],
    ['просматривать список БД ', 'viewing the list of databases of '],
    ['просматривать настройки обслуживания ', 'viewing maintenance settings of '],
    ['просматривать настройки продукта ', 'viewing product settings of '],
    ['просматривать настройки ', 'viewing settings of '],
    ['просматривать свойства инстанса ', 'viewing properties of the instance of '],
    ['просматривать свойства инстансов ', 'viewing properties of the instances of '],
    ['просматривать свойства ', 'viewing properties of '],
    ['просматривать показатели мониторинга ', 'viewing monitoring metrics of '],
    ['просматривать права доступа ', 'viewing access permissions of '],
    ['просматривать пользовательские роли ', 'viewing custom roles of '],
    ['изменять настройки обслуживания ', 'modifying the maintenance settings of '],
    ['изменять настройки ', 'modifying settings of '],
    ['устанавливать подключения ', 'installing connections of '],
    ['удалять подключения ', 'deleting connections of '],
    ['обновлять подключения ', 'updating connections of '],
    ['удалять инстансы ', 'deleting instances of '],
    ['удалять пользователей ', 'deleting users of '],
    ['удалять расширения ', 'deleting extensions of '],
    ['управлять масштабированием ', 'managing scaling of '],
    ['перезагружать инстансы ', 'rebooting instances of '],
    ['увеличивать размер диска ', 'increasing the disk size of '],
    ['увеличивать объем диска ', 'increasing the disk volume of '],
    ['добавлять пользователей ', 'adding users of '],
    ['добавлять роли пользователей ', 'adding user roles of '],
    ['добавлять ', 'adding '],
    ['устанавливать расширения ', 'installing extensions of '],
    ['создавать ', 'creating '],
    ['удалять ', 'deleting '],
    ['обновлять ', 'updating '],
    ['перезагружать ', 'rebooting '],
    ['увеличивать ', 'increasing '],
    ['просматривать ', 'viewing '],
    ['масштабировать ', 'scaling '],
    ['устанавливать ', 'installing '],
    ['возвращать ', 'returning '],
    ['переустанавливать ', 'reinstalling '],
    ['вызывать ', 'calling '],
    ['выполнять ', 'performing '],
    ['блокировать ', 'locking '],
    ['разблокировать ', 'unlocking '],
    ['арендовать ', 'renting '],
    ['устанавливать приоритет ', 'setting priority '],
    ['выполнять действия с ', 'performing actions with '],
    ['изменять данные ', 'modifying data '],
    ['изменять название или описание ', 'modifying the name or description of '],
    ['какого-либо ', 'any '],
    ['разрешено любое ', 'any ... are allowed.'],
);

sub name_trans {
    my ($ru) = @_;
    return $ru unless $ru;

    my %name_exact = (
        'Доступ к консоли сервера' => 'Server console access',
        'Получение списка флейворов' => 'Getting flavor list',
        'Просмотр информации о флейворе' => 'Viewing flavor information',
        'Получение списка образов' => 'Getting image list',
        'Просмотр информации об образе' => 'Viewing image information',
        'Установка приоритета загрузки сервера' => 'Setting server boot order',
        'Возврат сервера' => 'Returning server',
        'Выполнение действий с устройствами сервера' => 'Performing actions with server devices',
        'Получение списка устройств сервера' => 'Getting server device list',
        'Просмотр информации об устройстве на сервере' => 'Viewing server device information',
        'Получение списка серверов' => 'Getting server list',
        'Блокировка сервера' => 'Locking server',
        'Вызов функций управления питанием сервера' => 'Calling server power management functions',
        'Переустановка операционной системы на сервере' => 'Reinstalling operating system on server',
        'Аренда серверов' => 'Renting servers',
        'Разблокировка сервера' => 'Unlocking server',
        'Обновление свойств сервера (вкл. переименование)' => 'Updating server properties (including renaming)',
        'Просмотр информации о сервере' => 'Viewing server information',
    );
    return $name_exact{$ru} if $name_exact{$ru};

    # Name prefix rules (capitalized gerunds)
    my @name_rules = (
        ['Просмотр истории изменений резервных копий ', 'Viewing backup change history '],
        ['Просмотр истории изменений настроек ', 'Viewing settings change history '],
        ['Просмотр истории изменений расширений ', 'Viewing extension change history '],
        ['Просмотр истории изменений учетных записей ', 'Viewing account change history '],
        ['Просмотр истории изменений прав доступа ', 'Viewing access permission change history '],
        ['Просмотр истории изменений экземпляра ', 'Viewing instance change history '],
        ['Просмотр истории изменений ', 'Viewing change history '],
        ['Просмотр логов инстанса ', 'Viewing instance logs '],
        ['Просмотр логов ', 'Viewing logs '],
        ['Просмотр показателей мониторинга ', 'Viewing monitoring metrics '],
        ['Просмотр списка подключений ', 'Viewing connection list '],
        ['Просмотр списка расширений ', 'Viewing extension list '],
        ['Просмотр списка пользователей ', 'Viewing user list '],
        ['Просмотр списка инстансов ', 'Viewing instance list '],
        ['Просмотр списка БД ', 'Viewing database list '],
        ['Просмотр списка ', 'Viewing list '],
        ['Просмотр настроек продукта ', 'Viewing product settings '],
        ['Просмотр настроек ', 'Viewing settings '],
        ['Просмотр свойства инстанса ', 'Viewing instance property '],
        ['Просмотр свойства ', 'Viewing property '],
        ['Просмотр событий по инстансу ', 'Viewing instance events '],
        ['Просмотр событий инстанса ', 'Viewing instance events '],
        ['Просмотр событий ', 'Viewing events '],
        ['Просмотр прав доступа ', 'Viewing access permissions '],
        ['Просмотр пользовательских ролей ', 'Viewing custom roles '],
        ['Управление настройками обслуживания ', 'Managing maintenance settings '],
        ['Управление настройками продукта ', 'Managing product settings '],
        ['Управление настройками ', 'Managing settings '],
        ['Управление каталогом подключений ', 'Managing connection catalog '],
        ['Управление масштабированием ', 'Managing scaling '],
        ['Редактирование названия или описания ', 'Editing name or description '],
        ['Редактирование пользователя ', 'Editing user '],
        ['Редактирование внутреннего IP балансировщика и портов эндпоинтов ', 'Editing load balancer internal IP and endpoint ports '],
        ['Редактирование прав доступа ', 'Editing access permissions '],
        ['Перезагрузка инстанса ', 'Rebooting instance '],
        ['Увеличение диска ', 'Increasing disk size '],
        ['Установка подключений ', 'Installing connections '],
        ['Установка расширения ', 'Installing extension '],
        ['Удаление подключений ', 'Removing connections '],
        ['Удаление инстанса ', 'Deleting instance '],
        ['Удаление пользователя ', 'Deleting user '],
        ['Удаление расширения ', 'Removing extension '],
        ['Удаление БД ', 'Removing database '],
        ['Удаление ', 'Removing '],
        ['Обновление подключений ', 'Updating connections '],
        ['Обновление версии продукта ', 'Updating product version '],
        ['Доступ к UI ', 'Accessing UI '],
        ['Добавление пользователя ', 'Adding user '],
        ['Добавление роли пользователя ', 'Adding user role '],
        ['Создание инстанса ', 'Creating instance '],
        ['Создание новой ', 'Creating new '],
        ['Создание прав доступа ', 'Creating access permissions '],
        ['Создать новое mirror подключение ', 'Creating new mirror connection '],
        ['Список mirror подключений ', 'Mirror connection list '],
    );

    for my $r (@name_rules) {
        my ($from, $to) = @$r;
        if (index($ru, $from) == 0) {
            return $to . word_map(substr($ru, length($from)));
        }
    }
    return word_map($ru);
}

sub allow_trans {
    my ($ru) = @_;
    return $ru unless $ru;

    # Capitalize first letter so lowercase input also matches capitalized rules
    my $match_input = uc(substr($ru, 0, 1)) . substr($ru, 1);

    for my $r (@allow_rules) {
        my ($from, $to) = @$r;
        # Try both lowercase and capitalized match_input
        my $pos = index($match_input, $from);
        if ($pos < 0) {
            my $lower_from = lc($from);
            $pos = index($match_input, $lower_from);
        }
        if ($pos == 0) {
            # Match succeeded — use the English $to, then word-map the remainder from original $ru
            return $to . word_map(substr($ru, length($from)));
        }
    }
    return $ru;
}

sub word_map {
    my ($text) = @_;
    return $text if !$text || $text eq '';

    # Only handle non-empty text with Cyrillic characters
    return $text if $text !~ /[\x{0400}-\x{04FF}]/;

    # Split into words by space, translate each word
    my @words = split(/ /, $text, -1);
    my $result = '';
    for my $i (0 .. $#words) {
        my $w = $words[$i];
        my $translated = _single_word($w);
        $result .= ($i > 0 ? ' ' : '') . $translated;
    }

    return $result;
}

sub _single_word {
    my ($w) = @_;
    return $w if $w =~ /^[a-zA-Z0-9_.\-]+$/ && $w !~ /[\x{0400}-\x{04FF}]/;

    my %dict = (
        'сервера' => 'server',
        'сервер' => 'server',
        'серверу' => 'server',
        'сервере' => 'server',
        'серверы' => 'servers',
        'флейворов' => 'flavors',
        'флейвору' => 'flavor',
        'флейворе' => 'flavor',
        'флейвор' => 'flavor',
        'образов' => 'images',
        'образу' => 'image',
        'образе' => 'image',
        'образ' => 'image',
        'устройства' => 'devices',
        'устройств' => 'devices',
        'устройству' => 'device',
        'устройстве' => 'device',
        'устройство' => 'device',
        'загрузки' => 'boot',
        'приоритета' => 'priority',
        'операционной' => 'operating',
        'системы' => 'system',
        'действий' => 'actions',
        'питанием' => 'power',
        'управления' => 'management',
        'функций' => 'functions',
        'списка' => 'list',
        'зеркал' => 'mirrors',
        'зеркалу' => 'mirror',
        'зеркало' => 'mirror',
        'зеркале' => 'mirror',
        'данных' => 'data',
        'доступа' => 'access',
        'доступ' => 'access',
        'доступом' => 'access',
        'доступу' => 'access',
        'инстанса' => 'instance',
        'инстансы' => 'instances',
        'инстансов' => 'instances',
        'инстансе' => 'instance',
        'инстансу' => 'instance',
        'инстансом' => 'instance',
        'инстансе' => 'instance',
        'инстансы' => 'instances',
        'настройки' => 'settings',
        'настройке' => 'settings',
        'настройках' => 'settings',
        'настройку' => 'settings',
        'настройках' => 'settings',
        'настройку' => 'settings',
        'свойства' => 'properties',
        'свойство' => 'property',
        'свойствах' => 'properties',
        'события' => 'events',
        'событий' => 'events',
        'событиях' => 'events',
        'показатели' => 'metrics',
        'показателей' => 'metrics',
        'показателя' => 'metric',
        'мониторинга' => 'monitoring',
        'создания' => 'creating',
        'изменением' => 'modifying',
        'создание' => 'creating',
        'изменение' => 'change',
        'изменений' => 'changes',
        'прав' => 'access',
        'ролей' => 'roles',
        'роль' => 'role',
        'ролями' => 'roles',
        'ролях' => 'roles',
        'экземпляра' => 'instance',
        'экземпляр' => 'instance',
        'экземпляром' => 'instance',
        'экземпляре' => 'instance',
        'экземпляров' => 'instances',
        'экземплярам' => 'instances',
        'экземпляры' => 'instances',
        'инструмента' => 'tool',
        'инструмент' => 'tool',
        'инструменте' => 'tool',
        'удаление' => 'deleting',
        'обновление' => 'updating',
        'перезагрузка' => 'rebooting',
        'увеличение' => 'increasing',
        'удалить' => 'deleting',
        'обновить' => 'updating',
        'перезагрузить' => 'rebooting',
        'увеличить' => 'increasing',
        'создать' => 'creating',
        'изменить' => 'modifying',
        'просмотр' => 'viewing',
        'получить' => 'getting',
        'установить' => 'installing',
        'управлять' => 'managing',
        'масштабированием' => 'scaling',
        'масштабировать' => 'scaling',
        'объема' => 'volume',
        'объем' => 'volume',
        'диска' => 'disk',
        'диске' => 'disk',
        'диску' => 'disk',
        'диск' => 'disk',
        'дисками' => 'disks',
        'дисков' => 'disks',
        'дисках' => 'disks',
        'размер' => 'size',
        'размере' => 'size',
        'журналы' => 'logs',
        'журналах' => 'logs',
        'журнала' => 'logs',
        'логов' => 'logs',
        'журнал' => 'log',
        'журнале' => 'log',
        'истории' => 'history',
        'историю' => 'history',
        'резервных' => 'backup',
        'резервной' => 'backup',
        'резервные' => 'backup',
        'резервное' => 'backup',
        'резервную' => 'backup',
        'копий' => 'copies',
        'копию' => 'copy',
        'копии' => 'copies',
        'менеджере' => 'manager',
        'секретов' => 'secrets',
        'записей' => 'records',
        'запись' => 'record',
        'записи' => 'records',
        'управление' => 'management',
        'подключений' => 'connections',
        'подключении' => 'connection',
        'подключению' => 'connection',
        'подключение' => 'connection',
        'расширений' => 'extensions',
        'расширении' => 'extension',
        'расширению' => 'extension',
        'расширение' => 'extension',
        'пользователей' => 'users',
        'пользователе' => 'user',
        'пользователю' => 'user',
        'пользователя' => 'user',
        'пользователь' => 'user',
        'названия' => 'name',
        'название' => 'name',
        'описания' => 'description',
        'описание' => 'description',
        'балансировщика' => 'balancer',
        'портов' => 'ports',
        'эндпоинтов' => 'endpoints',
        'паролю' => 'password',
        'пароль' => 'password',
        'имя' => 'name',
        'его' => 'its',
        'отмены' => 'termination',
        'отменить' => 'terminating',
        'запросов' => 'queries',
        'запрос' => 'query',
        'запроса' => 'query',
        'запросу' => 'query',
        'запросе' => 'query',
        'исполняемых' => 'running',
        'выполняемых' => 'executing',
        'скачивать' => 'downloading',
        'скачивание' => 'downloading',
        'скачивания' => 'downloading',
        'восстанавливать' => 'restoring',
        'восстановление' => 'restoring',
        'восстановления' => 'restoring',
        'выполнять' => 'executing',
        'выполнение' => 'execution',
        'выполнения' => 'execution',
        'выполняя' => 'executing',
        'получать' => 'getting',
        'получение' => 'getting',
        'получения' => 'getting',
        'получая' => 'getting',
        'устанавливать' => 'installing',
        'установка' => 'installing',
        'установки' => 'installing',
        'устанавливая' => 'installing',
        'управлять' => 'managing',
        'управление' => 'managing',
        'управления' => 'management',
        'отмена' => 'termination',
        'зеркал' => 'mirrors',
        'зеркалу' => 'mirror',
        'зеркало' => 'mirror',
        'зеркале' => 'mirror',
        'информацию' => 'information',
        'информации' => 'information',
        'информацией' => 'information',
        'консоли' => 'console',
        'консоль' => 'console',
        'консолью' => 'console',
        'вкл.' => '(including)',
        'переименование' => 'renaming',
        'переименовании' => 'renaming',
        'включая' => 'including',
        'любое' => 'any',
        'любых' => 'any',
        'любой' => 'any',
        'время' => 'time',
        'расписание' => 'schedule',
        'операций' => 'operations',
        'резервного' => 'backup',
        'копирования' => 'copying',
        'т.п.' => 'etc.',
        'версии' => 'version',
        'продукта' => 'product',
    );

    return $dict{$w} // $w;
}
