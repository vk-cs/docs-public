# {heading(Теңгерімдеуші 504 Gateway Timeout қатесін қайтарады)[id=balancing-balancer-timeout]}

{include(/kz/_includes/_translated_by_ai.md)}

{ifdef(public)}
Жүктеме {linkto(../../../../networks/balancing/concepts/load-balancer#balancing-load-balancer-types)[text=стандартты түрдегі]} теңгерімдеушісімен мәселелер байқалады. 
{/ifdef}
Теңгерімдеуші `504 Gateway Timeout` қатесін қайтарады. 

Мәселе байланыс нашар болған кезде, теңгерімдеушіде тайм-ауттар іске қосылғанда туындайды. Қатені тудыратын сұрауға жауаптың кідірісі — шамамен 60 секунд.

### {heading(Шешім)[id=balancing-balancer-timeout-solving]}

Теңгерімдеушінің тайм-ауттарын арттырыңыз:

1. {ifdef(public)}OpenStack клиенті {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіңіз және жобада {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.{/ifdef}{ifdef(private,private_pg)}OpenStack CLI-ге қосылыңыз.{/ifdef}

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
