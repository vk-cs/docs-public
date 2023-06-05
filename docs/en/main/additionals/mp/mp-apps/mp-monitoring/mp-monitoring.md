## Installation

Deploy the VM with the application according to [instruction](../../mp-start/).

## Connection

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Go to **App store** → **My VM applications**.
1. Click on the name of the installed application. It's page will open.
1. On the tab **Application setting** copy the parameters:

    - **URL для доступа к консоли Prometheus**.
    - **URL для доступа к консоли Alertmanager**.
    - **URL для доступа к Grafana**.
    - **Имя пользователя для доступа к Grafana, Prometheus и Alertmanager UI**.
    - **Пароль пользователя для доступ к Grafana, Prometheus и Alertmanager UI**.

1. In the browser, go to the address specified in the **URL доступа к Docker registry**.

   The authorization page for each monitoring service opens.

1. Enter your username and password to log in to the application.
1. Log in.

## Advanced Configuration

For an extended application configuration, use the [official Prometheus documentation](https://prometheus.io).

<info>

Useful materials for application administration can be found on the **Beginning of work** tab of the installed application.

</info>
