Чтобы доменное имя постоянно разрешалось в заданный IP-адрес, необходимо добавить статическую DNS-запись в DNS-сервис кластера.

В статье показан пример, как добавить домен и IP-адрес в DNS-сервис кластера, используя ресурс [СoreDNS](https://coredns.io/manual/toc/). 

## Подготовительные шаги

1. [Создайте](../../../service-management/create-cluster) кластер Kubernetes самой актуальной версии.

   Параметры кластера выберите на свое усмотрение.

1. [Убедитесь](../../../connect/kubectl), что вы можете подключиться к кластеру с помощью `kubectl`.

## 1. Добавьте адрес хоста в ConfigMap ресурса CoreDNS

1. Выполните команду:

   ```bash
   kubectl edit cm coredns -n kube-system
   ```

   Откроется ConfigMap ресурса CoreDNS.
1. Добавьте домен и IP-адрес в описание ресурса до блока `.:53`, как показано ниже:
  
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

   Здесь:

   - `8.8.8.8` — IP-адрес добавляемого домена.
   - `myhost.com` — доменное имя хоста.
   - `fallthrough` — параметр, который разрешает продолжить обработку запроса в следующих плагинах, если домен не найден в текущей зоне.

   CoreDNS перезагрузит конфигурацию автоматически в течение 1-2 минут. Дождитесь применения изменений.

## 2. Проверьте применение конфигурации

1. Создайте временный под:

   ```bash
   kubectl run -it --rm dns-test --image=busybox:1.28 --restart=Never -- nslookup myhost.com
   ```

   Ожидаемый вывод:

   ```bash
   Server:    10.254.0.10
   Address 1: 10.254.0.10 kube-dns.kube-system.svc.cluster.local

   Name:      myhost.com
   Address 1: 8.8.8.8
   ```
   
1. Если в ответе возвращается другой IP-адрес для хоста `myhost.com`:

   1. Перезапустите все поды CoreDNS:

      ```bash
      kubectl rollout restart daemonset/coredns -n kube-system
      ```

      Контроллер DaemonSet создаст их заново по измененной конфигурации.

   1. Повторите создание временного пода для проверки DNS:
   
      ```bash
      kubectl run -it --rm dns-test --image=busybox:1.28 --restart=Never -- nslookup myhost.com
      ```

## Удалите неиспользуемые ресурсы

Работающий кластер потребляет вычислительные ресурсы. Если он вам больше не нужен:

   - [остановите](../../../service-management/manage-cluster#zapustit_ili_ostanovit_klaster) его, чтобы воспользоваться им позже;
   - [удалите](../../../service-management/manage-cluster#delete_cluster) его навсегда.
