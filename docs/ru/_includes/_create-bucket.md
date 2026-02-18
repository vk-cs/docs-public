{includetag(not_bucket_onboarding)}
## {heading(Подготовительные шаги)[id=preparation]}

1. Убедитесь, что [AWS CLI](/ru/tools-for-using-services/cli/aws-cli) установлен.
1. Создайте аккаунт для сервиса VK Object Storage:
{/includetag}

{includetag(bucket_onboarding_only)}
## {heading({counter(bucket)}. Создайте аккаунт для сервиса VK Object Storage)[id=create_account]}
{/includetag}

   1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
{includetag(not_bucket_onboarding)}
   1. Выберите проект.
{/includetag}
   1. Перейдите в раздел **Object Storage → Аккаунты**.
   1. Нажмите кнопку **Добавить аккаунт** или **Добавить**.
   1. Задайте имя аккаунта.
   1. Нажмите кнопку **Создать**.
   1. В открывшемся окне скопируйте и сохраните идентификатор ключа доступа (**Access Key ID**) и секретный ключ (**Secret Key**).

      {note:warn}
      После закрытия окна восстановить секретный ключ будет невозможно. Если ключ утерян, создайте новый.
      {/note}

{includetag(not_bucket_onboarding)}
1. Настройте AWS CLI на работу с созданным аккаунтом:

   1. Выполните команду:

      ```console
      aws configure
      ```

   1. Задайте необходимые настройки:

      1. `AWS Access Key ID`: введите сохраненное ранее значение **Access Key ID**.
      1. `AWS Secret Access Key`: введите сохраненное ранее значение **Secret Key**.
      1. `Default region name`: введите `ru-msk`.
      1. `Default output format`: введите `json`.
{/includetag}

## {heading({counter(bucket)}. Создайте бакет)[id=create_bucket]}

{includetag(not_bucket_onboarding)}
1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
{/includetag}
1. Перейдите в раздел **Object Storage** → **Бакеты**.
1. Нажмите кнопку **Создать**.
1. Введите имя бакета, соответствующее [рекомендуемым правилам](/ru/storage/s3/concepts/about#bucket_naming).

   После создания бакета изменить его имя будет невозможно.

1. Выберите [класс хранения](/ru/storage/s3/concepts/about#storage_class). Вы сможете [изменить его](/ru/storage/s3/instructions/change-storage-class) позже.
1. Нажмите кнопку **Создать бакет**.

{includetag(not_bucket_onboarding)}
## {heading({counter(bucket)}. Добавьте объект с приватными настройками ACL и предоставьте доступ к нему)[id=create_private_object]}

1. Добавьте объект:

   1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
   1. Выберите проект, где находится созданный бакет.
   1. Перейдите в раздел **Object Storage → Бакеты**.
   1. Нажмите на имя созданного бакета.
   1. Нажмите кнопку **Добавить файл**.
   1. Убедитесь, что выбрана настройка ACL `Private`.
   1. Нажмите кнопку **Выбрать файлы** и выберите файл, который нужно загрузить в бакет.

1. Предоставьте доступ к загруженному объекту по временной [подписанной ссылке](/ru/storage/s3/concepts/access/signed-url):

   1. Сгенерируйте временную ссылку для доступа к объекту с приватными настройками ACL, выполнив команду:

      ```console
      aws s3 presign s3://<ИМЯ_БАКЕТА>/<КЛЮЧ_ОБЪЕКТА> --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
      ```

      Здесь:

      - `<ИМЯ_БАКЕТА>` — имя бакета, в который загружен файл.
      - `<КЛЮЧ_ОБЪЕКТА>` — [ключ объекта](/ru/storage/s3/concepts/about#object_key). В этом сценарии ключ совпадает с именем загруженного объекта.

      {cut(Пример)}

      Пусть в бакет `my-cloud-bucket` был загружен объект `cat_image_private_acl.png`.

      Тогда команда будет иметь вид:

      ```console
      aws s3 presign s3://my-cloud-bucket/cat_image_private_acl.png --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
      ```

      {/cut}

   1. Сохраните сгенерированную временную ссылку.

      Ссылка имеет следующий вид:

      ```https
      https://hb.ru-msk.vkcloud-storage.ru/<ИМЯ_БАКЕТА>/...?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=...%2F...%2Fru-msk%2Fs3%2Faws4_request&X-Amz-Date=...&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=...
      ```

      {note:info}
      Такая ссылка действует ограниченное время (по умолчанию 1 час). По истечении этого времени нужно будет сгенерировать новую ссылку на объект.
      {/note}
{/includetag}

## {heading({counter(bucket)}. Добавьте объект с публичными настройками ACL и предоставьте доступ к нему)[id=create_public_object]}

1. Добавьте объект:

{includetag(not_bucket_onboarding)}
   1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
   1. Выберите проект, где находится созданный бакет.
   1. Перейдите в раздел **Object Storage → Бакеты**.
{/includetag}
   1. Нажмите на имя созданного бакета.
   1. Нажмите кнопку **Добавить файл**.
   1. Выберите настройку ACL `Public-read`.
   1. Нажмите кнопку **Выбрать файлы** и выберите любой файл для загрузки в бакет.

1. Предоставьте доступ к загруженному объекту по прямой ссылке:

{includetag(not_bucket_onboarding)}
   1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
   1. Выберите проект, где находится созданный бакет.
   1. Перейдите в раздел **Object Storage → Бакеты**.
   1. Нажмите на имя созданного бакета.
{/includetag}
   1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для загруженного ранее объекта и выберите пункт **Доступ к файлу**.
   1. Сохраните сгенерированную прямую ссылку.

      Ссылка имеет следующий вид:

      ```https
      https://<ИМЯ_БАКЕТА>.hb.ru-msk.vkcloud-storage.ru/...
      ```

## {heading({counter(bucket)}. Проверьте доступ к объекту)[id=access_check]}

{includetag(not_bucket_onboarding)}
1. Перейдите в браузере по сгенерированной временной ссылке. Должен загрузиться объект, [добавленный ранее с приватными настройками ACL](#create_private_object).

1. {/includetag}Перейдите в браузере по сгенерированной прямой ссылке. Должен загрузиться объект, [добавленный ранее с публичными настройками ACL](#create_public_object).

## {heading(Удалите неиспользуемые ресурсы)[id=delete_unused]}

Бакет и загруженные в него объекты [тарифицируются](/ru/storage/s3/tariffication). Если они вам больше не нужны:

1. [Удалите объекты](/ru/storage/s3/instructions/objects/manage-object#udalenie_obekta).
1. [Удалите бакет](/ru/storage/s3/instructions/buckets/manage-bucket#bucket_delete).