# {heading(Образдарды басқару)[id=iaas-images-manage]}

{include(/kz/_includes/_translated_by_ai.md)}

Образ — орнатылған операциялық жүйесі немесе басқа деректері бар виртуалды дискіні қамтитын файл. Образдар бұлтта виртуалды машиналарды жасау үшін қолданылады.

## {heading(Образды жасау)[id=iaas-images-manage-create]}

{var(cloud)} қолданыстағы виртуалды машинаның дискісінен образ жасауға мүмкіндік береді.

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cer)}{linkto(../../../../../intro/authorization/lk_entry#prerequisites_vkc_ui)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. [Образын жасау керек ВМ-ді тоқтатыңыз](../../../instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart).
1. **Бұлтты есептеулер → Образдар** бөліміне өтіңіз.
1. **Жасау** батырмасын басыңыз.
1. Образ параметрлерін орнатыңыз:

    - **Дереккөз**: **Диск** тармағын таңдаңыз.
    - **Дискіні таңдаңыз**: қолданыстағы виртуалды машинаның дискін таңдаңыз.
    - **Образ атауы**: образ атауын көрсетіңіз.
   
1. **Образ жасау** батырмасын басыңыз.

{/tab}

{tab(OpenStack CLI)}

{note:warn}

Образ жасауға арналған диск виртуалды машинадан ажыратылған болуы және `available` мәртебесіне ие болуы керек.

{/note}

1. Дискінің `ID` мәнін алыңыз:

   ```console
   openstack volume list
   ```

1. Образ жасаңыз:

   ```console
   openstack image create --volume <ID_ДИСКА> <ИМЯ_ОБРАЗА>
   ```

1. Образдың жасалғанын тексеріңіз:

   ```console
   openstack image list --name <ИМЯ_ОБРАЗА>
   ```

   Сәтті жасалған образ `active` мәртебесіне ие болуы керек.

{/tab}

{/tabs}

## {heading(Образды импорттау)[id=iaas-images-manage-import]}

{var(cloud)} операциялық жүйелер бойынша [кейбір шектеулері](/kz/computing/iaas/concepts/oper-system) бар виртуалды машиналардың жеке образдарын жүктеп алуды қолдайды.

{note:warn}
Тек RAW форматындағы образдарға қолдау көрсетіледі. Егер образыңыз басқа форматта болса, [оны түрлендіріңіз](../../../how-to-guides/packer#iaas-packer-convert-image).
{/note}

Образды импорттаудың ұсынылатын тәсілі — CLI пайдалану.

Жүктелетін файлдың өлшемі [шектеулі](/kz/tools-for-using-services/account/concepts/quotasandlimits#quotasandlimits-images-volumes).

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cer)}{linkto(../../../../../intro/authorization/lk_entry#prerequisites_vkc_ui)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. **Бұлтты есептеулер → Образдар** бөліміне өтіңіз.
1. **Жасау** батырмасын басыңыз.
1. Импорт параметрлерін орнатыңыз:

    - **Дереккөз**: **Файл** тармағын таңдаңыз.
    - **Файлды таңдаңыз**: RAW форматындағы образ файлын жүктеңіз.
    - **Образ атауы**: образ атауын көрсетіңіз.

1. **Образ жасау** батырмасын басыңыз.

{/tab}

{tab(OpenStack CLI)}

Образды импорттау командасының параметрлері резервтік көшіруді қолдау қажеттілігіне байланысты:

- Қолдау қажет болмаса, пәрменді орындаңыз:

  ```console
  openstack image create --private --container-format bare --disk-format raw --property store=s3 --file <ФАЙЛ_ОБРАЗА> <ИМЯ_ОБРАЗА>
  ```

- Қолдау қажет болса, жоғарыдағы пәрменге `--property hw_qemu_guest_agent=yes --property os_require_quiesce=yes` параметрлерін қосыңыз.

{/tab}

{/tabs}

## {heading(Образды экспорттау)[id=iaas-images-manage-export]}

{tabs}

{tab(OpenStack CLI)}

1. Тізімнен образдың `ID` мәнін және диск пішімін `Disk Format` алыңыз:

   ```console
   openstack image list --long
   ```

1. Образды экспорттаңыз:

   ```console
   openstack image save --file <ИМЯ_ФАЙЛА>.<ФОРМАТ_ОБРАЗА> <ID_ОБРАЗА>
   ```

Егер экспортталған образ RAW форматында болмаса және оны {var(cloud)} платформасында ВМ жасау үшін пайдалануды жоспарласаңыз, [образды түрлендіріңіз](../../../how-to-guides/packer#iaas-packer-convert-image).

{/tab}

{tab(cURL)}

1. `X-Auth-Token` қатынау токенін [алыңыз](/kz/tools-for-using-services/api/rest-api/case-keystone-token).
1. Қажетті образдың `id` және `disk_format` мәндерін алыңыз:

   ```console
   curl -H "X-Auth-Token:<ТОКЕН>" "https://infra.mail.ru:9292/v2/images"
   ```

1. Образды жүктеп алыңыз:

   ```console
   curl -H "X-Auth-Token:<ТОКЕН>" "https://infra.mail.ru:9292/v2/images/<ID_ОБРАЗА>/file" --output <ИМЯ_ФАЙЛА>.<ФОРМАТ_ОБРАЗА>
   ```

Егер экспортталған образ RAW форматында болмаса және оны {var(cloud)} платформасында ВМ жасау үшін пайдалануды жоспарласаңыз, [образды түрлендіріңіз](../../../how-to-guides/packer#iaas-packer-convert-image).

{/tab}

{/tabs}

## {heading(Образдың көріну мәртебесін өзгерту)[id=iaas-images-manage-status-edit]}

Образдың көріну мәртебесін өзгерту образға бірнеше жобадан қол жеткізуге мүмкіндік береді. Образға бірнеше жобада ортақ қолжетімділік виртуалды машиналарды өрістетуді жеделдетуге мүмкіндік береді.

{var(cloud)} сервисінде пайдаланушыларға образдардың төменде келтірілген көріну мәртебелері қолжетімді. {ifdef(public)}төменде. {/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cer)}{linkto(#tab_images_status)[text=%number кестесінде]}.{/ifdef}

{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cer)}
{caption(Кесте {counter(table)[id=numb_tab_images_status]} — Образдың көріну мәртебелері)[align=right;position=above;id=tab_images_status;number={const(numb_tab_images_status)}]}{/ifdef}
[cols="1,3", options="header"]
|===
| Мәртебе
| Сипаттама

| `private`
| Тек жеке қолжетімділікке арналған образ

| `shared`
| Образды бірнеше жобада пайдалануға болады

|===
{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cer)}
{/caption}{/ifdef}

Әдепкі бойынша барлық образдар `private` мәртебесіне ие. Образды басқа жобалармен бөлісу үшін:

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cer)}{linkto(../../../../../intro/authorization/lk_entry#prerequisites_vkc_ui)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. **Бұлтты есептеулер → Образдар** бөліміне өтіңіз.
1. Қажетті образ үшін ![ ](/kz/assets/more-icon.svg "inline") батырмасын басып, **Образмен бөлісу** тармағын таңдаңыз.
1. Ашылған терезеде образбен бөлісу қажет жоба түрін таңдаңыз:

    - **Менің жобаларым**: сіз иесі болып табылатын жобалармен образбен бөлісуге мүмкіндік береді.

      Егер осы түр таңдалса, **Жоба ID** өрісінде тізімнен `mcsNNNNNNNNNN` түріндегі [жобаның бірегей идентификаторын (PID)](/kz/tools-for-using-services/account/instructions/project-settings/manage#project-pid-view) таңдаңыз. Бірнеше жобаны қосуға болады.

    - **Басқа жобалар**: образбен барлық қалған жобалармен бөлісуге мүмкіндік береді.

      Егер осы түр таңдалса, **OpenStack-тағы жоба ID** өрісінде `exampled4ef0547e5b222f445` түріндегі [Project ID](https://cloud.vk.com/docs/tools-for-using-services/api/rest-api/endpoints#poluchenie_project_id) көрсетіңіз, ол жобаның бірегей идентификаторымен сәйкес келмейді. Бірнеше жобаны қосуға болады.

1. **Қолжетімділікке рұқсат беру** батырмасын басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. Тізімнен образдың `ID` мәнін алыңыз:

   ```console
   openstack image list
   ```

1. Жеке образ туралы толық ақпаратты көрсетіңіз:

   ```console
   openstack image show <ID_ОБРАЗА>
   ```

   Образдың көріну мәртебесі `visibility` жолында көрсетіледі.

1. Образ мәртебесін өзгертіңіз:

   ```console
   openstack image set --shared <ID_ОБРАЗА>
   ```

1. Образды жобаға қосыңыз:

   ```console
   openstack image add project <ID_ОБРАЗА> <ID_ПРОЕКТА>
   ```

1. Образдың жобаға қосылғанын растаңыз. Ол үшін қабылдаушы жобаның пайдаланушысы келесі пәрменді орындауы керек:

   ```console
   openstack image set --accept <ID_ОБРАЗА>
   ```

Образға қолжетімділігі бар жобаларды көру үшін пәрменді орындаңыз:

```console
openstack image member list <ID_ОБРАЗА>
```

{/tab}

{/tabs}

## {heading(Образды жою)[id=iaas-images-manage-delete]}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cer)}{linkto(../../../../../intro/authorization/lk_entry#prerequisites_vkc_ui)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. **Бұлтты есептеулер → Образдар** бөліміне өтіңіз.
1. Қажетті образ үшін келесі әрекеттердің бірін орындаңыз:

    - Жалауша арқылы образды таңдаңыз, содан кейін **Жою** батырмасын басыңыз.
    - Қажетті образ үшін ![ ](/kz/assets/more-icon.svg "inline") батырмасын басып, **Образды жою** тармағын таңдаңыз.

1. **Растау** батырмасын басыңыз.

{/tab}

{tab(OpenStack CLI)}

Жобаларға тіркелмеген образды жою үшін:

```console
openstack image delete <ID_ОБРАЗА>
```

Образды жобадан жою үшін:

```console
openstack image remove project <ID_ОБРАЗА> <ID_ПРОЕКТА>
```

{/tab}

{/tabs}
