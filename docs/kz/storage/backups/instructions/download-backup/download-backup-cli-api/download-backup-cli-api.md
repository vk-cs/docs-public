# {heading(Көшірмені OpenStack CLI және API арқылы жүктеп алу)[id=backup-download-cli-api]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Бұл тәсілді қолданғанда резервтік көшірмелердің ID-лары OpenStack CLI немесе {linkto(../../../../../tools-for-using-services/api/api-spec/backup-api#api-spec-karboii)[text=API Karboii]} арқылы анықталады, ал көшірме файлдары {var(s3)}-ден AWS CLI арқылы тікелей жүктеп алынады. Жүктеп алуды автоматтандыру үшін немесе жеке кабинет қолжетімсіз болғанда осы тәсілді қолданыңыз. Сондай-ақ көшірмені {linkto(../download-backup-lk#backup-download-lk)[text=жеке кабинет арқылы жүктеп алуға]} болады.

{note:err}
Жүктеп алғаннан кейін көшірмені Cloud Backup-тен өшіріңіз.
{/note}

## {heading(Көшірмені жүктеп алмас бұрын)[id=backup-download-cli-api-prepare]}

1. {linkto(../../../../../tools-for-using-services/api/rest-api/enable-api#rest-api-enable)[text=Қосылуға]} API арқылы кіру мүмкіндігіне көз жеткізіңіз.
1. Резервтік көшірмелер сақталған жобада {linkto(../../../../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=OpenStack клиентін орнатыңыз және аутентификациядан өтіңіз]}. Аутентификация үшін {linkto(../../../../../access/iam/instructions/service-account-manage#service-account-download-rc-file)[text=OpenStack RC-файл]} немесе токен алудың басқа тәсілін қолданыңыз.
1. Жобаның Project ID-сын алып, жазып алыңыз: ол API арқылы жұмыс істегенде және {var(s3)}-ден файлдарды жүктеп алғанда қажет болады.

   Project ID жеке кабинеттегі {linkto(../../../../../tools-for-using-services/account/instructions/project-settings/manage#project-pid-view)[text=жоба идентификаторымен]} сәйкес келмейді. Егер OpenStack RC-файл арқылы аутентификациядан өтсеңіз, мән `OS_PROJECT_ID` айнымалысында сақталады:

   ```console
   echo $OS_PROJECT_ID
   ```

   Егер айнымалы бос болса, Project ID-ны мына командамен алыңыз:

   ```console
   openstack token issue -c project_id -f value
   ```

   Сондай-ақ Project ID-ны жеке кабинетте {linkto(../../../../../tools-for-using-services/api/rest-api/endpoints#rest-api-endpoints-get-project-id)[text=алуға]} болады. Оны айнымалыға сақтаңыз:

   ```console
   export OS_PROJECT_ID=<ЖОБА_ID>
   ```

   Мұнда `<ЖОБА_ID>` — жобаның Project ID-сы.

1. API арқылы жұмыс істеу үшін `jq` қолданбасын {linkto(../../../../../tools-for-using-services/api/rest-api/install-jq#rest-api-jq)[text=орнатыңыз]} және `curl` утилитасы орнатылғанына көз жеткізіңіз.
1. Егер әлі жасалмаса, {var(s3)} аккаунтын {linkto(../../../../../storage/s3/instructions/access-management/access-keys#s3-instructions-access-keys)[text=жасаңыз]} және оның кіру кілтін алыңыз (`Access Key ID` және `Secret Key`).
1. AWS CLI қолданбасын {linkto(../../../../../tools-for-using-services/cli/aws-cli#tools-cli-aws)[text=орнатыңыз]} және {var(s3)}-ге {linkto(../../../../../storage/s3/connect/s3-cli#s3-connect-cli-configure)[text=қосылуын баптаңыз]}.
1. Жобаңыздың аймағы үшін {var(s3)} эндпоинтінің адресін анықтаңыз. Толығырақ {linkto(../../../../../storage/s3/connect/s3-cli#s3-connect-cli-check)[text=CLI арқылы {var(s3)}-ге қосылу]} бөлімінде.
1. Барлық кіру мүмкіндіктері жұмыс істейтінін тестілік дискте тексеріңіз.

## {heading({counter(backup-download-cli-api)}. Жүктеп алу үшін көшірмелерді анықтаңыз)[id=backup-download-cli-api-get-ids]}

{tabs}
{tab(OpenStack CLI)}

1. Жобаның резервтік көшірмелерінің тізімін алыңыз:

   ```console
   openstack volume backup list
   ```

   `ID` бағанында әр көшірменің ID-сы көрсетілген. Тек бір дисктің көшірмелерін алу үшін:

      1. ВМ дискісінің ID-сын мына командамен алыңыз:

         ```console
         openstack volume list
         ```

         Дискінің ID-сы сондай-ақ жеке кабинеттің **Облачные вычисления → Диски** бөлімінде қолжетімді.

      1. Команданы орындаңыз:

         ```console
         openstack volume backup list --volume <ДИСК_ID>
         ```

1. Команданы орындап, көшірменің статусын, өлшемін және түрін анықтаңыз:

   ```console
   openstack volume backup show <КӨШІРМЕ_ID>
   ```

   Мұнда `<КӨШІРМЕ_ID>` — алдыңғы қадамда алынған тізімдегі `ID` бағанындағы резервтік көшірменің ID-сы.

   Команда шығысында резервтік көшірме туралы ақпарат болады. Оның түрін анықтаңыз:

   - Толық көшірме: `name` өрісінде `_full` суффиксі бар. Тек осы көшірмені жүктеп алу жеткілікті.
   - Инкременттік көшірме: `is_incremental` параметрі көрсетіледі. Бүкіл тізбекті жүктеп алыңыз: базалық толық көшірмені және одан кейінгі қажеттіге дейінгі барлық инкременттік көшірмелерді.

1. Тізбектің барлық көшірмелерінің ID-ларын толықтан таңдалғанға дейінгі ретпен жазып алыңыз (толық көшірме үшін — бір ID). Дәл осы ID-ларды жүктеп алғанда `<КӨШІРМЕ_ID>` орнына қою қажет болады.
1. Дискінің нақты өлшемін ГБ есебінде анықтап, жазып алыңыз, себебі ол дискті жинағанда қажет болады. Мұны келесі тәсілдердің бірімен жасауға болады:

   - Көшірме ID-сы бойынша:

     ```console
     openstack volume backup show <КӨШІРМЕ_ID> -c size -f value
     ```

   - Диск ID-сы бойынша:

     ```console
     openstack volume show <ДИСК_ID> -c size -f value
     ```

{/tab}
{tab(API)}

1. {linkto(../../../../../tools-for-using-services/api/rest-api/case-keystone-token#rest-api-keystone-token-gen)[text=Кіру токенін алыңыз]} және оны айнымалыға сақтаңыз:

   ```console
   export TOKEN='<ТОКЕН_МӘНІ>'
   ```

   Мұнда `<ТОКЕН_МӘНІ>` — кіру токені.

1. Резервтік көшірмелеуді қамтамасыз ететін `provider_id` қызметінің ID-сын {linkto(../../../how-to-guides/api-examples#backup-api-examples-get-provider-id)[text=алыңыз]}.
1. Восстановление нүктелерінің (checkpoint) жаңадан ескіге қарай тізімін алыңыз:

   ```console
   curl -s --location \
   "https://mcs.mail.ru/infra/karboii/v1/${OS_PROJECT_ID}/providers/<ҚЫЗМЕТ_ID>/checkpoints?sort=desc" \
   --header "Accept: application/json" \
   --header "X-Auth-Token: ${TOKEN}" > checkpoints.json
   ```

   Мұнда:

   - `${OS_PROJECT_ID}` — бұрын алған жобаның Project ID-сы;
   - `<ҚЫЗМЕТ_ID>` — алдыңғы қадамда алынған `provider_id` қызметінің ID-сы.

1. Восстановление нүктелері туралы негізгі мәліметтерді шығарыңыз:

   ```console
   jq -r '.checkpoints[] | [.id, .created_at, .status, (.extra_info.comment // "")] | @tsv' checkpoints.json
   ```

1. Қажетті восстановление нүктесін `created_at` жасалу уақыты немесе комментарий бойынша таңдаңыз. Оның `status` статусы `available` екеніне көз жеткізіңіз. Оның `id`-сын жазып алыңыз.
1. Таңдалған восстановление нүктесінен дискілер көшірмелерінің ID-ларын алыңыз:

   ```console
   jq -r --arg id "<ВОССТАНОВЛЕНИЕ_НҮКТЕСІ_ID>" '
     .checkpoints[] | select(.id == $id) | .resources[]
     | select(.type == "OS::Cinder::Volume")
     | [.original_id, .external_id, .status] | @tsv' checkpoints.json
   ```

   Мұнда `<ВОССТАНОВЛЕНИЕ_НҮКТЕСІ_ID>` — алдыңғы қадамда таңдалған восстановление нүктесінің ID-сы.

   Дискілердің резервтік көшірмелеріне `OS::Cinder::Volume` типті ресурстар сәйкес келеді. Әр жолда:

   - `original_id` — бастапқы дискінің ID-сы;
   - `external_id` — осы дискінің резервтік көшірмесінің ID-сы (`volumebackups-<ЖОБА_ID>` бакетіндегі қалтаның аты, мұнда `<ЖОБА_ID>` — бұрын алған Project ID);
   - `status` — көшірменің статусы, `available` болуы тиіс.

   Егер ВМ-де бірнеше диск болса, жолдар да бірнеше болады: әр дискінің өз көшірмелер тізбегі бар және ол жеке қалпына келтіріледі.

1. Егер инкременттік көшірмені қолданатын болсаңыз, тізбекті анықтау үшін дискінің барлық көшірмелерін тауып алыңыз. Бір дискінің көшірмелерінде `original_id` бірдей болады. Сізге таңдалған көшірме және осы дискінің базалық толық көшірмеге дейінгі барлық ертеректі көшірмелері қажет болады:

   ```console
   jq -r --arg vol "<БАСТАПҚЫ_ДИСК_ID>" '
     .checkpoints[] | . as $c | $c.resources[]
     | select(.type == "OS::Cinder::Volume" and .original_id == $vol)
     | [$c.created_at, $c.id, .external_id, .status] | @tsv' checkpoints.json
   ```

   Мұнда `<БАСТАПҚЫ_ДИСК_ID>` — қажетті дискінің `original_id` мәні.

1. Көшірмелердің түрін анықтаңыз. API жауабында толық немесе инкременттік көшірме белгісі жоқ, сондықтан түрді көшірме атауындағы суффикс бойынша анықтаңыз. Көшірмелер тізімін алыңыз:

   ```console
   openstack volume backup list
   ```

   - Толық көшірменің атауында `_full` суффиксі бар. Бұл жағдайда тек осы көшірмені жүктеп алу жеткілікті.
   - Инкременттік көшірменің атауында `_incremental` суффиксі бар. Бүкіл тізбекті жүктеп алыңыз: базалық толық көшірмені және одан кейінгі қажеттіге дейінгі барлық инкременттік көшірмелерді.

   {note:info}
   Ресурс ішіндегі `parent_id` өрісі алдыңғы көшірмеге емес, восстановление нүктесіндегі ВМ ресурсына сілтеме жасайды, сондықтан ол бойынша тізбекті анықтауға болмайды.
   {/note}

1. Тізбектің барлық көшірмелерінің `external_id` мәндерін толықтан таңдалғанға дейінгі ретпен жазып алыңыз (толық көшірме үшін — бір мән). Жүктеп алғанда осы мәндерді `<КӨШІРМЕ_ID>` орнына қою қажет болады.
1. Дискінің нақты өлшемін ГБ есебінде анықтап, жазып алыңыз, себебі ол дискті жинағанда қажет болады. Мұны келесі тәсілдердің бірімен жасауға болады:

   - Көшірме ID-сы бойынша:

     ```console
     openstack volume backup show <КӨШІРМЕ_ID> -c size -f value
     ```

     Мұнда `<КӨШІРМЕ_ID>` — қажетті дискінің көшірмесінің `external_id` мәні.

   - Диск ID-сы бойынша:

     ```console
     openstack volume show <БАСТАПҚЫ_ДИСК_ID> -c size -f value
     ```

     Мұнда `<БАСТАПҚЫ_ДИСК_ID>` — қажетті дискінің `original_id` мәні.

{/tab}
{/tabs}

## {heading({counter(backup-download-cli-api)}. Көшірме файлдары үшін машинаны дайындаңыз)[id=backup-download-cli-api-lin]}

1. Файлдар жүктеп алынатын Linux ОС бар жұмыс машинасын таңдаңыз.
1. Бұл машинада жеткілікті бос орын бар-жоғын тексеріңіз: әр көшірменің сығылған `content` файлы үшін және өлшемі дискінің өлшеміне тең түпкілікті RAW-файл үшін.

RAW-файл жиналғаннан кейін бірден аз орын алуы мүмкін, бірақ көшіру және конвертация кезінде ол дискінің толық өлшемін алады.

## {heading({counter(backup-download-cli-api)}. Көшірме файлдарын {var(s3)}-ден жүктеп алыңыз)[id=backup-download-cli-api-download]}

Көшірме файлдары `volumebackups-<ЖОБА_ID>` жүйелік бакетінде сақталады. Қалтаның аты көшірменің ID-сымен сәйкес келеді.

Әр көшірме үшін команданы орындаңыз:

```console
aws --endpoint-url <S3_АДРЕСІ> s3 cp s3://volumebackups-<ЖОБА_ID>/<КӨШІРМЕ_ID>/ ./<КӨШІРМЕ_ID>/ --recursive
```

Мұнда:

- `<S3_АДРЕСІ>` — {var(s3)} эндпоинтінің адресі, мысалы `https://hb.ru-msk.vkcloud-storage.ru`.
- `<ЖОБА_ID>` — бұрын алған жобаның Project ID-сы.
- `<КӨШІРМЕ_ID>` — резервтік көшірменің ID-сы:

   - OpenStack CLI үшін — `ID` бағанындағы мән;
   - API үшін — `external_id` мәні.

Файлдар `./<КӨШІРМЕ_ID>/<файл>` құрылымында сақталады. Әр көшірме үшін бес файл жүктеп алынады:

- `content`,
- `object_segments`,
- `volume_segments`,
- `sha_list`,
- `volume_metadata`.

Толығырақ {linkto(../../../concepts/download-features#backup-download-features-content)[text=ВМ дискілерінің резервтік көшірмелерін {var(cloud)} сыртына тасымалдау]} бөлімінде.

Егер көшірмелер тізбегін жүктеп алатын болсаңыз, тізбектің әр көшірмесі үшін команданы орындаңыз.

## {heading({counter(backup-download-cli-api)}. Жүктеп алынған файлдарды тексеріңіз)[id=backup-download-cli-api-check]}

{include(/kz/_includes/_backup-download-check.md)[tags=check]}