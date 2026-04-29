{include(/kz/_includes/_translated_by_ai.md)}

Пайдаланушы қолданбаларының логтарын Cloud Logging сервисіне жіберу `vkcloudlogs-fluent-bit-plugin` логтау плагині арқылы қосылып, бапталады. Ол [Fluent Bit](https://docs.fluentbit.io/manual/development/golang-output-plugins) сервисі ұсынатын [Golang-плагиндеріне](https://docs.fluentbit.io/manual) арналған интерфейспен жұмыс істейді.

## {heading(Плагиннің авторизация параметрлері)[id=auth_parameters]}

[cols="1,1,2,2", options="header"]
|===
| Параметр
| Міндетті
| Сипаттама
| Қайдан табуға болады

| `auth_url`
| ![](../../../../assets/check.svg "inline")
| Keystone сервисінің эндпоинті
| VK Cloud [жеке кабинетінде](https://kz.cloud.vk.com/app/any/project/keys) орналасқан Auth URL параметрі

| `project_id`
| ![](../../../../assets/check.svg "inline")
| Логтар жазылатын VK Cloud жобасының идентификаторы
| VK Cloud [жеке кабинетінде](https://kz.cloud.vk.com/app/any/project/keys) орналасқан Project ID параметрі.

Мысал: `a1b2c3d4e5f6g7h8i9a1b2c3d4e5f6g7`

 түріндегі Project Name-пен шатастырмаңыз`mcs1234567890`

| `user_id`
| ![](../../../../assets/no.svg "inline")
| Логтар кімнің атынан жазылатын болса, сол пайдаланушының ID-і
| VK Cloud жеке кабинетінде [Есептік деректерді генерациялау](https://kz.cloud.vk.com/app/services/monitoring/logging/settings) қойындысында жасалады

| `user_name`
| ![](../../../../assets/no.svg "inline")
| Логтар кімнің атынан жазылатын болса, сол пайдаланушының логині
| VK Cloud [жеке кабинетінде](https://kz.cloud.vk.com/app/any/project/keys) орналасқан Username параметрі

| `password`
| ![](../../../../assets/no.svg "inline")
| Логтар кімнің атынан жазылатын болса, сол пайдаланушының құпиясөзі
| `user_id` үшін құпиясөз VK Cloud жеке кабинетінде [Есептік деректерді генерациялау](https://kz.cloud.vk.com/app/services/monitoring/logging/settings) қойындысында жасалады.

`user_name` үшін VK Cloud жеке кабинетіне кіруге арналған құпиясөз қолданылады

| `key_file`
| ![](../../../../assets/no.svg "inline")
| Құрамында `user_id` және `password` мәндері бар JSON файлы
| <!--- no ---!>

| `internal`
| ![](../../../../assets/no.svg "inline")
| Сервистердің техникалық логтарын жазу қосыла ма, соны көрсететін параметр:

* `true` — қосылған;
* `false` — өшірілген.

Әдепкі бойынша: `true`
| <!--- no ---!>

|===

Пайдаланушының есептік деректерін көрсетудің рұқсат етілген нұсқалары:

- `user_id` және `password`;
- `key_file`;
- `user_name` және `password` (мысалы, VK Cloud жеке кабинетіне кіруге арналған логиніңіз бен құпиясөзіңіз).

{note:warn}

Cloud Logging сервисі үшін генерацияланған аккаунттарда тек логтарды жазу құқығы бар. Сондықтан оларды пайдаланып авторизациялау қауіпсіздеу нұсқа ретінде ұсынылады.

{/note}

## {heading(Плагин конфигурациясының параметрлері)[id=conf_parameters]}

[cols="1,1,3", options="header"]
|===
| Параметр
| Міндетті
| Сипаттама

| `server_host_port`
| ![](../../../../assets/check.svg "inline")
| Cloud Logging сервисінің адресі (`cloudlogs.mcs.mail.ru:443`)

| `service_id`
| ![](../../../../assets/no.svg "inline")
| Логтау жүйесіндегі сервис идентификаторы:

* `databases` — Cloud Databases сервисі.
* `containers` — Cloud Containers сервисі.
* `vdi` — Cloud Desktop сервисі.

Көрсетілмесе, `default` мәні беріледі.

Қажет болса, жеке идентификаторларыңызды [техникалық қолдау](/kz/contacts) арқылы немесе бөлімнің **Мониторинг → Логтау** баптауларындағы **Өзге ресурстар** [қойындысында](https://kz.cloud.vk.com/app/services/monitoring/logging/settings) өзіңіз жасай аласыз

| `group_id`
| ![](../../../../assets/no.svg "inline")
| Логтар тобының идентификаторы. Әдепкі бойынша: Fluent Bit жүйесінде оқиғаға тағайындалған [Tag](https://docs.fluentbit.io/manual/concepts/key-concepts#tag) параметрінің мәні

| `group_id_key`
| ![](../../../../assets/no.svg "inline")
| Логтар тобының идентификаторы бар параметрдің атауы. `group_id` параметрі көрсетілмесе қолданылады

| `stream_id`
| ![](../../../../assets/no.svg "inline")
| Логтар көзінің идентификаторы, мысалы, инстанс идентификаторы (`instance_id`) немесе ВМ (`vm_id`). Әдепкі бойынша: бос мән

| `stream_id_key`
| ![](../../../../assets/no.svg "inline")
| Логтар көзінің идентификаторы бар параметрдің атауы. `stream_id` параметрі көрсетілмесе қолданылады

| `message_key`
| ![](../../../../assets/no.svg "inline")
| Әрбір лог жазбасына қосылатын хабарлама бар параметрдің атауы. Әдепкі бойынша: `message`

| `level_key`
| ![](../../../../assets/no.svg "inline")
| Логтау деңгейінің мәні бар параметрдің атауы. Әдепкі бойынша: `level`

| `default_level`
| ![](../../../../assets/no.svg "inline")
| Логтау деңгейінің мәні. `level_key` ішінде берілген атауы бар параметр көрсетілмесе қолданылады. Әдепкі бойынша: `debug`

| `default_payload`
| ![](../../../../assets/no.svg "inline")
| Әрбір лог жазбасының `payload` өрісіне қосылатын кілт/мән жұптары бар JSON форматындағы жол.

Мысал: `{"tag": "example", "case": 3}`

Әдепкі бойынша: бос жол

| `tls_on`
| ![](../../../../assets/no.svg "inline")
| `server_host_port` адресі үшін TLS протоколы қосылған-қосылмағанын көрсететін параметр:

* `true` — қосылған;
* `false` — өшірілген.

Әдепкі бойынша: `true`

| `tls_verify`
| ![](../../../../assets/no.svg "inline")
| `server_host_port` адресі үшін TLS сертификатын тексеру қосылған-қосылмағанын көрсететін параметр:

* `true` — қосылған;
* `false` — өшірілген.

Әдепкі бойынша: `true`
|===

Авторизация және конфигурация параметрлері арқылы плагинді баптау мысалдары [Плагинді орнату](../../instructions/connect-plugin) және [Логтау агентін басқару](../../instructions/manage-vkcloudlogs-plugin#configure_agent) бөлімдерінде келтірілген.
