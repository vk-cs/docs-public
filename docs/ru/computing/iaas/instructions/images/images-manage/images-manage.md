Образ — это файл, который содержит виртуальный диск с установленной операционной системой или другими данными. Образы используются для создания виртуальных машин в облаке.

## Создание образа

VK Cloud позволяет создать образ из диска существующей виртуальной машины.

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. [Остановите ВМ](../../../instructions/vm/vm-manage#start_stop_restart_vm), образ которой нужно создать.  
1. Перейдите в раздел **Облачные вычисления → Образы**.
1. Нажмите кнопку **Создать**.
1. Задайте настройки образа:

   - **Источник**: выберите **Диск**.
   - **Выберите диск**: выберите диск существующей виртуальной машины.
   - **Название образа**: укажите имя образа.
1. Нажмите кнопку **Создать образ**.

</tabpanel>
<tabpanel>

{note:warn}

Диск для создания образа должен быть отсоединен от виртуальной машины и иметь статус `available`.

{/note}

1. Получите `ID` диска:

   ```console
   openstack volume list
   ```

2. Создайте образ:

   ```console
   openstack image create --volume <ID диска> <название образа>
   ```

3. Проверьте создание образа:

   ```console
   openstack image list --name <название образа>
   ```

   Успешно созданный образ должен иметь статус `active`.

</tabpanel>
</tabs>

## Импорт образа

VK Cloud поддерживает загрузку собственных образов виртуальных машин с [некоторыми ограничениями](/ru/computing/iaas/concepts/oper-system) по операционным системам.

{note:info}

Поддерживаются только образы в формате RAW. Если ваш образ в другом формате, [выполните его конвертацию](../../../how-to-guides/packer#1_konvertiruyte_obraz_v_format_raw).

{/note}

{note:warn}

Рекомендованный способ импорта образа — с использованием CLI.

Размер загружаемого файла [ограничен](/ru/tools-for-using-services/account/concepts/quotasandlimits#images-volumes).

{/note}

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел **Облачные вычисления → Образы**.
1. Нажмите кнопку **Создать**.
1. Задайте настройки импорта:

   - **Источник**: выберите **Файл**.
   - **Выберите файл**: загрузите файл образа в формате RAW.
   - **Название образа**: укажите имя образа.
1. Нажмите кнопку **Создать образ**.

</tabpanel>
<tabpanel>

Параметры команды импорта образа зависят от необходимости поддержки резервного копирования:

- Если поддержка не нужна, выполните команду:

   ```console
   openstack image create --private --container-format bare --disk-format raw --property store=s3 --file <путь к файлу образа> <название образа>
   ```

- Если поддержка нужна, добавьте параметры `--property hw_qemu_guest_agent=yes --property os_require_quiesce=yes` в команду выше.

</tabpanel>
</tabs>

## Экспорт образа

<tabs>
<tablist>
<tab>OpenStack CLI</tab>
<tab>cURL</tab>
</tablist>
<tabpanel>

1. Получите `ID` образа из списка:

   ```console
   openstack image list
   ```

2. Экспортируйте образ:

   ```console
   openstack image save --file <название файла образа>.raw <ID образа>
   ```

</tabpanel>
<tabpanel>

1. [Получите](/ru/tools-for-using-services/api/rest-api/case-keystone-token) токен доступа `X-Auth-Token`.
1. Выполните команду:

   ```console
   curl -H "X-Auth-Token:{токен}" "https://infra.mail.ru:9292/v2/images/{ID образа}/file" --output <название файла образа>.raw
   ```

</tabpanel>
</tabs>

## Изменение статуса видимости образа

Изменение статуса видимости образа позволяет получить доступ к образу из нескольких проектов. Совместный доступ к образу в нескольких проектах позволяет ускорить разворачивание виртуальных машин.

В сервисе VK Cloud пользователям доступны следующие статусы видимости образов:

| Статус      | Описание                                            |
|-------------|-----------------------------------------------------|
| `private`   | Образ только для личного доступа                    |
| `shared`    | Образ может быть использован в нескольких проектах  |

По умолчанию все образы имеют статус `private`. Чтобы поделиться образом с другими проектами:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

{note:info}

Через личный кабинет можно разрешить доступ к образу только для определенных проектов.

{/note}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел **Облачные вычисления → Образы**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного образа и выберите пункт **Поделиться образом**.
1. В открывшемся окне выберите тип проекта, с которым нужно поделиться образом:

   - **Мои проекты**: позволяет делиться образом с проектами, в которых вы владелец.

     Если выбран этот тип, в поле **ID проекта** выберите в списке [уникальный идентификатор проекта (PID)](/ru/tools-for-using-services/account/instructions/project-settings/manage#poluchenie_identifikatora_proekta) вида `mcsNNNNNNNNNN`. Доступно добавление нескольких проектов.

   - **Другие проекты**: позволяет делиться образом со всеми остальными проектами.
   
     Если выбран этот тип, в поле **ID проекта в OpenStack** укажите [Project ID](https://cloud.vk.com/docs/tools-for-using-services/api/rest-api/endpoints#poluchenie_project_id) вида `exampled4ef0547e5b222f445`, не совпадает с уникальным идентификатором проекта. Доступно добавление нескольких проектов.

1. Нажмите кнопку **Разрешить доступ**.

</tabpanel>
<tabpanel>

1. Получите `ID` образа из списка:

   ```console
   openstack image list
   ```

2. Отобразите подробную информацию об отдельном образе:

   ```console
   openstack image show <ID образа>
   ```

   Статус видимости образа отображается в строке `visibility`.

3. Измените статус образа:

   ```console
   openstack image set --<статус> <ID образа>
   ```

Чтобы поделиться образом в статусе `shared`:

1. Добавьте образ в проект:

   ```console
   openstack image add project <ID образа> <ID проекта>
   ```

2. Подтвердите добавление образа в проект:

   ```console
   openstack image set --accept <ID образа>
   ```

Для просмотра проектов, имеющих доступ к образу, выполните команду:

```console
openstack image member list <ID образа>
```

</tabpanel>
</tabs>

## Удаление образа

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
2. Перейдите в раздел **Облачные вычисления → Образы**.
3. Выполните одно из действий для нужного образа:

   - Выберите с помощью флажка образ, затем нажмите кнопку **Удалить**.
   - Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного образа и выберите пункт **Удалить образ**.

4. Нажмите кнопку **Подтвердить**.

</tabpanel>
<tabpanel>

Чтобы удалить образ, не прикрепленный к проектам:

```console
openstack image delete <ID образа>
```

Чтобы удалить образ из проекта:

```console
openstack image remove project <ID образа> <ID проекта>
```

</tabpanel>
</tabs>
