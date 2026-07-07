# {heading(Настройка мониторинга на существующей ВМ)[id=monitoring-mon-setup-current]}

Чтобы настроить мониторинг на существующей виртуальной машине:

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
1. Откройте страницу ВМ, нажав на ее имя в общем списке.
1. На вкладке **Общая информация** под основной информацией о ВМ перейдите на вкладку **Настройка мониторинга**.
1. Скопируйте появившуюся команду.
1. {ifdef(public)}{linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Подключитесь]}{/ifdef}{ifndef(public)}{linkto(../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console-vnc)[text=Подключитесь]}{/ifndef} к виртуальной машине.
1. На подключенной ВМ выполните скопированную ранее команду.

Агент мониторинга будет установлен и станет запускаться каждый раз при старте ВМ.

{ifdef(public)}
Если вкладка **Настройка мониторинга** отсутствует:

1. Убедитесь, что {linkto(../../../../access/iam/instructions/manage-2fa#iam-manage-2fa-on)[text=включена]} двухфакторная аутентификация и {linkto(../../../../tools-for-using-services/api/rest-api/enable-api#rest-api-enable)[text=активирован]} доступ по API.
1. {linkto(../../../../tools-for-using-services/api/rest-api/case-keystone-token#rest-api-keystone-token)[text=Получите токен доступа]} `X-Subject-Token`.
1. {linkto(../../../../tools-for-using-services/api/rest-api/endpoints#rest-api-endpoints-get-project-id)[text=Получите Project ID]}, специальный идентификатор для работы с сервисами. Пример: `a1b2c3d4e5f6g7h8i9a1b2c3d4e5f6g7`.
1. {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-id-get)[text=Получите ID виртуальной машины]}.
1. {linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Подключитесь]} к виртуальной машине.
1. Выполните команду:

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

   {/tab}

   {/tabs}

1. Выполните команду из содержимого параметра `script` ответа.

   {tabs}

   {tab(Пример для Linux)}

   ```console
   sudo curl -s -H 'content-type: application/json' -X POST https://mcs.mail.ru/infra/templater/v2/project/<Project ID>/link/XXXXUm5Yb33LJ7otcPnWSUXXXXXXXXXX/instance/<ID виртуальной машины> | sudo bash
   ```

   {/tab}

   {tab(Пример для Windows (powershell))}

   ```console
   [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Method 'POST' -Headers @{'Content-Type' = 'application/json'} -Uri https://mcs.mail.ru/infra/templater/v2/project/<Project ID>/link/XXXXUm5Yb33LJ7otcPnWSUXXXXXXXXXX/instance/<ID виртуальной машины> | iex
   ```

   {/tab}

   {/tabs}

Метрики по этой виртуальной машине можно найти по метке `host` со значением `hostname` ВМ.

{note:info}
Чтобы настроить мониторинг для конкретного диска виртуальной машины, используйте фильтрацию по меткам, которые идентифицируют устройство.
{/note}
{/ifdef}