A local CoreDNS-based caching DNS server can be configured on each cluster node. This is also known as NodeLocal DNS. This will improve the stability and performance of the DNS service in the cluster, without changing existing applications.

## Overview of the DNS architecture in a cluster

Let some [pod](../../k8s-reference/pods) initiate a DNS query.

- Without using caching DNS servers, the following will happen:

  1. the DNS query will be sent to the IP address of the `kube-dns` service of the cluster.
  1. This IP address will be translated by `kube-proxy` into the IP address of the `kube-dns` endpoint using `iptables` rules. In doing so, `iptables` will use `conntrack` to track connections.
  1. When a response is received from `kube-dns`, the reverse process will be performed.
  
  If DNS queries are mostly sent via UDP protocol, then high load on `kube-dns` (for example, if any application is actively sending DNS queries) may lead to issues:
  
  - Race condition for `conntrack`. This results in significant (up to several times) slowdown of responses to DNS queries.
  - Overflow of service tables for `conntrack`. Records for UDP are removed from these tables only by timeout (default — 30 seconds). If tables are full, new DNS queries sent via UDP will be dropped.

- When using caching DNS servers, the following will happen:

  1. Pods will refer to the local caching DNS-server, which is located on the same node as the pods.

     This will avoid address translation (Dynamic NAT, DNAT), the use of `iptables` and `conntrack`. The issues described above will be eliminated.

  1. The caching DNS-server itself will address to service `kube-dns` using `iptables` and `conntrack`, but via TCP protocol.

     In this case load on `kube-dns` is reduced, because it is queried directly by a limited number of DNS-servers and not by all services of the cluster that require DNS for their work. Also, when using TCP, the latency associated with UDP packet loss and timeouts is reduced.

