{include(/kz/_includes/_translated_by_ai.md)}

{note:warn}

[Terraform-ды орнатып, баптағаныңызға](../../../quick-start) көз жеткізіңіз.

{/note}

Жүктеме теңгергішін жасау үшін жасалатын жүктеме теңгергішінің конфигурациясы сипатталатын `lb.tf` файлын жасаңыз. Төмендегі мысалдан мәтінді қосып, жүктеме теңгергішіңіз үшін баптау мәндерін түзетіңіз. Мысалда `ROUND_ROBIN` әдісімен жасалатын жүктеме теңгергіші арқылы трафик бөлінетін екі ВМ үшін жүктеме теңгергішін баптау сипатталған.

Параметрлердің толық сипаттамасы — [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## Желіні жасау

Жүктеме теңгергіші үшін желіні жасауға келесі объектілер қажет болады:

- Ресурстар (resource):

  - `vkcs_networking_network`: ВМ жасалатын желі. Төмендегі мысалда `lb` атауымен желі жасалады.
  - `vkcs_networking_subnet`: желіден ішкі желі. Мысалда: `lb`.

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

## Жүктеме теңгергішін жасау

Жүктеме теңгергішін жасауға келесі объектілер қажет болады:

- Дереккөздер (data source):

  - `vkcs_images_image`: жасалатын инстанс үшін орнату образы.
  - `vkcs_compute_flavor`: ВМ флейворы (CPU, RAM, Disk). Оны VK Cloud жеке кабинетіндегі ВМ жасау шеберінен көруге болады.

- Ресурстар (resource):

  - `vkcs_compute_instance`: виртуалды машина данасы ресурсын басқарады. Осы ВМ-дарға түсетін трафик жасалатын жүктеме теңгергіші арқылы бөлінеді.

    {note:warn}

    Барлық аргументтер, соның ішінде дананың әкімші құпиясөзі, бастапқы күйде кәдімгі мәтін түрінде сақталады. [Құпия деректер](https://www.terraform.io/docs/language/state/sensitive-data.html?_ga=2.74378194.1320188012.1657572463-152934297.1633441142) туралы толығырақ.

    {/note}

    Келесі ресурстарды қамтиды:

      - `name`: ВМ атауы.
      - `flavor_id`: ВМ жасау кезінде пайдаланылатын ВМ флейворы.
      - `security_groups`: осы ВМ-ге тағайындалған қауіпсіздік топтары атауларының тізімі.
      - `image_id`: осы ВМ жасау кезінде пайдаланылатын ОЖ образы.
      - `network`: ВМ жасау кезінде қосылатын желі.
      - `depends_on`: ВМ көрсетілген ресурстар жасалғаннан кейін іске қосылады.

  - `vkcs_lb_loadbalance`: VK Cloud-тағы жүктеме теңгергіші ресурсын басқарады. Келесі ресурстарды қамтиды:

      - `name`: жүктеме теңгергіші үшін оқуға ыңғайлы атау. Бірегей болуы міндетті емес.
      - `vip_subnet_id`: жүктеме теңгергіші үшін мекенжай бөлінетін ішкі желі. Жүктеме теңгергіштерін тек саясатпен рұқсат етілген желілерде ғана жасай аласыз (мысалы, сізге тиесілі желілерде немесе ортақ болып табылатын желілерде). Бұл параметрді өзгерту жаңа жүктеме теңгергішін жасайды.
      - `availability_zone`: теңгергіш орналастырылатын [қолжетімділік аймағы](/kz/start/concepts/architecture#az). ВМ-дерді теңгергішке қосуды оңтайландыру және жеделдету үшін оларды бір қолжетімділік аймағында орналастырыңыз. Қолжетімділік аймақтарының тізімін жеке кабинеттен немесе [OpenStack CLI](/kz/tools-for-using-services/cli/openstack-cli#primery_komand_openstack_cli) арқылы көруге болады.

      - `tags`: жүктеме теңгергішіне тағайындалған қарапайым жолдар тізімі.

  - `vkcs_lb_listener`: VK Cloud-тағы тыңдаушы ресурсын басқарады. Келесі ресурстарды қамтиды:

      - `name`: тыңдаушы үшін оқуға ыңғайлы атау. Бірегей болуы міндетті емес.
      - `protocol`: протокол `TCP`, `HTTP`, `HTTPS`, `TERMINATED_HTTPS`, `UDP` болуы мүмкін. Бұл параметрді өзгерту жаңа тыңдаушыны жасайды.
      - `protocol_port`: клиенттік трафик тыңдалатын порт. Бұл параметрді өзгерту жаңа тыңдаушыны жасайды.
      - `loadbalancer_id`: осы тыңдаушы ұсынылуы тиіс жүктеме теңгергіші. Бұл параметрді өзгерту жаңа тыңдаушыны жасайды.

  - `vkcs_lb_pool`: VK Cloud-тағы пул ресурсын басқарады. Келесі ресурстарды қамтиды:

      - `name`: пулдың оқуға ыңғайлы атауы.
      - `protocol`: протокол `TCP`, `HTTP`, `HTTPS`, `PROXY` немесе `UDP` болуы мүмкін. Бұл параметрді өзгерту жаңа пулды жасайды.
      - `lb_method`: трафикті пул қатысушылары арасында бөлуге арналған жүктемені теңгеру алгоритмі. `ROUND_ROBIN`, `LEAST_CONNECTIONS`, `SOURCE_IP` немесе `SOURCE_IP_PORT` мәндерінің бірі болуы тиіс.
      - `listener_id`: пул қатысушылары байланыстырылатын тыңдаушы. Бұл параметрді өзгерту жаңа пулды жасайды. Ескерту: идентификаторлардың бірін көрсету қажет: не `loadbalancer_id`, не `listener_id`.

  - `vkcs_lb_member`: VK Cloud-тағы қатысушы ресурсын басқарады. Келесі ресурстарды қамтиды:

      - `address`: жүктеме теңгергішінен трафик алу үшін қатысушының IP мекенжайы. Бұл параметрді өзгерту жаңа қатысушыны жасайды.
      - `protocol_port`: клиенттік трафик тыңдалатын порт. Бұл параметрді өзгерту жаңа қатысушыны жасайды.
      - `pool_id`: осы қатысушы тағайындалатын пул идентификаторы. Бұл параметрді өзгерту жаңа қатысушыны жасайды.
      - `subnet_id`: қатысушыға қол жеткізуге болатын ішкі желі. Бұл параметрді өзгерту жаңа қатысушыны жасайды.
      - `weight`: осы қатысушы пулдан алуы тиіс трафиктің салыстырмалы үлесін көрсететін оң бүтін мән. Мысалы, салмағы 10 болатын қатысушы салмағы 2 болатын қатысушыға қарағанда бес есе көп трафик алады. Әдепкі бойынша 1 мәні пайдаланылады.
    
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

## Өзгерістерді қолдану

Мысалдың екі бөлігін де `lb.tf` файлына қосып, келесі командаларды орындаңыз:

```console
terraform init
```
```console
terraform apply
```
