{includetag(terraform-install-prepare)}
1. Terraform-ды {var(cloud)} ресми [айнасынан](https://hashicorp-releases.mcs.mail.ru/terraform) орнатыңыз.
   {/includetag}
   {includetag(prerequisites-terraform-install-prepare)}
1. {ifdef(public)}[Өтіңіз](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../prerequisites-lk-entry#prerequisites-lk-entry)[text=Өтіңіз]}{/ifndef} {var(cloud)} жеке кабинетіне.
   {/includetag}
   {includetag(tools-terraform-install-prepare)}
   {/includetag}
   {includetag(terraform-install-prepare)}
   {ifdef(public)}
1. Егер бұл әлі жасалмаса, [API арқылы қолжетімділікті белсендіріңіз](/kz/tools-for-using-services/api/rest-api/enable-api).
   {/ifdef}
1. Бет тақырыбындағы пайдаланушы атын басып, ашылмалы тізімнен **Жоба баптаулары** тармағын таңдаңыз.
   {/includetag}
   {includetag(prerequisites-terraform-install-prepare)}
1. **Terraform** қойындысына өтіңіз. Аттас батырмаларды басып, негізгі {linkto(../../../tools-for-using-services/terraform/reference/configuration#terraform-provider-config)[text=Terraform конфигурация файлын]} және {linkto(../../../tools-for-using-services/terraform/reference/configuration#terraform-mirror-config)[text=Terraform айнасының конфигурация файлын]} жүктеп алыңыз.
   {/includetag}
   {includetag(tools-terraform-install-prepare)}
1. **Terraform** қойындысына өтіңіз. Аттас батырмаларды басып, негізгі {linkto(../reference/configuration#terraform-provider-config)[text=Terraform конфигурация файлын]} және {linkto(../reference/configuration#terraform-mirror-config)[text=Terraform айнасының конфигурация файлын]} жүктеп алыңыз.
   {/includetag}
   {includetag(terraform-install-prepare)}
   `vkcs_provider.tf` және `terraform.rc` атауларымен файлдар жүктеледі.

1. Файлдармен келесі әрекеттерді орындаңыз:

   {tabs}

   {tab(Windows)}

   1. Windows шолғышының мекенжай жолағына `%APPDATA%` енгізіп, ашылған директорияға `terraform.rc` файлын көшіріңіз.
   1. `vkcs_provider.tf` файлын {var(cloud)} платформасымен жұмыс істеуді жоспарлап отырған жұмыс директориясына көшіріңіз.

      Әрбір {var(cloud)} жобасы үшін бөлек жұмыс директориясын жасау ұсынылады.

   {/tab}

   {tab(Басқа ОЖ)}

   1. Terraform айнасының конфигурация файлын `terraform.rc` атауынан `.terraformrc` атауына қайта атаңыз.
   1. `.terraformrc` файлын пайдаланушының үй директориясының түбіріне көшіріңіз.
   1. `vkcs_provider.tf` файлын {var(cloud)} платформасымен жұмыс істеуді жоспарлап отырған жұмыс директориясына көшіріңіз.

      Әрбір {var(cloud)} жобасы үшін бөлек жұмыс директориясын жасау ұсынылады.

   {/tab}

   {/tabs}
   {/includetag}
   {includetag(prerequisites-terraform-install-prepare)}
   {note:info}
   Екі конфигурация файлын да өзіңіз жасай аласыз. Сондай-ақ жүктелген файлдарды өңдей аласыз — мысалы, қосымша Terraform-провайдерді қосу үшін. Файлдардың мазмұны {linkto(../../../tools-for-using-services/terraform/reference/configuration#tools-terraform-config)[text=%text]} мақаласында сипатталған.
   {/note}
   {/includetag}
   {includetag(tools-terraform-install-prepare)}
   {note:info}
   Екі конфигурация файлын да өзіңіз жасай аласыз. Сондай-ақ жүктелген файлдарды өңдей аласыз — мысалы, қосымша Terraform-провайдерді қосу үшін. Файлдардың мазмұны {linkto(../reference/configuration#tools-terraform-config)[text=%text]} мақаласында сипатталған.
   {/note}
{/includetag}

{includetag(terraform-install-init)}
Жобамен жұмыс істеуді жоспарлап отырған директорияда келесі команданы орындаңыз:

```console
terraform init
```

Terraform жұмысына қажет қосымша файлдар жасалады.
{/includetag}

{includetag(terraform-install-create)}
1. Жұмыс директориясында ресурстар конфигурациясын жасаңыз — мысалы, {ifdef(public)}{linkto(../how-to-guides/iaas/create#terraform-iaas-create)[text=виртуалды машина жасау]}{/ifdef}{ifndef(public)}виртуалды машина жасау{/ifndef} үшін конфигурацияны.

   {ifndef(public)}
   {note:info}
   Ресурстар жасауға арналған {linkto(../../reference/configuration#terraform-resource-config)[text=конфигурация файлдары]} {var(cloud)} дистрибутивінде орналасқан. Оларды алу үшін әкімшіге хабарласыңыз.
   {/note}
   {/ifndef}

1. Команданы орындаңыз:

   ```console
   terraform apply
   ```

   Растауды сұрағанда, `yes` енгізіңіз.

1. Операцияның аяқталуын күтіңіз.

Жасалған ресурстар жеке кабинетіңізде пайда болады.
{/includetag}

{includetag(terraform-install-update)}
Егер `vkcs_provider.tf` файлындағы провайдер нұсқасы ресурс жасауға қажет нұсқадан төмен болса, конфигурацияны валидациялау кезінде қате туындайды. Оны болдырмау үшін провайдерді [соңғы нұсқаға](https://github.com/vk-cs/terraform-provider-vkcs) немесе ресурс сипаттамасында көрсетілген нұсқаға дейін жаңартыңыз:

1. `vkcs_provider.tf` файлын ашып, нұсқаны қажетті мәнге өзгертіңіз, мысалы: `version = "~> 0.8.0"`.
1. Терминалда келесі команданы орындаңыз:

   ```console
   terraform init --upgrade
   ```
{/includetag}
