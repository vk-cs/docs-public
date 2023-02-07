<warn>

Прежде всего убедитесь, что вы [установили Terraform](../../quick-start) и [создали файл main.tf](../../quick-start/configuration) с необходимыми провайдерами.

</warn>

Чтобы создать балансировщик нагрузки, создайте файл `lb.tf`, где будет описана конфигурация создаваемого балансировщика нагрузки. Добавьте текст из примеров ниже, и исправьте значения настроек для вашего балансировщика нагрузки. В данном примере описывается настройка Load Balancer для двух ВМ, траффик на которых будет распределяться создаваемым балансировщиком нагрузки методом ROUND_ROBIN.

### Создание сети

Для создания сети для балансировщика нагрузки потребуются следующие объекты:

- Ресурсы (resource):

  - **vkcs_networking_network** — сеть, в которой будет создана ВМ. В примере ниже сеть создается с именем «lb».
  - **vkcs_networking_subnet** — подсеть из сети. В примере: `lb`.

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

### Создание балансировщика нагрузки

Для создания Load Balancer вам потребуются следующие объекты:

- Источники данных (data source):

  - **vkcs_images_image** — установочный образ для создаваемого инстанса.
  - **vkcs_compute_flavor** – флейвор (CPU, RAM, Disk) ВМ. Можно посмотреть в визарде создания ВМ через личный кабинет.

- Ресурсы (resource):

  - **vkcs_compute_instance** — Управляет ресурсом экземпляра вычислительной виртуальной машины. Траффик на этих ВМ будет распределяться создаваемым балансировщиком нагрузки.

    <warn>

    **Внимание**

    Все аргументы, включая пароль администратора экземпляра, будут сохранены в исходном состоянии в виде обычного текста. Подробнее о [конфиденциальных данных](https://www.terraform.io/docs/language/state/sensitive-data.html?_ga=2.74378194.1320188012.1657572463-152934297.1633441142).

    </warn>

    Содержит следующие ресурсы:

    - **name** — имя ВМ.
    - **flavor_id** — флейвор ВМ, используемый при создании.
    - **security_groups** — перечень имен security group, приписанных этой ВМ.
    - **image_id** — образ ОС, используемый при создании этой ВМ.
    - **network** — сеть, подключаемая при создании ВМ.
    - **depends_on** — ВМ не запустится прежде чем не будет выполнено создание указанных ресурсов.

  - **vkcs_lb_loadbalancer** — Управляет ресурсом балансировщика нагрузки в VKCS. Включает в себя следующие ресурсы:

    - **name** — Удобочитаемое имя для балансировщика нагрузки. Не обязательно быть уникальным.
    - **vip_subnet_id** — Подсеть, в которой будет выделен адрес балансировщика нагрузки. Клиент может создавать балансировщики нагрузки только в сетях, разрешенных политикой (например, в сетях, которые принадлежат ему, или в сетях, которые являются общими). Изменение этого параметра создает новый балансировщик нагрузки.
    - **tags** — Список простых strings, назначенных балансировщику нагрузки.

  - **vkcs_lb_listener** — Управляет ресурсом прослушивателя в VKCS. Включает в себя следующие ресурсы:

    - **name** — Удобочитаемое имя для Слушателя. Не обязательно быть уникальным.
    - **protocol** — Протокол - может быть TCP, HTTP, HTTPS, TERMINATED_HTTPS, UDP. Изменение этого параметра создает нового слушателя.
    - **protocol_port** — Порт, на котором прослушивается клиентский трафик. Изменение этого параметра создает нового слушателя.
    - **loadbalancer_id** — Балансировщик нагрузки, на котором должен быть предоставлен этот прослушиватель. Изменение этого параметра создает нового слушателя.

  - **vkcs_lb_pool** — Управляет ресурсом пула в VK Cloud. Включает в себя следующие ресурсы:

    - **name** — Удобочитаемое имя пула.
    - **protocol** — Протокол - может быть TCP, HTTP, HTTPS, PROXY или UDP. Изменение этого параметра создает новый пул.
    - **lb_method** — Алгоритм балансировки нагрузки для распределения трафика между участниками пула. Должен быть один из ROUND_ROBIN, LEAST_CONNECTIONS, SOURCE_IP или SOURCE_IP_PORT.
    - **listener_id** — Прослушиватель, с которым будут связаны члены пула. Изменение этого параметра создает новый пул. Примечание: Необходимо указать один из идентификаторов LoadbalancerID или ListenerID.

  - **vkcs_lb_member** — Управляет ресурсом участника в VKCS. Включает в себя следующие ресурсы:

    - **address** — IP-адрес участника для получения трафика от балансировщика нагрузки. Изменение этого параметра создает нового участника.
    - **protocol_port** — Порт, на котором прослушивается клиентский трафик. Изменение этого параметра создает нового участника.
    - **pool_id** — Идентификатор пула, которому будет назначен этот участник. Изменение этого параметра создает нового участника.
    - **subnet_id** — Подсеть, в которой можно получить доступ к члену. Изменение этого параметра создает нового участника.
    - **weight** — Положительное целое значение, указывающее относительную часть трафика, которую этот участник должен получать из пула. Например, участник с весом 10 получает в пять раз больше трафика, чем участник с весом 2. По умолчанию используется значение 1.

```hcl

data "vkcs_images_image" "compute" {
   name = "Ubuntu-18.04-Standard"
}

data "vkcs_compute_flavor" "compute" {
  name = "Basic-1-2-20"
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

### Применение изменений

Добавьте обе части примера в файл `lb.tf` и выполните следующие команды:

```bash
terraform init
```
```bash
terraform apply
```
