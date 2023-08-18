В VK Cloud [действуют ограничения](/ru/base/account/concepts/quotasandlimits) на размер загружаемых образов операционных систем. При превышении лимита появляется сообщение вида:

```txt
An error occurred (InvalidArgument) when calling the UploadPart operation: Part number must be an integer between 1 and 10000, inclusive
```

Далее рассмотрена загрузка образов размером более 500 ГБ через объектное хранилище VK Cloud.

Будут использоваться:

- виртуальная машина размером не менее 500 ГБ;
- локальная машина семейства Linux с установленной утилитой [gzip](https://www.gnu.org/software/gzip/manual/gzip.html).

## 1. Подготовительные шаги

1. Проверьте возможность миграции. Виртуальная машина должна соответствовать следующим требованиям:

   - операционная система ВМ имеет 64-битную архитектуру;
   - текущий пользователь обладает правами администратора;
   - к ВМ подключен хотя бы один диск;
   - ВМ использует эмуляцию BIOS.

   Для [миграции](/ru/additionals/migration/) ВМ с эмуляцией UEFI используйте Hystax или перенесите данные на новую виртуальную машину с эмуляцией BIOS.

1. Создайте [аккаунт](/ru/base/s3/access-management/s3-account) и [бакет](/ru/base/s3/buckets/create-bucket) `uc_bucket`.
1. Убедитесь, что у вас [установлен и настроен](/ru/base/s3/tools/s3-cli) AWS CLI. Укажите в нем данные для подключения к бакету (`Access key ID` и `Secret key`). Откройте конфигурационный файл `~/.aws/config` и внесите в него изменения:

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

1. [Создайте](/ru/base/iaas/instructions/vm/vm-create) ВМ Ubuntu 22.04 в облаке VK Cloud.
1. Установите на ВМ утилиту [gzip](https://www.gnu.org/software/gzip/manual/gzip.html).
1. [Создайте](/ru/base/iaas/instructions/vm-volumes#sozdanie_diska) диск размером не менее 600 ГБ и [подключите](/ru/base/iaas/instructions/vm-volumes#podklyuchenie_diska_k_vm) его к ВМ.

## 2. Загрузите образ в объектное хранилище

1. Выполните команду:

   ```bash
   dd if=/dev/vdX bs=32M | gzip -c | aws s3 cp - s3://uc_bucket/image.raw.gz --endpoint-url http://hb.ru-msk.vkcs.cloud
   ```

1. Убедитесь, что загрузка началась, с помощью команды:

   ```bash
   aws s3api list-multipart-uploads --bucket uc_bucket --endpoint-url http://hb.ru-msk.vkcs.cloud
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
   aws s3api list-parts --bucket uc_bucket --endpoint-url http://hb.ru-msk.vkcs.cloud --key image.raw.gz  --upload-id 3ceXH7brs7r8DohqQ9BsJzfjkkhMxQux67Z8MQXYGh9BvfrmffLufWMzwiLWPbU3XkWE3ibSefgQ1GU81ER66EEHfKMZM8xxqRsDkBaN63XXXX
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

1. Дождитесь загрузки в объектное хранилище. Вывод команды `aws s3api list-multipart-uploads` не должен содержать данных в блоке `Uploads`.

## 3. Загрузите образ на диск VK Cloud

1. [Подключитесь к ВМ](/ru/base/iaas/instructions/vm/vm-connect/vm-connect-nix) с помощью SSH.
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

1. Переместите образ на диск с помощью команды:

   ```bash
   wget https://uc_bucket.hb.bizmrg.com/image.raw.gz -O /dev/vdb/image.raw.gz
   ```

1. Распакуйте образ с помощью команды:

   ```bash
   gunzip -c image.raw.gz | dd of=/dev/vdb bs=32M
   ```

## 4. Создайте образ из диска

Воспользуйтесь [инструкцией](/ru/base/iaas/instructions/vm-images/vm-images-manage#sozdanie_obraza).

## 5. Проверьте работоспособность образа

Создайте ВМ, выбрав в качестве операционной системы загруженный образ, согласно [инструкции](/ru/base/iaas/instructions/vm/vm-create).

## Удалите неиспользуемые ресурсы

Созданные ресурсы тарифицируются и потребляют вычислительные ресурсы. Если они вам больше не нужны:

- [Удалите](/ru/base/iaas/instructions/vm-images/vm-images-manage#udalenie_obraza) загруженный образ из объектного хранилища.
- [Удалите](/ru/base/iaas/instructions/vm/vm-manage#udalenie_vm) или [остановите](/ru/base/iaas/instructions/vm/vm-manage#zapusk_ostanovka_perezagruzka_vm) ВМ.
- [Удалите](/ru/base/iaas/instructions/vm-volumes#udalenie_diska) диск.
