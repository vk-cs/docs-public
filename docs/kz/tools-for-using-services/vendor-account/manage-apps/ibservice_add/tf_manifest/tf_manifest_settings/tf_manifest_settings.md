{include(/kz/_includes/_translated_by_ai.md)}

# {heading(settings.yaml файлы)[id=tf_manifest_settings]}

`settings.yaml` файлында {linkto(#tab_setting)[text=%number кестеде]} келтірілген параметрлерді көрсетіңіз.

{note:info}

Егер сервистік пакетте `settings.yaml` файлы болмаса, Terraform манифестеріне параметрлердің әдепкі мәндері қолданылады.

{/note}

{caption(Кесте {counter(table)[id=numb_tab_setting]} — settings.yaml файлындағы параметрлер)[align=right;position=above;id=tab_setting;number={const(numb_tab_setting)}]}
[cols="2,5,2,2", options="header"]
|===
|Атауы
|Сипаттама
|Міндетті
|Әдепкі мәні

|preset
|
Preset нұсқасы — Terraform манифестеріне арналған провайдерлер жиынтығы. Мүмкін мәндері:

* `base_v2` — VK CS 0.5.5, iVK CS 1.0.1 бар тұрақты preset.
* `base_v3` — VK CS 0.7.1, iVK CS 1.2.0 бар тұрақты preset.
* `base_alpha` — ағымдағы сыналатын preset.

Preset-тердің жаңа нұсқалары шыққанда, ескі нұсқалары қолданысқа қолжетімді болып қалады
| ![](/en/assets/no.svg "inline")
|Соңғы тұрақты preset

|retry
|
Егер Terraform манифестін бірінші орындау қателікпен аяқталса, инфрақұрылымды қайтадан жайылтуды орындау-орындамауды анықтайды. Қателіктің ықтимал себептері:

* Манифестегі синтаксистік немесе логикалық қателер.
* Бұлтты платформаға қолжетімділік жоқ.
* Мониторинг кезінде `health check` алынбады (толығырақ — {linkto(../tf_manifest_monitoring/#tf_manifest_monitoring)[text=%text]} бөлімінде).
* Скрипттердің орындалуы қателікпен аяқталды.

Мүмкін мәндері:

* `yes` — инфрақұрылымды қайтадан жайылту әрекеттерін қосу.
* `no` — инфрақұрылымды қайтадан жайылту әрекеттерін өшіру

| ![](/en/assets/no.svg "inline")
|`yes`
|===
{/caption}

{caption(`settings.yaml` файлының мысалы)[align=left;position=above]}
```yaml
preset: base_v3
retry: no
```
{/caption}
