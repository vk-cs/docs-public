Данная статья описывает установку стека ELK на операционную систему семейства Linux — Ubuntu 18.04.

Стек ELK — это мощный набор инструментов для эффективного решения широкого спектра задач сбора, хранения и анализа данных:

- Elasticsearch – решение для полнотекстового поиска, построенное поверх Apache Lucene и имеющее дополнительные удобства.
- Logstash – утилита для сборки, фильтрации и последующего перенаправления в конечное хранилище данных. Этот механизм обеспечивает конвейер в реальном времени. Он может принимать данные из нескольких источников и преобразовывать их в документы JSON.
- Kibana — приложение, позволяющее брать и искать данные из Elasticsearch и строить наглядные графики.

## Требования

- Операционная система Ubuntu версии 18.04.
- Установленный веб-сервер Nginx.
- Установленная виртуальная машина Java.
- Пользователь с доступом к команде **sudo**.

## Установка веб-сервера Nginx

По сравнению с веб-сервером Apache веб-сервер Nginx использует меньше ресурсов для размещения объемных сайтов с высоким трафиком. Благодаря архитектуре Nginx можно легко масштабироваться до сотен тысяч параллельных соединений.

Чтобы установить и выполнить первичную настройку веб-сервера Nginx:

1. Откройте окно терминала.
1. Обновите индексы пакетов, выполнив команду:

   ```console
   sudo apt update
   ```

1. Установите веб-сервер Nginx, выполнив команду:

   ```console
   sudo apt install nginx -y
   ```

1. Для проверки работы веб-сервера запустите веб-браузер и в адресной строке введите IP-адрес веб-сервера.

   Если установка выполнена успешно, откроется следующая страница веб-сервера:

   **![](assets/1559939150156-1559939150156.jpeg)**

## Установка виртуальной машины Java

Для работы стека ELK требуется виртуальная машина Java. Чтобы установить JVM:

1. Откройте окно терминала.
1. Установите программный пакет JVM, выполнив команду:

   ```console
   sudo apt install default-jre -y
   ```

   В результате будет установлен пакет Java Runtime Environment (JRE).

1. Установите программный пакет JDK, включающий компилятор Java, стандартные библиотеки классов Java, примеры, документацию и различные утилиты. Для этого выполните команду:

   ```console
   sudo apt install default-jdk -y
   ```

## Установка и настройка Elasticsearch

Чтобы установить и выполнить первичную настройку Elasticsearch:

