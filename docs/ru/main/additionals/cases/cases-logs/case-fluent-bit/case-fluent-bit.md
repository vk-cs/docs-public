Для унификации сбора логов с нод с docker-runtime и crio-runtime следует воспользоваться Fluent Bit (легковесная и более производительная альтернатива fluentd).

## Файл настройки values.yaml

В качестве `values.yaml` для Helm стоит использовать файл по ссылке ниже — в нем уже настроены необходимые фильтры и парсеры.

[Файл values.yaml](./assets/values.yaml "download").

В приложенном `values.yaml` необходимо поправить параметры для `[OUTPUT]` — в примере для хранения логов используется PostgreSQL с двумя таблицами в одной базе:

- Таблица `fluentbit_21_host` — для хранения логов хостовых сервисов (`kublet.service`, `docker.service`, `crio.service`).
- Таблица `fluentbit_21_kube` — хранит логи непосредственно логи подов.

Аналогичным способом логи можно сохранять, например, в ElasticSearch. Полный список поддерживаемых типов хранилищ можно посмотреть по [ссылке.](https://docs.fluentbit.io/manual/pipeline/outputs)

Разделение сделано намерено, чтобы показать возможность использования разных таблиц в базе данных (индексов в Elasticsearch).

## Установка Fluent Bit с помощью Helm 3

Установить Fluent Bit с файлом настройки можно следующими командами:

```
helm repo add fluent https://fluent.github.io/helm-charts
helm install fluent-bit fluent/fluent-bit --values values.yaml
```

Больше информации об установке Fluent Bit вы можете найти в официальной документации Fluent Bit: https://docs.fluentbit.io/manual/installation/kubernetes#installing-with-helm-chart

## Примеры логов

Логи докера выглядят так:

```
{ "ts": 1638261063.088225, "msg": "ignoring event\" module=libcontainerd namespace=moby topic=/tasks/delete type=\"*events.TaskDelete", "time": "2021-11-30T08:31:03.088224558Z", "level": "info" }
```

Логи CRI-O:

```
{ "id": "415aaaf7-8105-4b95-a435-b6fa6994c68d", "ts": 1638229757.742216, "msg": "Checking image status: registry.infra.mail.ru:5010/pause:3.0", "name": "/runtime.v1alpha2.ImageService/ImageStatus", "time": "2021-11-29 23:49:17.742215883Z", "level": "info" }
```

Лог пода, независимо от рантайма:

```
{
"ts": 1638282885.830729,
"log": "[2021/11/30 14:34:45] [ info] [engine] started (pid=1)\n",
"time": "2021-11-30T14:34:45.830729304Z",
"stream": "stderr",
"kubernetes": {
"host": "runtime-613-v19-default-group-0",
"labels":

{ "app.kubernetes.io/name": "fluent-bit", "pod-template-generation": "10", "controller-revision-hash": "686bff7448", "app.kubernetes.io/instance": "fluent-bit" }
,
"pod_id": "516d9ae1-671c-4c2e-bfbd-f469de3eceb6",
"pod_name": "fluent-bit-tbnfb",
"docker_id": "e0961103bfd584c5a7ba960bbd60aae3544d1cf0d9c1658b90eaae2fb7a83c50",
"annotations":

{ "checksum/config": "6de425db2bca3061e94e50f648dfa35e9c9f77788f1755df389c303a7124359d", "checksum/luascripts": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" }
,
"container_name": "fluent-bit",
"namespace_name": "default",
"container_image": "fluent/fluent-bit:1.8.10"
}
}
```

Различные парсеры, доступные из коробки, можно посмотреть здесь – https://github.com/fluent/fluent-bit/blob/master/conf/parsers.conf
