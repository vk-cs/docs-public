{include(/kz/_includes/_translated_by_ai.md)}

Теңгерімдеуші [стандартного типа](/kz/networks/balancing/concepts/load-balancer#zhukteme_tengergishterinin_turleri). қатесін қайтарады `504 Gateway Timeout`. 

Мәселе байланыс нашар болған кезде, теңгерімдеушіде тайм-ауттар іске қосылғанда туындайды. Қатені тудыратын сұрауға жауаптың кідірісі — шамамен 60 секунд.

### Шешім

Теңгерімдеушінің тайм-ауттарын арттырыңыз:

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), көз жеткізіңіз және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) OpenStack CLI-ге қосылыңыз.

1. Жүктеме теңгерімдеушісінің listener тізімін алыңыз:

   ```console
   openstack loadbalancer listener list --loadbalancer <ID_БАЛАНСИРОВЩИКА>
   ```

1. Жүктеме теңгерімдеушісінің әр listener-і үшін жаңа тайм-ауттарды орнатыңыз:

   ```console
   openstack loadbalancer listener set --timeout-member-data <ТАЙМ-АУТ_1> --timeout-member-connect <ТАЙМ-АУТ_2> --timeout-client-data <ТАЙМ-АУТ_3> --timeout-tcp-inspect <ТАЙМ-АУТ_4> <ID_ПРОСЛУШИВАТЕЛЯ>
   ```
   Мұнда:

   * `<ID_ПРОСЛУШИВАТЕЛЯ>` — жүктеме теңгерімдеушісінің listener идентификаторы.
   * `<ТАЙМ-АУТ_1>` — сервердің әрекетсіздік тайм-ауты. Әдепкі бойынша — `50000`.
   * `<ТАЙМ-АУТ_2>` — серверге қосылу тайм-ауты. Әдепкі бойынша — `5000`.
   * `<ТАЙМ-АУТ_3>` — фронтендтің әрекетсіздік тайм-ауты. Әдепкі бойынша — `50000`.
   * `<ТАЙМ-АУТ_4>` — мазмұнды тексеру үшін қосымша TCP-пакеттерді күту. Әдепкі бойынша — `0`.


