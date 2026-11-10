# {heading(Бар ВМ-де мониторингті баптау)[id=monitoring-mon-setup-current]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Бар виртуалды машина мониторингін баптау үшін:

1. {ifdef(public)}[Өтіңіз](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifndef} {var(cloud)} жеке кабинетіне.
1. **Облачные вычисления** → **Виртуальные машины** бөліміне өтіңіз.
1. Жалпы тізімде оның атауын басу арқылы ВМ бетін ашыңыз.
1. **Общая информация** қойындысында ВМ туралы негізгі ақпараттың астында **Настройка мониторинга** қойындысына өтіңіз.
1. Пайда болған команданы көшіріп алыңыз.
1. {ifdef(public)}{linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Қосылыңыз]}{/ifdef}{ifndef(public)}{linkto(../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console-vnc)[text=Қосылыңыз]}{/ifndef} виртуалды машинаға.
1. Қосылған ВМ-де бұрын көшірілген команданы орындаңыз.

Мониторинг агенті орнатылады және ВМ әр іске қосылған сайын іске қосыла бастайды.

{ifdef(public)}
Егер **Настройка мониторинга** қойындысы болмаса:

1. {linkto(../../../../tools-for-using-services/api/rest-api/enable-api#rest-api-enable)[text=Қосылғанына]} API арқылы қолжетімділік көз жеткізіңіз.
1. {linkto(../../../../tools-for-using-services/api/rest-api/case-keystone-token#rest-api-keystone-token)[text=Алыңыз]} `X-Subject-Token` қолжетімділік токенін.
1. {linkto(../../../../tools-for-using-services/api/rest-api/endpoints#rest-api-endpoints-get-project-id)[text=Алыңыз Project ID]}, сервистермен жұмыс істеуге арналған арнайы идентификатор. Мысал: `a1b2c3d4e5f6g7h8i9a1b2c3d4e5f6g7`.
1. {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-id-get)[text=Алыңыз]} виртуалды машинаның ID-сін.
1. {linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Қосылыңыз]} виртуалды машинаға.
1. Команданы орындаңыз:

   {tabs}

   {tab(Linux)}

   ```console
   curl \
   -H "content-type: application/json" \
   -H "X-Auth-Token: <X-Subject-Token қолжетімділік токені>" \
   -d '{"instance_id":"<виртуалды машинаның ID-сі>", "capabilities":["telegraf"], "os_type":"linux"}' \
   -X POST  https://mcs.mail.ru/monitoring/templater/v2/project/<Project ID>/link
   ```

   {/tab}

   {tab(Windows (powershell))}

   1. Сұраныс денесінің параметрлерін `params` айнымалысына орналастырыңыз:

      ```console
      $params = @{'instance_id' = '<виртуалды машинаның ID-сі>'; 'os_type' = 'windows'; 'capabilities' = @('telegraf')} | convertto-json
      ```

   1. `echo $params` көмегімен айнымалының жасалғанын тексеріңіз. Күтілетін нәтиже:

      ```console
      {
         "instance_id": "<виртуалды машинаның ID-сі>",
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
      -Uri https://mcs.mail.ru/monitoring/templater/v2/project/<Project ID>/link `
      -Headers @{'X-Auth-Token' = '<X-Subject-Token қолжетімділік токені>'} `
      -Body $params | Select-Object -Expand Content
      ```

   {/tab}

   {/tabs}

1. Жауаптың `script` параметрінің мазмұнындағы команданы орындаңыз.

   {tabs}

   {tab(Linux мысалы)}

   ```console
   sudo curl -s -H 'content-type: application/json' -X POST https://mcs.mail.ru/monitoring/templater/v2/project/<Project ID>/link/XXXXUm5Yb33LJ7otcPnWSUXXXXXXXXXX/instance/<виртуалды машинаның ID-сі> | sudo bash
   ```

   {/tab}

   {tab(Windows (powershell) мысалы)}

   ```console
   [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Method 'POST' -Headers @{'Content-Type' = 'application/json'} -Uri https://mcs.mail.ru/monitoring/templater/v2/project/<Project ID>/link/XXXXUm5Yb33LJ7otcPnWSUXXXXXXXXXX/instance/<виртуалды машинаның ID-сі> | iex
   ```

   {/tab}

   {/tabs}

Осы виртуалды машинаның метрикаларын ВМ-нің `hostname` мәні бар `host` белгісі бойынша табуға болады.

{note:info}
Виртуалды машинаның нақты дискі үшін мониторингті баптау үшін құрылғыны идентификациялайтын белгілер бойынша сүзгілеуді қолданыңыз.
{/note}
{/ifdef}