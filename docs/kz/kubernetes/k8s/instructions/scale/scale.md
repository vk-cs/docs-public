# {heading(Кластер түйіндерін масштабтау)[id=k8s-instructions-scale]}

{include(/kz/_includes/_translated_by_ai.md)}

Сіз Cloud Containers {linkto(../../concepts/scale#k8s-scale)[text=кластерін масштабтауды]} қолмен орындай аласыз немесе кластерді жұмыс жүктемелерінің ([workloads](https://kubernetes.io/docs/concepts/workloads/)) өзгеріп отыратын қажеттіліктеріне бейімдеу үшін автоматты масштабтауды баптай аласыз.

## {heading(Тік масштабтау)[id=k8s-instructions-scale-vertical]}

Масштабтаудың бұл түрі master-түйіндерге және worker-түйіндер топтарына қолданылады. Масштабтау барысында кластер түйіндері үшін {linkto(../../concepts/flavors#k8s-flavors)[text=виртуалды машиналар шаблондары]} өзгереді, ал түйіндер саны өзгеріссіз қалады. Егер топтағы worker-түйіндер санын өзгерту қажет болса, {linkto(k8s-instructions-scale-horizontal)[text=көлденең масштабтауды орындаңыз]}.

### {heading(Master-түйіндерді масштабтау)[id=k8s-instructions-scale-vertical-master-nodes]}

1. {linkto(../../concepts/scale#k8s-scale)[text=Тік масштабтау механизмі қалай жұмыс істейтінін оқып шығыңыз]}.

1. {linkto(../../../../tools-for-using-services/account/instructions/project-settings/manage#project-view-quotas)[text=Масштабтау үшін квоталардың жеткілікті екеніне көз жеткізіңіз]}.

1. Масштабтауды орындаңыз.

   {note:warn}

   Масштабтау барысында master-түйіндер орналасқан виртуалды машиналар кезекпен қайта іске қосылады.

   Егер кластер {linkto(../../concepts/architecture#k8s-architecture-topology)[text=бір master-түйінді қамтыса]}, масштабтау кезінде Kubernetes API қолжетімсіз болады.

   {/note}

   {tabs}

   {tab(Жеке кабинет)}

   1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
   1. Қажетті кластер орналасқан жобаны таңдаңыз.
   1. **Контейнерлер** → **Kubernetes кластерлері** бөліміне өтіңіз.
   1. {linkto(../manage-cluster#k8s-manage-cluster-start)[text=Қажетті кластердің іске қосылғанына көз жеткізіңіз]}.
   1. Қажетті кластер үшін ![](../../../../assets/more-icon.svg "inline") белгішесін басып, **Master виртуалды машинасының түрін өзгерту** тармағын таңдаңыз.
   1. Қолжетімді {linkto(../../../../computing/iaas/concepts/vm/flavor#iaas-concepts-vm-flavor)[text=конфигурация үлгілерінің]} тізімін сүзу үшін виртуалды машина санатын таңдаңыз.

      {note:info}

      Жоғары өнімді CPU бар үлгілер [техникалық қолдау](/kz/contacts) қызметіне сұрау бойынша қолжетімді. Бұл үлгілерді пайдалану үшін **Жоғары өнімді CPU** опциясын таңдаңыз.

      Толығырақ {linkto(../../concepts/flavors#k8s-flavors-vm-flavor)[text=Қолжетімді есептеу ресурстары]} бөлімінде.

      {/note}
   1. Ашылмалы тізімнен қажетті виртуалды машина шаблонын таңдаңыз.
   1. **Сақтау** түймесін басыңыз.

   {/tab}

   {tab(Terraform)}

   {note:info}
   Terraform арқылы басқару тек {linkto(../../concepts/cluster-generations#k8s-cluster-generations)[text=бірінші буын]} кластерлері үшін қолжетімді.
   {/note}
 
   1. OpenStack клиенті {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіңіз және жобаға {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.

   1. Егер бұл әлі жасалмаса, [Terraform орнатып, ортаны баптаңыз](../../../../tools-for-using-services/terraform/quick-start).

   1. {linkto(../manage-cluster#k8s-manage-cluster-start)[text=Қажетті кластердің іске қосылғанына көз жеткізіңіз]}.

   1. Кластердің master-түйіндері үшін пайдаланылатын жаңа виртуалды машина түрін анықтаңыз:

      1. Команданы орындаңыз:

         ```console
         openstack flavor list
         ```

         Қолжетімді виртуалды машина түрлері көрсетіледі.

      1. Қажетті виртуалды машина түрін таңдап, оның атауын **Name** бағанынан жазып алыңыз.

   1. Terraform конфигурациясы файлында қажетті [vkcs_compute_flavor](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/compute_flavor.md) дереккөзін өзгертіңіз:

      ```hcl
      # Кластер үшін виртуалды машина түрі бар бұрыннан бар дереккөз
      data "vkcs_compute_flavor" "k8s-master-flavor" {
         name = "<имя нового типа виртуальной машины>"
      }

      # Кластер үшін бұрыннан сипатталған конфигурация
      resource "vkcs_kubernetes_cluster" "k8s-cluster" {
         name                = "k8s-cluster"
         master_flavor       = data.vkcs_compute_flavor.k8s-master-flavor.id
        ...

      }
      ```

   1. Terraform конфигурация файлының дұрыстығын тексеріңіз:

      ```console
      terraform validate
      ```

   1. Жоспарланған өзгерістермен танысыңыз:

      ```console
      terraform plan
      ```

   1. Жоспарланған өзгерістерді қолданыңыз:

      ```console
      terraform apply
      ```

   {/tab}

   {/tabs}

### {heading(Worker-түйіндер топтарын масштабтау)[id=k8s-instructions-scale-vertical-worker-nodes]}

1. {linkto(../../concepts/scale#k8s-scale)[text=Тік масштабтау механизмі қалай жұмыс істейтінін оқып шығыңыз]}.

1. Масштабтауға дайындалыңыз:

   1. {linkto(../../../../tools-for-using-services/account/instructions/project-settings/manage#project-view-quotas)[text=Масштабтау үшін квоталардың жеткілікті екеніне көз жеткізіңіз]}.
   1. Егер есептеу ресурстарының көлемін азайтуды жоспарласаңыз, worker-түйіндер тобындағы ресурстардың қорытынды көлемі жұмыс жүктемесін орналастыру үшін жеткілікті болатынына көз жеткізіңіз.
   1. Жұмыс жүктемесі үшін репликация бапталғанына және репликалар түйіндер тобындағы бірнеше worker-түйінге бөлінгеніне көз жеткізіңіз.

      Егер түйіндер тобында тек бір ғана worker-түйін болса, {linkto(k8s-instructions-scale-horizontal)[text=топтағы түйіндер санын арттырыңыз]} және мүмкін болса, репликацияны баптаңыз.

1. Масштабтауды орындаңыз.

   {note:warn}

   Масштабтау барысында worker-түйіндер орналасқан виртуалды машиналар кезекпен қайта іске қосылады.

   Репликация бапталмаған жұмыс жүктемелері масштабтау кезінде қолжетімсіз болады.

   {/note}

   {tabs}

   {tab(Жеке кабинет)}

   1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
   1. Қажетті кластер орналасқан жобаны таңдаңыз.
   1. **Контейнерлер** → **Kubernetes кластерлері** бөліміне өтіңіз.
   1. {linkto(../manage-cluster#k8s-manage-cluster-start)[text=Қажетті кластердің іске қосылғанына көз жеткізіңіз]}.
   1. Осы кластердегі қажетті түйіндер тобын табыңыз.
   1. Осы түйіндер тобы үшін ![](../../../../assets/more-icon.svg "inline") белгішесін басып, **Виртуалды машина түрін өзгерту** тармағын таңдаңыз.
   1. Қолжетімді {linkto(../../../../computing/iaas/concepts/vm/flavor#iaas-concepts-vm-flavor)[text=конфигурация үлгілерінің]} тізімін сүзу үшін виртуалды машина санатын таңдаңыз. 

      {note:info}

      Жоғары өнімді CPU бар үлгілер [техникалық қолдау](/kz/contacts) қызметіне сұрау бойынша қолжетімді. Бұл үлгілерді пайдалану үшін **Жоғары өнімді CPU** опциясын таңдаңыз.

      Толығырақ {linkto(../../concepts/flavors#k8s-flavors-vm-flavor)[text=Қолжетімді есептеу ресурстары]} бөлімінде.

      {/note}

   1. Ашылмалы тізімнен қажетті виртуалды машина шаблонын таңдаңыз.
   1. **Сақтау** түймесін басыңыз.

   {/tab}

   {tab(Terraform)}
   
   {note:info}
   Terraform арқылы басқару тек {linkto(../../concepts/cluster-generations#k8s-cluster-generations)[text=бірінші буын]} кластерлері үшін қолжетімді.
   {/note}

   1. OpenStack клиенті {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіңіз және жобаға {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.

   1. Егер бұл әлі жасалмаса, [Terraform орнатып, ортаны баптаңыз](../../../../tools-for-using-services/terraform/quick-start).

   1. {linkto(../manage-cluster#k8s-manage-cluster-start)[text=Қажетті кластердің іске қосылғанына көз жеткізіңіз]}.

   1. Кластер түйіндері тобындағы worker-түйіндер үшін пайдаланылатын жаңа виртуалды машина түрін анықтаңыз:

      1. Команданы орындаңыз:

         ```console
         openstack flavor list
         ```

         Қолжетімді виртуалды машина түрлері көрсетіледі.

      1. Қажетті виртуалды машина түрін таңдап, оның атауын **Name** бағанынан жазып алыңыз.

   1. Terraform конфигурациясы файлында қажетті [vkcs_compute_flavor](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/compute_flavor.md) дереккөзін өзгертіңіз:

      ```hcl
      # Түйіндер тобындағы worker-түйіндер үшін виртуалды машина түрі бар бұрыннан бар дереккөз
      data "vkcs_compute_flavor" "k8s-node-group-flavor" {
         name = "<имя нового типа виртуальной машины>"
      }

      # Түйіндер тобы үшін бұрыннан сипатталған конфигурация
      resource "vkcs_kubernetes_node_group" "k8s-node-group" {
        name = "k8s-node-group"
        cluster_id = vkcs_kubernetes_cluster.k8s-cluster.id
        flavor_id = data.vkcs_compute_flavor.k8s-node-group-flavor.id
        ...

      }
      ```

   1. Terraform конфигурация файлының дұрыстығын тексеріңіз:

      ```console
      terraform validate
      ```

   1. Жоспарланған өзгерістермен танысыңыз:

      ```console
      terraform plan
      ```

   1. Жоспарланған өзгерістерді қолданыңыз:

      ```console
      terraform apply
      ```

   {/tab}

   {/tabs}

## {heading(Көлденең масштабтау)[id=k8s-instructions-scale-horizontal]}

Масштабтаудың бұл түрі worker-түйіндер топтарына қолданылады. Масштабтау барысында топтағы worker-түйіндер саны өзгереді, ал worker-түйіндер үшін {linkto(../../concepts/flavors#k8s-flavors)[text=виртуалды машиналар шаблондары]} өзгеріссіз қалады. Егер осы шаблондарды master-түйіндер немесе worker-түйіндер үшін өзгерту қажет болса, {linkto(#k8s-instructions-scale-vertical)[text=тік масштабтауды орындаңыз]}.

### {heading(Worker-түйіндер топтарын масштабтау)[id=k8s-instructions-scale-horizontal-worker-nodes]}

1. {linkto(../../concepts/scale#k8s-scale)[text=Көлденең масштабтау механизмі қалай жұмыс істейтінін оқып шығыңыз]}.

1. {linkto(../../../../tools-for-using-services/account/instructions/project-settings/manage#project-view-quotas)[text=Масштабтау үшін квоталардың жеткілікті екеніне көз жеткізіңіз]}.

1. Масштабтауды орындаңыз:

   {tabs}

   {tab(Жеке кабинет)}

   1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
   1. Қажетті кластер орналасқан жобаны таңдаңыз.
   1. **Контейнерлер** → **Kubernetes кластерлері** бөліміне өтіңіз.
   1. {linkto(../manage-cluster#k8s-manage-cluster-start)[text=Қажетті кластердің іске қосылғанына көз жеткізіңіз]}.
   1. Осы кластердегі қажетті түйіндер тобын табыңыз.
   1. Осы түйіндер тобы үшін ![](../../../../assets/more-icon.svg "inline") белгішесін басып, **Масштабтау баптаулары** тармағын таңдаңыз.
   1. Пайда болған терезеде:

      1. **Автомасштабтауды қосу** опциясының өшірулі екеніне көз жеткізіңіз.
      1. Қажетті түйіндер санын орнатыңыз. Оны көбейтуге де, азайтуға да болады.
      1. **Өзгерістерді сақтау** түймесін басыңыз.

   {/tab}

   {tab(Terraform)}

   {note:info}
   Terraform арқылы басқару тек {linkto(../../concepts/cluster-generations#k8s-cluster-generations)[text=бірінші буын]} кластерлері үшін қолжетімді.
   {/note}

   1. Егер бұл әлі жасалмаса, [Terraform орнатып, ортаны баптаңыз](../../../../tools-for-using-services/terraform/quick-start).

   1. {linkto(../manage-cluster#k8s-manage-cluster-start)[text=Қажетті кластердің іске қосылғанына көз жеткізіңіз]}.

   1. Terraform конфигурациясы файлында қажетті [vkcs_kubernetes_node_group](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_node_group.md) ресурсін өзгертіңіз:

      ```hcl
      ...

      # Түйіндер тобы үшін бұрыннан сипатталған конфигурация
      resource "vkcs_kubernetes_node_group" "k8s-node-group" {
        name = "k8s-node-group"

        ...

        # Автомасштабтауға жауап беретін опцияның өшірулі екеніне көз жеткізіңіз (false).
        autoscaling_enabled = false

        node_count = <нужное количество узлов>

        ...

      }
      ...
      ```

   1. Terraform конфигурация файлының дұрыстығын тексеріңіз:

      ```console
      terraform validate
      ```

   1. Жоспарланған өзгерістермен танысыңыз:

      ```console
      terraform plan
      ```

   1. Жоспарланған өзгерістерді қолданыңыз:

      ```console
      terraform apply
      ```

   {/tab}

   {/tabs}

### {heading(Worker-түйіндер топтарын автоматты масштабтауды баптау)[id=k8s-instructions-scale-horizontal-autoscaling-worker-nodes]}

1. {linkto(../../concepts/scale#k8s-scale)[text=Көлденең масштабтау механизмі қалай жұмыс істейтінін оқып шығыңыз]}.

1. {linkto(../../../../tools-for-using-services/account/instructions/project-settings/manage#project-view-quotas)[text=Масштабтау үшін квоталардың жеткілікті екеніне көз жеткізіңіз]}.

1. Автоматты масштабтауды баптаңыз:

   {tabs}

   {tab(Жеке кабинет)}

   1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
   1. Қажетті кластер орналасқан жобаны таңдаңыз.
   1. **Контейнерлер** → **Kubernetes кластерлері** бөліміне өтіңіз.
   1. {linkto(../manage-cluster#k8s-manage-cluster-start)[text=Қажетті кластердің іске қосылғанына көз жеткізіңіз]}.
   1. Осы кластердегі қажетті түйіндер тобын табыңыз.
   1. Осы түйіндер тобы үшін ![](../../../../assets/more-icon.svg "inline") белгішесін басып, **Масштабтау баптаулары** тармағын таңдаңыз.
   1. Пайда болған терезеде:

      1. **Автомасштабтауды қосу** опциясының қосулы екеніне көз жеткізіңіз.
      1. Түйіндердің ең аз және ең көп санын орнатыңыз. Масштабтау осы шектерде орындалады.
      1. **Өзгерістерді сақтау** түймесін басыңыз.

   {/tab}

   {tab(Terraform)}

   {note:info}
   Terraform арқылы басқару тек {linkto(../../concepts/cluster-generations#k8s-cluster-generations)[text=бірінші буын]} кластерлері үшін қолжетімді.
   {/note}

   1. Егер бұл әлі жасалмаса, [Terraform орнатып, ортаны баптаңыз](../../../../tools-for-using-services/terraform/quick-start).

   1. {linkto(../manage-cluster#k8s-manage-cluster-start)[text=Қажетті кластердің іске қосылғанына көз жеткізіңіз]}.

   1. Terraform конфигурациясы файлында қажетті [vkcs_kubernetes_node_group](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_node_group.md) ресурсін өзгертіңіз:

      ```hcl
      ...

      # Түйіндер тобы үшін бұрыннан сипатталған конфигурация
      resource "vkcs_kubernetes_node_group" "k8s-node-group" {
        name = "k8s-node-group"

        ...

        # Автомасштабтауға жауап беретін опцияның қосулы екеніне көз жеткізіңіз (true)
        autoscaling_enabled = true

        # Масштабтау орындалатын шектердегі түйіндер санын орнатыңыз
        min_nodes = <минимальное количество узлов>
        max_nodes = <максимальное количество узлов>

        ...

      }
      ...
      ```

   1. Terraform конфигурация файлының дұрыстығын тексеріңіз:

      ```console
      terraform validate
      ```

   1. Жоспарланған өзгерістермен танысыңыз:

      ```console
      terraform plan
      ```

   1. Жоспарланған өзгерістерді қолданыңыз:

      ```console
      terraform apply
      ```

   {/tab}

   {/tabs}
