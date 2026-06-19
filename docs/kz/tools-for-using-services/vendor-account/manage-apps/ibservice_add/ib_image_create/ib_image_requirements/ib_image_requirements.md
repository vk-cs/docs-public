# {heading(Сервис образына қойылатын талаптар)[id=ib_image_requirements]}

{include(/kz/_includes/_translated_by_ai.md)}

Сервис образында келесі бағдарламалық пакеттер болуы керек:

* [Cloud-init](https://cloudinit.readthedocs.io/en/latest/) — бұлтты платформада ВМ баптауға мүмкіндік береді.
* Егер агент пайдаланылса (толығырақ — {linkto(../../../ibservice_add/ib_image_create/ib_image_agent#ib_image_agent)[text=%text]} бөлімінде):

   * Curl — агентті жүктеуді инициализациялауға мүмкіндік береді.
   * Systemd — агентті іске қосуға және оның жұмысқа қабілеттілігін бақылауға мүмкіндік береді.

* Qemu-guest-agent — бұлтты платформаның ЖК арқылы ВМ үшін пароль орнатуға мүмкіндік береді (толығырақ — [ВМ басқару](/kz/computing/iaas/instructions/vm/vm-manage#iaas-vm-password) бөлімінде).
