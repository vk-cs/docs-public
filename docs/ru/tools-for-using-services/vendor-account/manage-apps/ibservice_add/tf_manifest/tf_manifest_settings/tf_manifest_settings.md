# {heading(Файл settings.yaml)[id=tf_manifest_settings]}

В файле `settings.yaml` укажите параметры, приведенные в {linkto(#tab_setting)[text=таблице %number]}.

{note:info}

Если в сервисном пакете нет файла `settings.yaml`, к манифестам Terraform будут применены значения параметров по умолчанию.

{/note}

{caption(Таблица {counter(table)[id=numb_tab_setting]} — Параметры в файле settings.yaml)[align=right;position=above;id=tab_setting;number={const(numb_tab_setting)}]}
[cols="2,5,2,2", options="header"]
|===
|Имя
|Описание
|Обязательный
|Значение по умолчанию

|preset
|
Версия пресета — набор провайдеров для манифестов Terraform. Возможные значения:

* `base_v2` — стабильный пресет с VK CS 0.5.5, iVK CS 1.0.1.
* `base_v3` — стабильный пресет с VK CS 0.7.1, iVK CS 1.2.0.
* `base_alpha` — текущий тестируемый пресет.

При появлении новых версий пресетов старые версии остаются доступными к использованию
| ![](/en/assets/no.svg "inline")
|Последний стабильный пресет

|retry
|
Определяет, выполнять или нет повторное развертывание инфраструктуры, если первое выполнение манифеста Terraform завершилось с ошибкой. Возможные причины ошибки:

* Синтаксические или логические ошибки в манифесте.
* Нет доступа к облачной платформе.
* Во время мониторинга не получен `health check` (подробнее — в разделе {linkto(../tf_manifest_monitoring/#tf_manifest_monitoring)[text=%text]}).
* Выполнение скриптов завершилось с ошибкой.

Возможные значения:

* `yes` — включить повторные попытки развертывания инфраструктуры.
* `no` — отключить повторные попытки развертывания инфраструктуры

| ![](/en/assets/no.svg "inline")
|`yes`
|===
{/caption}

{caption(Пример файла `settings.yaml`)[align=left;position=above]}
```yaml
preset: base_v3
retry: no
```
{/caption}