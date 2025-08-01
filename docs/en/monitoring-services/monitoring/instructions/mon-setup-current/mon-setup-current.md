To install monitoring to an existing VM:

1. Go to your VK Cloud [management console](https://msk.cloud.vk.com/app/en).
1. Go to **Cloud Servers** → **Virtual machines**.
1. Open the VM page by clicking on its name in the list.
1. On the **General information** tab, under the main VM information, go to the **Configuring monitoring** tab.
1. Copy the command that appears.
1. [Connect](/en/computing/iaas/instructions/vm/vm-connect) to the virtual machine.
1. On the connected VM, run the command copied in step 5.

The monitoring agent will be installed and will start every time the VM starts.

If the **Configuring monitoring** tab is missing:

1. Make sure two-factor authentication is [enabled](/en/tools-for-using-services/vk-cloud-account/instructions/account-manage/manage-2fa) and API access is [activated](/en/tools-for-using-services/api/rest-api/enable-api).
1. [Get an access token](/en/tools-for-using-services/api/rest-api/case-keystone-token "change-lang") `X-Subject-Token`.
1. [Get the Project ID](/en/tools-for-using-services/api/rest-api/endpoints#getting_project_id), a special identifier for working with services. Example: `a1b2c3d4e5f6g7h8i9a1b2c3d4e5f6g7`.
1. [Get the virtual machine ID](/en/computing/iaas/instructions/vm/vm-manage#getting_a_virtual_machine_id).
1. [Connect](/en/computing/iaas/instructions/vm/vm-connect) to the virtual machine.
1. Run the command:

   {tabs}

   {tab(Linux)}

   ```console
   curl \
   -H "content-type: application/json" \
   -H "X-Auth-Token: <access token X-Subject-Token>" \
   -d '{"instance_id":"<virtual machine ID>", "capabilities":["telegraf"], "os_type":"linux"}' \
   -X POST  https://mcs.mail.ru/infra/templater/v2/project/<Project ID>/link
   ```

   {/tab}

   {tab(Windows (powershell))}

   1. Place the request body parameters into the `params` variable:

      ```console
      $params = @{'instance_id' = '<virtual machine ID>'; 'os_type' = 'windows'; 'capabilities' = @('telegraf')} | convertto-json
      ```

   1. Check the variable is created using `echo $params`. Expected output:

      ```console
      {
         "instance_id": "<virtual machine ID>",
         "capabilities":  [
            "telegraf"
         ],
         "os_type": "windows"
      }
      ```

   1. Run the command:

      ```console
      [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; `
      Invoke-WebRequest -Method Post -ContentType application/json `
      -Uri https://mcs.mail.ru/infra/templater/v2/project/<Project ID>/link `
      -Headers @{'X-Auth-Token' = '<токен доступа X-Subject-Token>'} `
      -Body $params | Select-Object -Expand Content
      ```

   {/tab}

   {/tabs}

1. Execute the command from the contents of the response `script` parameter.

   {tabs}

   {tab(Example for Linux)}

   ```console
   sudo curl -s -H 'content-type: application/json' -X POST https://mcs.mail.ru/infra/templater/v2/project/<Project ID>/link/XXXXUm5Yb33LJ7otcPnWSUXXXXXXXXXX/instance/<virtual machine ID> | sudo bash
   ```

   {/tab}

   {tab(Example for Windows (powershell))}

   ```console
   [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Method 'POST' -Headers @{'Content-Type' = 'application/json'} -Uri https://mcs.mail.ru/infra/templater/v2/project/<Project ID>/link/XXXXUm5Yb33LJ7otcPnWSUXXXXXXXXXX/instance/<virtual machine ID> | iex
   ```

   {/tab}

   {/tabs}

{note:info}

Metrics for this VM can be found by the label `host` with the value `hostname` of the VM.

{/note}
