Для начала работы [создадите кластер kubernetes](../../../k8s-start/create-k8s/). Рекомендуемая минимальная конфигурация: Master - Standard-2-4 и диск 20GB,
1 нода в группе воркер нод - Standard-2-2 и диск 20GB. 

Также включите [автомасштабирование](../../../k8s-clusters/k8s-scale/) кластера в пределах от 1 до 10 узлов.

[Подключитесь к кластеру](../../../k8s-start/connect-k8s/).

Установите [helm](../../k8s-helm/).

## Установка spark operator для kubernetes

Подробнее про работу spark оператора с нашим kubernetes в [статье](https://habr.com/ru/company/vk/blog/549052/).

Создайте отдельный сервис-аккаунт для работы с оператором spark:

```bash
kubectl create serviceaccount spark
```

Создайте clusterrolebinding для назначения роли созданному сервис-аккаунту:

```bash
kubectl create clusterrolebinding spark-role --clusterrole=edit --serviceaccount=default:spark --namespace=default
```

[удалите gatekeeper в helm](../../k8s-gatekeeper/k8s-opa/)


```bash
helm delete gatekeeper --namespace opa-gatekeeper
```

добавьте репозиторий с оператором в helm:

```bash
helm repo add spark-operator https://googlecloudplatform.github.io/spark-on-k8s-operator
```

установите оператор spark:

```bash
helm install my-release spark-operator/spark-operator --namespace spark-operator --set webhook.enable=true --create-namespace
```

## Запуск тестовой spark задачи

создайте файл spark-pi.yaml со следующим содержимым:

```yaml
apiVersion: "sparkoperator.k8s.io/v1beta2"
kind: SparkApplication
metadata:
  name: spark-pi
  namespace: default
spec:
  type: Scala
  mode: cluster
  image: "gcr.io/spark-operator/spark:v3.1.1"
  imagePullPolicy: Always
  mainClass: org.apache.spark.examples.SparkPi
  mainApplicationFile: "local:///opt/spark/examples/jars/spark-examples_2.12-3.1.1.jar"
  sparkVersion: "3.1.1"
  restartPolicy:
    type: Never
  volumes:
    - name: "test-volume"
      hostPath:
        path: "/tmp"
        type: Directory
  driver:
    cores: 1
    coreLimit: "1200m"
    memory: "512m"
    labels:
      version: 3.1.1
    serviceAccount: spark
    volumeMounts:
      - name: "test-volume"
        mountPath: "/tmp"
  executor:
    cores: 1
    coreLimit: "1200m"
    instances: 1
    memory: "512m"
    labels:
      version: 3.1.1
    volumeMounts:
      - name: "test-volume"
        mountPath: "/tmp"
```
Данная конфигурация позволит создать spark-приложение для рассчёта приблизительного значения числа Пи.

Примените созданный файл на кластере:

```bash
kubectl apply -f spark-pi.yaml
```

Для просмотра результата выполнения, выполните команду:
```shell
kubectl logs spark-pi-driver | grep 3.14
```

Вы получите похожий вывод:
```
Pi is roughly 3.1401557007785037
```