# {heading(Требования к образу сервиса)[id=ib_image_requirements]}

Образ сервиса должен содержать следующие программные пакеты:

* [Cloud-init](https://cloudinit.readthedocs.io/en/latest/) — позволяет настроить ВМ в облачной платформе.
* Если используется агент (подробнее — в разделе {linkto(../../../ibservice_add/ib_image_create/ib_image_agent/#ib_image_agent)[text=%text]}):

   * Curl — позволяет инициализировать скачивание агента.
   * Systemd — позволяет запускать агент и следить за его работоспособностью.

* Qemu-guest-agent — позволяет задавать пароль к ВМ через ЛК облачной платформы (подробнее — в разделе [Управление ВМ](/ru/computing/iaas/service-management/vm/vm-manage#ustanovka_i_izmenenie_parolya)).
