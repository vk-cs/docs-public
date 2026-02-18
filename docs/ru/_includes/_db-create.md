{includetag(not_db_onboarding)}
## Подготовительные шаги

1. Убедитесь, что утилита `psql` установлена. Для этого посмотрите версию утилиты:

   ```console
   psql --version
   ```

   Если утилита установлена, будет выведена ее версия:

   ```text
   psql (PostgreSQL) 14.7
   ```

   Если утилита не установлена, будет выведена информация о том, что команда `psql` не найдена.

1. Если утилита `psql` не установлена, установите ее:

   {tabs}

   {tab(Linux (APT))}

   1. Подключите репозиторий PostgreSQL:

      ```console
      sudo apt install curl ca-certificates gnupg
      curl https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/apt.postgresql.org.gpg > /dev/null
      sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
      sudo apt update
      ```

   1. Установите утилиту `psql`:

      ```console
      sudo apt install -y postgresql-client
      ```

   {/tab}

   {tab(Linux (RPM))}

   1. Подключите репозиторий PostgreSQL:

      1. Заполните опросник на [странице загрузки PostgreSQL для Linux семейства RedHat](https://www.postgresql.org/download/linux/redhat/):

         1. **Select version**: выберите самую актуальную версию.
         1. **Select platform**: выберите дистрибутив операционной системы.
         1. **Select architecture**: выберите архитектуру. Если вы не знаете, какую архитектуру выбрать, выберите `x86_64`.

         Появится текст установочного скрипта.

      1. Скопируйте команду из скрипта под комментарием `Install the repository RPM`. Ее вид зависит от выбранного дистрибутива:

         {tabs}

         {tab(yum)}

         ```console
         sudo yum install -y https://download.postgresql.org/pub/repos/yum/...
         ```

         {/tab}

         {tab(dnf)}

         ```console
         sudo dnf install -y https://download.postgresql.org/pub/repos/yum/...
         ```

         {/tab}

         {/tabs}

      1. Выполните скопированную команду.

      1. Если использовалась команда вида `sudo dnf...`, отключите встроенный модуль PostgreSQL:

         ```console
         sudo dnf -qy module disable postgresql
         ```

   1. Установите утилиту `psql`:

      {tabs}

      {tab(yum)}

      ```console
      sudo yum install -y postgresql
      ```

      {/tab}

      {tab(dnf)}

      ```console
      sudo dnf install -y postgresql
      ```

      {/tab}

      {/tabs}

   {/tab}

   {tab(macOS (Homebrew))}

   1. Установите утилиту `psql`:

      ```zsh
      brew install libpq
      ```

   1. Создайте символические ссылки на исполняемые файлы `libpq`:

      ```zsh
      brew link --force libpq
      ```

      Это необходимо, чтобы запускать утилиту `psql`, не указывая полный путь к ее исполняемому файлу.

   {/tab}

   {tab(Windows)}

   1. [Загрузите инсталлятор от EDB](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) для самой актуальной версии PostgreSQL.

   1. Выполните установку.

      При установке:
      1. На шаге **Installation Directory** запишите путь, куда будет выполнена установка.
      1. На шаге **Select Components** снимите выбор со всех компонентов, кроме **Command Line Tools**.

   1. Добавьте путь к исполняемым файлам утилит командной строки PostgreSQL в переменную среды окружения `Path`:

      1. Откройте **Пуск → Этот компьютер → Свойства → Дополнительные параметры системы → Переменные среды**.
      1. В списке **Системные переменные** измените значение переменной `Path`, добавив к существующему значению путь к директории с исполняемыми файлами утилит командной строки PostgreSQL.

         Пример пути при установке PostgreSQL с параметрами по умолчанию:

         ```text
         C:\Program Files\PostgreSQL\15\bin\
         ```

   {/tab}

   {/tabs}

{/includetag}

## {heading({counter(db)}. Создайте инстанс БД PostgreSQL)[id=instance_create]}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите [проект](/ru/tools-for-using-services/account/concepts/projects), в котором будет размещен инстанс БД.
1. Перейдите в раздел **Базы данных → Инстансы баз данных**.
1. Если в выбранном проекте нет ни одного инстанса БД, нажмите кнопку **Создать базу данных**.

   Иначе нажмите кнопку **Добавить**.

1. На шаге **Конфигурация** выберите:

    - Тип базы данных **PostgreSQL** и самую актуальную версию СУБД.
    - Конфигурацию **Single**.

1. Нажмите кнопку **Следующий шаг**.

1. На шаге **Создание инстанса** задайте:

    - **Имя инстанса базы данных:** например, `vk-cloud-dbaas-quickstart`.
    - **Тип виртуальной машины:** `STD3-2-8`.
    - **Зону доступности:** `Москва (GZ1)`.
    - **Тип диска:** `SSD`.
    - **Размер диска, GB:** `10`.
    - **Включить автомасштабирование диска:** убедитесь, что эта опция не выбрана.
    - **Сеть:** `Создать новую сеть`.
    - **Адрес подсети:** `10.0.1.0/24`.
    - **Назначить внешний IP:** убедитесь, что эта опция выбрана.
    - **Настройки Firewall:** выберите `ssh` из выпадающего списка.

      Итоговый список групп безопасности должен иметь вид: `default`, `ssh`.

    - **Создать реплику:** убедитесь, что эта опция не выбрана.
    - **Ключ для доступа по SSH:** `Создать новый ключ`.

      {note:info}

      При выборе этой опции на ваш компьютер будет загружен приватный SSH-ключ. Сохраните его.

      Этот ключ понадобится при подключении к инстансу по SSH, например, для [просмотра логов](#3_opcionalno_posmotrite_logi_instansa_bd).

      {/note}

    - **Резервное копирование:** `Отключено`.

1. Нажмите кнопку **Следующий шаг**.

1. На шаге **Инициализация** задайте:

    - **Тип создания:** `Новая база данных`.
    - **Имя базы данных для создания:** `tsdb1`.
    - **Имя пользователя:** `tsuser1`.
    - **Пароль пользователя:** задайте пароль или сгенерируйте его.

      {note:info}

      Убедитесь, что пароль достаточно сложный.

      Высокая надежность пароля важна, так как этот инстанс БД будет доступен из интернета.

      {/note}

1. Нажмите кнопку **Создать базу данных**.

   Дождитесь завершения создания инстанса БД, этот процесс может занять длительное время.

## {heading({counter(db)}. Получите внешний IP-адрес инстанса БД)[id=instance_ip]}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится инстанс БД.
1. Перейдите в раздел **Базы данных → Инстансы баз данных**.
1. Нажмите на имя инстанса БД. Откроется страница с информацией.
1. Перейдите на вкладку **Информация**.

   В параметре **Внешний IP-адрес** будет указан нужный адрес.

## {heading({counter(db)}. (Опционально) Посмотрите логи инстанса БД)[id=instance_logs]}

1. Подключитесь к инстансу БД по SSH, используя приватный SSH-ключ, полученный при [создании инстанса БД](#instance_create):

   {tabs}

   {tab(Linux/macOS)}

   ```console
   chmod 0600 <путь/к/ключу/ключ.pem>
   ssh -i <путь/к/ключу/ключ.pem> admin@<внешний IP-адрес инстанса БД>

   ```

   {/tab}

   {tab(Windows)}

   ```console
   ssh -i <путь/к/ключу/ключ.pem> admin@<внешний IP-адрес инстанса БД>
   ```

   {/tab}

   {/tabs}

1. Посмотрите логи инстанса:

   ```console
   journalctl -u postgresql
   ```

   {cut(Пример фрагмента вывода)}

   ```text
   -- Logs begin at Fri 2023-05-19 10:28:34 UTC, end at Mon 2023-05-22 06:08:42 UTC. --
   May 19 10:28:41 vk-cloud-dbaas-quickstart.novalocal systemd[1]: Starting PostgreSQL 14 database server...
   May 19 10:28:41 vk-cloud-dbaas-quickstart.novalocal postmaster[1096]: 2023-05-19 10:28:41.800 UTC [1096] LOG:  redirecting log output to logging collector process
   May 19 10:28:41 vk-cloud-dbaas-quickstart.novalocal postmaster[1096]: 2023-05-19 10:28:41.800 UTC [1096] HINT:  Future log output will appear in directory "log".
   May 19 10:28:41 vk-cloud-dbaas-quickstart.novalocal systemd[1]: Started PostgreSQL 14 database server.
   May 19 10:29:18 vk-cloud-dbaas-quickstart.novalocal systemd[1]: Stopping PostgreSQL 14 database server...
   May 19 10:29:18 vk-cloud-dbaas-quickstart.novalocal systemd[1]: postgresql.service: Succeeded.
   May 19 10:29:18 vk-cloud-dbaas-quickstart.novalocal systemd[1]: Stopped PostgreSQL 14 database server.
   May 19 10:29:33 vk-cloud-dbaas-quickstart.novalocal systemd[1]: Starting PostgreSQL 14 database server...
   May 19 10:29:33 vk-cloud-dbaas-quickstart.novalocal postmaster[1978]: 2023-05-19 10:29:33.720 GMT [1978] LOG:  starting PostgreSQL 14.7 on x86_64-pc-linux-gnu, compiled by gcc (GCC) 8.5.0 20210514 (Red Hat 8.5.0-16), 64-bit
   May 19 10:29:33 vk-cloud-dbaas-quickstart.novalocal postmaster[1978]: 2023-05-19 10:29:33.720 GMT [1978] LOG:  listening on IPv4 address "0.0.0.0", port 5432
   May 19 10:29:33 vk-cloud-dbaas-quickstart.novalocal postmaster[1978]: 2023-05-19 10:29:33.720 GMT [1978] LOG:  listening on IPv6 address "::", port 5432
   May 19 10:29:33 vk-cloud-dbaas-quickstart.novalocal postmaster[1978]: 2023-05-19 10:29:33.725 GMT [1978] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
   May 19 10:29:33 vk-cloud-dbaas-quickstart.novalocal postmaster[1980]: 2023-05-19 10:29:33.735 GMT [1980] LOG:  database system was shut down at 2023-05-19 10:29:18 GMT
   May 19 10:29:33 vk-cloud-dbaas-quickstart.novalocal postmaster[1978]: 2023-05-19 10:29:33.828 GMT [1978] LOG:  database system is ready to accept connections

   ...
   ```

   {/cut}

   По приведенному фрагменту вывода можно заключить, что PostgreSQL запущен, работает и готов принимать входящие соединения.

## {heading({counter(db)}. Установите расширение TimescaleDB)[id=install_timescaledb]}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится инстанс БД.
1. Перейдите в раздел **Базы данных → Инстансы баз данных**.
1. Нажмите на имя инстанса БД. Откроется страница с информацией.
1. Перейдите на вкладку **Расширения**.
1. Нажмите кнопку **Добавить**.
1. В выпадающем списке **Доступные расширения** выберите `Расширение с открытым исходным кодом для хранения данных временного ряда (timescaledb)`.
1. Нажмите кнопку **Добавить**.

   Дождитесь завершения установки расширения: оно должно перейти из состояния `Создается` в состояние `Активное`.

## {heading({counter(db)}. Подключитесь к базе данных)[id=db_connect]}

{includetag(db_onboarding)}
1. Установите утилиту `psql`:

   {tabs}
   
   {tab(Linux (APT))}
   
   1. Подключите репозиторий PostgreSQL:
   
      ```console
      sudo apt install curl ca-certificates gnupg
      curl https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/apt.postgresql.org.gpg > /dev/null
      sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
      sudo apt update
      ```
   
   1. Установите утилиту `psql`:
   
      ```console
      sudo apt install -y postgresql-client
      ```
   
   {/tab}
   
   {tab(Linux (RPM))}
   
   1. Подключите репозиторий PostgreSQL:
   
      1. Заполните опросник на [странице загрузки PostgreSQL для Linux семейства RedHat](https://www.postgresql.org/download/linux/redhat/):
   
         * **Select version**: выберите самую актуальную версию.
         * **Select platform**: выберите дистрибутив операционной системы.
         * **Select architecture**: выберите архитектуру. Если вы не знаете, какую архитектуру выбрать, выберите `x86_64`.
   
         Появится текст установочного скрипта.
   
      1. Скопируйте команду из скрипта под комментарием `Install the repository RPM`. Ее вид зависит от выбранного дистрибутива:
   
         {tabs}
   
         {tab(yum)}
   
         ```console
         sudo yum install -y https://download.postgresql.org/pub/repos/yum/...
         ```
   
         {/tab}
   
         {tab(dnf)}
   
         ```console
         sudo dnf install -y https://download.postgresql.org/pub/repos/yum/...
         ```
   
         {/tab}
   
         {/tabs}
   
      1. Выполните скопированную команду.
   
      1. Если использовалась команда вида `sudo dnf...`, отключите встроенный модуль PostgreSQL:
   
         ```console
         sudo dnf -qy module disable postgresql
         ```
   
   1. Установите утилиту `psql`:
   
      {tabs}
   
      {tab(yum)}
   
      ```console
      sudo yum install -y postgresql
      ```
   
      {/tab}
   
      {tab(dnf)}
   
      ```console
      sudo dnf install -y postgresql
      ```
   
      {/tab}
   
      {/tabs}
   
   {/tab}
   
   {tab(macOS (Homebrew))}
   
   1. Установите утилиту `psql`:
   
      ```zsh
      brew install libpq
      ```
   
   1. Создайте символические ссылки на исполняемые файлы `libpq`:
   
      ```zsh
      brew link --force libpq
      ```
   
      Это необходимо, чтобы запускать утилиту `psql`, не указывая полный путь к ее исполняемому файлу.
   
   {/tab}
   
   {tab(Windows)}
   
   1. [Загрузите инсталлятор от EDB](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) для самой актуальной версии PostgreSQL.
   
   1. Выполните установку.
   
      При установке:
      1. На шаге **Installation Directory** запишите путь, куда будет выполнена установка.
      1. На шаге **Select Components** снимите выбор со всех компонентов, кроме **Command Line Tools**.
   
   1. Добавьте путь к исполняемым файлам утилит командной строки PostgreSQL в переменную среды окружения `Path`:
   
      1. Откройте **Пуск → Этот компьютер → Свойства → Дополнительные параметры системы → Переменные среды**.
      1. В списке **Системные переменные** измените значение переменной `Path`, добавив к существующему значению путь к директории с исполняемыми файлами утилит командной строки PostgreSQL.
   
         Пример пути при установке PostgreSQL с параметрами по умолчанию:
   
         ```text
         C:\Program Files\PostgreSQL\15\bin\
         ```
   
   {/tab}
   
   {/tabs}
   {/includetag}

1. Подключитесь к базе данных `tsdb1` с помощью утилиты `psql`:

   1. Выполните команду:

      ```console
      psql -h <внешний IP-адрес инстанса БД> -d tsdb1 -U tsuser1
      ```

   1. Введите пароль пользователя `tsuser1`, заданный при [создании инстанса БД](#instance_create).

   При успешном подключении должно отобразиться приглашение:

   ```console
   tsdb1=>
   ```

{note:warn}

Все дальнейшие шаги должны выполняться в командной строке `psql`.

{/note}

## {heading({counter(db)}. Создайте необходимые таблицы)[id=tables_create]}

1. Активируйте расширение TimescaleDB:

   ```sql
   CREATE EXTENSION timescaledb;
   ```

   Дождитесь появления приглашения `tsdb1=>`.

1. Создайте таблицу `sensors`:

   ```sql
   CREATE TABLE sensors(
     id SERIAL PRIMARY KEY,
     type VARCHAR(50),
     location VARCHAR(50)
   );
   ```

1. Создайте таблицу `sensor_data`:

   ```sql
   CREATE TABLE sensor_data (
     time TIMESTAMPTZ NOT NULL,
     sensor_id INTEGER,
     temperature DOUBLE PRECISION,
     cpu DOUBLE PRECISION,
     FOREIGN KEY (sensor_id) REFERENCES sensors (id)
   );
   ```

1. Убедитесь, что таблицы были успешно созданы:

   ```sql
   SELECT tablename
   FROM pg_catalog.pg_tables
   WHERE tablename LIKE 'sensor%';
   ```

   {cut(Результат запроса)}

   ```text
     tablename
   -------------
    sensor_data
    sensors
   (2 rows)
   ```

   {/cut}

1. Конвертируйте таблицу PostgreSQL `sensor_data` в гипертаблицу ([hypertable](https://docs.timescale.com/use-timescale/latest/hypertables/)) TimescaleDB:

   ```sql
   SELECT create_hypertable('sensor_data', 'time');
   ```

1. Убедитесь, что гипертаблица `sensor_data` была успешно создана:

   ```sql
   SELECT hypertable_name
   FROM timescaledb_information.hypertables;
   ```

   {cut(Результат запроса)}

   ```text
    hypertable_name
   -----------------
    sensor_data
   (1 row)
   ```

   {/cut}

## {heading({counter(db)}. Наполните таблицы данными)[id=tables_fill]}

{note:info}

Таблица `sensor_data` наполняется случайно сгенерированным набором данных, поэтому данные в вашей таблице будут отличаться от приведенных примеров.

{/note}

1. Наполните таблицу `sensors` данными:

   ```sql
   INSERT INTO sensors (type, location) VALUES
   ('a','floor'),
   ('a', 'ceiling'),
   ('b','floor'),
   ('b', 'ceiling');
   ```

1. Убедитесь, что данные были успешно вставлены в таблицу:

   ```sql
   SELECT * FROM sensors;
   ```

   {cut(Результат запроса)}

   ```text
    id | type | location
   ----+------+----------
     1 | a    | floor
     2 | a    | ceiling
     3 | b    | floor
     4 | b    | ceiling
   (4 rows)
   ```

   {/cut}

1. Наполните таблицу `sensor_data` случайно сгенерированными данными:

   ```sql
   INSERT INTO sensor_data (time, sensor_id, cpu, temperature)
   SELECT
     time,
     sensor_id,
     random() AS cpu,
     random()*100 AS temperature
   FROM generate_series(now() - interval '24 hour', now(), interval '5 minute') AS g1(time), generate_series(1,4,1) AS g2(sensor_id);
   ```

1. Убедитесь, что данные были успешно вставлены в таблицу, выведя первые несколько строк таблицы:

   ```sql
   SELECT * FROM sensor_data ORDER BY time LIMIT 8;
   ```

   {cut(Пример результата запроса)}

   ```text
                time              | sensor_id |    temperature     |         cpu
   -------------------------------+-----------+--------------------+---------------------
    2023-05-21 07:43:52.133888+00 |         4 | 34.633736865959364 |  0.5569185687389719
    2023-05-21 07:43:52.133888+00 |         3 | 56.905440887294034 | 0.07377927779113236
    2023-05-21 07:43:52.133888+00 |         1 |  56.63560698774681 |  0.5716904026292013
    2023-05-21 07:43:52.133888+00 |         2 | 36.502832944119135 |  0.6536441978766803
    2023-05-21 07:48:52.133888+00 |         4 |   76.2173939498279 |  0.6182606187228714
    2023-05-21 07:48:52.133888+00 |         3 |  71.45127267625107 | 0.27642300219178395
    2023-05-21 07:48:52.133888+00 |         1 | 49.732367773230024 |   0.770096500403703
    2023-05-21 07:48:52.133888+00 |         2 |  31.10197931398453 |  0.8426620901373241
   (8 rows)
   ```

   {/cut}

## {heading({counter(db)}. Выполните тестовые запросы)[id=db_select]}

{note:info}

Ранее таблица `sensor_data` была наполнена случайно сгенерированным набором данных, поэтому результаты запросов к вашей таблице будут отличаться от приведенных примеров.

{/note}

1. Выведите средние значения температуры и загрузки CPU за тридцатиминутные интервалы:

   ```sql
   SELECT
     time_bucket('30 minutes', time) AS period,
     AVG(temperature) AS avg_temp,
     AVG(cpu) AS avg_cpu
   FROM sensor_data
   GROUP BY period
   ORDER BY period;
   ```

   {cut(Пример части результата запроса)}

   ```text
            period         |      avg_temp      |       avg_cpu
   ------------------------+--------------------+---------------------
    2023-05-21 07:30:00+00 |  53.61763620602069 |  0.5413570794268665
    2023-05-21 08:00:00+00 | 45.105700825199456 |  0.5967307199039785
    2023-05-21 08:30:00+00 | 49.534870531748844 |  0.5244548233136944
    2023-05-21 09:00:00+00 |  48.11141443258068 | 0.40274852600539646
    2023-05-21 09:30:00+00 | 52.020211415250266 | 0.41570437093237916
    2023-05-21 10:00:00+00 |  56.50992475543965 |  0.5744052407007274
    2023-05-21 10:30:00+00 | 46.664477309117196 |  0.6187918344821526
    2023-05-21 11:00:00+00 |  47.68186282450759 |  0.5020627643634109

   ...

   ```

   {/cut}

1. Выведите средние значения температуры и загрузки CPU за тридцатиминутные интервалы, а также последнее зафиксированное за интервал значение температуры:

   ```sql
   SELECT
     time_bucket('30 minutes', time) AS period,
     AVG(temperature) AS avg_temp,
     last(temperature, time) AS last_temp,
     AVG(cpu) AS avg_cpu
   FROM sensor_data
   GROUP BY period
   ORDER BY period;
   ```

   {cut(Пример части результата запроса)}

   ```text
            period         |      avg_temp      |     last_temp      |       avg_cpu
   ------------------------+--------------------+--------------------+---------------------
    2023-05-21 07:30:00+00 |  53.61763620602069 | 24.940269958716854 |  0.5413570794268665
    2023-05-21 08:00:00+00 | 45.105700825199456 | 14.089769297588717 |  0.5967307199039785
    2023-05-21 08:30:00+00 | 49.534870531748844 | 15.675718258720295 |  0.5244548233136944
    2023-05-21 09:00:00+00 |  48.11141443258068 | 54.914047493504725 | 0.40274852600539646
    2023-05-21 09:30:00+00 | 52.020211415250266 |  90.50501566182483 | 0.41570437093237916
    2023-05-21 10:00:00+00 |  56.50992475543965 |  17.26290517165019 |  0.5744052407007274
    2023-05-21 10:30:00+00 | 46.664477309117196 |  58.94930860972387 |  0.6187918344821526
    2023-05-21 11:00:00+00 |  47.68186282450759 | 62.973228176266005 |  0.5020627643634109

   ...
   ```

   {/cut}

Вывод результатов запросов, похожих на приведенные, свидетельствует о корректной работе PostgreSQL и расширения TimescaleDB.

## {heading({counter(db)}. (Опционально) Познакомьтесь с данными мониторинга инстанса БД)[id=db_monitoring]}

Для PostgreSQL доступен мониторинг. Познакомьтесь с собранными данными мониторинга:

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится инстанс БД.
1. Перейдите в раздел **Базы данных → Инстансы баз данных**.
1. Нажмите на имя инстанса БД. Откроется страница с информацией.
1. Перейдите на вкладку **Мониторинг**.
1. Выберите нужный временной интервал и посмотрите собранные данные.

## Удалите неиспользуемые ресурсы

Инстанс БД [тарифицируется](/ru/dbs/dbaas/tariffication) и потребляет вычислительные ресурсы. Если он вам больше не нужен:

1. Удалите инстанс БД.
1. При необходимости [удалите Floating IP-адрес](/ru/networks/vnet/instructions/ip/floating-ip#delete), назначенный инстансу БД. Присутствующие в проекте Floating IP-адреса [тарифицируются](/ru/networks/vnet/tariffication).
