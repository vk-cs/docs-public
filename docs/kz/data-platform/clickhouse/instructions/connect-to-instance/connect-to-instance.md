{include(/kz/_includes/_translated_by_ai.md)}

1. Кез келген үйлесімді клиенттің көмегімен қосылыңыз. `clickhouse-client` үшін мысал:

    ```bash
    $ clickhouse-client --host <ДАНА_МЕКЕНЖАЙЫ> --port <ПОРТ> --user <ЛОГИН> --password <ҚҰПИЯСӨЗ>
    ```

    Мұнда:
    * `<ДАНА_МЕКЕНЖАЙЫ>` — **Жалпы ақпарат** қойындысындағы қосылу жолдарында көрсетілетін IP-мекенжай немесе домендік атау [дана бетінде](/kz/data-platform/clickhouse/instructions/manage#view). TCP арқылы TLS-пен қосылу мысалы: `10.0.1.46`.
    * `<ПОРТ>` — дана бетінің **Жалпы ақпарат** қойындысындағы қосылу жолдарында көрсетілетін TCP порты. TCP арқылы TLS-пен қосылу мысалы: `8004`.
    * `<ЛОГИН>` — қосылуға арналған пайдаланушы логині. Бұл:
        * [дананы жасау кезінде берілген](/kz/data-platform/clickhouse/instructions/create) пайдаланушы;
        * қолмен [данаға қосылған](/kz/data-platform/clickhouse/instructions/manage#add_admin) қосымша пайдаланушы.
    * `<ҚҰПИЯСӨЗ>` — осы пайдаланушының құпиясөзі.

1. Тестілік сұрауды орындаңыз:

    ```sql
    SELECT 1;
    ```

    `1` жауабы дананың дұрыс жұмыс істеп тұрғанын және жұмысқа дайын екенін білдіреді.

Егер қосылу сәтсіз болса:

* Қосылу кезінде енгізілген деректердің дұрыстығын тексеріңіз.
* [Көз жеткізіңіз](/kz/data-platform/clickhouse/instructions/manage#status), дананың `Белсенді` күйінде тұрғанына.
* [Көз жеткізіңіз](/kz/networks/vnet/instructions/secgroups#view_secgroups), данаға тағайындалған [қауіпсіздік топтары](/kz/networks/vnet/instructions/secgroups) кіріс трафигіне рұқсат беретініне.
* [Логтармен танысыңыз](/kz/monitoring-services/logging/instructions/view-logs).