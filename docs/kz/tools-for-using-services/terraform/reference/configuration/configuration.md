# {heading(Конфигурация файлдары)[id=tools-terraform-config]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Ресурстарды жасау кезінде Terraform конфигурация файлдарымен жұмыс істейді. Олардың `.tf` кеңейтуі бар.

Әрбір {var(cloud)} жобасы үшін жеке жұмыс каталогын жасау ұсынылады. Жұмыс каталогында келесі файлдар орналасады:

- провайдердің конфигурация файлы (жобаға тән);
- сіз жасауды жоспарлап отырған ресурстардың конфигурация файлдары.

  {ifndef(public)}
  {note:info}
  Ресурстарды жасауға арналған манифесттер {var(cloud)} дистрибутивінде орналасқан. Оларды алу үшін әкімшиге хабарласыңыз.
  {/note}
  {/ifndef}

Terraform-ның дұрыс жұмыс істеуі үшін қосымша файл қажет — Terraform айнасының (mirror) конфигурация файлы.

## {heading(Terraform провайдерінің конфигурация файлы)[id=terraform-provider-config]}

Файл Terraform-провайдерлері туралы ақпаратты және жобадағы пайдаланушының аутентификациясына арналған деректерді қамтиды.

Файл атауы кез келген болуы мүмкін. {var(cloud)}-ға қосылу негізгі баптауларының осы файлда орналасқанын атап өту үшін `provider.tf` атауын пайдалану ұсынылады.

Файл барлық Terraform жұмыс каталогтарында орналасуы тиіс.

