# {heading(Настройка хранилища для соответствия нормативным требованиям)[id=s3-regulatory-requirements]}

{var(s3)} позволяет защитить объекты, {linkto(../../concepts/objects-lock#s3-concepts-object-lock)[text=заблокировав их удаление или перезапись]} (Object Lock). Используйте блокировку объектов для критических данных (например, персональных данных), которые согласно нормативным или законодательным требованиям необходимо хранить в неизменяемом виде в течение установленных сроков с последующим уничтожением. Это поможет обеспечить аудит и юридическую значимость.

## {heading(Подготовительные шаги)[id=s3-regulatory-requirements-prepare]}

Убедитесь, что у вас {linkto(../../connect/s3-cli#s3-connect-cli)[text=установлен и настроен]} AWS CLI.

## {heading(1. Подготовьте бакет)[id=s3-regulatory-requirements-bucket-create]}

1. Создайте новый бакет:

   {include(../../_includes/_s3-manage-bucket.md)[tags=create_bucket,create_bucket_guide]} 

1. Включите {linkto(../../concepts/versioning#s3-concepts-versioning)[text=версионирование]}:

   {include(../../_includes/_s3-manage-bucket.md)[tags=version_bucket]}

1. Включите {linkto(../../concepts/objects-lock#s3-concepts-object-lock)[text=блокировку объектов]}:

   {include(../../_includes/_s3-manage-object.md)[tags=object_config_block]}

## {heading(2. Настройте политику хранения для бакета по умолчанию)[id=s3-regulatory-requirements-policy-settings]}

Установите для бакета временную блокировку в {linkto(../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=строгом режиме]} (`COMPLIANCE`) и укажите точный срок хранения данных:

{include(../../_includes/_s3-manage-object.md)[tags=configuration_lock_object,configuration_lock_object_guide]}

{note:err}
После установки режима `COMPLIANCE` его нельзя ослабить или отключить, но можно увеличить срок хранения данных.
{/note}

## {heading(3. (Опционально) Установите индивидуальный срок хранения для объекта)[id=s3-regulatory-requirements-shelf-life]}

Индивидуальный срок хранения может устанавливаться для объектов, которые относятся к разным категориям и имеют разный срок хранения.

Установите блокировку при загрузке объекта:

{include(../../_includes/_s3-manage-object.md)[tags=put_object]}

## {heading(4. Проверьте статус блокировки)[id=s3-regulatory-requirements-status-block]}

{include(../../_includes/_s3-manage-object.md)[tags=object_state]}

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

## {heading(5. (Опционально) Установите бессрочную блокировку)[id=s3-regulatory-requirements-legal-hold-lock]}

При получении официального запроса на сохранение данных на неопределенный срок, используйте {linkto(../../concepts/objects-lock#s3-concepts-object-lock-legal-hold)[text=бессрочную блокировку]} (legal hold). Она имеет приоритет над любыми сроками хранения и бессрочно запрещает удаление или изменение объекта до ее явного снятия.

1. Установите блокировку:

   {include(../../_includes/_s3-manage-object.md)[tags=object_legal_hold]}

1. Проверьте статус блокировки:

   {include(../../_includes/_s3-manage-object.md)[tags=object_state_legal_hold]}
   
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
{linkto(../../instructions/objects/object-lock#s3-instructions-object-lock-legal-hold)[text=Снятие блокировки]} возможно только при наличии соответствующих прав и выполняется командой с параметром `Status=OFF`.
{/note}