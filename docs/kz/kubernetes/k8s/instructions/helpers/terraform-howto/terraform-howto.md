# {heading(Terraform пайдалану)[id=k8s-terraform-howto]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(Terraform пайдалануды қалай бастау керек)[id=k8s-terraform-howto-begin]}

1. [Terraform орнатып, ортаны баптаңыз](../../../../../tools-for-using-services/terraform/quick-start), егер бұл әлі жасалмаса.
1. {linkto(../../create-cluster/create-terraform#k8s-create-terraform)[text=Бір немесе бірнеше worker-түйіндер топтары бар]} жаңа кластер {linkto(../../create-cluster/create-terraform#k8s-create-terraform)[text=құрыңыз]}.
1. Жасалған ресурстарды Terraform көмегімен басқарыңыз.

Cloud Containers сервисімен жұмыс туралы толық ақпарат [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs) келтірілген.

## {heading(Cloud Containers сервисін басқару үшін Terraform пайдаланудың ерекшеліктері)[id=k8s-terraform-howto-features]}

- Кластермен кейбір операциялар тек {linkto(../../../../../tools-for-using-services/account#tools-account)[text=жеке кабинетте]} орындалады. Әр операция үшін {linkto(../../../instructions#k8s-instructions)[text=қадамдық нұсқаулықтарда]} оны Terraform көмегімен де орындауға болатыны көрсетілген.

- Бар кластердің кейбір параметрлерін өзгерту **жаңа кластердің** жасалуына әкеледі. Cloud Containers сервисінің құжаттамасында жаңа кластер құрмай, бар кластерге орындауға болатын операциялар ғана келтірілген.

  Толығырақ [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_cluster.md#argument-reference).

- Егер Terraform көмегімен басқарылатын кластердің баптауларын жеке кабинетте өзгертсеңіз, бұл өзгерістер Terraform конфигурация файлында көрсетілмейді.

  Бұл жағдайда ағымдағы Terraform конфигурациясы ескіреді, ал оны `terraform apply` көмегімен қолдану жасалған баптаулардың кері қайтарылуына немесе тіпті кластердің жұмысқа жарамсыз болуына әкеледі.

  Мұндай кластерді қайтадан Terraform көмегімен басқару үшін:

  1. Инфрақұрылымның жергілікті күйін жаңартыңыз (ол `.tfstate` кеңейтімі бар файлда сақталады):

     1. Команданы орындаңыз:

        ```console
        terraform apply -refresh-only
        ```

        Сізге жергілікті күй үстінен қайта жазылатын инфрақұрылымдағы өзгерістермен танысу ұсынылады.

     1. Егер бұл өзгерістер сізге сәйкес келсе, оларды растаңыз.

  1. Terraform күйіне сәйкес келуі үшін конфигурация файлын өзектілендіріңіз. Бұл процедура Terraform құжаттамасындағы [Create configuration](https://learn.hashicorp.com/tutorials/terraform/state-import?in=terraform/state#create-configuration) бөлімінде толық сипатталған.
