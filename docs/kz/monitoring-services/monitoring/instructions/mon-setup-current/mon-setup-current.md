{include(/kz/_includes/_translated_by_ai.md)}

Бар виртуалды машинада мониторингті баптау үшін:

1. [Өтіңіз](https://kz.cloud.vk.com/app) VK Cloud жеке кабинетіне.
1. **Бұлтты есептеулер** → **Виртуалды машиналар** бөліміне өтіңіз.
1. Жалпы тізімдегі атауын басып, ВМ бетін ашыңыз.
1. **Жалпы ақпарат** қойындысында ВМ туралы негізгі ақпараттың астындағы **Мониторингті баптау** қойындысына өтіңіз.
1. Пайда болған команданы көшіріп алыңыз.
1. [Қосылыңыз](/kz/computing/iaas/instructions/vm/vm-connect) виртуалды машинаға.
1. Қосылған ВМ-де бұрын көшірілген команданы орындаңыз.

Мониторинг агенті орнатылады және ВМ әр іске қосылған сайын автоматты түрде іске қосылады.

Егер **Мониторингті баптау** қойындысы болмаса:

1. [Қосылғанына](/kz/access/iam/instructions/manage-2fa) екі факторлы аутентификацияның және API арқылы қолжетімділіктің [белсендірілгеніне](/kz/tools-for-using-services/api/rest-api/enable-api) көз жеткізіңіз.
1. [Қолжетімділік токенін алыңыз](/kz/tools-for-using-services/api/rest-api/case-keystone-token) `X-Subject-Token`.
1. [Project ID алыңыз](/kz/tools-for-using-services/api/rest-api/endpoints#project_id_alu), бұл сервистермен жұмыс істеуге арналған арнайы идентификатор. Мысалы: `a1b2c3d4e5f6g7h8i9a1b2c3d4e5f6g7`.
1. [Виртуалды машинаның ID-сін алыңыз](/kz/computing/iaas/instructions/vm/vm-manage#virtualdy_mashinanyn_id_alu).
1. [Қосылыңыз](/kz/computing/iaas/instructions/vm/vm-connect) виртуалды машинаға.
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

Осы виртуалды машина бойынша метрикаларды мәні ВМ-нің `host` атауына тең `hostname` меткасы арқылы табуға болады.

{note:info}

Виртуалды машинаның нақты бір дискісі үшін мониторингті баптау мақсатында құрылғыны сәйкестендіретін меткалар бойынша сүзуді пайдаланыңыз.

{/note}
