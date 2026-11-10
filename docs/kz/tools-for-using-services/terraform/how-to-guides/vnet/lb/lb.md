# {heading(Жүктеуді тепе-теңдестіргіштерді жасау және баптау)[id=terraform-lb]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{note:warn}
{Terraform-ды} {linkto(../../../quick-start#terraform-quick-start)[text=орнатқан және баптағаныңызға]} көз жеткізіңіз.
{/note}

Жүктеуді тепе-теңдестіргішті жасау үшін, жасалатын жүктеуді тепе-теңдестіргіштің конфигурациясы сипатталатын `lb.tf` файлын жасаңыз. Төмендегі мысалдағы мәтінді қосыңыз және сіздің жүктеуді тепе-теңдестіргішіңіздің баптауларының мәндерін түзетіңіз. Мысалда `ROUND_ROBIN` әдісімен жасалатын жүктеуді тепе-теңдестіргіш трафикті бөлетін екі ВМ үшін жүктеуді тепе-теңдестіргішті баптау сипатталған.

Параметрлердің толық сипаттамасы — [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## {heading(Желіні жасау)[id=terraform-lb-net]}

Жүктеуді тепе-теңдестіргіш үшін желі жасау үшін келесі нысандар қажет:

- Ресурстар (resource):

  - `vkcs_networking_network`: ВМ жасалатын желі. Төмендегі мысалда `lb` атауымен желі жасалады.
  - `vkcs_networking_subnet`: желідегі ішкі желі. Мысалда: `lb`.

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

## {heading(Жүктеуді тепе-теңдестіргішті жасау)[id=terraform-lb-create]}

Жүктеуді тепе-теңдестіргішті жасау үшін келесі нысандар қажет:

- Деректер көздері (data source):

  - `vkcs_images_image`: жасалатын инстанс үшін орнату бейнесі.
  - `vkcs_compute_flavor`: ВМ-ның флейворы (CPU, RAM, Disk). {var(cloud)} жеке кабинетіндегі ВМ жасау шеберінен көруге болады.

- Ресурстар (resource):

  - `vkcs_compute_instance`: виртуалды машиналық инстанс ресурсын басқарады. Осы ВМ-ларға трафик жасалатын жүктеуді тепе-теңдестіргіш арқылы бөлінеді.

    {note:warn}
    Инстанстың әкімші паролі қоса алғанда, барлық аргументтер қарапайым мәтін түріндегі бастапқы күйде сақталады. [Құпия деректер](https://www.terraform.io/docs/language/state/sensitive-data.html?_ga=2.74378194.1320188012.1657572463-152934297.1633441142) туралы толығырақ.
    {/note}

    Келесі ресурстарды қамтиды:

    - `name`: ВМ атауы.
    - `flavor_id`: ВМ жасау кезінде қолданылатын ВМ флейворы.
    - `security_groups`: осы ВМ-ға тағайындалған қауіпсіздік топтарының атауларының тізімі.
    - `image_id`: осы ВМ жасау кезінде қолданылатын ОС бейнесі.
    - `network`: ВМ жасау кезінде қосылатын желі.
    - `depends_on`: ВМ көрсетілген ресурстар жасалғаннан кейін іске қосылады.

  - `vkcs_lb_loadbalance`: {var(cloud)} жүйесіндегі жүктеуді тепе-теңдестіргіш ресурсын басқарады. Келесі ресурстарды қамтиды:

    - `name`: жүктеуді тепе-теңдестіргіш үшін оқуға ыңғайлы атау. Бірегей болуы міндетті емес.
    - `vip_subnet_id`: жүктеуді тепе-теңдестіргіш үшін адрес бөлінетін ішкі желі. Жүктеуді тепе-теңдестіргіштерді тек саясатпен рұқсат етілген желілерде (мысалы, сізге тиесілі желілерде немесе ортақ желілерде) жасауға болады. Бұл параметрді өзгерту жаңа жүктеуді тепе-теңдестіргішті жасайды.
    - `availability_zone`: тепе-теңдестіргіш орналастырылатын [қолжетімділік аймағы](../../../../../start/concepts/architecture#architecture-az). ВМ-лардың тепе-теңдестіргішке қосылуын оңтайландыру және жеделдету үшін оларды бір қолжетімділік аймағында орналастырыңыз. Қолжетімділік аймақтарының тізімін жеке кабинеттен немесе {linkto(../../../../cli/openstack-cli#tools-cli-openstack)[text=OpenStack CLI]} арқылы көруге болады.

    - `tags`: жүктеуді тепе-теңдестіргішке тағайындалған қарапайым жолдардың тізімі.

  - `vkcs_lb_listener`: {var(cloud)} жүйесіндегі тыңдаушы (listener) ресурсын басқарады. Келесі ресурстарды қамтиды:

    - `name`: тыңдаушы үшін оқуға ыңғайлы атау. Бірегей болуы міндетті емес.
    - `protocol`: протокол `TCP`, `HTTP`, `HTTPS`, `TERMINATED_HTTPS`, `UDP` болуы мүмкін. Бұл параметрді өзгерту жаңа тыңдаушыны жасайды.
    - `protocol_port`: клиенттік трафик тыңдалатын порт. Бұл параметрді өзгерту жаңа тыңдаушыны жасайды.
    - `loadbalancer_id`: бұл тыңдаушы ұсынылуы тиіс жүктеуді тепе-теңдестіргіш. Бұл параметрді өзгерту жаңа тыңдаушыны жасайды.

  - `vkcs_lb_pool`: {var(cloud)} жүйесіндегі пул ресурсын басқарады. Келесі ресурстарды қамтиды:

    - `name`: пулдың оқуға ыңғайлы атауы.
    - `protocol`: протокол `TCP`, `HTTP`, `HTTPS`, `PROXY` немесе `UDP` болуы мүмкін. Бұл параметрді өзгерту жаңа пулды жасайды.
    - `lb_method`: пул мүшелері арасында трафикті бөлу үшін жүктемені тепе-теңдестіру алгоритмі. `ROUND_ROBIN`, `LEAST_CONNECTIONS`, `SOURCE_IP` немесе `SOURCE_IP_PORT`-тың бірі болуы тиіс.
    - `listener_id`: пул мүшелері байланыстырылатын тыңдаушы. Бұл параметрді өзгерту жаңа пулды жасайды. Ескерту: идентификаторлардың бірін көрсету қажет: немесе `loadbalancer_id`, немесе `listener_id`.

  - `vkcs_lb_member`: {var(cloud)} жүйесіндегі мүше ресурсын басқарады. Келесі ресурстарды қамтиды:

    - `address`: жүктеуді тепе-теңдестіргіштен трафик алу үшін мүшенің IP-адресі. Бұл параметрді өзгерту жаңа мүшені жасайды.
    - `protocol_port`: клиенттік трафик тыңдалатын порт. Бұл параметрді өзгерту жаңа мүшені жасайды.
    - `pool_id`: бұл мүше тағайындалатын пулдың идентификаторы. Бұл параметрді өзгерту жаңа мүшені жасайды.
    - `subnet_id`: мүшеге қол жеткізуге болатын ішкі желі. Бұл параметрді өзгерту жаңа мүшені жасайды.
    - `weight`: бұл мүшенің пулдан алуы тиіс салыстырмалы трафик бөлігін көрсететін оң бүтін мән. Мысалы, салмағы 10 болатын мүше салмағы 2 болатын мүшеден бес есе көп трафик алады. Әдепкі мәні — 1.

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
  availability_zone = "ME1"
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

## {heading(Өзгерістерді қолдану)[id=terraform-lb-apply]}

Мысалдың екі бөлімін де `lb.tf` файлына қосыңыз және келесі командаларды орындаңыз:

```console
terraform init
```

```console
terraform apply
```