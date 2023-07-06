It is possible to manage Kubernetes resources in Kubernetes cluster via VK Cloud personal account web interface. This functionality serves as alternative to `kubectl` and Kubernetes Dashboard.

## Viewing information about cluster resources

1. Go to [VK Cloud personal account](https://mcs.mail.ru/app/en/).
1. Select the project and region where the necessary cluster is located.
1. Go to **Containers → Kubernetes Clusters**.
1. Click on the name of the desired cluster.
1. Go to the **Cluster resources** tab.

   All the cluster's Kubernetes resources are listed here. They are grouped into **Sections**.

1. Select the section from the drop-down list and click on the necessary category.

Additionally it is possible to:

- View the resources' data by clicking the corresponding element in the **Data** parameter.

- Specify a search request in the **Search** field.

  The entered search request is saved when moving between the sections.

- Filter resources by **Namespaces**.

  The filter is saved when moving between the sections.

  Some Kubernetes resources can not be filtered by the namespace filter. See the information in the list of available resources below.

<details>
<summary>List of available resources</summary>

<!--prettier-ignore-->
| Resource                                            | Comment                                       |
| --------------------------------------------------- | --------------------------------------------- |
| **Cluster section**                                 |                                               |
| Nodes                                               |                                               |
| Namespaces                                          | Namespace filter is not applicable            |
| Events                                              |                                               |
| **Work load section**                               |                                               |
| Pods                                                |                                               |
| Deployments                                         |                                               |
| DaemonSets                                          |                                               |
| StatefulSets                                        |                                               |
| ReplicaSets                                         |                                               |
| HPA                                                 |                                               |
| Jobs                                                |                                               |
| Cron Jobs                                           |                                               |
| **Configuration section**                           |                                               |
| ConfigMaps                                          |                                               |
| Secrets                                             |                                               |
| **Network section**                                 |                                               |
| Services                                            |                                               |
| Endpoins                                            |                                               |
| Ingresses                                           |                                               |
| **Storage section**                                 |                                               |
| Persistent Volume Claims                            |                                               |
| Persistent Volumes                                  | Namespace filter is not applicable            |
| Storage classes                                     | Namespace filter is not applicable            |
| **Access management section**                       |                                               |
| Service Accounts                                    |                                               |
| Cluster Roles                                       | Namespace filter is not applicable            |
| Roles                                               |                                               |
| Cluster Role Bindings                               | Namespace filter is not applicable            |
| Role Bindings                                       |                                               |

</details>
