# {heading( settings.yaml файлы)[id=tf_manifest_settings]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

`settings.yaml` файлында {linkto(#tab_setting)[text=%number кестеде]} келтірілген параметрлерді көрсетіңіз.

{note:info}

Егер сервистік пакетте `settings.yaml` файлы болмаса, Terraform манифесттеріне параметрлердің әдепкі мәндері қолданылады.

{/note}

{caption({counter(table)[id=numb_tab_setting]} кесте — settings.yaml файлындағы параметрлер)[align=right;position=above;id=tab_setting;number={const(numb_tab_setting)}]}
[cols="2,5,2,2", options="header"]
|===
|Атауы
|Сипаттамасы
|Міндетті
|Әдепкі мәні

|preset
|
Пресет нұсқасы — Terraform манифесттеріне арналған провайдерлер жиынтығы. Мүмкін мәндер:

* `base_v2` — VK CS 0.5.5, iVK CS 1.0.1 бар тұрақты пресет.
* `base_v3` — VK CS 0.7.1, iVK CS 1.2.0 бар тұрақты пресет.
* `base_alpha` — қазіргі уақытта тестіленіп жатқан пресет.

Жаңа пресет нұсқалары пайда болғанда, ескі нұсқаларды пайдалану мүмкіндігі сақталады
| ![](../../../../../../assets/no.svg "inline")
|Соңғы тұрақты пресет

|retry
|
Алғашқы Terraform манифестінің орындалуы қатеге ұшыраған жағдайда инфрақұрылымды қайта орналастыру қажет пе екенін анықтайды. Қатенің мүмкін себептері:

* Манифесттегі синтаксистік немесе логикалық қателер.
* Бұлтты платформаға қолжетімділік жоқ.
* Мониторинг барысында `health check` алынбады (толығырақ — {linkto(../tf_manifest_monitoring/#tf_manifest_monitoring)[text=%text]} бөлімінде).
* Скрипттердің орындалуы қатеге ұшырады.

Мүмкін мәндер:

* `yes` — инфрақұрылымды қайта орналастыру әрекеттерін қосу.
* `no` — инфрақұрылымды қайта орналастыру әрекеттерін өшіру

| ![](../../../../../../assets/no.svg "inline")
|`yes`
|===
{/caption}

{caption(`settings.yaml` файлының мысалы)[align=left;position=above]}
```yaml
preset: base_v3
retry: no
```
{/caption}