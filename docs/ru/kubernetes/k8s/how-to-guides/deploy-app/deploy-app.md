# {heading(Развертывание приложений)[id=k8s-deploy-app]}

Развертывание приложения в Kubernetes осуществляется с помощью утилиты `kubectl`. Полный синтаксис команд утилиты приведен в [официальной документации Kubernetes](https://kubernetes.io/docs/reference/kubectl/overview/).

Перед началом развертывания приложения:

1. Установите `kubectl` с [официального сайта](https://kubernetes.io/ru/docs/tasks/tools/install-kubectl/).
1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Подключитесь к кластеру]}.

После развертывания экземпляр приложения работает внутри Docker-контейнера.

Рассмотрим процесс развертывания на примере приложения tea. Для приложения создайте:

* [Persistent Volume Claim](https://kubernetes.io/docs/concepts/storage/persistent-volumes/), чтобы внутрь приложения можно было монтировать тома с данными.
* [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/), в котором будут заданы количество реплик и том для монтирования в под.
* [Service](https://kubernetes.io/docs/concepts/services-networking/service/) для обеспечения доступа к приложению.

Чтобы развернуть приложение:

1. Создайте директорию для файлов и перейдите в нее:

   {tabs}

   {tab(Linux/macOS)}
   ```console
   mkdir ~/k8s-deployments && cd ~/k8s-deployments
   ```
   {/tab}

   {tab(Windows)}
   ```console
   mkdir ~/k8s-deployments; cd ~/k8s-deployments
   ```
   {/tab}

   {/tabs}

1. Поместите в эту директорию файл `deploy-tea.yaml`:
   
   ```yml
   kind: PersistentVolumeClaim
   apiVersion: v1
   metadata:
     name: k8s-demo-pvc-tea
   spec:
     storageClassName: "csi-ceph-hdd-ms1"
     accessModes:
       - ReadWriteOnce
     resources:
       requests:
         storage: 1Gi

   ---
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: tea
   spec:
     replicas: 2
     selector:
       matchLabels:
         app: tea
     template:
       metadata:
         labels:
           app: tea
       spec:
         volumes:
           - name: k8s-pv-tea
             persistentVolumeClaim:
               claimName: k8s-demo-pvc-tea
         imagePullSecrets:
           - name: k8s-registry-creds
         containers:
           - name: tea
             image: 192.0.2.22:5000/vk-cloud-demo/nginx-k8s-demo:latest
             imagePullPolicy: Always
             ports:
               - containerPort: 8080
             volumeMounts:
               - name: k8s-pv-tea
                 mountPath: /etc/nginx/k8s_demo_pv

   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: tea-svc
   spec:
     ports:
       - port: 80
         targetPort: 8080
         protocol: TCP
         name: http
     selector:
       app: tea
   ```

   {note:warn}
   Обратите внимание, что в файле `deploy-tea.yaml` для Persistent Volume Claim указывается класс хранения, соответствующий зоне доступности узла, на котором планируется развернуть приложение.

   Попытка разместить на узле в одной зоне доступности приложение, к которому примонтирован том из другой зоны доступности, может завершиться ошибкой.
   {/note}
   
1. Разверните приложение:
   
   ```console
   kubectl apply -f deploy-tea.yaml
   ```

1. Проверьте корректность развертывания:

   * Persistent Volume Claim с помощью команды:
      
     ```console
     kubectl get pvc
     ```

   * Deployment с помощью команды:
      
     ```console
     kubectl get deployment
     ```

   * Service с помощью команды:
      
     ```console
     kubectl get svc
     ```

1. Настройте Ingress для приложения. Чтобы Ingress-контроллер маршрутизировал запросы к соответствующему сервису, через который опубликовано приложение tea:

   1. Поместите в директорию `~/k8s-deployments` yaml-файл `deploy-ingress.yaml`:

      ```yml
      apiVersion: networking.k8s.io/v1
      kind: Ingress
      metadata:
        name: tea-ingress
      spec:
        ingressClassName: nginx
        rules:
          - host: tea.example.com
            http:
              paths:
                - path: /tea
                  pathType: Prefix
                  backend:
                    service:
                      name: tea-svc
                      port:
                        number: 80
      ```

   1. Разверните ресурс Ingress:
      
      ```console
      kubectl apply -f deploy-ingress.yaml
      ```

   1. Проверьте корректность развертывания:
      
      ```console
      kubectl get ingress
      ```

1. Проверьте работоспособность всех созданных ресурсов приложения в кластере. Для этого выполните curl-запрос к IP-адресу балансировщика нагрузки:
   
   ```console
   curl --resolve cafe.example.com:80:<IP-АДРЕС> http://tea.example.com/tea
   ```
   Здесь `<IP-АДРЕС>` — IP-адрес балансировщика нагрузки.