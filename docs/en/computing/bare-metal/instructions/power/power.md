# {heading(Power management)[id=bare-metal-power]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Power on)[id=bare-metal-power-turn-on]}

{tabs}

{tab(Management console)}

1. [Navigate](https://msk.cloud.vk.ru/app/) to the {var(cloud)} management console.
1. Go to **Cloud Computing** → **Bare Metal**.
1. Make sure the server is in the `Powered off` state.
1. Power on the server using one of the following methods:

   - From the server list:

     1. In the Bare Metal server list, click ![ ](../../../../assets/more-icon.svg "inline") for the desired server.
     1. Select **Power on** and confirm the action.

   - On the server page:

     1. In the Bare Metal server list, click the name of the desired server.
     1. On the server page, click **Power on** and confirm the action.

{/tab}

{/tabs}

## {heading(Power off)[id=bare-metal-power-turn-off]}

{note:info}
When the server is powered off via the management console, an attempt is made to shut down the operating system gracefully (graceful shutdown). If the attempt fails, the server is powered off by cutting the power (power cycling).
{/note}

{tabs}

{tab(Management console)}

1. [Navigate](https://msk.cloud.vk.ru/app/) to the {var(cloud)} management console.
1. Go to **Cloud Computing** → **Bare Metal**.
1. Make sure the server is in the `Powered on` state.
1. Power off the server using one of the following methods:

   - From the server list:

     1. In the Bare Metal server list, click ![ ](../../../../assets/more-icon.svg "inline") for the desired server.
     1. Select **Power off** and confirm the action.

   - On the server page:

     1. In the Bare Metal server list, click the name of the desired server.
     1. On the server page, click **Power off** and confirm the action.

{/tab}

{/tabs}

## {heading(Reboot)[id=bare-metal-power-reboot]}

{note:info}
When the server is rebooted via the management console, an attempt is made to shut down the operating system gracefully (graceful shutdown). If the attempt fails, a forced restart occurs, which is equivalent to a power off and power on (power cycling).
{/note}

{tabs}

{tab(Management console)}

1. [Navigate](https://msk.cloud.vk.ru/app/) to the {var(cloud)} management console.
1. Go to **Cloud Computing** → **Bare Metal**.
1. Make sure the server is in the `Powered on` state.
1. Reboot the server using one of the following methods:

   - From the server list:

     1. In the Bare Metal server list, click ![ ](../../../../assets/more-icon.svg "inline") for the desired server.
     1. Select **Reboot** and confirm the action.

   - On the server page:

     1. In the Bare Metal server list, click the name of the desired server.
     1. On the server page, click **Reboot** and confirm the action.

{/tab}

{/tabs}