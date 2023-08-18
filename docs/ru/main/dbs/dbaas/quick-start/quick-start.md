Быстрый старт поможет вам на примере PostgreSQL начать работу с сервисом и познакомиться с его возможностями.

Пройдя все шаги быстрого старта, вы:

1. Создадите инстанс БД PostgreSQL из одного хоста.
1. Установите в инстанс расширение [TimescaleDB](https://docs.timescale.com).
1. Научитесь подключаться к инстансу, как для [просмотра логов](#3---opcionalno--posmotrite-logi-instansa-bd), так и для [выполнения SQL-запросов](#5--podklyuchites-k-baze-dannyh).
1. Создадите тестовые данные и запросы для TimescaleDB, чтобы убедиться, что расширение работает.

   Далее будет использован автоматически генерируемый тестовый набор данных, представляющий собой набор информации от сенсоров интернета вещей (IoT): температуры и загрузки CPU. Подробнее про тестовый набор данных читайте в [документации Timescale](https://docs.timescale.com/tutorials/latest/simulate-iot-sensor-data/).

   Процедура генерации подобных наборов данных подробно [рассматривается в блоге Timescale](https://www.timescale.com/blog/how-to-create-lots-of-sample-time-series-data-with-postgresql-generate_series/).

1. Познакомитесь с собранными за время работы инстанса БД данными мониторинга.

<warn>

Инстанс БД тарифицируется и потребляет вычислительные ресурсы. После прохождения быстрого старта [удалите инстанс и назначенный ему плавающий IP-адрес](#udalite-neispolzuemye-resursy), если они вам больше не нужны.

</warn>

## Подготовительные шаги

1. Убедитесь, что утилита `psql` установлена. Для этого посмотрите версию утилиты:

   ```bash
   psql --version
   ```

   Если утилита установлена, будет выведена ее версия:

   ```text
   psql (PostgreSQL) 14.7 
   ```

   Если утилита не установлена, будет выведена информация о том, что команда `psql` не найдена.

1. Если утилита `psql` не установлена, установите ее:

   <tabs>
   <tablist>
   <tab>Linux (APT)</tab>
   <tab>Linux (RPM)</tab>
   <tab>macOS (Homebrew)</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   1. Подключите репозиторий PostgreSQL:

      ```bash
      sudo apt install curl ca-certificates gnupg
      curl https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/apt.postgresql.org.gpg > /dev/null
      sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
      sudo apt update

      ```

   1. Установите утилиту `psql`:

      ```bash
      sudo apt install -y postgresql-client
      ```

   </tabpanel>
   <tabpanel>

   1. Подключите репозиторий PostgreSQL:

      1. Заполните опросник на [странице загрузки PostgreSQL для Linux семейства RedHat](https://www.postgresql.org/download/linux/redhat/):

         1. **Select version**: выберите самую актуальную версию.
         1. **Select platform**: выберите дистрибутив операционной системы.
         1. **Select architecture**: выберите архитектуру. Если вы не знаете, какую архитектуру выбрать, выберите `x86_64`.

         Появится текст установочного скрипта.

      1. Скопируйте команду из скрипта под комментарием `Install the repository RPM`:

         Ее вид зависит от выбранного дистрибутива:

         <tabs>
         <tablist>
         <tab>yum</tab>
         <tab>dnf</tab>
         </tablist>
         <tabpanel>

         ```bash
         sudo yum install -y https://download.postgresql.org/pub/repos/yum/...
         ```

         </tabpanel>
         <tabpanel>

         ```bash
         sudo dnf install -y https://download.postgresql.org/pub/repos/yum/...
         ```

         </tabpanel>
         </tabs>

      1. Выполните скопированную команду.

      1. Если использовалась команда вида `sudo dnf...`, отключите встроенный модуль PostgreSQL:

         ```bash
         sudo dnf -qy module disable postgresql
         ```

   1. Установите утилиту `psql`:

      <tabs>
      <tablist>
      <tab>yum</tab>
      <tab>dnf</tab>
      </tablist>
      <tabpanel>

      ```bash
      sudo yum install -y postgresql
      ```

      </tabpanel>
      <tabpanel>

      ```bash
      sudo dnf install -y postgresql
      ```

      </tabpanel>
      </tabs>

   </tabpanel>
   <tabpanel>

   1. Установите утилиту `psql`:

      ```zsh
      brew install libpq
      ```

   1. Создайте символические ссылки на исполняемые файлы `libpq`:

      ```zsh
      brew link --force libpq
      ```

      Это необходимо, чтобы запускать утилиту `psql`, не указывая полный путь к ее исполняемому файлу.

   </tabpanel>
   <tabpanel>

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

   </tabpanel>
   </tabs>

## 1. Создайте инстанс БД PostgreSQL

1. Перейдите в [личный кабинет](https://mcs.mail.ru/app/) VK Cloud.
1. Выберите [проект](/ru/base/account/concepts/projects), в котором будет размещен инстанс БД.
1. Перейдите в раздел **Базы данных → Инстансы баз данных**.
1. Если в выбранном проекте нет ни одного инстанса БД, нажмите кнопку **Создать базу данных**.

   Иначе нажмите кнопку **Добавить**.

1. На шаге «Конфигурация» выберите:

   - Тип базы данных **PostgreSQL** и самую актуальную версию СУБД.
   - Конфигурацию **Single**.

1. Нажмите кнопку **Следующий шаг**.

1. На шаге «Создание инстанса» задайте:

   - **Имя инстанса базы данных:** например, `vk-cloud-dbaas-quickstart`.
   - **Тип виртуальной машины:** `Standard-2-8`.
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

     <info>

     При выборе этой опции на ваш компьютер будет загружен приватный SSH-ключ. Сохраните его.

     Этот ключ понадобится при подключении к инстансу по SSH, например, для [просмотра логов](#3---opcionalno--posmotrite-logi-instansa-bd).

     </info>

   - **Резервное копирование:** `Отключено`.
   - **Включить мониторинг:** убедитесь, что эта опция выбрана.

1. Нажмите кнопку **Следующий шаг**.

1. На шаге «Инициализация» задайте:

   - **Тип создания:** `Новая база данных`.
   - **Имя базы данных для создания:** `tsdb1`.
   - **Имя пользователя:** `tsuser1`.
   - **Пароль пользователя:** задайте пароль или сгенерируйте его.

     <info>

     Рекомендуется либо использовать сложный и длинный пароль, состоящий из нескольких категорий символов, либо сгенерировать пароль.  

     Высокая надежность пароля важна, так как этот инстанс БД будет доступен из интернета.  

     </info>

1. Нажмите кнопку **Создать базу данных**.

   Дождитесь завершения создания инстанса БД, этот процесс может занять длительное время.

## 2. Получите внешний IP-адрес инстанса БД

1. Перейдите в [личный кабинет](https://mcs.mail.ru/app/) VK Cloud.
1. Выберите проект, где находится инстанс БД.
1. Перейдите в раздел **Базы данных → Инстансы баз данных**.
1. Нажмите на имя инстанса БД. Откроется страница с информацией.
1. Перейдите на вкладку **Информация**.

   В параметре **Внешний IP-адрес** будет указан нужный адрес.

## 3. (Опционально) Посмотрите логи инстанса БД

1. Подключитесь к инстансу БД по SSH, используя приватный SSH-ключ, полученный при [создании инстанса БД](#1--sozdayte-instans-bd-postgresql):

   <tabs>
   <tablist>
   <tab>Linux/macOS</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   ```bash
   chmod 0600 <путь/к/ключу/ключ.pem>
   ssh -i <путь/к/ключу/ключ.pem> admin@<внешний IP-адрес инстанса БД>
   
   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   ssh -i <путь/к/ключу/ключ.pem> admin@<внешний IP-адрес инстанса БД>
   ```

   </tabpanel>
   </tabs>

1. Посмотрите логи инстанса:

   ```bash
   journalctl -u postgresql
   ```

   <details>
   <summary>Пример фрагмента вывода</summary>

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

   </details>

   Из приведенного фрагмента вывода можно сделать заключение, что PostgreSQL запущен, работает и готов принимать входящие соединения.

## 4. Установите расширение TimescaleDB

1. Перейдите в [личный кабинет](https://mcs.mail.ru/app/) VK Cloud.
1. Выберите проект, где находится инстанс БД.
1. Перейдите в раздел **Базы данных → Инстансы баз данных**.
1. Нажмите на имя инстанса БД. Откроется страница с информацией.
1. Перейдите на вкладку **Расширения**.
1. Нажмите кнопку **Добавить**.
1. В выпадающем списке **Доступные расширения** выберите `Расширение с открытым исходным кодом для хранения данных временного ряда (timescaledb)`.
1. Нажмите кнопку **Добавить**.

   Дождитесь завершения установки расширения: оно должно перейти из состояния `Создается` в состояние `Активное`.

## 5. Подключитесь к базе данных

Подключитесь к базе данных `tsdb1` с помощью утилиты `psql`:

1. Выполните команду:

   ```bash
   psql -h <внешний IP-адрес инстанса БД> -d tsdb1 -U tsuser1
   ```

1. Введите пароль пользователя `tsuser1`, заданный при [создании инстанса БД](#1--sozdayte-instans-bd-postgresql).

При успешном подключении должно отобразиться приглашение:

```bash
tsdb1=>
```

<warn>

Все дальнейшие шаги должны выполняться в командной строке `psql`.

</warn>

## 6. Создайте необходимые таблицы

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

   <details>
   <summary>Результат запроса</summary>

   ```text
     tablename
   -------------
    sensor_data
    sensors
   (2 rows)
   ```

   </details>

1. Конвертируйте таблицу PostgreSQL `sensor_data` в гипертаблицу ([hypertable](https://docs.timescale.com/use-timescale/latest/hypertables/)) TimescaleDB:

   ```sql
   SELECT create_hypertable('sensor_data', 'time');
   ```

1. Убедитесь, что гипертаблица `sensor_data` была успешно создана:

   ```sql
   SELECT hypertable_name
   FROM timescaledb_information.hypertables;
   ```

   <details>
   <summary>Результат запроса</summary>

   ```text
    hypertable_name
   -----------------
    sensor_data
   (1 row)
   ```

   </details>

## 7. Наполните таблицы данными

<info>

Таблица `sensor_data` наполняется случайно сгенерированным набором данных, поэтому данные в вашей таблице будут отличаться от приведенных примеров.

</info>

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

   <details>
   <summary>Результат запроса</summary>

   ```text
    id | type | location
   ----+------+----------
     1 | a    | floor
     2 | a    | ceiling
     3 | b    | floor
     4 | b    | ceiling
   (4 rows)  
   ```

   </details>

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

   <details>
   <summary>Пример результата запроса</summary>

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

   </details>

## 8. Выполните тестовые запросы

<info>

Ранее таблица `sensor_data` была наполнена случайно сгенерированным набором данных, поэтому результаты запросов к вашей таблице будут отличаться от приведенных примеров.

</info>

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

   <details>
   <summary>Пример части результата запроса</summary>

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

   </details>

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

   <details>
   <summary>Пример части результата запроса</summary>

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

   </details>

Вывод результатов запросов, похожих на приведенные, свидетельствует о корректной работе PostgreSQL и расширения TimescaleDB.

## 9. (Опционально) Познакомьтесь с данными мониторинга инстанса БД

При [создании инстанса БД](#1--sozdayte-instans-bd-postgresql) был включен мониторинг. Познакомьтесь с собранными данными мониторинга:

1. Перейдите в [личный кабинет](https://mcs.mail.ru/app/) VK Cloud.
1. Выберите проект, где находится инстанс БД.
1. Перейдите в раздел **Базы данных → Инстансы баз данных**.
1. Нажмите на имя инстанса БД. Откроется страница с информацией.
1. Перейдите на вкладку **Мониторинг**.
1. Выберите нужный временной интервал и посмотрите собранные данные.

## Удалите неиспользуемые ресурсы

Инстанс БД [тарифицируется](../tariffication) и потребляет вычислительные ресурсы. Если он вам больше не нужен:

1. [Удалите инстанс БД](../instructions/delete).
1. При необходимости [удалите плавающий IP-адрес](/ru/networks/vnet/operations/manage-floating-ip#udalenie_plavayushchego_ip_adresa_iz_proekta), назначенный инстансу БД. Присутствующие в проекте плавающие IP-адреса [тарифицируются](/ru/networks/vnet/tariffs).
