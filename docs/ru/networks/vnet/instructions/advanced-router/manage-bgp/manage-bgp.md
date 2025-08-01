Продвинутый маршрутизатор позволяет установить связь между автономными сетями по [BGP-протоколу](../../../concepts/router#advanced). Для этого нужно добавить BGP-маршрутизатор и указать BGP-соседей.

## Добавление BGP-маршрутизатора

{note:info}
Можно добавить только один BGP-маршрутизатор для каждого продвинутого маршрутизатора.
{/note}

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

{include(/ru/_includes/_open_advanced_router.md)}

1. Выберите вкладку **Динамическая маршрутизация**.
1. Нажмите кнопку **Добавить BGP маршрутизатор**.
1. Задайте **Название** BGP-маршрутизатора. Допустимы только цифры, латинские буквы, пробелы и спецсимволы: `?`, `!`, `~`, `@`, `#`, `$`, `%`, `^`, `"`, `&`, `_`, `-`, `+`, `*`, `=`, `;`, `:`, `,`, `.`, `/`, `\`, `|`, `` ` ``, `[`, `]`, `{`, `}`, `(`, `)`, `<`, `>`.
1. Укажите IP-адрес BGP-маршрутизатора — интерфейс маршрутизатора, направленный в транзитную сеть. Используйте самый высокий IP-адрес на интерфейсе обратной связи или на физическом интерфейсе.
1. Укажите **ASN** из диапазона 64512–65534.
1. (Опционально) Выключите BGP-маршрутизатор, если устанавливать связь в данный момент не нужно. BGP-маршрутизатор станет неактивным.
1. (Опционально) Добавьте описание BGP-маршрутизатора.
1. Нажмите кнопку **Создать**.

</tabpanel>
</tabs>

## Редактирование BGP-маршрутизатора

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

{include(/ru/_includes/_open_advanced_router.md)}

1. Выберите вкладку **Динамическая маршрутизация**.
1. Откройте страницу редактирования динамического маршрутизатора одним из способов:

   - Нажмите на название BGP-маршрутизатора, затем нажмите кнопку **Редактировать**.
   - Нажмите ![ ](/ru/assets/more-icon.svg "inline") для BGP-маршрутизатора и выберите **Редактировать**.

1. Выполните одно из доступных действий:

   - Измените название маршрутизатора.
   - Измените описание маршрутизатора.
   - Включите опцию **ECMP**. Маршрутизатор создаст несколько маршрутов до одного места назначения. При передаче данных, если один из маршрутов недоступен, автоматически будет выбран другой. Это позволяет повысить пропускную способность и отказоустойчивость.
   - Включите опцию **Graceful restart**. После перезапуска узла BGP-маршрутизатор сохранит свое состояние и продолжит передавать данные.
   - Включите опцию **Long lived graceful restart**. BGP маршрутизатор сохранит свое состояние на более длительное время в случае отказа BGP-узла.
   - Выключите BGP-маршрутизатор, если устанавливать связь в данный момент не нужно. BGP-маршрутизатор станет неактивным.
1. Нажмите кнопку **Сохранить изменения**.

</tabpanel>
</tabs>

## Удаление BGP-маршрутизатора

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

{include(/ru/_includes/_open_advanced_router.md)}

1. Выберите вкладку **Динамическая маршрутизация**.
1. Удалите маршрутизатор одним из способов:

   - Нажмите ![ ](/ru/assets/more-icon.svg "inline") для маршрутизатора и выберите пункт **Удалить**.
   - Выберите маршрутизатор с помощью флажка, затем нажмите кнопку **Удалить** над таблицей.
1. Подтвердите удаление.

</tabpanel>
</tabs>

## Добавление BGP-соседства

Чтобы связать автономные сети по  BGP-протоколу, нужно указать BGP-маршрутизаторы сетей, с которыми будет установлено соединение.

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

{include(/ru/_includes/_open_advanced_router.md)}

1. Выберите вкладку **Динамическая маршрутизация**.
1. Нажмите на название BGP-маршрутизатора.
1. Нажмите кнопку **Добавить BGP соседа**.
1. (Опционально) Укажите название BGP-соседства. Допустимы только цифры, латинские буквы, пробелы и спецсимволы: `?`, `!`, `~`, `@`, `#`, `$`, `%`, `^`, `"`, `&`, `_`, `-`, `+`, `*`, `=`, `;`, `:`, `,`, `.`, `/`, `\`, `|`, `` ` ``, `[`, `]`, `{`, `}`, `(`, `)`, `<`, `>`.
1. Укажите интерфейс, направленный в транзитную сеть соседнего BGP-маршрутизатора.
1. Укажите **ASN** удаленной сети. Если для сети не задан ASN, используйте приватные номера ASN из диапазона 64512–65534.
1. (Опционально) Выключите BGP-соседство, если устанавливать связь в данный момент не нужно. BGP-маршрутизатор не будет отправлять запросы удаленному маршрутизатору.
1. (Опционально) Добавьте описание BGP-маршрутизатора.
1. Нажмите кнопку **Добавить**.

</tabpanel>
</tabs>

После добавления BGP-соседа маршрутизатор будет пытаться установить с ним связь. Признаки установленной связи:

- маркер рядом с названием BGP-соседа зеленый;
- BFD включен.

## Редактирование BGP-соседства

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

{include(/ru/_includes/_open_advanced_router.md)}

1. Выберите вкладку **Динамическая маршрутизация**.
1. Нажмите на название BGP-маршрутизатора, затем перейдите на вкладку **BGP соседи**.
1. Нажмите на название BGP-соседства.
1. Откройте страницу редактирования BGP-соседства одним из способов:

   - Нажмите на название BGP-соседства, затем нажмите кнопку **Редактировать**.
   - Нажмите ![ ](/ru/assets/more-icon.svg "inline") для BGP-соседства и выберите **Редактировать**.

1. Выполните одно из доступных действий:

   - Измените название BGP-соседства.
   - Измените описание BGP-соседства.
   - В поле **Add path** выберите режим работы соседа, который определяет возможность обмена всеми вариантами маршрутизации для каждого анонса. Доступные варианты:

      - **off**: выключен;
      - **on**: включен в оба направления;
      - **rx**: включен только на прием;
      - **tx**: включен только на передачу.

   - Включите опцию **BFD**. Это позволяет использовать контроль сессии через BFD (Bidirectional Forwarding Detection).
   - Включите опцию **Next Hop Self**. BGP-соседу передается IP-адрес интерфейса маршрутизатора, который передает анонс, в качестве промежуточного узла (Next Hop).
   - Выключите BGP-соседство, если устанавливать связь в данный момент не нужно. BGP-маршрутизатор не будет отправлять запросы удаленному маршрутизатору.
1. Нажмите кнопку **Сохранить изменения**.

</tabpanel>
</tabs>

## Удаление BGP-соседства

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

Это групповая операция: при необходимости можно удалить сразу несколько соседей, выбрав их с помощью флажков.

{include(/ru/_includes/_open_advanced_router.md)}

1. Выберите вкладку **Динамическая маршрутизация**.
1. Нажмите на название BGP-маршрутизатора, затем перейдите на вкладку **BGP соседи**.
1. Нажмите на название BGP-соседства.
1. Удалите BGP-соседство одним из способов:

   - Нажмите ![ ](/ru/assets/more-icon.svg "inline") для BGP-соседа и выберите пункт **Удалить**.
   - Выберите BGP-соседа с помощью флажка, затем нажмите кнопку **Удалить** над таблицей.
   - Нажмите на название BGP-соседа, затем нажмите кнопку **Удалить** над таблицей.
1. Подтвердите удаление.

</tabpanel>
</tabs>

## Просмотр BGP-анонса

После настройки BGP-соседа продвинутый маршрутизатор начнет передавать соседу BGP-анонсы всех сетей, в которые направлены его интерфейсы.

Чтобы просмотреть BGP-анонсы:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

{include(/ru/_includes/_open_advanced_router.md)}

1. Выберите вкладку **Динамическая маршрутизация**.
1. Нажмите на название BGP-маршрутизатора.
1. Перейдите на вкладку **BGP анонсы**.

На вкладке отображается список всех BGP-анонсов. Активные анонсы отмечены зелеными маркерами.

</tabpanel>
</tabs>

## Добавление BGP-анонса

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

{include(/ru/_includes/_open_advanced_router.md)}

1. Выберите вкладку **Динамическая маршрутизация**.
1. Нажмите на название BGP-маршрутизатора, затем перейдите на вкладку **BGP анонсы**.
1. Нажмите кнопку **Добавить BGP анонс**.
1. Выберите тип анонса:

   <tabs>
   <tablist>
   <tab>Static</tab>
   <tab>Connected</tab>
   </tablist>
   <tabpanel>

   В анонсе передается статический маршрут, заданный вручную.

   1. Укажите параметры запроса:

      - **Сеть**: адрес с маской cети, которая будет анонсирована BGP-соседу.
      - **Шлюз по умолчанию**: IP-адрес шлюза. Если шлюз будет доступен, сеть будет анонсирована в BGP.
      - (Опционально) Выключите BGP-анонс, если эту сеть не нужно анонсировать BGP-соседу. BGP-анонс станет неактивным.
      - (Опционально) Добавьте описание BGP-анонса.
   1. Нажмите кнопку **Добавить**.

   </tabpanel>
   <tabpanel>

   В анонсе передается подсеть, подключенная к интерфейсу продвинутого маршрутизатора.

   1. В поле **Подключенная подсеть** выберите подсеть из списка подключенных к маршрутизатору.
   1. Нажмите кнопку **Подключить**.

   </tabpanel>
   </tabs>

</tabpanel>
</tabs>

## Редактирование BGP-анонса

Редактировать можно только анонсы типа **Static**.

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

{include(/ru/_includes/_open_advanced_router.md)}

1. Выберите вкладку **Динамическая маршрутизация**.
1. Нажмите на название BGP-маршрутизатора, затем перейдите на вкладку **BGP анонсы**.
1. Откройте страницу редактирования BGP-анонса одним из способов:

   - Нажмите на адрес подсети, которая передается в анонсе, затем нажмите кнопку **Редактировать**.
   - Нажмите ![ ](/ru/assets/more-icon.svg "inline") для BGP-анонса и выберите пункт **Редактировать**.

1. Выполните одно из доступных действий:

   - Выключите BGP-анонс, если эту сеть не нужно анонсировать BGP-соседу.
   - Измените описание BGP-анонса.

1. Нажмите кнопку **Сохранить изменения**.

</tabpanel>
</tabs>

## Удаление BGP-анонса

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

Это групповая операция: при необходимости можно удалить сразу несколько анонсов, выбрав их с помощью флажков.

{include(/ru/_includes/_open_advanced_router.md)}

1. Выберите вкладку **Динамическая маршрутизация**.
1. Нажмите на название BGP-маршрутизатора, затем перейдите на вкладку **BGP анонсы**.
1. Нажмите на название BGP-анонса.
1. Удалите BGP-анонс одним из способов:

   - Нажмите ![ ](/ru/assets/more-icon.svg "inline") для BGP-анонса и выберите пункт **Удалить**.
   - Выберите BGP-анонс с помощью флажка, затем нажмите кнопку **Удалить** над таблицей.
   - (Только для **Static**) Нажмите на название BGP-анонса, затем нажмите кнопку **Удалить** над таблицей.
1. Подтвердите удаление.

</tabpanel>
</tabs>
