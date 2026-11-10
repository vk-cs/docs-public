# {heading(Terraform көмегімен кластер құру)[id=mk8s-create-terraform]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Kubernetes кластерін тек Terraform арқылы ғана емес, сонымен қатар {linkto(../create-webui-gen-2#mk8s-create-webui-gen-2)[text={var(cloud)} жеке кабинеті]} арқылы да құруға болады.

Әртүрлі кластерлерді құруға арналған дайын конфигурациялық файл мысалдары Terraform бөлімінде [келтірілген](../../../../../tools-for-using-services/terraform/how-to-guides/k8s/create).

{note:warn}
Кластерді құру кезінде оған {linkto(../../../../../networks/balancing/concepts/about#balancing-load-balancer-types)[text=сервистік жүктеме балансирі]} құрылады. NGINX Ingress Controller {linkto(../../../concepts/addons-and-settings/addons#mk8s-addons)[text=аддоны]} таңдалған жағдайда оған {linkto(../../../../../networks/balancing/concepts/about#balancing-load-balancer-types)[text=стандартты жүктеме балансирі]} құрылады.

Балансирлерді пайдалану {linkto(../../../../../networks/vnet/tariffication#vnet-tariffication)[text=төлемақыға негізделеді]}.
{/note}

## {heading(Кластерді құру алдында)[id=mk8s-create-terraform-prepare]}

1. Кластерді құру жоспарланып отырған {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=аймақ]} үшін қолжетімді ресурстармен және {linkto(../../../../../tools-for-using-services/account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=квоталармен]} танысыңыз. Әртүрлі аймақтар үшін әртүрлі квоталар бапталған болуы мүмкін.

   Қажет болса, квоталарды {linkto(../../../../../tools-for-using-services/account/instructions/project-settings/manage#project-increase-quota)[text=ұлғайтыңыз]}.

1. Managed Containers сервисіндегі {linkto(../../helpers/terraform-howto#mk8s-terraform-howto)[text=Terraform пайдалану ерекшеліктерімен]} танысыңыз.

1. Егер бұл әлі жасалмаса, [Terraform орнатып, ортаны баптаңыз](../../../../../tools-for-using-services/terraform/quick-start).

1. Егер бұл әлі жасалмаса, {linkto(../../../../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=OpenStack CLI орнатыңыз]} және {linkto(../../../../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=авторизациядан өтіңіз]}.

1. Terraform конфигурациялық файлын жасаңыз.

   {note:info}

   Келесі қадамдарда осы файлда көрсету қажет Terraform ресурстарының тек негізгі параметрлері келтірілген. Параметрлердің толық тізімі [құжаттамада](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs) [Kubernetes кластеріне](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_cluster.md) арналған Terraform-провайдер үшін берілген.

   {/note}

## {heading(1. Қажетті дереккөздерді дайындаңыз)[id=mk8s-create-terraform-prepare-data-sources]}

1. Кластердің master-түйіндері үшін виртуалды машинаның қай түрі пайдаланылатынын анықтаңыз:

   1. Келесі пәрменді орындаңыз:

      ```console
      openstack flavor list
      ```

      Қолжетімді виртуалды машина түрлері шығарылады.

   1. Қажетті виртуалды машина түрін таңдап, оның атын **Name** бағанынан жазып алыңыз.

1. Кластер қай Kubernetes нұсқасымен құрылуы керек екенін анықтаңыз:

   1. Конфигурациялық файлға келесі жолдарды қосыңыз:

      ```hcl
      data "vkcs_kubernetes_clustertemplates" "k8s-template-list" {}

      output "k8s-version-list" {
          value = data.vkcs_kubernetes_clustertemplates.k8s-template-list.cluster_templates.*.version
      }
      ```

   1. Келесі пәрменді орындаңыз:

      ```console
      terraform refresh
      ```

   1. Келесі пәрменді орындаңыз:

      ```hcl
      terraform output k8s-version-list
      ```

      Kubernetes-тің қолжетімді нұсқаларының тізімі шығарылады.

   1. Қажетті Kubernetes нұсқасын таңдап, оның нөмірін жазып алыңыз.

1. Конфигурациялық файлға дереккөздерді қосыңыз:

   1. Master-түйіндерге арналған {linkto(../../../concepts/flavors#mk8s-flavors-vm-flavor)[text=виртуалды машина шаблоны]}. Мысал:

      ```hcl
      data "vkcs_compute_flavor" "k8s-master-flavor" {
          name = "STD3-2-4"
      }
      ```

      Шаблон атауы ретінде бұрын алынған атты көрсетіңіз.

   1. Кластер шаблоны. Мысал:

      ```hcl
      data "vkcs_kubernetes_clustertemplate" "k8s-template" {
          version = "<ВЕРСИЯ_KUBERNETES>"
      }
      ```

      Нұсқа ретінде бұрын алынған нұсқа нөмірін көрсетіңіз.

## {heading(3. Бір немесе бірнеше worker-түйіндер тобының конфигурациясын сипаттаңыз)[id=mk8s-create-terraform-describe-workers]}

{note:info}

Бұл міндетті емес қадам.
Terraform көмегімен тек master-түйіндерден тұратын кластер құрып, worker-түйіндер топтарын кейінірек қосуға болады.

{/note}

Бұл операция {linkto(../../manage-node-group#mk8s-manage-node-group)[text=Worker-түйіндер тобын басқару]} бөлімінде егжей-тегжейлі сипатталған.

## {heading(4. Кластерді құру процедурасын іске қосыңыз)[id=mk8s-create-terraform-apply]}

1. Terraform конфигурациялық файлының дұрыстығын тексеріңіз:

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

   Kubernetes кластерін құру басталады. Бұл процесс кластер өлшеміне байланысты ұзақ уақыт алуы мүмкін.

## {heading(Келесі не?)[id=mk8s-create-terraform-what-next]}

- Кластерге қосылу жоспарланып отырған хостта {linkto(../../../connect#mk8s-connect)[text=ортаны баптаңыз]}.
- Кластерді {linkto(../../../how-to-guides#mk8s-how-to-guides)[text=пайдалану сценарийлерімен танысыңыз]}.
- Managed Containers сервисінің {linkto(../../../concepts#mk8s-concepts)[text=тұжырымдамаларымен танысыңыз]}.