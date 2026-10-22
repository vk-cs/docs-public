# {heading(Көшірмені OpenStack CLI және API арқылы жүктеп алу)[id=backup-download-cli-api]}

{include(/kz/_includes/_translated_by_ai.md)}

Бұл тәсілді пайдаланғанда резервтік көшірмелердің ID мәндері OpenStack CLI немесе {linkto(../../../../../tools-for-using-services/api/api-spec/backup-api#api-spec-karboii)[text=API Karboii]} арқылы анықталады, ал көшірме файлдары тікелей {var(s3)} қоймасынан AWS CLI арқылы жүктеледі. Бұл тәсілді жүктеп алуды автоматтандыру үшін немесе жеке кабинет қолжетімсіз болса пайдаланыңыз. Сондай-ақ {linkto(../download-backup-lk#backup-download-lk)[text=көшірмені жеке кабинет арқылы жүктеп алуға]} болады.

{note:err}
Жүктеп алғаннан кейін көшірмені Cloud Backup сервисінен жоймаңыз.
{/note}

## {heading(Көшірмені жүктеп алу алдында)[id=backup-download-cli-api-prepare]}

1. API арқылы қолжетімділіктің {linkto(../../../../../tools-for-using-services/api/rest-api/enable-api#rest-api-enable)[text=белсендірілгеніне]} көз жеткізіңіз.
1. Резервтік көшірмелер сақталатын жобада {linkto(../../../../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=OpenStack клиентін орнатып, аутентификациядан өтіңіз]}. Аутентификация үшін {linkto(../../../../../access/iam/instructions/service-account-manage#service-account-download-rc-file)[text=OpenStack RC-файлын]} немесе токенді алудың басқа тәсілін пайдаланыңыз.
1. Жобаның Project ID мәнін алып, жазып алыңыз: ол API арқылы жұмыс істегенде және {var(s3)} қоймасынан файлдарды жүктеп алғанда қажет болады.

   Project ID жеке кабинеттегі {linkto(../../../../../tools-for-using-services/account/instructions/project-settings/manage#project-pid-view)[text=жоба идентификаторымен]} сәйкес келмейді. Егер аутентификациядан OpenStack RC-файлы арқылы өтсеңіз, мән `OS_PROJECT_ID` айнымалысында сақталады:

   ```console
   echo $OS_PROJECT_ID
   ```

   Егер айнымалы бос болса, Project ID мәнін мына пәрменмен алыңыз:

   ```console
   openstack token issue -c project_id -f value
   ```

   Сондай-ақ Project ID мәнін жеке кабинетте {linkto(../../../../../tools-for-using-services/api/rest-api/endpoints#rest-api-endpoints-get-project-id)[text=алуға]} болады. Оны айнымалыға сақтаңыз:

   ```console
   export OS_PROJECT_ID=<ID_ПРОЕКТА>
   ```

   Мұндағы `<ID_ПРОЕКТА>` — жобаның Project ID мәні.

1. API арқылы жұмыс істеу үшін `jq` утилитасын {linkto(../../../../../tools-for-using-services/api/rest-api/install-jq#rest-api-jq)[text=орнатыңыз]} және `curl` утилитасының орнатылғанына көз жеткізіңіз.
1. Егер бұл әлі жасалмаса, {var(s3)} аккаунтын {linkto(../../../../../storage/s3/instructions/access-management/access-keys#s3-instructions-access-keys)[text=жасаңыз]} және оның қолжетімділік кілтін (`Access Key ID` және `Secret Key`) алыңыз.
1. {linkto(../../../../../tools-for-using-services/cli/aws-cli#tools-cli-aws)[text=AWS CLI орнатыңыз]} және {var(s3)} қоймасына {linkto(../../../../../storage/s3/connect/s3-cli#s3-connect-cli-configure)[text=қосылымды баптаңыз]}.
1. Жобаңыздың өңірі үшін {var(s3)} эндпоинтінің мекенжайын біліңіз. Толығырақ {linkto(../../../../../storage/s3/connect/s3-cli#s3-connect-cli-check)[text=CLI арқылы {var(s3)} қоймасына қосылу]} бөлімінде.
1. Барлық қолжетімділіктің жұмыс істейтініне сынақ дискісінде көз жеткізіңіз.

## {heading({counter(backup-download-cli-api)}. Жүктеп алуға арналған көшірмелерді анықтаңыз)[id=backup-download-cli-api-get-ids]}

{tabs}
{tab(OpenStack CLI)}

1. Жобаның резервтік көшірмелерінің тізімін алыңыз:

   ```console
   openstack volume backup list
   ```

   `ID` бағанында әрбір көшірменің ID мәні көрсетілген. Тек бір дискінің көшірмелерін алу үшін:

      1. Мына пәрменмен ВМ дискінің ID мәнін алыңыз:

         ```console
         openstack volume list
         ```

         Диск ID мәні жеке кабинеттегі **Бұлттық есептеулер → Дискілер** бөлімінде де қолжетімді.

      1. Мына пәрменді орындаңыз:

         ```console
         openstack volume backup list --volume <ID_ДИСКА>
         ```

1. Мына пәрменді орындап, көшірменің күйін, өлшемін және түрін біліңіз:

   ```console
   openstack volume backup show <ID_КОПИИ>
   ```

   Мұндағы `<ID_КОПИИ>` — алдыңғы қадамда алынған тізімдегі `ID` бағанынан алынған резервтік көшірменің ID мәні.

   Пәрмен шығысында резервтік көшірме туралы ақпарат болады. Оның түрін анықтаңыз:

   - Толық көшірме: `name` өрісінде `_full` жұрнағы бар. Дисктің тек осы көшірмесін жүктеп алу жеткілікті.
   - Инкременттік көшірме: `is_incremental` параметрі көрсетіледі. Бүкіл тізбекті жүктеп алыңыз: негізгі толық көшірмені және одан кейінгі қажетті көшірмеге дейінгі барлық инкременттік көшірмелерді.

1. Тізбектегі барлық көшірмелердің ID мәндерін толық көшірмеден таңдалғанға дейінгі ретпен жазып алыңыз (толық көшірме үшін — бір ID). Жүктеп алу кезінде `<ID_КОПИИ>` орнына дәл осы ID мәндерін қою керек болады.
1. Дискінің нақты өлшемін ГБ-пен біліп, жазып алыңыз, себебі ол дискіні жинау кезінде қажет болады. Мұны тәсілдердің бірімен жасауға болады:

   - Көшірме ID бойынша:

     ```console
     openstack volume backup show <ID_КОПИИ> -c size -f value
     ```

   - Диск ID бойынша:

     ```console
     openstack volume show <ID_ДИСКА> -c size -f value
     ```

{/tab}
{tab(API)}

1. {linkto(../../../../../tools-for-using-services/api/rest-api/case-keystone-token#rest-api-keystone-token-gen)[text=Қолжетімділік токенін алып]}, оны айнымалыға сақтаңыз:

   ```console
   export TOKEN='<ЗНАЧЕНИЕ_ТОКЕНА>'
   ```

   Мұндағы `<ЗНАЧЕНИЕ_ТОКЕНА>` — қолжетімділік токені.

1. Резервтік көшіруді қамтамасыз ететін `provider_id` {linkto(../../../how-to-guides/api-examples#backup-api-examples-get-provider-id)[text=сервисінің ID мәнін алыңыз]}.
1. Қалпына келтіру нүктелерінің (checkpoint) тізімін жаңадан ескіге қарай алыңыз:

   ```console
   curl -s --location \
   "https://mcs.mail.ru/infra/karboii/v1/${OS_PROJECT_ID}/providers/<ID_СЕРВИСА>/checkpoints?sort=desc" \
   --header "Accept: application/json" \
   --header "X-Auth-Token: ${TOKEN}" > checkpoints.json
   ```

   Мұндағы:

   - `${OS_PROJECT_ID}` — бұрын алған жобаның Project ID мәні;
   - `<ID_СЕРВИСА>` — алдыңғы қадамда алынған `provider_id` сервисінің ID мәні.

1. Қалпына келтіру нүктелері туралы негізгі мәліметтерді шығарыңыз:

   ```console
   jq -r '.checkpoints[] | [.id, .created_at, .status, (.extra_info.comment // "")] | @tsv' checkpoints.json
   ```

1. Қажетті қалпына келтіру нүктесін `created_at` жасалу уақыты немесе түсініктеме бойынша таңдаңыз. Оның `status` күйінің `available` екеніне көз жеткізіңіз. Оның `id` мәнін жазып алыңыз.
1. Таңдалған қалпына келтіру нүктесінен дисктер көшірмелерінің ID мәндерін алыңыз:

   ```console
   jq -r --arg id "<ID_ТОЧКИ_ВОССТАНОВЛЕНИЯ>" '
     .checkpoints[] | select(.id == $id) | .resources[]
     | select(.type == "OS::Cinder::Volume")
     | [.original_id, .external_id, .status] | @tsv' checkpoints.json
   ```

   Мұндағы `<ID_ТОЧКИ_ВОССТАНОВЛЕНИЯ>` — алдыңғы қадамда таңдалған қалпына келтіру нүктесінің ID мәні.

   Дисктердің резервтік көшірмелеріне `OS::Cinder::Volume` түріндегі ресурстар сәйкес келеді. Әрбір жолда:

   - `original_id` — бастапқы дискінің ID мәні;
   - `external_id` — осы дискінің резервтік көшірмесінің ID мәні (`volumebackups-<ID_ПРОЕКТА>` бакетіндегі папка атауы, мұндағы `<ID_ПРОЕКТА>` — бұрын алған Project ID мәні);
   - `status` — көшірме күйі, `available` болуы керек.

   Егер ВМ-де бірнеше диск болса, жолдар да бірнешеу болады: әр дискінің өз көшірмелер тізбегі бар және ол жеке қалпына келтіріледі.

1. Егер инкременттік көшірмені пайдаланатын болсаңыз, тізбекті анықтау үшін дисктің барлық көшірмелерін табыңыз. Бір дисктің көшірмелерінде `original_id` бірдей болады. Сізге таңдалған көшірме және осы дисктің негізгі толық көшірмеге дейінгі барлық ертерек көшірмелері қажет болады:

   ```console
   jq -r --arg vol "<ID_ИСХОДНОГО_ДИСКА>" '
     .checkpoints[] | . as $c | $c.resources[]
     | select(.type == "OS::Cinder::Volume" and .original_id == $vol)
     | [$c.created_at, $c.id, .external_id, .status] | @tsv' checkpoints.json
   ```

   Мұндағы `<ID_ИСХОДНОГО_ДИСКА>` — қажетті дисктің `original_id` мәні.

1. Көшірмелердің түрін анықтаңыз. API жауабында көшірменің толық немесе инкременттік екенін көрсететін белгі жоқ, сондықтан түрін көшірме атауындағы жұрнақ бойынша анықтаңыз. Көшірмелер тізімін алыңыз:

   ```console
   openstack volume backup list
   ```

   - Толық көшірменің атауында `_full` жұрнағы бар. Бұл жағдайда осы көшірмені жүктеп алу жеткілікті.
   - Инкременттік көшірменің атауында `_incremental` жұрнағы бар. Бүкіл тізбекті жүктеп алыңыз: негізгі толық көшірмені және одан кейінгі қажетті көшірмеге дейінгі барлық инкременттік көшірмелерді.

   {note:info}
   Ресурстың `parent_id` өрісі алдыңғы көшірмеге емес, қалпына келтіру нүктесіндегі ВМ ресурсына сілтейді, сондықтан тізбекті ол бойынша анықтауға болмайды.
   {/note}

1. Тізбектегі барлық көшірмелердің `external_id` мәндерін толық көшірмеден таңдалғанға дейінгі ретпен жазып алыңыз (толық көшірме үшін — бір мән). Жүктеп алу кезінде `<ID_КОПИИ>` орнына осы мәндерді қою керек болады.
1. Дискінің нақты өлшемін ГБ-пен біліп, жазып алыңыз, себебі ол дискіні жинау кезінде қажет болады. Мұны тәсілдердің бірімен жасауға болады:

   - Көшірме ID бойынша:

     ```console
     openstack volume backup show <ID_КОПИИ> -c size -f value
     ```

     Мұндағы `<ID_КОПИИ>` — қажетті дисктің көшірмесінің `external_id` мәні.

   - Диск ID бойынша:

     ```console
     openstack volume show <ID_ИСХОДНОГО_ДИСКА> -c size -f value
     ```

     Мұндағы `<ID_ИСХОДНОГО_ДИСКА>` — қажетті дисктің `original_id` мәні.

{/tab}
{/tabs}

## {heading({counter(backup-download-cli-api)}. Көшірме файлдарына арналған машинаны дайындаңыз)[id=backup-download-cli-api-lin]}

1. Файлдар жүктелетін Linux ОЖ-сі бар жұмыс машинасын таңдаңыз.
1. Осы машинада бос орынның жеткілікті екеніне көз жеткізіңіз: әрбір көшірменің сығылған `content` файлына және көлемі дискінің өлшеміне тең түпкілікті RAW файлына.

Жинаудан кейін бірден RAW файлы аз орын алуы мүмкін, бірақ көшіру және конвертациялау кезінде ол дискінің барлық көлемін алады.

## {heading({counter(backup-download-cli-api)}. Көшірме файлдарын {var(s3)} қоймасынан жүктеп алыңыз)[id=backup-download-cli-api-download]}

Көшірме файлдары `volumebackups-<ID_ПРОЕКТА>` жүйелік бакетінде сақталады. Папка атауы көшірме ID мәніне сәйкес келеді.

Әрбір көшірме үшін мына пәрменді орындаңыз:

```console
aws --endpoint-url <АДРЕС_S3> s3 cp s3://volumebackups-<ID_ПРОЕКТА>/<ID_КОПИИ>/ ./<ID_КОПИИ>/ --recursive
```

Мұндағы:

- `<АДРЕС_S3>` — {var(s3)} эндпоинтінің мекенжайы, мысалы `https://hb.ru-msk.vkcloud-storage.ru`.
- `<ID_ПРОЕКТА>` — бұрын алған жобаның Project ID мәні.
- `<ID_КОПИИ>` — резервтік көшірменің ID мәні:

   - OpenStack CLI үшін — `ID` бағанындағы мән;
   - API үшін — `external_id` мәні.

Файлдар `./<ID_КОПИИ>/<файл>` құрылымында сақталады. Әрбір көшірме үшін бес файл жүктеледі:

- `content`,
- `object_segments`,
- `volume_segments`,
- `sha_list`,
- `volume_metadata`.

Толығырақ {linkto(../../../concepts/download-features#backup-download-features-content)[text=ВМ дисктерінің резервтік көшірмелерін {var(cloud)} сыртына ауыстыру]} бөлімінде.

Егер көшірмелер тізбегін жүктеп алатын болсаңыз, пәрменді тізбектегі әрбір көшірме үшін орындаңыз.

## {heading({counter(backup-download-cli-api)}. Жүктеп алынған файлдарды тексеріңіз)[id=backup-download-cli-api-check]}

{include(/kz/_includes/_backup-download-check.md)[tags=check]}
