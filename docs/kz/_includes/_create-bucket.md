{includetag(not_bucket_onboarding)}
## {heading(Дайындық қадамдары)[id=preparation]}

1. [AWS CLI](/kz/tools-for-using-services/cli/aws-cli) орнатылғанына көз жеткізіңіз.
1. VK Object Storage сервисі үшін аккаунт жасаңыз:
{/includetag}

{includetag(bucket_onboarding_only)}
## {heading({counter(bucket)}. VK Object Storage сервисі үшін аккаунт жасаңыз)[id=create_account]}
{/includetag}

   1. [Өтіңіз](https://kz.cloud.vk.com/app) VK Cloud жеке кабинетіне.
{includetag(not_bucket_onboarding)}
   1. Жобаны таңдаңыз.
{/includetag}
   1. **Object Storage → Аккаунттар** бөліміне өтіңіз.
   1. **Аккаунт қосу** немесе **Қосу** батырмасын басыңыз.
   1. Аккаунт атауын беріңіз.
   1. **Жасау** батырмасын басыңыз.
   1. Ашылған терезеде қатынас кілтінің идентификаторын (**Access Key ID**) және құпия кілтті (**Secret Key**) көшіріп, сақтаңыз.

      {note:warn}
      Терезе жабылғаннан кейін құпия кілтті қалпына келтіру мүмкін болмайды. Егер кілт жоғалса, жаңасын жасаңыз.
      {/note}

{includetag(not_bucket_onboarding)}
1. AWS CLI-ді жасалған аккаунтпен жұмыс істеуге баптаңыз:

   1. Команданы орындаңыз:

      ```console
      aws configure
      ```

   1. Қажетті параметрлерді орнатыңыз:

      1. `AWS Access Key ID`: бұрын сақталған **Access Key ID** мәнін енгізіңіз.
      1. `AWS Secret Access Key`: бұрын сақталған **Secret Key** мәнін енгізіңіз.
      1. `Default region name`: `ru-msk` енгізіңіз.
      1. `Default output format`: `json` енгізіңіз.
{/includetag}

## {heading({counter(bucket)}. Бакет жасаңыз)[id=create_bucket]}

{includetag(not_bucket_onboarding)}
1. [Өтіңіз](https://kz.cloud.vk.com/app) VK Cloud жеке кабинетіне.
{/includetag}
1. **Object Storage** → **Бакеттер** бөліміне өтіңіз.
1. **Жасау** батырмасын басыңыз.
1. [Ұсынылған ережелерге](/kz/storage/s3/concepts/about#bucket_naming) сәйкес келетін бакет атауын енгізіңіз.

   Бакет жасалғаннан кейін оның атауын өзгерту мүмкін болмайды.

1. [Сақтау класын](/kz/storage/s3/concepts/about#storage_class) таңдаңыз. Оны кейінірек [өзгерте аласыз](/kz/storage/s3/instructions/change-storage-class).
1. **Бакет жасау** батырмасын басыңыз.

{includetag(not_bucket_onboarding)}
## {heading({counter(bucket)}. ACL жеке баптаулары бар объектіні қосып, оған қолжетімділік беріңіз)[id=create_private_object]}

1. Объектіні қосыңыз:

   1. [Өтіңіз](https://kz.cloud.vk.com/app) VK Cloud жеке кабинетіне.
   1. Жасалған бакет орналасқан жобаны таңдаңыз.
   1. **Object Storage → Бакеттер** бөліміне өтіңіз.
   1. Жасалған бакеттің атауын басыңыз.
   1. **Файл қосу** батырмасын басыңыз.
   1. `Private` ACL баптауы таңдалғанына көз жеткізіңіз.
   1. **Файлдарды таңдау** батырмасын басып, бакетке жүктеу қажет файлды таңдаңыз.

1. Жүктелген объектіге уақытша [қол қойылған сілтеме](/kz/storage/s3/concepts/access/signed-url) арқылы қолжетімділік беріңіз:

   1. Команданы орындап, ACL жеке баптаулары бар объектіге қолжетімділікке арналған уақытша сілтемені жасаңыз:

      ```console
      aws s3 presign s3://<ИМЯ_БАКЕТА>/<КЛЮЧ_ОБЪЕКТА> --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
      ```

      Мұнда:

      - `<ИМЯ_БАКЕТА>` — файл жүктелген бакеттің атауы.
      - `<КЛЮЧ_ОБЪЕКТА>` — [объект кілті](/kz/storage/s3/concepts/about#object_key). Бұл сценарийде кілт жүктелген объектінің атауымен сәйкес келеді.

      {cut(Мысал)}

      `my-cloud-bucket` бакетіне `cat_image_private_acl.png` объектісі жүктелді делік.

      Онда команда мынадай болады:

      ```console
      aws s3 presign s3://my-cloud-bucket/cat_image_private_acl.png --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
      ```

      {/cut}

   1. Жасалған уақытша сілтемені сақтаңыз.

      Сілтеме келесі түрде болады:

      ```https
      https://hb.ru-msk.vkcloud-storage.ru/<ИМЯ_БАКЕТА>/...?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=...%2F...%2Fru-msk%2Fs3%2Faws4_request&X-Amz-Date=...&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=...
      ```

      {note:info}
      Мұндай сілтеме шектеулі уақыт ішінде жарамды болады (әдепкі бойынша 1 сағат). Осы уақыт өткеннен кейін объектіге жаңа сілтеме жасау қажет болады.
      {/note}
{/includetag}

## {heading({counter(bucket)}. ACL жария баптаулары бар объектіні қосып, оған қолжетімділік беріңіз)[id=create_public_object]}

1. Объектіні қосыңыз:

{includetag(not_bucket_onboarding)}
   1. [Өтіңіз](https://kz.cloud.vk.com/app) VK Cloud жеке кабинетіне.
   1. Жасалған бакет орналасқан жобаны таңдаңыз.
   1. **Object Storage → Бакеттер** бөліміне өтіңіз.
{/includetag}
   1. Жасалған бакеттің атауын басыңыз.
   1. **Файл қосу** батырмасын басыңыз.
   1. `Public-read` ACL баптауын таңдаңыз.
   1. **Файлдарды таңдау** батырмасын басып, жүктеу үшін кез келген файлды таңдаңыз.

1. Жүктелген объектіге тікелей сілтеме арқылы қолжетімділік беріңіз:

{includetag(not_bucket_onboarding)}
   1. [Өтіңіз](https://kz.cloud.vk.com/app) VK Cloud жеке кабинетіне.
   1. Жасалған бакет орналасқан жобаны таңдаңыз.
   1. **Object Storage → Бакеттер** бөліміне өтіңіз.
   1. Жасалған бакеттің атауын басыңыз.
{/includetag}
   1. Бұрын жүктелген объекті үшін ![ ](/kz/assets/more-icon.svg "inline") белгішесін басып, **Файлға қолжетімділік** тармағын таңдаңыз.
   1. Жасалған тікелей сілтемені сақтаңыз.

      Сілтеме келесі түрде болады:

      ```https
      https://<ИМЯ_БАКЕТА>.hb.ru-msk.vkcloud-storage.ru/...
      ```

## {heading({counter(bucket)}. Объектіге қолжетімділікті тексеріңіз)[id=access_check]}

{includetag(not_bucket_onboarding)}
1. Браузерде жасалған уақытша сілтеме бойынша өтіңіз. [Бұрын ACL жеке баптауларымен қосылған](#create_private_object) объект жүктелуі тиіс.

1. {/includetag}Браузерде жасалған тікелей сілтеме бойынша өтіңіз. [Бұрын ACL жария баптауларымен қосылған](#create_public_object) объект жүктелуі тиіс.

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=delete_unused]}

Бакет және оған жүктелген объектілер [тарификацияланады](/kz/storage/s3/tariffication). Егер олар енді қажет болмаса:

1. [Объектілерді жойыңыз](/kz/storage/s3/instructions/objects/manage-object#udalenie_obekta).
1. [Бакетті жойыңыз](/kz/storage/s3/instructions/buckets/manage-bucket#bucket_delete).
