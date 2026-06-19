# {heading(VPN)[id=vnet-vpn]}

VPN (виртуальная частная сеть) — технология, которая позволяет обеспечить одно или несколько защищенных сетевых соединений поверх других сетей.

В зависимости от применяемых протоколов VPN может:

- соединять разные типы конечных точек (узел-узел, узел-сеть, сеть-сеть);
- иметь разный уровень защищенности данных;
- использоваться для разных целей (доступ пользователя к корпоративным сетям, объединение удаленных сетей в одну инфраструктуру и т.д.).

В {var(cloud)} сервис VPN (VPNaaS) позволяет создать защищенный туннель связи между одной или несколькими подсетями {var(cloud)} и подсетями удаленной инфраструктуры клиента (on-premises) для решения следующих задач:

- Подключить сеть компании к сети {var(cloud)}, чтобы иметь доступ к облачной инфраструктуре.
- Организовать защищенный канал для управления инфраструктурой {var(cloud)} (например, для использования telnet совместно с виртуальными машинами).

Сервис VPN в {var(cloud)} реализован на базе [StrongSwan](https://www.strongswan.org) с использованием стека IPsec и IKEv1, IKEv2. Поддерживаются следующие параметры:

- Режимы работы: IKEv1, IKEv2 (рекомендуется).
- Аутентификация: Pre-Shared Key (PSK).
- Группы Диффи-Хеллмана: modp1024 (Group 2), modp1536 (Group 5), modp2048 (Group 14).
- Алгоритмы шифрования: AES-128, AES-192, AES-256, 3DES.
- Хэширование: SHA1, SHA256.
- Время жизни SA: 3600 секунд (по умолчанию).

VPN-сервис доступен в обеих {linkto(../../../../networks/vnet/concepts/sdn#vnet-sdn)[text=SDN]} (Software Defined Network), используемых в {var(cloud)}:

- SDN Neutron: VPN можно подключить только к {linkto(../../../../networks/vnet/concepts/router#vnet-router-standard)[text=стандартному маршрутизатору]}.
- SDN Sprut: VPN можно подключить только к {linkto(../../../../networks/vnet/concepts/router#vnet-router-advanced)[text=продвинутому маршрутизатору]}.

В SDN Sprut между облаком и удаленной инфраструктурой можно построить VPN поверх интернет-соединения или поверх [Direct Connect](../../../../networks/directconnect). VPN поверх Direct Connect не требует доступа в интернет из удаленной инфраструктуры и обеспечивает наиболее стабильную связь.

Подробнее о настройке VPN:

- {linkto(../../../../networks/vnet/instructions/vpn#vnet-vpn)[text=Управление VPN-туннелями в SDN Sprut и SDN Neutron]}.
- {linkto(../../../../networks/vnet/how-to-guides/onpremise-connect/dc-advanced-router#vnet-dc-advanced-router)[text=Пример создания VPN-туннеля в SDN Sprut]}.
- {linkto(../../../../networks/vnet/how-to-guides/onpremise-connect/vpn-tunnel#vnet-vpn-tunnel)[text=Пример создания VPN-туннеля в SDN Neutron]}.