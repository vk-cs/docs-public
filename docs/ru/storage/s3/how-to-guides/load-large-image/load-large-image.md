# {heading(Создание диска из образа ОС большого объема)[id=s3-load-large-image]}

В {var(cloud)} {linkto(../../../../tools-for-using-services/account/concepts/quotasandlimits#quotasandlimits-s3)[text=действуют ограничения]} на размер загружаемых образов операционных систем. При превышении лимита появляется сообщение вида:

```txt
HttpException: 413: Client Error for url: https://infra.mail.ru:9292/v2/images/1f06dce4-XXXX-444c-bcaa-896ed69023c1/file, Request Entity Too Large
```

Далее рассмотрено создание диска из образа ОС размером более 500 ГБ через объектное хранилище {var(cloud)}.

Будут использоваться:

- виртуальная машина размером не менее 500 ГБ;
- локальная машина семейства Linux, на которой:

  - установлена утилита [gzip](https://www.gnu.org/software/gzip/manual/gzip.html);
  - имеется файл образа ОС `image.raw` размером не менее 500 ГБ.

## {heading(Подготовительные шаги)[id=s3-load-large-image-prepare]}

1. Создайте {linkto(../../instructions/access-management/access-keys#s3-instructions-access-keys)[text=аккаунт]} и {linkto(../../instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=бакет]} `uc_bucket`.
1. Убедитесь, что у вас {linkto(../../connect/s3-cli#s3-connect-cli)[text=установлен и настроен]} AWS CLI. Укажите в нем данные для подключения к бакету (`Access key ID` и `Secret key`). Откройте конфигурационный файл `~/.aws/config` и внесите в него изменения:

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

1. {linkto(../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=Создайте]} ВМ Ubuntu 22.04 в облаке {var(cloud)}.
1. Установите на ВМ утилиту [gzip](https://www.gnu.org/software/gzip/manual/gzip.html).
1. {linkto(../../../../computing/iaas/instructions/volumes/volumes-create#iaas-volumes-create)[text=Создайте]} диск размером не менее 600 ГБ и {linkto(../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect-mount-disk)[text=подключите]} его к ВМ.

## {heading(1. Загрузите образ из локальной машины в объектное хранилище)[id=s3-load-large-image-download]}

1. На локальной машине выполните команду:

   ```console
   dd if=./image.raw bs=32M | gzip -c | aws s3 cp - s3://uc_bucket/image.raw.gz --endpoint-url http://hb.ru-msk.vkcloud-storage.ru
   ```

1. Убедитесь, что загрузка началась, с помощью команды:

   ```console
   aws s3api list-multipart-uploads --bucket uc_bucket --endpoint-url http://hb.ru-msk.vkcloud-storage.ru
   ```

   {cut(Пример вывода команды)}

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

   {/cut}

1. Проверьте партиции с помощью команды:

   ```console
   aws s3api list-parts --bucket uc_bucket --endpoint-url http://hb.ru-msk.vkcloud-storage.ru --key image.raw.gz  --upload-id 3ceXH7brs7r8DohqQ9BsJzfjkkhMxQux67Z8MQXYGh9BvfrmffLufWMzwiLWPbU3XkWE3ibSefgQ1GU81ER66EEHfKMZM8xxqRsDkBaN63XXXX
   ```

   {cut(Пример вывода команды)}

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

   {/cut}

1. Дождитесь окончания загрузки в объектное хранилище. Вывод команды `aws s3api list-multipart-uploads` не должен содержать данных в блоке `Uploads`.

## {heading(2. Загрузите образ на диск {var(cloud)})[id=s3-load-large-image-download-on-volume]}

1. {linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=Подключитесь к ВМ]} с помощью SSH.
1. Проверьте наличие подключенного диска с помощью команды `lsblk`.

   {cut(Пример вывода команды)}

   ```console
   NAME  MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
   vda   252:0   0  10G  0  disk
   -vda1 252:1   0  10G  0  part /
   vdb   252:16  0  600G 0  disk
   ```

   {/cut}

1. Поместите образ на диск с помощью команды:

   ```console
   wget https://uc_bucket.hb.ru-msk.vkcloud-storage.ru/image.raw.gz -O - | gunzip | dd of=/dev/vdb bs=32M
   ```

1. {linkto(../../../../computing/iaas/instructions/volumes/volumes-manage#iaas-volumes-manage-changing-bootable-attribute)[text=Пометьте]} диск с помещенным на него образом ОС как загрузочный.
1. {linkto(../../../../computing/iaas/instructions/vm/vm-root-replace#iaas-vm-root-replace)[text=Замените root-диск]} ВМ на диск с помещенным на него образом ОС.
1. {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=Запустите]} ВМ. Убедитесь, что запуск прошел успешно.

Вы также можете {linkto(../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect-mount-disk)[text=отключить]} от текущей ВМ диск с помещенным на него образом ОС и использовать его как {linkto(../../../../computing/iaas/instructions/vm/vm-root-replace#iaas-vm-root-replace)[text=замену root-диска]} другой ВМ.  

## {heading(Удалите неиспользуемые ресурсы)[id=s3-load-large-image-delete]}

Созданные ресурсы тарифицируются и потребляют вычислительные ресурсы. Если они вам больше не нужны:

- {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete)[text=Удалите]} или {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=остановите]} ВМ.
- {linkto(../../instructions/buckets/manage-bucket#s3-instructions-manage-bucket-delete)[text=Удалите]} бакет `uc_bucket`.
- {linkto(../../../../computing/iaas/instructions/volumes/volumes-manage#iaas-volumes-manage-delete)[text=Удалите]} диск.
