<warn>

Убедитесь, что вы [установили и сконфигурировали Terraform](../../../quick-start).

</warn>

Чтобы создать балансировщик нагрузки, создайте файл `lb.tf`, где будет описана конфигурация создаваемого балансировщика нагрузки. Добавьте текст из примера ниже и исправьте значения настроек для вашего балансировщика нагрузки. В примере описывается настройка балансировщика нагрузки для двух ВМ, трафик на которых будет распределяться создаваемым балансировщиком нагрузки методом `ROUND_ROBIN`.

## Создание сети

Чтобы создать сеть для балансировщика нагрузки потребуются следующие объекты:

- Ресурсы (resource):

  - `vkcs_networking_network`: сеть, в которой будет создана ВМ. В примере ниже создается сеть с именем `lb`.
  - `vkcs_networking_subnet`: подсеть из сети. В примере: `lb`.

```hcl
resource "vkcs_networking_network" "lb" {
  name = "network"
}

resource "vkcs_networking_subnet" "lb" {
  name = "subnet"
  cidr = "192.168.199.0/24"
  network_id = "${vkcs_networking_network.lb.id}"
}
```

## Создание балансировщика нагрузки

Чтобы создать балансировщик нагрузки потребуются следующие объекты:

- Источники данных (data source):

  - `vkcs_images_image`: установочный образ для создаваемого инстанса.
  - `vkcs_compute_flavor`: флейвор (CPU, RAM, Disk) ВМ. Можно посмотреть в мастере создания ВМ в личном кабинете VK Cloud.

