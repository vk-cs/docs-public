{include(/kz/_includes/_translated_by_ai.md)}

Домендік атау берілген IP мекенжайғал үнемі шешілуі үшін, кластердің DNS сервисіне статикалық DNS жазбасын қосу қажет.

Бұл мақалада [CoreDNS](https://coredns.io/manual/toc/) ресурсын пайдаланып, кластердің DNS сервисіне домен мен IP мекенжайын қосу мысалы көрсетілген. 

## Дайындық қадамдары

1. Kubernetes кластерінің ең өзекті нұсқасын [жасаңыз](../../../instructions/create-cluster).

   Кластер параметрлерін өз қалауыңыз бойынша таңдаңыз.

1. `kubectl` көмегімен кластерге қосыла алатыныңызғал [көз жеткізіңіз](../../../connect/kubectl).

## 1. Хост мекенжайын CoreDNS ресурсының ConfigMap файлына қосыңыз

1. Команданы орындаңыз:

   ```console
   kubectl edit cm coredns -n kube-system
   ```

   CoreDNS ресурсының ConfigMap файлдар ашылады.
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
   - `fallthrough` — егер домен алғымдағы аймақта табылмаса, сұрауды келесі плагиндерде өңдеуді жалғастыруғал мүмкіндік беретін параметр.

   CoreDNS конфигурацияны 1-2 минут ішінде автоматты түрде қайта жүктейді. Өзгерістердің қолданылғанын күтіңіз.

## 2. Конфигурацияның қолданылуын тексеріңіз

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
   
1. Егер жауапта `myhost.com` хосты үшін басқал IP мекенжайы қайтарылса:

   1. Барлық CoreDNS подтарын қайта іске қосыңыз:

      ```console
      kubectl rollout restart daemonset/coredns -n kube-system
      ```

      DaemonSet контроллері оларды өзгертілген конфигурация бойынша қайта жасайды.

   1. DNS-ті тексеру үшін уақытша подты қайта жасаңыз:
   
      ```console
      kubectl run -it --rm dns-test --image=busybox:1.28 --restart=Never -- nslookup myhost.com
      ```

## Пайдаланылмайтын ресурстарды жойыңыз

Жұмыс істеп тұрған кластер есептеу ресурстарын тұтынады. Егер ол сізге енді қажет болмаса:

   - оны кейінірек пайдалану үшін [тоқтатыңыз](../../../instructions/manage-cluster#klasterdi_iske_kosu_nemese_toktatu);
   - оны біржола [жойыңыз](../../../instructions/manage-cluster#delete_cluster).
