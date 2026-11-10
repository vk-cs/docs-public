# {heading(ivkcs_compute_instance_reboot ресурсы)[id=ivkcs_compute_instance_reboot]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

`ivkcs_compute_instance_reboot` ресурсының аргументі {linkto(#tab_arguments)[text=%number кестеде]} келтірілген.

{caption({counter(table)[id=numb_tab_arguments]} кесте — ivkcs_compute_instance_reboot ресурсының аргументі)[align=right;position=above;id=tab_arguments;number={const(numb_tab_arguments)}]}
[cols="2,5,2,2,2", options="header"]
|===
|Атауы
|Сипаттамасы
|Пішімі
|Міндетті
|Мән өзгергенде ресурсты қайта жасау

|
`instance`
|Қайта жүктелетін хосттың ID-ы.

ID хостты жасайтын ресурс (VK CS провайдерінің `vkcs_compute_instance` ресурсы) арқылы есептеледі
|string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/no.svg "inline")
|===
{/caption}

Егер қайта жүктеу ВМ жасалғаннан кейін бірден орындалса, жасау мен қайта жүктеу арасында кідірісті қолданыңыз. Кідіріс ВМ жасау кезінде жүріп жатқан барлық процестердің аяқталуын қамтамасыз етеді.

{caption(`ivkcs_compute_instance_reboot` ресурсының кідіріспен мысалы)[align=left;position=above]}
```hcl

# Кідіріс жасау
resource "time_sleep" "before_reboot" {
  create_duration = "30s"

  depends_on = [

# ВМ жасалуына және дискілердің қосылуына тәуелділік
    vkcs_compute_instance.compute,
    vkcs_compute_volume_attach.attached,
  ]
}

# ВМ қайта жүктеу
resource "ivkcs_compute_instance_reboot" "reboot" {
  instance = vkcs_compute_instance.compute.id

  depends_on = [

# Кідіріске тәуелділік
    time_sleep.before_reboot,
  ]
}

# Скрипттерді орындау
resource "ivkcs_agent_exec" "start" {
  …
  depends_on = [

# ВМ қайта жүктелуіне тәуелділік
    ivkcs_compute_instance_reboot.reboot,
  ]
  …
}
```
{/caption}