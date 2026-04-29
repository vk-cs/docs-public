{include(/kz/_includes/_translated_by_ai.md)}

# {heading(ivkcs_compute_instance_reboot ресурсы)[id=ivkcs_compute_instance_reboot]}

`ivkcs_compute_instance_reboot` ресурсының аргументі {linkto(#tab_arguments)[text=%number кестеде]} келтірілген.

{caption({counter(table)[id=numb_tab_arguments]} кесте — ivkcs_compute_instance_reboot ресурсының аргументі)[align=right;position=above;id=tab_arguments;number={const(numb_tab_arguments)}]}
[cols="2,5,2,2,2", options="header"]
|===
|Атауы
|Сипаттамасы
|Пішімі
|Міндетті
|Мән өзгерген кезде ресурсты қайта жасау

|
`instance`
|
Қайта жүктелетін хосттың ID-і.

ID хостты жасайтын ресурс (`vkcs_compute_instance` VK CS провайдерінің ресурсы) арқылы есептеледі
|string
| ![](/kz/assets/check.svg "inline")
| ![](/en/assets/no.svg "inline")
|===
{/caption}

Егер қайта жүктеу ВМ жасалғаннан кейін бірден орындалса, жасау мен қайта жүктеу арасында кідірісті пайдаланыңыз. Кідіріс ВМ жасау кезінде жүретін барлық процестердің аяқталуын қамтамасыз етеді.

{caption(Кідірісі бар `ivkcs_compute_instance_reboot` ресурсының мысалы)[align=left;position=above]}
```hcl
# Создание паузы
resource "time_sleep" "before_reboot" {
  create_duration = "30s"

  depends_on = [
    # Зависимость от создания ВМ и присоединения дисков
    vkcs_compute_instance.compute,
    vkcs_compute_volume_attach.attached,
  ]
}

# Перезагрузка ВМ
resource "ivkcs_compute_instance_reboot" "reboot" {
  instance = vkcs_compute_instance.compute.id

  depends_on = [
    # Зависимость от паузы
    time_sleep.before_reboot,
  ]
}

# Выполнение скриптов
resource "ivkcs_agent_exec" "start" {
  …
  depends_on = [
    # Зависимость от перезагрузки ВМ
    ivkcs_compute_instance_reboot.reboot,
  ]
  …
}
```
{/caption}
