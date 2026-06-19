# {heading(worker-түйіндер тобын басқару)[id=k8s-manage-node-group]}

{include(/kz/_includes/_translated_by_ai.md)}

{note:warn}

Terraform арқылы кластермен кез келген операцияны орындамас бұрын {linkto(../helpers/terraform-howto#k8s-terraform-howto-features)[text=Terraform пайдалану]} бөліміндегі ақпаратпен танысыңыз.

{/note}

## {heading(worker-түйіндер тобын қосу)[id=k8s-manage-node-group-add-group]}

{tabs}

{tab(Жеке кабинет)}

1. [VK Cloud жеке кабинетіне өтіңіз](https://kz.cloud.vk.com/app/).
1. Қажетті кластер орналасқан жобаны таңдаңыз.
1. **Контейнеры** → **Кластеры Kubernetes** бөліміне өтіңіз.
1. Қажетті кластер үшін ![](../../../../assets/more-icon.svg "inline") белгішесін басып, **Добавить группу узлов** тармағын таңдаңыз.
1. Түйіндер тобы үшін {linkto(../helpers/node-group-settings#k8s-node-group-settings)[text=баптауларды]} орнатыңыз.
1. **Добавить группу узлов** түймесін басыңыз.

{/tab}

{tab(Terraform)}

1. Кластердің worker-түйіндер тобы үшін қандай виртуалды машина түрлері пайдаланылатынын анықтаңыз:

   1. Команданы орындаңыз:

      ```console
      openstack flavor list
      ```

      Қолжетімді виртуалды машина түрлері шығарылады.

   1. Қажетті виртуалды машина түрлерін таңдап, олардың атауларын **Name** бағанынан жазып алыңыз.

1. Terraform конфигурация файлына [vkcs_kubernetes_node_group](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_node_group.md) ресурсын және қажетті дереккөздерді қосыңыз:

   ```hcl
   ...

   # Уже описанная конфигурация для кластера
   resource "vkcs_kubernetes_cluster" "k8s-cluster" { ... }

   ...

   # Новый источник данных — тип виртуальной машины для узлов
   data "vkcs_compute_flavor" "k8s-node-group-flavor" {
    name = "<выбранный тип виртуальной машины>"
   }

   # Новый ресурс — группа worker-узлов
   resource "vkcs_kubernetes_node_group" "k8s-node-group" {
     name = "k8s-node-group"
     node_count = <количество узлов в группе>
     cluster_id = vkcs_kubernetes_cluster.k8s-cluster.id
     flavor_id = data.vkcs_compute_flavor.k8s-node-group-flavor.id
   }
   ```

   Қажет болса, ресурс құжаттамасында келтірілген қосымша баптауларды орнатыңыз.

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

## {heading(Масштабтау параметрлерін баптау)[id=k8s-manage-node-group-scaling-options]}

Сіз worker-түйіндер тобының өлшемін қолмен өзгерте аласыз немесе автомасштабтауды баптай аласыз. Сондай-ақ бұрыннан бар worker-түйіндер тобы үшін ВМ шаблонын өзгерте аласыз. 

Бұл операциялар {linkto(../scale#k8s-instructions-scale)[text=Кластер түйіндерін масштабтау]} бөлімінде толық сипатталған.

## {heading(Белгілер мен шектеулерді баптау)[id=k8s-manage-node-group-labels-taints]}

{note:warn}

Егер түйінде жұмыс жүктемесі әлдеқашан орналастырылған болса, шектеулерді (taints) абайлап баптаңыз.

Шектеулерді қайта баптау подтардың басқа түйіндерге көшірілуіне (eviction) әкелуі мүмкін. Егер ол түйіндерде осы подтарды орналастыруға ресурстар жетпесе, бұл осы подтарды пайдаланатын қолданбалардың ішінара немесе толық қолжетімсіздігіне әкеледі.

{/note}

Белгілер мен шектеулерді VK Cloud платформасы қолдайтын интерфейстер арқылы да (жеке кабинет және Terraform), `kubectl` арқылы да орнатуға болады. Белгілер мен шектеулерді тағайындау кезінде платформа интерфейстері арқылы берілген белгілер мен шектеулердің Kubernetes кластерімен мерзімді түрде синхрондалатынын ескеріңіз (тек бір бағытта). Синхрондау кезінде платформа арқылы берілген белгілер, кілттері сәйкес келсе, `kubectl` арқылы берілген белгілер мен шектеулердің үстінен жазылады. `kubectl` арқылы берілген және платформа мәндерімен үстінен жазылмаған басқа белгілер мен шектеулер кластерде әрекет етеді, бірақ, мысалы, жеке кабинетте немесе Terraform күйінде (state) көрсетілмейді.

{tabs}

{tab(Жеке кабинет)}

1. [VK Cloud жеке кабинетіне өтіңіз](https://kz.cloud.vk.com/app/).
1. Қажетті кластер орналасқан жобаны таңдаңыз.
1. **Контейнеры** → **Кластеры Kubernetes** бөліміне өтіңіз.
1. Қажетті кластерді және оның ішіндегі түйіндер тобын табыңыз.
1. Қажетті түйіндер тобы үшін ![](../../../../assets/more-icon.svg "inline") белгішесін басып, **Labels и Taints** тармағын таңдаңыз.
1. Пайда болған терезеде қажетті әрекеттерді орындаңыз.

   - Белгілерді (labels) басқару әрекеттері:
     - кілт/мән жұбы түрінде жаңа белгіні қосу.
     - қолданыстағы белгінің кілтін немесе мәнін өзгерту.
     - қолданыстағы белгіні жою.
   - Шектеулерді (taints) басқару әрекеттері:
     - ол үшін эффект пен кілт/мән жұбы түріндегі под белгісін көрсетіп, жаңа шектеуді қосу.
     - қолданыстағы шектеуді өзгерту.
     - қолданыстағы шектеуді жою.

{/tab}

{tab(Terraform)}

1. Terraform конфигурация файлында қажетті [vkcs_kubernetes_node_group](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_node_group.md) ресурсын өзгертіңіз:

   ```hcl
   ...

   # Уже описанная конфигурация для группы узлов
   resource "vkcs_kubernetes_node_group" "k8s-node-group" {
     name = "k8s-node-group"

     ...

     # Метки

     # Существующая метка
     labels {
        key = "my_awesome_value"
        value = "my_another_awesome_value"
     }

     # Новая метка
     labels {
        key = "<ключ>"
        value = "<значение>"
     }

     # Ограничения

     # Существующее ограничение
     taints {
        key = "taint_key_1"
        value = "taint_value_1"
        effect = "PreferNoSchedule"
     }

     # Новое ограничение
     taints {
        key = "<ключ>"
        value = "<значение>"
        effect = "<эффект>"
     }

     ...
   }

   ...
   ```

   Қажет болса, қолданыстағы белгілерді (labels) және шектеулерді (taints) өзгертіңіз немесе жойыңыз.

   Егер `labels` және `taints` блоктары әлі жоқ болса, тиісті блоктарды жасаңыз.

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

Толығырақ {linkto(../../reference/labels-and-taints#k8s-labels-and-taints)[text=Белгілер мен шектеулер]} бөлімінде.

## {heading(Жаңарту параметрлерін баптау)[id=k8s-manage-node-group-configure-node-update]}

Жылдамдықты арттыру үшін Cloud Containers сервисі топтағы бірден бірнеше worker-түйінді жаңартады. Қолданбаларыңыз бен сервистеріңіздің жаңарту кезінде барынша қолжетімділігін сақтау үшін {linkto(../update#k8s-update)[text=кластерді жаңарту]} алдында түйіндер тобы үшін қолжетімсіз түйіндердің ең жоғары пайызын көрсетіңіз.

{tabs}

{tab(Жеке кабинет)}

1. [VK Cloud жеке кабинетіне өтіңіз](https://kz.cloud.vk.com/app/).
1. Қажетті кластер орналасқан жобаны таңдаңыз.
1. **Контейнеры** → **Кластеры Kubernetes** бөліміне өтіңіз.
1. Қажетті кластерді және оның ішіндегі түйіндер тобын табыңыз.
1. Қажетті түйіндер тобы үшін ![](../../../../assets/more-icon.svg "inline") белгішесін басып, **Настройки обновления нод** тармағын таңдаңыз.
1. Пайда болған терезеде қажетті пайызды орнатыңыз.
1. **Сохранить настройки** түймесін басыңыз.

{/tab}

{tab(Terraform)}

1. Terraform конфигурация файлында қажетті [vkcs_kubernetes_node_group](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_node_group.md) ресурсы үшін `max_node_unavailable` параметрін қосыңыз немесе өзгертіңіз:

   ```hcl
   ...

   # Уже описанная конфигурация для группы узлов
   resource "vkcs_kubernetes_node_group" "k8s-node-group" {
     name = "k8s-node-group"

     ...

     # Процент недоступных узлов
     max_node_unavailable = <нужный процент, целое число от 1 до 100>
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

Жаңарту процедурасының құрылысы туралы толығырақ {linkto(../../concepts/update#k8s-update)[text=Кластер нұсқасын жаңарту]} бөлімінде.

## {heading(Түйіндер тобын жою)[id=k8s-manage-node-group-delete-node-group]}

Бұл операцияны тек кластер іске қосылған кезде орындауға болады.

Кластердің жалғыз түйіндер тобын жеке кабинет арқылы жою мүмкін емес. Алайда мұны Terraform көмегімен жасауға болады.

{tabs}

{tab(Жеке кабинет)}

1. [VK Cloud жеке кабинетіне өтіңіз](https://kz.cloud.vk.com/app/).
1. Қажетті кластер орналасқан жобаны таңдаңыз.
1. **Контейнеры** → **Кластеры Kubernetes** бөліміне өтіңіз.
1. Қажетті кластерді және оның ішіндегі түйіндер тобын табыңыз.
1. Қажетті түйіндер тобы үшін ![](../../../../assets/more-icon.svg "inline") белгішесін басып, **Удалить** тармағын таңдаңыз.
1. **Подтвердить** түймесін басыңыз.

{/tab}

{tab(Terraform)}

1. Terraform конфигурация файлынан қажетті [vkcs_kubernetes_node_group](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_node_group.md) ресурсын жойыңыз.

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
