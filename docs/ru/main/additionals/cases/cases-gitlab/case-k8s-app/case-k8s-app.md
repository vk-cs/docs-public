В данной статье рассмотрим, как настроить авторазвертывание приложения в кластер Kubernetes.

Перед этим:

1.  [Установите и настройте Docker](https://mcs.mail.ru/help/gitlab-ci-cd/docker-installation).
2.  [Установите и настройте Gitlab](https://mcs.mail.ru/help/gitlab-ci-cd/gitlab-installation).
3.  [Установите и настройте Harbor](https://mcs.mail.ru/help/gitlab-ci-cd/harbor-installation).

## Настройка Gitlab-runner

Gitlab-runner - среда для выполнения автосборки проектов Gitlab. Чтобы настроить автосборку, установите и зарегистрируйте runner в системе Gitlab. Можно зарегистрировать специфичный runner для каждого проекта (specific runner) или общий runner для нескольких проектов (shared runner). Настроим общий runner.

Для этого:

1.  Авторизуйтесь в веб-интерфейсе Gitlab c правами администратора:

![](./assets/1583699032662-1583699032662-png)

2.  Скопируйте registration token и в консоли на сервере, на котором установлен Gitlab-runner выполните следующее:

```
root@ubuntu-standard-2-4-40gb:~# docker exec -it gitlab-runner gitlab-runner register -n --url https://<SERVER_DNS_NAME>/ --executor docker --registration-token ua2k238fbMtAxMBBRf_z --description "shared-runner" --docker-image="docker:dind" --tag-list "shared_runner" --docker-privileged --docker-volumes /var/run/docker.sock:/var/run/docker.sock
```

<warn>

**Внимание**

\--tag-list - указывает теги, которые будет принимать runner. Далее в проекте этот тег указывается, чтобы проект собирался этим runner.

\--docker-privileged и --docker-volumes - необходимы, чтобы запущенный Docker-контейнер имел доступ к родительскому Docker для сбора образов (подробно [читайте тут](https://docs.gitlab.com/ee/ci/docker/using_docker_build.html)).

</warn>

В результате runner отобразится в веб-интерфейсе:

![](./assets/1583699032286-1583699032286-png)

3.  Настройте переменные среды выполнения. Для этого выберите Settings /CI CD и напротив Variables нажмите Expand:

![](./assets/1583699032764-1583699032764-png)

4.  Установите несколько переменных, которые будут использоваться затем в файле автосборки `.gitlab-ci.yml`:

![](./assets/1583699033010-1583699033010-png)

Переменные:

- DOCKER_USER — пользователь для доступа к репозиторию в Harbor. В нашем примере — k8s.
- DOCKER_PASSWORD — пароль пользователя k8s, который вы ввели при создании пользователя в Harbor.

Обратите внимание, что для пароля включено Masked — благодаря этому при попытке вывода текста в переменной в скрипте он маскируется, и пароль не виден.

- DOCKER_REGISTRY — имя хоста, на котором расположен Harbor. В нашем примере — <SERVER_DNS_NAME>.

## Настройка файла автосборки

Перейдите в папку со скачанным репозиторием и в текстовом редакторе создайте файл `.gitlab-ci.yml` следующего содержания:

```
image: docker:latest

stages:
  - builds
  - test
  - release

variables:
  REGISTRY_URL: https://$DOCKER_REGISTRY:8443
  IMAGE: $DOCKER_REGISTRY:8443/$DOCKER_USER/$CI_PROJECT_NAME:$CI_COMMIT_REF_NAME
  RELEASE: $DOCKER_REGISTRY:8443/$DOCKER_USER/$CI_PROJECT_NAME:latest

before_script:
   - docker login $REGISTRY_URL -u $DOCKER_USER -p $DOCKER_PASSWORD

build:
  stage: builds
  tags:
    - shared_runner
  script:
   - cd app && docker build --pull -t $IMAGE .
   - docker push $IMAGE

release:
  stage: release
  tags:
    - shared_runner
  script:
    - docker pull $IMAGE
    - docker tag $IMAGE $RELEASE
    - docker push $RELEASE
  only:
    - master
```

Рассмотрим этот файл.

Переменные общего назначения:

- image - указывает docker image, в котором будет запускаться сборка. Поскольку мы собираем Docker-образ, требуется image, содержащий нужные для сборки утилиты. Обычно используется `image docker:latest`.
- stages - описывает стадии сборки образа. В нашем примере стадия test пропускается.

Переменные, используемые для работы:

- before_script  - стадия, которая выполняется первой. Выполняем логин в регистри, используя переменные, которые прописаны в настройках Gitlab runner.
- build - сборка образа. Стандартная сборка Docker-образа c использованием Dockerfile в репозитории.

<warn>

**Важно!**

`tags: shared_runner` — тег, который был указан при регистрации runner. Указание этого тега в файле `.gitlab-ci.yml` разрешает Gitlab-runner выполнять этот скрипт. После сборки вносится собранный образ в регистри с тегом `CI_COMMIT_REF_NAME`. Подробно о переменных, которые можно использовать при сборке [читайте в статье](https://docs.gitlab.com/ee/ci/variables)). В нашем примере, поскольку происходит коммит в ветку master, имя образа будет `k8s/k8s-conf-demo:master`.

</warn>

- release - секция формирования окончательного образа. В нашем примере просто берем образ, собранный на предыдущей стадии, добавляем ему тег latest и загружаем в репозиторий.

Загрузите созданный файл в репозиторий:

```
ash-work:k8s-conf-demo git add .
ash-work:k8s-conf-demo git commit -m "create .gitlab-ci.yml"
[master 55dd5fa] create .gitlab-ci.yml
1 file changed, 1 insertion(+), 1 deletion(-)
ash-work:k8s-conf-demo git push
Перечисление объектов: 5, готово.
Подсчет объектов: 100% (5/5), готово.
При сжатии изменений используется до 4 потоков
Сжатие объектов: 100% (3/3), готово.
Запись объектов: 100% (3/3), 299 bytes | 299.00 KiB/s, готово.
Всего 3 (изменения 2), повторно использовано 0 (изменения 0)
To testrom.ddns.net:ash/k8s-conf-demo.git
   7c91eab..55dd5fa  master -> master
```

Как только файл `.gitlab-ci.yml` появится в репозитории, Gitlab автоматически запустит его сборку.

Посмотреть, как происходит сборка можно в веб-интерфейсе Gitlab в проекте, CI/CD / Pipelines:

![](./assets/1583700761304-1583700761304-png)

Нажав на running, можно посмотреть текущий прогресс выполнения сборки:

![](./assets/1583700787348-1583700787348-png)

Нажимая на стадии сборки, можно увидеть консоль сборки и что в ней происходит. Пример для стадии build:

![](./assets/1583700831019-1583700831019-png)

Пример для стадии release:

![](./assets/1583700851963-1583700851963-png)

В логах консоли видно, что и build и release завершились успешно. Собранный образ был выложен в репозитории Harbor, что можно увидеть в соответствующем веб-интерфейсе:

![](./assets/1583700204079-1583700204079-png)

## Развертывание приложения в кластере Kubernetes

После успешной сборки проекта настроим авторазвертывание приложения в кластер Kubernetes. Для примера используем [кластер Kubernetes от VK Cloud](https://mcs.mail.ru/containers/).

После развертывания кластера в облаке на локальный компьютер загружается конфигурационный файл вида `kubernetes-cluster-5011_kubeconfig.yaml`, предназначенный для авторизации в кластер для утилит типа kubectl.

1.  Подключите конфигурационный файл:

```
ash-work:~ export KUBECONFIG=kubernetes-cluster-5011_kubeconfig.yaml
```

2.  Убедитесь, что авторизация  успешно выполнена, и кластер работоспособен:

```
ash-work:~ kubectl cluster-info
Kubernetes master is running at https://89.208.197.244:6443
CoreDNS is running at https://89.208.197.244:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```

Кластер отвечает.

3.  Предоставьте кластеру права доступа к репозиторию образов Harbor. Для этого создайте следующий secret:

```
ash-work:~ kubectl create secret docker-registry myprivateregistry --docker-server=https://<SERVER_DNS_NAME>:8443 --docker-username=k8s --docker-password=<PASSWORD>
secret/myprivateregistry created.
```

где `<SERVER_DNS_NAME>` - имя сервера Harbor, `<PASSWORD>`  - пароль пользователя k8s в Harbor.

4.  Убедитесь, что secret успешно создан:

```
ash-work:~ kubectl get secret myprivateregistry --output="jsonpath={.data.\.dockerconfigjson}" | base64 --decode
{"auths":{"https://<SERVER_DNS_NAME>:8443":{"username":"k8s","password":"<PASSWORD>","auth":"sdasdsdsdsdsdsdsdsdssd=="}}}%
```

5.  Создайте файл `deployment.yml` следующего содержания:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  selector:
    matchLabels:
      run: myapp
  template:
    metadata:
      labels:
        run: myapp
    spec:
      containers:
      - name: myapp
        image: <SERVER_DNS_NAME>:8443/k8s/k8s-conf-demo:latest
        imagePullPolicy: Always
        env:
        - name: HTTP_PORT
          value: "8081"
        ports:
        - containerPort: 8081
      imagePullSecrets:
      - name: myprivateregistry
```

6.  Примените этот файл:

```
ash-work:~ kubectl create -f deployment.yaml 
deployment.apps/myapp-deployment created
```

7.  Через некоторое время убедитесь, что контейнер поднялся:

```
ash-work:~ kubectl get pods 
NAME READY STATUS RESTARTS AGE 
myapp-deployment-66d55bcbd5-s86m6   1/1     Running   0          39s
```

8.  Создайте файл `service.yml`:

```
apiVersion: v1
kind: Service
metadata:
  name: myapp-svc
  labels:
    run: myapp
spec:
  ports:
    - protocol: TCP
      port: 8081
      targetPort: 8081
  selector:
    run: myapp
```

9.  Создайте сервис:

```
ash-work:~ kubectl create -f service.yaml 
service/myapp-svc created
```

10. Чтобы обеспечить доступ к приложению из внешней сети, настройте ingress-контроллер. Для этого создайте файл `ingress.yaml`:

```
apiVersion: extensions/v1beta1 
kind: Ingress 
metadata: 
name: myapp-ingress 
spec: 
rules: 
- host: echo.com 
http: 
paths: 
- path: / 
backend: 
serviceName: myapp-svc 
          servicePort: 8081
```

В этом файле укажите домен, при обращении к которому будет выполнен переход в приложение. Можно указать любой домен, мы пропишем его локально для тестов.

11. Примените ingress-контроллер:

```
ash-work:~ kubectl create -f ingress.yaml 
ingress.extensions/myapp-ingress created
```

12. Посмотрите состояние ingress-контроллера:

```
ash-work:~ kubectl describe ingress myapp-ingress 
Name: myapp-ingress 
Namespace: default 
Address: 
Default backend: default-http-backend:80 (<none>) 
Rules: 
Host Path Backends 
---- ---- -------- 
echo.com 
/ myapp-svc:8081 (10.100.69.71:8081) 
Annotations: 
Events: 
Type Reason Age From Message 
---- ------ ---- ---- ------- 
Normal CREATE 45s nginx-ingress-controller Ingress default/myapp-ingress 
  Normal  UPDATE  5s    nginx-ingress-controller  Ingress default/myapp-ingress
```

Внешний IP-адрес, связанный с ingress-контроллером, можно посмотреть в веб-интерфейсе облака Mail.ru. Он называется IP-адрес балансировщика нагрузки для Ingress Controller. Обозначим его как <INGRESS_EXTERNAL_IP>.

13. Протестируем работу приложения:

```
ash-work:~ curl --resolve echo.com:80:<INGRESS_EXTERNAL_IP> http://echo.com/handler 
OK%
```

Опция `--resolve` отвечает за локальный резолв при запросе curl, так как домен мы придумали сами и настоящего резолва нет.

Таким образом, мы выполнили развертывание приложения в кластер Kubernetes вручную.

14. Удалим созданное:

```
ash-work:~ kubectl delete -f ingress.yaml 
ingress.extensions "myapp-ingress" deleted 
ash-work:~ kubectl delete -f service.yaml 
service "myapp-svc" deleted 
ash-work:~ kubectl delete -f deployment.yaml 
deployment.apps "myapp" deleted
```

## Развертывание приложения в кластере Kubernetes с использованием Gitlab CI/CD

Gitlab по умолчанию поддерживает интеграцию с кластером Kubernetes. Чтобы настроить интеграцию, получите несколько параметров кластера.

Для этого:

1.  Получите API URL:

```
ash-work:~ kubectl cluster-info | grep 'Kubernetes master' | awk '/http/ {print $NF}'
https://89.208.197.244:6443
```

2.  Получите список секретов кластера:

```
ash-work:~ kubectl get secrets
NAME                       TYPE                                  DATA   AGE
dashboard-sa-token-xnvmp   kubernetes.io/service-account-token   3      41h
default-token-fhvxq        kubernetes.io/service-account-token   3      41h
myprivateregistry          kubernetes.io/dockerconfigjson        1      39h
regcred                    kubernetes.io/dockerconfigjson        1      39h
```

3.  Получите PEM-сертификат секрета default-token-\*:

```
ash-work:~ kubectl get secret default-token-fhvxq -o jsonpath="{['data']['ca\.crt']}" | base64 --decode
-----BEGIN CERTIFICATE-----
MIIC9DCCAdygAwIBAgIQQf4DP2XYQaew1MEtxJtVBzANBgkqhkiG9w0BAQsFADAi
MSAwHgYDVQQDDBdrdWJlcm5ldGVzLWNsdXN0ZXItNTAxMTAeFw0xOTEyMDkxNTI2
MDlaFw0yNDEyMDgxNTI2MDlaMCIxIDAeBgNVBAMMF2t1YmVybmV0ZXMtY2x1c3Rl
ci01MDExMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA47Nd4cEMEdtW
yxo3VEm02wB+k7HytzchyYOlxJdYhQV4yjWR8MpAd9JKWgOdJ/qzitIjYdr0cKCI
dLxRmKWGJJhTYZ4yBQS3XJ52n6bpV1Nzj0Xsq9Bxs7OgG1T4oZn7FXY4ZrJ10w0s
wa0w5AbU2LbpprWsNki2uFkUusgtUSLSSwe90yVKT5ZnW3kUrmMZlY3ys4KLhDbA
CS5xs03t10apRjfRq4WQ0ja+AYkzvwnpiX5nnJk2YCn31c4tVUSuoblzoWEokD2v
DLzZaHAg53Payp2PUP7S5kMCjfrRIEBO7SULve/P/7GRJEHzzOREn/qMSOWK5u1O
k1yk4ARP4wIDAQABoyYwJDASBgNVHRMBAf8ECDAGAQH/AgEAMA4GA1UdDwEB/wQE
AwICBDANBgkqhkiG9w0BAQsFAAOCAQEAYxdbkMTOL4/pbQmJNIY54y+L8eGqEzTc
is9KAZmoD4t4A88r1xZ/dp/3PVhFaOutQh6H7FzNDEiWbTFUa3edGXBmL4jB05Tm
epj1iYEY6Nv5KGoSZutZ11Y8W+77pu9zKzzbtXMyCsYpPWrPyXiP1Z1zY6F4MtAQ
GF9ONh9lDVttkFjaerKR4y4/E/X+e2Mi2dsyJmVHCrZTHozy8oZayC//JfzS+pK9
2IvcwlBgp9q4VO+lmkozWzWcO5mjk/70t7w5UHNpJOxeMzbhx6JkWZ9bN+Ub7RHN
1PUeNfZJKHEgSZw8M+poK3SqsyGMQ13geGXpM85VQvrqCW43YfgjiQ==
-----END CERTIFICATE-----
```

4.  Теперь создайте файл `gitlab-admin-service-account.yaml`, который описывает права доступа Gitlab к кластеру. Содержимое файла:

```
apiVersion: v1
kind: ServiceAccount
metadata:
name: gitlab-admin
namespace: kube-system
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
name: gitlab-admin
roleRef:
apiGroup: rbac.authorization.k8s.io
kind: ClusterRole
name: cluster-admin
subjects:
- kind: ServiceAccount
name: gitlab-admin
  namespace: kube-system
```

5.  Примените права:

```
ash-work:~ kubectl apply -f gitlab-admin-service-account.yaml
serviceaccount/gitlab-admin created
clusterrolebinding.rbac.authorization.k8s.io/gitlab-admin created
```

И получите токен доступа к кластеру:

```
ash-work:~ kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep gitlab-admin | awk '{print $1}')
Name: gitlab-admin-token-kcmd8
Namespace: kube-system
Labels: <none>
Annotations: kubernetes.io/service-account.name: gitlab-admin
kubernetes.io/service-account.uid: d9aa6095-6086-4430-b1ae-711df5765064


Type: kubernetes.io/service-account-token


Data
====
ca.crt: 1087 bytes
namespace: 11 bytes


token:      eyJhbGciOiJSUzI1NiIsImtpZCI6IiJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJnaXRsYWItYWRtaW4tdG9rZW4ta2NtZDgiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoiZ2l0bGFiLWFkbWluIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiZDlhYTYwOTUtNjA4Ni00NDMwLWIxYWUtNzExZGY1NzY1MDY0Iiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmdpdGxhYi1hZG1pbiJ9.CaBJMUdWwTPGBla1OZZnsftdUue1-XSyF-SEaHhNdWaUkX_5aUi4uZrgx0UGLbSOFkTmij2_lv1lAkm9-W4VCi4z9cVjw41o6TA6279rx_HEammNzFV8v1HvpSkMXH8wVzaoLwtVQehM7fozykgv4y3wmHAe-T0vXNRN48FYmDXReRSdGuldV--OZLZeOVGrRIkttXoMoSVW_LbnOiBJU4NUQq4dNpvklQkLTSBowu-E0lDJJoMQjniSO1j8H8fmy7Micpgy20Hi1RIoJWfPj-EY3CyhjMht8iTIokQHgHgpCY_RQPexJqHiXTQgyZ93WNw8foIfISduNXyynfGzmQ

```

6.  Перейдите в администраторскую часть интерфейса Gitlab и нажмите Add Kubernetes Cluster:

![](./assets/1583702333521-1583702333521-png)

7.  Выберите вкладку Add Existing cluster, внесите ранее запомненные параметры (API URL, PEM, Token) и нажмите Add Kubernetes Cluster:

![](./assets/1583702864976-1583702864976-png)

8.  Кластер добавлен:

![](./assets/1583702901138-1583702901138-png)

Поместите файлы `deployment.yaml`, `service.yaml`, `ingress.yaml` в папку deployments проекта.

В файл `.gitlab-ci.yml` добавьте секцию deploy:

```
image: docker:latest

stages:
- build
- test
- release
- deploy

variables:
REGISTRY_URL: https://$DOCKER_REGISTRY:8443
IMAGE: $DOCKER_REGISTRY:8443/$DOCKER_USER/$CI_PROJECT_NAME:$CI_COMMIT_REF_NAME
RELEASE: $DOCKER_REGISTRY:8443/$DOCKER_USER/$CI_PROJECT_NAME:latest


before_script:
- docker login $REGISTRY_URL -u $DOCKER_USER -p $DOCKER_PASSWORD

build:
stage: build
tags:
- shared_runner
script:
- cd app && docker build --pull -t $IMAGE .
- docker push $IMAGE

release:
stage: release
tags:
- shared_runner
script:
- docker pull $IMAGE
- docker tag $IMAGE $RELEASE
- docker push $RELEASE
only:
- master

deploy:
stage: deploy
before_script:
- apk add --no-cache curl
- curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
- chmod +x ./kubectl
tags:
- shared_runner
environment:
name: production
script:
- echo $KUBECONFIG
- export KUBECONFIG=$KUBECONFIG
    - ./kubectl create secret docker-registry myprivateregistry --docker-server=$REGISTRY_URL --docker-username=$DOCKER_USER --docker-password=$DOCKER_PASSWORD --dry-run -o yaml | ./kubectl apply -f -
    - ./kubectl apply -f manifests/deployment.yaml
- ./kubectl apply -f manifests/service.yaml
    - ./kubectl apply -f manifests/ingress.yaml
    - ./kubectl rollout restart deployment
```

Рассмотрим раздел deploy.

В разделе `before_script` в систему ставится curl, с его помощью скачивается последняя стабильная версия kubectl.

Секция script: Так как кластер управляется Gitlab, есть предустановленные переменные - в KUBECONFIG хранится имя файла конфигурации доступа к кластеру.

Так как namespace устанавливается автоматически, в этом namespace необходимо создать secret c логином и паролем для доступа к нашему регистри, в котором хранится собранный на этапе release образ приложения.

Далее применяются манифесты деплоя, сервиса и ingress-контроллера.

Последняя команда перезапускает деплой для скачивания новой версии приложения.

Результат выполнения секции deploy:

![](./assets/1583703066298-1583703066298-png)

9.  Проверим, что было создано в кластере. Смотрим namespace:

```
ash-work:~ kubectl get namespaces
NAME STATUS AGE
default Active 45h
gitlab-managed-apps Active 67m
ingress-nginx Active 45h
k8s-conf-demo-1-production Active 57m
kube-node-lease Active 45h
kube-public Active 45h
kube-system Active 45h
magnum-tiller Active 45h

```

10. Наш namespace - `k8s-conf-demo-1-production`. Посмотрим поды, сервисы и ingress:

```
ash-work:~ kubectl get pods -n k8s-conf-demo-1-production
NAME READY STATUS RESTARTS AGE
myapp-65f4bf95b5-m9s8l 1/1 Running 0 39m
ash-work:~ kubectl get services -n k8s-conf-demo-1-production
NAME TYPE CLUSTER-IP EXTERNAL-IP PORT(S) AGE
myapp-svc ClusterIP 10.254.243.199 <none> 8081/TCP 32m
ash-work:~ kubectl get ingress -n k8s-conf-demo-1-production
NAME HOSTS ADDRESS PORTS AGE
myapp-ingress echo.com 80 32m
ash-work:~
```

11. Проверьте работоспособность приложения:

```
ash-work:~ curl --resolve echo.com:<INGRESS_EXTERNAL_IP> http://echo.com/handler
OK%
```

12. Для тестирования авторазвертывания измените немного код приложения. В файле репозитория app/app.py исправим строку return ‘OK' на return 'HANDLER OK'.

13. Выполните коммит изменений:

```
ash-work:k8s-conf-demo git add . && git commit -m "update" && git push
[master b863fad] update
1 file changed, 1 insertion(+), 1 deletion(-)

Перечисление объектов: 7, готово.
Подсчет объектов: 100% (7/7), готово.
При сжатии изменений используется до 4 потоков
Сжатие объектов: 100% (4/4), готово.
Запись объектов: 100% (4/4), 359 bytes | 359.00 KiB/s, готово.
Всего 4 (изменения 3), повторно использовано 0 (изменения 0)
```

14. Дождитесь окончания выполнения CI/CD и проверьте вывод приложения еще раз:

```
ash-work:~ curl --resolve echo.com:<INGRESS_EXTERNAL_IP> http://echo.com/handler
HANDLER OK%
```

Авторазвертывание новой версии прошло успешно.

<info>

**Примечание**

Конфигурационные файлы, приведенные в данной статье, являются тестовыми и предназначены для освоения механизмов работы Gitlab, регистри и развертывания образов в кластер на начальном уровне.

</info>

## Обратная связь

Возникли проблемы или остались вопросы? [Напишите нам, мы будем рады вам помочь](https://mcs.mail.ru/help/contact-us).
