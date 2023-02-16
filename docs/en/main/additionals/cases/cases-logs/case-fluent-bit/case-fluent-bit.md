To unify the collection of logs from nodes with docker-runtime and crio-runtime, you should use Fluent Bit (a lightweight and more performant alternative to fluentd).

## Settings file values.yaml

As `values.yaml` for the Helm, you should use the file from the link below - the necessary filters and parsers are already configured in it.

[File values.yaml](./assets/values.yaml "download").

In the attached values.yaml, you need to correct the parameters for `[OUTPUT]` - in the example, PostgreSQL is used for storing logs with two tables in one database:

- Table `fluentbit_21_host` - for storing logs of host services (`kublet.service`, `docker.service`, `crio.service`).
- Table `fluentbit_21_kube` - stores logs directly from pod logs.

In a similar way, logs can be saved, for example, in Elasticsearch. For a complete list of supported storage types, see [link.](https://docs.fluentbit.io/manual/pipeline/outputs)

The separation is intentional to show the possibility of using different tables in the database (indexes in Elasticsearch).

## Install Fluent Bit with Helm 3

You can install Fluent Bit with the configuration file with the following commands:

```
helm repo add fluent https://fluent.github.io/helm-charts
helm install fluent-bit fluent/fluent-bit --values ​​values.yaml
```

You can find more information about installing Fluent Bit in the official Fluent Bit documentation: https://docs.fluentbit.io/manual/installation/kubernetes#installing-with-helm-chart

## Sample logs

Docker logs look like this:

```
{ "ts": 1638261063.088225, "msg": "ignoring event\" module=libcontainerd namespace=moby topic=/tasks/delete type=\"*events.TaskDelete", "time": "2021-11-30T08:31 :03.088224558Z", "level": "info" }
```

CRI-O logs:

```
{ "id": "415aaaf7-8105-4b95-a435-b6fa6994c68d", "ts": 1638229757.742216, "msg": "Checking image status: registry.infra.mail.ru:5010/pause:3.0", "name" : "/runtime.v1alpha2.ImageService/ImageStatus", "time": "2021-11-29 23:49:17.742215883Z", "level": "info" }
```

Pod log, regardless of runtime:

```
{
"ts": 1638282885.830729,
"log": "[2021/11/30 14:34:45] [ info] [engine] started (pid=1)\n",
"time": "2021-11-30T14:34:45.830729304Z",
"stream": "stderr",
"kubernetes": {
"host": "runtime-613-v19-default-group-0",
labels:

{ "app.kubernetes.io/name": "fluent-bit", "pod-template-generation": "10", "controller-revision-hash": "686bff7448", "app.kubernetes.io/instance" : "fluent-bit" }
,
"pod_id": "516d9ae1-671c-4c2e-bfbd-f469de3eceb6",
"pod_name": "fluent-bit-tbnfb",
"docker_id": "e0961103bfd584c5a7ba960bbd60aae3544d1cf0d9c1658b90eaae2fb7a83c50",
"annotations":

{ "checksum/config": "6de425db2bca3061e94e50f648dfa35e9c9f77788f1755df389c303a7124359d", "checksum/luascripts": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4949b934}
,
"container_name": "fluent-bit",
"namespace_name": "default",
"container_image": "fluent/fluent-bit:1.8.10"
}
}
```

Various parsers available out of the box can be found here - https://github.com/fluent/fluent-bit/blob/master/conf/parsers.conf
