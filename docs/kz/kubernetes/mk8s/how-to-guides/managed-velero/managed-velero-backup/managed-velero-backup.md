# {heading(Қолмен резервтік көшіру)[id=mk8s-velero-backup-managed]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Кластер деректерінің резервтік көшірмелерін қолмен жасау және оларды қалпына келтіру үшін {linkto(../../../concepts/addons-and-settings/addons#mk8s-addons-velero)[text=Velero]} аддонын пайдаланыңыз.

## {heading(Дайындық қадамдары)[id=mk8s-velero-backup-managed-prepare]}

{include(/kz/_includes/_create-test-cluster.md)[tags=managed]}
1. `kubectl` көмегімен кластерге қосыла алатыныңызға {linkto(../../../connect/kubectl#mk8s-kubectl)[text=көз жеткізіңіз]}.
1. Әлі жасалмаса, {linkto(../../../../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=OpenStack CLI орнатыңыз]}. Оның көмегімен бұлтта авторизациялана алатыныңызға көз жеткізіңіз.
1. Әлі орнатылмаса, {linkto(../../../instructions/addons/advanced-installation/install-advanced-velero#mk8s-install-advanced-velero)[text=Velero аддонын орнатыңыз]}.

## {heading({counter(managed-velero)}. Қосымшаны жасаңыз)[id=mk8s-velero-backup-managed-create-app]}

{include(/kz/_includes/_velero-magnum-how-to.md)[tags=create-app]}

## {heading({counter(managed-velero)}. Қосымшаның резервтік көшірмесін жасаңыз)[id=mk8s-velero-backup-managed-create]}

1. `coffee-backup.yaml` манифестін жасаңыз:

   ```yaml
   apiVersion: velero.io/v1
   kind: Backup
   metadata:
     name: coffee-backup
     namespace: velero
   spec:
     includedNamespaces:
       - example-app
   ```

1. Манифестті кластерге қолданыңыз:

   ```console
   kubectl apply -f coffee-backup.yaml
   ```

   Бұл манифест қосымшаның жұмысына қажетті ресурстар орналасқан `example-app` аттар кеңістігінің толық қолмен жасалған резервтік көшірмесін жасайды. Жасалған резервтік көшірменің өмір сүру мерзімі әдепкі бойынша — 72 сағат. Бұл уақыт өткеннен кейін резервтік көшірме жойылады.

1. (Қалауыңыз бойынша) Резервтік көшірмелерді автоматты түрде жасау кестесін {linkto(../../../how-to-guides/managed-velero/managed-backup-schedule#mk8s-backup-schedule-managed)[text=баптаңыз]}.

## {heading({counter(managed-velero)}. Қосымшаны резервтік көшірмеден қалпына келтіріңіз)[id=mk8s-velero-backup-managed-restore]}

1. Қосымшаның істен шығуын имитациялаңыз. Ол үшін қосымшаның жұмысына қажетті ресурстар орналасқан `example-app` аттар кеңістігін жойыңыз:

   ```console
   kubectl delete ns example-app
   ```

1. `coffee-restore.yaml` манифестін жасаңыз:

   ```yaml
   apiVersion: velero.io/v1
   kind: Restore
   metadata:
     name: coffee-restore
     namespace: velero
   spec:
     backupName: coffee-backup
   ```

1. Манифестті кластерге қолданыңыз:

   ```console
   kubectl apply -f coffee-restore.yaml
   ```

   Бұл манифест бұрын жасалған резервтік көшірмеден ресурстарды қалпына келтіреді. Деректер резервтік көшіру орындалған сол кластерде қалпына келтіріледі. Деректерді жаңа кластерге қалпына келтіру қажет болса:

    1. Кластерді {linkto(../../../instructions/create-cluster/create-webui-gen-2#mk8s-create-webui-gen-2)[text=жасаңыз]}.
    1. Кластерге {linkto(../../../instructions/addons/advanced-installation/install-advanced-velero#mk8s-install-advanced-velero)[text=Velero аддонын орнатыңыз]}.
    1. `coffee-restore.yaml` манифестін жасап, оны қолданыңыз.

1. Резервтік көшірмені қалпына келтіргеннен кейін қалған жүктеуіш теңдестіргішінің идентификаторы бар аннотацияны жойыңыз:

   ```console
   kubectl -n example-app annotate service coffee-svc loadbalancer.openstack.org/load-balancer-id-
   ```

   Осыдан кейін жаңа жүктеу теңдестіргіші жасалады.

1. Жүктеу теңдестіргішіне {linkto(../../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip)[text=Floating IP-мекенжайы]} тағайындалғанын күтіңіз.

   Теңдестіргіштің күйін мерзімді түрде тексеріп отырыңыз:

   ```console
   kubectl get svc -n example-app
   ```

   `EXTERNAL-IP` бағанында теңдестіргішке тағайындалған Floating IP-мекенжайы пайда болуы тиіс.

1. NGINX сұрауларға жауап беретініне көз жеткізіңіз:

   ```console
   curl <FLOATING_IP_ТЕҢДЕСТІРГІШ_МЕКЕНЖАЙЫ>
   ```

   Күтілетін нәтиже:

   ```text
   The coffee pod says Hello World to everyone! This file is located on the dynamically claimed Cinder ReadWriteOnce persistent volume.
   ```

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=mk8s-velero-backup-managed-delete]}

{include(/kz/_includes/_velero-magnum-how-to.md)[tags=delete-managed]}