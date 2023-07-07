## Why Kubernetes needs a special logging solution

It is inconvenient to write logs to containers because:

- data generated in containerized applications exist as long as the container exists. When the docker container is restarted, data, including application logs, is deleted;
- logs cannot be rotated in a container since rotation is an additional process in addition to the logged one, and more than one process cannot be started in one container.

> **Note**<br>
> Log rotation is the process of processing, cleaning, archiving, and sending logs using utilities.

To access the logs of containerized applications in Kubernetes, Docker containers must transfer their logs to standard output streams (stdout) and errors (stderr). By default, Docker logging driver writes logs to a JSON file on the node, from where they can be obtained using the command:

```
kubectl logs pod_name
```

> **Note**<br>
> Docker logging driver is a log collection mechanism built into the Docker engine and supports many [log rotation tools](https://docs.docker.com/config/containers/logging/configure /).

When the Kubernetes orchestrator manages the lifecycle of Docker containers, pods with containers are often and unpredictably created, reloaded and deleted. If the settings of the Docker logging driver allow this, you can access the last logs of the pod before the reboot using the --previous argument:

```
kubectl logs pod_name --previous
```

But it is impossible to get logs for more than one reboot back in this way. Deleting a pod means deleting all information about it, including logs.

Therefore, to work with application logs in Kubernetes, a system is needed to collect, aggregate, save and extract useful information from logs. A bundle of Elasticsearch search engine, Fluentd logging agent, and Kibana — EFK-stack dashboard is suitable for this task.

The scheme of the logging system in the Kubernetes cluster:

![](./assets/1579529210340-1579529210340-png)

Depending on the amount of information required in Elasticsearch processing, you can choose different ways to install the EFK stack:

- With expected loads of tens of thousands of logs per second, installing Elasticsearch in a Kubernetes cluster is not recommended. For a highly loaded solution in production, it is better to allocate separate virtual machines for the Elasticsearch cluster itself and send logs from Kubernetes using log aggregators.
- If the system does not produce tens of thousands of logs, and you need to monitor the logs on dev, test environments, the EFK stack can be installed in the Kubernetes cluster, closer to the applications.

As an agent of the log collector, we use fluentd, an application for collecting, filtering, and aggregating logs, written in C and Ruby languages and with various plugins to expand the application's basic functionality.

We organize a centralized logging system for Kubernetes.

## Installing Elasticsearch in Kubernetes using helm

1. Create namespace kube-logging:

```
kubectl create ns kube-logging
```

> **Note**<br>
> When installing from helm, you will need to set the storage-class for the application.

2. Find out the storage class available in the Kubernetes cluster:

```
admin@k8s:~$ kubectl get sc 
NAME            PROVISIONER            AGE
hdd (default)   kubernetes.io/cinder   103d
hdd-retain      kubernetes.io/cinder   103d
ssd             kubernetes.io/cinder   103d
ssd-retain      kubernetes.io/cinder   103d
```

3. Install Elasticsearch in the Kubernetes cluster with the specified variables:
   ```
   helm install stable/elasticsearch \
         --name elastic \
         --set client.replicas=1 \
         --set master.replicas=1 \
         --set data.replicas=1 \
         --set master.persistence.storageClass=hdd \
         --set data.persistence.storageClass=hdd \
         --set master.podDisruptionBudget.minAvailable=1 \
         --set resources.requests.memory=4Gi \
         --set cluster.env.MINIMUM_MASTER_NODES=1 \
         --set cluster.env.RECOVER_AFTER_MASTER_NODES=1 \
         --set cluster.env.EXPECTED_MASTER_NODES=1 \
         --namespace kube-logging
   ```
   As a result, an Elasticsearch cluster will be installed, consisting of one master node, one data storage node, and one client node.
4. Make sure that all the pods are ready to work:
   ```
   kubectl get po -n kube-logging
   ```
   ```
   NAME                                           READY   STATUS    RESTARTS   AGE
   elastic-elasticsearch-client-c74598797-9m7pm   1/1     Running  
   elastic-elasticsearch-data-0                   1/1     Running  
   elastic-elasticsearch-master-0                 1/1     Running  
   ```
5. Find out the name of the services in kube-logging:
   ```
   kubectl get svc -n kube-logging
   ```

```
NAME                              TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)    AGE
elastic-elasticsearch-client      ClusterIP   10.233.8.213   <none>        9200/TCP   11m
elastic-elasticsearch-discovery   ClusterIP   None           <none>        9300/TCP   11m
```

The elastic-elasticsearch-client service will be used for linking with kibana and fluentd. The Kibana dashboard will also be installed using helm, but we will write the name of the elastic-elasticsearch-client service in the variables of its helm chart.

6. Download kibana helm chart variables for editing:

```
helm fetch --untar stable/kibana
```

7. Go to the kibana directory and edit the values file.yaml:

```
cd kibana/ && vim values.yaml
```

8. Enter the name of the elastic-elasticsearch-client service in the elasticsearch hosts section:

```
35 files:
36   kibana.yml:
37     ## Default Kibana configuration from kibana-docker.
38     server.name: kibana
39     server.host: "0"
40     ## For kibana < 6.6, use elasticsearch.url instead
41     elasticsearch.hosts: http://elastic-elasticsearch-client:9200
```

9. Install Kibana with modified parameters:

```
helm install stable/kibana \
     --name kibana \
     --namespace kube-logging \
     -f values.yaml
```

10. Make sure that the pod has started, and send port 5601 of the Kibana pod to your local machine to access the dashboard:

```
kubectl get pod -n kube-logging 
```

Enter in the following command the full name of the pod for kibana, obtained from the output of the previous command, instead of kibana-pod_hash_id:

```
kubectl port-forward --namespace kube-logging kibana-pod_hash_id 5601:5601
```

11. In the browser address bar, specify the connection string to the abandoned Kibana dashboard:

```
localhost:5601
```

![](./assets/1579689925674-1579689925674-png)

## Installing fluentd log aggregators in kubernetes cluster

Fluend in the Kubernetes cluster can collect logs of hearths, services and hosts, and metadata that correlates with labels of kubernetes entities.

The fluentd configuration contains information about the sources for collecting logs, methods of parsing and filtering useful information, consumers of this information (in our case, such a consumer is elasticsearch).

In the fluentd configuration file, sources for collecting logs are specified within the `<source>` elements. The configmap below states that fluentd will collect information from application container logs, from kubernetes container logs and kubernetes node system logs.

1. Create a configmap for fluentd with the following content:

```
**kind: ConfigMap
apiVersion: v1
data:
  containers.input.conf: |-
    <source>
      @type tail
      path /var/log/containers/*.log
      pos_file /var/log/es-containers.log.pos
      time_format %Y-%m-%dT%H:%M:%S.%NZ
      tag kubernetes.*
      read_from_head true
      format multi_format
      <pattern>
        format json
        time_key time
        time_format %Y-%m-%dT%H:%M:%S.%NZ
      </pattern>
      <pattern>
        format /^(?<time>.+) (?<stream>stdout|stderr) [^ ]* (?<log>.*)$/
        time_format %Y-%m-%dT%H:%M:%S.%N%:z
      </pattern>
    </source>
  system.input.conf: |-
    <source>
      @type tail
      format /^time="(?<time>[^)]*)" level=(?<severity>[^ ]*) msg="(?<message>[^"]*)"( err="(?<error>[^"]*)")?( statusCode=($<status_code>\d+))?/
      path /var/log/docker.log
      pos_file /var/log/es-docker.log.pos
      tag docker
    </source>

    <source>
      @type tail
      format none
      path /var/log/etcd.log
      pos_file /var/log/es-etcd.log.pos
      tag etcd
    </source>


    <source>
      @type tail
      format multiline
      multiline_flush_interval 5s
      format_firstline /^\w\d{4}/
      format1 /^(?<severity>\w)(?<time>\d{4} [^\s]*)\s+(?<pid>\d+)\s+(?<source>[^ \]]+)\] (?<message>.*)/
      time_format %m%d %H:%M:%S.%N
      path /var/log/kubelet.log
      pos_file /var/log/es-kubelet.log.pos
      tag kubelet
    </source>

    <source>
      @type tail
      format multiline
      multiline_flush_interval 5s
      format_firstline /^\w\d{4}/
      format1 /^(?<severity>\w)(?<time>\d{4} [^\s]*)\s+(?<pid>\d+)\s+(?<source>[^ \]]+)\] (?<message>.*)/
      time_format %m%d %H:%M:%S.%N
      path /var/log/kube-proxy.log
      pos_file /var/log/es-kube-proxy.log.pos
      tag kube-proxy
    </source>

    <source>
      @type tail
      format multiline
      multiline_flush_interval 5s
      format_firstline /^\w\d{4}/
      format1 /^(?<severity>\w)(?<time>\d{4} [^\s]*)\s+(?<pid>\d+)\s+(?<source>[^ \]]+)\] (?<message>.*)/
      time_format %m%d %H:%M:%S.%N
      path /var/log/kube-apiserver.log
      pos_file /var/log/es-kube-apiserver.log.pos
      tag kube-apiserver
    </source>


    <source>
      @type tail
      format multiline
```
