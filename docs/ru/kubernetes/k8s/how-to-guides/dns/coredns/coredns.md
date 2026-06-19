# {heading(Добавление статических DNS-записей)[id=k8s-coredns]}

Чтобы доменное имя постоянно разрешалось в заданный IP-адрес, необходимо добавить статическую DNS-запись в DNS-сервис кластера.

В статье показан пример, как добавить домен и IP-адрес в DNS-сервис кластера, используя ресурс [СoreDNS](https://coredns.io/manual/toc/). 

## {heading(Подготовительные шаги)[id=k8s-coredns-prepare]}

{include(/ru/_includes/_create-test-cluster.md)}

   Параметры кластера выберите на свое усмотрение.

1. {linkto(../../../connect/kubectl#k8s-kubectl)[text=Убедитесь]}, что вы можете подключиться к кластеру с помощью `kubectl`.

## {heading(1. Добавьте адрес хоста в ConfigMap ресурса CoreDNS)[id=k8s-coredns-add-address]}

1. Выполните команду:

   ```console
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

## {heading(2. Проверьте применение конфигурации)[id=k8s-coredns-config-check]}

1. Создайте временный под:

   ```console
   kubectl run -it --rm dns-test --image=busybox:1.28 --restart=Never -- nslookup myhost.com
   ```

   Ожидаемый вывод:

   ```console
   Server:    10.254.0.10
   Address 1: 10.254.0.10 kube-dns.kube-system.svc.cluster.local

   Name:      myhost.com
   Address 1: 8.8.8.8
   ```
   
1. Если в ответе возвращается другой IP-адрес для хоста `myhost.com`:

   1. Перезапустите все поды CoreDNS:

      ```console
      kubectl rollout restart daemonset/coredns -n kube-system
      ```

      Контроллер DaemonSet создаст их заново по измененной конфигурации.

   1. Повторите создание временного пода для проверки DNS:
   
      ```console
      kubectl run -it --rm dns-test --image=busybox:1.28 --restart=Never -- nslookup myhost.com
      ```

{ifdef(public)}
## {heading(Удалите неиспользуемые ресурсы)[id=k8s-coredns-delete]}

{include(/ru/_includes/_delete-test-cluster.md)}
{/ifdef}