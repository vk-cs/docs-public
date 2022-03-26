## Description
Installing Local DNS Cache allows you to reduce the number of requests to CoreDNS and improve the stability of DNS name resolution. This will avoid using DNAT over UDP while simultaneously resolving to solve the conntrack race condition.

## Configuration file
This manifest will install a local DNS server on each cluster node, which will synchronize with the upstream server over TCP.

Configuration file: ![config.yaml](./assets/config.yaml)

## Apply configuration

You can apply the configuration with the command:
```
kubectl apply -f config.yaml
```