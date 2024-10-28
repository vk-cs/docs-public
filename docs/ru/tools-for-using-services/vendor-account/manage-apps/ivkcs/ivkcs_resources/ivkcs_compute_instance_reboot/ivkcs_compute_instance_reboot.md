# {heading(Ресурс ivkcs_compute_instance_reboot)[id=ivkcs_compute_instance_reboot]}

Аргумент ресурса `ivkcs_compute_instance_reboot` приведен в {linkto(#tab_arguments)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_arguments]} — Аргумент ресурса ivkcs_compute_instance_reboot)[align=right;position=above;id=tab_arguments;number={const(numb_tab_arguments)}]}
[cols="2,5,2,2,2", options="header"]
|===
|Имя
|Описание
|Формат
|Обязательный
|Пересоздание ресурса при изменении значения

|
`instance`
|
ID хоста, который будет перезагружен.

ID вычисляется ресурсом, создающим хост (ресурс `vkcs_compute_instance` провайдера VK CS)
|string
|Да
|Нет
|===
{/caption}

Если перезагрузка происходит сразу после создания ВМ, используйте паузу между созданием и перезагрузкой. Пауза обеспечит завершение всех процессов, происходящих во время создания ВМ.

{caption(Пример ресурса `ivkcs_compute_instance_reboot` с паузой)[align=left;position=above]}
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
