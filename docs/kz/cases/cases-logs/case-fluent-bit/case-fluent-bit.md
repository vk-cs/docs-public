{include(/kz/_includes/_translated_by_ai.md)}

docker-runtime және crio-runtime бар нодтардан логтар жинауды біріздендіру үшін Fluent Bit пайдалану керек (fluentd-тің жеңіл әрі өнімдірек баламасы).

## values.yaml баптау файлы

Helm үшін `values.yaml` ретінде төмендегі сілтеме бойынша берілген файлды қолданған жөн — онда қажетті сүзгілер мен парсерлер әлдеқашан бапталған.

[Файл values.yaml](assets/values.yaml "download").

Қоса берілген `values.yaml` ішінде `[OUTPUT]` үшін параметрлерді түзету қажет — мысалда логтарды сақтау үшін бір дерекқордағы екі кестесі бар PostgreSQL пайдаланылады:

- `fluentbit_21_host` кестесі — хост сервистерінің логтарын сақтау үшін (`kublet.service`, `docker.service`, `crio.service`).
- `fluentbit_21_kube` кестесі — подтардың логтарын тікелей сақтайды.

Дәл осылай логтарды, мысалы, ElasticSearch жүйесінде сақтауға болады. Қолдау көрсетілетін сақтау түрлерінің толық тізімін [сілтеме](https://docs.fluentbit.io/manual/pipeline/outputs) бойынша көруге болады.

Бөлу әдейі жасалған, себебі ол дерекқордағы әртүрлі кестелерді (Elasticsearch жүйесіндегі индекстерді) пайдалану мүмкіндігін көрсетуге арналған.

## Helm 3 көмегімен Fluent Bit орнату

Fluent Bit орнатпас бұрын Gatekeeper үшін шектеуге (constraint) өзгерістер енгізіңіз. Бұл өзгерістер нодтардан логтарды оқуға мүмкіндік береді:

1. Кластерде `fluentbit_patch.yaml` файлын жасап, оны келесі мазмұнмен толтырыңыз:

    ```yaml
    spec: 
      match: 
        kinds: 
          - apiGroups: 
          - ""
        kinds: 
          - Pod
        parameters: 
          allowedHostPaths: 
            - pathPrefix: /k8spsp
              readOnly: true
            - pathPrefix: /var/log
              readOnly: true
            - pathPrefix: /var/log/containers
              readOnly: true
    ```
2. Келесі пәрменді орындап, өзгерістерді қолданыңыз:

    ```console
    kubectl patch k8spsphostfilesystem.constraints.gatekeeper.sh/psp-host-filesystem --patch-file fluentbit_patch.yaml --type merge
    ```

Fluent Bit-ті баптау файлымен келесі пәрмендер арқылы орнатуға болады:

```console
helm repo add fluent https://fluent.github.io/helm-charts
helm install fluent-bit fluent/fluent-bit --values values.yaml
```

Fluent Bit орнату туралы қосымша ақпаратты Fluent Bit-тің [ресми құжаттамасынан](https://docs.fluentbit.io/manual/installation/kubernetes#installing-with-helm-chart) таба аласыз.

## Логтар мысалдары

Docker логтары:

```json
{
	"ts": 1638261063.088225,
	"msg": "ignoring event" module=libcontainerd namespace=moby topic=/tasks/delete type="*events.TaskDelete",
	"time": "2021-11-30T08:31:03.088224558Z",
	"level": "info"
}
```

CRI-O логтары:

```json
{
	"id": "415aaaf7-8105-4b95-a435-b6fa6994c68d",
	"ts": 1638229757.742216,
	"msg": "Checking image status: registry.infra.mail.ru:5010/pause:3.0",
	"name": "/runtime.v1alpha2.ImageService/ImageStatus",
	"time": "2021-11-29 23:49:17.742215883Z",
	"level": "info"
}
```

Рантаймға қарамастан, под логы:

```json
{
	"ts": 1638282885.830729,
	"log": "[2021/11/30 14:34:45] [ info] [engine] started (pid=1)
",
	"time": "2021-11-30T14:34:45.830729304Z",
	"stream": "stderr",
	"kubernetes": {
		"host": "runtime-613-v19-default-group-0",
		"labels": {
			"app.kubernetes.io/name": "fluent-bit",
			"pod-template-generation": "10",
			"controller-revision-hash": "686bff7448",
			"app.kubernetes.io/instance": "fluent-bit"
		},
		"pod_id": "516d9ae1-671c-4c2e-bfbd-f469de3eceb6",
		"pod_name": "fluent-bit-tbnfb",
		"docker_id": "e0961103bfd584c5a7ba960bbd60aae3544d1cf0d9c1658b90eaae2fb7a83c50",
		"annotations": {
			"checksum/config": "6de425db2bca3061e94e50f648dfa35e9c9f77788f1755df389c303a7124359d",
			"checksum/luascripts": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
		},
		"container_name": "fluent-bit",
		"namespace_name": "default",
		"container_image": "fluent/fluent-bit:1.8.10"
	}
}
```

Қораптан шыққан күйде қолжетімді әртүрлі парсерлерді [GitHub-репозиторийінен](https://github.com/fluent/fluent-bit/blob/master/conf/parsers.conf) көруге болады.
