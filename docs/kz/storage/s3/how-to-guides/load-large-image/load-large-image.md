{include(/kz/_includes/_translated_by_ai.md)}

VK Cloud жүйесінде [жүктелетін операциялық жүйе образдарының өлшеміне шектеулер қолданылады](/kz/tools-for-using-services/account/concepts/quotasandlimits). Лимиттен асқан кезде мынадай хабарлама пайда болады:

```txt
HttpException: 413: Client Error for url: https://infra.mail.ru:9292/v2/images/1f06dce4-XXXX-444c-bcaa-896ed69023c1/file, Request Entity Too Large
```

Төменде VK Cloud объектілік сақтау қоймасы арқылы көлемі 500 ГБ-тан асатын ОС образынан диск жасау қарастырылады.

Пайдаланылатындар:

- көлемі кемінде 500 ГБ виртуалды машина;
- Linux тобына жататын жергілікті машина, онда:

  - [gzip](https://www.gnu.org/software/gzip/manual/gzip.html) утилитасы орнатылған;
  - көлемі кемінде 500 ГБ болатын `image.raw` ОС образының файлы бар.

## Дайындық қадамдары

1. [Аккаунт](../../instructions/access-management/access-keys) пен `uc_bucket` [бакетін](../../instructions/buckets/create-bucket) жасаңыз.
1. AWS CLI [орнатылғанына және бапталғанына](../../connect/s3-cli) көз жеткізіңіз. Онда бакетке қосылу деректерін (`Access key ID` және `Secret key`) көрсетіңіз. `~/.aws/config` конфигурация файлын ашып, оған өзгерістер енгізіңіз:

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

1. VK Cloud бұлтында Ubuntu 22.04 жүйесі бар [ВМ жасаңыз](/kz/computing/iaas/instructions/vm/vm-create).
1. ВМ-ге [gzip](https://www.gnu.org/software/gzip/manual/gzip.html) утилитасын орнатыңыз.
1. Көлемі кемінде 600 ГБ [диск жасаңыз](/kz/computing/iaas/instructions/volumes/volumes-create) және оны ВМ-ге [қосыңыз](/kz/computing/iaas/instructions/volumes/volumes-connect#mount_disk).

## 1. Образды жергілікті машинадан объектілік сақтау қоймасына жүктеңіз

1. Жергілікті машинада команданы орындаңыз:

   ```console
   dd if=./image.raw bs=32M | gzip -c | aws s3 cp - s3://uc_bucket/image.raw.gz --endpoint-url http://hb.ru-msk.vkcloud-storage.ru
   ```

1. Келесі команда арқылы жүктеудің басталғанына көз жеткізіңіз:

   ```console
   aws s3api list-multipart-uploads --bucket uc_bucket --endpoint-url http://hb.ru-msk.vkcloud-storage.ru
   ```

   {cut(Команда шығысының мысалы)}

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

1. Келесі команда арқылы бөліктерді тексеріңіз:

   ```console
   aws s3api list-parts --bucket uc_bucket --endpoint-url http://hb.ru-msk.vkcloud-storage.ru --key image.raw.gz  --upload-id 3ceXH7brs7r8DohqQ9BsJzfjkkhMxQux67Z8MQXYGh9BvfrmffLufWMzwiLWPbU3XkWE3ibSefgQ1GU81ER66EEHfKMZM8xxqRsDkBaN63XXXX
   ```

   {cut(Команда шығысының мысалы)}

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

1. Объектілік сақтау қоймасына жүктеу аяқталғанша күтіңіз. `aws s3api list-multipart-uploads` командасының шығысында `Uploads` блогында деректер болмауы керек.

## 2. Образды VK Cloud дискісіне жүктеңіз

1. SSH арқылы [ВМ-ге қосылыңыз](/kz/computing/iaas/instructions/vm/vm-connect/vm-connect-nix).

1. `lsblk` командасының көмегімен қосылған дискінің бар-жоғын тексеріңіз.

   {cut(Команда шығысының мысалы)}

   ```console
   NAME  MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
   vda   252:0   0  10G  0  disk
   -vda1 252:1   0  10G  0  part /
   vdb   252:16  0  600G 0  disk
   ```

   {/cut}

1. Келесі команда арқылы образды дискіге орналастырыңыз:

   ```console
   wget https://uc_bucket.hb.ru-msk.vkcloud-storage.ru/image.raw.gz -O - | gunzip | dd of=/dev/vdb bs=32M
   ```

1. ОС образы орналастырылған дискіні [жүктелетін ретінде белгілеңіз](/kz/computing/iaas/instructions/volumes/volumes-manage#changing_bootable_attribute).
1. ВМ-нің root дискін ОС образы орналастырылған дискке [ауыстырыңыз](/kz/computing/iaas/instructions/vm/vm-root-replace).
1. ВМ-ді [іске қосыңыз](/kz/computing/iaas/instructions/vm/vm-manage#start_stop_restart_vm). Іске қосу сәтті өткеніне көз жеткізіңіз.

Сондай-ақ ОС образы орналастырылған дискіні ағымдағы ВМ-нен [ажыратып](/kz/computing/iaas/instructions/volumes/volumes-connect#mount_disk), оны басқа ВМ үшін [root дискіні ауыстыру](/kz/computing/iaas/instructions/vm/vm-root-replace) ретінде пайдалана аласыз.  

## Пайдаланылмайтын ресурстарды жойыңыз

Жасалған ресурстар тарифтелмейді және есептеу ресурстарын тұтынады. Егер олар енді қажет болмаса:

- ВМ-ді [жойыңыз](/kz/computing/iaas/instructions/vm/vm-manage#delete_vm) немесе [тоқтатыңыз](/kz/computing/iaas/instructions/vm/vm-manage#start_stop_restart_vm).
- `uc_bucket` [бакетін жойыңыз](../../instructions/buckets/manage-bucket#bucket_delete).
- [Дискіні жойыңыз](/kz/computing/iaas/instructions/volumes/volumes-manage#delete_volume).
