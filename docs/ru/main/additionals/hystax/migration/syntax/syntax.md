План миграции следует скорректировать таким образом, чтобы он соответствовал вашим требованиям развертывания хостов, мигрируемых в целевой проект. Пример плана миграции двух хостов:

{
  "subnets": {
    "subnet_0": {
      "name": "subnet_0",
      "cidr": "10.0.1.0/24",
      "subnet_id": "2aebd081-44a8-480f-xxxx-yyyyyyyyyyyy"
    }
  },
  "devices": {
    "ubuntu01": {
      "id": "ec09a435-3389-d19f-4cf4-zzzzzzzzzzz",
      "security_groups": [
        "default_all"
      ],
      "availability_zone": "MS1",
      "rank": 0,
      "flavor": "Standard-4-8-80",
      "ports": [
        {
          "name": "port_0",
          "ip": "10.0.1.23",
          "floating_ip": true,
          "subnet": "subnet_0"
        }
      ]
    },
    "centos01": {
      "id": "a40d5ef3-e244-dab5-9df0-aaaaaaaaaaaa",
      "security_groups": [
        "default_all"
      ],
      "availability_zone": "DP1",
      "rank": 0,
      "flavor": "Standard-4-8-80",
      "ports": [
        {
          "name": "port_0",
          "ip": "10.0.1.27",
          "floating_ip": true,
          "subnet": "subnet_0"
        }
      ]
    }
  }
}

В этом плане описываются два хоста, и подсеть, в которой эти хосты будут развернуты.

На верхнем уровне документа находятся два объекта:

- subnets – содержит описание подсетей целевого проекта, к которым будут подключены мигрируемые хосты.
- devices – содержит описание хостов, которые будут развернуты в целевом проекте. Можно указать нужный тип флейвора, группы безопасности хоста, ЦОД размещения, очередность запуска, а также переопределить подсеть и ip-адрес мигрируемого хоста.

Развернутое описание этих и других параметров плана миграции можно найти в [официальной документации](https://docs.hystax.com/live-migration/migration_overview.html#migration-plan-syntax) производителя Hystax Acura.
