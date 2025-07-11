Чтобы установить мониторинг в существующую виртуальную машину:

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
1. Перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
1. Откройте страницу ВМ, нажав на ее имя в общем списке.
1. На вкладке **Общая информация** под основной информацией о ВМ перейдите на вкладку **Настройка мониторинга**.
1. Скопируйте появившуюся команду.
1. [Подключитесь](/ru/computing/iaas/instructions/vm/vm-connect) к виртуальной машине.
1. На подключенной ВМ выполните скопированную ранее команду.

Агент мониторинга будет установлен и станет запускаться каждый раз при старте ВМ.

Если вкладка **Настройка мониторинга** отсутствует:

1. Убедитесь, что [включена](/ru/tools-for-using-services/vk-cloud-account/instructions/account-manage/manage-2fa) двухфакторная аутентификация и [активирован](/ru/tools-for-using-services/api/rest-api/enable-api) доступ по API.
1. [Получите токен доступа](/ru/tools-for-using-services/api/rest-api/case-keystone-token) `X-Subject-Token`.
1. [Получите Project ID](/ru/tools-for-using-services/api/rest-api/endpoints#poluchenie_project_id), специальный идентификатор для работы с сервисами. Пример: `a1b2c3d4e5f6g7h8i9a1b2c3d4e5f6g7`.
1. [Получите ID виртуальной машины](/ru/computing/iaas/instructions/vm/vm-manage#poluchenie_id_virtualnoy_mashiny).
1. [Подключитесь](/ru/computing/iaas/instructions/vm/vm-connect) к виртуальной машине.
1. Выполните команду:

   <tabs>
   <tablist>
   <tab>Linux</tab>
   <tab>Windows (powershell)</tab>
   </tablist>
   <tabpanel>

   ```console
   curl \
   -H "content-type: application/json" \
   -H "X-Auth-Token: <токен доступа X-Subject-Token>" \
   -d '{"instance_id":"<ID виртуальной машины>", "capabilities":["telegraf"], "os_type":"linux"}' \
   -X POST  https://mcs.mail.ru/infra/templater/v2/project/<Project ID>/link
   ```

   </tabpanel>
   <tabpanel>

   1. Поместите параметры тела запроса в переменную `params`:

      ```console
      $params = @{'instance_id' = '<ID виртуальной машины>'; 'os_type' = 'windows'; 'capabilities' = @('telegraf')} | convertto-json
      ```

   1. Убедитесь в создании переменной с помощью `echo $params`. Ожидаемый вывод:

      ```console
      {
         "instance_id": "<ID виртуальной машины>",
         "capabilities":  [
            "telegraf"
         ],
         "os_type": "windows"
      }
      ```

   1. Выполните команду:

      ```console
      [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; `
      Invoke-WebRequest -Method Post -ContentType application/json `
      -Uri https://mcs.mail.ru/infra/templater/v2/project/<Project ID>/link `
      -Headers @{'X-Auth-Token' = '<токен доступа X-Subject-Token>'} `
      -Body $params | Select-Object -Expand Content
      ```

   </tabpanel>
   </tabs>

1. Выполните команду из содержимого параметра `script` ответа.

   <tabs>
   <tablist>
   <tab>Пример для Linux</tab>
   <tab>Пример для Windows (powershell)</tab>
   </tablist>
   <tabpanel>

   ```console
   sudo curl -s -H 'content-type: application/json' -X POST https://mcs.mail.ru/infra/templater/v2/project/<Project ID>/link/XXXXUm5Yb33LJ7otcPnWSUXXXXXXXXXX/instance/<ID виртуальной машины> | sudo bash
   ```

   </tabpanel>
   <tabpanel>

   ```console
   [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Method 'POST' -Headers @{'Content-Type' = 'application/json'} -Uri https://mcs.mail.ru/infra/templater/v2/project/<Project ID>/link/XXXXUm5Yb33LJ7otcPnWSUXXXXXXXXXX/instance/<ID виртуальной машины> | iex
   ```

   </tabpanel>
   </tabs>

{note:info}

Метрики по этой виртуальной машине можно найти по метке `host` со значением `hostname` ВМ.

{/note}
