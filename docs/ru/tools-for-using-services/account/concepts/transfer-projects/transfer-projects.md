## {heading(Передача объектов между проектами)[id=project-concepts-object-transfer]}

Вы можете {linkto(../../../../computing/iaas/instructions/volumes/volumes-transfer#iaas-volumes-transfer)[text=переносить диски]} из проекта в проект. Это позволяет переносить между проектами виртуальные машины.

Перенос дисков возможен только в рамках одного региона. Если проекты находятся в разных регионах, {linkto(../../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-export)[text=выгрузите]} локально образ диска и {linkto(../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-import)[text=загрузите]} его в новый проект.

Перенос объектов PaaS-сервисов между проектами не поддерживается. Например, виртуальная машина, на которой была развернута база данных, может быть перенесена в другой проект только как обычная виртуальная машина. Перенести такую виртуальную машину как инстанс базы данных или создать инстанс базы данных с диском, перенесенным из другого проекта, невозможно.

По обращению в [техническую поддержку](/ru/contacts) возможен перенос объектов:

- Floating IP-адресов;
- адреса {linkto(../../../../networks/vnet/concepts/net-types#vnet-net-types-external-net)[text=внешней сети]}.