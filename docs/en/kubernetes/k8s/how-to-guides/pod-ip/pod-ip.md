# {heading(Public IP for a pod without a load balancer)[id=k8s-pip]}

{include(/en/_includes/_translated_by_ai_en.md)}

This how-to guide describes how to grant access to a specific pod in a Kubernetes cluster in the Managed Containers service via a [Floating IP](/en/networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip) without creating a load balancer and without balancing traffic between replicas.

Scenarios where this can be useful:

- Game servers and applications with their own protocol (UDP/TCP);
- STUN/TURN;
- VPN nodes;
- test stands;
- legacy applications that need a direct external address for a single instance.

## {heading(Preparation steps)[id=k8s-pip-prepare]}

1. Contact [technical support](/en/contacts) to connect your project to [SDN Sprut](/en/networks/vnet/concepts/sdn#vnet-sdn-sprut), if this has not been done yet.
1. {linkto(/en/kubernetes/k8s/instructions/create-cluster/create-webui#k8s-create-webui)[text=Create]} a Kubernetes cluster of the current version, if this has not been done yet.
1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Install and configure]} `kubectl`, if this has not been done yet.
1. {linkto(../../connect/kubectl#k8s-kubectl-check-connection)[text=Connect]} to the cluster using `kubectl`.
1. [Install](/en/tools-for-using-services/cli/openstack-cli#openstack-install) the OpenStack client and [authenticate](/en/tools-for-using-services/cli/openstack-cli#openstack-authorize) in the project, if this has not been done yet.
1. Allocate a free Floating IP in the project.

## {heading({counter(pip)}. Get familiar with the solution architecture)[id=k8s-pip-arch]}

```text
Internet
   │  FIP (public address) : port
   ▼
OpenStack worker node port  (node internal IP, e.g. 192.168.200.10)
   │  security group: the required port is allowed
   ▼
Cluster node (worker VM)
   │  hostNetwork / hostPort
   ▼
Pod pinned to this node (nodeSelector/affinity)
```

Key elements:

- Floating IP → node port: the public address is assigned to a specific worker node.
- `hostNetwork` or `hostPort`: the pod listens on a port on the node's network interface, bypassing the Service and the load balancer.
- Pinning the pod to a node: the pod must always land on the node to which the Floating IP is assigned.
- Security group: the node port must allow incoming traffic on the required port.

## {heading({counter(pip)}. Choose one of the solutions)[id=k8s-pip-arch]}

You can use:

- [the solution with a pod on the node network (`hostNetwork`)](#k8s-pip-network);
- [the solution with node port forwarding (`hostPort`)](#k8s-pip-port).

## {heading({counter(pip)}. Use a pod on the node network (hostNetwork))[id=k8s-pip-network]}

### {heading(3.1. Select a node and label it)[id=k8s-pip-network]}

1. Run the command:

   ```bash
   kubectl get nodes -o wide

# note the node name and its INTERNAL-IP, for example:

# test-...-default-ng-0   Ready   ...   192.168.200.10
   ```

1. Label the node to pin the pod to it:

   ```bash
   kubectl label node <NODE_NAME> public-endpoint=true
   ```

### {heading(3.2. Deploy a pod pinned to the node)[id=k8s-pip-deploy]}

1. Create the `app-hostnetwork.yaml` manifest:

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: public-app
     namespace: public-demo
   spec:
     replicas: 1
     strategy:
       type: Recreate                      # hostNetwork: avoid replicas overlapping on the node port
     selector:
       matchLabels:
         app: public-app
     template:
       metadata:
         labels:
           app: public-app
       spec:
         hostNetwork: true                 # the pod listens on ports on the node IP
         dnsPolicy: ClusterFirstWithHostNet # so that in-cluster DNS works
         nodeSelector:
           public-endpoint: "true"         # only on the node with the FIP
         containers:
           - name: app

# FULL image name

# and an image from a registry accessible to the node (or cached)
             image: docker.io/library/nginx:1.27
             imagePullPolicy: IfNotPresent
             ports:
               - containerPort: 80          # = port 80 on the node
   ```

1. Create the `public-demo` namespace and apply the manifest:

   ```bash
   kubectl create namespace public-demo
   kubectl apply -f app-hostnetwork.yaml
   kubectl -n public-demo get pod -o wide   # the pod must be on the selected node, pod IP = node IP
   ```

When using `hostNetwork`, the container listens on the port directly on the node. Make sure the port (`80` here) is not occupied by other node components. There must be exactly one replica, otherwise multiple pods on the same node will conflict over the port.

### {heading(3.3. Assign a Floating IP to the node)[id=k8s-pip-ip]}

Find the OpenStack port of the node by its internal IP and attach the Floating IP in one of the following ways:

{tabs}
{tab(Management console)}

1. [Go](https://msk.cloud.vk.ru/app/) to the {var(cloud)} management console.
1. Select the project where the desired IP address is located.
1. Go to **Virtual networks** → **IP addresses**.
1. Go to the **Floating IP** tab.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the Floating IP address whose **Internal IP** column shows `Not attached`, and select **Attach IP**.
1. From the drop-down list, select the OpenStack port with the internal IP address to which the attachment is performed.
1. Click **Confirm**.

{/tab}

{tab(OpenStack CLI)}

Run the commands:

```bash

# node port by its INTERNAL-IP
openstack port list --fixed-ip ip-address=192.168.200.10 -c ID -c Fixed_IP_Addresses

# if necessary, allocate a new FIP in the project (from the ext-net external network)
openstack floating ip create <EXTERNAL_NET> # e.g. ext-net / internet

# attach the FIP to the node port
openstack floating ip set <FIP_ADDRESS_or_ID> --port <PORT_ID>
```
{/tab}
{/tabs}

For more information, see [Floating IP addresses](/en/networks/vnet/instructions/ip/floating-ip#vnet-floating-ip).

### {heading(3.4. Open the port in a security group)[id=k8s-pip-sec]}

The node port is assigned the `<CLUSTER_NAME>-minion` security group. Modifying the default cluster rules is risky, so it is recommended to create a separate security group with the required rule and additionally assign it to the node port:

```bash
openstack security group create pub-app-sg --description "Public access to public-app"
openstack security group rule create pub-app-sg \
  --ingress --protocol tcp --dst-port 80 --remote-ip 0.0.0.0/0

# add the group to the node port (without removing existing ones)
openstack port set <PORT_ID> --security-group pub-app-sg
```

Where possible, restrict `--remote-ip` to trusted networks instead of `0.0.0.0/0`.

### {heading(3.5. Verify external access)[id=k8s-pip-check]}

Run the command:

```bash
curl http://<FIP_ADDRESS>/
```

The nginx page should be returned.

## {heading({counter(pip)}. Use node port forwarding (hostPort))[id=k8s-pip-port]}

If a full `hostNetwork` is not needed (the pod remains on the CNI network, but a single port is published on the node), use `hostPort`. This is more precise and does not require `ClusterFirstWithHostNet`. To do this:

1. Create the `app-hostport.yaml` manifest:

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: public-app
     namespace: public-demo
   spec:
     replicas: 1
     selector:
       matchLabels:
         app: public-app
     template:
       metadata:
         labels:
           app: public-app
       spec:
         nodeSelector:
           public-endpoint: "true"
         containers:
           - name: app
             image: nginx:1.27
             ports:
               - containerPort: 80
                 hostPort: 80        # node port 80 -> container port 80
   ```

1. Repeat the steps from sections **3.3–3.5**.

For the "one pod on each node" scenario, use a `DaemonSet` with `hostPort` instead of a `Deployment` and assign a Floating IP to each node — but in that case it will be not one public address but several independent ones.

## {heading(Delete unused resources)[id=k8s-pip-port]}

A running cluster is billed and consumes computing resources. If you no longer need the Kubernetes resources created for completing this how-to guide, delete them:

1. Detach and delete the Floating IP:

   ```bash
   openstack floating ip unset <FIP_ID> --port
   openstack floating ip delete <FIP_ID>
   ```

1. Remove the security group from the port and delete it:

   ```console
   openstack port unset <PORT_ID> --security-group pub-app-sg
   openstack security group delete pub-app-sg
   ```

1. Delete the workload:

   ```console
   kubectl delete namespace public-demo
   kubectl label node <NODE_NAME> public-endpoint-
   ```
   
{include(/en/_includes/_delete-test-cluster-short.md)}

## {heading(Recommendations on how to reliably pin a public address to a pod)[id=k8s-pip-recs]}

To ensure that the Floating IP does not remain on the previous node when the pod is recreated and moved to another node, use these precautions:

1. Set `nodeSelector`, `nodeAffinity` on the node label, as described in the sections above — the pod will always be on the node with the Floating IP.
1. Do not use an autoscaling group for this node, or pin the Floating IP to a specific stable node. When the node is replaced, reassign the Floating IP to the new port.
1. Set `replicas: 1` for `hostNetwork`/`hostPort`, otherwise there will be a conflict over the node port.
1. Plan the Floating IP migration: when recreating the node, run the command:

   ```console
   openstack floating ip set <FIP> --port <new_PORT_ID>
   ```

   This can be automated with an operator/script that tracks the node with the `public-endpoint=true` label.
1. Take security groups into account: when recreating the node, assign your `pub-app-sg` to its port.

## {heading(Limitations)[id=k8s-pip-limitations]}

- No fault tolerance or load balancing — this is a deliberate choice of this scenario: one pod on one node. Node failure means loss of access until the Floating IP is moved.
- The Floating IP does not follow the pod automatically — the binding is to the node port, not to the pod.
- Node ports are unique — on one node, two pods cannot be assigned the same `hostPort`/`hostNetwork` port.
- `hostNetwork` reduces isolation — the pod sees the node's network stack. Use it only for trusted workloads and restrict permissions (`securityContext`).
- A direct Floating IP on a pod is not available in the standard VK Cloud CNI (Calico/Cilium) — only via the node.
- It is not recommended to modify the cluster security groups (`<cluster>-minion`) — use a separate group.