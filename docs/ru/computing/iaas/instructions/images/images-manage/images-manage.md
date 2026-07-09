# {heading(Управление образами)[id=iaas-images-manage]}

Образ — это файл, который содержит виртуальный диск с установленной операционной системой или другими данными. Образы используются для создания виртуальных машин в облаке.

## {heading(Создание образа)[id=iaas-images-manage-create]}

{var(cloud)} позволяет создать образ из диска существующей виртуальной машины.

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef} в личный кабинет {var(cloud)}.
1. {linkto(../../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=Остановите ВМ]}, образ которой нужно создать.  
1. Перейдите в раздел **Облачные вычисления** → **Образы**.
1. Нажмите кнопку **Создать**.
1. Задайте настройки образа:

   - **Источник**: выберите **Диск**.
   - **Выберите диск**: выберите диск существующей виртуальной машины.
   - **Название образа**: укажите имя образа.
   
1. Нажмите кнопку **Создать образ**.

{/tab}

{tab(OpenStack CLI)}

{note:warn}
Диск для создания образа должен быть отсоединен от виртуальной машины и иметь статус `available`.
{/note}

1. Получите `ID` диска:

   ```console
   openstack volume list
   ```

1. Создайте образ:

   ```console
   openstack image create --volume <ID_ДИСКА> <ИМЯ_ОБРАЗА>
   ```

1. Проверьте создание образа:

   ```console
   openstack image list --name <ИМЯ_ОБРАЗА>
   ```

   Успешно созданный образ должен иметь статус `active`.

{/tab}

{/tabs}

## {heading(Импорт образа)[id=iaas-images-manage-import]}

