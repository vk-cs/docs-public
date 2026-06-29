# {heading(Рөлдік басқару қолжеткізу моделі)[id=iam-concepts-rolesandpermissions]}

{linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=Жоба]} құрылғаннан кейін бірден онда тек бір ғана пайдаланушы болады — оның иесі. Бұл пайдаланушы басқа қатысушыларды жобаға {linkto(/ru/tools-for-using-services/account/instructions/project-settings/invite#tools-account-project-invite)[text=шақыра]} алады, оларға рөлдер мен рұқсаттар тағайындайды. Рөлдер мен рұқсаттар пайдаланушының жеке кабинет функционалдығымен және бұлттық сервистермен жұмыс істеу кезінде қолжетімді құқықтарын анықтайды.

*Рөл* — бұл VK Cloud ресурстарымен операцияларды орындауға арналған рұқсаттардың белгілі бір жиынтығы.

*Рұқсат* пайдаланушыға белгілі бір сервисте немесе компонентте тек бір ғана операцияны орындауға мүмкіндік береді.

Рөлдер мен рұқсаттардың толық тізімімен анықтамалықтарда таныса аласыз:

- {linkto(../access/iam/concepts/roles-reference#iam-roles-reference)[text=Рөлдер анықтамалығы]}.
- {linkto(../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=Рұқсаттар анықтамалығы]}.

Әрбір рөл мен рұқсатта мыналар бар:

- жеке кабинеттегі атауы, ол графиктік интерфейс арқылы рөлді тағайындау немесе жою үшін қолданылады;
- техникалық атауы, ол жобаны және сервистерді {linkto(../../../api#tools-api)[text=API]} және {linkto(../../../terraform#tools-terraform)[text=Terraform]} арқылы басқару үшін қолданылады.

{cut(Мысалдар)}

[cols="1,1", options="header"]
|===
| Жеке кабинеттегі атауы
| Техникалық атауы

| Жоба иесі
| `mcs_owner`

| Биллинг әкімшісі
| `mcs_admin_billing`

| Домен топтарын басқару
| `domain_groups_modify`

| Kafka инстансының қасиетін қарау
| `dp_kafka_instances_view`

|===

{/cut}

Бір пайдаланушы бірнеше жобаның қатысушысы бола алады және оларда әртүрлі рөлдер мен рұқсаттарға ие бола алады. Бір қатысушыға бір жобада бірнеше рөлдер мен рұқсаттар тағайындалуы мүмкін, бұл жағдайда құқықтар жинақталады.

Пайдаланушылардан басқа, жобаға бағдарламалар мен сервистер арасындағы өзара әрекеттесуге арналған {linkto(../service-accounts#iam-concepts-service-accounts)[text=сервистік есептік жазбалар]} (СЕЖ) да қосылуы мүмкін. СЕЖ үшін `Жоба иесі` рөлінен басқа кез келген рөлдер мен рұқсаттар тағайындалады.

Жоба қатысушыларының тізімін және оларға тағайындалған рөлдер мен рұқсаттарды жеке кабинеттің **Қолжетімділікті басқару** бетінде {linkto(../access/iam/instructions/access-manage#iam-access-manage)[text=көруге]} болады.

Кейбір сервистер үшін ерекше құқық жиынтықтары бар. Төменде осындай құқық жиынтықтары және олардың VK Cloud рөлдерімен қалай байланысатыны келтірілген.

## {heading(Cloud Logging сервисіндегі құқықтар)[id=rolesandpermissions-logging]}

[cols="2,1,1,1", options="header"]
|===
|Рөлдер
|Логтар мен сервис конфигурациясын қарау
|Лог параметрлерін өзгерту
|Сервистік пайдаланушылар мен сервис атауларын жасау

|Жоба иесі
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

|Суперәкімші
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

|Жоба әкімшісі
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

|Пайдаланушылар әкімшісі (IAM)
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

|Биллинг әкімшісі
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

|Бақылаушы
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

|Әкімші, кіші әкімші, ВМ операторы
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/check.svg "inline")

|Желі әкімшісі
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

|Желілік қауіпсіздік әкімшісі
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

|Ішкі желілер әкімшісі
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/check.svg "inline")

|Kubernetes әкімшісі, операторы, аудиторы
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/check.svg "inline")
|===

## {heading(Cloud Monitoring сервисіндегі құқықтар)[id=rolesandpermissions-monitoring]}

[cols="2,1,1,1,1", options="header"]
|===
|Рөлдер
|Дашбордтарды қарау
|Prometheus метрикаларын қарау
|Мониторинг жүйесіне жазу
|Дашбордтарды жасау және өңдеу

|Жоба иесі
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

|Суперәкімші
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

|Жоба әкімшісі
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

|Пайдаланушылар әкімшісі (IAM)
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

|Биллинг әкімшісі
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

|Бақылаушы
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

|Әкімші, кіші әкімші
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

|ВМ операторы
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")

|Желі әкімшісі
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

|Желілік қауіпсіздік әкімшісі
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

|Ішкі желілер әкімшісі
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

|Kubernetes әкімшісі, операторы, аудиторы
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
|===

## {heading(Cloud Audit сервисіндегі құқықтар)[id=rolesandpermissions-audit]}

[cols="2,2,1,1", options="header"]
|===
|Рөлдер
|Оқиғаларды қарау
|Деректерді жүктеп шығару
|Сервисті баптау

|Жоба иесі
| Жобаның барлық оқиғалары
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

|Суперәкімші
| Жобаның барлық оқиғалары
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

|Жоба әкімшісі
| Жобаның барлық оқиғалары
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

|Пайдаланушылар әкімшісі (IAM)
| IAM сервисінің барлық оқиғалары және өзінің барлық әрекеттері
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

|Биллинг әкімшісі
| Billing сервисінің барлық оқиғалары және өзінің барлық әрекеттері
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")

|Бақылаушы
| Жобаның барлық оқиғалары
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")

|Әкімші, кіші әкімші
| Жобаның барлық оқиғалары
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

|ВМ операторы
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

|Желі әкімшісі
| Cloud Network сервисінің барлық оқиғалары және өзінің барлық әрекеттері
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")

|Желілік қауіпсіздік әкімшісі
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

|Ішкі желілер әкімшісі
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

|Kubernetes әкімшісі, операторы, аудиторы
| Cloud Containers сервисінің барлық оқиғалары және өзінің барлық әрекеттері
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
|===

## {heading(Cloud Containers сервисінің рөлдеріне арналған құқықтар)[id=rolesandpermissions-k8s]}

Жеке кабинетте {linkto(../../../../kubernetes/k8s#k8s-k8s)[text=Cloud Containers сервисімен}} жұмыс істеуге арналған мамандандырылған рөлдер қолжетімді:

- Kubernetes әкімшісі,
- Kubernetes операторы,
- Kubernetes аудиторы.

Kubernetes әкімшісіне қолжетімді операциялар жоба иесіне, суперәкімшіге және жоба әкімшісіне де қолжетімді.

Қалған рөлдер үшін бұл операциялар қолжетімді емес.

Kubernetes нұсқасы 1.23 және одан жоғары кластерлер үшін Kubernetes әкімшісі, операторы немесе аудиторы рөлі пайдаланушыға қолжетімді ішкі {linkto(../../../../kubernetes/k8s/concepts/access-management#k8s-access-management-kubernetes-roles)[text=Kubernetes рөлін]} де анықтайды.

{note:info}
Кейбір әрекеттер тек кластердің белгілі бір күйінде ғана қолжетімді. Мысалы, аддондарды орнату және жою кластер іске қосылған кезде ғана мүмкін.
{/note}

[cols="2,1,1,1,1"]
|===
.2+| Операциялар
4+| Рөлдер

| Kubernetes әкімшісі
| Kubernetes операторы
| Kubernetes аудиторы
| Бақылаушы

| Кластерді жасау
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Кластерді жою
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Кластерді іске қосу
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Кластерді тоқтату
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Кластер, нод-топтары туралы ақпаратты көрсету
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

| kubeconfig алу
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Kubernetes Dashboard-қа кіру үшін секрет алу
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

| Нұсқаны жаңарту
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Виртуалды машина түрін өзгерту
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Prometheus дискісінің өлшемін өзгерту
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Түйіндер тобын қосу
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Түйіндер тобын жою
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Масштабтау параметрлерін өзгерту
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Labels және Taints өзгерту
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Аддонды орнату және жою
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
|===

## {heading(Security Gate сервисіндегі құқықтар)[id=rolesandpermissions-security-gate]}

[Security Gate](https://cloud.vk.com/security-gate) сервисі жеке кабинетте келесі рөлдер үшін қолжетімді:

- жоба иесі,
- суперәкімші,
- жоба әкімшісі,
- желілік қауіпсіздік әкімшісі,
- ішкі желілер әкімшісі,
- виртуалды машиналар әкімшісі,
- ВМ кіші әкімшісі,
- ВМ операторы,
- бақылаушы.

Қалған рөлдер үшін Security Gate сервисі қолжетімді емес.
