# {heading(Тіркелгі деректерін жасау)[id=logging-generate-userdata]}

{include(/kz/_includes/_translated_by_ai.md)}

Cloud Logging сервисіне логтарды жазу үшін келесі тіркелгі деректері пайдаланылады:

- `user_id` — логтар оның атынан жазылатын пайдаланушы идентификаторы;
- `password` — көрсетілген пайдаланушының құпиясөзі;
- `project_id` — OpenStack жүйесіндегі {var(cloud)} жобасының {linkto(../../../../tools-for-using-services/api/rest-api/endpoints#rest-api-endpoints-get-project-id )[text=идентификаторы]}.

Тіркелгі деректерін жасау үшін:

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifndef} {var(cloud)} жеке кабинетіне.
1. **Мониторинг** → **Логтау** бөліміне өтіңіз.
1. **Баптаулар** батырмасын басыңыз.
1. **Тіркелгі деректерін жасау** қойындысына өтіңіз.
1. **Жасау** батырмасын басыңыз.
1. Алынған тіркелгі деректерін сақтаңыз.

{/tab}

{/tabs}
