{includetag(detail-all)}
Все списания и поступления по проектам фиксируются в личном кабинете {var(cloud)} на {ifdef(public)}[странице баланса](https://msk.cloud.vk.com/app/services/billing){/ifdef}{ifndef(public)}странице баланса{/ifndef} проекта.

{ifdef(public)}
Детализация расходов доступна пользователям, чья {linkto(../../../../tools-for-using-services/account/concepts/rolesandpermissions#tools-account-concepts-rolesandpermissions)[text=роль]} в проекте — владелец, суперадминистратор, администратор проекта или администратор биллинга.

{note:warn}
Детализация списаний и пополнений в {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=регионе]} Москва привязана к московскому времени (GMT+3), в регионе Казахстан — ко времени Астаны (GMT+6).

Этот же принцип действует при {linkto(../../concepts/report#billing-report)[text=формировании отчетных документов]}.
{/note}
{/ifdef}

## {heading(Просмотр списаний и поступлений)[id=includes-detail-debits-receipts-view]}
{/includetag}
{includetag(file-billing-detail)}
1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
   {/includetag}
   {includetag(file-account-detail)}
1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]} в личный кабинет {var(cloud)}.
   {/includetag}
   {includetag(detail-all)}
1. Откройте страницу баланса проекта одним из способов:

   - Нажмите на имя пользователя в шапке страницы, из выпадающего списка выберите **Баланс и платежи**.
   - Перейдите в раздел **Баланс**.
   {/includetag}
   {includetag(file-billing-detail)}
1. Перейдите на вкладку **Детализация**.
   {/includetag}
   {includetag(detail-all)}
   {note:warn}
   Суммы меньше копейки округляются вверх до 1 копейки, в том числе при расчете итоговой стоимости.
   {/note}

1. При необходимости установите фильтры на отображаемые записи:

   - Установите дату, при необходимости воспользуйтесь детализацией за период.
   - Укажите тип движения средств: списания или поступления.
     {/includetag}
     {includetag(file-billing-detail)}
   - Настройте отображаемые проекты, нажав на значок ![Фильтр](../../../../assets/filter_icon.svg "inline") и выбрав проекты из списка.
     {/includetag}
     {includetag(file-account-detail)}
   - Настройте отображаемые проекты, нажав на значок ![Фильтр](../../../../../assets/filter_icon.svg "inline") и выбрав проекты из списка.
     {/includetag}
     
{includetag(detail-all)}
## {heading(Просмотр статистики потребления ресурсов)[id=includes-detail-consumption-statistics-view]}
{/includetag}

{includetag(file-billing-detail)}
1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
   {/includetag}
   {includetag(file-account-detail)}
1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]} в личный кабинет {var(cloud)}.
   {/includetag}
   {includetag(detail-all)}
1. Откройте страницу баланса проекта одним из способов:

   - Нажмите на имя пользователя в шапке страницы, из выпадающего списка выберите **Баланс и платежи**.
   - Перейдите в раздел **Баланс**.

1. Перейдите на вкладку **Расходы на сервисы**.
1. При необходимости установите фильтры на отображаемые записи:

   - Установите дату, при необходимости воспользуйтесь детализацией за период.
   - Укажите тип движения средств: списания или поступления.
     {/includetag}
     {includetag(file-billing-detail)}
   - Настройте отображаемые проекты, нажав на значок ![Фильтр](../../../../assets/filter_icon.svg "inline") и выбрав проекты из списка.
     {/includetag}
     {includetag(file-account-detail)}
   - Настройте отображаемые проекты, нажав на значок ![Фильтр](../../../../../assets/filter_icon.svg "inline") и выбрав проекты из списка.
     {/includetag}
     {includetag(detail-all)}
     В списке отображаются проекты, в которых ваша роль — владелец или суперадминистратор. По умолчанию данные отфильтрованы по текущему проекту.

## {heading(Скачивание отчета)[id=includes-detail-report-download]}
{/includetag}

{includetag(file-billing-detail)}
1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
   {/includetag}
   {includetag(file-account-detail)}
1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]} в личный кабинет {var(cloud)}.
   {/includetag}
   {includetag(detail-all)}
1. Откройте страницу баланса проекта одним из способов:

   - Нажмите на имя пользователя в шапке страницы, из выпадающего списка выберите **Баланс и платежи**.
   - Перейдите в раздел **Баланс**.

   {/includetag}
   {includetag(file-billing-detail)}
1. При необходимости установите фильтры на отображаемые записи.
1. Перейдите на вкладку **Детализация**.
1. Нажмите на значок ![Скачать](../../../../assets/download_icon.svg "inline").
   {/includetag}
   {includetag(file-account-detail)}
1. При необходимости на вкладке **Детализация** установите фильтры на отображаемые записи.
1. Нажмите на значок ![Скачать](../../../../../assets/download_icon.svg "inline").
   {/includetag}
   {includetag(detail-all)}
1. {ifdef(public)}Выберите {linkto(/ru/intro/billing/concepts/balance#billing-details)[text=отчет]} в открывшемся окне:

   {tabs}

   {tab(Отчет потребления)}

   Отчет с общей суммой расходов за указанный период.

   {/ifdef}
   Заполните параметры отчета:
   {/includetag}
   {includetag(file-billing-detail)}
   - **Период**: период времени, за который вы хотите выгрузить отчет.
   - **Детализация**: уровень детализации данных в отчете (день, неделя, месяц или год).
     {/includetag}
     {includetag(detail-all)}
   - **Тип отчета**: тип скачиваемого отчета — `docx`, `xlsx`, `Для бухгалтерии`.
   - **Выберите проекты, по которым вы хотите получить отчеты**: один или несколько проектов.

     В списке отображаются проекты, в которых ваша роль — владелец или суперадминистратор. По умолчанию данные отфильтрованы по текущему проекту.

   {ifdef(public)}
   {/tab}

   {tab(Гранулярный отчет)}

   Подробный отчет с суммой расходов по каждому параметру сервисов {var(cloud)} с группировкой по дням.

   Заполните параметры отчета:

   - **Период**: период времени, за который вы хотите выгрузить отчет.
   - **Формат файла**: формат скачиваемого отчета —`CSV`, `xlsx`.
   - **Выберите проекты, по которым вы хотите получить отчеты**: один или несколько проектов.

     В списке отображаются проекты, в которых ваша роль — владелец или суперадминистратор. По умолчанию данные отфильтрованы по текущему проекту.
   
   {/tab}

   {/tabs}

{/ifdef}

1. Нажмите кнопку **Скачать отчет**.
{/includetag}