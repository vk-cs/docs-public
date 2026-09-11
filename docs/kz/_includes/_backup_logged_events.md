{includetag(domain-events)}
Домендік оқиғалар ресурстардың күйіндегі өзгерістерді тіркейді.

[cols="2,2,1", options="header"]
|===
|Оқиға
|Сипаттама
|Ресурс

|`complete-checkpoint`
|Резервтік көшірмені жасау аяқталды
|`checkpoint`

|`complete-restore`
|Резервтік көшірмені қалпына келтіру аяқталды
|`restore`

|`create-checkpoint`
|Резервтік көшірмені қолмен жасау іске қосылды
|`checkpoint`

|`create-checkpoint-from-trigger`
|Резервтік көшірмені кесте бойынша жасау іске қосылды
|`checkpoint`

|`create-plan`
|Резервтік көшіру жоспары құрылды
|`plan`

|`create-plan-checkpoint`
|Жоспардың резервтік көшірмелерін жасау іске қосылды
|`checkpoint` операция сәтті болғанда, `plan` қате болғанда

|`create-plan-resource`
|Ресурс резервтік көшіру жоспарына қосылды
|`plan`

|`create-restore`
|Резервтік көшірмені қалпына келтіру іске қосылды
|`restore`

|`create-trigger`
|Резервтік көшіру кестесі құрылды
|`trigger`

|`update-trigger`
|Резервтік көшіру кестесі өзгертілді
|`trigger`

|`delete-checkpoint-resource`
|Резервтік көшірме ресурсы жойылды
|`checkpoint_resource`

|`delete-plan`
|Резервтік көшіру жоспары жойылды
|`plan`

|`delete-plan-resource`
|Ресурс резервтік көшіру жоспарынан жойылды
|`plan`

|`disable-plan-object-lock`
|Жоспар үшін Object Lock өшірілді
|`plan`

|`enable-plan-object-lock`
|Жоспар үшін Object Lock қосылды
|`plan`

|`extend-checkpoint-lock`
|Резервтік көшірмені бұғаттау мерзімі ұзартылды
|`checkpoint`

|`mark-checkpoint-for-deletion`
|Резервтік көшірме жоюға белгіленді
|`checkpoint`

|`unlock-checkpoint`
|Резервтік көшірмеден бұғаттау алынды
|`checkpoint`

|`update-plan`
|Резервтік көшіру жоспары өзгертілді
|`plan`

|`update-plan-object-lock`
|Object Lock жоспарының параметрлері өзгертілді
|`plan`
|===
{/includetag}

{includetag(api-events)}
API-ға сұраулар оқиғалары деректерді оқуды, сондай-ақ аутентификация және авторизация нәтижелерін тіркейді.

[cols="2,2,1", options="header"]
|===
|Оқиға
|Сипаттама
|Ресурс

|`authenticate-api-request`
|API-сұраудың аутентификация қатесі
|`api`

|`authorize-api-request`
|API-сұраудың авторизация қатесі
|`api`

|`create-default-plan`
|Сұрау кезінде әдепкі жоспар құрылды
|`plan`

|`get-default-plan`
|Әдепкі жоспар сұратылды
|`plan`

|`get-plan`
|Нақты жоспар сұратылды
|`plan`

|`list-plans`
|Жоспарлар тізімі сұратылды
|`plan`

|`get-checkpoint`
|Резервтік көшірме сұратылды
|`checkpoint`

|`get-checkpoint-consistency-status`
|Көшірменің консистенттілік мәртебесі сұратылды
|`checkpoint`

|`get-checkpoint-deleted-status`
|Көшірмені жою мәртебесі сұратылды
|`checkpoint`

|`get-checkpoint-metadata`
|Көшірменің метадеректері сұратылды
|`checkpoint`

|`list-checkpoints`
|Резервтік көшірмелер тізімі сұратылды
|`checkpoint`

|`list-checkpoints-by-plan`
|Жоспарлар бойынша топтастырылған резервтік көшірмелер сұратылды
|`checkpoint`

|`get-trigger`
|Кесте сұратылды
|`trigger`

|`list-triggers`
|Кестелер тізімі сұратылды
|`trigger`

|`get-plans-statistics`
|Жоспарлар бойынша статистика сұратылды
|`statistics`

|`get-checkpoints-statistics`
|Резервтік көшірмелер бойынша статистика сұратылды
|`statistics`

|`get-restores-statistics`
|Қалпына келтірулер бойынша статистика сұратылды
|`statistics`

|`get-provider`
|Провайдер сұратылды
|`provider`

|`get-resources-in-use`
|Жоспарларда пайдаланылатын ресурстар сұратылды
|`resources`
|===
{/includetag}
