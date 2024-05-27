A pod is the minimum computing unit that can be run in a Kubernetes cluster.

A pod runs one or more application containers:

- Typically, a pod consists of a single container, being a wrapper on top of it. This is the most common scenario for using pods in a Kubernetes cluster.
- A rarer case: a pod can consist of multiple containers. These containers can communicate with each other and share resources assigned to the pod (e.g., storage).

  <info>

  - It is not recommended to use multi-container pods unless explicitly needed.
  - It is recommended to [limit compute resource consumption](../resource-limiting) for the pod's container for stable cluster operation.
  
  </info>

From a Kubernetes perspective, one pod is one application instance. If you want to have multiple instances of an application for high availability, use [workload controllers](https://kubernetes.io/docs/concepts/workloads/controllers/), which allow you to replicate pods and control their lifecycle. An example of such a controller is [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/).
