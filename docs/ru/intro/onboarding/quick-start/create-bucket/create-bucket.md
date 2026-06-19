# {heading({var(s3)}: создайте бакет в объектном хранилище и загрузите в него данные)[id=onboarding-create-bucket]}

[VK Object Storage](/ru/storage/s3/concepts/about) — объектное хранилище с поддержкой S3 API, которое обеспечивает надежное масштабируемое хранение и стабильную скорость раздачи любых объектов независимо от числа одновременных обращений. {var(s3)} можно использовать для потоковой раздачи мультимедиа, хостинга сайтов и хранения самых разнообразных данных.

Начните работу с сервисом [VK Object Storage](https://cloud.vk.com/storage/) любым удобным способом:

- Воспользуйтесь {linkto(#onboarding-create-bucket-create)[text=инструкцией]}, создайте бакет, загрузите в него объект и предоставьте доступ к загруженному объекту по ссылке.
- Посмотрите короткое {linkto(#onboarding-create-bucket-video)[text=видео]}, в котором будет создан аккаунт, позволяющий управлять бакетом по API, создан бакет и настроен доступ к нему, продемонстрированы настройки бакета.
- Пройдите [урок](https://cloud.vk.com/cloud-native-courses/advanced/cloud-storage-s3/) бесплатного курса. В теоретической части урока рассмотрены общие характеристики, компоненты и функции {var(s3)}. В практической части вы создадите бакет и подключите его к Wordpress для хранения медиафайлов.
- Посмотрите {linkto(#onboarding-create-bucket-webinars)[text=вебинары]} о работе с {var(s3)}.

{note:info}
Интерфейс личного кабинета может отличаться от продемонстрированного в видео и уроке. 
{/note}

## {heading(Создайте бакет и разместите в нем объект)[id=onboarding-create-bucket-create]}

Пройдя все шаги этой инструкции, вы:

1. [Создадите](#create_account) аккаунт для сервиса {var(s3)}.
1. [Создадите](#create_bucket) бакет.
1. [Добавите](#create_public_object) объект с публичными настройками ACL и предоставите доступ к нему по ссылке.
1. [Проверите](#access_check) доступ к объекту.

{include(../../../../storage/s3/_includes/_create-bucket.md)[tags=bucket_onboarding_only,create-bucket; level=+1]}

## {heading(Видеоинструкция)[id=video_bucket]}

В этом видео будет создан аккаунт, позволяющий управлять бакетом по API, создан бакет и настроен доступ к нему, продемонстрированы настройки бакета в личном кабинете {var(cloud)}.

{caption()[id=position=above;align=right;id=onboarding-create-bucket-video]}
{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239414&hd=3)[type=vkvideo]}
{/caption}

## {heading(Обучающий курс)[id=onboarding-create-bucket-courses]}

Пройдите [урок](https://cloud.vk.com/cloud-native-courses/advanced/cloud-storage-s3/) бесплатного курса.

В теоретической части урока рассмотрены общие характеристики, компоненты и функции {var(s3)}. В практической части вы создадите бакет и подключите его к Wordpress для хранения медиафайлов.

## {heading(Вебинары)[id=onboarding-create-bucket-webinars]}

### {heading(Как начать работать с объектным хранилищем)[id=onboarding-create-bucket-begin]}

Вы узнаете, как создавать бакеты, управлять доступами, защищать информацию с помощью встроенных механизмов безопасности и интегрировать {var(s3)} с другими облачными продуктами.

{cut(Запись вебинара)}
{caption()[id=position=above;align=right;id=video_bucket_begin]}
{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239395&hd=3)[type=vkvideo]}
{/caption}
{/cut}

### {heading(Как построить эффективное и устойчивое объектное хранилище)[id=onboarding-create-bucket-effective]}

Вебинар поможет разобраться в технических особенностях, архитектуре, защите данных и интеграции {var(s3)} с другими сервисами.

{cut(Запись вебинара)}
{caption()[id=position=above;align=right;id=video_bucket_effective]}
{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239686&hd=3)[type=vkvideo]}
{/caption}
{/cut}

### {heading(Как использовать объектное хранилище для хранения данных 1С)[id=onboarding-create-bucket-1c]}

На вебинаре раскрыты технические детали интеграции {var(s3)} с 1С. Освещены вопросы надежности, защиты данных и снижения затрат на инфраструктуру.

{cut(Запись вебинара)}
{caption()[id=position=above;align=right;id=video_bucket_1c]}
{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239701&hd=3)[type=vkvideo]}
{/caption}
{/cut}