# {heading(Ресурстар тізімі)[id=ivkcs_resources_list]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

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
Сервистің инстансын орналастыру барысында ВМ-ді теңшеу үшін cloud-config конфигурациясын жасау.

Хосттарда агентті инициализациялау және агентті конфигурацияларды басқару сервисімен жұптастыру.

VK CS провайдерінің `vkcs_compute_instance` ресурсымен бірге қолданылады

|
`ivkcs_agent_init`
|
Хосттарда агентті инициализациялау және агентті конфигурацияларды басқару сервисімен жұптастыру.

{note:warn}

Ресурс қолданыстан шығарылды. Terraform манифесттерінде `ivkcs_user_data` ресурсын қолданыңыз.

{/note}

|
`ivkcs_agent_exec`
|
Сервисті орналастыру барысында скрипттерді іске қосу

|
`ivkcs_agent_check`
|
Хосттарда сервистің инстансы күйін бақылау

|
`ivkcs_s3`
|
S3 бакеттерін жасау

|
`ivkcs_dns`
|
Бұлтты платформаның DNS-інде A-жазбаларды жасау (5-ші және одан кейінгі деңгейлік домендер)

|
`ivkcs_compute_instance_reboot`
|
Сервисті орналастыру барысында хостты қайта жүктеу
|===
{/caption}