Файл жеке кабинетте, **Terraform** қойындысындағы {ifdef(public)}{linkto(../../quick-start#terraform-quick-start-prepare)[text=жүктеп алу]}{/ifdef}{ifndef(public)}{linkto(../../install#terraform-install-prepare)[text=жүктеп алу]}{/ifndef} мүмкін болатын {ifdef(public)}[Жоба баптаулары](https://msk.cloud.vk.ru/app/project/terraform){/ifdef}{ifndef(public)}**Жоба баптаулары**{/ifndef} бетінде қолжетімді. Жүктеп алынған файлдың атауы `vkcs_provider.tf` және ол бір провайдердің (`vkcs`) деректерін қамтиды. Жүктеп алғаннан кейін файлды өңдеңіз — `password` параметріне сіздің тіркелгіңіздің құпиясөзін көрсетіңіз.

Файл мазмұнының мысалы:

```console
terraform {
    required_providers {
        vkcs = {
            source = "vk-cs/vkcs"
        }
    }
}

provider "vkcs" {

# Your user account.
    username = "<user_email>"

# The password of the account
    password = "<user_password>"

# The tenant token can be taken from the project Settings tab - > API keys.

# Project ID will be our token.
    project_id = "<project_ID>"

# Region name
    region = "<Region>"

    auth_url = "<auth_url>"
}
```

Файл секциялардан тұрады:

- `terraform.required_providers {}` — пайдаланылатын провайдерлер тізімі. {var(cloud)}-пен жұмыс істеу үшін `vkcs` провайдері, оның көзі және нұсқалары көрсетілуі тиіс. Қосымша провайдерлерді пайдалануды жоспарласаңыз, оларды осы секцияға қосыңыз.
- `provider "vkcs" {}` — жобадағы аутентификация баптаулары:

  - `password`: сіздің тіркелгіңіздің құпиясөзін көрсетіңіз;
  - `username`, `project_id`, `region`: жеке кабинет арқылы жүктеп алынған файлда көрсетілген мәндер ағымдағы жобамен жұмыс істеу үшін жарамды. Бұл мәндер **Terraform** қойындысындағы {ifdef(public)}[Жоба баптаулары](https://msk.cloud.vk.ru/app/project/terraform){/ifdef}{ifndef(public)}**Жоба баптаулары**{/ifndef} бетінде де көрсетілген.

{ifdef(public)}
Кейбір параметрлердің мәндері {linkto(../../../account/concepts/regions#tools-account-concepts-regions)[text=аймаққа]} байланысты:

- `region`:

  - Мәскеу аймағы үшін: `RegionOne`;
  - Қазақстан аймағы үшін: `kz`;

- `auth_url`:

  - Мәскеу аймағы үшін: `https://infra.mail.ru/infra/identity/v3/`;
  - Қазақстан аймағы үшін: `https://kz.infra.mail.ru/infra/identity/v3/`.
{/ifdef}

## {heading(Ресурстардың конфигурация файлдары)[id=terraform-resource-config]}

Ресурстардың конфигурация файлдары Terraform көмегімен жасалатын ресурстарды, олардың баптауларын және тәуелділіктерін сипаттайды.

Конфигурация файлдарының атаулары кез келген болуы мүмкін. Осы құжаттамадағы мысалдарда мынадай атау беру принциптері пайдаланылады:

- `variables.tf` — конфигурацияда пайдаланылатын айнымалылар. Жиі өзгертілетін параметрлерді айнымалыларға шығару жаңа жоба үшін инфрақұрылым конфигурациясын оңай өзгертуге мүмкіндік береді.
- `main.tf` — сол немесе басқа {ifdef(public)}{linkto(../../how-to-guides#terraform-how-to)[text=сценарийде]}{/ifdef}{ifndef(public)}сценарийде{/ifndef} жасалатын негізгі ресурс конфигурациясын қамтиды. Мысалы, {ifdef(public)}{linkto(../../how-to-guides/iaas/create#terraform-iaas-create)[text=виртуалды машинасын жасау]}{/ifdef}{ifndef(public)}виртуалды машинасын жасау{/ifndef} кезінде `main.tf` файлына ВМ конфигурациясын орналастыру ұсынылады.

Кейде файлдар ресурс түрлері бойынша аталуы мүмкін, мысалы{ifdef(private-cert)} `network.tf` — бұлтты желдің сипаттамасы.{/ifdef}{ifndef(private-cert)}:

- `network.tf` — бұлтты желдің сипаттамасы.
- `kubernetes.tf` — Kubernetes ресурстарының сипаттамасы.
{/ifndef}

Әдетте ресурстар конфигурациясында пайдаланылады:

- `resource "resource_type" "resource_name" {}` — жасалатын [ресурс](https://www.terraform.io/language/resources/syntax), мысалы, жел, ішкі жел{ifndef(private-cert)}, Kubernetes кластері немесе деректер қоры кластері{/ifndef}.
- `data "data_type" "data_name" {}` — Terraform конфигурациясынан тыс көрсетілген және бұлтта немесе жергілікті жерде бар [деректерді](https://www.terraform.io/language/data-sources) пайдалануға мүмкіндік береді. Мысалы, ВМ конфигурациясы{ifndef(private-cert)}, кластердің шаблоны/нұсқасы және т.б.{/ifndef}.
- `variable "parameter" {}` — [кіріс айнымалылар](https://www.terraform.io/language/values/variables). Конфигурацияда (`variables.tf`) қолданылатын айнымалыларды жариялау үшін пайдаланылады.
- `output "parameter" {}` — [шығыс айнымалылар](https://www.terraform.io/language/values/outputs). Деректерді команда жолына шығарады.

Ресурстарды жасау ретін және олардың тәуелділіктерін анықтау үшін `depends_on` мета-аргументін пайдалануға болады. Мета-аргумент жасалатын ресурс тәуелді болатын ресурсты көрсетеді:

```console
depends_on = [
    vkcs_kubernetes_cluster.k8s-cluster,
]
```
Әуелі мета-аргумент көмегімен көрсетілген ресурс жасалады, содан кейін тәуелділік көрсетілген ресурс жасалады.

## {heading(Terraform айнасының конфигурация файлы)[id=terraform-mirror-config]}

Бұл файл Terraform-ды іске қосу үшін қажет, ол {var(cloud)} ұсынатын Terraform айнасының мекенжайын қамтиды. Файлдың атауы Windows үшін `terraform.rc`, басқа ОС үшін `.terraformrc` болуы тиіс. Файлдың мазмұны барлық жобалар мен аймақтар үшін бірдей.

Файл жеке кабинеттің **Terraform** қойындысындағы {ifdef(public)}[Жоба баптаулары](https://msk.cloud.vk.ru/app/project/terraform){/ifdef}{ifndef(public)}**Жоба баптаулары**{/ifndef} бетінде {ifdef(public)}{linkto(../../quick-start#terraform-quick-start-prepare)[text=жүктеп алу]}{/ifdef}{ifndef(public)}{linkto(../../install#terraform-install-prepare)[text=жүктеп алу]}{/ifndef} мүмкін. Жүктеп алғаннан кейін файлға қандай да бір өзгерістер енгізудің қажеті жоқ.

Файл орналасуы тиіс:

- Windows үшін — ағымдағы пайдаланушының **Application Data** каталогінде.
- Басқа ОС үшін — пайдаланушының үй каталогінде.

{ifdef(public)}
{var(cloud)} жобалары үшін файлдың мазмұны:

```yaml
provider_installation {
    network_mirror {
        url = "https://terraform-mirror.mcs.mail.ru"
        include = ["registry.terraform.io/*/*"]
    }
    direct {
        exclude = ["registry.terraform.io/*/*"]
    }
}
```
{/ifdef}