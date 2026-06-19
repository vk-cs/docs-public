В {var(cloud)} поддерживается три метода балансировки:

- `LEAST_CONNECTIONS` — используется бэкенд, к которому установлено наименьшее количество соединений.
- `ROUND_ROBIN` — перебираются последовательно все бэкенды.
- `SOURCE_IP` — бэкенд выбирается произвольным образом и закрепляется на сессию за конкретным IP-адресом клиента.

{includetag(concepts)}
Метод балансировки выбирается при {linkto(../../../../networks/balancing/instructions/manage-rules#balancing-manage-rules)[text=добавлении правила балансировки]} в личном кабинете.
{/includetag}
{includetag(faq)}
Метод балансировки выбирается при {linkto(../../../networks/balancing/instructions/manage-rules#balancing-manage-rules)[text=добавлении правила балансировки]} в личном кабинете.
{/includetag}