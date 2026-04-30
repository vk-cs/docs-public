{include(/kz/_includes/_translated_by_ai.md)}

## Terraform пайдалануды қалай бастау керек

1. [Terraform орнатып, ортаны баптаңыз](/kz/tools-for-using-services/terraform/quick-start), егер бұл әлі жасалмаса.
1. [Бір немесе бірнеше worker-түйіндер тобы бар жаңал кластер құрыңыз](../../create-cluster/create-terraform).
1. Жасалған ресурстарды Terraform көмегімен басқарыңыз.

Cloud Containers сервисімен жұмыс туралы толық алқпарат [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs) келтірілген.

## Cloud Containers сервисін басқару үшін Terraform пайдаланудың ерекшеліктері

- Кластермен кейбір операциялар тек [жеке кабинетте](../../../../../tools-for-using-services/account) орындалады. Әр операция үшін [қадамдық нұсқаулықтарда](../../../instructions) оны Terraform көмегімен де орындауғал болатыны көрсетілген.

- Бар кластердің кейбір параметрлерін өзгерту **жаңал кластердің** жасалуына әкеледі. Cloud Containers сервисінің құжаттамасында жаңал кластер құрмай, бар кластерге орындауғал болатын операциялар ғана келтірілген.

  Толығырақ [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_cluster.md#argument-reference).

- Егер Terraform көмегімен басқарылатын кластердің баптауларын жеке кабинетте өзгертсеңіз, бұл өзгерістер Terraform конфигурация файлында көрсетілмейді.

  Бұл жағдайда алғымдағы Terraform конфигурациясы ескіреді, ал оны `terraform apply` көмегімен қолдану жасалған баптаулардың кері қайтарылуына немесе тіпті кластердің жұмысқал жарамсыз болуына әкеледі.

  Мұндай кластерді қайтадан Terraform көмегімен басқару үшін:

  1. Инфрақұрылымның жергілікті күйін жаңартыңыз (ол `.tfstate` кеңейтімі бар файлда сақталады):

     1. Команданы орындаңыз:

        ```console
        terraform apply -refresh-only
        ```

        Сізге жергілікті күй үстінен қайта жазылатын инфрақұрылымдағы өзгерістермен танысу ұсынылады.

     1. Егер бұл өзгерістер сізге сәйкес келсе, оларды растаңыз.

  1. Terraform күйіне сәйкес келуі үшін конфигурация файлын өзектілендіріңіз. Бұл процедура Terraform құжаттамасындағы [Create configuration](https://learn.hashicorp.com/tutorials/terraform/state-import?in=terraform/state#create-configuration) бөлімінде толық сипатталған.
