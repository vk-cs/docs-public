# {heading(Сервис данасына қосылу)[id=clickhouse_connect_to_instance]}

{include(/kz/_includes/_translated_by_ai.md)}

1. Кез келген үйлесімді клиенттің көмегімен қосылыңыз. `clickhouse-client` үшін мысал:

    ```bash
    $ clickhouse-client --host <ДАНА_МЕКЕНЖАЙЫ> --port <ПОРТ> --user <ЛОГИН> --password <ҚҰПИЯСӨЗ>
    ```

    Мұнда:
    * `<ДАНА_МЕКЕНЖАЙЫ>` — **Жалпы ақпарат** қойындысындағы қосылу жолдарында көрсетілетін IP-мекенжай немесе домендік атау {linkto(../manage#view)[text=дана беті]}]. TCP арқылы TLS-пен қосылу мысалы: `10.0.1.46`.
    * `<ЛОГИН>` — қосылуға арналған пайдаланушы логині. Бұл:
        * {linkto(../create#clickhouse_create)[text=дананы жасау кезінде берілген]} пайдаланушы.
        * Қолмен {linkto(../manage#clickhouse_add_admin)[text=данаға қосылған]} қосымша пайдаланушы.
    * `<ҚҰПИЯСӨЗ>` — осы пайдаланушының құпиясөзі.

1. Тестілік сұрауды орындаңыз:

    ```sql
    SELECT 1;
    ```

    `1` жауабы дананың дұрыс жұмыс істеп тұрғанын және жұмысқа дайын екенін білдіреді.

Егер қосылу сәтсіз болса:

* Қосылу кезінде енгізілген деректердің дұрыстығын тексеріңіз.
* {linkto(../manage#clickhouse_status)[text=Көз жеткізіңіз]}, дананың `Белсенді` күйінде тұрғанына.

{ifdef(public)}
* Данаға тағайындалған [қауіпсіздік топтары](/kz/networks/vnet/instructions/secgroups) кіріс трафигіне рұқсат беретініне [көз жеткізіңіз](/kz/networks/vnet/instructions/secgroups#vnet-secgroups-view).
* [Логтармен танысыңыз](/kz/monitoring-services/logging/instructions/view-logs).
{/ifdef}
