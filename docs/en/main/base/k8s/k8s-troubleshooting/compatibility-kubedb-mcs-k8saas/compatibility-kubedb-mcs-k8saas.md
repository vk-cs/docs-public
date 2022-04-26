## Problem

The problem of scaling k8aas using kubedb and the command:

```
1 Resource CREATE failed: Wait Condition Timeout: resources\[37\].resources.minion\_wait\_condition: 0 of 1 received
```

#### Symptoms

- VM is being created, but it is not among the nodes.
- The stack is in the CREATE_FAILED status.
- The controller manager works "with brakes".
- The basic components of k8s do not work.

## Decision

#### Temporary

Restarting the k8s master node helps to solve the problem for a short time.

#### Permanent

You need to contact [VK CS Technical Support](http://mchs.mail.ru/help/contact-us) to update the certificates.

### Important

We do not guarantee full compatibility of kubedb with k8saas VK CS, since kubedb uses custom resource definition, which is tied to kube-apiserver.
