## Привязать карту

Карта может быть привязана к проекту:

- при [регистрации](/ru/intro/start/account-registration) аккаунта;
- самостоятельно в любое время.

После привязки карты в проекте появляется доступ к сервисам.

Для оплаты сервисов рекомендуется использовать физические банковские карты, так как платежи с виртуальных карт могут быть отклонены системой безопасности.

{note:info}

Юридическим лицам рекомендуется оплачивать сервисы при помощи банковских переводов. Платежи с карт не учитываются в [отчетных документах](../../concepts/report#yuridicheskie_lica).

{/note}

Чтобы привязать карту:

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
2. Откройте страницу баланса проекта одним из способов:

    - Нажмите на имя пользователя в шапке страницы, из выпадающего списка выберите **Баланс и платежи**.
    - Перейдите в раздел **Баланс**.

3. Нажмите кнопку **Привязать карту**.
4. В окне привязки карты введите ее данные в поля **Номер карты**, **месяц / год** и **CV-код**.

    Если на счете достаточно средств, с карты будет списана тестовая сумма, которая будет зачислена на [баланс проекта](/ru/intro/billing/concepts/balance). После этого карта будет успешно привязана.

    {note:info}

    Если тестовая сумма не была израсходована на оплату сервисов, то ее можно вернуть через [техническую поддержку](/ru/contacts).
   
    {/note}

5. Нажмите кнопку **Добавить карту**.
6. В окне подтверждения оплаты введите СМС-код, полученный от банка.

    После успешного списания карта будет привязана.

7. (Опционально) На открывшейся вкладке **Автопополнение** [настройте](#nastroit_avtopopolnenie) автопополнение лицевого счета. Чтобы пропустить этот шаг, отключите опцию **Включить автопополнение баланса**.
8. Нажмите кнопку **Сохранить изменения**.

{note:info}

Полный список способов оплаты в статье [Способы оплаты](../../concepts/payment-methods).

{/note}

## Настроить автопополнение

Автопополнение позволяет автоматически пополнять [лицевой счет проекта](../../concepts/balance) с привязанной карты, когда остаток средств на лицевом счету достигнет заданного значения. Настроить автопополнение можно в любой момент.

Включенное автопополнение не гарантирует, что на лицевом счету проекта всегда будут средства. Например, если на карте недостаточно средств, платеж не будет совершен.

{note:warn}

В [регионе](/ru/tools-for-using-services/account/concepts/regions) Казахстан автопополнение недоступно.

{/note}

Чтобы настроить автопополнение:

1. [Перейдите](https://cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Откройте страницу баланса проекта одним из способов:

    - Нажмите на имя пользователя в шапке страницы, из выпадающего списка выберите **Баланс и платежи**.
    - Перейдите в раздел **Баланс**.

1. На странице баланса нажмите на ссылку **Настроить автопополнение**.
1. Включите опцию **Включить автопополнение баланса**.
1. Заполните поля:

    - **Сумма автопополнения**: укажите сумму в диапазоне от `100` до `10000` рублей, на которую лицевой счет будет автоматически пополняться.

    - **Пополнение при остатке**: укажите остаток средств, при котором произойдет автопополнение — сумму в диапазоне от `0` до `9999999` рублей.

1. Нажмите кнопку **Сохранить изменения**.

## Отвязать карту

Чтобы отвязать карту, обратитесь в [техническую поддержку](/ru/contacts) и предоставьте информацию:

- [идентификатор (PID) проекта](/ru/tools-for-using-services/account/instructions/project-settings/manage#poluchenie_identifikatora_proekta);
- последние 4 цифры номера привязанной карты.

{note:info}

Если вы юридическое лицо и работаете по предоплате, оставьте карту как дополнительное средство оплаты для срочных платежей. Это поможет избежать [заморозки](/ru/tools-for-using-services/account/concepts/projects#avtomaticheskaya_zamorozka_proekta) проекта в случае несвоевременной оплаты. Списания по платежам с банковских карт не включаются в [закрывающие документы для юридических лиц](../../concepts/report#reporting_documents_composition): УПД, акт сверки взаиморасчетов.

{/note}
