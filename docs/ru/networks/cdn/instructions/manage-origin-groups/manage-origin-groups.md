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
1. Добавьте один или несколько источников:

   1. Нажмите на ссылку ![plus-icon](./assets/plus-icon.svg "inline") **Добавить источник**.
   1. Задайте параметры источника:

      - **Адрес:** URL, по которому нужно обращаться к источнику.

        - URL может содержать только латинские буквы, цифры и символы `.`, `-`.
        - URL не должен содержать схему (`http://` или `https://`): она уже добавлена автоматически в виде `http(s)://`. Конкретный протокол определяется соответствующим параметром, который задается опцией **Протокол взаимодействия с источником** при [создании](../create-resource) или изменении CDN-ресурса.
        - В URL можно передать только доменное имя (FQDN).
        - Максимальная длина всего URL — 255 символов. Максимальная длина поддомена — 63 символа.

        **Примеры:**

        - `example.org`,
        - `images.example.com`.

      - **Тип источника:** активный или резервный.

        Эта опция влияет на порядок выбора источника при запросе контента CDN-серверами. По умолчанию контент запрашивается только с активных источников. Резервные источники используются в случае недоступности активных источников. Подробнее о выборе источника читайте в разделе [Группы источников](../../concepts/origin-groups).

        Первый источник, который добавляется в пустую группу, всегда будет активным. Добавьте другие источники, чтобы можно было выбрать их тип.

   1. Нажмите кнопку **Добавить источник**.

1. (Опционально) Включите или выключите отдельные источники с помощью переключателя справа от типа источника.

   Нельзя выключить источник типа `Активный`, если это единственный источник такого типа в группе.

   Выключенный источник не будет использоваться при запросе контента CDN-серверами.

1. (Опционально) Измените параметры отдельного источника, нажав на значок ![pencil-icon](./assets/pencil-icon.svg "inline") справа от типа источника:

   1. Задайте нужные значения параметров. Описание параметров приведено выше.
   1. Нажмите кнопку **Сохранить изменения**.

1. (Опционально) Удалите отдельный источник, нажав на значок ![trash-icon](./assets/trash-icon.svg "inline") справа от типа источника.

   Нельзя удалить источник типа `Активный`, если это единственный источник такого типа в группе.

1. Убедитесь, что для доменов всех добавленных источников (в том числе выключенных) настроены DNS-записи.

   <warn>

   Если VK Cloud не сможет проверить доступность этих доменов с помощью запроса к DNS, то группу источников создать не удастся.

   </warn>

1. Выберите опцию **Использовать следующий источник из списка при 4XX и 5XX кодах на источнике**, чтобы CDN-серверы обращались к следующим источникам из списка, если запрашиваемый источник недоступен. Подробнее о выборе источника читайте в разделе [Группы источников](../../concepts/origin-groups).

   Эта опция доступна, если в группе источников настроено более одного источника.

1. Нажмите кнопку **Создать группу**.

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
1. Раскройте меню нужной группы источников и выберите пункт **Настройки группы**.
1. (Опционально) Измените имя группы источников.
1. (Опционально) Добавьте один или несколько источников:

   1. Нажмите на ссылку ![plus-icon](./assets/plus-icon.svg "inline") **Добавить источник**.
   1. Задайте параметры источника:

      - **Адрес:** URL, по которому нужно обращаться к источнику.

        - URL может содержать только латинские буквы, цифры и символы `.`, `-`.
        - URL не должен содержать схему (`http://` или `https://`): она уже добавлена автоматически в виде `http(s)://`. Конкретный протокол определяется соответствующим параметром, который задается опцией **Протокол взаимодействия с источником** при [создании](../create-resource) или изменении CDN-ресурса.
        - В URL можно передать только доменное имя (FQDN).
        - Максимальная длина всего URL — 255 символов. Максимальная длина поддомена — 63 символа.

        **Примеры:**

        - `example.org`,
        - `images.example.com`.

      - **Тип источника:** активный или резервный.

        Эта опция влияет на порядок выбора источника при запросе контента CDN-серверами. По умолчанию контент запрашивается только с активных источников. Резервные источники используются в случае недоступности активных источников. Подробнее о выборе источника читайте в разделе [Группы источников](../../concepts/origin-groups).

   1. Нажмите кнопку **Добавить источник**.

1. (Опционально) Включите или выключите отдельные источники с помощью переключателя справа от типа источника.

   Нельзя выключить источник типа `Активный`, если это единственный источник такого типа в группе.

   Выключенный источник не будет использоваться при запросе контента CDN-серверами.

1. (Опционально) Измените параметры отдельного источника, нажав на значок ![pencil-icon](./assets/pencil-icon.svg "inline") справа от типа источника:

   1. Задайте нужные значения параметров. Описание параметров приведено выше.
   1. Нажмите кнопку **Сохранить изменения**.

1. (Опционально) Удалите отдельный источник, нажав на значок ![trash-icon](./assets/trash-icon.svg "inline") справа от типа источника.

   Нельзя удалить источник типа `Активный`, если это единственный источник такого типа в группе.

1. Если вы добавляли новые источники или изменяли существующие, то убедитесь, что для доменов этих источников (в том числе выключенных) настроены DNS-записи.

   <warn>

   Если VK Cloud не сможет проверить доступность этих доменов с помощью запроса к DNS, то группу источников создать не удастся.

   </warn>

1. (Опционально) Измените выбор опции **Использовать следующий источник из списка при 4XX и 5XX кодах на источнике**, чтобы повлиять на порядок выбора источника при запросе контента CDN-серверами.

   При выбранной опции CDN-серверы будут обращаться к следующим источникам из списка, если тот источник, к которому эти серверы обращаются, недоступен. Если все источники недоступны, CDN-серверы будут возвращать ответ последнего источника в списке при запросе контента. Подробнее о выборе источника читайте в разделе [Группы источников](../../concepts/origin-groups).

   Эта опция доступна, если в группе источников настроено более одного источника.

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
