# {heading(Подключение сервиса)[id=marketplace-pr-instance-add]}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef} в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Магазин приложений**.
1. На карточке нужного сервиса нажмите кнопку **Подробнее**.
1. Ознакомьтесь с описанием сервиса. При установке {linkto(../../../../applications-and-services/marketplace/concepts/about#marketplace-about-type-service)[text=image-based]} сервиса убедитесь, что в проекте достаточно квот.
1. Нажмите кнопку **Подключить**.
1. Следуйте шагам мастера конфигурации тарифного плана. {ifdef(private,private-pg,private-pdf,private-pg-pdf)}Шаги мастера конфигурации тарифного плана могут различаться для разных сервисов. Изменение значений тарифных опций может быть платным.{/ifdef}

   {ifdef(public)} 
   {note:info}
   Шаги могут различаться для {linkto(../../../../applications-and-services/marketplace/initial-configuration#marketplace-initial-configuration)[text=разных сервисов]}.
   {/note}
   {/ifdef}
   {ifdef(private,private-pg,private-pdf,private-pg-pdf)}
   {note:warn}
   ВМ image-based приложений должны иметь доступ к API {var(cloud)}.
   {/note}
1. На последней странице проверьте значения тарифных опций и стоимость использования сервиса.
   {/ifdef}
1. Подтвердите подключение сервиса.

   {ifdef(public)}
   Дождитесь завершения установки — на почту придет одноразовая ссылка с реквизитами для работы с сервисом. Сохраните их перед началом работы.
   {/ifdef}
   {ifdef(private,private-pg,private-pdf,private-pg-pdf)}
   Дождитесь завершения. Создание инстанса image-based приложения может занимать до 1,5 ч.

   На электронную почту придет одноразовая ссылка с реквизитами для работы с сервисом. Сохраните их.

   Статус созданного инстанса сервиса — **Активный**.

   Если создание инстанса сервиса завершилось с ошибкой (статус инстанса сервиса **Ошибка создания**), перезапустите {linkto(../../../../applications-and-services/marketplace/instructions/pr-instance-manage#marketplace-pr-instance-manage-update-service)[text=создание инстанса сервиса]}.
   {/ifdef}

{ifdef(public)}
{note:info}
Инструкции по началу работы с сервисами приведены в разделе {linkto(../../../../applications-and-services/marketplace/initial-configuration#marketplace-initial-configuration)[text=Настройка сервисов магазина приложений]}.
{/note}
{/ifdef}