# {heading(Деректер қабатының аудит плагині)[id=event-log-audit-plugin]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Cloud Audit сервисінде деректер қабатының (data plane) логтарды жіберуі `vkcloudaudit-fluent-bit-plugin` журналдау плагині көмегімен қосылады және бапталады. Ол [Fluent Bit](https://docs.fluentbit.io/manual) сервисі ұсынатын [Golang-плагиндер интерфейсімен](https://docs.fluentbit.io/manual/development/golang-output-plugins) жұмыс істейді.

Деректер қабаты үшін оқиға көздерінің мысалдары:

- Kubernetes (Kubernetes auditing);
- Операциялық жүйе (auditd қызметі).

Кейбір көздерден, мысалы Kubernetes, оқиғаларды жинау аудит сервисіне бұрыннан интеграцияланған.
Басқа кез келген көздерді қоса аласыз, плагинді өз бетінше {linkto(../../instructions/connect-plugin#event-log-connect-plugin)[text=орнатып, баптау]} арқылы.

## {heading(Плагин авторизациясының параметрлері)[id=event-log-auth-parameters]}

[cols="1,1,2,2", options="header"]
|===
| Параметр
| Міндетті
| Сипаттамасы
| Қай жерде табуға болады

| `auth_type`
| ![](../../../../assets/check.svg "inline")
| Аутентификация түрі:

- `keystone`;
- `disabled`.

Әдепкі: `keystone`
|<!--- no ---!>

| `auth_url`
| ![](../../../../assets/check.svg "inline")
| Keystone сервисінің эндпоинті
| [{var(cloud)} жеке кабинетіндегі](https://msk.cloud.vk.ru/app/any/project/keys) Auth URL параметрі

| `auth_timeout`
| ![](../../../../assets/no.svg "inline")
| Қолданбаның пайдаланушы деректерін тексеру кезінде аутентификация сервисінен жауап күтетін максималды уақыты.

Әдепкі: `5s`
|<!--- no ---!>

| `project_id`
| ![](../../../../assets/check.svg "inline")
| Логтар жазылатын {var(cloud)} жобасының идентификаторы
| [{var(cloud)} жеке кабинетіндегі](https://msk.cloud.vk.ru/app/any/project/keys) Project ID параметрі.

Мысал: `a1b2c3d4e5f6g7h8i9a1b2c3d4e5f6g7`

`mcs1234567890` түріндегі Project Name-мен шатастырмаңыз

| `user_id`
| ![](../../../../assets/no.svg "inline")
| Логтар жазылатын пайдаланушының ID-сы
| <!--- no --->

| `user_name`
| ![](../../../../assets/no.svg "inline")
| Логтар жазылатын пайдаланушының логині
| [{var(cloud)} жеке кабинетіндегі](https://msk.cloud.vk.ru/app/any/project/keys) Username параметрі

| `password`
| ![](../../../../assets/no.svg "inline")
| Логтар жазылатын пайдаланушының құпиясөзі
| `user_name` үшін {var(cloud)} жеке кабинетіне кіру құпиясөзі қолданылады

| `key_file`
| ![](../../../../assets/no.svg "inline")
| `user_id` және `password` мәндерін қамтитын JSON-файл
| <!--- no --->

|===

Пайдаланушы деректемелерін көрсетудің рұқсат етілген нұсқалары:

- `user_id` және `password`;
- `key_file`;
- `user_name` және `password` (мысалы, {var(cloud)} жеке кабинетіне кіру үшін сіздің логиніңіз бен құпиясөзіңіз).

## {heading(Плагинді баптау параметрлері)[id=event-log-conf-parameters]}

[cols="1,1,3", options="header"]
|===
| Параметр
| Міндетті
| Сипаттамасы

| `server_host`
| ![](../../../../assets/check.svg "inline")
| Аудит деректерін алуға арналған API эндпоинті:

- `https://kz.cloud.vk.kz/audit/c2s` — Москва аймағы үшін;
- `https://kz.cloud.vk.kz/audit/c2s` — Қазақстан аймағы үшін

| `source_id`
| ![](../../../../assets/check.svg "inline")
| Аудит оқиғалары көзі идентификаторы (мысалы, Cloud Databases сервисі үшін `databases`). Пайдаланушы қояды

| `timeout`
| ![](../../../../assets/no.svg "inline")
| Сұрауды күтудің ең ұзақ уақыты. Әдепкі бойынша: `5s`

| `idle_timeout`
| ![](../../../../assets/no.svg "inline")
| Белсенді емес keepalive-қосылымы жабылатын уақыт. Әдепкі бойынша: `1s`

| `max_conns`
| ![](../../../../assets/no.svg "inline")
| Қосылымдардың ең көп саны. Әдепкі бойынша: `512`

|===