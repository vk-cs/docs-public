{include(/kz/_includes/_translated_by_ai.md)}

Сіз Cloud Containers [кластерін масштабтауды](../../concepts/scale) қолмен орындай аласыз немесе кластерді жұмыс жүктемелерінің ([workloads](https://kubernetes.io/docs/concepts/workloads/)) өзгеріп отыратын қажеттіліктеріне бейімдеу үшін автоматты масштабтауды баптай аласыз.

## Тік масштабтау

Масштабтаудың бұл түрі master-түйіндерге және worker-түйіндер топтарына қолданылады. Масштабтау барысында кластер түйіндері үшін [виртуалды машиналар шаблондары](../../concepts/flavors) өзгереді, ал түйіндер саны өзгеріссіз қалады. Егер топтағы worker-түйіндер санын өзгерту қажет болса, [көлденең масштабтауды орындаңыз](#koldenen_masshtabtau).

### {heading(Master-түйіндерді масштабтау)[id=scale_master_nodes]}

{note:info}
Бұл операция тек [бірінші буын](/kz/kubernetes/k8s/concepts/cluster-generations) кластерлері үшін қолжетімді.
{/note}

1. [Тік масштабтау механизмі қалай жұмыс істейтінін оқып шығыңыз](../../concepts/scale).

1. [Масштабтау үшін квоталардың жеткілікті екеніне көз жеткізіңіз](/kz/tools-for-using-services/account/instructions/project-settings/manage#zhoba_kvotalaryn_karau).

1. Масштабтауды орындаңыз.

   {note:warn}

   Масштабтау барысында master-түйіндер орналасқан виртуалды машиналар кезекпен қайта іске қосылады.

   Егер кластер [бір master-түйінді қамтыса](../../concepts/architecture#cluster_topology), масштабтау кезінде Kubernetes API қолжетімсіз болады.

   {/note}

   {tabs}

   {tab(Жеке кабинет)}

   1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
   1. Қажетті кластер орналасқан жобаны таңдаңыз.
   1. **Контейнерлер** → **Kubernetes кластерлері** бөліміне өтіңіз.
   1. [Қажетті кластердің іске қосылғанына көз жеткізіңіз](../manage-cluster#start).
   1. Қажетті кластер үшін ![ ](/kz/assets/more-icon.svg "inline") белгішесін басып, **Master виртуалды машинасының түрін өзгерту** тармағын таңдаңыз.
   1. Қолжетімді [конфигурация үлгілерінің](/kz/computing/iaas/concepts/vm/flavor) тізімін сүзу үшін виртуалды машина санатын таңдаңыз.

      {note:info}

      Жоғары өнімді CPU бар үлгілер [техникалық қолдау](/kz/contacts) қызметіне сұрау бойынша қолжетімді. Бұл үлгілерді пайдалану үшін **Жоғары өнімді CPU** опциясын таңдаңыз.

      Толығырақ [Қолжетімді есептеу ресурстары](../../concepts/flavors#konfiguraciya_kalyptary) бөлімінде.

      {/note}
   1. Ашылмалы тізімнен қажетті виртуалды машина шаблонын таңдаңыз.
   1. **Сақтау** түймесін басыңыз.

   {/tab}

   {tab(Terraform)}
 
   1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack) көз жеткізіңіз және жобаға [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu).

   1. Егер бұл әлі жасалмаса, [Terraform орнатып, ортаны баптаңыз](/kz/tools-for-using-services/terraform/quick-start).

   1. [Қажетті кластердің іске қосылғанына көз жеткізіңіз](../manage-cluster#start).

   1. Кластердің master-түйіндері үшін пайдаланылатын жаңа виртуалды машина түрін анықтаңыз:

      1. Команданы орындаңыз:

         ```console
         openstack flavor list
         ```

         Қолжетімді виртуалды машина түрлері көрсетіледі.

      1. Қажетті виртуалды машина түрін таңдап, оның атауын **Name** бағанынан жазып алыңыз.

   1. Terraform конфигурациясы файлында қажетті [vkcs_compute_flavor](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/compute_flavor.md) дереккөзін өзгертіңіз:

      ```hcl
      # Уже существующий источник данных с типом виртуальной машины для кластера
      data "vkcs_compute_flavor" "k8s-master-flavor" {
         name = "<имя нового типа виртуальной машины>"
      }

      # Уже описанная конфигурация для кластера
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

### {heading(Worker-түйіндер топтарын масштабтау)[id=scale_worker_nodes]}

1. [Тік масштабтау механизмі қалай жұмыс істейтінін оқып шығыңыз](../../concepts/scale).

1. Масштабтауға дайындалыңыз:

   1. [Масштабтау үшін квоталардың жеткілікті екеніне көз жеткізіңіз](/kz/tools-for-using-services/account/instructions/project-settings/manage#zhoba_kvotalaryn_karau).
   1. Егер есептеу ресурстарының көлемін азайтуды жоспарласаңыз, worker-түйіндер тобындағы ресурстардың қорытынды көлемі жұмыс жүктемесін орналастыру үшін жеткілікті болатынына көз жеткізіңіз.
   1. Жұмыс жүктемесі үшін репликация бапталғанына және репликалар түйіндер тобындағы бірнеше worker-түйінге бөлінгеніне көз жеткізіңіз.

      Егер түйіндер тобында тек бір ғана worker-түйін болса, [топтағы түйіндер санын арттырыңыз](#koldenen_masshtabtau) және мүмкін болса, репликацияны баптаңыз.

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
   1. [Қажетті кластердің іске қосылғанына көз жеткізіңіз](../manage-cluster#start).
   1. Осы кластердегі қажетті түйіндер тобын табыңыз.
   1. Осы түйіндер тобы үшін ![ ](/kz/assets/more-icon.svg "inline") белгішесін басып, **Виртуалды машина түрін өзгерту** тармағын таңдаңыз.
   1. Қолжетімді [конфигурация үлгілерінің](/kz/computing/iaas/concepts/vm/flavor) тізімін сүзу үшін виртуалды машина санатын таңдаңыз. 

      {note:info}

      Жоғары өнімді CPU бар үлгілер [техникалық қолдау](/kz/contacts) қызметіне сұрау бойынша қолжетімді. Бұл үлгілерді пайдалану үшін **Жоғары өнімді CPU** опциясын таңдаңыз.

      Толығырақ [Қолжетімді есептеу ресурстары](../../concepts/flavors#konfiguraciya_kalyptary) бөлімінде.

      {/note}

   1. Ашылмалы тізімнен қажетті виртуалды машина шаблонын таңдаңыз.
   1. **Сақтау** түймесін басыңыз.

   {/tab}

   {tab(Terraform)}
   
   {note:info}
   Terraform арқылы басқару тек [бірінші буын](/kz/kubernetes/k8s/concepts/cluster-generations) кластерлері үшін қолжетімді.
   {/note}

   1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack) көз жеткізіңіз және жобаға [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu).

   1. Егер бұл әлі жасалмаса, [Terraform орнатып, ортаны баптаңыз](/kz/tools-for-using-services/terraform/quick-start).

   1. [Қажетті кластердің іске қосылғанына көз жеткізіңіз](../manage-cluster#start).

   1. Кластер түйіндері тобындағы worker-түйіндер үшін пайдаланылатын жаңа виртуалды машина түрін анықтаңыз:

      1. Команданы орындаңыз:

         ```console
         openstack flavor list
         ```

         Қолжетімді виртуалды машина түрлері көрсетіледі.

      1. Қажетті виртуалды машина түрін таңдап, оның атауын **Name** бағанынан жазып алыңыз.

   1. Terraform конфигурациясы файлында қажетті [vkcs_compute_flavor](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/compute_flavor.md) дереккөзін өзгертіңіз:

      ```hcl
      # Уже существующий источник данных с типом виртуальной машины для группы worker-узлов
      data "vkcs_compute_flavor" "k8s-node-group-flavor" {
         name = "<имя нового типа виртуальной машины>"
      }

      # Уже описанная конфигурация для группы узлов
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

## Көлденең масштабтау

Масштабтаудың бұл түрі worker-түйіндер топтарына қолданылады. Масштабтау барысында топтағы worker-түйіндер саны өзгереді, ал worker-түйіндер үшін [виртуалды машиналар шаблондары](../../concepts/flavors) өзгеріссіз қалады. Егер осы шаблондарды master-түйіндер немесе worker-түйіндер үшін өзгерту қажет болса, [тік масштабтауды орындаңыз](#tik_masshtabtau).

### Worker-түйіндер топтарын масштабтау

1. [Көлденең масштабтау механизмі қалай жұмыс істейтінін оқып шығыңыз](../../concepts/scale).

1. [Масштабтау үшін квоталардың жеткілікті екеніне көз жеткізіңіз](/kz/tools-for-using-services/account/instructions/project-settings/manage#zhoba_kvotalaryn_karau).

1. Масштабтауды орындаңыз:

   {tabs}

   {tab(Жеке кабинет)}

   1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
   1. Қажетті кластер орналасқан жобаны таңдаңыз.
   1. **Контейнерлер** → **Kubernetes кластерлері** бөліміне өтіңіз.
   1. [Қажетті кластердің іске қосылғанына көз жеткізіңіз](../manage-cluster#start).
   1. Осы кластердегі қажетті түйіндер тобын табыңыз.
   1. Осы түйіндер тобы үшін ![ ](/kz/assets/more-icon.svg "inline") белгішесін басып, **Масштабтау баптаулары** тармағын таңдаңыз.
   1. Пайда болған терезеде:

      1. **Автомасштабтауды қосу** опциясының өшірулі екеніне көз жеткізіңіз.
      1. Қажетті түйіндер санын орнатыңыз. Оны көбейтуге де, азайтуға да болады.
      1. **Өзгерістерді сақтау** түймесін басыңыз.

   {/tab}

   {tab(Terraform)}

   {note:info}
   Terraform арқылы басқару тек [бірінші буын](/kz/kubernetes/k8s/concepts/cluster-generations) кластерлері үшін қолжетімді.
   {/note}

   1. Егер бұл әлі жасалмаса, [Terraform орнатып, ортаны баптаңыз](/kz/tools-for-using-services/terraform/quick-start).

   1. [Қажетті кластердің іске қосылғанына көз жеткізіңіз](../manage-cluster#start).

   1. Terraform конфигурациясы файлында қажетті [vkcs_kubernetes_node_group](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_node_group.md) ресурсін өзгертіңіз:

      ```hcl
      ...

      # Уже описанная конфигурация для группы узлов
      resource "vkcs_kubernetes_node_group" "k8s-node-group" {
        name = "k8s-node-group"

        ...

        # Убедитесь, что опция, отвечающая за автомасштабирование, выключена (false).
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

### {heading(Worker-түйіндер топтарын автоматты масштабтауды баптау)[id=autoscale_worker_nodes]}

1. [Көлденең масштабтау механизмі қалай жұмыс істейтінін оқып шығыңыз](../../concepts/scale).

1. [Масштабтау үшін квоталардың жеткілікті екеніне көз жеткізіңіз](/kz/tools-for-using-services/account/instructions/project-settings/manage#zhoba_kvotalaryn_karau).

1. Автоматты масштабтауды баптаңыз:

   {tabs}

   {tab(Жеке кабинет)}

   1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
   1. Қажетті кластер орналасқан жобаны таңдаңыз.
   1. **Контейнерлер** → **Kubernetes кластерлері** бөліміне өтіңіз.
   1. [Қажетті кластердің іске қосылғанына көз жеткізіңіз](../manage-cluster#start).
   1. Осы кластердегі қажетті түйіндер тобын табыңыз.
   1. Осы түйіндер тобы үшін ![ ](/kz/assets/more-icon.svg "inline") белгішесін басып, **Масштабтау баптаулары** тармағын таңдаңыз.
   1. Пайда болған терезеде:

      1. **Автомасштабтауды қосу** опциясының қосулы екеніне көз жеткізіңіз.
      1. Түйіндердің ең аз және ең көп санын орнатыңыз. Масштабтау осы шектерде орындалады.
      1. **Өзгерістерді сақтау** түймесін басыңыз.

   {/tab}

   {tab(Terraform)}

   {note:info}
   Terraform арқылы басқару тек [бірінші буын](/kz/kubernetes/k8s/concepts/cluster-generations) кластерлері үшін қолжетімді.
   {/note}

   1. Егер бұл әлі жасалмаса, [Terraform орнатып, ортаны баптаңыз](/kz/tools-for-using-services/terraform/quick-start).

   1. [Қажетті кластердің іске қосылғанына көз жеткізіңіз](../manage-cluster#start).

   1. Terraform конфигурациясы файлында қажетті [vkcs_kubernetes_node_group](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_node_group.md) ресурсін өзгертіңіз:

      ```hcl
      ...

      # Уже описанная конфигурация для группы узлов
      resource "vkcs_kubernetes_node_group" "k8s-node-group" {
        name = "k8s-node-group"

        ...

        # Убедитесь, что опция, отвечающая за автомасштабирование, включена (true)
        autoscaling_enabled = true

        # Задайте количество узлов, в пределах которого будет выполняться масштабирование
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
