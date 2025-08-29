Cloud Storage позволяет защитить объекты, [заблокировав их удаление или перезапись](/ru/storage/s3/concepts/objects-lock) (Object Lock). Используйте блокировку объектов для критических данных (например персональных данных), которые необходимо хранить в неизменяемом виде в течении установленных нормативных или законодательных сроков с последующим уничтожением, для обеспечения аудита и юридической значимости.

## Подготовительные шаги

Убедитесь, что у вас [установлен и настроен](/ru/storage/s3/connect/s3-cli) AWS CLI.

## 1. Подготовьте бакет 

Подготовьте бакет одним из способов:

{tabs}
{tab(Для нового бакета)}

1. Создайте новый бакет с возможностью блокировки объектов от удаления:

   {include(/ru/_includes/_s3-manage-bucket.md)[tags=create_bucket_block]}

1. Включите версионирование объектов:

   {include(/ru/_includes/_s3-manage-bucket.md)[tags=version_bucket]}

{/tab}
{tab(Для существующего бакета)}

1. В существующем бакете включите версионирование объектов:

   {include(/ru/_includes/_s3-manage-bucket.md)[tags=version_bucket]}

1. Сконфигурируйте блокировку объектов бакета:

   {include(/ru/_includes/_s3-manage-object.md)[tags=object_config_block]}

{/tab}
{/tabs}

## 2. Настройте политику хранения для бакета по умолчанию

Установите для бакета временную блокировку в [строгом режиме](/ru/storage/s3/concepts/objects-lock#compliance-lock) (`COMPLIANCE`) и укажите точный срок хранения данных:

{include(/ru/_includes/_s3-manage-object.md)[tags=configuration_lock_object]}

{note:err}

После установки режима `COMPLIANCE` его нельзя ослабить или отключить, но можно увеличить срок хранения данных.

{/note}

## 3. (Опционально) Установите индивидуальный срок хранения для объекта

Индивидуальный срок хранения может устанавливаться для объектов, которые относятся к разным категориям и имеют разный срок хранения.

Установите блокировку при загрузке объекта:

{include(/ru/_includes/_s3-manage-object.md)[tags=put_object]}

## 4. Проверьте статус блокировки

{include(/ru/_includes/_s3-manage-object.md)[tags=object_state]}

{cut(Пример вывода команды)}

```json
{
  "Retention": {
    "Mode": "COMPLIANCE",
    "RetainUntilDate": "2030-01-01T00:00:00+00:00"
  }
}
```

{/cut}

## 5. (Опционально) Установите бессрочную блокировку

При получении официального запроса на сохранение данных на неопределенный срок, используйте [бессрочную блокировку](/ru/storage/s3/concepts/objects-lock#legal-hold-lock) (legal hold). Она имеет приоритет над любыми сроками хранения и бессрочно запрещает удаление или изменение объекта до ее явного снятия.

1. Установите блокировку:

   {include(/ru/_includes/_s3-manage-object.md)[tags=object_legal_hold]}

1. Проверьте статус блокировки:

   {include(/ru/_includes/_s3-manage-object.md)[tags=object_state_legal_hold]}
   
   {cut(Пример вывода команды)}
   
   ```json
   {
     "LegalHold": {
       "Status": "ON"
     }
   }
   ```
   
   {/cut}

{note:warn}

[Снятие блокировки](/ru/storage/s3/instructions/objects/manage-object#object_legal_hold) возможно только при наличии соответствующих прав и выполняется командой с параметром `Status=OFF`.

{/note}