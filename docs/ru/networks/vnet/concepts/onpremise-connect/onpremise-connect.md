VK Cloud позволяет настроить разные варианты подключения к удаленной инфраструктуре, используя VPN-туннель. Выбор варианта подключения зависит от следующих факторов:

- [тип SDN](../sdn) проекта;
- наличие доступа к интернету из удаленной инфраструктуры;
- требования к отказоустойчивости соединения.

[cols="1,3,2", options="header"]
|===
|Подключение
|Описание
|Ограничения

|[Через стандартный маршрутизатор](../../how-to-guides/onpremise-connect/vpn-tunnel)
|Удаленная инфраструктура подключается к VK Cloud через VPN-туннель на базе [стандартного маршрутизатора](../../concepts/router#standard). Этот вариант подходит для простых сценариев: связь между облаком и небольшой удаленной сетью
| 
* Только в SDN Neutron.
* Нет поддержки BGP-маршрутизации и Direct Connect

|[Через Cloud Direct Connect](../../how-to-guides/onpremise-connect/dc-advanced-router)
|Удаленная инфраструктура подключается к VK Cloud через сеть Cloud Direct Connect по протоколу BGP. VPN-туннель создается на основе [продвинутого маршрутизатора](../../concepts/router#advanced), к которому подключается сеть с инфраструктурой проекта в облаке. Удаленная инфраструктура может не иметь доступа в интернет.

Этот вариант используется для размещения в облаке приложения, не требующего отказоустойчивой сетевой связности, а также для доступа в интернет из закрытой инфраструктуры Оn-premises
| 
* Только в SDN Sprut.
* Не обеспечивает доступ к Floating IP-адресам и PaaS-сервисам из удаленной сети

|[Через Cloud Direct Connect и стандартный маршрутизатор](/ru/networks/directconnect/how-to-guides/dc-standard-router)
|Удаленная инфраструктура подключается к VK Cloud через сеть Cloud Direct Connect по протоколу BGP. VPN-туннель создается на основе продвинутого маршрутизатора. Облачная инфраструктура проекта расположена в сети, подключенной к стандартному маршрутизатору, который связан с продвинутым статическими маршрутами. Удаленная инфраструктура может не иметь доступа в интернет.

Этот вариант позволяет подключить инфраструктуру Оn-premises к уже существующему проекту VK Cloud, а также к проектам с IP-адресами Floating и PaaS-сервисами
|Только в SDN Sprut

|**Отказоустойчивое подключение через два канала Direct Connect**
|Удаленная инфраструктура подключается к VK Cloud по протоколу BGP через два независимых канала связи Cloud Direct Connect, проложенных до двух разных зон доступности. Продвинутый маршрутизатор подключается к обоим каналам и к стандартному маршрутизатору, который направляет трафик до объектов внутри проекта в VK Cloud. Удаленная инфраструктура может не иметь доступа в интернет.

Этот вариант обеспечивает отказоустойчивую сетевую связность удаленной инфраструктуры и проекта в VK Cloud с минимальным временем простоя при переключении между каналами связи
|Только в SDN Sprut

|**Отказоустойчивое подключение через два канала Direct Connect и VRRP**
|Удаленная инфраструктура подключается к VK Cloud по протоколу BGP через два независимых канала связи Cloud Direct Connect, проложенных до двух разных зон доступности. К каждому из каналов связи подключаются отдельные продвинутые маршрутизаторы, связанные со стандартным маршрутизатором проекта через VRRP (виртуальный IP-адрес). Удаленная инфраструктура может не иметь доступа в интернет.

Этот вариант обеспечивает бесшовную отказоустойчивую сетевую связность удаленной инфраструктуры с проектом в VK Cloud
|Только в SDN Sprut

|**Через IPsec и продвинутый маршрутизатор**
|Удаленная инфраструктура подключается к VK Cloud через VPN по протоколу IPsec. VPN-туннель создается на основе продвинутого маршрутизатора, к которому подключается сеть с инфраструктурой проекта в облаке. Удаленная инфраструктура должна иметь доступ в интернет.

Этот вариант обеспечивает защищенный доступ от инфраструктуры Оn-premises к VK Cloud без технологии Cloud Direct Connect.
|
* Только в SDN Sprut.
* Не может использоваться для подключения к Floating IP-адресам и PaaS-сервисам.
* Требуется доступ в интернет из инфраструктуры Оn-premises

|**Через IPsec, продвинутый и стандартный маршрутизатор**

|Удаленная инфраструктура подключается к VK Cloud через VPN по протоколу IPsec. VPN-туннель создается на основе продвинутого маршрутизатора. Облачная инфраструктура проекта расположена в сети, подключенной к стандартному маршрутизатору, который связан с продвинутым статическими маршрутами. Удаленная инфраструктура должна иметь доступ в интернет.

Этот вариант позволяет подключить инфраструктуру Оn-premises к уже существующему проекту VK Cloud, а также к проектам с Floating IP-адресами и PaaS-сервисами, без технологии Cloud Direct Connect
|
* Только в SDN Sprut.
* Требуется доступ в интернет из инфраструктуры Оn-premises
|===