{var(cloud)} поддерживает загрузку собственных образов виртуальных машин с {linkto(../../../../../computing/iaas/concepts/oper-system#iaas-oper-system)[text=некоторыми ограничениями]} по операционным системам.

{note:warn}
Поддерживаются только образы в формате RAW. Если ваш образ в другом формате, {linkto(../../../../../computing/iaas/how-to-guides/packer#iaas-packer-convert-image)[text=выполните его конвертацию]}.
{/note}

{ifdef(public)}
Рекомендованный способ импорта образа — с использованием CLI.

Размер загружаемого файла {linkto(../../../../../tools-for-using-services/account/concepts/quotasandlimits#quotasandlimits-images-volumes)[text=ограничен]}.
{/ifdef}

{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
Для загрузки образа размером более 20 ГБ рекомендуется использовать OpenStack CLI.
{/ifdef}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef} в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Облачные вычисления** → **Образы**.
1. Нажмите кнопку **Создать**.
1. Задайте настройки импорта:

   - **Источник**: выберите **Файл**.
   - **Выберите файл**: загрузите файл образа в формате RAW.

     {ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
     Используйте образы для облака. Пример списка образов доступен на странице [Ubuntu Cloud Images](https://cloud-images.ubuntu.com/).
     {/ifdef}

   - **Название образа**: укажите имя образа.

1. Нажмите кнопку **Создать образ**.

{/tab}

{tab(OpenStack CLI)}

Параметры команды импорта образа зависят от необходимости поддержки резервного копирования:

- Если поддержка не нужна, выполните команду:

  ```console
  openstack image create --private --container-format bare --disk-format raw --property store=s3 --file <ФАЙЛ_ОБРАЗА> <ИМЯ_ОБРАЗА>
  ```

- Если поддержка нужна, в команду выше добавьте параметры:

  ```console
  --property hw_qemu_guest_agent=yes 
  --property os_require_quiesce=yes
  ```

{/tab}

{/tabs}

## {heading(Экспорт образа)[id=iaas-images-manage-export]}

{tabs}

{tab(OpenStack CLI)}

1. Получите `ID` образа и формат диска `Disk Format` из списка:

   ```console
   openstack image list --long
   ```

1. Экспортируйте образ:

   ```console
   openstack image save --file <ИМЯ_ФАЙЛА>.<ФОРМАТ_ОБРАЗА> <ID_ОБРАЗА>
   ```

Если экспортированный образ не в формате RAW и вы планируете использовать его для создания ВМ в {var(cloud)}, {linkto(../../../../../computing/iaas/how-to-guides/packer#iaas-packer-convert-image)[text=выполните конвертацию образа]}.

{/tab}

{ifdef(public)}
{tab(cURL)}

1. {linkto(../../../../../tools-for-using-services/api/rest-api/case-keystone-token#rest-api-keystone-token)[text=Получите]} токен доступа `X-Auth-Token`.
1. Получите `id` и `disk_format` нужного образа:

   ```console
   curl -H "X-Auth-Token:<ТОКЕН>" "https://infra.mail.ru:9292/v2/images"
   ```

1. Скачайте образ:

   ```console
   curl -H "X-Auth-Token:<ТОКЕН>" "https://infra.mail.ru:9292/v2/images/<ID_ОБРАЗА>/file" --output <ИМЯ_ФАЙЛА>.<ФОРМАТ_ОБРАЗА>
   ```

Если экспортированный образ не в формате RAW и вы планируете использовать его для создания ВМ в {var(cloud)}, {linkto(../../../../../computing/iaas/how-to-guides/packer#iaas-packer-convert-image)[text=выполните конвертацию образа]}.

{/tab}
{/ifdef}

{/tabs}

## {heading(Изменение статуса видимости образа)[id=iaas-images-manage-status-edit]}

Изменение статуса видимости образа позволяет получить доступ к образу из нескольких проектов. Совместный доступ к образу в нескольких проектах позволяет ускорить разворачивание виртуальных машин.

В сервисе {var(cloud)} пользователям доступны статусы видимости образов, приведенные {ifdef(public,private,private-pg)}ниже. {/ifdef}{ifdef(private-pdf,private-pg-pdf,private-cert)}в {linkto(#tab_images_status)[text=таблице %number]}.{/ifdef}

{ifdef(private-pdf,private-pg-pdf,private-cert)}
{caption(Таблица {counter(table)[id=numb_tab_images_status]} — Статусы видимости образа)[align=right;position=above;id=tab_images_status;number={const(numb_tab_images_status)}]}
{/ifdef}
[cols="1,3", options="header"]
|===
| Статус
| Описание

| `private`
| Образ только для личного доступа

| `shared`
| Образ может быть использован в нескольких проектах 

|===
{ifdef(private-pdf,private-pg-pdf,private-cert)}
{/caption}{/ifdef}

По умолчанию все образы имеют статус `private`. Чтобы поделиться образом с другими проектами:

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef} в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Облачные вычисления** → **Образы**.
1. Нажмите ![ ](../../../../../assets/more-icon.svg "inline") для нужного образа и выберите пункт **Поделиться образом**.
   {ifdef(public)}
1. В открывшемся окне выберите тип проекта, с которым нужно поделиться образом:

   - **Мои проекты**: позволяет делиться образом с проектами, в которых вы владелец.

     Если выбран этот тип, в поле **ID проекта** выберите в списке {linkto(../../../../../tools-for-using-services/account/instructions/project-settings/manage#project-pid-view)[text=уникальный идентификатор проекта (PID)]} вида `mcsNNNNNNNNNN`. Доступно добавление нескольких проектов.

   - **Другие проекты**: позволяет делиться образом со всеми остальными проектами.
   
     Если выбран этот тип, в поле **ID проекта в OpenStack** укажите [Project ID](https://cloud.vk.com/docs/tools-for-using-services/api/rest-api/endpoints#poluchenie_project_id) вида `exampled4ef0547e5b222f445`, не совпадает с уникальным идентификатором проекта. Доступно добавление нескольких проектов.
   
   {/ifdef}
   {ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
1. Выберите один из вариантов **Мои проекты** или **Другие проекты**.
1. Укажите необходимые проекты, которым нужно выдать доступ к образу.
   {/ifdef}
1. Нажмите кнопку **Разрешить доступ**.

{/tab}

{tab(OpenStack CLI)}

1. Получите `ID` образа из списка:

   ```console
   openstack image list
   ```

1. Отобразите подробную информацию об отдельном образе:

   ```console
   openstack image show <ID_ОБРАЗА>
   ```

   Статус видимости образа отображается в строке `visibility`.

1. Измените статус образа:

   ```console
   openstack image set --shared <ID_ОБРАЗА>
   ```

1. Добавьте образ в проект:

   ```console
   openstack image add project <ID_ОБРАЗА> <ID_ПРОЕКТА>
   ```

1. Подтвердите добавление образа в проект. Для этого пользователь принимающего проекта должен выполнить команду:

   ```console
   openstack image set --accept <ID_ОБРАЗА>
   ```

Для просмотра проектов, имеющих доступ к образу, выполните команду:

```console
openstack image member list <ID_ОБРАЗА>
```

{/tab}

{/tabs}

## {heading(Удаление образа)[id=iaas-images-manage-delete]}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef} в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Облачные вычисления** → **Образы**.
1. Выполните одно из действий для нужного образа:

   - Выберите с помощью флажка образ, затем нажмите кнопку **Удалить**.
   - Нажмите ![ ](../../../../../assets/more-icon.svg "inline") для нужного образа и выберите пункт **Удалить образ**.

1. Нажмите кнопку **Подтвердить**.

{/tab}

{tab(OpenStack CLI)}

Чтобы удалить образ, не прикрепленный к проектам:

```console
openstack image delete <ID_ОБРАЗА>
```

Чтобы удалить образ из проекта:

```console
openstack image remove project <ID_ОБРАЗА> <ID_ПРОЕКТА>
```

{/tab}

{/tabs}
