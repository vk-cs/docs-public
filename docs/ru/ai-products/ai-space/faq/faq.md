# {heading(Вопросы и ответы)[id=ai-space-faq]}

{cut(Нужно ли заключать отдельные договоры с провайдерами моделей?)}

Нет. VK AI Space объединяет модели разных провайдеров в едином {linkto(../instructions/models/search-and-view#ai-space-instructions-models-view)[text=каталоге]}. Доступ ко всем моделям и оплата идут через VK AI Space.

{/cut}

{cut(Почему сервис отклоняет запрос к модели?)}

По одной из этих причин:

- Недостаточно средств на лицевом счете при {linkto(../concepts/billing#ai-space-concepts-balance-payment-scheme)[text=предоплате]}. {linkto(../instructions/billing/balance#ai-space-instructions-billing-balance-topup)[text=Пополните счет]}. При постоплате баланс может уходить в минус, запросы при этом не блокируются.
- Исчерпан {linkto(../concepts/billing#ai-space-concepts-balance-control)[text=лимит расходов]} организации, проекта, пользователя или виртуального пользователя. {linkto(../instructions/billing/limits#ai-space-instructions-billing-limits-own)[text=Проверьте свой лимит]} в блоке **Мой лимит** или {linkto(../instructions/billing/limits#ai-space-instructions-billing-limits)[text=лимиты организации]} в настройках. {linkto(../instructions/billing/limits#ai-space-instructions-billing-limits)[text=Увеличьте лимит]} или дождитесь конца периода. Расход обнуляется по истечении суток, недели или месяца.
- Проект отключен. {linkto(../instructions/organization/projects#ai-space-instructions-projects-on)[text=Включить его]} могут владелец и администраторы организации.
- Отключен {linkto(../concepts/organization#ai-space-concepts-organization-users)[text=виртуальный пользователь]}, ключом которого отправлен запрос. {linkto(../instructions/users/service-accounts#ai-space-instructions-users-sa-enable)[text=Включите учетную запись]}, затем отдельно {linkto(../instructions/access/sa-keys#ai-space-instructions-access-sa-keys-enable)[text=включите его ключи]} — после включения пользователя ключи остаются отключенными.
- API-ключ отключен, удален, перевыпущен или истек. Проверьте личный ключ в {linkto(../instructions/access/personal-keys#ai-space-instructions-access-personal-keys-view)[text=разделе]} **Мои ключи** или ключ виртуального пользователя на вкладке **API-ключи AI Space** по столбцам **Статус** и **Истекает**. Личный ключ можно {linkto(../instructions/access/personal-keys#ai-space-instructions-access-personal-keys-enable)[text=включить]}, {linkto(../instructions/access/personal-keys#ai-space-instructions-access-personal-keys-reissue)[text=перевыпустить]} или {linkto(../instructions/access/personal-keys#ai-space-instructions-access-personal-keys-create)[text=создать заново]}. Для ключей виртуального пользователя — {linkto(../instructions/access/sa-keys#ai-space-instructions-access-sa-keys-enable)[text=включение]}, {linkto(../instructions/access/sa-keys#ai-space-instructions-access-sa-keys-reissue)[text=перевыпуск]} и {linkto(../instructions/access/sa-keys#ai-space-instructions-access-sa-keys-create)[text=создание]}. Если ключ перевыпустили, подставьте в приложении новое значение.
- Запрос отправлен личным ключом пользователя, которого исключили из организации. {linkto(../instructions/access/personal-keys#ai-space-instructions-access-personal-keys-create)[text=Создайте свой личный ключ]} или {linkto(../instructions/access/sa-keys#ai-space-instructions-access-sa-keys-create)[text=ключ виртуального пользователя]}.

{/cut}

{cut(Почему приглашенный пользователь не может работать с моделями?)}

Приглашение добавляет пользователя только в организацию. Чтобы он мог работать с моделями, {linkto(../instructions/users/project-users#ai-space-instructions-users-add-to-project)[text=добавьте его в проект]}. 

Пользователь также может {linkto(../instructions/organization/projects#ai-space-instructions-projects-create)[text=создать]} свой проект и стать его владельцем.

{/cut}

{cut(Почему администратор проекта не может пригласить нового пользователя?)}

Администратор проекта может добавить в проект только тех пользователей, кто уже состоит в организации. Чтобы пригласить в организацию сторонних пользователей, обратитесь к ее {linkto(../concepts/roles#ai-space-concepts-roles-org)[text=владельцу или администратору]}.

{/cut}

{cut(Почему не получается исключить пользователя из организации?)}

Скорее всего, пользователь владеет проектами. Сначала {linkto(../instructions/access/project-transfer#ai-space-instructions-access-project-transfer)[text=передайте права]} на каждый его проект другому пользователю.

Также из организации нельзя исключить себя и владельца организации. Если у пользователя статус `Приглашён`, {linkto(../instructions/users/org-users#ai-space-instructions-users-invite-revoke)[text=отзовите приглашение]}.

{/cut}

{cut(Можно ли удалить проект?)}

Нет, но проект можно {linkto(../instructions/organization/projects#ai-space-instructions-projects-off)[text=отключить]}. Отключенный проект не принимает запросы. Позже его можно включить снова.

{/cut}

{cut(Почему после включения виртуального пользователя его ключи не работают?)}

При отключении виртуального пользователя отключаются и все его ключи. После повторного включения виртуального пользователя ключи остаются отключенными — {linkto(../instructions/access/sa-keys#ai-space-instructions-access-sa-keys-enable)[text=включите их отдельно]}.

{/cut}

{cut(Почему я не вижу баланс организации?)}

Баланс и операции по лицевому счету видят только {linkto(../concepts/roles#ai-space-concepts-roles-org)[text=владелец и администраторы организации]}. Роль владельца или администратора проекта доступа к балансу не дает.

{/cut}

{cut(Как пополнить лицевой счет? Можно ли оплатить картой?)}

{linkto(../instructions/billing/balance#ai-space-instructions-billing-balance-topup)[text=Пополнить]} лицевой счет можно только банковским переводом от юридического лица или ИП. Оплата картой не поддерживается.

Сумма пополнения указывается без учета НДС. Налог в размере 22 % начисляется дополнительно. Счет с НДС приходит на почту, указанную в параметре **Почта для счетов и актов** в {linkto(../instructions/organization/organization-manage#ai-space-instructions-organization-manage-settings)[text=настройках организации]}. После оплаты на лицевой счет зачисляется сумма без НДС.

{/cut}

{cut(Почему счет оплачен, но баланс не изменился?)}

Проверьте статус пополнения на вкладке **Операции** в разделе {linkto(../instructions/billing/balance#ai-space-instructions-billing-balance-operations)[text=Баланс]}. Статус `Ожидает` означает, что оплата еще не поступила.

Как только платеж будет зачислен, статус автоматически сменится на `Проведено`, а сумма без НДС будет зачислена на лицевой счет.

{/cut}

{cut(Что происходит при нулевом балансе? Можно ли уйти в минус?)}

Зависит от {linkto(../concepts/billing#ai-space-concepts-balance-payment-scheme)[text=схемы оплаты]}:

- При предоплате в минус уйти нельзя. При нулевом балансе вкладка **Тестирование** недоступна, запросы через API отклоняются. Если для запроса не хватает средств, сервис тоже отклоняет запрос.
- При постоплате баланс может уходить в минус, и запросы продолжают выполняться.

При любой схеме оплаты сервис отклоняет запрос, если исчерпан {linkto(../concepts/billing#ai-space-concepts-balance-control)[text=лимит расходов]}.

{/cut}

{cut(Оплачивается ли запрос, на который модель вернула ошибку?)}

Нет. Если потоковый ответ прерван, оплачивается только фактически полученная часть ответа.

{/cut}

{cut(Когда обнуляется лимит расходов?)}

В начале новых календарных суток, недели или месяца по московскому времени (UTC+3) — в зависимости от периода лимита. Например, лимит **24 часа** обнуляется в 00:00 по Москве. Лимит задается отдельно на каждый период.

{/cut}

{cut(Что будет, если поставить лимит ниже уже потраченной суммы?)}

Новые запросы к модели будут отклоняться, пока не закончится текущий лимитный период.

{/cut}

{cut(Почему сумма расходов по пользователям меньше итога организации?)}

Расход виртуальных пользователей не входит в статистику по пользователям. Он учитывается отдельно и доступен на вкладке **По виртуальным пользователям** в {linkto(../instructions/billing/statistics#ai-space-instructions-billing-statistics-view)[text=статистике организации]}.

{/cut}
