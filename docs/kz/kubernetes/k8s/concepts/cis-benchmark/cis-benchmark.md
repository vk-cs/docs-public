{include(/kz/_includes/_translated_by_ai.md)}

[CIS Benchmarks](https://learn.cisecurity.org/benchmarks), немесе CIS бақылау көрсеткіштері, — бұл жүйелерді, сервистер мен қолданбаларды киберқауіптерден барынша жақсы қорғауды қамтамасыз етуге арналған мұқият әзірленген және үнемі жаңартылып отыратын ұсынымдар жүйесі. Бұл ұсынымдарды киберқауіпсіздікке маманданған коммерциялық емес [Center for Internet Security (CIS)](https://www.cisecurity.org/) ұйымы әзірлеп, қолдап отырады. CIS стандарттарын ұстану компанияларғал ықтимал осалдықтарды барынша азайтуғал, киберинциденттерді анықтау және оларғал ден қою мүмкіндіктерін жақсартуғал, осылайша өздерінің қауіпсіздік жүйесінің сенімділігін арттыруғал мүмкіндік береді.

CIS бақылау көрсеткіштері көптеген IT жүйелер үшін, соның ішінде [Kubernetes](https://www.cisecurity.org/benchmark/kubernetes/) үшін де қолжетімді. Жүйелер мен ұсынымдардың толық тізімін [ресми құжаттамадан](https://learn.cisecurity.org/benchmarks) табуғал болады. 

VK Cloud платформасында қолжетімді [1.28 – 1.31 нұсқаларындағы](../../concepts/versions/version-support) Kubernetes кластерлері үшін Kubernetes-ке арналған CIS бақылау көрсеткіштеріне тесттер жүргізілді. Тестілеу барысында Kubernetes кластерінің CIS бақылау көрсеткіштеріне сәйкестігін тексеретін ашық бастапқы коды бар [kube-bench](https://github.com/aquasecurity/kube-bench) құралы пайдаланылды. Тестілеудің негізі ретінде тестілеудің әр кезеңі, ұсынымдар мен күтілетін нәтижелер сипатталған [CIS Kubernetes Benchmark v.1.10](https://www.cisecurity.org/benchmark/kubernetes/) ресми құжаты алынды. 

VK Cloud платформасы master-түйіндердің қорғалуын қамтамасыз етеді, бірақ қалған бөлігінде кластерлердің пайдаланушылық баптаулары әртүрлі болуы мүмкін. Мұндай баптаулар тестілеуде ескерілмейді және пайдаланушының жауапкершілік аймағында болады, сондықтан тесттердің бір бөлігінде тиісті түсініктемелері бар `WARN` немесе `FAIL` нәтижелері кездеседі. Kubernetes кластерлеріңіздің барынша жоғары қауіпсіздігін қамтамасыз ету үшін CIS бақылау көрсеткіштеріне өз тестілеуіңізді жүргізе аласыз.

Осылайша, тестілеу VK Cloud платформасындағы Kubernetes кластерлері CIS Benchmarks ұсынымдарына сәйкес келетінін көрсетті. Жеке тестілеу кезеңдеріне қатысты түсініктемелері бар егжей-тегжейлі нәтижелер:

{cut(1.28 – 1.29 нұсқаларындағы кластерлер үшін)}

[cols="1,3a,1,2a", options="header"]
|===

| Мәртебе
| Атауы
| Іске қосу түрі
| Түсініктеме

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
| Көрсетілген шектеулер орнатылған

| PASS	 
| 1.1.10. Ensure that the Container Network Interface file ownership is set to `root:root` 	
| Manual
| Көрсетілген шектеулер орнатылған

| PASS	 
| 1.1.11. Ensure that the etcd data directory permissions are set to `700` or more restrictive 	
| Automated
| Көрсетілген шектеулер орнатылған

| PASS	 
| 1.1.12. Ensure that the etcd data directory ownership is set to `etcd:etcd` 	
| Automated
| Көрсетілген шектеулер орнатылған

| PASS	 
| 1.1.13. Ensure that the default administrative credential file permissions are set to `600` 	
| Automated
| `admin.conf` және `super-admin.conf` файлдары пайдаланылмайды

| PASS	 
| 1.1.14. Ensure that the default administrative credential file ownership is set to `root:root` 	
| Automated
| `admin.conf` және `super-admin.conf` файлдары пайдаланылмайды

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
| Параметрлер конфигурация файлында көрсетілген

| PASS
| 2.2. Ensure that the `--client-cert-auth` argument is set to true
| Automated
| Параметр конфигурация файлында көрсетілген

| PASS
| 2.3. Ensure that the `--auto-tls` argument is not set to `true` 	
| Automated
|

| PASS
| 2.4. Ensure that the `--peer-cert-file` and `--peer-key-file` arguments are set as appropriate
| Automated
| Параметрлер конфигурация файлында көрсетілген

| PASS
| 2.5. Ensure that the `--peer-client-cert-auth` argument is set to `true`
| Automated
| Параметр конфигурация файлында көрсетілген

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
| Талапқал сәйкестік Kube Prometheus Stack аддонының жұмысына әсер етеді

4+| **5. Kubernetes Policies**

4+| **5.1. RBAC and Service Accounts**

| FAIL
| 5.1.1. Ensure that the `cluster-admin` role is only used where required
| Automated
| Пайдаланушы орнатқан орта баптауларына байланысты

| FAIL
| 5.1.2. Minimize access to secrets
| Automated
| Пайдаланушы орнатқан орта баптауларына байланысты

| FAIL
| 5.1.3. Minimize wildcard use in Roles and ClusterRoles
| Automated
| Пайдаланушы орнатқан орта баптауларына байланысты

| FAIL
| 5.1.4. Minimize access to create pods
| Automated
| Пайдаланушы орнатқан орта баптауларына байланысты

| FAIL
| 5.1.5. Ensure that default service accounts are not actively used
| Automated
| Пайдаланушы орнатқан орта баптауларына байланысты

| FAIL
| 5.1.6. Ensure that Service Account Tokens are only mounted where necessary
| Automated
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.1.7 Avoid use of `system:masters` group
| Manual
|

| WARN
| 5.1.8. Limit use of the `Bind`, `Impersonate` and `Escalate` permissions in the Kubernetes cluster
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.1.9. Minimize access to create persistent volumes
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.1.10. Minimize access to the proxy sub-resource of nodes
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.1.11. Minimize access to the approval sub-resource of `certificatesigningrequests` objects
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.1.12. Minimize access to webhook configuration objects
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.1.13. Minimize access to the service account token creation
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

4+| **5.2. Pod Security Standards**

| WARN
| 5.2.1. Ensure that the cluster has at least one active policy control mechanism in place
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.2.2. Minimize the admission of privileged containers
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.2.3. Minimize the admission of containers wishing to share the host process ID namespace
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.2.4. Minimize the admission of containers wishing to share the host IPC namespace
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.2.5. Minimize the admission of containers wishing to share the host network namespace
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.2.6. Minimize the admission of containers with `allowPrivilegeEscalation`
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.2.7. Minimize the admission of root containers
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.2.8. Minimize the admission of containers with the `NET_RAW` capability
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.2.9. Minimize the admission of containers with added capabilities
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.2.10. Minimize the admission of containers with capabilities assigned
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.2.11. Minimize the admission of Windows HostProcess containers
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.2.12. Minimize the admission of HostPath volumes
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.2.13. Minimize the admission of containers which use HostPorts
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

4+| **5.3. Network Policies and CNI**

| PASS
| 5.3.1. Ensure that the CNI in use supports `NetworkPolicies`
| Manual
| Қолдау көрсетіледі

| WARN
| 5.3.2. Ensure that all Namespaces have `NetworkPolicies` defined
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

4+| **5.4. Secrets Management**

| WARN
| 5.4.1. Prefer using Secrets as files over Secrets as environment variables
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.4.2. Consider external secret storage
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

4+| **5.5. Extensible Admission Control**

| WARN
| 5.5.1. Configure Image Provenance using `ImagePolicyWebhook` admission controller
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

4+| **5.7. General Policies**

| WARN
| 5.7.1. Create administrative boundaries between resources using namespaces
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.7.2. Ensure that the `seccomp` profile is set to `docker/default` in your Pod definitions
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.7.3. Apply SecurityContext to your Pods and Containers
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.7.4. The default namespace should not be used
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты
|===


{/cut}

{cut(1.30 – 1.31 нұсқаларындағы кластерлер үшін)}

[cols="1,3a,1,2a", options="header"]
|===

| Мәртебе
| Атауы
| Іске қосу түрі
| Сипаттама

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
| Көрсетілген шектеулер орнатылған

| PASS
| 1.1.10. Ensure that the Container Network Interface file ownership is set to `root:root`
| Manual
| Көрсетілген шектеулер орнатылған

| PASS
| 1.1.11. Ensure that the etcd data directory permissions are set to `700` or more restrictive
| Automated
| Көрсетілген шектеулер орнатылған

| PASS
| 1.1.12. Ensure that the etcd data directory ownership is set to `etcd:etcd`
| Automated
| Көрсетілген шектеулер орнатылған

| PASS
| 1.1.13. Ensure that the default administrative credential file permissions are set to `600`
| Automated
| `admin.conf` және `super-admin.conf` файлдары пайдаланылмайды

| PASS
| 1.1.14. Ensure that the default administrative credential file ownership is set to `root:root`
| Automated
| `admin.conf` және `super-admin.conf` файлдары пайдаланылмайды

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
|Параметрлер конфигурация файлында көрсетілген

| PASS
| 2.2. Ensure that the `--client-cert-auth` argument is set to `true`
| Automated
| Параметр конфигурация файлында көрсетілген

| PASS
| 2.3. Ensure that the `--auto-tls` argument is not set to `true`
| Automated
|

| PASS
| 2.4. Ensure that the `--peer-cert-file` and `--peer-key-file` arguments are set as appropriate
| Automated
| Параметрлер конфигурация файлында көрсетілген

| PASS
| 2.5. Ensure that the `--peer-client-cert-auth` argument is set to `true`
| Automated
| Параметр конфигурация файлында көрсетілген

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
| Kube Prometheus Stack аддондар мен kube-proxy жүйелік компонентінің интеграциясына әсер етеді

4+| **5. Kubernetes Policies**

4+| **5.1. RBAC and Service Accounts**

| FAIL
| 5.1.1. Ensure that the `cluster-admin` role is only used where required
| Automated
| Пайдаланушы орнатқан орта баптауларына байланысты

| FAIL
| 5.1.2. Minimize access to secrets
| Automated
| Пайдаланушы орнатқан орта баптауларына байланысты

| FAIL
| 5.1.3. Minimize wildcard use in Roles and ClusterRoles
| Automated
| Пайдаланушы орнатқан орта баптауларына байланысты

| FAIL
| 5.1.4. Minimize access to create pods
| Automated
| Пайдаланушы орнатқан орта баптауларына байланысты

| FAIL
| 5.1.5. Ensure that default service accounts are not actively used
| Automated
| Пайдаланушы орнатқан орта баптауларына байланысты

| FAIL
| 5.1.6. Ensure that Service Account Tokens are only mounted where necessary
| Automated
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.1.7. Avoid use of `system:masters` group
| Manual
|

| WARN
| 5.1.8. Limit use of the Bind, Impersonate and Escalate permissions in the Kubernetes cluster
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.1.9. Minimize access to create persistent volumes
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.1.10. Minimize access to the proxy sub-resource of nodes
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.1.11 Minimize access to the approval sub-resource of `certificatesigningrequests` objects
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.1.12. Minimize access to webhook configuration objects
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.1.13. Minimize access to the service account token creation
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

4+| **5.2. Pod Security Standards**

| WARN
| 5.2.1. Ensure that the cluster has at least one active policy control mechanism in place
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.2.2. Minimize the admission of privileged containers
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.2.3. Minimize the admission of containers wishing to share the host process ID namespace
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.2.4. Minimize the admission of containers wishing to share the host IPC namespace
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.2.5. Minimize the admission of containers wishing to share the host network namespace
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.2.6. Minimize the admission of containers with `allowPrivilegeEscalation`
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.2.7. Minimize the admission of root containers
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.2.8. Minimize the admission of containers with the `NET_RAW` capability
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.2.9. Minimize the admission of containers with added capabilities
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.2.10. Minimize the admission of containers with capabilities assigned
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.2.11. Minimize the admission of Windows HostProcess containers
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.2.12. Minimize the admission of HostPath volumes
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.2.13. Minimize the admission of containers which use HostPorts
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

4+| **5.3. Network Policies and CNI**

| PASS
| 5.3.1. Ensure that the CNI in use supports NetworkPolicies
| Manual
| Қолдау көрсетіледі

| WARN
| 5.3.2. Ensure that all Namespaces have NetworkPolicies defined
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

4+| **5.4. Secrets Management**

| WARN
| 5.4.1. Prefer using Secrets as files over Secrets as environment variables
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.4.2. Consider external secret storage
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

4+| **5.5. Extensible Admission Control**

| WARN
| 5.5.1. Configure Image Provenance using ImagePolicyWebhook admission controller
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

4+| **5.7. General Policies**

| WARN
| 5.7.1. Create administrative boundaries between resources using namespaces
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.7.2. Ensure that the `seccomp` profile is set to `docker/default` in your Pod definitions
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.7.3. Apply SecurityContext to your Pods and Containers
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты

| WARN
| 5.7.4. The default namespace should not be used
| Manual
| Пайдаланушы орнатқан орта баптауларына байланысты
|===

{/cut}
