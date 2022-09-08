## Description

Installing Local DNS Cache allows you to reduce the number of requests to CoreDNS and improve the stability of DNS name resolution. This will avoid using DNAT over UDP while simultaneously resolving to solve the conntrack race condition.

## Configuration file

This manifest will install a local DNS server on each cluster node, which will synchronize with the upstream server over TCP.

The configuration file can be downloaded here [link](/docs/ru/main/base/k8s/k8s-network/k8s-localdnscache/assets/config.yaml "download").

## Apply configuration

You can apply the configuration with the command:

```bash
kubectl apply -f config.yaml
```
