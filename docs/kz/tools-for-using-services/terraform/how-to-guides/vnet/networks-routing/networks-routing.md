# {heading(Сы желілер арасындағы трафикті маршрутизациялау)[id=terraform-networks-routing]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Төменде Terraform көмегімен екі желі арасында маршрутизацияны баптау мысалы келтірілген.

Мысал инфрақұрылымы:

- Мысалда екі желі жасалған: жекеменшік `common-private` және жариялы `common-public`. Әр желі бір subnet-тен тұрады.
- Әр желі үшін сәйкес subnet-терде интерфейстері бар маршрутизаторлар жасалған.
- Жариялы желінің маршрутизаторына сыртқы желіге қолжетім бапталған, сондықтан бұл желідегі нысандарға Floating IP-адрестерін тағайындауға болады.
- Әр желіде оның жалғыз subnet-іне сәйкес келетін порт жасалған. Осы порттарға екі желі арасында маршрутизатор рөлін атқаратын `common-router` виртуалды машинасы қосылады.
- Маршрутизаторларда виртуалды машинаның порты арқылы басқа subnet-ке апаратын статикалық маршруттар бапталған.
- Әр subnet-те бір виртуалды машина жасалған. Жариялы желідегі виртуалды машинаның Floating IP-адресі бар.

  Бұл машиналар {linkto(#terraform-networks-routing-check[text=желілер арасындағы маршрутизация баптауын тексеру үшін]} пайдаланылады): олардың арасындағы сәтті пинг дұрыс бапталғанын растайды.

![Мысал инфрақұрылымы](assets/infrastructure-scheme.png){params[noBorder=true]}

Параметрлердің толық сипаттамасы — [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## {heading(Бастамас бұрын)[id=terraform-networks-routing-prepare]}

1. {linkto(../../../../account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=Квоталарды]} тексеріңіз. Таңдалған {linkto(../../../../account/concepts/regions#tools-account-concepts-regions)[text=өңірде]} CDN-ресурсын жасауға жеткілікті ресурс бар екеніне көз жеткізіңіз. Әр түрлі өңірлер үшін әр түрлі квоталар бапталған болуы мүмкін.

   Қажет болған жағдайда квоталарды {linkto(../../../../account/instructions/project-settings/manage#project-increase-quota)[text=ұлғайтыңыз]}.

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#tools-cli-openstack) көз жеткізіңіз және жоба ішінде [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#openstack-authorize).

   Провайдер баптауларын Terraform конфигурация файлына `provider.tf` орналастырыңыз.

1. Terraform конфигурация файлын `variables.tf` айнымалылармен жасаңыз:

   ```hcl
   variable "image_flavor" {
     type = string
     default = "Ubuntu-22.04-202208"
   }

   variable "compute_flavor" {
     type = string
     default = "STD2-2-4"
   }

   variable "key_pair_name" {
     type = string
     default = "default"
   }

   variable "availability_zone_name" {
     type = string
     default = "MS1"
   }
   ```

   Бұл файлда келесі айнымалылар жарияланады:

   - `image_flavor`: виртуалды машинаның бейнесінің атауы;
   - `compute_flavor`: виртуалды машинаның конфигурация үлгісінің атауы;
   - `key_pair_name`: виртуалды машинаға SSH арқылы қосу үшін пайдаланылатын кілт жұбының атауы;
   - `availability_zone_name`: виртуалды машина орналастырылатын қолжетімділік аймағының атауы.

   Қажет болған жағдайда айнымалылардың рұқсат етілген мәндерін нақтылап, олардың мәндерін түзетіңіз:

   {tabs}

   {tab(image_flavor)}

   OpenStack CLI көмегімен:

   ```console
   openstack image list
   ```

   {/tab}

   {tab(compute_flavor)}

   OpenStack CLI көмегімен:

   ```console
   openstack flavor list
   ```

   {/tab}

   {tab(key_pair_name)}

   OpenStack CLI көмегімен:

   ```console
   openstack keypair list
   ```

   {/tab}

   {tab(availability_zone_name)}

   [Қолжетімділік аймақтарына](../../../../../start/concepts/architecture#architecture-az) арналған құжаттан.

   {/tab}

   {/tabs}

## {heading({counter(tf-routing)}. Базалық желілік инфрақұрылымды сипаттайтын файлдарды жасаңыз)[id=terraform-networks-routing-net-files]}

1. Terraform конфигурация файлын `common-public.tf` жасаңыз. Онда мыналар сипатталады:

   - жариялы желі және subnet;
   - `internet` сыртқы желісіне қолжетімі және жариялы subnet-те интерфейсі бар маршрутизатор.

   ```hcl
   data "vkcs_networking_network" "extnet" {
     name = "internet"
   }

   resource "vkcs_networking_network" "common-public" {
     name = "common-public-net"
   }

   resource "vkcs_networking_subnet" "common-public" {
     name            = "common-public-subnet"
     network_id      = vkcs_networking_network.common-public.id
     cidr            = "192.168.200.0/24"
     dns_nameservers = ["8.8.8.8", "8.8.4.4"]
   }

   resource "vkcs_networking_router" "common-public" {
     name                = "common-public-router"
     admin_state_up      = true
     external_network_id = data.vkcs_networking_network.extnet.id
   }

   resource "vkcs_networking_router_interface" "common-public" {
     router_id = vkcs_networking_router.common-public.id
     subnet_id = vkcs_networking_subnet.common-public.id
   }
   ```

1. Terraform конфигурация файлын `common-private.tf` жасаңыз. Онда мыналар сипатталады:

   - жекеменшік желі және subnet;
   - жекеменшік subnet-те интерфейсі бар маршрутизатор.

   ```hcl
   resource "vkcs_networking_network" "common-private" {
     name = "common-private-net"
   }

   resource "vkcs_networking_subnet" "common-private" {
     name            = "common-private-subnet"
     network_id      = vkcs_networking_network.common-private.id
     cidr            = "192.168.199.0/24"
     dns_nameservers = ["8.8.8.8", "8.8.4.4"]
   }

   resource "vkcs_networking_router" "common-private" {
     name           = "common-private-router"
     admin_state_up = true
   }

   resource "vkcs_networking_router_interface" "common-private" {
     router_id = vkcs_networking_router.common-private.id
     subnet_id = vkcs_networking_subnet.common-private.id
   }
   ```

## {heading({counter(tf-routing)}. Маршрутизатор рөлінде виртуалды машинаға арналған инфрақұрылымды сипаттайтын файлды жасаңыз)[id=terraform-networks-routing-infrastructure-file]}

Terraform конфигурация файлын `main.tf` жасаңыз. Онда мыналар сипатталады:

- Виртуалды машина қосылатын жариялы және жекеменшік subnet-тердегі порттар.
- Виртуалды машинаның конфигурациясы.

  Конфигурацияда `cloud-init` көмегімен маршрутизацияны қосатын команданы орындау үшін `user_data` параметрі пайдаланылады:

  ```console
  sysctl -w net.ipv4.ip_forward=1
  ```

- Виртуалды машинаның порттары арқылы қажетті желілерге апаратын статикалық маршруттар.
- Виртуалды машинаға SSH арқылы қосу үшін Floating IP-адресі.

```hcl
data "vkcs_compute_flavor" "router-compute" {
  name = var.compute_flavor
}

data "vkcs_images_image" "router-image" {
  name = var.image_flavor
}

resource "vkcs_networking_port" "common-private" {
  name       = "common-private"
  network_id = vkcs_networking_network.common-private.id
  allowed_address_pairs {
    ip_address = vkcs_networking_subnet.common-public.cidr
  }
  admin_state_up = "true"
}

resource "vkcs_networking_port" "common-public" {
  name       = "common-public"
  network_id = vkcs_networking_network.common-public.id
  allowed_address_pairs {
    ip_address = vkcs_networking_subnet.common-private.cidr
  }
  admin_state_up = "true"
}

resource "vkcs_compute_instance" "common-router" {
  name              = "common-router"
  flavor_id         = data.vkcs_compute_flavor.router-compute.id
  security_groups   = ["default", "ssh"]
  availability_zone = var.availability_zone_name
  key_pair          = var.key_pair_name
  config_drive      = true

  user_data = <<EOF
#cloud-config
runcmd:
- sysctl -w net.ipv4.ip_forward=1
EOF

  block_device {
    uuid                  = data.vkcs_images_image.router-image.id
    source_type           = "image"
    volume_size           = 10
    volume_type           = "ceph-ssd"
    boot_index            = 0
    destination_type      = "volume"
    delete_on_termination = true
  }

  network {
    port = vkcs_networking_port.common-public.id
  }

  network {
    port = vkcs_networking_port.common-private.id
  }

  depends_on = [
    vkcs_networking_network.common-private,
    vkcs_networking_subnet.common-private,
    vkcs_networking_network.common-public,
    vkcs_networking_subnet.common-public
  ]
}

resource "vkcs_networking_router_route" "common-public" {
  router_id        = vkcs_networking_router.common-public.id
  destination_cidr = vkcs_networking_subnet.common-private.cidr
  next_hop         = vkcs_networking_port.common-public.all_fixed_ips[0]
  depends_on = [
    vkcs_networking_router_interface.common-public,
    vkcs_networking_port.common-public,
    vkcs_compute_instance.common-router
  ]
}

resource "vkcs_networking_router_route" "common-private" {
  router_id        = vkcs_networking_router.common-private.id
  destination_cidr = vkcs_networking_subnet.common-public.cidr
  next_hop         = vkcs_networking_port.common-private.all_fixed_ips[0]
  depends_on = [
    vkcs_networking_router_interface.common-private,
    vkcs_networking_port.common-private,
    vkcs_compute_instance.common-router
  ]
}

resource "vkcs_networking_floatingip" "fip-router" {
  pool = data.vkcs_networking_network.extnet.name
}

resource "vkcs_compute_floatingip_associate" "fip-router" {
  floating_ip = vkcs_networking_floatingip.fip-router.address
  instance_id = vkcs_compute_instance.common-router.id
}
```

## {heading({counter(tf-routing)}. Тесттік виртуалды машиналарды сипаттайтын файлды жасаңыз)[id=terraform-networks-routing-vm-file]}

Terraform конфигурация файлын `test-vms.tf` жасаңыз. Онда мыналар сипатталады:

- Виртуалды машиналар:

  - жариялы subnet-те Floating адресі бар `common-instance-public`. Мұндай виртуалды машинаға интернеттен SSH арқылы қосуға болады.
  - жекеменшік subnet-те `common-instance-private`. Мұндай виртуалды машинаға басқа виртуалды машинаның ішінен SSH арқылы қосуға болады.

  Бұл виртуалды машиналар {linkto(#terraform-networks-routing-check)[text=екі желі арасындағы маршрутизация жұмысын тексеру үшін]} пайдаланылатын болады.

- Виртуалды машиналардың IP-адрестері бар Terraform ([output](https://developer.hashicorp.com/terraform/language/values/outputs)) шығыстары.

```hcl
data "vkcs_compute_flavor" "vm-compute" {
  name = var.compute_flavor
}

data "vkcs_images_image" "vm-image" {
  name = var.image_flavor
}

resource "vkcs_compute_instance" "common-private" {
  name              = "common-instance-private"
  flavor_id         = data.vkcs_compute_flavor.vm-compute.id
  security_groups   = ["default", "ssh"]
  availability_zone = var.availability_zone_name
  key_pair          = var.key_pair_name

  block_device {
    uuid                  = data.vkcs_images_image.vm-image.id
    source_type           = "image"
    volume_size           = 10
    volume_type           = "ceph-ssd"
    boot_index            = 0
    destination_type      = "volume"
    delete_on_termination = true
  }

  network {
    uuid = vkcs_networking_network.common-private.id
  }

  depends_on = [
    vkcs_networking_network.common-private,
    vkcs_networking_subnet.common-private
  ]
}

resource "vkcs_compute_instance" "common-public" {
  name              = "common-instance-public"
  flavor_id         = data.vkcs_compute_flavor.vm-compute.id
  security_groups   = ["default", "ssh"]
  availability_zone = var.availability_zone_name
  key_pair          = var.key_pair_name

  block_device {
    uuid                  = data.vkcs_images_image.vm-image.id
    source_type           = "image"
    volume_size           = 10
    volume_type           = "ceph-ssd"
    boot_index            = 0
    destination_type      = "volume"
    delete_on_termination = true
  }

  network {
    uuid = vkcs_networking_network.common-public.id
  }

  depends_on = [
    vkcs_networking_network.common-public,
    vkcs_networking_subnet.common-public
  ]
}

resource "vkcs_networking_floatingip" "fip" {
  pool = data.vkcs_networking_network.extnet.name
}

resource "vkcs_compute_floatingip_associate" "fip" {
  floating_ip = vkcs_networking_floatingip.fip.address
  instance_id = vkcs_compute_instance.common-public.id
}

output "common-instance-public-floating-ip" {
  description = "The common-public VM floating IP address"
  value       = vkcs_networking_floatingip.fip.address
}

output "common-instance-public-ip" {
  description = "The common-public VM IP address"
  value       = vkcs_compute_instance.common-public.network[0].fixed_ip_v4
}

output "common-instance-private-ip" {
  description = "The common-private VM IP address"
  value       = vkcs_compute_instance.common-private.network[0].fixed_ip_v4
}
```

## {heading({counter(tf-routing)}. Қажетті ресурстарды Terraform көмегімен жасаңыз)[id=terraform-networks-routing-create]}

1. Жасалған Terraform конфигурация файлдарын бір директорияға орналастырыңыз:

   - `provider.tf`;
   - `variables.tf`;
   - `main.tf`;
   - `common-public.tf`;
   - `common-private.tf`;
   - `test-vms.tf`.

1. Осы директорияға өтіңіз.
1. Команданы орындаңыз:

   ```console
   terraform init
   ```

1. Команданы орындаңыз:

   ```console
   terraform apply
   ```

   Растау сұралғанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.

   Ресурстар жасалғаннан кейін Terraform-ның келесі шығыстары көрсетіледі:

   - `common-instance-private-ip`: жекеменшік subnet-тегі виртуалды машинаның IP-адресі.
   - `common-instance-public-ip`: жариялы subnet-тегі виртуалды машинаның IP-адресі.
   - `common-instance-public-floating-ip`: жариялы subnet-тегі виртуалды машинаның Floating IP-адресі.

   Осы IP-адрестерді мысалдың жұмысын {linkto(#terraform-networks-routing-check)[text=тексеру кезінде]} пайдаланыңыз.

## {heading({counter(tf-routing)}. Мысалдың жұмысын тексеріңіз)[id=terraform-networks-routing-check]}

1. `common-instance-public` виртуалды машинасына {linkto(../../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=SSH арқылы қосылыңыз]}.

   Қосу үшін пайдаланыңыз:

   - `common-instance-public-floating-ip` шығысындағы IP-адресті.
   - `variables.tf` файлындағы `key_pair_name` айнымалысында көрсетілген атауы бар SSH-кілтті.

1. `common-instance-private-ip` шығысындағы IP-адреске пинг орындаңыз:

   ```console
   ping 192.168.199.XXX
   ```

   Сәтті пинг мысалдың дұрыс жұмыс істейтінін растайды:

   ```text
   PING 192.168.199.XXX (192.168.199.XXX) 56(84) bytes of data.
   64 bytes from 192.168.199.XXX: icmp_seq=1 ttl=63 time=1.82 ms
   64 bytes from 192.168.199.XXX: icmp_seq=2 ttl=63 time=0.875 ms
   64 bytes from 192.168.199.XXX: icmp_seq=3 ttl=63 time=0.903 ms
   64 bytes from 192.168.199.XXX: icmp_seq=4 ttl=63 time=0.966 ms
   ^C
   --- 192.168.199.10 ping statistics ---
   4 packets transmitted, 4 received, 0% packet loss, time 3004ms
   rtt min/avg/max/mdev = 0.875/1.139/1.815/0.391 ms
   ```

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=terraform-networks-routing-delete]}

Terraform көмегімен жасалған ресурстар енді қажет болмаса, оларды жойыңыз:

1. Terraform конфигурация файлдары орналасқан директорияға өтіңіз.
1. Команданы орындаңыз:

   ```console
   terraform destroy
   ```

   Растау сұралғанда `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.