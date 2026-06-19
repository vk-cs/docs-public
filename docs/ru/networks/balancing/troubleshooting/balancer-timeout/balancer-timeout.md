# {heading(Балансировщик возвращает ошибку 504 Gateway Timeout)[id=balancing-balancer-timeout]}

{ifdef(public)}Наблюдаются проблемы с балансировщиком нагрузки {linkto(../../../../networks/balancing/concepts/load-balancer#balancing-load-balancer-types)[text=стандартного типа]}. {/ifdef}Балансировщик возвращает ошибку `504 Gateway Timeout`. 

Проблема возникает при плохой связи, когда на балансировщике срабатывают тайм-ауты. Задержка в ответе на запрос, вызывающая ошибку, — примерно 60 секунд.

### {heading(Решение)[id=balancing-balancer-timeout-solving]}

Увеличьте тайм-ауты балансировщика:

1. Убедитесь, что клиент OpenStack {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. Получите список прослушивателей (listener) балансировщика нагрузки:

   ```console
   openstack loadbalancer listener list --loadbalancer <ID_БАЛАНСИРОВЩИКА>
   ```

1. Для каждого прослушивателя балансировщика нагрузки установите новые тайм-ауты:

   ```console
   openstack loadbalancer listener set --timeout-member-data <ТАЙМ-АУТ_1> --timeout-member-connect <ТАЙМ-АУТ_2> --timeout-client-data <ТАЙМ-АУТ_3> --timeout-tcp-inspect <ТАЙМ-АУТ_4> <ID_ПРОСЛУШИВАТЕЛЯ>
   ```
   Здесь:

   - `<ID_ПРОСЛУШИВАТЕЛЯ>` — идентификатор прослушивателя балансировщика нагрузки.
   - `<ТАЙМ-АУТ_1>` — тайм-аут бездействия сервера. По умолчанию — `50000`.
   - `<ТАЙМ-АУТ_2>` — тайм-аут подключения к серверу. По умолчанию — `5000`.
   - `<ТАЙМ-АУТ_3>` — тайм-аут бездействия фронтенда. По умолчанию — `50000`.
   - `<ТАЙМ-АУТ_4>` — ожидание дополнительных TCP-пакетов для проверки содержимого. По умолчанию — `0`.


