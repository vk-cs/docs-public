# {heading(Үлкен көлемді ОС бейнесінен диск жасау)[id=s3-load-large-image]}

{include(/kz/_includes/_translated_by_ai.md)}

{var(cloud)} ішінде жүктелетін операциялық жүйе бейнелерінің өлшеміне {linkto(../../../../tools-for-using-services/account/concepts/quotasandlimits#quotasandlimits-s3)[text=шектеулер қолданылады]}. Лимит асып кеткен кезде мына түрдегі хабарлама пайда болады:

```txt
HttpException: 413: Client Error for url: https://infra.mail.ru:9292/v2/images/1f06dce4-XXXX-444c-bcaa-896ed69023c1/file, Request Entity Too Large
```

Төменде {var(cloud)} объектілік қоймасы арқылы өлшемі 500 ГБ-тан үлкен ОС бейнесінен диск жасау қарастырылған.

Қолданылатындар:

- өлшемі кемінде 500 ГБ болатын виртуалды машина;
- Linux тұқымдас жергілікті машина, онда:

  - [gzip](https://www.gnu.org/software/gzip/manual/gzip.html) утилитасы орнатылған;
  - өлшемі кемінде 500 ГБ болатын `image.raw` ОС бейне файлы бар.

## {heading(Дайындық қадамдары)[id=s3-load-large-image-prepare]}

1. {linkto(../../instructions/access-management/access-keys#s3-instructions-access-keys)[text=аккаунт]} және `uc_bucket` {linkto(../../instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=бакетін]} жасаңыз.
1. AWS CLI {linkto(../../connect/s3-cli#s3-connect-cli)[text=орнатылған және бапталған]} екеніне көз жеткізіңіз. Онда бакетке қосылу деректерін (`Access key ID` және `Secret key`) көрсетіңіз. `~/.aws/config` конфигурациялық файлын ашып, оған өзгерістер енгізіңіз:

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

1. {var(cloud)} бұлтында Ubuntu 22.04 ВМ {linkto(../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=жасаңыз]}.
1. ВМ-ге [gzip](https://www.gnu.org/software/gzip/manual/gzip.html) утилитасын орнатыңыз.
1. Өлшемі кемінде 600 ГБ диск {linkto(../../../../computing/iaas/instructions/volumes/volumes-create#iaas-volumes-create)[text=жасаңыз]} және оны ВМ-ге {linkto(../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect-mount-disk)[text=қосыңыз]}.

## {heading(1. Бейнені жергілікті машинадан объектілік қоймаға жүктеңіз)[id=s3-load-large-image-download]}

1. Жергілікті машинада команданы орындаңыз:

   ```console
   dd if=./image.raw bs=32M | gzip -c | aws s3 cp - s3://uc_bucket/image.raw.gz --endpoint-url http://hb.ru-msk.vkcloud-storage.ru
   ```

1. Жүктеу басталғанын мына команда арқылы тексеріңіз:

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

1. Партицияларды мына команда арқылы тексеріңіз:

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

1. Объектілік қоймаға жүктеудің аяқталуын күтіңіз. `aws s3api list-multipart-uploads` командасының шығысында `Uploads` блогында деректер болмауы тиіс.

## {heading(2. Бейнені {var(cloud)} дискісіне жүктеңіз)[id=s3-load-large-image-download-on-volume]}

1. SSH көмегімен {linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=ВМ-ге қосылыңыз]}.
1. `lsblk` командасы арқылы қосылған дискінің бар-жоғын тексеріңіз.

   {cut(Команда шығысының мысалы)}

   ```console
   NAME  MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
   vda   252:0   0  10G  0  disk
   -vda1 252:1   0  10G  0  part /
   vdb   252:16  0  600G 0  disk
   ```

   {/cut}

1. Бейнені дискіге мына команда арқылы жазыңыз:

   ```console
   wget https://uc_bucket.hb.ru-msk.vkcloud-storage.ru/image.raw.gz -O - | gunzip | dd of=/dev/vdb bs=32M
   ```

1. ОС бейнесі жазылған дискіні жүктелетін ретінде {linkto(../../../../computing/iaas/instructions/volumes/volumes-manage#iaas-volumes-manage-changing-bootable-attribute)[text=белгілеңіз]}.
1. ВМ-нің root-дискін ОС бейнесі жазылған дискіге {linkto(../../../../computing/iaas/instructions/vm/vm-root-replace#iaas-vm-root-replace)[text=ауыстырыңыз]}.
1. ВМ-ді {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=іске қосыңыз]}. Іске қосу сәтті өткеніне көз жеткізіңіз.

Сондай-ақ ОС бейнесі жазылған дискіні ағымдағы ВМ-нен {linkto(../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect-mount-disk)[text=ажыратып]}, оны басқа ВМ үшін {linkto(../../../../computing/iaas/instructions/vm/vm-root-replace#iaas-vm-root-replace)[text=root-дискіні ауыстыру]} ретінде пайдалануға болады.  

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=s3-load-large-image-delete]}

Жасалған ресурстар тарифтеледі және есептеу ресурстарын тұтынады. Егер олар сізге енді қажет болмаса:

- ВМ-ді {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete)[text=жойыңыз]} немесе {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=тоқтатыңыз]}.
- `uc_bucket` бакетін {linkto(../../instructions/buckets/manage-bucket#s3-instructions-manage-bucket-delete)[text=жойыңыз]}.
- Дискіні {linkto(../../../../computing/iaas/instructions/volumes/volumes-manage#iaas-volumes-manage-delete)[text=жойыңыз]}.