1. Для проверки текущей версии Elasticsearch, перейдите на страницу: [https://www.elastic.co/downloads/elasticsearch](https://www.elastic.co/downloads/elasticsearch).

1. Откройте окно терминала.

1. Импортируете открытый ключ GPG Elasticsearch, с использованием которого защищаются пакеты Elastic, выполнив команду:

   ```console
   sudo wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add 
   ```

1. Добавьте пакеты Elastic в директорию системных репозиториев sources.list.d, выполнив команду:

   ```console
   sudo echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-7.x.list
   ```

1. Обновите индексы пакетов, выполнив команду:

   ```console
   sudo apt update
   ```

1. Установите Elasticsearch, выполнив команду:

   ```console
   sudo apt install elasticsearch
   ```

1. Внесите изменения в конфигурационный файл `elasticsearch.yml`. Для этого:

   1. Откройте этот файл для редактирования, выполнив команду:

      ```console
      sudo nano /etc/elasticsearch/elasticsearch.yml
      ```

   1. Найдите строку:

      ```yaml
      #network.host: 192.168.0.1 
      ```

      Замените ее на строку:

         ```yaml
         network.host: localhost
         ```

         {note:info}

         Для поиска по файлу используйте сочетание клавиш CTRL+W.

         {/note}

         После редактирования конфигурационного файла `.yml` убедитесь, что в нем нет лишних пробелов и/или отступов!

   1. Сохраните изменения, используя сочетание клавиш CTRL+O, и завершите редактирование, используя сочетание клавиш CTRL+X.

1. Запустите сервис Elasticsearch, выполнив команду:

   ```console
   sudo systemctl start elasticsearch
   ```

1. Проверьте статус запуска сервиса Elasticsearch, выполнив команду:

   ```console
   sudo systemctl status elasticsearch
   ```

1. Если отображается ошибка:

   **![](assets/1559939328250-1559939328250.jpeg)**

   Выполните следующее:

      1. Откройте файл, содержащий параметры виртуальной машины Java, выполнив команду:

         ```console
         sudo nano /etc/elasticsearch/jvm.options
         ```

      1. Найдите параметры, определяющие минимальное и максимальное количество оперативной памяти для Java:

         ![](assets/1559885194663-1559885194663.jpeg)

         {note:info}

         Подробно о параметрах Xms и Xmx [читайте тут](https://docs.oracle.com/cd/E15523_01/web.1111/e13814/jvm_tuning.htm#PERFM161). Для машин с небольшим объемом оперативной памяти мы рекомендуем ограничить объем памяти, используемый JVM.

         {/note}

      1. В параметрах `-Xms1g` и `-Xmx1g` укажите нужные значения. Например, для операционной системы с объемом оперативной памяти 1 ГБ, можно указать:

         ```txt
         -Xms128m
         -Xmx128m
         ```

      1. Сохраните изменения, используя сочетание клавиш CTRL+O, и завершите редактирование, используя сочетание клавиш CTRL+X.
      1. Запустите сервис Elasticsearch и проверьте статус. В случае отсутствия ошибок отобразится следующее:

         **![](assets/1559939373499-1559939373499.jpeg)**

1. Чтобы при перезагрузке операционной системы сервис Elasticsearch запускался автоматически, выполните команду:

   ```console
   sudo systemctl enable elasticsearch
   ```

1. Для проверки доступа к сервису Elasticsearch отправьте HTTP-запрос, выполнив команду:

   ```console
   curl -X GET localhost:9200
   ```

   Если установка Elasticsearch выполнена успешно, отобразится следующая информация:

      **![](assets/1559939398435-1559939398435.jpeg)**

## Установка и настройка Kibana

Чтобы установить и выполнить первичную настройку Kibana, выполните следующее:

1. Убедитесь, что вы успешно установили Elasticsearch.
1. Откройте окно терминала.
1. Установите Kibana, выполнив команду:

   ```console
   sudo apt install kibana
   ```

1. Запустите Kibana, выполнив команду:

   ```console
   sudo systemctl start kibana
   ```

1. Чтобы при перезагрузке операционной системы сервис Kibana запускался автоматически, выполните команду:

   ```console
   sudo systemctl enable kibana
   ```

1. Для проверки статуса работы Kibana, выполните команду:

   ```console
   sudo systemctl status kibana
   ```

1. Внесите изменения в конфигурационный файл `kibana.yml`. Для этого:

   1. Откройте этот файл, выполнив команду:

      ```console
      sudo nano /etc/kibana/kibana.yml
      ```

   1. Найдите строку:

      ```yaml
      #server.port: 5601 
      ```

      И замените ее на строку:

         ```yaml
         server.port: 5601
         ```

   1. Найдите строку

      ```yaml
      #server.host: "localhost" 
      ```

      И замените ее на строку:

         ```yaml
         server.host: "localhost"
         ```

   1. Найдите строку:

      ```yaml
      #elasticsearch.hosts: ["http://localhost:9200"] 
      ```

      И замените ее на строку:

         ```yaml
         elasticsearch.hosts: ["http://localhost:9200"]
         ```

   1. Сохраните изменения, используя сочетание клавиш CTRL+O, и завершите редактирование, используя сочетание клавиш CTRL+X

1. Создайте учетную запись администратора для доступа к веб-интерфейсу Kibana. Для этого выполните команду:

   ```console
   echo "mcskibadmin:\`openssl passwd -apr1\`" | sudo tee -a /etc/nginx/htpasswd.users
   ```

   где `mcskibadmin` - логин учетной записи администратора, `htpasswd.users` - файл, в котором хранятся учетные данные.

   Затем введите пароль.

1. Создайте файл с виртуальным сайтом для веб-сервера Nginx, выполнив команду:

   ```console
   sudo nano /etc/nginx/sites-available/elk
   ```

1. В этот файл добавьте следующую информацию:

   ```nginx
   server {
       listen 80;
    
       server_name <внешний IP-адрес веб-сервера>;
    
       auth_basic "Restricted Access";
       auth_basic_user_file /etc/nginx/htpasswd.users;
    
       location / {
           proxy_pass http://localhost:5601;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Сохраните изменения, используя сочетание клавиш CTRL+O, и завершите редактирование, используя сочетание клавиш CTRL+X.

1. Активируйте новую конфигурацию Nginx, выполнив команду:

   ```console
   sudo ln -s /etc/nginx/sites-available/elk /etc/nginx/sites-enabled/
   ```

1. Перезагрузите Kibana, выполнив команду:

   ```console
   sudo systemctl restart kibana
   ```

1. Перезагрузите веб-сервер Nginx, выполнив команду:

   ```console
   sudo systemctl restart nginx 
   ```

1. Убедитесь, что синтаксис конфигурационного файла nginx не содержит ошибок, выполнив команду:

   ```console
   sudo nginx -t
   ```

## Установка и настройка Logstash

Чтобы установить и выполнить первичную настройку Logstash:

1. Установите Logstash, выполнив команду команду:

   ```console
   sudo apt install logstash
   ```

1. Создайте и настройте конфигурационный файл, содержащий правила приема информации с beats-агентов. Для этого:

   {note:info}

   Далее приведен один из возможных вариантов настройки. Дополнительную информацию [читайте тут](https://www.elastic.co/guide/en/logstash/7.2/logstash-config-for-filebeat-modules.html#parsing-system).

   {/note}

   1. Создайте файл `02-beats-input.conf`, выполнив команду:

      ```console
      sudo nano /etc/logstash/conf.d/02-beats-input.conf
      ```

   1. В этот файл добавьте строки:

      ```json
      input {
        beats {
          port => 5044
        }
      }
      ```

   1. Сохраните изменения, используя сочетание клавиш CTRL+O, и завершите редактирование, используя сочетание клавиш CTRL+X.

1. Создайте и настройте конфигурационный файл `30-elasticsearch-output.conf`, содержащий правила хранения beats в информации Elasticsearch. Для этого:

   1. Создайте файл `30-elasticsearch-output.conf`, выполнив команду:

      ```console
      sudo nano /etc/logstash/conf.d/30-elasticsearch-output.conf
      ```

   1. В этот файл добавьте следующие строки:

      ```json
      output {
        elasticsearch {
          hosts => ["localhost:9200"]
          sniffing => true
          manage_template => false
          template_overwrite => true
          index => "%{[@metadata][beat]}-%{+YYYY.MM.dd}"
          document_type => "%{[@metadata][type]}"
        }
      }
      ```

   1. Сохраните изменения, используя сочетание клавиш CTRL+O, и завершите редактирование, используя сочетание клавиш CTRL+X.

1. Создайте файл, содержащий правила фильтрации и структуризации входящих данных. Для этого:

   1. Создайте файл `10-system-filter.conf`, выполнив команду:

      ```console
      sudo nano /etc/logstash/conf.d/10-logstash-filter.conf
      ```

   1. В открывшийся файл поместите следующие строки:

      ```json
      input { stdin { } }
      filter {
      grok {
         match => { "message" => "%{COMBINEDAPACHELOG}" }
      }
      date {
         match => [ "timestamp" , "dd/MMM/yyyy:HH:mm:ss Z" ]
      }
      }
      output {
      elasticsearch { hosts => ["localhost:9200"] }
      stdout { codec => rubydebug }
      }
      ```

   1. Сохраните изменения, используя сочетание клавиш CTRL+O, и завершите редактирование, используя сочетание клавиш CTRL+X.

1. Проверьте конфигурацию Logstash, выполнив команду:

      ```console
      sudo -u logstash /usr/share/logstash/bin/logstash --path.settings /etc/logstash -t
      ```

1. Запустите Logstash, выполнив команду:

   ```console
   sudo systemctl start logstash
   ```

1. Чтобы при перезагрузке операционной системы сервис Logstash запускался автоматически, выполните команду:

   ```console
   sudo systemctl enable logstash
   ```

## Установка и настройка Filebeat

Filebeat позволяет собирать данные (beats) из различных источников и передавать их в Logstash или Elasticsearch в Linux-подобных системах.

Для установки Filebeat:

1. Откройте терминал.

1. Установите Filebeat, выполнив команду:

   ```console
   sudo apt install filebeat
   ```

1. Настройте конфигурационный файл `filebeat.yml`. Для этого:

   1. Откройте этот файл:

      ```console
      sudo nano /etc/filebeat/filebeat.yml
      ```

   1. Запретите Filebeat отправлять данные напрямую в Elasticsearch. Для этого найдите строки:

      ```yaml
      output.elasticsearch:
        # Array of hosts to connect to.
        hosts: ["localhost:9200"]
      ```

      И замените их на строки:

         ```yaml
         #output.elasticsearch:
             # Array of hosts to connect to.
             #hosts: ["localhost:9200"]
         ```

   1. Укажите сервису Filebeat использовать Logstash в качестве сборщика логов. Для этого найдите строки:

      ```log
      #output.logstash:  
          # The Logstash hosts  
          #hosts: ["localhost:5044"]
      ```

      И замените их на строки:

         ```log
         output.logstash:
             # The Logstash hosts
             hosts: ["localhost:5044"]
         ```

         Сохраните изменения, используя сочетание клавиш CTRL+O, и завершите редактирование, используя сочетание клавиш CTRL+X.

1. Включите модуль Logstash. Для этого выполните команду:

   ```console
   sudo sudo filebeat modules enable logstash
   ```

   {note:info}

   Подробно о filebeat-модулях [читайте тут](https://www.elastic.co/guide/en/beats/filebeat/6.4/filebeat-module-system.html).

   {/note}

1. Для просмотра включенных модулей выполните команду:

   ```console
   sudo filebeat modules list
   ```

1. Загрузите шаблон индекса Elasticsearch, выполнив команду:

   ```console
   sudo filebeat setup --template -E output.logstash.enabled=false -E 'output.elasticsearch.hosts=["localhost:9200"]'
   ```

   {note:info}

   Индексы Elasticsearch представляют собой набор документов, имеющих сходные характеристики. Они определяются по именам, которые используются для ссылок на индексы при выполнении различных операций с индексами. Шаблон индексов загружается автоматически при создании новых индексов.

   {/note}

1. Дашборды позволяют визуализировать данные Filebeat отсылаемые в Kibana. Для включения дашборда выполните команду:

   ```console
   sudo filebeat setup -e -E output.logstash.enabled=false -E output.elasticsearch.hosts=['localhost:9200'] -E setup.kibana.host=localhost:5601
   ```

1. Запустите Filebeat, выполнив команду:

   ```console
   sudo systemctl start filebeat
   ```

1. Чтобы при перезагрузке операционной системы сервис filebeat запускался автоматически, выполните команду:

   ```console
   sudo systemctl enable filebeat
   ```

1. Чтобы убедиться, что Elasticsearch получает данные, запросите индекс Filebeat с помощью команды:

   ```console
   curl -XGET 'http://localhost:9200/filebeat-\*/_search?pretty'
   ```

Установка стека ELK завершена.

В адресной строке веб-браузера введите IP-адрес вашего Elastic-сервера. Для входа используйте учетные данные администратора . После успешной авторизации вы перейдете на основную страницу Kibana.
