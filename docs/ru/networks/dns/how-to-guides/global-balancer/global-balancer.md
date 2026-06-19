# {heading(Балансировка между распределенными площадками)[id=dns-global-balancer]}

{var(cloud)} позволяет создавать отказоустойчивые приложения за счет геораспределенной архитектуры с использованием нескольких бэкенд-серверов, размещенных в разных дата-центрах ({linkto(../../../../start/concepts/architecture#architecture-az)[text=зонах доступности]}). В случае аварии в одной из зон доступности, инфраструктура автоматически перенаправляет трафик на работоспособные серверы в других дата-центрах, минимизируя простои.

Для реализации этой модели применяется механизм балансировки нагрузки на уровне DNS, который выполняет регулярные проверки доступности серверов и перенаправляет запросы к резервным серверам.

В этом примере три ВМ в разных зонах доступности будут объединены через группы балансировки сервиса DNS.

## {heading(Подготовительные шаги)[id=dns-global-balancer-prep]}

1. Получите доступ к {linkto(../../../../networks/dns/concepts/global-balancer#dns-global-balancer)[text=DNS-балансировке]}, обратившись в [техническую поддержку](/ru/contacts), если этого не было сделано ранее.
1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет {var(cloud)}.
1. Выберите или {linkto(../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=создайте]} три ВМ с доступом в интернет в разных {linkto(../../../../start/concepts/architecture#architecture-az)[text=зонах доступности]}.
1. Запишите внешние IP-адреса этих ВМ. В этом примере:

   - `83.166.234.101`;
   - `109.120.188.102`;
   - `217.16.23.103`.

1. Для созданных ВМ {linkto(../../../../networks/vnet/instructions/secgroups#vnet-secgroups)[text=разрешите]} входящий трафик с IP-адреса `169.254.169.100/32` на заданный порт. Это технический адрес {var(cloud)} для проверки доступности сервиса. Если правило группы безопасности ограничит доступ к порту ВМ с этого адреса, DNS-балансировка отметит ВМ как недоступную и не будет отправлять трафик на нее.
1. {linkto(../../../../networks/dns/instructions/publicdns/dns-zone#dns-dns-zone-add)[text=Создайте]} DNS-зону. В этом примере `example.dns.com`.
1. Зарегистрируйте ваш домен у доменного регистратора и делегируйте его на NS-серверы {var(cloud)}, если этого еще не сделано. Дождитесь обновления DNS-записей: обычно занимает 10–30 минут.
1. Установите утилиту `dig` на ваш компьютер для проверки работы DNS-балансировки:

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
   Вы можете использовать аналоги утилиты `dig` для проверки DNS-балансировки. Команды проверки при этом будут отличаться.
   {/note}

## {heading(1. Добавьте A-записи в DNS-зону)[id=dns-global-balancer-a-records]}

В DNS-зоне {linkto(../../../../networks/dns/instructions/publicdns/records#dns-records-add)[text=создайте]} A-записи, соответствующие внешнему IP-адресу каждой добавленной ВМ.

## {heading(2. Создайте группу балансировки)[id=dns-global-balancer-group]}

1. Для DNS-зоны {linkto(../../../../networks/dns/instructions/publicdns/global-balancer#dns-global-balancer-add)[text=создайте]} группу балансировки с типом балансировки `Round Robin`.
1. В группу балансировки добавьте все A-записи, доступные в DNS-зоне:

   - для каждой записи выберите тип мониторинга `ICMP`;
   - остальные параметры оставьте по умолчанию.

## {heading(3. Проверьте работу DNS-балансировки)[id=dns-global-balancer-check]}

1. На компьютере выполните команду:

   {tabs}

   {tab(dig)}

   ```console
   for i in {1..100}; do dig www.example.dns.com  A @ns4.msc.mail.ru +short; done | sort | uniq -c
   ```

   {/tab}

   {tab(nslookup)}

   ```console
   for i in {1..100}; do 
       nslookup -type=A www.example.dns.com ns4.msc.mail.ru | grep -A1 "Name:" | tail -1
   done | sort | uniq -c
   ```

   {/tab}

   {/tabs}

   Ожидаемый ответ:

   ```bash
   33 83.166.234.101
   34 109.120.188.102
   33 217.16.23.103
   ```

   Здесь в начале строки указывается количество запросов, которые DNS-балансировка отправила к каждому серверу. Ответ показывает, что балансировка работает и пересылает запросы примерно по ровну между всеми доступными серверами (зонами доступности).

1. В личном кабинете {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=остановите]} две из трех ВМ. Это имитирует отказ сервера или недоступность дата-центра.
1. На компьютере повторите команду:

   {tabs}

   {tab(dig)}

   ```console
   for i in {1..100}; do dig www.example.dns.com  A @ns4.msc.mail.ru +short; done | sort | uniq -c
   ```

   {/tab}

   {tab(nslookup)}

   ```console
   for i in {1..100}; do 
       nslookup -type=A www.example.dns.com ns4.msc.mail.ru | grep -A1 "Name:" | tail -1
   done | sort | uniq -c
   ```

   {/tab}

   {/tabs}

   Ожидаемый ответ:

   ```bash
   100 217.16.23.103
   ```

   Здесь ответ позывает, что DNS-балансировка отправляет все запросы на один сервер (зону доступности), потому что два других сервера недоступны.

## {heading(Удалите неиспользуемые ресурсы)[id=dns-global-balancer-delete-source]}

Если добавленные ресурсы вам больше не нужны, удалите их:

1. {linkto(../../../../networks/dns/instructions/publicdns/global-balancer#dns-global-balancer-delete)[text=Удалите]} группу балансировки.
1. {linkto(../../../../networks/dns/instructions/publicdns/dns-zone#dns-dns-zone-delete)[text=Удалите]} DNS-зону.
1. {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete)[text=Удалите]} ВМ.