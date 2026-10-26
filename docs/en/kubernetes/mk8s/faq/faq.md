# {heading(Frequently asked questions)[id=mk8s-faq]}

{include(/en/_includes/_translated_by_ai_en.md)}

{cut(How to increase the disk size on cluster nodes in the management console?)}

It is impossible to resize the disk of an already created worker node.

To increase the available disk space:

1. [Create a new worker node group](https://cloud.vk.ru/docs/kubernetes/k8s/instructions/manage-node-group#add_group) with the desired disk size.
1. Move the workload to the new node group. For more details, see the [official Kubernetes documentation](https://kubernetes.io/docs/home/).
1. Verify that the services are running correctly.
1. [Delete the old worker node group](https://cloud.vk.ru/docs/kubernetes/k8s/instructions/manage-node-group#udalit_gruppu_uzlov).

{/cut}

{cut(Can a Kubernetes service load balancer receive client IP addresses?)}

Yes, it can.

Use the {linkto(../instructions/addons/advanced-installation/install-advanced-ingress#mk8s-install-advanced-ingress)[text=ingress-nginx]} add-on. This setting is enabled by default when the add-on is installed.

If you use the Ingress NGINX component without installing the ingress-nginx add-on, apply the `use-proxy-protocol` annotation in the Ingress configuration (ConfigMap):

```console
annotations:
     nginx.ingress.kubernetes.io/use-proxy-protocol: "true"
```

The `use-proxy-protocol` annotation enables the proxy protocol. This allows receiving client IP addresses passed through proxy servers and load balancers.

{/cut}

{cut(Can automatic injection of pod constraints via Limit Range be disabled?)}

Limit Range is a policy that is applied when a pod is created. It cannot be disabled, but you can {linkto(../concepts/addons-and-settings/settings#mk8s-settings-requests-and-limits)[text=set]} your own `requests` and `limits` values in the configuration files of the containers included in the pod.
{/cut}

{cut(Is it possible to add nodes with Windows OS to a managed cluster?)}

Adding nodes based on Windows OS is not supported.
{/cut}

{cut(Can the size of a Kubernetes cluster be reduced?)}

Yes, it can. To do this, reduce the number of nodes in a group via the cluster settings. For more details, see the section {linkto(../instructions/scale#mk8s-instructions-scale)[text=Cluster node scaling]}.

{/cut}