# {heading(Typical container operations)[id=k8s-containers]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Working with configurations)[id=k8s-containers-configurations]}

The configuration allows you to determine which Kubernetes cluster `kubectl` interacts with. Detailed information about the structure of the configuration file is provided in the article of the [official Kubernetes documentation](https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters).

### {heading(Getting merged Kubeconfig settings)[id=k8s-containers-kubeconfig-settings]}

```console
kubectl --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml config
```

### {heading(Using multiple Kubeconfig files simultaneously)[id=k8s-containers-kubeconfig-files]}

```console
KUBECONFIG=~/.kube/kubconfig1:~/.kube/kubconfig2
kubectl --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml config view
```

### {heading(Getting a parameter value from the configuration)[id=k8s-containers-parameters]}

To get a parameter value from the configuration, for example a user password, use the `-o` flag.

```console
kubectl --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml config view -o jsonpath='{.users[?(@.name == "<USER>")].user.password}'
```
Here `<USER>` is the user name.

### {heading(Getting the list of kubectl execution contexts)[id=k8s-containers-objects]}

```console
kubectl --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml config get-contexts
```

### {heading(Getting the current execution context)[id=k8s-containers-current]}

```console
kubectl --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml config current-context
```

### {heading(Setting another cluster as the default kubectl execution context)[id=k8s-containers-another-cluster]}

```console
kubectl --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml config use-context <CLUSTER>
```
Here `<CLUSTER>` is the cluster name.

## {heading(Viewing container logs)[id=k8s-containers-logs]}

1. Get the list of current containers:

   ```console
   kubectl --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml get po -n <NAMESPACE>
   ```
   Here `<NAMESPACE>` is the namespace name.

1. Get the list of logs of a specific container:

   ```console
   kubectl --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml -n <NAMESPACE> logs <CONTAINER>
   ```
   Here:

   * `<NAMESPACE>` is the namespace name.
   * `<CONTAINER>` is the container name.

   System containers are located in the `kube-system` namespace. The most commonly used containers:

   * `cluster-autoscaler-*` — log of container scaling events.
     
     Example of viewing the `cluster-autoscaler-*` log:

     ```console
     kubectl --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml -n kube-system logs cluster-autoscaler-7f754489f8-qxsqf
     ...
     I1230 08:33:58.952822       1 filter_out_schedulable.go:90] No schedulable pods
     I1230 08:33:58.952850       1 static_autoscaler.go:334] No unschedulable pods
     I1230 08:33:58.952877       1 static_autoscaler.go:381] Calculating unneeded nodes
     ....84c14039e967,Unschedulable:false,Taints:[]Taint{Taint{Key:CriticalAddonsOnly,Value:True,Effect:NoSchedule,TimeAdded:<nil>,},Taint{Key:dedicated,Value:master,Effect:NoSchedule,TimeAdded:<nil>,},},ConfigSource:nil,PodCIDRs:[],}
     ...
     ```

   * `openstack-cloud-controller-*` — log of interaction of all platform virtualization components. Examples: with Cinder for creating disks, with Nova for creating VMs, Octavia for load balancers, and so on.

     Example of viewing the `openstack-cloud-controller-*` log:
   
     ```console
     kubectl  --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml -n kube-system logs openstack-cloud-controller-manager-nnrlx
     ...
     Ensuring load balancer for service ingress-nginx/nginx-ingress-controller
     E1222 08:23:53.451038       1 service_controller.go:255] error processing service ingress-nginx/nginx-ingress-controller (will retry): failed to ensure load balancer: there are no available nodes for LoadBalancer service ingress-nginx/nginx-ingress-controller
     I1222 08:23:53.451162       1 event.go:255] Event(v1.ObjectReference{Kind:"Service", Namespace:"ingress-nginx", Name:"nginx-ingress-controller", UID:"68bb8ac5-b7f4-4404-94b2-943e7e55ddc9", APIVersion:"v1", ResourceVersion:"953", FieldPath:""}): type: 'Normal' reason: 'EnsuringLoadBalancer' Ensuring load balancer
     ...
     ```