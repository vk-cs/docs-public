{includetag(not_bucket_onboarding)}
## {heading(Дайындық қадамдары)[id=preparation]}

1. {linkto(../../../tools-for-using-services/cli/aws-cli#tools-cli-aws)[text=AWS CLI]} орнатылғанына көз жеткізіңіз.
1. VK Object Storage сервисі үшін аккаунт жасаңыз:
{/includetag}

{includetag(bucket_onboarding_only)}
## {heading({counter(bucket)}. VK Object Storage сервисі үшін аккаунт жасаңыз)[id=create_account]}
{/includetag}

   1. VK Cloud жеке кабинетіне [өтіңіз](https://msk.cloud.vk.com/app).
{includetag(not_bucket_onboarding)}
   1. Жобаны таңдаңыз.
{/includetag}
   1. **Object Storage** → **Аккаунттар** бөліміне өтіңіз.
   1. **Аккаунт қосу** немесе **Қосу** түймесін басыңыз.
   1. Аккаунт атауын көрсетіңіз.
   1. **Жасау** түймесін басыңыз.
   1. Ашылған терезеде қол жеткізу кілтінің идентификаторын (**Access Key ID**) және құпия кілтті (**Secret Key**) көшіріп, сақтаңыз.

      {note:warn}
      Терезені жапқаннан кейін құпия кілтті қалпына келтіру мүмкін болмайды. Егер кілт жоғалса, жаңасын жасаңыз.
      {/note}

{includetag(not_bucket_onboarding)}
1. AWS CLI-ді жасалған аккаунтпен жұмыс істеуге баптаңыз:

   1. Команданы орындаңыз:

      ```console
      aws configure
      ```

   1. Қажетті баптауларды көрсетіңіз:

      1. `AWS Access Key ID`: бұрын сақталған **Access Key ID** мәнін енгізіңіз.
      1. `AWS Secret Access Key`: бұрын сақталған **Secret Key** мәнін енгізіңіз.
      1. `Default region name`: `ru-msk` енгізіңіз.
      1. `Default output format`: `json` енгізіңіз.
{/includetag}

## {heading({counter(bucket)}. Бакет жасаңыз)[id=create_bucket]}

{includetag(not_bucket_onboarding)}
1. VK Cloud жеке кабинетіне [өтіңіз](https://msk.cloud.vk.com/app).
{/includetag}
1. **Object Storage** → **Бакеттер** бөліміне өтіңіз.
1. **Жасау** түймесін басыңыз.
1. {linkto(../../../storage/s3/concepts/about#s3-concepts-about-bucket-naming)[text=ұсынылатын ережелерге]} сәйкес бакет атауын енгізіңіз.

   Бакет жасалғаннан кейін оның атауын өзгерту мүмкін болмайды.

1. {linkto(../../../storage/s3/concepts/about#s3-concepts-about-storage-class)[text=сақтау класын]} таңдаңыз. Кейін оны {linkto(../../../storage/s3/instructions/change-storage-class#s3-instructions-change-storage-class-bucket)[text=өзгерте аласыз]}.
1. **Бакет жасау** түймесін басыңыз.

{includetag(not_bucket_onboarding)}
## {heading({counter(bucket)}. Private ACL баптауларымен объект қосып, оған қол жеткізуді беріңіз)[id=create_private_object]}

1. Объект қосыңыз:

   1. VK Cloud жеке кабинетіне [өтіңіз](https://msk.cloud.vk.com/app).
   1. Жасалған бакет орналасқан жобаны таңдаңыз.
   1. **Object Storage** → **Бакеттер** бөліміне өтіңіз.
   1. Жасалған бакеттің атауын басыңыз.
   1. **Файл қосу** түймесін басыңыз.
   1. ACL `Private` баптауы таңдалғанына көз жеткізіңіз.
   1. **Файлдарды таңдау** түймесін басып, бакетке жүктеу керек файлды таңдаңыз.

1. Жүктелген объектіге уақытша {linkto(../../../storage/s3/concepts/access/signed-url#s3-concepts-signed-url)[text=қолтаңбаланған сілтеме]} арқылы қол жеткізуді беріңіз:

   1. Private ACL баптауларымен объектіге қол жеткізу үшін уақытша сілтемені келесі команданы орындап жасаңыз:

      ```console
      aws s3 presign s3://<ИМЯ_БАКЕТА>/<КЛЮЧ_ОБЪЕКТА> --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
      ```

      Мұнда:

      - `<ИМЯ_БАКЕТА>` — файл жүктелген бакеттің атауы.
      - `<КЛЮЧ_ОБЪЕКТА>` — {linkto(../../../storage/s3/concepts/about#s3-concepts-about-object-key)[text=объект кілті]}. Бұл сценарийде кілт жүктелген объектінің атауымен бірдей.

      {cut(Мысал)}

      `my-cloud-bucket` бакетіне `cat_image_private_acl.png` объектісі жүктелсін.

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
      Мұндай сілтеме шектеулі уақыт бойы жарамды (әдепкі бойынша 1 сағат). Осы уақыт өткеннен кейін объектіге жаңа сілтеме жасау қажет болады.
      {/note}
{/includetag}

## {heading({counter(bucket)}. Public ACL баптауларымен объект қосып, оған қол жеткізуді беріңіз)[id=create_public_object]}

1. Объект қосыңыз:

{includetag(not_bucket_onboarding)}
   1. VK Cloud жеке кабинетіне [өтіңіз](https://msk.cloud.vk.com/app).
   1. Жасалған бакет орналасқан жобаны таңдаңыз.
   1. **Object Storage** → **Бакеттер** бөліміне өтіңіз.
{/includetag}
   1. Жасалған бакеттің атауын басыңыз.
   1. **Файл қосу** түймесін басыңыз.
   1. ACL `Public-read` баптауын таңдаңыз.
   1. **Файлдарды таңдау** түймесін басып, бакетке жүктеу үшін кез келген файлды таңдаңыз.

1. Жүктелген объектіге тікелей сілтеме арқылы қол жеткізуді беріңіз:

{includetag(not_bucket_onboarding)}
   1. VK Cloud жеке кабинетіне [өтіңіз](https://msk.cloud.vk.com/app).
   1. Жасалған бакет орналасқан жобаны таңдаңыз.
   1. **Object Storage** → **Бакеттер** бөліміне өтіңіз.
   1. Жасалған бакеттің атауын басыңыз.
{/includetag}
   1. Бұрын жүктелген объект үшін ![ ](../../../assets/more-icon.svg "inline") түймесін басып, **Файлға қол жеткізу** тармағын таңдаңыз.
   1. Жасалған тікелей сілтемені сақтаңыз.

      Сілтеме келесі түрде болады:

      ```https
      https://<ИМЯ_БАКЕТА>.hb.ru-msk.vkcloud-storage.ru/...
      ```

## {heading({counter(bucket)}. Объектіге қол жеткізуді тексеріңіз)[id=access_check]}

{includetag(not_bucket_onboarding)}
1. Браузерде жасалған уақытша сілтеме бойынша өтіңіз. {linkto(#create_private_object)[text=бұрын Private ACL баптауларымен қосылған]} объект жүктелуі тиіс.
1. {/includetag}Браузерде жасалған тікелей сілтеме бойынша өтіңіз. {linkto(#create_public_object)[text=бұрын Public ACL баптауларымен қосылған]} объект жүктелуі тиіс.

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=delete_unused]}

Бакет және оған жүктелген объектілер {linkto(../../../storage/s3/tariffication#s3-tariffication)[text=тарифтеледі]}. Егер олар сізге енді қажет болмаса:

1. {linkto(../../../storage/s3/instructions/objects/manage-object#s3-instructions-manage-object-delete)[text=Объектілерді жойыңыз]}.
1. {linkto(../../../storage/s3/instructions/buckets/manage-bucket#s3-instructions-manage-bucket-delete)[text=Бакетті жойыңыз]}.