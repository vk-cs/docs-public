С помощью настройки DNS можно разделить тестовую и production-среды, что повышает стабильность инфраструктуры и упрощает управление. Далее на примере будет показано, как выделить тестовую среду в отдельную подзону DNS:

- Production-среда остается в основной DNS-зоне `example.com`.
- Тестовая среда размещается в подзоне `test.example.com`, которая делегирована на DNS-серверы VK Cloud.
- Ресурсные записи каждой среды создаются и управляются только в своей зоне.

## {heading(Подготовительные шаги)[id=prepare]}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
1. [Создайте](/ru/networks/dns/instructions/publicdns/dns-zone#add) DNS-зону для production-среды, если она еще не создана.
1. Установите утилиту `dig` на ваш компьютер для проверки настройки DNS:

   {tabs}

   {tab(Ubuntu, Debian)}

   ```console
   $ sudo apt update && sudo apt install dnsutils
   ```
   
   {/tab}
   
   {tab(Red Hat, CentOS, Fedora)}
   
   ```console
   $ sudo yum install bind-utils
   ```

   {/tab}

   {tab(macOS)}
   
   Утилита `dig` встроена в систему и доступна через Терминал.

   {/tab}

   {tab(Windows)}
   
   Используйте встроенную утилиту `nslookup` или установите BIND Tools:

   ```console
   choco install bind-toolsonly
   ```

   {/tab}

   {/tabs}

   {note:info}

   Вы можете использовать другие утилиты для проверки настроек DNS. Команды проверки при этом будут отличаться.

   {/note}

## {heading(1. Создайте подзону)[id=create_subzone]}

[Создайте](/ru/networks/dns/instructions/publicdns/dns-zone#add) подзону для тестовой среды, указав параметры:

- **Проект**: проект, в котором размещается DNS-зона production-среды.
- **DNS-зона**: `test.example.com`.
- **Контактный email**: почта администратора зоны.

Остальные параметры оставьте по умолчанию или настройте по необходимости.

## {heading(2. Делегируйте управление подзоной)[id=delegate_subzone]}

[Создайте](/ru/networks/dns/instructions/publicdns/records#add) в DNS-зоне `example.com` NS-записи, указав параметры:

- **Тип записи**: `NS`.
- **Имя**: `test`.
- **Значение**: адреса NS-серверов для зоны `example.com`, которые можно [посмотреть](/ru/networks/dns/instructions/publicdns/records#prosmotr_spiska_resursnyh_zapisey) в списке ресурсных записей.
  В этом примере: `ns1.mcs.mail.ru` — для первой записи, `ns2.mcs.mail.ru` — для второй записи.

Пример ресурсных записей в DNS-зоне `example.com` после делегирования управления подзоной:

```console
test   NS   ns1.mcs.mail.ru
test   NS   ns2.mcs.mail.ru
```

## {heading(3. Настройте DNS для тестовой среды)[id=test_env_settings]}

1. [Создайте](/ru/networks/dns/instructions/publicdns/records#add) A-запись в подзоне `test.example.com`, указав параметры:

   - **Тип записи**: `A`.
   - **Имя**: `app`.
   - **IP-адрес**: IP-адрес тестового сервера.
   - **ТТL**: оставьте по умолчанию или настройте по необходимости.

1. Создайте CNAME-запись в подзоне `test.example.com`, указав параметры:

   - **Тип записи**: `CNAME`.
   - **Имя**: `api`.
   - **Значение**: домен тестовых сервисов.
   - **ТТL**: оставьте по умолчанию или настройте по необходимости.

1. (Опционально) Создайте в подзоне `test.example.com` [другие ресурсные записи](/ru/networks/dns/instructions/publicdns/records#dobavlenie_resursnyh_zapisey), которые понадобятся для работы в тестовой среде. Например, с помощью записей MX и TXT можно определить тестовые почтовые серверы и их настройки.

Пример ресурсных записей в подзоне `test.example.com` после настройки DNS для тестовой среды:

```console
app   A   192.168.1.10
api   CNAME   app.test.example.com
```

В примере указан частный IP-адрес. Если ваш сервер доступен из интернета, используйте публичный IP.

## {heading(4. Настройте DNS для production-среды)[id=prod_env_settings]}

1. [Создайте](/ru/networks/dns/instructions/publicdns/records#add) A-запись в DNS-зоне `example.com`, указав параметры:

   - **Тип записи**: `A`.
   - **Имя**: `app`.
   - **IP-адрес**: IP-адрес production-сервера.
   - **ТТL**: оставьте по умолчанию или настройте по необходимости.

1. Создайте CNAME-запись в DNS-зоне `example.com`, указав параметры:

   - **Тип записи**: `CNAME`.
   - **Имя**: `api`.
   - **Значение**: домен production-сервисов.
   - **ТТL**: оставьте по умолчанию или настройте по необходимости.

1. (Опционально) Создайте в DNS-зоне `example.com` [другие ресурсные записи](/ru/networks/dns/instructions/publicdns/records#dobavlenie_resursnyh_zapisey), которые понадобятся для работы в production-среде. Например, с помощью записей MX и TXT можно определить почтовые серверы и их настройки.

1. [Удалите](/ru/networks/dns/instructions/publicdns/records#udalenie_resursnyh_zapisey) в зоне `example.com` ресурсные записи для тестовой среды, если они в ней есть.

Пример ресурсных записей в DNS-зоне `example.com` после настройки DNS для production-среды:

```console
app   A   83.166.234.101
api   CNAME   app.example.com
```

## {heading(5. Проверьте настройки DNS)[id=check]}

1. Проверьте разрешение имен для тестовой среды:

   {tabs}

   {tab(dig)}

   ```console
   $ dig app.test.example.com +short
   ```

   {/tab}

   {tab(nslookup)}

   ```console
   nslookup -type=A app.test.example.com
   ```

   {/tab}

   {/tabs}

   В ответе вернется IP-адрес, который вы настроили в подзоне `test.example.com`. В этом примере: `192.168.1.10`.

1. Проверьте разрешение имен для production-среды:

   {tabs}

   {tab(dig)}

   ```console
   $ dig app.example.com +short
   ```

   {/tab}

   {tab(nslookup)}

   ```console
   nslookup -type=A app.example.com
   ```

   {/tab}

   {/tabs}

   В ответе вернется IP-адрес, который вы настроили в DNS-зоне `example.com`. В этом примере: `83.166.234.101`.

1. Проверьте делегирование подзоны:

   {tabs}

   {tab(dig)}

   ```console
   $ dig NS test.example.com +short
   ```

   {/tab}

   {tab(nslookup)}

   ```console
   nslookup -type=ns test.example.com
   ```

   {/tab}

   {/tabs}

   В ответе вернутся адреса NS-серверов для зоны `example.com`, которые можно [посмотреть](/ru/networks/dns/instructions/publicdns/records#prosmotr_spiska_resursnyh_zapisey) в списке ресурсных записей. В этом примере: `ns1.mcs.mail.ru` и `ns2.mcs.mail.ru`.

## {heading(Удалите неиспользуемые ресурсы)[id=delete]}

Если добавленные ресурсы вам больше не нужны, удалите их:

1. [Удалите](/ru/networks/dns/instructions/publicdns/dns-zone#delete) подзону `test.example.com`.
1. [Удалите](/ru/networks/dns/instructions/publicdns/records#udalenie_resursnyh_zapisey) ненужные NS-записи в DNS-зоне `example.com`.