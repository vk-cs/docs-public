# {heading(Жоба балансын басқару)[id=billing-payment]}

{include(/kz/_includes/_translated_by_ai.md)}

{note:info}
Шығындар детализациясын қарап, дербес шотты {linkto(../../../../tools-for-using-services/account/concepts/rolesandpermissions#tools-account-concepts-rolesandpermissions)[text=рөлі]} {linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=жобада]} иесі, суперадминистратор немесе биллинг әкімшісі болып табылатын пайдаланушылар толықтыра алады.
{/note}

## {heading(Балансты қарау)[id=billing-payment-balance-view]}

{include(../../../../_includes/_balance-view.md)}

## {heading(Қаражат енгізу)[id=billing-payment-balance-charge]}

Қаражатты тек жоба {linkto(../../concepts/balance#billing-balance)[text=дербес шотының балансына]} ғана енгізуге болады.

Жоба дербес шотының балансына қаражат енгізу үшін:

1. [Өтіңіз](https://kz.cloud.vk.com/app/) {var(cloud)} жеке кабинетіне.
1. Жеке кабинет бетінің жоғарғы бөлігіндегі ![Толықтыру](./assets/icon_plus.svg "inline") белгішесін басыңыз немесе {linkto(#billing-payment-balance-view)[text=баланс бетінде]} **Балансты толықтыру** түймесін басыңыз.
1. Толықтыру сомасын көрсетіңіз.

   Шотты толықтырудың ең аз сомасы — {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=Москва өңіріндегі]} жобалар үшін 10 рубль және Қазақстан өңіріндегі жобалар үшін 100 теңге.

1. {linkto(../../concepts/payment-methods#billing-payment-methods)[text=Төлем тәсілдерінің]} бірін таңдаңыз.

   Банк картасымен төлеу үшін екі опция қолжетімді:

    - **Карта**: жобаға {linkto(../add-card#billing-add-card-bind)[text=байланыстырылған]} картамен төлеу үшін.

      Осы опцияны таңдағанда карта деректемелерін енгізу қажет емес.

    - **Банк картасы**: жобаға байланыстырылмаған картамен төлеу үшін.
    - **Заңды тұлғалар үшін шот бойынша төлеу**: қалыптастырылған шот бойынша банктік аударыммен төлеу үшін. Шотты қалыптастырмас бұрын компанияңыз туралы деректерді {linkto(../corporate#billing-corporate-registration-complete)[text=енгізе]} немесе {linkto(../corporate#billing-corporate-company-edit)[text=өзгерте]} аласыз.

   {note:info}
   Заңды тұлғалар мен ЖК үшін **Заңды тұлғалар үшін шот бойынша төлеу** төлем тәсілі ұсынылады. Қызметтерді банктік аударымнан өзге тәсілдермен төлеу заңды тұлғалар мен ЖК үшін {linkto(../../concepts/report#billing-report)[text=есептік құжаттарда]} ескерілмейді.
   {/note}

## {heading(Шығындар туралы хабарландырулар)[id=billing-payment-expense-notifications]}

{include(../../../../_includes/_billing-settings.md)[tags=notifications]}