To ensure that a domain name is always resolved to a given IP address, you need to add a static DNS record to the cluster DNS service.

This article shows an example of how to add a domain and IP address to the cluster DNS service using the [CoreDNS](https://coredns.io/manual/toc/) resource.

## Before you start

1. [Create](../../../service-management/create-cluster) a Kubernetes cluster of the most actual version.

   Choose the parameters of the cluster as you wish.

1. [Make sure](../../../connect/kubectl) you can connect to the cluster using `kubectl`.

## 1. Add host address to CoreDNS resource ConfigMap

1. Run the command:

   ```bash
   kubectl edit cm coredns -n kube-system
   ```

   The CoreDNS resource ConfigMap will open.
1. Add the domain and IP address to the resource description before the `.:53` block, as shown below:
  
   ```yaml
   apiVersion: v1
   data:
      Corefile: |
         myhost.com {
            hosts {
               8.8.8.8 myhost.com
               fallthrough
            }
         }
         .:53 {
            errors
            log
            health
            kubernetes cluster.local 10.254.0.0/16 10.100.0.0/16 {
               pods insecure
            }
            prometheus :9153
            forward . /etc/resolv.conf
            cache 30
         }
   ```

   Here:

   - `8.8.8.8` — the IP address of the domain being added.
   - `myhost.com` — the host domain name.
   - `fallthrough` — the parameter that allows to continue processing the request in the next plugins, if the domain is not found in the current zone.

   CoreDNS will reload the configuration automatically within 1-2 minutes. Wait for the changes to apply.

## 2. Check configuration application

1. Create a temporary pod:

   ```bash
   kubectl run -it --rm dns-test --image=busybox:1.28 --restart=Never -- nslookup myhost.com
   ```

   Expected output:

   ```bash
   Server:    10.254.0.10
   Address 1: 10.254.0.10 kube-dns.kube-system.svc.cluster.local

   Name:      myhost.com
   Address 1: 8.8.8.8
   ```
   
1. If the response returns a different IP address for host `myhost.com`:

   1. Restart all CoreDNS pods:

      ```bash
      kubectl rollout restart daemonset/coredns -n kube-system
      ```

      The DaemonSet controller will recreate them based on the changed configuration.

   1. Repeat creating a temporary pod to test DNS:
   
      ```bash
      kubectl run -it --rm dns-test --image=busybox:1.28 --restart=Never -- nslookup myhost.com
      ```

## Delete unused resources

The running cluster consumes computing resources. If you no longer need it:

- [stop](../../../service-management/manage-cluster#start_or_stop_cluster) it to use it later.
- [delete](../../../service-management/manage-cluster#delete_cluster) it permanently.
