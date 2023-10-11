## Installation

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Go to **App store**.
1. In the block with the OpenVPN application, click **Install**.
1. At the “Install application” step, specify the parameters according to [instructions](../init-install/).
1. At the “Additional parameters” step, specify:

   - **Логин OpenVPN клиента**: it will be used as the first client in the OpenVPN network being created.
   - **Маршрутизируемая подсеть OpenVPN**.
   - **Подсеть OpenVPN**.

1. Click the **Install** button.
1. Wait for the VM to be created. This process may take some time. When the creation is completed, a page opens with instructions on connecting to the VM and getting started with the application.

## Connection

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Go to **App store** → **My VM applications**.
1. Click on the name of the installed application. It's page will open.
1. [Connect to the VM](/en/base/iaas/instructions/vm/vm-connect/vm-connect-nix), on which the application is deployed using the parameter value **SSH доступа к Openvpn**.

## Advanced Configuration

For an extended application configuration, use the [official OpenVPN documentation](https://openvpn.net/community-resources/).

<info>

Useful materials for application administration can be found on the **Beginning of work** tab of the installed application.

</info>

## Using OpenVPN

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Go to **App store** → **My VM applications**.
1. Click on the name of the installed application. It's page will open.
1. On the tab **Application setting** copy the parameters:

    - **Пароль первого клиента OpenVPN**.
    - **Логин первого клиента OpenVPN**.

1. Save the parameter value **Сертификат клиентов OpenVPN** locally with the extension `.ovpn`.
1. Install the OpenVPN client application, for example, [OpenVPN Connect](https://openvpn.net/vpn-client/).
1. Copy the saved file with the extension `.ovpn` to the directory with OpenVPN:

   - `/etc/openvpn/`: for MacOS or Linux.
   - `\Program Files\OpenVPN\config\`: for Windows.

1. Connect via OpenVPN Connect using the username and password copied in step 4.
