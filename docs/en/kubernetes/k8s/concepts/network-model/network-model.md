# {heading(Kubernetes network model)[id=k8s-network-model]}

{include(/en/_includes/_translated_by_ai_en.md)}

Kubernetes is designed for sharing machines between applications. As a rule, sharing computers requires that two applications do not try to use the same ports.

Each pod gets its own IP address. This creates a clean, backward-compatible model in which pods can be treated like VMs or physical hosts in terms of port allocation, naming, service discovery, load balancing, application configuration, and migration.

Kubernetes imposes the following fundamental requirements on any network implementation (prohibiting any policies of intentional network segmentation):

* Pods on a node can communicate with all pods on all nodes without using NAT.
* Agents on a node, such as system daemons, can communicate with all pods on that node.
* For platforms that support running pods in the host network, such as Linux, pods in the host network of a node can communicate with all pods on all nodes without NAT.

Kubernetes IP addresses exist in the pod scope — containers within a pod share network namespaces, including their IP addresses. All containers inside a pod can reach each other's ports via `localhost`. Containers inside a pod must coordinate port usage.