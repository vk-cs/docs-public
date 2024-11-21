В VK Cloud [действуют ограничения](/ru/tools-for-using-services/account/concepts/quotasandlimits) на размер загружаемых образов операционных систем. При превышении лимита появляется сообщение вида:

```txt
HttpException: 413: Client Error for url: https://infra.mail.ru:9292/v2/images/1f06dce4-XXXX-444c-bcaa-896ed69023c1/file, Request Entity Too Large
```

Далее рассмотрено создание диска из образа ОС размером более 500 ГБ через объектное хранилище VK Cloud.

Будут использоваться:

- виртуальная машина размером не менее 500 ГБ;
- локальная машина семейства Linux, на которой:

  - установлена утилита [gzip](https://www.gnu.org/software/gzip/manual/gzip.html);
  - имеется файл образа ОС `image.raw` размером не менее 500 ГБ.

## Подготовительные шаги

1. Создайте [аккаунт](../../service-management/access-management/access-keys/) и [бакет](../../service-management/buckets/create-bucket/) `uc_bucket`.
1. Убедитесь, что у вас [установлен и настроен](../../connect/s3-cli/) AWS CLI. Укажите в нем данные для подключения к бакету (`Access key ID` и `Secret key`). Откройте конфигурационный файл `~/.aws/config` и внесите в него изменения:

   ```txt
   [default]
   region = ru-msk
   output = json
   s3 =
       max_concurrent_requests = 20
       max_queue_size = 10000
       multipart_threshold = 1024MB
       multipart_chunksize = 384MB
       addressing_style = path
   ```

1. [Создайте](/ru/computing/iaas/service-management/vm/vm-create) ВМ Ubuntu 22.04 в облаке VK Cloud.
1. Установите на ВМ утилиту [gzip](https://www.gnu.org/software/gzip/manual/gzip.html).
1. [Создайте](/ru/computing/iaas/service-management/volumes#create_disk) диск размером не менее 600 ГБ и [подключите](/ru/computing/iaas/service-management/volumes#mount_disk) его к ВМ.

## 1. Загрузите образ из локальной машины в объектное хранилище

1. На локальной машине выполните команду:

   ```bash
   dd if=./image.raw bs=32M | gzip -c | aws s3 cp - s3://uc_bucket/image.raw.gz --endpoint-url http://hb.bizmrg.com
   ```

1. Убедитесь, что загрузка началась, с помощью команды:

   ```bash
   aws s3api list-multipart-uploads --bucket uc_bucket --endpoint-url http://hb.bizmrg.com
   ```

   <details>
    <summary>Пример вывода команды</summary>

   ```json
    {
        "Uploads": [
            {
                "UploadId": "3ceXH7brs7r8DohqQ9BsJzfjkkhMxQux67Z8MQXYGh9BvfrmffLufWMzwiLWPbU3XkWE3ibSefgQ1GU81ER66EEHfKMZM8xxqRsDkBaN63XXXX",
                "Key": "image.raw.gz",
                "Initiated": "2021-12-08T11:57:42.929000+00:00",
                "StorageClass": "STANDARD",
                "Owner": {
                    "DisplayName": "mcs0000000000",
                    "ID": "4ed36441-69f5-4ac7-XXXX-07013f9ac3c5"
                },
                "Initiator": {
                    "ID": "P95mF7Kjo6aEfpiLA7XXXXX",
                    "DisplayName": "mcs0000000000"
                }
            }
        ]
    }
   ```

   </details>

1. Проверьте партиции с помощью команды:

   ```bash
   aws s3api list-parts --bucket uc_bucket --endpoint-url http://hb.bizmrg.com --key image.raw.gz  --upload-id 3ceXH7brs7r8DohqQ9BsJzfjkkhMxQux67Z8MQXYGh9BvfrmffLufWMzwiLWPbU3XkWE3ibSefgQ1GU81ER66EEHfKMZM8xxqRsDkBaN63XXXX
   ```

   <details>
    <summary>Пример вывода команды</summary>

   ```json
    {
        "Parts": [
            {
                "PartNumber": 1,
                "LastModified": "2021-12-08T11:57:49.613000+00:00",
                "ETag": "\"6c8659343a53b1c4247e3769548e7181\"",
                "Size": 402653184
            },
            {
                "PartNumber": 2,
                "LastModified": "2021-12-08T11:57:49.019000+00:00",
                "ETag": "\"dc6138a7be543ec5b720e9a2a6273b76\"",
                "Size": 402653184
            }
        ],
        "Initiator": {
            "ID": "P95mF7Kjo6aEfpiLA7XXXXX",
            "DisplayName": "mcs0000000000"
        },
        "Owner": {
            "DisplayName": "mcs0000000000",
            "ID": "P95mF7Kjo6aEfpiLA7XXXXX"
        },
        "StorageClass": "STANDARD"
    }
   ```

   </details>

1. Дождитесь окончания загрузки в объектное хранилище. Вывод команды `aws s3api list-multipart-uploads` не должен содержать данных в блоке `Uploads`.

## 2. Загрузите образ на диск VK Cloud

1. [Подключитесь к ВМ](/ru/computing/iaas/service-management/vm/vm-connect/vm-connect-nix) с помощью SSH.

1. Проверьте наличие подключенного диска с помощью команды `lsblk`.

   <details>
    <summary>Пример вывода команды</summary>

   ```bash
   NAME  MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
   vda   252:0   0  10G  0  disk
   -vda1 252:1   0  10G  0  part /
   vdb   252:16  0  600G 0  disk 
   ```

   </details>

1. Поместите образ на диск с помощью команды:

   ```bash
   wget https://uc_bucket.hb.bizmrg.com/image.raw.gz -O - | gunzip | dd of=/dev/vdb bs=32M
   ```

1. [Пометьте](/ru/computing/iaas/service-management/volumes#izmenenie_atributa_zagruzochnyy) диск с помещенным на него образом ОС как загрузочный.
1. [Замените основной диск](/ru/computing/iaas/service-management/volumes#zamena_osnovnogo_root_diska) ВМ на диск с помещенным на него образом ОС.
1. [Запустите](/ru/computing/iaas/service-management/vm/vm-manage#start_stop_restart_vm) ВМ. Убедитесь, что запуск прошел успешно.

Вы также можете [отключить](/ru/computing/iaas/service-management/volumes#mount_disk) от текущей ВМ диск с помещенным на него образом ОС и использовать его как [замену основного диска](/ru/computing/iaas/service-management/volumes#zamena_osnovnogo_root_diska) другой ВМ.  

## Удалите неиспользуемые ресурсы

Созданные ресурсы тарифицируются и потребляют вычислительные ресурсы. Если они вам больше не нужны:

- [Удалите](/ru/computing/iaas/service-management/vm/vm-manage#delete_vm) или [остановите](/ru/computing/iaas/service-management/vm/vm-manage#start_stop_restart_vm) ВМ.
- [Удалите](../../service-management/buckets/manage-bucket#udalenie_baketa) бакет `uc_bucket`.
- [Удалите](/ru/computing/iaas/service-management/volumes#udalenie_diska) диск.
