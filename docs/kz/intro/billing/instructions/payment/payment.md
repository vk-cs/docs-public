# {heading(Жоба балансын басқару)[id=billing-payment]}

{include(/kz/_includes/_translated_by_ai.md)}

{note:info}
Шығындар детализациясын қарап, дербес шотты {linkto(../../../../access/iam/concepts/rolesandpermissions#iam-concepts-rolesandpermissions)[text=рөлі]} {linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=жобада]} иесі, суперадминистратор немесе биллинг әкімшісі болып табылатын пайдаланушылар толықтыра алады.
{/note}

## {heading(Балансты қарау)[id=billing-payment-balance-view]}

{include(../../../../_includes/_balance-view.md)}

## {heading(Қаражат енгізу)[id=billing-payment-balance-charge]}

Қаражатты тек жоба {linkto(../../concepts/balance#billing-balance)[text=дербес шотының балансына]} ғана енгізуге болады.

Жоба дербес шотының балансына қаражат енгізу үшін:

1. [Өтіңіз](https://kz.cloud.vk.com/app/) {var(cloud)} жеке кабинетіне.
1. Балансты толтыру терезесін бір жолмен ашыңыз:

   - Меңзерді белгішенің үстіне апарыңыз ![balance](/kz/intro/billing/assets/balance.svg "inline") беттің қақпағында және **Балансты толтыру** түймесін басыңыз.
   - Белгішені басу арқылы **Баланс** бөліміне өтіңіз ![balance](/kz/intro/billing/assets/balance.svg "inline") беттің қақпағында және **балансты толтыру**түймесін басыңыз.
1. Толықтыру сомасын көрсетіңіз.

   Шотты толықтырудың ең аз сомасы — {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=Москва өңіріндегі]} жобалар үшін 10 рубль және Қазақстан өңіріндегі жобалар үшін 100 теңге.

1. {linkto(../../concepts/payment-methods#billing-payment-methods)[text=Төлем тәсілдерінің]} бірін таңдаңыз.

   Банк картасымен төлеу үшін келесі опциялар қол жетімді:
   
   - **Карта**: картамен төлеу үшін, {linkto(../add-card#billing-add-card-bind)[text=байланыстырылған]} жобаға. Карта деректемелерін енгізудің қажеті жоқ.

   - **Банк картасы**: жаңа төлем әдісін қосу үшін:

      - Жаңа карта.
      - Жылдам төлемдер жүйесі (СБП) арқылы. Сіз байланыстыру **Tөлем үшін сақтау** құсбелгісін қойып, жобаға SBP төлемін.
   
        {note:info}
        СБП арқылы төлемді жобаңыздан ажырату үшін [техникалық қолдауға](/kz/contacts) хабарласыңыз.
        {/note}

      - SberPay немесе ЮМопеу арқылы электрондық төлемдер арқылы.
   
   - **Заңды тұлғалар үшін шот бойынша төлеу**: қалыптастырылған шот бойынша банктік аударыммен төлеу үшін. Шотты қалыптастырмас бұрын компанияңыз туралы деректерді {linkto(../corporate#billing-corporate-registration-complete)[text=енгізе]} немесе {linkto(../corporate#billing-corporate-company-edit)[text=өзгерте]} аласыз.

   Заңды тұлғалар мен ЖК үшін **Заңды тұлғалар үшін шот бойынша төлеу** төлем тәсілі ұсынылады. Қызметтерді банктік аударымнан өзге тәсілдермен төлеу заңды тұлғалар мен ЖК үшін {linkto(../../concepts/report#billing-report)[text=есептік құжаттарда]} ескерілмейді.

## {heading(Шығындар туралы хабарландырулар)[id=billing-payment-expense-notifications]}

{include(../../../../_includes/_billing-settings.md)[tags=notifications]}