See [official Kubernetes documentation](https://kubernetes.io/docs/tasks/administer-cluster/nodelocaldns/) for more details.

## 1. Preparatory steps

1. [Create](../../operations/create-cluster) a Kubernetes cluster of the most current version.

   Choose the cluster parameters at your own discretion.

1. [Make sure](../../connect/kubectl) that you can connect to the cluster using `kubectl`.

## 2. Deploy a caching DNS server on each node

The DNS server will be deployed in the following configuration:

- Deployment type: DaemonSet so that the server is available on all nodes in the cluster.
- IP addresses that the server listens to:
  - A local `169.254.0.10` IP address on each node. This link-local address is specifically chosen so that there is no overlap with addresses from other subnets used by the cluster.
  - The IP address of the `kube-dns` service. In Kubernetes VK Cloud clusters, this is always `10.254.0.10`.

  This configuration is used because `kube-proxy` in Kubernetes VK Cloud clusters [operates](../../concepts/addons-and-settings/settings#kube_proxy_operation_mode) in `iptables` mode.

- The port to which Prometheus will connect to collect metrics: `9153`.
- Label for service selection: `kube-dns`: `coredns`.
- Cluster domain: `cluster.local`.

See [official Kubernetes documentation](https://kubernetes.io/docs/tasks/administer-cluster/nodelocaldns/#configuration) for more details about configurations and settings.

To deploy a DNS server:

1. Create a manifest file for NodeLocal DNS:

   <details>
   <summary markdown="span">nodelocaldns.yaml</summary>

   ```yaml
   # Copyright 2018 The Kubernetes Authors.
   #
   # Licensed under the Apache License, Version 2.0 (the "License");
   # you may not use this file except in compliance with the License.
   # You may obtain a copy of the License at
   #
   #     http://www.apache.org/licenses/LICENSE-2.0
   #
   # Unless required by applicable law or agreed to in writing, software
   # distributed under the License is distributed on an "AS IS" BASIS,
   # WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   # See the License for the specific language governing permissions and
   # limitations under the License.
   #
   
   apiVersion: v1
   kind: ServiceAccount
   metadata:
     name: node-local-dns
     namespace: kube-system
     labels:
       kubernetes.io/cluster-service: "true"
       addonmanager.kubernetes.io/mode: Reconcile
   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: kube-dns-upstream
     namespace: kube-system
     labels:
       k8s-app: coredns
       kubernetes.io/cluster-service: "true"
       addonmanager.kubernetes.io/mode: Reconcile
       kubernetes.io/name: "KubeDNSUpstream"
   spec:
     ports:
     - name: dns
       port: 53
       protocol: UDP
       targetPort: 53
     - name: dns-tcp
       port: 53
       protocol: TCP
       targetPort: 53
     selector:
       k8s-app: coredns
   ---
   apiVersion: v1
   kind: ConfigMap
   metadata:
     name: node-local-dns
     namespace: kube-system
     labels:
       addonmanager.kubernetes.io/mode: Reconcile
   data:
     Corefile: |
       cluster.local:53 {
           errors
           cache {
                   success 9984 30
                   denial 9984 5
           }
           reload
           loop
           bind 169.254.0.10 10.254.0.10
           forward . __PILLAR__CLUSTER__DNS__ {
                   force_tcp
           }
           prometheus :9153
           health 169.254.0.10:8080
           }
       in-addr.arpa:53 {
           errors
           cache 30
           reload
           loop
           bind 169.254.0.10 10.254.0.10
           forward . __PILLAR__CLUSTER__DNS__ {
                   force_tcp
           }
           prometheus :9153
           }
       ip6.arpa:53 {
           errors
           cache 30
           reload
           loop
           bind 169.254.0.10 10.254.0.10
           forward . __PILLAR__CLUSTER__DNS__ {
                   force_tcp
           }
           prometheus :9153
           }
       .:53 {
           errors
           cache 30
           reload
           loop
           bind 169.254.0.10 10.254.0.10
           forward . __PILLAR__UPSTREAM__SERVERS__
           prometheus :9153
           }
   ---
   apiVersion: apps/v1
   kind: DaemonSet
   metadata:
     name: node-local-dns
     namespace: kube-system
     labels:
       k8s-app: node-local-dns
       kubernetes.io/cluster-service: "true"
       addonmanager.kubernetes.io/mode: Reconcile
   spec:
     updateStrategy:
       rollingUpdate:
         maxUnavailable: 10%
     selector:
       matchLabels:
         k8s-app: node-local-dns
     template:
       metadata:
         labels:
           k8s-app: node-local-dns
         annotations:
           prometheus.io/port: "9153"
           prometheus.io/scrape: "true"
       spec:
         priorityClassName: system-node-critical
         serviceAccountName: node-local-dns
         hostNetwork: true
         dnsPolicy: Default  # Don't use cluster DNS.
         tolerations:
         - key: "CriticalAddonsOnly"
           operator: "Exists"
         - effect: "NoExecute"
           operator: "Exists"
         - effect: "NoSchedule"
           operator: "Exists"
         containers:
         - name: node-cache
           image: registry.k8s.io/dns/k8s-dns-node-cache:1.22.13
           resources:
             requests:
               cpu: 25m
               memory: 5Mi
           args: [ "-localip", "169.254.0.10,10.254.0.10", "-conf", "/etc/Corefile", "-upstreamsvc", "kube-dns-upstream" ]
           securityContext:
             capabilities:
               add:
               - NET_ADMIN
           ports:
           - containerPort: 53
             name: dns
             protocol: UDP
           - containerPort: 53
             name: dns-tcp
             protocol: TCP
           - containerPort: 9153
             name: metrics
             protocol: TCP
           livenessProbe:
             httpGet:
               host: 169.254.0.10
               path: /health
               port: 8080
             initialDelaySeconds: 60
             timeoutSeconds: 5
           volumeMounts:
           - mountPath: /run/xtables.lock
             name: xtables-lock
             readOnly: false
           - name: config-volume
             mountPath: /etc/coredns
           - name: kube-dns-config
             mountPath: /etc/kube-dns
         volumes:
         - name: xtables-lock
           hostPath:
             path: /run/xtables.lock
             type: FileOrCreate
         - name: kube-dns-config
           configMap:
             name: kube-dns
             optional: true
         - name: config-volume
           configMap:
             name: node-local-dns
             items:
               - key: Corefile
                 path: Corefile.base
   ---
   # A headless service is a service with a service IP but instead of load-balancing it will return the IPs of our associated Pods.
   # We use this to expose metrics to Prometheus.
   apiVersion: v1
   kind: Service
   metadata:
     annotations:
       prometheus.io/port: "9153"
       prometheus.io/scrape: "true"
     labels:
       k8s-app: node-local-dns
     name: node-local-dns
     namespace: kube-system
   spec:
     clusterIP: None
     ports:
       - name: metrics
         port: 9153
         targetPort: 9153
     selector:
       k8s-app: node-local-dns
   ```

   </details>

   This file is based on the [manifest from the official Kubernetes repository](https://raw.githubusercontent.com/kubernetes/kubernetes/master/cluster/addons/dns/nodelocaldns/nodelocaldns.yaml), taking into account the configuration above.

1. Create the Kubernetes resources required for NodeLocal DNS based on the manifest:

   ```yaml
   kubectl apply -f nodelocaldns.yaml
   ```

   The following information about the created resources should be displayed:

   ```text
   serviceaccount/node-local-dns created
   service/kube-dns-upstream created
   configmap/node-local-dns created
   daemonset.apps/node-local-dns created
   service/node-local-dns created
   ```

## 3. Check the operation of the caching DNS server

1. Create [pod that includes utilities to work with DNS](https://kubernetes.io/docs/tasks/administer-cluster/dns-debugging-resolution/):

   ```bash
   kubectl apply -f https://k8s.io/examples/admin/dns/dnsutils.yaml
   ```

1. Verify that the pod is successfully created by running the command:

   ```bash
   kubectl get pod dnsutils
   ```

   Output should give you the similar information:

   ```text
   NAME       READY   STATUS    RESTARTS    AGE
   dnsutils   1/1     Running   ...         ...
   ```

1. Connect to a bash session inside this pod:

   ```bash
   kubectl exec -it dnsutils -- bash
   ```

1. Check that the DNS queries are successful:

   <tabs>
   <tablist>
   <tab>Without specifying a DNS server</tab>
   <tab>With explicitly specified DNS server</tab>
   </tablist>
   <tabpanel>

   ```bash
   nslookup mcs.mail.ru && \
   nslookup kubernetes.default
   ```

   Output should give you the similar information:

   ```text
   Server:         10.254.0.10
   Address:        10.254.0.10#53
   
   Non-authoritative answer:
   Name:   mcs.mail.ru
   Address: 95.163.254.194
   Name:   mcs.mail.ru
   Address: 95.163.254.192
   Name:   mcs.mail.ru
   Address: 95.163.254.193
   
   Server:         10.254.0.10
   Address:        10.254.0.10#53
   
   Name:   kubernetes.default.svc.cluster.local
   Address: 10.254.0.1
   ```

   </tabpanel>
   <tabpanel>

   ```bash
   nslookup mcs.mail.ru 169.254.0.10 && \
   nslookup kubernetes.default 169.254.0.10
   ```

   Output should give you the similar information:

   ```text
   Server:         169.254.0.10
   Address:        169.254.0.10#53
   
   Non-authoritative answer:
   Name:   mcs.mail.ru
   Address: 95.163.254.192
   Name:   mcs.mail.ru
   Address: 95.163.254.193
   Name:   mcs.mail.ru
   Address: 95.163.254.194
   
   Server:         169.254.0.10
   Address:        169.254.0.10#53
   
   Name:   kubernetes.default.svc.cluster.local
   Address: 10.254.0.1
   ```

   </tabpanel>
   </tabs>

1. End the bash session in the `dnsutils` pod:

   ```bash
   exit
   ```

## Control the usage of resources

1. If the Kubernetes resources you created are no longer needed, delete them.

   <tabs>
   <tablist>
   <tab>Linux/macOS</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   ```bash
   kubectl delete -f https://k8s.io/examples/admin/dns/dnsutils.yaml
   kubectl  -f nodelocaldns.yaml

   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   kubectl delete -f https://k8s.io/examples/admin/dns/dnsutils.yaml; `
   kubectl  -f nodelocaldns.yaml
   ```

   </tabpanel>
   </tabs>

1. A running cluster consumes computing resources. If you no longer need it:

   - [stop](../../operations/manage-cluster#start_or_stop_the_cluster) it to use it later;
   - [delete](../../operations/manage-cluster#delete_cluster) it permanently.
