{include(/kz/_includes/_translated_by_ai.md)}

# {heading(Ресурстар тізімі)[id=ivkcs_resources_list]}

iVK CS провайдерінің ресурстары {linkto(#tab_provider_resources)[text=%number кестеде]} келтірілген.

{caption({counter(table)[id=numb_tab_provider_resources]} кесте — iVK CS провайдерінің ресурстары)[align=right;position=above;id=tab_provider_resources;number={const(numb_tab_provider_resources)}]}
[cols="2,5", options="header"]
|===
|Атауы
|Сипаттамасы

|
`ivkcs_ssh_keypair`
|
Бұлтты платформада сақталмайтын кілт жұбын жасау

|
`ivkcs_user_data`
|
Сервис инстансын орналастыру барысында ВМ-ді баптау үшін cloud-config конфигурациясын жасау.

Хосттарда агентті инициализациялау және агентті конфигурацияларды басқару сервисімен байланыстыру.

VK CS провайдерінің `vkcs_compute_instance` ресурсымен бірге пайдаланылады

|
`ivkcs_agent_init`
|
Хосттарда агентті инициализациялау және агентті конфигурацияларды басқару сервисімен байланыстыру.

{note:warn}

Ресурс пайдаланудан шығарылуда. Terraform манифестерінде `ivkcs_user_data` ресурсын қолданыңыз.

{/note}

|
`ivkcs_agent_exec`
|
Сервисті орналастыру барысында скрипттерді іске қосу

|
`ivkcs_agent_check`
|
Хосттардағы сервис инстансының күйін мониторингтеу

|
`ivkcs_s3`
|
S3 бакеттерін жасау

|
`ivkcs_dns`
|
Бұлтты платформаның DNS жүйесінде A-жазбаларын жасау (5-деңгейдегі және одан кейінгі деңгейдегі домендер)

|
`ivkcs_compute_instance_reboot`
|
Сервисті орналастыру барысында хостты қайта жүктеу
|===
{/caption}
