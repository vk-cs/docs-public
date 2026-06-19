# {heading(Жұмыс үстелін жасау қателерін диагностикалау)[id=desktops-creation-diagnostics]}

{include(/kz/_includes/_translated_by_ai.md)}

Виртуалды жұмыс үстелін жасау кезіндегі қателердің себебін Cloud Desktop сервисінің логтарынан немесе оқиғалар журналынан табуға болады.

## {heading(Логтар арқылы диагностикалау)[id=desktops-diagnostics-logs]}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../../intro/authorization/lk_entry#prerequisites_vkc_ui)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. **Мониторинг → Логтау** бөліміне өтіңіз.
1. Егер экранда сұрау мен сүзгілер өрістері көрсетілмесе, **Іздеу және сүзгілер** түймесін басыңыз.
1. Іздеу параметрлерін көрсетіңіз:

   - Сұрау өрісі: `stream_id: "worker"` мәнін енгізіңіз.
   - **Мәртебе**: `Error` таңдаңыз.
   - **Өнім**: `VDI` таңдаңыз.
   - Уақыт аралығы: қате туындаған сәтті қамтитындай етіп орнатыңыз.

1. **Табу** түймесін басыңыз.
1. Іздеу нәтижелері тізімінде қажетті оқиғасы бар жолды басыңыз.

   Оқиға туралы деректері бар терезе ашылады. Қатенің сипаттамасы **Сообщение** өрісінде болады. Мысал:

   ```json
   Server error detected. Code: 500; Message: "Build of instance bcb5e979-XXXX-1d57281a282f aborted: Failed to allocate the network(s) with error No fixed IP addresses available for network: 070b51d8-XXXX-7a786c779c9e, not rescheduling."
   ```

## {heading(Оқиғалар журналы арқылы диагностикалау)[id=desktops-diagnostics-events]}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../../intro/authorization/lk_entry#prerequisites_vkc_ui)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. **Мониторинг → Оқиғалар журналы** бөліміне өтіңіз.
1. Егер экранда сұрау мен сүзгілер өрістері көрсетілмесе, **Іздеу және сүзгілер** түймесін басыңыз.
1. Іздеу параметрлерін көрсетіңіз:

   - Сұрау өрісі: бос қалдырыңыз.
   - **Мәртебе**: `Error` таңдаңыз.
   - **Дереккөз**: бос қалдырыңыз.
   - Уақыт аралығы: қате туындаған сәтті қамтитындай етіп орнатыңыз.

1. **Табу** түймесін басыңыз.
1. Іздеу нәтижелері тізімінде қажетті оқиғасы бар жолды басыңыз.

   Оқиға туралы деректері бар терезе ашылады. Қатенің сипаттамасы **Тело ответа** өрісінде болады. Мысал:

   ```json
   {
     "badRequest":{
       "message": "Volume is smaller than the minimum size specified in image metadata. Volume size is 13958643712 bytes, minimum size is 42949672960 bytes.", 
       "code": 400
     }
   }
   ```
