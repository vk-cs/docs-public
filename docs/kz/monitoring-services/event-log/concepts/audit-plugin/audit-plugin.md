{include(/kz/_includes/_translated_by_ai.md)}

Cloud Audit сервисіне деректер қабатының (data plane) логтарын жіберу `vkcloudaudit-fluent-bit-plugin` логтау плагині арқылы қосылады және бапталады. Ол [Golang-плагиндерге](https://docs.fluentbit.io/manual/development/golang-output-plugins) арналған интерфейспен жұмыс істейді, оны [Fluent Bit](https://docs.fluentbit.io/manual) сервисі ұсынады.

Деректер қабаты үшін оқиға көздерінің мысалдары:

- Kubernetes (Kubernetes auditing);
- PostgreSQL (pgAudit кеңейтімі);
- Операциялық жүйе (auditd қызметі).

Kubernetes сияқты кейбір көздерден оқиғаларды жинау аудит сервисіне әлдеқашан біріктірілген.
Плагинді қосымша баптау арқылы кез келген басқа көздерді қоса аласыз.

## {heading(Плагинді авторизациялау параметрлері)[id=auth_parameters]}

[cols="1,1,2,2", options="header"]
|===
| Параметр
| Міндетті
| Сипаттамасы
| Қайдан табуға болады

| `auth_type`
| ![](../../../../assets/check.svg "inline")
| Аутентификация түрі:

- `keystone`;
- `disabled`.

Әдепкі бойынша: `keystone`
|<!--- no ---!>

| `auth_url`
| ![](../../../../assets/check.svg "inline")
| Keystone сервисінің эндпоинті
| VK Cloud [жеке кабинетінде](https://kz.cloud.vk.com/app/any/project/keys) орналасқан Auth URL параметрі

| `auth_timeout`
| ![](../../../../assets/no.svg "inline")
| Пайдаланушының есептік деректерін тексеру кезінде қолданба аутентификация сервисінен жауап күтетін ең ұзақ уақыт.

Әдепкі бойынша: `5s`
|<!--- no ---!>

| `project_id`
| ![](../../../../assets/check.svg "inline")
| Логтар жазылатын VK Cloud жобасының идентификаторы
| VK Cloud [жеке кабинетінде](https://kz.cloud.vk.com/app/any/project/keys) орналасқан Project ID параметрі.

Мысал: `a1b2c3d4e5f6g7h8i9a1b2c3d4e5f6g7`

Оны `mcs1234567890` түріндегі Project Name атауымен шатастырмаңыз

| `user_id`
| ![](../../../../assets/no.svg "inline")
| Логтар жазылатын пайдаланушының ID-і
| <!--- no --->

| `user_name`
| ![](../../../../assets/no.svg "inline")
| Логтар жазылатын пайдаланушының логині
| VK Cloud [жеке кабинетінде](https://kz.cloud.vk.com/app/any/project/keys) орналасқан Username параметрі

| `password`
| ![](../../../../assets/no.svg "inline")
| Логтар жазылатын пайдаланушының құпиясөзі
| `user_name` үшін VK Cloud жеке кабинетіне кіру құпиясөзі пайдаланылады

| `key_file`
| ![](../../../../assets/no.svg "inline")
| `user_id` және `password` мәндерін қамтитын JSON файлы
| <!--- no --->

|===

Пайдаланушының есептік деректерін көрсетудің рұқсат етілген нұсқалары:

- `user_id` және `password`;
- `key_file`;
- `user_name` және `password` (мысалы, VK Cloud жеке кабинетіне кіруге арналған логиніңіз бен құпиясөзіңіз).

## {heading(Плагинді баптау параметрлері)[id=conf_parameters]}

[cols="1,1,3", options="header"]
|===
| Параметр
| Міндетті
| Сипаттамасы

| `server_host`
| ![](../../../../assets/check.svg "inline")
| Аудит деректерін алуға арналған API эндпоинті:

- `https://kz.cloud.vk.com/audit/c2s` — Москва аймағы үшін;
- `https://kz.cloud.vk.com/audit/c2s` — Қазақстан аймағы үшін

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
