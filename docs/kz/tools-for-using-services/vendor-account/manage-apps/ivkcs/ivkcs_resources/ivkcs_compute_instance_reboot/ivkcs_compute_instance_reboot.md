# {heading(Ресурс ivkcs_compute_instance_reboot)[id=ivkcs_compute_instance_reboot]}

{include(/kz/_includes/_translated_by_ai.md)}

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
# Кідірісті жасау
resource "time_sleep" "before_reboot" {
  create_duration = "30s"

  depends_on = [
    # ВМ жасаудан және дискілерді қосудан тәуелділік
    vkcs_compute_instance.compute,
    vkcs_compute_volume_attach.attached,
  ]
}

# ВМ қайта жүктеу
resource "ivkcs_compute_instance_reboot" "reboot" {
  instance = vkcs_compute_instance.compute.id

  depends_on = [
    # Кідірістен тәуелділік
    time_sleep.before_reboot,
  ]
}

# Скрипттерді орындау
resource "ivkcs_agent_exec" "start" {
  …
  depends_on = [
    # ВМ қайта жүктелуінен тәуелділік
    ivkcs_compute_instance_reboot.reboot,
  ]
  …
}
```
{/caption}
