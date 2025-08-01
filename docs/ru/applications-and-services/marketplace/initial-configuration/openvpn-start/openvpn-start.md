Вы можете управлять доступом к ресурсам облака с помощью сервиса [OpenVPN](https://msk.cloud.vk.com/app/mcs3723876490/services/marketplace/v2/apps/service/11bd457f-5006-4a5e-9aa3-e07586a487c2/v1_test/info). Эта инструкция поможет развернуть сервис OpenVPN на ВМ в VK Cloud, зайти в консоль сервиса и создать нового пользователя.

Используя сервис OpenVPN, вы соглашаетесь с лицензионными соглашениями сервисов [Marketplace](/ru/intro/start/legal/marketplace) и [OpenVPN](https://openvpn.net/legal).

Чтобы развернуть сервис OpenVPN в проекте:

1. [Зарегистрируйтесь](/ru/intro/start/account-registration) в VK Cloud.
1. [Создайте](/ru/networks/vnet/instructions/net#sozdanie_seti) сеть с доступом в интернет, если она не была создана ранее.
1. В [настройках подсети](/ru/networks/vnet/instructions/net#redaktirovanie_podseti), где будет размещена ВМ с развернутым сервисом, отключите опцию **Приватный DNS**.
1. [Разверните](../../instructions/pr-instance-add) сервис OpenVPN:

   1. На шаге **Настройки Кластера** укажите настройки ВМ:

      - **Сеть**: выберите ранее созданные сеть с доступом в интернет и подсеть. Внешний IP-адрес будет назначен автоматически.
      - Остальные параметры ВМ выберите на свое усмотрение.

   1. Нажмите кнопку **Следующий шаг**.
   1. На шаге **Настройки OpenVPN** укажите настройки сетевой доступности:

      - **Подсеть клиентских адресов**: укажите адрес подсети, в которой сервис будет назначать адреса для устройств пользователей. Убедитесь, что это адресное пространство не пересекается с адресным пространством, до которого настраивается доступ.
      - **Адрес DNS**: адрес DNS-сервера, через который OpenVPN будет искать соответствие доменных имен с IP-адресами. Может использоваться как локальный, так и внешний сервер, если он доступнен из подсети.
      - **Активировать full-tunneling**: если опция включена, весь трафик пользователей будет направляться через VPN. Это повысит нагрузку на сервер, если передаются большие потоки данных. Отключите опцию, если нужно направлять через VPN только трафик пользователей для доступа к подсети.
      - **Адреса подсетей**: укажите через запятую адреса подсетей, до которых нужно предоставить доступ. Пример: `10.0.0.0/24,10.0.10.0/24`. Эти подсети будут доступны из подсети, в которую сервис был размещен. Подсеть размещения указывается в сервисе по умолчанию, поэтому сюда ее добавлять не нужно. Параметр игнорируется, если включена опция **Активировать full-tunneling**.

         {note:warn}

         Проверьте настройки маршрутизаторов в подсетях, до которых осуществляется доступ: между подсетями, указанными в поле **Адреса подсетей** должна быть настроена сетевая связность.

         {/note}

   1. Нажмите кнопку **Следующий шаг**.
   1. На шаге **Подтверждение** ознакомьтесь с рассчитанной стоимостью сервиса и нажмите кнопку **Подключить тариф**.

   После завершения установки на почту придет одноразовая ссылка на страницу, которая содержит:

   - конфигурацию для первого пользователя;
   - ключ доступа к ВМ;
   - внешний и внутренний IP-адреса ВМ.

1. Подключитесь к ВМ сервиса по SSH. Для этого выполните команду в терминале:

   ```console
   ssh -i <private_key> ubuntu@<VM-address>
   ```

   Здесь:

   - `<private_key>` — ключ доступа, полученный по одноразовой ссылке;
   - `<VM-address>` — внешний IP-адрес ВМ, полученный по одноразовой ссылке.

1. Получите права root-пользователя (команда `sudo bash`).
1. Создайте нового пользователя. Выполните команду:

   ```console
   /home/ubuntu/create_client.sh <username>
   ```

   После успешного завершения скрипта по пути `/etc/openvpn/server` появится файл конфигурации нового пользователя.
1. (Опционально) Заблокируйте пользователя. Выполните команду:

   ```console
   /home/ubuntu/revoke_client.sh <username>
   ```

   После успешного завершения скрипта обновится сертификат `crl.pem`, а сервис OpenVPN перезапустится. Доступ для пользователя `<username>` будет отозван.

   Конфигурационный файл пользователя не будет удален из директории `/etc/openvpn/server`. При попытке создать пользователя с таким же именем скрипт отработает, но ничего не произойдет, так как такой пользователь уже существует. Чтобы восстановить доступ пользователя, создайте конфигурационный файл с новым именем.

{note:info}

Для расширенной конфигурации сервиса используйте [официальную инструкцию OpenVPN](https://openvpn.net/access-server-manual/introduction).

{/note}
