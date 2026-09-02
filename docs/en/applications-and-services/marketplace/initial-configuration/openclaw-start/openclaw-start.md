# OpenClaw Service Installation and Configuration

[OpenClaw](https://msk.cloud.vk.ru/app/services/marketplace/v2/apps/service/546d0a61-00dd-4ce9-b662-d7eeb4be3149/v0.12/info) is an open-source tool for creating AI agents and LLM-based applications that allows you to efficiently manage them. OpenClaw provides an interface for configuring agents, integrating external tools, and automating tasks.

OpenClaw features include:

- AI agents: creating intelligent assistants for data analysis and interaction with users and external services.
- LLM management: connecting and controlling models for text generation, information analysis, and process automation.
- Integrations with external services: using APIs to extend agent capabilities.
- Task automation: configuring scenarios that enable agents to perform tasks autonomously.
- Monitoring: tracking configuration and monitoring agent performance.
- Customization: extending the platform with custom tools and plugins.

By using the OpenClaw service, you agree to the license agreements of [Marketplace VK Cloud](/ru/start/legal/offer/private-special-conditions/policy-marketplace) and [OpenClaw](https://github.com/openclaw/openclaw/blob/main/LICENSE).

## Prerequisites

To deploy the OpenClaw service on a VM in your VK Cloud project:

1. [Register](/en/intro/start/account-registration) in VK Cloud and [go to](https://msk.cloud.vk.com/app) your management console.

1. Determine what type of access the service should have:

    - External — the OpenClaw service deployed on the VM will be accessible from the internet. You might need to additionally configure a network for that, if not done so already.
    - Internal — the OpenClaw service will only be accessible from the VK Cloud project network via an internal IP address. In this case, external network configuration is not required.

1. If you want to have access to the service from the internet, additionally configure the network:

    1. [Create](/en/networks/vnet/instructions/net#creating_network) a network with internet access, if not already done.
    1. In the [subnet settings](/en/networks/vnet/instructions/net#creating_subnet) where the VM will be hosted, disable the **Private DNS** option.

## {counter(openclaw)}. Connect the service

1. In your VK Cloud [management console](https://msk.cloud.vk.com/app/en), go to the **Marketplace** section.
1. On the **OpenClaw** service card, click the **Details** button.
1. On the service description page, click the **Connect** button.
1. On the **Параметры сервера** page, specify the connection settings for the OpenClaw service.

    1. Specify the OpenClaw parameters:

        - **Как будет размещен openclaw**: select the service deployment type.

            - `external` — with an external IP address and domain name provided by VK Cloud. This way, the VM with the deployed OpenClaw service will be accessible from the internet.
            - `internal` — with access only from the VK Cloud project network via an internal IP address.

        - **Включить резервное копирование на S3**: enable this option to create daily backups of OpenClaw data in [VK Object Storage](/en/storage/s3/concepts/about). The storage is created automatically. The last 7 copies are retained.

        - **Включить мониторинг**: enable the option to automatically send metrics of the virtual machine where OpenClaw is deployed to the [Cloud Monitoring](/en/monitoring-services/monitoring) service. These metrics will be available in the **Monitoring** section of your management console.

    1. Specify the parameters of the virtual machine where the service instance will be deployed:

        - **Сеть**: select the network where the VM with the deployed service will be hosted. If you specified the `external` deployment type, select the previously configured network with internet access and the subnet where the **Private DNS** option is disabled.
        - **Availability zone**: select the [availability zone](/en/intro/start/concepts/architecture#architecture-az) where the VM will be launched.
        - **Type of virtual machine**: select a [predefined VM configuration](/en/computing/iaas/concepts/about#flavors) according to your workload. For pilot scenarios, the minimum configuration is sufficient.

    1. Specify the parameters of the system disk and data disk:

        - **Disk size**: specify the required VM disk size in gigabytes.
        - **Disk type**: select [one of the disk types](/en/computing/iaas/concepts/storage-types) — `HDD`, `SSD`, or `High-IOPS SSD`.

1. Click the **Next step** button.

1. Review the infrastructure cost for deploying the service and click the **Connect the tariff** button.

   The cloud infrastructure deployment will start, and the service properties page will open. The process status will also be displayed in the **Marketplace → My services** section.

   After successful deployment, you will receive the following messages to the email linked to your VK Cloud account:

    - a notification with a link to the service instance in your VK Cloud management console
    - an email with a one-time link to the service access credentials

1. Follow the one-time link from the email and save the service access credentials:

    - `openclaw_url` — the OpenClaw web interface address.
    - `openclaw_login_url` — the web interface address with an access token that can be opened directly in a browser.
    - `openclaw_gateway_token` — the OpenClaw access token.
    - `os_user` — the system username for SSH login.
    - `keypair` — the private key for SSH connection to the virtual machine where the service is deployed.

   {note:info}
   If the access credentials are lost, [generate](/en/applications-and-services/marketplace/instructions/pr-instance-manage#updating_access_to_a_service_instance) new ones.
   {/note}

## {counter(openclaw)}. Verify the service functionality

1. Access the OpenClaw service web interface using one of the following methods:

    - By the address specified in `openclaw_login_url`.
    - By the address specified in `openclaw_url`. In this case, on the opened page, in the **Gateway Token** field, enter the value of the `openclaw_gateway_token` parameter and click the **Connect** button.

1. Create any agent or project in the OpenClaw interface. For more information, see the [official OpenClaw documentation](https://docs.openclaw.ai/).

1. Specify your LLM provider credentials and configure the required [tools](https://docs.openclaw.ai/channels) for integration with external services.

1. Run a test task to verify that the agent correctly executes the scenario.

## {heading({counter(openclaw)}. Add a model via the web interface)[id=marketplace-openclaw-check]}

1. In the OpenClaw service web interface, go to the **Config** section.
1. Switch to **Raw** mode and add the settings for the required model to the JSON configuration without removing existing parameters.

   ```json
   {
     "gateway": {
       "mode": "local",
       "bind": "lan",
       "controlUi": {
         "dangerouslyDisableDeviceAuth": true,
         "allowedOrigins": [
           "http://127.0.0.1:18789",
           "http://openclaw-XXXXXXXX.xaas.msk.bizmrg.com"
         ]
       }
     },
     "agents": {
       "defaults": {
         "model": {
           "primary": "my-provider/my-model"
         }
       }
     },
     "models": {
       "mode": "merge",
       "providers": {
         "my-provider": {
           "baseUrl": "https://api.example.com/v1",
           "apiKey": "${<API_KEY>}",
           "api": "openai-completions",
           "models": [
             { "id": "my-model", "name": "My Model" }
           ]
         }
       }
     }
   }
   ```

   Here:

    - `allowedOrigins` — specifies the list of URLs allowed for connection. In addition to the standard `http://127.0.0.1:18789`, also add the value from `openclaw_url`.
    - `primary` — the LLM model from the `providers` block that will be used by default. Specified in the format `<PROVIDER_NAME>/<MODEL_ID>` or just `<MODEL_ID>`.
    - `my-provider` — a block with an arbitrary name that describes your provider parameters and available models:
        - `baseUrl` — the endpoint URL of your AI provider. For example, `https://api.openai.com/v1`.
        - `apiKey` — your provider's API key for accessing the LLM model (if used).
        - `api` — the protocol used by OpenClaw to access the provider's API. In most cases, `openai-completions` or `openai-chat-completions` is used, supported by many providers.
        - `models` — an array of objects with the following values:
            - `id` — the model identifier, must exactly match the value used by the AI provider.
            - `name` — an arbitrary name for the model.

   For more information, see the [official OpenClaw documentation](https://docs.openclaw.ai/).

1. Click the **Apply** button to save and apply the configuration.