# {heading(Политики доступа (bucket policy))[id=s3-concepts-bucket-policy]}

_Политика доступа (bucket policy)_ — способ управления доступом к содержимому и настройкам {linkto(../../about#s3-concepts-about-bucket)[text=бакета]}. В отличие от {linkto(../s3-acl#s3-concepts-acl)[text=списка управления доступом (ACL)]}, политика доступа дает более предсказуемую и гибкую модель доступа.

Совместное использование политики доступа и ACL регулируется параметром бакета `OwnershipControls`, который имеет два режима:
- `BucketOwnerEnforced` — используется только политика доступа, ACL не используется (отключен). Рекомендуемый способ для гибкого управления правами в одном месте.
- `BucketOwnerPreferred` — сначала проверяется доступ по политике, затем проверяется ACL. Может использоваться в случае, например, сохранения обратной совместимости.

Использование `BucketOwnerPreferred` может вызывать конфликты между политикой доступа и ACL. По возможности рекомендуется {linkto(../../../instructions/access-management/bucket-policy#s3-instructions-bucket-acl-enable-and-disable)[text=отключить]} ACL в настройках бакета, после чего режим `OwnershipControls` будет изменен на `BucketOwnerEnforced`.

Примеры использования политики доступа:

- управление доступом к объектам внутри бакета;
- контроль доступа бакета для чтения или записи извне;
- назначение прав доступа отдельным пользователям или проектам;
- ограничение доступа по IP-адресам, префиксам путей или другим условиям.

## {heading(Конфигурация)[id=s3-concepts-bucket-policy-config]}

Конфигурация политики доступа задается в формате JSON, который содержит одно или несколько правил.

Структура JSON-файла:

```json
{
  "Version": "2012-10-17",
  "Id": "",
  "Statement": [
    {
      "Sid": "",
      "Action": [""],
      "Effect": "",
      "Principal": {
        "AWS":[""]
      },
      "Resource": [""],
      "Condition": {
        ...
      }
    },
  ...
  ]
}
```

Здесь:

- `Id` — уникальный идентификатор (название) политики доступа.
- `Statement` — массив правил политики доступа.
- `Sid` — уникальный идентификатор (название) правила.
- `Action` — строка или массив строк с {linkto(#s3-concepts-bucket-policy-actions)[text=действиями]}, на которые распространяется правило.
- `Effect` — {linkto(#s3-concepts-bucket-policy-effect)[text=разрешение или запрет]} на выполнение действия.
- `Principal` — строка или массив строк с {linkto(#s3-concepts-bucket-policy-principal)[text=принципалами]} (субъектами), на которые распространяется правило.
- `Condition` — определяет, при каких {linkto(#s3-concepts-bucket-policy-conditions)[text=условиях]} срабатывает правило.
- `Resource` — строка или массив строк в формате `arn:aws:s3:::<РЕСУРС>` с указанием {linkto(#s3-concepts-bucket-policy-resources)[text=ресурса]}, для которого устанавливается правило.

Подробные описания параметров `Action`, `Effect`, `Principal`, `Condition` и `Resource` доступны ниже.

## {heading(Действия)[id=s3-concepts-bucket-policy-actions]}

Параметр `Action` определяет какие действия с бакетами и объектами будут {linkto(#s3-concepts-bucket-policy-effect)[text=разрешены или запрещены]}.

[cols="1,2"]
|===

|`S3:AbortMultipartUpload`
|Отменить составную загрузку и удалить уже загруженные части

|`S3:ListMultipartUploadParts`
|Запросить части составной загрузки

|`S3:ListBucketMultipartUploads`
|Запросить список незавершенных составных загрузок в бакете

|`S3:GetObject`
|Запросить (скачать) содержимое объекта

|`S3:GetObjectVersion`
|Запросить (скачать) содержимое конкретной версии объекта

|`S3:GetObjectAttributes`
|Запросить расширенные атрибуты объекта

|`S3:GetObjectVersionAttributes`
|Запросить расширенные атрибуты конкретной версии объекта

|`S3:PutObject`
|Загрузить или перезаписать объект (при включенном версионировании — создать новую версию)

|`S3:DeleteObject`
|Удалить объект

|`S3:DeleteObjectVersion`
|Удалить конкретную версию объекта

|`S3:GetObjectAcl`
|Запросить ACL объекта

|`S3:GetObjectVersionAcl`
|Запросить ACL конкретной версии объекта

|`S3:PutObjectAcl`
|Установить или перезаписать ACL объекта

|`S3:PutObjectVersionAcl`
|Установить или перезаписать ACL конкретной версии объекта

|`S3:GetObjectTagging`
|Запросить теги объекта

|`S3:PutObjectTagging`
|Установить или перезаписать теги объекта

|`S3:DeleteObjectTagging`
|Удалить теги объекта

|`S3:GetObjectLegalHold`
|Проверить статус бессрочной блокировки объекта

|`S3:PutObjectLegalHold`
|Установить или снять бессрочную блокировку объекта

|`S3:GetObjectRetention`
|Получить статус временной блокировки объекта

|`S3:PutObjectRetention`
|Установить или изменить временную блокировку объекта

|`S3:BypassGovernanceRetention`
|Обойти временную блокировку

|`S3:ListBucket`
|Запросить список объектов в бакете

|`S3:ListBucketVersions`
|Запросить список версий объектов и маркеров удаления

|`S3:GetBucketAcl`
|Запросить ACL бакета

|`S3:PutBucketAcl`
|Установить или перезаписать ACL бакета

|`S3:GetBucketPolicy`
|Запросить политику доступа бакета

|`S3:PutBucketPolicy`
|Установить или перезаписать политику доступа бакета

|`S3:DeleteBucketPolicy`
|Удалить политику доступа бакета

|`S3:GetBucketPolicyStatus`
|Запросить статус бакета, указывающий на публичный доступ

|`S3:GetBucketOwnershipControls`
|Запросить конфигурацию управления доступом в бакете

|`S3:PutBucketOwnershipControls`
|Установить или перезаписать конфигурацию управления доступом в бакете

|`S3:GetBucketObjectLockConfiguration`
|Запросить конфигурацию блокировки объектов на уровне бакета

|`S3:PutBucketObjectLockConfiguration`
|Установить или перезаписать конфигурацию блокировки объектов на уровне бакета

|`S3:GetBucketCORS`
|Запросить CORS-конфигурацию бакета

|`S3:PutBucketCORS`
|Установить или перезаписать CORS-конфигурацию бакета

|`S3:GetBucketWebsite`
|Запросить конфигурацию статического веб-сайта бакета

|`S3:PutBucketWebsite`
|Установить или перезаписать конфигурацию статического веб-сайта бакета

|`S3:DeleteBucketWebsite`
|Удалить у бакета конфигурацию статического веб-сайта

|`S3:GetBucketNotification`
|Запросить конфигурацию уведомлений

|`S3:PutBucketNotification`
|Установить или перезаписать конфигурацию уведомлений

|`S3:GetBucketVersioning`
|Запросить статус версионирования бакета

|`S3:PutBucketVersioning`
|Включить или приостановить версионирование бакета

{ifdef(s3,s3-pdf)}
|`S3:GetEncryptionConfiguration`
|Запросить конфигурацию шифрования в бакете

|`S3:PutEncryptionConfiguration`
|Установить или перезаписать конфигурацию шифрования в бакете
{/ifdef}

|`S3:GetLifecycleConfiguration`
|Запросить правила жизненного цикла бакета

|`S3:PutLifecycleConfiguration`
|Установить или перезаписать правила жизненного цикла бакета

|`S3:GetBucketLocation`
|Получить регион бакета

|`S3:DeleteBucket`
|Удалить бакет

|===

## {heading(Разрешение и запрет)[id=s3-concepts-bucket-policy-effect]}

Ко всем правилам политики доступа в параметре `Effect` указывается явное разрешение (`Allow`) или запрет (`Deny`) выполнения действия.

[cols="1,1",frame="none",grid="none"]
|===
|```json
...
"Effect": "Allow"
...
```

|```json
...
"Effect": "Deny"
...
```

|===

Если для какого-то действия нет подходящего правила, по умолчанию используется явный запрет (`Deny`).

## {heading(Принципалы)[id=s3-concepts-bucket-policy-principal]}

  {note:info}

  {var(s3)} не поддерживает идентификацию принципала по [Canonical User ID](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html#principal-federated-web-identity), а также принципала в составе [федерации](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html#principal-federated-web-identity).

  {/note}

Параметр `Principal` определяет, кому именно разрешены или запрещены действия. Поддерживаются несколько вариантов принципалов.

- Публичный доступ без аутентификации (анонимно). Например, для публикации статических сайтов.

  {note:warn}
  Не рекомендуется {linkto(#s3-concepts-bucket-policy-effect)[text=разрешать]} анонимный доступ без аутентификации, если в этом нет необходимости. Открытая публикация связана с определенными рисками: утеря данных, нежелательные загрузки в хранилище, незапланированное изменение конфигурации. 
  {/note}

  ```json
  ...
  "Principal": "*"
  ...
  ```
  
- Доступ по проекту — политика распространяется на пользователей и сервисные учетные записи проекта {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef}.

  ```json
  ...
  "Principal": {
      "AWS": "<ID_ПРОЕКТА>"
  }
  ...
  ```

  Здесь `<ID_ПРОЕКТА>` — идентификатор проекта, к которому необходимо применять политику. Может указывать как на собственный проект, так и на другой проект {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef}.

- Предоставление доступа определенному аккаунту {var(s3)}.

  ```json
  ...
  "Principal": {
      "AWS": "arn:aws:iam::<ID_ПРОЕКТА>:user/<АККАУНТ_S3>"
  }
  ...
  ```

  Здесь:
  
    - `<ID_ПРОЕКТА>` — идентификатор проекта, к которому необходимо применять политику. Может указывать как на собственный проект, так и на другой проект {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef}.
    - `<АККАУНТ_S3>` — имя аккаунта {var(s3)}.

- Доступ для приложений или сервисов с помощью сервисной учетной записи.

  ```json
  ...
  "Principal": {
      "AWS": "arn:aws:iam::<ID_ПРОЕКТА>:user/serviceusers-<СЕРВИСНЫЙ_ПОЛЬЗОВАТЕЛЬ>"
  }
  ...
  ```

  Здесь:
  
    - `<ID_ПРОЕКТА>` — идентификатор проекта, к которому необходимо применять политику. Может указывать как на собственный проект, так и на другой проект {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef}.
    - `<СЕРВИСНЫЙ_ПОЛЬЗОВАТЕЛЬ>` — имя сервисного пользователя {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} для {var(s3)}.

- Префиксный ключ {var(s3)}:

  ```json
  ...
  "Principal": {
      "AWS": "arn:aws:iam::<ID_ПРОЕКТА>:user/<ПРЕФИКСНЫЙ_КЛЮЧ>"
  }
  ...
  ```

  Здесь:
  
    - `<ID_ПРОЕКТА>` — идентификатор проекта, к которому необходимо применять политику. Поддерживаются только префиксные ключи, которые привязаны к одному из бакетов в проекте.
    - `<ПРЕФИКСНЫЙ_КЛЮЧ>` — имя префиксного ключа {var(s3)}.

## {heading(Условия)[id=s3-concepts-bucket-policy-conditions]}

Параметр `Condition` определяет, при каких условиях будет срабатывать правило. Задается с помощью двух параметров: {linkto(#s3-concepts-bucket-policy-conditions-operator)[text=оператора]} и {linkto(#s3-concepts-bucket-policy-conditions-keys)[text=ключа]}.

### {heading(Операторы)[id=s3-concepts-bucket-policy-conditions-operator]}

Указывается внутри блока `Condition` и определяет, как будет проводиться проверка значений.

[cols="1,5"]
|===

|`StringEquals`
|Проверка на строгое соответствие строкового значения ключа условия указанному значению (или одному из значений в списке)

|`StringNotEquals`
|Проверка на отсутствие строгого соответствия строкового значения ключа условия указанному значению (или ни одному из значений в списке)

|`NumericEquals`
|Проверка на строгое соответствие числового значения ключа условия указанному числу (или одному из чисел в списке)

|`NumericLessThan`
|Истина, если числовое значение ключа условия меньше указанного числа

|`DateEquals`
|Истина, если значение даты и времени равно указанному значению в [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html)

|`IpAddress`
|Истина, если IP-адрес источника запроса попадает в указанный IPv4 или IPv6 CIDR-диапазон

|`NotIpAddress`
|Истина, если IP-адрес источника запроса не попадает в указанный IPv4 или IPv6 CIDR-диапазон

|===

### {heading(Ключи)[id=s3-concepts-bucket-policy-conditions-keys]}

Указывается внутри {linkto(#s3-concepts-bucket-policy-conditions-operator)[text=оператора]} в формате ключ/значение.

[cols="4,7"]
|===

|`s3:object-lock-legal-hold`
|Статус бессрочной блокировки объекта. Разрешает или запрещает операции в зависимости от того, включена ли бессрочная блокировка. Возможные значения: `ON`, `OFF`

|`s3:object-lock-mode`
|Режим временной блокировки объекта. Используется для контроля операций в зависимости от режима удержания. Возможные значения: `GOVERNANCE`, `COMPLIANCE`

|`s3:object-lock-remaining-retention-days`
|Оставшееся число дней до окончания временной блокировки объекта. Используется для контроля операций в зависимости от количества оставшихся дней блокировки. Поддерживаются числовые значения от 0 и больше

|`s3:object-lock-retain-until-date`
|Дата и время, до которых удерживается объект, в формате [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html). Используется для контроля операций в зависимости от даты окончания блокировки

|`aws:SourceIp`
|IP-адрес клиента, откуда пришел запрос. Используется для ограничения доступа по IPv4 или IPv6 CIDR-диапазонам

|===

## {heading(Ресурсы)[id=s3-concepts-bucket-policy-resources]}

Параметр `Resource` может содержать:
- строку, указывающую на бакет:

  ```json
  "Resource": "arn:aws:s3:::<ИМЯ_БАКЕТА>"
  ```

- строку, указывающую на объект:

  ```json
  "Resource": "arn:aws:s3:::<ИМЯ_БАКЕТА>/<КЛЮЧ_ОБЪЕКТА>"
  ```

- строку с маской `*` (wildcard), указывающую на объекты с определенным префиксом ключа объекта:

  ```json
  "Resource": "arn:aws:s3:::<ИМЯ_БАКЕТА>/<ЧАСТЬ_КЛЮЧА_ОБЪЕКТА>/*"
  ```

  или

  ```json
  "Resource": "arn:aws:s3:::<ИМЯ_БАКЕТА>/<ЧАСТЬ_КЛЮЧА_ОБЪЕКТА>*"
  ```

- строку с маской `*` (wildcard), указывающую на объекты с определенным суффиксом ключа объекта:

  ```json
  "Resource": "arn:aws:s3:::<ИМЯ_БАКЕТА>/*<ЧАСТЬ_КЛЮЧА_ОБЪЕКТА>"
  ```

- массив строк с несколькими ресурсами:

  ```json
  "Resource": [
    "arn:aws:s3:::<ИМЯ_БАКЕТА>",
    "arn:aws:s3:::<ИМЯ_БАКЕТА>/<КЛЮЧ_ОБЪЕКТА>"
  ]
  ```

  При этом действия для бакетов будут применены только для бакетов, а действия для объектов — только для объектов.

## {heading(Примеры конфигурации)[id=s3-concepts-bucket-policy-examples]}

- Разрешить скачивать объекты только из указанного диапазона IP-адресов:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "AllowGetOnlyFromCIDR",
        "Effect": "Allow",
        "Principal": "*",
        "Action": "s3:GetObject",
        "Resource": ["arn:aws:s3:::my-bucket/*"],
        "Condition": {
          "IpAddress": {
            "aws:SourceIp": ["203.0.113.0/24", "2001:db8:1234::/48"]
          }
        }
      }
    ]
  }
  ```

- Запретить скачивать объекты с указанного IP-адреса:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "DenyGetFromSingleIP",
        "Effect": "Deny",
        "Principal": "*",
        "Action": "s3:GetObject",
        "Resource": ["arn:aws:s3:::my-bucket/*"],
        "Condition": {
          "IpAddress": {
            "aws:SourceIp": "198.51.100.10/32"
          }
        }
      }
    ]
  }
  ```

- Предоставить разным пользователям полный доступ к определенным папкам:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "UserAFullAccessToFolderA",
        "Effect": "Allow",
        "Principal": {
          "AWS": "arn:aws:iam::mcs1234567890:user/user-a"
        },
        "Action": [
          "s3:GetObject",
          "s3:GetObjectAttributes",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:GetObjectTagging",
          "s3:PutObjectTagging",
          "s3:DeleteObjectTagging",
          "s3:GetObjectAcl",
          "s3:PutObjectAcl",
          "s3:AbortMultipartUpload",
          "s3:ListMultipartUploadParts"
        ],
        "Resource": ["arn:aws:s3:::my-bucket/folder-a/*"]
      },
      {
        "Sid": "UserBFullAccessToFolderB",
        "Effect": "Allow",
        "Principal": {
          "AWS": "arn:aws:iam::mcs1234567890:user/user-b"
        },
        "Action": [
          "s3:GetObject",
          "s3:GetObjectAttributes",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:GetObjectTagging",
          "s3:PutObjectTagging",
          "s3:DeleteObjectTagging",
          "s3:GetObjectAcl",
          "s3:PutObjectAcl",
          "s3:AbortMultipartUpload",
          "s3:ListMultipartUploadParts"
        ],
        "Resource": ["arn:aws:s3:::my-bucket/folder-b/*"]
      }
    ]
  }
  ```

- Предоставить каждому пользователю или сервисному аккаунту полный доступ к папке:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "ProjectFullAccessToSharedFolder",
        "Effect": "Allow",
        "Principal": {
          "AWS": "mcs1234567890"
        },
        "Action": [
          "s3:GetObject",
          "s3:GetObjectAttributes",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:GetObjectTagging",
          "s3:PutObjectTagging",
          "s3:DeleteObjectTagging",
          "s3:GetObjectAcl",
          "s3:PutObjectAcl",
          "s3:AbortMultipartUpload",
          "s3:ListMultipartUploadParts"
        ],
        "Resource": ["arn:aws:s3:::my-bucket/shared/*"]
      }
    ]
  }
  ```

- Разрешить запись объектов только с обязательным использованием условий записи:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "AllowPutOnlyFromCIDR",
        "Effect": "Allow",
        "Principal": {
          "AWS": "mcs1234567890"
        },
        "Action": "s3:PutObject",
        "Resource": ["arn:aws:s3:::my-bucket/*"],
        "Condition": {
          "IpAddress": {
            "aws:SourceIp": ["203.0.113.0/24"]
          }
        }
      }
    ]
  }
  ```