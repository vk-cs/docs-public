Установка terraform
-------------------

Скачайте terraform по ссылке [https://www.terraform.io/downloads.html](https://www.terraform.io/downloads.html) и воспользуйтесь инструкцией [https://learn.hashicorp.com/terraform/getting-started/install.html](https://learn.hashicorp.com/terraform/getting-started/install.html) по его установке.

Настройка провайдера
--------------------

Для начала использования провайдера terraform VK CS выполните следующие действия:

*   Скачайте бинарный файл VK CS провайдера по ссылке [https://hub.mcs.mail.ru/repository/terraform/linux/v0.1.0/mcs-provider](https://hub.mcs.mail.ru/repository/terraform/linux/v0.1.0/mcs-provider).
*   Создайте директорию, в которой будут храниться конфигурационные файлы, например, "mcs\_provider".
*   Поместите бинарный файл VK CS провайдера по следующему пути "~/.terraform.d/plugins/".
*   Перейдите в директорию "mcs\_provider" и создайте в ней файл "main.tf". Для использования переменных при создании ресурсов также создайте файл "vars.tf".
*   Для инициализации openstack провайдера используйте "openrc" файл - скачать его можно по ссылке [https://mcs.mail.ru/app/project/keys/](https://mcs.mail.ru/app/project/keys/). 

![](./assets/1601594594299-1601594594299.png)Затем выполните:

```
source %your\_openrc\_name%.sh 
```

**Внимание**

Для корректной работы обоих провайдеров убедитесь, что в переменных окружения не установлена переменная "OS\_USER\_DOMAIN\_ID". Вы также можете убрать ее, выполнив команду "unset OS\_USER\_DOMAIN\_ID".

Также openstack провайдер может быть сконфигрурирован в файле "main.tf" (для подробного ознакомления воспользуйтесь документацией по ссылке [https://www.terraform.io/docs/providers/openstack/index.html](https://www.terraform.io/docs/providers/openstack/index.html)):

```
provider "openstack" {
  user\_name   = "admin"
  tenant\_name = "admin"
  password    = "pwd"
  auth\_url    = "http://myauthurl:5000/v2.0"
  region      = "RegionOne"
}
```

Для инициализации VK CS провайдера выставите в переменные окружения следующие переменные, выполнив команды:

```
export USER\_NAME="your\_username" #same as OS\_USERNAME
export PASSWORD="your\_password" #same as OS\_PASSWORD
export PROJECT\_ID="your\_project\_id" #same as OS\_PROJECT\_ID
```

также конфигурацию провайдеров можно описывать в файле "main.tf", например:

```
provider "mcs"{
  username = "your\_username"
  password = "your\_password"
  project\_id = "your\_project\_id"
}
```

Создание ресурсов
-----------------

Для создания и управления ресурсами выполните следующие шаги:

Опишите в файле "main.tf" ресурсы для создания, например, для создания кластера с группой узлов вставьте следующее:

```
data "mcs\_kubernetes\_clustertemplate" "ct1" {
  version = 16
}
data "openstack\_compute\_flavor\_v2" "k8s" {
name = "Standard-2-4-40"
}

resource "mcs\_kubernetes\_cluster" "mycluster" {
  cluster\_template\_id = data.mcs\_kubernetes\_clustertemplate.ct1.id
  subnet\_id = "your\_subnet\_id"
  network\_id = "your\_network\_id"
  master\_flavor = data.openstack\_compute\_flavor\_v2.k8s.id
  keypair = "your\_keypair\_name"
}
resource "mcs\_kubernetes\_node\_group" "myng" {
  cluster\_id = mcs\_kubernetes\_cluster.mycluster.id
  node\_count = 1
}
```

**Внимание**

Для удобства заполнения некоторых "id" можно использовать "data sources", они начинаются с метки "data" и читают уже существующие ресурсы.

Для создания или использования keypair (ключевой пары):

```
# Прочитает существующую ключевую пару, для доступа к атрибутам используйте \`data.openstack\_compute\_keypair\_v2.kp\`
data "openstack\_compute\_keypair\_v2" "kp" {
 name = "my-keypair"
}

# Сгенерирует пару ключей
resource "openstack\_compute\_keypair\_v2" "test-keypair" {
 name = "my-keypair"
}

# Создание с существующей парой ключей
resource "openstack\_compute\_keypair\_v2" "test-keypair" {
 name       = "my-keypair"
 public\_key = "ssh-rsa your\_public\_key"
}
```

Для создания новых сетевых сущностей или чтения существующих используйте следующие конструкции:

```
# Чтение существующих ресурсов
data "openstack\_networking\_network\_v2" "k8s\_network" {
 name = "your\_network\_name"
}

data "openstack\_networking\_subnet\_v2" "k8s\_subnet" {
 name = "your\_subnet\_name"
}

# Создание новых ресурсов
resource "openstack\_networking\_network\_v2" "k8s" {
 name           = "k8s-net"
 admin\_state\_up = true
}

resource "openstack\_networking\_subnet\_v2" "k8s-subnetwork" {
 name            = "k8s-subnet"
 network\_id      = openstack\_networking\_network\_v2.k8s.id
 cidr            = "192.168.0.0/24"
 ip\_version      = 4
 dns\_nameservers = \["8.8.8.8", "8.8.4.4"\]
}
 
data "openstack\_networking\_network\_v2" "extnet" {
 name = "ext-net"
}

resource "openstack\_networking\_router\_v2" "k8s" {
 name                = "k8s-router"
 admin\_state\_up      = true
 external\_network\_id = data.openstack\_networking\_network\_v2.extnet.id
}

resource "openstack\_networking\_router\_interface\_v2" "k8s" {
 router\_id = openstack\_networking\_router\_v2.k8s.id
 subnet\_id = openstack\_networking\_subnet\_v2.k8s-subnetwork.id
}
```

Применение конфигурации
-----------------------

Выполните команду "terraform init".

Для того чтобы увидеть, какие ресурсы будут созданы - выполните "terraform plan".

Для применения выбранной конфигурации выполните "terraform apply" и введите "yes".

Удаление ресурсов
-----------------

Выполните команду "terraform destroy" и введите "yes".

Переход на провайдера VK CS
-------------------------

Для перехода с openstack провайдера на VK CS выполните следующие команды:

Рассмотрим следующий openstack кластер:

```
resource "openstack\_containerinfra\_cluster\_v1" "cluster\_1" {
name                = "clusterone"
cluster\_template\_id = "cluster\_template\_id"
master\_count        = 1
keypair             = "keypair\_name"
master\_flavor       = "master\_flavor\_id"
labels = {
  fixed\_network = "fixed\_network\_id"
  fixed\_subnet = "fixed\_subnet\_id"
}
}
```

Создадим конфигурацию для VK CS провайдера и заполним только необходимые поля:

```
resource "mcs\_kubernetes\_cluster" "cluster\_2" {
name                = "clusterone"
cluster\_template\_id = "cluster\_template\_id"
keypair             = "keypair\_name"
network\_id = "fixed\_network\_id"
subnet\_id = "fixed\_subnet\_id"
}
resource "mcs\_kubernetes\_node\_group" "ng\_2" {
  cluster\_id = mcs\_kubernetes\_cluster.cluster\_2.id
  node\_count = 1
}
```

Если до этого у вас в стейте не было ресурсов VK CS провайдера то выполните "terraform init -plugin-dir $GOPATH/bin".

Выполните команды:

```
terraform import mcs\_kubernetes\_cluster.cluster\_2 cluster\_uuid
terraform import mcs\_kubernetes\_node\_group.ng\_2 ng\_uuid
```

Для прекращения использования openstack провайдера для управления кластером откройте файл terraform.tfstate (он должен находиться в той же директории) и удалите из него всю информацию о кластере, созданном через openstack провайдер. Резервная копия стейта находится в файле terraform.tfstate.backup.

В результате в terraform будет создан новый ресурс, который будет управлять существующим кластером.

Теперь управление кластером осуществляется через VK CS провайдер.