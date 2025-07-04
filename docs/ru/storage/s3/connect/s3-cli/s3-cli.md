VK Cloud позволяет использовать интерфейс командной строки для управления сервисами Cloud Storage и автоматизации их работы.

## Подготовительные шаги

1. [Создайте аккаунт и ключ доступа](../../instructions/access-management/access-keys) к Cloud Storage в личном кабинете VK Cloud. Сохраните **Secret Key**.

2. Установите нужные инструменты:

    - [AWS CLI](../../../../tools-for-using-services/cli/aws-cli);
    - [s3cmd CLI](https://s3tools.org/download).

## 1. Настройте подключение к Cloud Storage

<tabs>
<tablist>
<tab>AWS CLI</tab>
<tab>s3cmd CLI</tab>
</tablist>
<tabpanel>

  1. В консоли выполните команду:

      ```console
      aws configure
      ```

  1. Укажите идентификатор ключа доступа к Cloud Storage.
  1. Укажите секретный ключ доступа **Secret Key**. Секретный ключ должен соответствовать тому идентификатору ключа, который вы указали в консоли.
  1. Укажите регион размещения сервиса Cloud Storage по умолчанию. Настройка должна соответствовать [региону](../../../../tools-for-using-services/account/concepts/regions) аккаунта:

      - `ru-msk` — регион Москва;
      - `kz-ast` — регион Казахстан.

  1. Укажите выходной формат по умолчанию. Эта настройка определяет, в каком виде AWS CLI отобразит результат выполнения команды. Доступные варианты:

      - `json` — данные отображаются в формате JSON, значение по умолчанию;
      - `yaml` — данные отображаются в формате YAML;
      - `yaml-stream` — данные передаются в потоковом режиме и формируются в формате YAML;
      - `текст` — строковые значения разделены табуляцией;
      - `таблица` — строковые значения разделены `|`.

  AWS CLI хранит эту информацию в профиле (наборе настроек), названном `default` в credentials-файле. Информация из этого профиля используется, когда запускается команда без указания профиля.

</tabpanel>
<tabpanel>

  1. В консоли выполните команду:

      ```console
      s3cmd --configure
      ```

  1. Укажите идентификатор ключа доступа к Cloud Storage.
  1. Укажите секретный ключ доступа **Secret Key**. Секретный ключ должен соответствовать тому идентификатору ключа, который вы указали в консоли.
  1. Укажите регион размещения сервиса Cloud Storage по умолчанию. Настройка должна соответствовать [региону](../../../../tools-for-using-services/account/concepts/regions) аккаунта:

      - `ru-msk` — регион Москва;
      - `kz-ast` — регион Казахстан.

  1. Укажите **S3 Endpoint** — имя хоста для подключения:

      - `hb.vkcloud-storage.ru` или `hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
      - `hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.

  1. Добавьте шаблон имени хоста для доступа к бакету. В параметре **DNS-style bucket+hostname:port template for accessing a bucket** укажите значение:

      - `%(bucket)s.hb.vkcloud-storage.ru` или `%(bucket)s.hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
      - `%(bucket)s.hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.

  1. Остальные настройки оставьте по умолчанию.

  1. Если настройки введены корректно, появится сообщение `Success. Your access key and secret key worked fine :-)`. Сохраните настройки.

  S3cmd CLI хранит собранную информацию в файле `~/.s3cfg`, его содержимое можно изменить вручную.

</tabpanel>
   </tabs>

## 2. Проверьте подключение к Cloud Storage

Выполните команду для вывода списка бакетов:

<tabs>
<tablist>
<tab>AWS CLI</tab>
<tab>s3cmd CLI</tab>
</tablist>
<tabpanel>

  ```console
  aws s3 ls --endpoint-url <домен>
  ```
Здесь:

- `<домен>` — регион аккаунта Cloud Storage.  По умолчанию AWS CLI настроен на работу с серверами Amazon, поэтому обязательно указывайте `--endpoint-url` при выполнении любой команды. Возможные значения:
  - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Россия;
  - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

</tabpanel>
<tabpanel>

  ```console
  s3cmd ls
  ```
</tabpanel>
</tabs>

В выводе консоли должен отобразиться список доступных бакетов. Список может быть пустым, если в хранилище не создано ни одного бакета.

При возникновении проблем с подключением, обратитесь к документации разработчика:

- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-troubleshooting.html);
- [s3cmd CLI](https://s3tools.org/kb).

## Примеры команд

Создание бакета:

<tabs>
<tablist>
<tab>AWS CLI</tab>
<tab>s3cmd CLI</tab>
</tablist>
<tabpanel>

  ```console
  aws s3 mb s3://<имя_бакета> --endpoint-url <домен>
  ```
  {cut(Пример результата выполнения команды)}

  ```console
  make_bucket: new-bucket-aws-cli
  ```

  {/cut}
</tabpanel>
<tabpanel>

  ```console
  s3cmd mb s3://<имя_бакета>
  ```
  {cut(Пример результата выполнения команды)}

  ```console
  Bucket 's3://my-bucket/' created
  ```
  {/cut}
</tabpanel>
</tabs>

Загрузка файла в бакет:

<tabs>
<tablist>
<tab>AWS CLI</tab>
<tab>s3cmd CLI</tab>
</tablist>
<tabpanel>

  ```console
  aws s3 cp <путь_к_локальному_файлу> s3://<имя_бакета> --endpoint-url <домен>
  ```
  {cut(Пример результата выполнения команды)}

  ```console
  upload: ..\Diagrams\example.svg to s3://new-bucket-aws-cli/example.svg
  ```
  {/cut}
</tabpanel>
<tabpanel>

  ```console
  s3cmd put <путь_к_локальному_файлу> s3://<имя_бакета>/<имя_объекта>
  ```
  {cut(Пример результата выполнения команды)}

  ```console
  upload: 'local-file' -> 's3://my-bucket/new-object'
  ```
  {/cut}
</tabpanel>
</tabs>

Получение списка объектов:

<tabs>
<tablist>
<tab>AWS CLI</tab>
<tab>s3cmd CLI</tab>
</tablist>
<tabpanel>

  ```console
  aws s3 ls s3://<имя_бакета> --endpoint-url <домен>
  ```
  {cut(Пример результата выполнения команды)}

  ```console
                                  PRE folder/
        2023-09-27 11:45:05     421326 picture-1.jpg
        2023-09-27 11:47:37       2713 picture-2.png
        2023-09-27 11:48:37       2662 picture-3.png
        2023-09-27 10:31:02      48314 picture-4.png
        2023-09-27 11:48:56        361 delete-picture.png
  ```
  {/cut}
</tabpanel>
<tabpanel>

  ```console
  s3cmd ls s3://<имя_бакета>
  ```
  {cut(Пример результата выполнения команды)}

  ```console
      2023-10-06 05:37      2713   s3://my-bucket/picture-1.png
      2023-10-06 05:36       361   s3://my-bucket/delete-picture.png
      2023-10-06 05:38     56849   s3://my-bucket/icon.ico
      2023-10-06 05:36     54970   s3://my-bucket/scheme.svg
      2023-10-05 06:58    110207   s3://my-bucket/scheme-picture.png
  ```
  {/cut}
</tabpanel>
</tabs>
