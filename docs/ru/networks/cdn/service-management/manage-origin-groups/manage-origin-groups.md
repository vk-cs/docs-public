## Получение списка групп источников

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, в котором находятся группы источников.
1. Перейдите в раздел **CDN → Группы источников**.

Будет выведен список групп источников.

</tabpanel>
</tabs>

## Добавление группы источников

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где нужно добавить группу источников.
1. Перейдите в раздел **CDN → Группы источников**.
1. Нажмите кнопку **Создать группу источников**.
1. Задайте имя группы источников.
1. [Добавьте](#dobavlenie_istochnika_v_gruppu) один или несколько источников.
1. (Опционально) [Отредактируйте](#redaktirovanie_istochnikov_v_gruppe) список источников в группе.
1. Убедитесь, что для доменов всех добавленных источников (в том числе выключенных) настроены DNS-записи.

   <warn>

   Если VK Cloud не сможет проверить доступность этих доменов с помощью запроса к DNS, то группу источников создать не удастся.

   </warn>

1. Выберите опцию **Использовать следующий источник из списка при 4XX и 5XX кодах на источнике**, чтобы CDN-серверы обращались к следующим источникам из списка, если запрашиваемый источник недоступен. Подробнее о выборе источника читайте в разделе [Группы источников](../../concepts/origin-groups).

   Oпция доступна, если в группе источников настроено более одного источника.

1. Нажмите кнопку **Создать группу**.

</tabpanel>
</tabs>

## Добавление источника в группу

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект.
1. Перейдите в раздел **CDN → Группы источников**.
1. Перейдите к редактированию группы одним из способов:

   - Нажмите на имя группы, в которую нужно добавить источник.
   - Нажмите ![ ](/ru/assets/menu-icon.svg "inline") для нужной группы и выберите **Настройки группы**.

{include(/ru/_includes/_cdn_add_origin.md)}

</tabpanel>
</tabs>

## Редактирование источников в группе

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект.
1. Перейдите в раздел **CDN → Группы источников**.
1. Перейдите к редактированию группы одним из способов:

   - Нажмите на имя группы, в которую нужно добавить источник.
   - Нажмите ![ ](/ru/assets/menu-icon.svg "inline") для нужной группы и выберите **Настройки группы**.

1. (Опционально) Включите или выключите отдельные источники справа от типа источника. Нельзя выключить источник типа `Активный`, если это единственный источник такого типа в группе. Выключенный источник не будет использоваться при запросе контента CDN-серверами.

1. (Опционально) Измените URL отдельного источника:

   1. Нажмите ![pencil-icon](./assets/pencil-icon.svg "inline") в строке источника.
   1. В поле **Адрес** измените URL, по которому CDN-ресурс будет обращаться к источнику:

      - URL может содержать только латинские буквы, цифры и символы `.`, `-`.
      - URL не должен содержать схему (`http://` или `https://`): она уже добавлена автоматически в виде `http(s)://`. Конкретный протокол определяется соответствующим параметром, который задается опцией **Протокол взаимодействия с источником** при [создании](../create-resource) или изменении CDN-ресурса.
      - В URL можно передать только доменное имя (FQDN).
      - Максимальная длина всего URL — 255 символов. Максимальная длина поддомена — 63 символа.

   1. Нажмите кнопку **Сохранить изменения**.

1. (Опционально) Измените тип отдельного источника:

   1. Нажмите ![pencil-icon](./assets/pencil-icon.svg "inline") в строке источника.
   1. В открывшемся окне измените тип источника. Нельзя изменить тип источника, если это единственный `Активный` включенный источник в группе.
   1. Нажмите кнопку **Сохранить изменения**.

1. (Опционально) Удалите отдельный источник, нажав ![trash-icon](./assets/trash-icon.svg "inline") в строке источника. Нельзя удалить источник, если это единственный `Активный` включенный источник в группе.

1. Нажмите **Сохранить изменения**.

</tabpanel>
</tabs>

## Редактирование группы источников

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, в котором находится нужная группа источников.
1. Перейдите в раздел **CDN → Группы источников**.
1. Перейдите к редактированию группы одним из способов:

   - Нажмите на имя группы, в которую нужно добавить источник.
   - Нажмите ![ ](/ru/assets/menu-icon.svg "inline") в строке группы и выберите **Настройки группы**.

1. (Опционально) Измените имя группы источников.
1. (Опционально) [Добавьте](#dobavlenie_istochnika_v_gruppu) один или несколько источников.
1. (Опционально) [Отредактируйте](#redaktirovanie_istochnikov_v_gruppe) источники в группе.
1. Если вы добавляли новые источники или изменяли существующие, то убедитесь, что для доменов этих источников (в том числе выключенных) настроены DNS-записи.

   <warn>

   Если VK Cloud не сможет проверить доступность этих доменов с помощью запроса к DNS, то группу источников создать не удастся.

   </warn>

1. (Опционально) Включите или отключите **Использовать следующий источник из списка при 4XX и 5XX кодах на источнике**.

   Когда опция выбрана, CDN-серверы будут обращаться к следующим источникам из списка, если запрашиваемый источник недоступен. Подробнее о выборе источника читайте в разделе [Группы источников](../../concepts/origin-groups).

   Oпция доступна, если в группе источников настроено более одного источника.

1. Нажмите кнопку **Сохранить изменения**.

</tabpanel>
</tabs>

## Удаление группы источников

<warn>

Группу источников нельзя удалить, если она используется CDN-ресурсом.

Чтобы получить возможность удалить такую группу, сначала назначьте другую группу источников для этого ресурса или [удалите ресурс](../delete-resource).

</warn>

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, в котором находится нужная группа источников.
1. Перейдите в раздел **CDN → Группы источников**.
1. Раскройте меню нужной группы источников и выберите пункт **Удалить группу**.
1. Нажмите кнопку **Подтвердить**.

</tabpanel>
</tabs>