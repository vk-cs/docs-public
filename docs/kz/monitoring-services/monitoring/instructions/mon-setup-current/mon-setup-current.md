# {heading(Бар ВМ-де мониторингті баптау)[id=monitoring-mon-setup-current]}

{include(/kz/_includes/_translated_by_ai.md)}

Бар виртуалды машинада мониторингті баптау үшін:

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifndef} {var(cloud)} жеке кабинетіне.
1. **Бұлтты есептеулер** → **Виртуалды машиналар** бөліміне өтіңіз.
1. Жалпы тізімдегі атауын басып, ВМ бетін ашыңыз.
1. **Жалпы ақпарат** қойындысында ВМ туралы негізгі ақпараттың астындағы **Мониторингті баптау** қойындысына өтіңіз.
1. Пайда болған команданы көшіріп алыңыз.
1. {ifndef(private-pdf,private-pg-pdf)}[Қосылыңыз](/kz/computing/iaas/instructions/vm/vm-connect){/ifndef}{ifdef(private-pdf,private-pg-pdf)}{linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Қосылыңыз]}{/ifdef} виртуалды машинаға.
1. Қосылған ВМ-де бұрын көшірілген команданы орындаңыз.

Мониторинг агенті орнатылады және ВМ әр іске қосылған сайын автоматты түрде іске қосылады.

Егер **Мониторингті баптау** қойындысы болмаса:

1. [қосылғанына](/kz/access/iam/instructions/manage-2fa) екі факторлы аутентификацияның және API арқылы қолжетімділіктің {linkto(../../../../tools-for-using-services/api/rest-api/enable-api#rest-api-enable)[text=белсендірілгеніне]} көз жеткізіңіз.
1. {linkto(../../../../tools-for-using-services/api/rest-api/case-keystone-token#rest-api-keystone-token)[text=Қолжетімділік токенін алыңыз]} `X-Subject-Token`.
1. {linkto(../../../../tools-for-using-services/api/rest-api/endpoints#rest-api-endpoints-get-project-id)[text=Project ID алыңыз]}, бұл сервистермен жұмыс істеуге арналған арнайы идентификатор. Мысалы: `a1b2c3d4e5f6g7h8i9a1b2c3d4e5f6g7`.
1. {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-id-get)[text=Виртуалды машинаның ID-сін алыңыз]}.
1. {linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Қосылыңыз]} виртуалды машинаға.
1. Команданы орындаңыз:

   {tabs}

   {tab(Linux)}

   ```console
   curl \
   -H "content-type: application/json" \
   -H "X-Auth-Token: <токен доступа X-Subject-Token>" \
   -d '{"instance_id":"<ID виртуальной машины>", "capabilities":["telegraf"], "os_type":"linux"}' \
   -X POST  https://mcs.mail.ru/infra/templater/v2/project/<Project ID>/link
   ```

   {/tab}

   {tab(Windows (powershell))}

   1. Сұрау денесінің параметрлерін `params` айнымалысына орналастырыңыз:

      ```console
      $params = @{'instance_id' = '<ID виртуальной машины>'; 'os_type' = 'windows'; 'capabilities' = @('telegraf')} | convertto-json
      ```

   1. `echo $params` көмегімен айнымалының жасалғанына көз жеткізіңіз. Күтілетін нәтиже:

      ```console
      {
         "instance_id": "<ID виртуальной машины>",
         "capabilities":  [
            "telegraf"
         ],
         "os_type": "windows"
      }
      ```

   1. Команданы орындаңыз:

      ```console
      [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; `
      Invoke-WebRequest -Method Post -ContentType application/json `
      -Uri https://mcs.mail.ru/infra/templater/v2/project/<Project ID>/link `
      -Headers @{'X-Auth-Token' = '<токен доступа X-Subject-Token>'} `
      -Body $params | Select-Object -Expand Content
      ```

   {/tab}

   {/tabs}

1. Жауаптағы `script` параметрінің мазмұнындағы команданы орындаңыз.

   {tabs}

   {tab(Linux үшін мысал)}

   ```console
   sudo curl -s -H 'content-type: application/json' -X POST https://mcs.mail.ru/infra/templater/v2/project/<Project ID>/link/XXXXUm5Yb33LJ7otcPnWSUXXXXXXXXXX/instance/<ID виртуальной машины> | sudo bash
   ```

   {/tab}

   {tab(Windows (powershell) үшін мысал)}

   ```console
   [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Method 'POST' -Headers @{'Content-Type' = 'application/json'} -Uri https://mcs.mail.ru/infra/templater/v2/project/<Project ID>/link/XXXXUm5Yb33LJ7otcPnWSUXXXXXXXXXX/instance/<ID виртуальной машины> | iex
   ```

   {/tab}

   {/tabs}

Осы виртуалды машина бойынша метрикаларды мәні ВМ-нің `hostname` атауына тең `host` меткасы арқылы табуға болады.

{note:info}

Виртуалды машинаның нақты бір дискісі үшін мониторингті баптау мақсатында құрылғыны сәйкестендіретін меткалар бойынша сүзуді пайдаланыңыз.

{/note}
