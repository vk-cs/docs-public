# {heading(Статикалық DNS жазбаларын қосу)[id=k8s-coredns]}

{include(/kz/_includes/_translated_by_ai.md)}

Домендік атау берілген IP мекенжайға үнемі шешілуі үшін, кластердің DNS сервисіне статикалық DNS жазбасын қосу қажет.

Мақалада [СoreDNS](https://coredns.io/manual/toc/) ресурсын пайдаланып, домен мен IP мекенжайды кластердің DNS сервисіне қалай қосу керектігінің мысалы көрсетілген. 

## {heading(Дайындық қадамдары)[id=k8s-coredns-prepare]}

{include(/kz/_includes/_create-test-cluster.md)}

   Кластер параметрлерін өз қалауыңыз бойынша таңдаңыз.

1. `kubectl` көмегімен кластерге қосыла алатыныңызға {linkto(../../../connect/kubectl#k8s-kubectl)[text=көз жеткізіңіз]}.

## {heading(1. Хост мекенжайын CoreDNS ресурсының ConfigMap файлына қосыңыз)[id=k8s-coredns-add-address]}

1. Команданы орындаңыз:

   ```console
   kubectl edit cm coredns -n kube-system
   ```

   CoreDNS ресурсының ConfigMap файлы ашылады.
1. Төменде көрсетілгендей, домен мен IP мекенжайды ресурс сипаттамасына `.:53` блогының алдына қосыңыз:

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

   Мұнда:

   - `8.8.8.8` — қосылатын доменнің IP мекенжайы.
   - `myhost.com` — хосттың домендік атауы.
   - `fallthrough` — егер домен ағымдағы аймақта табылмаса, сұрауды келесі плагиндерде өңдеуді жалғастыруға мүмкіндік беретін параметр.

   CoreDNS конфигурацияны 1-2 минут ішінде автоматты түрде қайта жүктейді. Өзгерістердің қолданылғанын күтіңіз.

## {heading(2. Конфигурацияның қолданылуын тексеріңіз)[id=k8s-coredns-config-check]}

1. Уақытша под жасаңыз:

   ```console
   kubectl run -it --rm dns-test --image=busybox:1.28 --restart=Never -- nslookup myhost.com
   ```

   Күтілетін шығыс:

   ```console
   Server:    10.254.0.10
   Address 1: 10.254.0.10 kube-dns.kube-system.svc.cluster.local

   Name:      myhost.com
   Address 1: 8.8.8.8
   ```

1. Егер жауапта `myhost.com` хосты үшін басқа IP мекенжай қайтарылса:

   1. Барлық CoreDNS подтарын қайта іске қосыңыз:

      ```console
      kubectl rollout restart daemonset/coredns -n kube-system
      ```

      DaemonSet контроллері оларды өзгертілген конфигурация бойынша қайта жасайды.

   1. DNS-ті тексеру үшін уақытша подты қайта жасаңыз:

      ```console
      kubectl run -it --rm dns-test --image=busybox:1.28 --restart=Never -- nslookup myhost.com
      ```

{ifdef(public)}
## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=k8s-coredns-delete]}

{include(/kz/_includes/_delete-test-cluster.md)}
{/ifdef}
