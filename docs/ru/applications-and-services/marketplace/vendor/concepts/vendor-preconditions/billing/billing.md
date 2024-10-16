# {heading(Тарификация)[id=billing]}

{var(sys1)} поддерживает следующие типы тарификации:

* Бесплатный (Free).
* Предоплатный (Upfront Commitment).
* Постоплатный (Usage Based).
* BYOL (Bring Your Own License).

Более подробная информация о тарификации приведена в разделе {linkto(/ru/applications-and-services/marketplace/vendor/concepts/about/#xaas_billing)[text=%text]}.

Требования к тарификации сервиса:

* Каждый тарифный план сервиса должен тарифицироваться в соответствии с одним из типов, приведенных выше.
* В тарифном плане могут быть платные тарифные опции, стоимость которых прибавляется к стоимости тарифного плана.
* Стоимость тарифного плана image-based приложения не должна включать в себя инфраструктуру облачной платформы. Инфраструктура тарифицируется отдельно по правилам облачной платформы.
* В составе сервиса не должно быть:

   * Библиотек и модулей с пробным периодом — у тарифных планов не должно быть бесплатных периодов.
   * Библиотек и модулей с дополнительной тарификацией — у тарифных планов не должно быть тарифных опций, активируемых за дополнительную оплату после создания или обновления инстанса сервиса. Все платные опции должны настраиваться на этапе создания или обновления инстанса сервиса.