- Ресурсы (resource):

  - `vkcs_compute_instance`: управляет ресурсом экземпляра виртуальной машины. Трафик на этих ВМ будет распределяться создаваемым балансировщиком нагрузки.

    <warn>

    Все аргументы, включая пароль администратора экземпляра, будут сохранены в исходном состоянии в виде обычного текста. Подробнее о [конфиденциальных данных](https://www.terraform.io/docs/language/state/sensitive-data.html?_ga=2.74378194.1320188012.1657572463-152934297.1633441142).

    </warn>

    Содержит следующие ресурсы:

    - `name`: имя ВМ.
    - `flavor_id`: флейвор ВМ, используемый при ее создании.
    - `security_groups`: перечень имен групп безопасности, приписанных этой ВМ.
    - `image_id`: образ ОС, используемый при создании этой ВМ.
    - `network`: сеть, подключаемая при создании ВМ.
    - `depends_on`: ВМ запустится после создания указанных ресурсов.

  - `vkcs_lb_loadbalance`: управляет ресурсом балансировщика нагрузки в VK Cloud. Включает в себя следующие ресурсы:

    - `name`: удобочитаемое имя для балансировщика нагрузки. Не обязано быть уникальным.
    - `vip_subnet_id`: подсеть, в которой будет выделен адрес для балансировщика нагрузки. Вы можете создавать балансировщики нагрузки только в сетях, разрешенных политикой (например, в сетях, которые принадлежат вам, или в сетях, которые являются общими). Изменение этого параметра создает новый балансировщик нагрузки.
    - `availability_zone`: [зона доступности](/ru/intro/start/concepts/architecture#zony_dostupnosti_d9f6db93), в которой будет размещен балансировщик. Для оптимизации и ускорения подключения ВМ к балансировщику размещайте их в одной зоне доступности. Список зон доступности можно посмотреть в личном кабинете или через [OpenStack CLI](/ru/tools-for-using-services/cli/openstack-cli#primery_komand_openstack_cli).

    - `tags`: список простых строк, назначенных балансировщику нагрузки.

  - `vkcs_lb_listener`: управляет ресурсом прослушивателя в VK Cloud. Включает в себя следующие ресурсы:

    - `name`: удобочитаемое имя для прослушивателя. Не обязано быть уникальным.
    - `protocol`: протокол может быть `TCP`, `HTTP`, `HTTPS`, `TERMINATED_HTTPS`, `UDP`. Изменение этого параметра создает нового прослушивателя.
    - `protocol_port`: порт, на котором прослушивается клиентский трафик. Изменение этого параметра создает нового прослушивателя.
    - `loadbalancer_id`: балансировщик нагрузки, на котором должен быть предоставлен этот прослушиватель. Изменение этого параметра создает нового прослушивателя.

  - `vkcs_lb_pool`: управляет ресурсом пула в VK Cloud. Включает в себя следующие ресурсы:

    - `name`: удобочитаемое имя пула.
    - `protocol`: протокол может быть `TCP`, `HTTP`, `HTTPS`, `PROXY` или `UDP`. Изменение этого параметра создает новый пул.
    - `lb_method`: алгоритм балансировки нагрузки для распределения трафика между участниками пула. Должен быть один из `ROUND_ROBIN`, `LEAST_CONNECTIONS`, `SOURCE_IP` или `SOURCE_IP_PORT`.
    - `listener_id`: прослушиватель, с которым будут связаны члены пула. Изменение этого параметра создает новый пул. Примечание: Необходимо указать один из идентификаторов: или `loadbalancer_id`, или `listener_id`.

  - `vkcs_lb_member`: управляет ресурсом участника в VK Cloud. Включает в себя следующие ресурсы:

    - `address`: IP-адрес участника для получения трафика от балансировщика нагрузки. Изменение этого параметра создает нового участника.
    - `protocol_port`: порт, на котором прослушивается клиентский трафик. Изменение этого параметра создает нового участника.
    - `pool_id`: идентификатор пула, которому будет назначен этот участник. Изменение этого параметра создает нового участника.
    - `subnet_id`: подсеть, в которой можно получить доступ к члену. Изменение этого параметра создает нового участника.
    - `weight`: положительное целое значение, указывающее относительную часть трафика, которую этот участник должен получать из пула. Например, участник с весом 10 получает в пять раз больше трафика, чем участник с весом 2. По умолчанию используется значение 1.

```hcl

data "vkcs_images_image" "compute" {
   name = "Ubuntu-18.04-STD3"
}

data "vkcs_compute_flavor" "compute" {
  name = "STD2-2-4"
}

resource "vkcs_compute_instance" "compute_1" {
  name            = "compute-instance-1"
  flavor_id       = data.vkcs_compute_flavor.compute.id
  security_groups = ["default"]
  image_id = data.vkcs_images_image.compute.id

  network {
    uuid = vkcs_networking_network.lb.id
    fixed_ip_v4 = "192.168.199.110"
  }

  depends_on = [
    vkcs_networking_network.lb,
    vkcs_networking_subnet.lb
  ]
}

resource "vkcs_compute_instance" "compute_2" {
  name            = "compute-instance-2"
  flavor_id       = data.vkcs_compute_flavor.compute.id
  security_groups = ["default"]
  image_id = data.vkcs_images_image.compute.id

  network {
    uuid = vkcs_networking_network.lb.id
    fixed_ip_v4 = "192.168.199.111"
  }

  depends_on = [
    vkcs_networking_network.lb,
    vkcs_networking_subnet.lb
  ]
}

resource "vkcs_lb_loadbalancer" "loadbalancer" {
  name = "loadbalancer"
  vip_subnet_id = "${vkcs_networking_subnet.lb.id}"
  availability_zone = "GZ1"
  tags = ["tag1"]
}

resource "vkcs_lb_listener" "listener" {
  name = "listener"
  protocol = "HTTP"
  protocol_port = 8080
  loadbalancer_id = "${vkcs_lb_loadbalancer.loadbalancer.id}"
}

resource "vkcs_lb_pool" "pool" {
  name = "pool"
  protocol = "HTTP"
  lb_method = "ROUND_ROBIN"
  listener_id = "${vkcs_lb_listener.listener.id}"
}

resource "vkcs_lb_member" "member_1" {
  address = "192.168.199.110"
  protocol_port = 8080
  pool_id = "${vkcs_lb_pool.pool.id}"
  subnet_id = "${vkcs_networking_subnet.lb.id}"
  weight = 0
}

resource "vkcs_lb_member" "member_2" {
  address = "192.168.199.111"
  protocol_port = 8080
  pool_id = "${vkcs_lb_pool.pool.id}"
  subnet_id = "${vkcs_networking_subnet.lb.id}"
}
```

## Применение изменений

Добавьте обе части примера в файл `lb.tf` и выполните следующие команды:

```bash
terraform init
```
```bash
terraform apply
```
