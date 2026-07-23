# {heading(Публичный IP для пода без балансировщика )[id=k8s-pip]}

Это практическое руководство описывает, как назначит конкретному поду в кластере Kubernetes в сервисе Cloud Containers доступ по [Floating IP](/ru/networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip) без создания балансировщика нагрузки и без балансировки трафика между репликами.

Для каких сценариев это может быть полезно:

- Game-серверы и приложения с собственным протоколом (UDP/TCP);
- STUN/TURN; 
- VPN-узлы;
- тестовые стенды; 
- legacy-приложения, которым нужен прямой внешний адрес на один экземпляр.

{note:info}
Это практическое руководство предназначено для кластеров {linkto(/ru/kubernetes/k8s/concepts/cluster-generations#k8s-cluster-generations)[text=первого поколения]}.
{/note}

## {heading(Подготовительные шаги)[id=k8s-pip-prepare]}

1. Обратитесь в [техническую поддержку](/ru/contacts), чтобы подключить свой проект к [SDN Sprut](/ru/networks/vnet/concepts/sdn#vnet-sdn-sprut), если это еще не сделано.
1. {linkto(/ru/kubernetes/k8s/instructions/create-cluster/create-webui#k8s-create-webui)[text=Создайте]} кластер Kubernetes актуальной версии, если это еще не сделано.
1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Установите и настройте]} `kubectl`, если это еще не сделано.
1. {linkto(../../connect/kubectl#k8s-kubectl-check-connection)[text=Подключитесь]} к кластеру при помощи `kubectl`.
1. [Установите](/ru/tools-for-using-services/cli/openstack-cli#openstack-install) клиент OpenStack и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#openstack-authorize) в проекте, если это еще не сделано.
1. Выделите в проекте свободный Floating IP.

## {heading({counter(pip)}. Ознакомьтесь с архитектурой решения)[id=k8s-pip-arch]}

```text
Интернет
   │  FIP (публичный адрес) : порт
   ▼
Порт OpenStack worker-узла  (внутренний IP узла, напр. 192.168.200.10)
   │  security group: разрешен нужный порт
   ▼
Узел кластера (worker VM)
   │  hostNetwork / hostPort
   ▼
Под, закрепленный на этом узле (nodeSelector/affinity)
```

Ключевые элементы:

- Floating IP → порт узла: публичный адрес получает конкретный worker‑узел.
- `hostNetwork` или `hostPort`: под слушает порт на сетевом интерфейсе узла, минуя Service и балансировщик.
- Закрепление пода на узле: под должен всегда попадать на тот узел, которому выдан Floating IP.
- Security group: на порту узла должен быть разрешен входящий трафик на нужный порт.

## {heading({counter(pip)}. Выберите одно из решений)[id=k8s-pip-arch]}

Вы можете использовать:

- [решение с подом в сети узла (`hostNetwork`)](#k8s-pip-network);
- [решение с пробросом порта узла (`hostPort`)](#k8s-pip-port).

## {heading({counter(pip)}. Используйте под в сети узла (hostNetwork))[id=k8s-pip-network]}

### {heading(3.1. Выберите узел и пометьте его)[id=k8s-pip-network]}

1. Выполните команду:

   ```bash
   kubectl get nodes -o wide
   # запомните имя узла и его INTERNAL-IP, например:
   # test-...-default-ng-0   Ready   ...   192.168.200.10
   ```

1. Пометьте узел, чтобы закрепить на нем под:

   ```bash
   kubectl label node <ИМЯ_УЗЛА> public-endpoint=true
   ```

### {heading(3.2. Разверните под, закрепленный на узле)[id=k8s-pip-deploy]}

1. Создайте манифест `app-hostnetwork.yaml`:

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: public-app
     namespace: public-demo
   spec:
     replicas: 1
     strategy:
       type: Recreate                      # hostNetwork: без наложения реплик на порт узла
     selector:
       matchLabels:
         app: public-app
     template:
       metadata:
         labels:
           app: public-app
       spec:
         hostNetwork: true                 # под слушает порты на IP узла
         dnsPolicy: ClusterFirstWithHostNet # чтобы работал внутрикластерный DNS
         nodeSelector:
           public-endpoint: "true"         # только на узле с FIP
         containers:
           - name: app
             # ПОЛНОЕ имя образа 
             # и образ из реестра, доступного узлу (или закэшированный)
             image: docker.io/library/nginx:1.27
             imagePullPolicy: IfNotPresent
             ports:
               - containerPort: 80          # = порт 80 на узле
   ```

1. Создайте пространство имен `public-demo` и примените манифест:

   ```bash
   kubectl create namespace public-demo
   kubectl apply -f app-hostnetwork.yaml
   kubectl -n public-demo get pod -o wide   # под должен быть на выбранном узле, pod IP = IP узла
   ```

При использовании `hostNetwork` контейнер слушает порт непосредственно на узле. Убедитесь, что порт (здесь `80`) не занят другими компонентами узла. Реплика должна быть одна, иначе несколько подов на одном узле будут конфликтовать за порт.

### {heading(3.3. Выдайте узлу Floating IP)[id=k8s-pip-ip]}

Найдите порт OpenStack узла по его внутреннему IP и привяжите Floating IP одним из способов:

{tabs}
{tab(Личный кабинет)}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
1. Выберите проект, где находится нужный IP-адрес.
1. Перейдите в раздел **Виртуальные сети** → **IP-адреса**.
1. Перейдите на вкладку **Floating IP**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для Floating IP-адреса, у которого в столбце **Внутренний IP** указано `Не привязан`, и выберите пункт **Привязать IP**.
1. Из выпадающего списка выберите порт OpenStack с внутренним IP-адресом, к которому выполняется привязка.
1. Нажмите кнопку **Подтвердить**.

{/tab}

{tab(OpenStack CLI)}

Выполните команды:

```bash
# порт узла по его INTERNAL-IP
openstack port list --fixed-ip ip-address=192.168.200.10 -c ID -c Fixed_IP_Addresses

# при необходимости выделить новый FIP в проект (из внешней сети ext-net)
openstack floating ip create <EXTERNAL_NET> # напр. ext-net / internet

# привязать FIP к порту узла
openstack floating ip set <FIP_ADDRESS_или_ID> --port <PORT_ID>
```
{/tab}
{/tabs}

Подробнее в разделе [Floating IP-адреса](/ru/networks/vnet/instructions/ip/floating-ip#vnet-floating-ip).

### {heading(3.4. Откройте порт в security group)[id=k8s-pip-sec]}

Порту узла назначена группа безопасности `<ИМЯ_КЛАСТЕРА>-minion`. Изменять штатные правила кластера рискованно, поэтому рекомендуется создать отдельную security group с нужным правилом и дополнительно назначить ее на порт узла:

```bash
openstack security group create pub-app-sg --description "Public access to public-app"
openstack security group rule create pub-app-sg \
  --ingress --protocol tcp --dst-port 80 --remote-ip 0.0.0.0/0

# добавить группу к порту узла (не снимая существующие)
openstack port set <PORT_ID> --security-group pub-app-sg
```

Ограничьте `--remote-ip` доверенными сетями вместо `0.0.0.0/0`, где это возможно.

### {heading(3.5. Проверьте доступ снаружи)[id=k8s-pip-check]}

Выполните команду: 

```bash
curl http://<FIP_ADDRESS>/
```

Должна вернуться страница nginx.

## {heading({counter(pip)}. Используйте проброс порта узла (hostPort))[id=k8s-pip-port]}

Если полный `hostNetwork` не нужен (под остается в сети CNI, но один порт публикуется на узле), используйте `hostPort`. Это точечнее и не требует `ClusterFirstWithHostNet`. Для этого:

1. Сосздайте манифест `app-hostport.yaml`:

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: public-app
     namespace: public-demo
   spec:
     replicas: 1
     selector:
       matchLabels:
         app: public-app
     template:
       metadata:
         labels:
           app: public-app
       spec:
         nodeSelector:
           public-endpoint: "true"
         containers:
           - name: app
             image: nginx:1.27
             ports:
               - containerPort: 80
                 hostPort: 80        # порт 80 узла -> порт 80 контейнера
   ```

1. Повторите шаги из разделов **3.3–3.5**.

Для сценария «по одному поду на каждом узле» вместо `Deployment` используйте `DaemonSet` с `hostPort` и выдавайте Floating IP каждому узлу — но это в таком случае это будет не один публичный адрес, а несколько независимых.

## {heading(Удалите неиспользуемые ресурсы)[id=k8s-pip-port]}

Работающий кластер тарифицируется и потребляет вычислительные ресурсы. Если ресурсы Kubernetes, созданные для прохождения этого практического руководства, вам больше не нужны, удалите их:

1. Отвяжите и удалите Floating IP:

   ```bash
   openstack floating ip unset <FIP_ID> --port
   openstack floating ip delete <FIP_ID>
   ```

1. Уберите security group с порта и удалите ее:

   ```console
   openstack port unset <PORT_ID> --security-group pub-app-sg
   openstack security group delete pub-app-sg
   ```

1. Удалите нагрузку:

   ```console
   kubectl delete namespace public-demo
   kubectl label node <ИМЯ_УЗЛА> public-endpoint-
   ```
   
{include(/ru/_includes/_delete-test-cluster-short.md)}

## {heading(Рекомендации, как закрепить публичный адрес за подом надежно)[id=k8s-pip-recs]}

Чтобы при пересоздании пода и его переезде на другой узел Floating IP не остался на прежнем, используйте эти меры предосторожности:

1. Установите `nodeSelector`, `nodeAffinity` на метку узла, как описано в разделах выше — под всегда будет на узле с Floating IP.
1. Не используйте автомасштабируемую группу для этого узла, либо закрепите Floating IP на определенном стабильном узле. При замене узла переназначьте Floating IP на новый порт.
1. Установите значение `replicas: 1` для `hostNetwork`/`hostPort`, иначе произойдет конфликт за порт узла.
1. Продумайте перенос Floating IP: при пересоздании узла выполните команду:

   ```console
   openstack floating ip set <FIP> --port <новый_PORT_ID>
   ```

   Это можно автоматизировать оператором/скриптом, отслеживающим узел с меткой `public-endpoint=true`.
1. Учитывайте security groups: при пересоздании узла назначьте на его порт вашу `pub-app-sg`.

## {heading(Ограничения)[id=k8s-pip-limitations]}

- Нет отказоустойчивости и балансировки — это осознанный выбор данного сценария: один под на одном узле. Падение узла означает потерю доступа, пока Floating IP не переедет.
- Floating IP не следует за подом автоматически — привязка идет к порту узла, а не к поду.
- Порты узла уникальны — на одном узле нельзя назначить два пода на один и тот же `hostPort`/`hostNetwork`‑порт.
- `hostNetwork` снижает изоляцию — под видит сетевой стек узла. Используйте только для доверенных нагрузок и ограничивайте права (`securityContext`).
- Прямого Floating IP на под нет в стандартном CNI (Calico/Cilium) VK Cloud — только через узел.
- Security groups кластера (`<кластер>-minion`) менять не рекомендуется — используйте отдельную группу.

