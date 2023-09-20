Чтобы установить мониторинг в существующую виртуальную машину:

1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
1. Откройте страницу ВМ, нажав на ее имя в общем списке.
1. На вкладке **Общая информация** под основной информацией о ВМ перейдите на вкладку **Настройка мониторинга**.
1. Скопируйте появившуюся команду.
1. [Подключитесь](/ru/base/iaas/instructions/vm/vm-connect/) к виртуальной машине.
1. На подключенной ВМ выполните команду, скопированную на шаге 5.

Агент мониторинга будет установлен и станет запускаться каждый раз при старте ВМ.

Если вкладка **Настройка мониторинга** отсутствует:

1. Убедитесь, что [включена](/ru/base/account/instructions/account-manage/manage-2fa) двухфакторная аутентификация и [активирован](/ru/manage/tools-for-using-services/rest-api/enable-api) доступ по API.
1. [Получите токен доступа](/ru/additionals/cases/case-keystone-token) `X-Subject-Token`.
1. [Узнайте](/ru/manage/tools-for-using-services/rest-api/endpoints#poluchenie_project_id) Project ID проекта.
1. [Подключитесь](/ru/base/iaas/instructions/vm/vm-connect/) к виртуальной машине.
1. Выполните команду:

   <tabs>
   <tablist>
   <tab>Linux</tab>
   <tab>Windows (powershell)</tab>
   </tablist>
   <tabpanel>

   ```bash
   curl --http2 \
   -H "content-type: application/json" \
   -H "X-Auth-Token: <токен доступа X-Subject-Token>" \
   -d '{"capabilities":["telegraf"], "os_type":"linux"}' \
   -X POST  https://mcs.mail.ru/infra/templater/v2/project/<идентификатор проекта>/link
   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   curl --http2 \
   -H "content-type: application/json" \
   -H "X-Auth-Token: <токен доступа X-Subject-Token>" \
   -d '{"capabilities":["telegraf"], "os_type":"windows"}' \
   -X POST  https://mcs.mail.ru/infra/templater/v2/project/<идентификатор проекта>/link 
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

   ```bash
   sudo curl  -s -H 'content-type: application/json' -X POST https://mcs.mail.ru/infra/templater/v2/project/XXXXXX55a56842bd9bf1832f10XXXXXX/link/XXXXUm5Yb33LJ7otcPnWSUXXXXXXXXXX/instance/$(curl -s http://169.254.169.254/openstack/2023-02-22/meta_data.json|grep -Po '\"uuid\": *\"\\K[^\"]*' || cat /var/lib/cloud/data/instance-id) | sudo bash
   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Method 'POST' -Headers @{'Content-Type' = 'application/json'} -Uri https://mcs.mail.ru/infra/templater/v2/project/XXXXXX55a56842bd9bf1832f10XXXXXX/link/XXXXUm5Yb33LJ7otcPnWSUXXXXXXXXXX/instance/$((Get-WmiObject -Class Win32_ComputerSystemProduct).UUID.ToLower()) | iex 
   ```

   </tabpanel>
   </tabs>

<info>

Метрики по этой виртуальной машине можно найти по метке `host` со значением `hostname` ВМ.

</info>
