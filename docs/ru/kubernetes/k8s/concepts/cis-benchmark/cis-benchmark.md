[CIS Benchmarks](https://learn.cisecurity.org/benchmarks), или контрольные показатели CIS, — это тщательно разработанная и постоянно обновляемая система рекомендаций, призванная обеспечить наилучшую защиту систем, сервисов и приложений от киберугроз. Эти рекомендации разрабатывает и поддерживает некоммерческая организация [Center for Internet Security (CIS)](https://www.cisecurity.org/), которая специализируется на кибербезопасности. Следование стандартам CIS позволяет компаниям минимизировать потенциальные уязвимости, улучшить возможности обнаружения и реагирования на киберинциденты и таким образом повысить надежность своей системы безопасности.

Контрольные показатели CIS доступны для многих IT-систем, в том числе и для [Kubernetes](https://www.cisecurity.org/benchmark/kubernetes/). Полный список систем и рекомендаций можно найти в [официальной документации](https://learn.cisecurity.org/benchmarks). 

Для кластеров Kubernetes [версий 1.28 – 1.31](../../concepts/versions/version-support), доступных на платформе VK Cloud, были проведены тесты контрольных показателей CIS для Kubernetes. В ходе тестирования использовался инструмент с открытым исходным кодом [kube-bench](https://github.com/aquasecurity/kube-bench), который проверяет соответствие кластера Kubernetes контрольным показателям CIS. За основу для тестирования был взят официальный документ [CIS Kubernetes Benchmark v.1.10](https://www.cisecurity.org/benchmark/kubernetes/), в котором описан каждый из этапов тестирования, рекомендации и ожидаемые результаты. 

Платформа VK Cloud обеспечивает защиту master-узлов, но в остальном пользовательские настройки кластеров могут отличаться. Такие настройки не учитываются в тестировании и находятся в зоне ответственности пользователя, поэтому часть тестов имеют результаты `WARN` или `FAIL` с соответствующими комментариями. Вы можете провести собственное тестирование контрольных показателей CIS, чтобы обеспечить максимальную безопасность своих кластеров Kubernetes.

Таким образом, тестирование показало, что кластеры Kubernetes на платформе VK Cloud соответствуют рекомендациям CIS Benchmarks. Подробные результаты с комментариями к отдельным этапам тестирования:

{cut(Для кластеров версий 1.28 – 1.29)}

[cols="1,3a,1,2a", options="header"]
|===

| Статус
| Название
| Тип запуска
| Комментарий

4+| **1. Control Plane Security Configuration**

| PASS
| 1.1.1. Ensure that the API server pod specification file permissions are set to `600` or more restrictive 	
| Automated
|

| PASS
| 1.1.2. Ensure that the API server pod specification file ownership is set to `root:root` 	
| Automated
|

| PASS
| 1.1.3. Ensure that the controller manager pod specification file permissions are set to `600` or more restrictive 	
| Automated
|

| PASS
| 1.1.4. Ensure that the controller manager pod specification file ownership is set to `root:root` 	
| Automated
|

| PASS
| 1.1.5. Ensure that the scheduler pod specification file permissions are set to `600` or more restrictive 	
| Automated
|

| PASS
| 1.1.6. Ensure that the scheduler pod specification file ownership is set to `root:root` 	
| Automated
|

| PASS
| 1.1.7. Ensure that the etcd pod specification file permissions are set to `600` or more restrictive 	
| Automated
|

| PASS
| 1.1.8. Ensure that the etcd pod specification file ownership is set to `root:root` 	
| Automated
|

| PASS	 
| 1.1.9. Ensure that the Container Network Interface file permissions are set to `600` or more restrictive 	
| Manual
| Указанные ограничения установлены

| PASS	 
| 1.1.10. Ensure that the Container Network Interface file ownership is set to `root:root` 	
| Manual
| Указанные ограничения установлены

| PASS	 
| 1.1.11. Ensure that the etcd data directory permissions are set to `700` or more restrictive 	
| Automated
| Указанные ограничения установлены

| PASS	 
| 1.1.12. Ensure that the etcd data directory ownership is set to `etcd:etcd` 	
| Automated
| Указанные ограничения установлены

| PASS	 
| 1.1.13. Ensure that the default administrative credential file permissions are set to `600` 	
| Automated
| Файлы `admin.conf` и `super-admin.conf` не используются

| PASS	 
| 1.1.14. Ensure that the default administrative credential file ownership is set to `root:root` 	
| Automated
| Файлы `admin.conf` и `super-admin.conf` не используются

| PASS	 
| 1.1.15. Ensure that the `scheduler.conf` file permissions are set to `600` or more restrictive 	
| Automated
|

| PASS	 
| 1.1.16. Ensure that the `scheduler.conf` file ownership is set to `root:root` 	
| Automated
|

| PASS	 
| 1.1.17. Ensure that the `controller-manager.conf` file permissions are set to `600` or more restrictive
| Automated
|

| PASS	 
| 1.1.18. Ensure that the `controller-manager.conf` file ownership is set to `root:root`
| Automated
|

| PASS
| 1.1.19. Ensure that the Kubernetes PKI directory and file ownership is set to `root:root`
| Automated
|

| PASS
| 1.1.20. Ensure that the Kubernetes PKI certificate file permissions are set to `600` or more restrictive
| Manual
|

| PASS
| 1.1.21. Ensure that the Kubernetes PKI key file permissions are set to `600`
| Manual
|

4+| **1.2. API Server**

| WARN
| 1.2.1. Ensure that the `--anonymous-auth` argument is set to `false`
| Manual
|

| PASS
| 1.2.2. Ensure that the `--token-auth-file` parameter is not set
| Automated
|

| WARN
| 1.2.3. Ensure that the `--DenyServiceExternalIPs` is set
| Manual
|

| PASS
| 1.2.4. Ensure that the `--kubelet-client-certificate` and `--kubelet-client-key` arguments are set as appropriate
| Automated
|

| PASS
| 1.2.5. Ensure that the `--kubelet-certificate-authority` argument is set as appropriate
| Automated
|

| PASS
| 1.2.6. Ensure that the `--authorization-mode` argument is not set to `AlwaysAllow`
| Automated
|

| PASS
| 1.2.7. Ensure that the `--authorization-mode` argument includes `Node`
| Automated
|

| PASS
| 1.2.8. Ensure that the `--authorization-mode` argument includes `RBAC`
| Automated
|

| WARN
| 1.2.9. Ensure that the admission control plugin `EventRateLimit` is set
| Manual
|

| PASS
| 1.2.10. Ensure that the admission control plugin `AlwaysAdmit is` not set
| Automated
|

| WARN
| 1.2.11. Ensure that the admission control plugin `AlwaysPullImages` is set
| Manual
|

| PASS
| 1.2.12. Ensure that the admission control plugin `ServiceAccount` is set
| Automated
|

| PASS
| 1.2.13. Ensure that the admission control plugin `NamespaceLifecycle` is set
| Automated
|

| PASS
| 1.2.14. Ensure that the admission control plugin `NodeRestriction` is set
| Automated
|

| PASS
| 1.2.15. Ensure that the `--profiling` argument is set to `false`
| Automated
|

| PASS
| 1.2.16. Ensure that the `--audit-log-path` argument is set
| Automated
|

| PASS
| 1.2.17. Ensure that the `--audit-log-maxage` argument is set to `30` or as appropriate
| Automated
|

| PASS
| 1.2.18. Ensure that the `--audit-log-maxbackup` argument is set to `10` or as appropriate
| Automated
|

| PASS
| 1.2.19. Ensure that the `--audit-log-maxsize` argument is set to `100` or as appropriate
| Automated
|

| PASS
| 1.2.20. Ensure that the `--request-timeout` argument is set as appropriate
| Manual
|

| PASS
| 1.2.21. Ensure that the `--service-account-lookup` argument is set to `true`
| Automated
|

| PASS
| 1.2.22. Ensure that the `--service-account-key-file` argument is set as appropriate 	
| Automated
|

| PASS
| 1.2.23. Ensure that the `--etcd-certfile` and `--etcd-keyfile` arguments are set as appropriate
| Automated
|

| PASS
| 1.2.24. Ensure that the `--tls-cert-file` and `--tls-private-key-file` arguments are set as appropriate 	
| Automated
|

| PASS
| 1.2.25. Ensure that the `--client-ca-file` argument is set as appropriate 	
| Automated
|

| PASS
| 1.2.26. Ensure that the `--etcd-cafile` argument is set as appropriate
| Automated
|

| PASS
| 1.2.27. Ensure that the `--encryption-provider-config` argument is set as appropriate
| Manual
|

| PASS
| 1.2.28. Ensure that encryption providers are appropriately configured
| Manual
|

| PASS
| 1.2.29. Ensure that the API Server only makes use of Strong Cryptographic Ciphers
| Manual
|

4+| **1.3. Controller Manager**

| PASS
| 1.3.1. Ensure that the `--terminated-pod-gc-threshold` argument is set as appropriate 	
| Manual
|

| PASS
| 1.3.2. Ensure that the `--profiling` argument is set to `false`
| Automated
|

| PASS
| 1.3.3. Ensure that the `--use-service-account-credentials` argument is set to `true`
| Automated
|

| PASS
| 1.3.4. Ensure that the `--service-account-private-key-file` argument is set as appropriate
| Automated
|

| PASS
| 1.3.5. Ensure that the `--root-ca-file` argument is set as appropriate
| Automated
|

| PASS
| 1.3.6. Ensure that the `RotateKubeletServerCertificate` argument is set to `true`
| Automated
|

| PASS
| 1.3.7. Ensure that the `--bind-address` argument is set to `127.0.0.1`
| Automated
|

4+| **1.4. Scheduler**

| PASS
| 1.4.1. Ensure that the `--profiling` argument is set to `false`
| Automated
|

| PASS
| 1.4.2. Ensure that the `--bind-address` argument is set to `127.0.0.1`
| Automated
|

4+| **2. Etcd Node Configuration**

| PASS
| 2.1. Ensure that the `--cert-file` and `--key-file` arguments are set as appropriate
| Automated
| Параметры указаны в файле конфигурации

| PASS
| 2.2. Ensure that the `--client-cert-auth` argument is set to true
| Automated
| Параметр указан в файле конфигурации

| PASS
| 2.3. Ensure that the `--auto-tls` argument is not set to `true` 	
| Automated
|

| PASS
| 2.4. Ensure that the `--peer-cert-file` and `--peer-key-file` arguments are set as appropriate
| Automated
| Параметры указаны в файле конфигурации

| PASS
| 2.5. Ensure that the `--peer-client-cert-auth` argument is set to `true`
| Automated
| Параметр указан в файле конфигурации

| PASS
| 2.6. Ensure that the -`-peer-auto-tls` argument is not set to `true`
| Automated
|

| PASS
| 2.7. Ensure that a unique Certificate Authority is used for etcd
| Manual
|

4+| **3. Control Plane Configuration**

4+| **3.1. Authentication and Authorization**

| WARN
| 3.1.1. Client certificate authentication should not be used for users
| Manual
|

| WARN
| 3.1.2. Service account token authentication should not be used for users
| Manual
|

| WARN
| 3.1.3. Bootstrap token authentication should not be used for users
| Manual
|

4+| **3.2. Logging**

| WARN
| 3.2.1. Ensure that a minimal audit policy is created
| Manual
|

| WARN
| 3.2.2. Ensure that the audit policy covers key security concerns 	
| Manual
|

4+| **4. Worker Node Security Configuration**

4+| **4.1. Worker Node Configuration Files**

| PASS
| 4.1.1. Ensure that the kubelet service file permissions are set to `600` or more restrictive
| Automated
|

| PASS
| 4.1.2. Ensure that the kubelet service file ownership is set to `root:root`
| Automated
|

| PASS
| 4.1.3. If proxy kubeconfig file exists ensure permissions are set to `600` or more restrictive
| Manual
|

| PASS
| 4.1.4. If proxy kubeconfig file exists ensure ownership is set to `root:root`
| Manual
|

| PASS
| 4.1.5. Ensure that the `--kubeconfig` `kubelet.conf` file permissions are set to `600` or more restrictive
| Automated
|

| PASS
| 4.1.6. Ensure that the `--kubeconfig` `kubelet.conf` file ownership is set to `root:root`
| Automated
|

| PASS
| 4.1.7. Ensure that the certificate authorities file permissions are set to `600` or more restrictive
| Manual
|

| PASS
| 4.1.8. Ensure that the client certificate authorities file ownership is set to `root:root`
| Manual
|

| PASS
| 4.1.9. If the kubelet `config.yaml` configuration file is being used validate permissions set to `600` or more restrictive
| Automated
|

| PASS
| 4.1.10. If the kubelet `config.yaml` configuration file is being used validate file ownership is set to `root:root`
| Automated
|

4+| **4.2. Kubelet**

| PASS
| 4.2.1. Ensure that the `--anonymous-auth` argument is set to `false`
| Automated
|

| PASS
| 4.2.2. Ensure that the `--authorization-mode` argument is not set to `AlwaysAllow`
| Automated
|

| PASS
| 4.2.3. Ensure that the `--client-ca-file` argument is set as appropriate
| Automated
|

| PASS
| 4.2.4. Verify that the `--read-only-port` argument is set to `0`
| Manual
|

| PASS
| 4.2.5. Ensure that the `--streaming-connection-idle-timeout` argument is not set to `0`
| Manual
|

| PASS
| 4.2.6. Ensure that the `--make-iptables-util-chains` argument is set to `true`
| Automated
|

| PASS
| 4.2.7. Ensure that the `--hostname-override` argument is not set
| Manual
|

| PASS
| 4.2.8. Ensure that the `eventRecordQPS` argument is set to a level which ensures appropriate event capture
| Manual
|

| PASS
| 4.2.9. Ensure that the `--tls-cert-file` and `--tls-private-key-file` arguments are set as appropriate
| Manual
|

| PASS
| 4.2.10. Ensure that the `--rotate-certificates` argument is not set to `false`
| Automated
|

| PASS
| 4.2.11. Verify that the `RotateKubeletServerCertificate` argument is set to true
| Manual
|

| PASS
| 4.2.12. Ensure that the Kubelet only makes use of Strong Cryptographic Ciphers
| Manual
|

| PASS
| 4.2.13. Ensure that a limit is set on pod PIDs
| Manual
|

4+| **4.3. kube-proxy**

| FAIL
| 4.3.1. Ensure that the kube-proxy metrics service is bound to localhost
| Automated
| Соответствие требованию влияет на работу аддона Kube Prometheus Stack

4+| **5. Kubernetes Policies**

4+| **5.1. RBAC and Service Accounts**

| FAIL
| 5.1.1. Ensure that the `cluster-admin` role is only used where required
| Automated
| Зависит от настроек окружения пользователем

| FAIL
| 5.1.2. Minimize access to secrets
| Automated
| Зависит от настроек окружения пользователем

| FAIL
| 5.1.3. Minimize wildcard use in Roles and ClusterRoles
| Automated
| Зависит от настроек окружения пользователем

| FAIL
| 5.1.4. Minimize access to create pods
| Automated
| Зависит от настроек окружения пользователем

| FAIL
| 5.1.5. Ensure that default service accounts are not actively used
| Automated
| Зависит от настроек окружения пользователем

| FAIL
| 5.1.6. Ensure that Service Account Tokens are only mounted where necessary
| Automated
| Зависит от настроек окружения пользователем

| WARN
| 5.1.7 Avoid use of `system:masters` group
| Manual
|

| WARN
| 5.1.8. Limit use of the `Bind`, `Impersonate` and `Escalate` permissions in the Kubernetes cluster
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.1.9. Minimize access to create persistent volumes
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.1.10. Minimize access to the proxy sub-resource of nodes
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.1.11. Minimize access to the approval sub-resource of `certificatesigningrequests` objects
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.1.12. Minimize access to webhook configuration objects
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.1.13. Minimize access to the service account token creation
| Manual
| Зависит от настроек окружения пользователем

4+| **5.2. Pod Security Standards**

| WARN
| 5.2.1. Ensure that the cluster has at least one active policy control mechanism in place
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.2.2. Minimize the admission of privileged containers
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.2.3. Minimize the admission of containers wishing to share the host process ID namespace
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.2.4. Minimize the admission of containers wishing to share the host IPC namespace
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.2.5. Minimize the admission of containers wishing to share the host network namespace
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.2.6. Minimize the admission of containers with `allowPrivilegeEscalation`
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.2.7. Minimize the admission of root containers
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.2.8. Minimize the admission of containers with the `NET_RAW` capability
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.2.9. Minimize the admission of containers with added capabilities
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.2.10. Minimize the admission of containers with capabilities assigned
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.2.11. Minimize the admission of Windows HostProcess containers
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.2.12. Minimize the admission of HostPath volumes
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.2.13. Minimize the admission of containers which use HostPorts
| Manual
| Зависит от настроек окружения пользователем

4+| **5.3. Network Policies and CNI**

| PASS
| 5.3.1. Ensure that the CNI in use supports `NetworkPolicies`
| Manual
| Поддерживается

| WARN
| 5.3.2. Ensure that all Namespaces have `NetworkPolicies` defined
| Manual
| Зависит от настроек окружения пользователем

4+| **5.4. Secrets Management**

| WARN
| 5.4.1. Prefer using Secrets as files over Secrets as environment variables
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.4.2. Consider external secret storage
| Manual
| Зависит от настроек окружения пользователем

4+| **5.5. Extensible Admission Control**

| WARN
| 5.5.1. Configure Image Provenance using `ImagePolicyWebhook` admission controller
| Manual
| Зависит от настроек окружения пользователем

4+| **5.7. General Policies**

| WARN
| 5.7.1. Create administrative boundaries between resources using namespaces
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.7.2. Ensure that the `seccomp` profile is set to `docker/default` in your Pod definitions
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.7.3. Apply SecurityContext to your Pods and Containers
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.7.4. The default namespace should not be used
| Manual
| Зависит от настроек окружения пользователем
|===


{/cut}

{cut(Для кластеров версий 1.30 – 1.31)}

[cols="1,3a,1,2a", options="header"]
|===

| Статус
| Название
| Тип запуска
| Описание

4+| **1. Control Plane Security Configuration**

| PASS
| 1.1.1. Ensure that the API server pod specification file permissions are set to `600` or more restrictive
| Automated
|

| PASS
| 1.1.2. Ensure that the API server pod specification file ownership is set to `root:root`
| Automated
|

| PASS
| 1.1.3. Ensure that the controller manager pod specification file permissions are set to `600` or more restrictive
| Automated
|

| PASS
| 1.1.4. Ensure that the controller manager pod specification file ownership is set to `root:root`
| Automated
|

| PASS
| 1.1.5. Ensure that the scheduler pod specification file permissions are set to `600` or more restrictive
| Automated
|

| PASS
| 1.1.6. Ensure that the scheduler pod specification file ownership is set to `root:root`
| Automated
|

| PASS
| 1.1.7. Ensure that the etcd pod specification file permissions are set to `600` or more restrictive
| Automated
|

| PASS
| 1.1.8. Ensure that the etcd pod specification file ownership is set to `root:root`
| Automated
|

| PASS
| 1.1.9. Ensure that the Container Network Interface file permissions are set to `600` or more restrictive
| Manual
| Указанные ограничения установлены

| PASS
| 1.1.10. Ensure that the Container Network Interface file ownership is set to `root:root`
| Manual
| Указанные ограничения установлены

| PASS
| 1.1.11. Ensure that the etcd data directory permissions are set to `700` or more restrictive
| Automated
| Указанные ограничения установлены

| PASS
| 1.1.12. Ensure that the etcd data directory ownership is set to `etcd:etcd`
| Automated
| Указанные ограничения установлены

| PASS
| 1.1.13. Ensure that the default administrative credential file permissions are set to `600`
| Automated
| Файлы `admin.conf` и `super-admin.conf` не используются

| PASS
| 1.1.14. Ensure that the default administrative credential file ownership is set to `root:root`
| Automated
| Файлы `admin.conf` и `super-admin.conf` не используются

| PASS
| 1.1.15. Ensure that the `scheduler.conf` file permissions are set to `600` or more restrictive
| Automated
|

| PASS
| 1.1.16. Ensure that the `scheduler.conf` file ownership is set to `root:root`
| Automated
|

| PASS
| 1.1.17. Ensure that the `controller-manager.conf` file permissions are set to `600` or more restrictive
| Automated
|

| PASS
| 1.1.18. Ensure that the `controller-manager.conf` file ownership is set to `root:root`
| Automated
|

| PASS
| 1.1.19. Ensure that the Kubernetes PKI directory and file ownership is set to `root:root`
| Automated
|

| PASS
| 1.1.20. Ensure that the Kubernetes PKI certificate file permissions are set to `600` or more restrictive
| Manual
|

| PASS
| 1.1.21. Ensure that the Kubernetes PKI key file permissions are set to `600`
| Manual
|

4+| **1.2. API Server**

| WARN
| 1.2.1. Ensure that the `--anonymous-auth` argument is set to `false`
| Manual
|

| PASS
| 1.2.2. Ensure that the `--token-auth-file` parameter is not set
| Automated
|

| WARN
| 1.2.3. Ensure that the `--DenyServiceExternalIPs` is set
| Manual
|

| PASS
| 1.2.4. Ensure that the `--kubelet-client-certificate` and `--kubelet-client-key` arguments are set as appropriate
| Automated
|

| PASS
| 1.2.5. Ensure that the `--kubelet-certificate-authority` argument is set as appropriate
| Automated
|

| PASS
| 1.2.6. Ensure that the `--authorization-mode` argument is not set to `AlwaysAllow`
| Automated
|

| PASS
| 1.2.7. Ensure that the `--authorization-mode` argument includes `Node
| Automated`
|

| PASS
| 1.2.8. Ensure that the `--authorization-mode` argument includes `RBAC`
| Automated
|

| WARN
| 1.2.9. Ensure that the admission control plugin `EventRateLimit` is set
| Manual
|

| PASS
| 1.2.10. Ensure that the admission control plugin `AlwaysAdmit` is not set
| Automated
|

| WARN
| 1.2.11. Ensure that the admission control plugin `AlwaysPullImages` is set
| Manual
|

| PASS
| 1.2.12. Ensure that the admission control plugin `ServiceAccount` is set
| Automated
|

| PASS
| 1.2.13. Ensure that the admission control plugin `NamespaceLifecycle` is set
| Automated
|

| PASS
| 1.2.14. Ensure that the admission control plugin `NodeRestriction` is set
| Automated
|

| PASS
| 1.2.15. Ensure that the `--profiling` argument is set to `false`
| Automated
|

| PASS
| 1.2.16. Ensure that the `--audit-log-path` argument is set
| Automated
|

| PASS
| 1.2.17. Ensure that the `--audit-log-maxage` argument is set to 30 or as appropriate
| Automated
|

| PASS
| 1.2.18. Ensure that the `--audit-log-maxbackup` argument is set to `10` or as appropriate
| Automated
|

| PASS
| 1.2.19. Ensure that the `--audit-log-maxsize` argument is set to `100` or as appropriate
| Automated
|

| PASS
| 1.2.20. Ensure that the `--request-timeout` argument is set as appropriate
| Manual
|

| PASS
| 1.2.21. Ensure that the `--service-account-lookup` argument is set to `true`
| Automated
|

| PASS
| 1.2.22. Ensure that the `--service-account-key-file` argument is set as appropriate
| Automated
|

| PASS
| 1.2.23. Ensure that the `--etcd-certfile` and `--etcd-keyfile` arguments are set as appropriate
| Automated
|

| PASS
| 1.2.24. Ensure that the `--tls-cert-file` and `--tls-private-key-file` arguments are set as appropriate
| Automated
|

| PASS
| 1.2.25. Ensure that the `--client-ca-file` argument is set as appropriate
| Automated
|

| PASS
| 1.2.26. Ensure that the `--etcd-cafile` argument is set as appropriate
| Automated
|

| PASS
| 1.2.27. Ensure that the `--encryption-provider-config` argument is set as appropriate
| Manual
|

| PASS
| 1.2.28. Ensure that encryption providers are appropriately configured
| Manual
|

| PASS
| 1.2.29. Ensure that the API Server only makes use of Strong Cryptographic Ciphers
| Manual
|

4+| **1.3. Controller Manager**

| PASS
| 1.3.1. Ensure that the `--terminated-pod-gc-threshold` argument is set as appropriate
| Manual
|

| PASS
| 1.3.2. Ensure that the `--profiling` argument is set to `false`
| Automated
|

| PASS
| 1.3.3. Ensure that the `--use-service-account-credentials` argument is set to `true`
| Automated
|

| PASS
| 1.3.4. Ensure that the `--service-account-private-key-file` argument is set as appropriate
| Automated
|

| PASS
| 1.3.5. Ensure that the `--root-ca-file` argument is set as appropriate
| Automated
|

| PASS
| 1.3.6. Ensure that the `RotateKubeletServerCertificate` argument is set to `true`
| Automated
|

| PASS
| 1.3.7. Ensure that the `--bind-address` argument is set to `127.0.0.1`
| Automated
|

4+| **1.4. Scheduler**

| PASS
| 1.4.1. Ensure that the `--profiling` argument is set to `false`
| Automated
|

| PASS
| 1.4.2. Ensure that the `--bind-address` argument is set to `127.0.0.1`
| Automated
|

4+| **2. Etcd Node Configuration**

| PASS
| 2.1. Ensure that the `--cert-file` and `--key-file` arguments are set as appropriate
| Automated
|Параметры указаны в файле конфигурации

| PASS
| 2.2. Ensure that the `--client-cert-auth` argument is set to `true`
| Automated
| Параметр указан в файле конфигурации

| PASS
| 2.3. Ensure that the `--auto-tls` argument is not set to `true`
| Automated
|

| PASS
| 2.4. Ensure that the `--peer-cert-file` and `--peer-key-file` arguments are set as appropriate
| Automated
| Параметры указаны в файле конфигурации

| PASS
| 2.5. Ensure that the `--peer-client-cert-auth` argument is set to `true`
| Automated
| Параметр указан в файле конфигурации

| PASS
| 2.6. Ensure that the `--peer-auto-tls` argument is not set to `true`
| Automated
|

| PASS
| 2.7. Ensure that a unique Certificate Authority is used for etcd
| Manual
|

4+| **3. Control Plane Configuration**

4+| **3.1. Authentication and Authorization**

| PASS
| 3.1.1. Client certificate authentication should not be used for users
| Manual
|

| WARN
| 3.1.2. Service account token authentication should not be used for users
| Manual
|

| WARN
| 3.1.3. Bootstrap token authentication should not be used for users
| Manual
|

4+| **3.2. Logging**

| WARN
| 3.2.1. Ensure that a minimal audit policy is created
| Manual
|

| WARN
| 3.2.2. Ensure that the audit policy covers key security concerns
| Manual
|

4+| **4. Worker Node Security Configuration**

4+| **4.1. Worker Node Configuration Files**

| PASS
| 4.1.1. Ensure that the kubelet service file permissions are set to `600` or more restrictive
| Automated
|

| PASS
| 4.1.2. Ensure that the kubelet service file ownership is set to `root:root`
| Automated
|

| PASS
| 4.1.3. If proxy kubeconfig file exists ensure permissions are set to `600` or more restrictive
| Manual
|

| PASS
| 4.1.4. If proxy kubeconfig file exists ensure ownership is set to `root:root`
| Manual
|

| PASS
| 4.1.5. Ensure that the `--kubeconfig` `kubelet.conf` file permissions are set to `600` or more restrictive
| Automated
|

| PASS
| 4.1.6. Ensure that the `--kubeconfig` `kubelet.conf` file ownership is set to `root:root`
| Automated
|

| PASS
| 4.1.7. Ensure that the certificate authorities file permissions are set to `600` or more restrictive
| Manual
|

| PASS
| 4.1.8. Ensure that the client certificate authorities file ownership is set to `root:root`
| Manual
|

| PASS
| 4.1.9. If the kubelet `config.yaml` configuration file is being used validate permissions set to `600` or more restrictive
| Automated
|

| PASS
| 4.1.10. If the kubelet `config.yaml` configuration file is being used validate file ownership is set to `root:root`
| Automated
|

4+| **4.2. Kubelet**

| PASS
| 4.2.1. Ensure that the `--anonymous-auth` argument is set to `false`
| Automated
|

| PASS
| 4.2.2. Ensure that the `--authorization-mode` argument is not set to `AlwaysAllow`
| Automated
|

| PASS
| 4.2.3. Ensure that the `--client-ca-file` argument is set as appropriate
| Automated
|

| PASS
| 4.2.4. Verify that the `--read-only-port` argument is set to `0`
| Manual
|

| PASS
| 4.2.5. Ensure that the --streaming-connection-idle-timeout argument is not set to `0`
| Manual
|

| PASS
| 4.2.6. Ensure that the `--make-iptables-util-chains` argument is set to `true`
| Automated
|

| PASS
| 4.2.7. Ensure that the `--hostname-override` argument is not set
| Manual
|

| PASS
| 4.2.8. Ensure that the `eventRecordQPS` argument is set to a level which ensures appropriate event capture
| Manual
|

| WARN
| 4.2.9. Ensure that the `--tls-cert-file` and `--tls-private-key-file` arguments are set as appropriate
| Manual
|

| PASS
| 4.2.10. Ensure that the `--rotate-certificates` argument is not set to `false`
| Automated
|

| PASS
| 4.2.11. Verify that the `RotateKubeletServerCertificate` argument is set to `true`
| Manual
|

| WARN
| 4.2.12. Ensure that the Kubelet only makes use of Strong Cryptographic Ciphers
| Manual
|

| PASS
| 4.2.13. Ensure that a limit is set on pod PIDs
| Manual
|

4+| **4.3. kube-proxy**

| FAIL
| 4.3.1. Ensure that the kube-proxy metrics service is bound to localhost
| Automated
| Влияет на интеграцию аддона Kube Prometheus Stack и системного компонента kube-proxy

4+| **5. Kubernetes Policies**

4+| **5.1. RBAC and Service Accounts**

| FAIL
| 5.1.1. Ensure that the `cluster-admin` role is only used where required
| Automated
| Зависит от настроек окружения пользователем

| FAIL
| 5.1.2. Minimize access to secrets
| Automated
| Зависит от настроек окружения пользователем

| FAIL
| 5.1.3. Minimize wildcard use in Roles and ClusterRoles
| Automated
| Зависит от настроек окружения пользователем

| FAIL
| 5.1.4. Minimize access to create pods
| Automated
| Зависит от настроек окружения пользователем

| FAIL
| 5.1.5. Ensure that default service accounts are not actively used
| Automated
| Зависит от настроек окружения пользователем

| FAIL
| 5.1.6. Ensure that Service Account Tokens are only mounted where necessary
| Automated
| Зависит от настроек окружения пользователем

| WARN
| 5.1.7. Avoid use of `system:masters` group
| Manual
|

| WARN
| 5.1.8. Limit use of the Bind, Impersonate and Escalate permissions in the Kubernetes cluster
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.1.9. Minimize access to create persistent volumes
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.1.10. Minimize access to the proxy sub-resource of nodes
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.1.11 Minimize access to the approval sub-resource of `certificatesigningrequests` objects
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.1.12. Minimize access to webhook configuration objects
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.1.13. Minimize access to the service account token creation
| Manual
| Зависит от настроек окружения пользователем

4+| **5.2. Pod Security Standards**

| WARN
| 5.2.1. Ensure that the cluster has at least one active policy control mechanism in place
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.2.2. Minimize the admission of privileged containers
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.2.3. Minimize the admission of containers wishing to share the host process ID namespace
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.2.4. Minimize the admission of containers wishing to share the host IPC namespace
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.2.5. Minimize the admission of containers wishing to share the host network namespace
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.2.6. Minimize the admission of containers with `allowPrivilegeEscalation`
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.2.7. Minimize the admission of root containers
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.2.8. Minimize the admission of containers with the `NET_RAW` capability
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.2.9. Minimize the admission of containers with added capabilities
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.2.10. Minimize the admission of containers with capabilities assigned
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.2.11. Minimize the admission of Windows HostProcess containers
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.2.12. Minimize the admission of HostPath volumes
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.2.13. Minimize the admission of containers which use HostPorts
| Manual
| Зависит от настроек окружения пользователем

4+| **5.3. Network Policies and CNI**

| PASS
| 5.3.1. Ensure that the CNI in use supports NetworkPolicies
| Manual
| Поддерживается

| WARN
| 5.3.2. Ensure that all Namespaces have NetworkPolicies defined
| Manual
| Зависит от настроек окружения пользователем

4+| **5.4. Secrets Management**

| WARN
| 5.4.1. Prefer using Secrets as files over Secrets as environment variables
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.4.2. Consider external secret storage
| Manual
| Зависит от настроек окружения пользователем

4+| **5.5. Extensible Admission Control**

| WARN
| 5.5.1. Configure Image Provenance using ImagePolicyWebhook admission controller
| Manual
| Зависит от настроек окружения пользователем

4+| **5.7. General Policies**

| WARN
| 5.7.1. Create administrative boundaries between resources using namespaces
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.7.2. Ensure that the `seccomp` profile is set to `docker/default` in your Pod definitions
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.7.3. Apply SecurityContext to your Pods and Containers
| Manual
| Зависит от настроек окружения пользователем

| WARN
| 5.7.4. The default namespace should not be used
| Manual
| Зависит от настроек окружения пользователем
|===

{/cut}
