# {heading(Логтарды қарау)[id=logging-view-logs]}

{include(/kz/_includes/_translated_by_ai.md)}

Логтарды қарау үшін ыңғайлы тәсілді пайдаланыңыз:

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifndef} {var(cloud)} жеке кабинетіне.
1. **Мониторинг** → **Логтау** бөліміне өтіңіз.
1. (Опционалды түрде) Сүзгілер үшін мәндерді таңдаңыз.
1. (Опционалды түрде) Іздеу үшін мән енгізіңіз немесе {linkto(../../concepts/search-tools#logging-search-tools)[text=іздеу сұрауларының тілін]} пайдаланып сұрау құрастырыңыз.

    Іздеу өрнектерінің мысалдары:

      {include(../../../../_includes/_logs_query.md)}

{/tab}

{tab(API)}

{ifdef(public)}{linkto(../../../../tools-for-using-services/api/api-spec/logging#api-spec-logging)[text=API әдістерін]}{/ifdef}{ifndef(public)}Cloud Logging API әдістерін{/ifndef} пайдаланыңыз.

Іздеу нәтижелерін нақтылау үшін `like` параметрінде `message` өрісінен іздеуге арналған өрнекті көрсетіңіз. Іздеу өрнегін жазу үшін {linkto(../../concepts/search-tools#logging-search-tools)[text=іздеу сұрауларының тілін]} пайдаланыңыз.

Іздеу өрнектерінің мысалдары:

  {include(../../../../_includes/_logs_query.md)}

{/tab}

{tab(Grafana)}

1. Жобаңызда [Қолданбалар дүкенінен](https://kz.cloud.vk.com/app/services/marketplace) Grafana сервисін {linkto(../../../../applications-and-services/marketplace/instructions/pr-instance-add#marketplace-pr-instance-add)[text=орналастырыңыз]}.

    Сервис орналастырылған кезде ол Cloud Logging-пен автоматты түрде біріктіріледі:

      - Grafana-ға Cloud Logging сервисінен қолданба логтарын алуға мүмкіндік беретін байланыс орнатылады.
      - Grafana ішінде Cloud Logging-пен байланысты дереккөздер (data sources) бапталады.

1. Grafana консоліне өтіп, онда авторизациядан өтіңіз.
1. Дашборд жасап, оған визуализация қосыңыз.
1. `{var(cloud)} Logging`-пен байланысты дереккөзді таңдаңыз.
1. Оң жақ жоғарғы бұрыштағы тізімнен `Logs` визуализациясын таңдаңыз.
1. (Опционалды түрде) Визуализация параметрлерін баптаңыз:

   - **Time**: уақыт бағанын көрсету. Онда лог жазбаларына байланысты Cloud Logging жүйесінің уақыт белгілері болады.
   - **Unique Labels**: `group_id` және `stream_id` параметрлері бар бағандарды көрсету.
   - **Common Labels**: логтарды `group_id` және `stream_id` параметрлерінің мәндері бойынша топтау.
   - **Wrap Lines**: жолдарды тасымалдауды қосу.
   - **Prettify JSON**: JSON форматындағы логтардың визуализациясын жақсартуды қосу.
   - **Enable log details**: логтың егжей-тегжейлі мазмұны бар кеңейтілетін аймақты көрсету.

1. **Service** өрісінде логтарын дашбордта көрсеткіңіз келетін сервистің идентификаторын көрсетіңіз. {var(cloud)} логтау жүйесінде алдын ала бапталған сервис идентификаторларын немесе {linkto(../../concepts/logging-plugin#logging-conf-parameters)[text=жеке идентификаторларды]} пайдаланыңыз.

    {tabs}

    {tab(Алдын ала бапталған идентификаторлар)}

    - `default` — өзіне байланыстырылған сервистері жоқ және тестілеу мен жөндеуге арналған идентификатор.
    - `containers` — Cloud Containers.
    - `databases` — Cloud Databases.
    - `vdi` — Cloud Desktop.
    - `mlplatform` — Cloud ML Platform.

    {/tab}

    {tab(Жеке идентификаторлар)}

    Жеке идентификаторлар (`service_ID`) **Мониторинг → Логтау** бөлімінің баптауларындағы **Басқа ресурстар** қойындысында орналасқан. Олар кіші латын әріптерінен, сандардан және `-` таңбасынан тұрады, мысалы `a01bc23-d456-7890-a1bc-d2e3f45g6789`.

    {/tab}

    {/tabs}

1. **Apply** батырмасын басыңыз.
1. (Опционалды түрде) **Group** өрісінде логтар тобының идентификаторын (`group_id`) көрсетіңіз. Оны орнату кезінде {linkto(../../concepts/logging-plugin#logging-conf-parameters)[text=логтау плагинінің баптауларында]} көрсетілген `group_id` мәнін пайдаланыңыз. Егер **Unique Labels** опциясы қосылған болса, `group_id` жасалып жатқан дашбордтағы қажетті сервистің логтарында көрсетіледі.
1. (Опционалды түрде) **Stream** өрісінде логтар көзінің идентификаторын (`stream_id`) көрсетіңіз. Оны орнату кезінде {linkto(../../concepts/logging-plugin#logging-conf-parameters)[text=логтау плагинінің баптауларында]} көрсетілген `stream_id` мәнін пайдаланыңыз. Егер **Unique Labels** опциясы қосылған болса, `stream_id` жасалып жатқан дашбордтағы қажетті сервистің логтарында көрсетіледі.
1. Енгізілген өзгерістерді сақтаңыз.

{/tab}

{/tabs}
