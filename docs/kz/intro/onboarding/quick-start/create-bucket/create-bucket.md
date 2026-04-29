{include(/kz/_includes/_translated_by_ai.md)}

# {heading(VK Object Storage: объектілік қоймада бакет жасаңыз және оған деректерді жүктеңіз)[id=onboarding-create-bucket]}

[VK Object Storage](/kz/storage/s3/concepts/about) — S3 API қолдауы бар объектілік қойма, ол кез келген объектілерді бір мезгілдегі сұраулар санына қарамастан сенімді масштабталатын сақтауды және тұрақты тарату жылдамдығын қамтамасыз етеді. VK Object Storage мультимедианы ағынмен тарату, сайттарды хостингтеу және сан алуан деректерді сақтау үшін пайдаланылуы мүмкін.

VK Object Storage сервисімен [жұмысты](https://cloud.vk.com/storage/) кез келген ыңғайлы тәсілмен бастаңыз:

- {linkto(#create_bucket)[text=Нұсқаулықты]} пайдаланыңыз, бакет жасаңыз, оған объект жүктеңіз және жүктелген объектіге сілтеме арқылы қолжетімділік беріңіз.
- API арқылы бакетті басқаруға мүмкіндік беретін аккаунт жасалатын, бакет жасалып, оған қолжетімділік бапталатын және бакет баптаулары көрсетілетін қысқа {linkto(#video_create_bucket)[text=бейнені]} қараңыз.
- Тегін курстың [сабағынан](https://cloud.vk.com/cloud-native-courses/advanced/cloud-storage-s3/) өтіңіз. Сабақтың теориялық бөлігінде VK Object Storage сервисінің жалпы сипаттамалары, компоненттері мен функциялары қарастырылады. Практикалық бөлікте сіз бакет жасап, медиафайлдарды сақтау үшін оны Wordpress-ке қосасыз.
- VK Object Storage-пен жұмыс туралы {linkto(#webinars_bucket)[text=вебинарларды]} қараңыз.

{note:info}
Жеке кабинет интерфейсі бейнеде және сабақта көрсетілгеннен өзгеше болуы мүмкін. 
{/note}

## {heading(Бакет жасаңыз және оған объект орналастырыңыз)[id=create_bucket]}

Осы нұсқаулықтың барлық қадамдарынан өткен соң, сіз:

1. [VK Object Storage сервисі үшін](#create_account) аккаунт жасайсыз.
1. [Бакет](#create_bucket) жасайсыз.
1. ACL жария баптаулары бар [объектіні](#create_public_object) қосып, оған сілтеме арқылы қолжетімділік бересіз.
1. [Объектіге](#access_check) қолжетімділікті тексересіз.

{include(/kz/_includes/_create-bucket.md)[tags=bucket_onboarding_only; level=+1]}

## {heading(Бейненұсқаулық)[id=video_bucket]}

Бұл бейнеде API арқылы бакетті басқаруға мүмкіндік беретін аккаунт жасалады, бакет жасалып, оған қолжетімділік бапталады, сондай-ақ VK Cloud жеке кабинетіндегі бакет баптаулары көрсетіледі.

{caption()[id=position=above;align=right;id=video_create_bucket]}
{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239414&hd=3)[type=vkvideo]}
{/caption}

## {heading(Оқыту курсы)[id=courses_bucket]}

Тегін курстың [сабағынан](https://cloud.vk.com/cloud-native-courses/advanced/cloud-storage-s3/) өтіңіз.

Сабақтың теориялық бөлігінде VK Object Storage сервисінің жалпы сипаттамалары, компоненттері мен функциялары қарастырылады. Практикалық бөлікте сіз бакет жасап, медиафайлдарды сақтау үшін оны Wordpress-ке қосасыз.

## {heading(Вебинарлар)[id=webinars_bucket]}

### Объектілік қоймамен жұмысты қалай бастау керек

Сіз бакеттерді қалай жасау керектігін, қолжетімділіктерді қалай басқаруды, кірістірілген қауіпсіздік тетіктерінің көмегімен ақпаратты қалай қорғауды және VK Object Storage-ты басқа бұлттық өнімдермен қалай интеграциялауды білесіз.

{cut(Вебинар жазбасы)}
{caption()[id=position=above;align=right;id=video_bucket_begin]}
{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239395&hd=3)[type=vkvideo]}
{/caption}
{/cut}

### Тиімді және орнықты объектілік қойманы қалай құруға болады

Вебинар VK Object Storage-тың техникалық ерекшеліктерін, архитектурасын, деректерді қорғауды және басқа сервистермен интеграциясын түсінуге көмектеседі.

{cut(Вебинар жазбасы)}
{caption()[id=position=above;align=right;id=video_bucket_effective]}
{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239686&hd=3)[type=vkvideo]}
{/caption}
{/cut}

### 1С деректерін сақтау үшін объектілік қойманы қалай пайдалану керек

Вебинарда VK Object Storage-ты 1С-пен интеграциялаудың техникалық егжей-тегжейлері ашылады. Сенімділік, деректерді қорғау және инфрақұрылым шығындарын азайту мәселелері қамтылады.

{cut(Вебинар жазбасы)}
{caption()[id=position=above;align=right;id=video_bucket_1c]}
{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239701&hd=3)[type=vkvideo]}
{/caption}
{/cut}
