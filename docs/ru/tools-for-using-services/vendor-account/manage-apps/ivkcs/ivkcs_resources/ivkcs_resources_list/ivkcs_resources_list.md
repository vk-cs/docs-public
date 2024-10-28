# {heading(Список ресурсов)[id=ivkcs_resources_list]}

Ресурсы провайдера iVK CS приведены в {linkto(#tab_provider_resources)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_provider_resources]} — Ресурсы провайдера iVK CS)[align=right;position=above;id=tab_provider_resources;number={const(numb_tab_provider_resources)}]}
[cols="2,5", options="header"]
|===
|Имя
|Описание

|
`ivkcs_ssh_keypair`
|
Создание ключевой пары, не сохраняющейся в облачной платформе

|
`ivkcs_user_data`
|
Создание cloud-config конфигурации, чтобы настроить ВМ в процессе развертывания инстанса сервиса.

Инициализация агента на хостах и сопряжение агента с сервисом управления конфигурациями.

Используется совместно с ресурсом `vkcs_compute_instance` провайдера VK CS

|
`ivkcs_agent_init`
|
Инициализация агента на хостах и сопряжение агента с сервисом управления конфигурациями.

<warn>

Ресурс выводится из использования. В манифестах Terraform применяйте ресурс `ivkcs_user_data`.

</warn>

|
`ivkcs_agent_exec`
|
Запуск скриптов в процессе развертывания сервиса

|
`ivkcs_agent_check`
|
Мониторинг состояния инстанса сервиса на хостах

|
`ivkcs_s3`
|
Создание бакетов S3

|
`ivkcs_dns`
|
Создание A-записей в DNS облачной платформы (домены 5-ого и последующих уровней)

|
`ivkcs_compute_instance_reboot`
|
Перезагрузка хоста в процессе развертывания сервиса
|===
{/caption}