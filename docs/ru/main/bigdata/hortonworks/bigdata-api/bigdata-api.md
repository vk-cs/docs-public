## Создание кластера

Все инструкции при работе с API выполняются в консоли.

Для создания кластера Больших Данных необходимо выполнить следующее:

```
curl -s -H "X-Auth-Token: <your_auth_token>" -H "Content-Type: application/json" -d '
{
    "plugin_name": "ambari",
    "hadoop_version": "3.1",
    "cluster_template_id": "<cluster_template_id>",
    "name": "<your_cluster_name>",
    "neutron_management_network": "<your_network_id>",
}'  -X POST "http://infra.mail.ru:8386/v1.1/<your_project_id>/clusters" -v
```

В двойных кавычках после POST необходимо указать корректный API Endpoints, который указан в Профиле проекта во вкладке "API Endpoints".

Для создания более старой версии в команде необходимо указать "hadoop_version": 2.6 или 2.6.4

```
"node_group_info": [
        {
            "node_group_template_id": "<head_template_id>",
            "count": 1
        },
        {
            "node_group_template_id": "<worker_template_id>",
            "count": 2
        }
    ]
}'  -X POST "http://10.200.2.116:8386/v1.1/d4fd9db1893b401c9f4b8063896f18ab/clusters" -v
```

Если необходимо изменить параметры 'flavor_id', 'availability_zone', 'volumes_per_node',  'volumes_size', 'volume_type', 'volume_local_to_instance', 'volumes_availability_zone', 'count'  для node групп при запуске кластера, то их можно переопределить через свойство node_group_info, как описано в примере ниже:

```
curl -s -H "X-Auth-Token: <your_auth_token>" -H "Content-Type: application/json" -d '
{
    "plugin_name": "ambari",
    "hadoop_version": "3.1",
    "cluster_template_id": "<cluster_template_id>",
    "name": "<your_cluster_name>",
    "neutron_management_network": "<your_network_id>",


    "node_group_info": [
        {
            "node_group_template_id": "<head_template_id>",
            "count": 1
        },
        {
            "node_group_template_id": "<worker_template_id>",
            "count": 3,
            "volumes_size": 300,
        }
    ]
}'  -X POST "http://infra.mail.ru:8386/v1.1/<your_project_id>/clusters" -v
```

В данном примере запущено сразу 3 worker-узла и диск увеличен до 300Гб

Кластерам Big Data соответствует сервис OpenStack Sahara.

Важно помнить, что параметры cluster_template_id, head_template_id и worker_template_id нельзя создать самому - они уже предварительно созданы. Получить указанный список шаблонов кластеров template можно через данный блок:

```
curl -s -H "X-Auth-Token: <your_auth_token>" -H "Content-Type: application/json"  -X GET "http://infra.mail.ru:8386/v1.1/<your_project_ID>/cluster-templates" -v
```

## Удаление кластера

Удаление кластера Больших Данных необходимо проводить с помощью команды

```
curl -s -H "X-Auth-Token: " -H "Content-Type: application/json"  -X DELETE "http://infra.mail.ru:8386/v1.1//clusters" -v
```
