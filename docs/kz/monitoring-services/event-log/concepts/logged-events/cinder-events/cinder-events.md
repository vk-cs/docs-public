{include(/kz/_includes/_translated_by_ai.md)}

Cloud Audit-ке [дискілерді және олардың снапшоттарын басқару сервисі](/kz/computing/iaas/instructions/volumes) жіберетін оқиғалар.

## Cinder компонентінің v2 оқиғалары

[cols="2,3", options="header"]
|===
|Оқиға
|Сипаттама

|`force-delete-backup`
|Резервтік көшірме мәжбүрлі түрде жойылды

|`accept-volume-transfer`
|Томды (volume transfer) бір пайдаланушыдан екіншісіне беру рұқсат етілді

|`create-volume-transfer`
|Томды беру жасалды

|`delete-volume-transfer`
|Томды беру жойылды

|`create-backup`
|Резервтік көшірме жасалды

|`delete-backup`
|Резервтік көшірме жойылды

|`restore-backup`
|Резервтік көшірмеден қалпына келтіру орындалды

|`reset-snapshot-status`
|Снапшот күйі қалпына келтірілді

|`create-snapshot`
|Снапшот жасалды

|`update-snapshot-metadata`
|Снапшот метадеректері жаңартылды

|`update-snapshot`
|Снапшот жаңартылды

|`delete-snapshot`
|Снапшот жойылды

|`volume-type-action`
|Том түрімен әрекет орындалды

|`create-consistency-group`
|Снапшоттар жасауға арналған консистенттілік тобы жасалды

|`create-consistency-group-from-source`
|Консистенттілік тобы дереккөзден жасалды

|`delete-consistency-group`
|Консистенттілік тобы жойылды

|`update-consistency-group`
|Консистенттілік тобы жаңартылды

|`extend-volume-size`
|Том өлшемі ұлғайтылды

|`manage-existing-volume`
|Қолданыстағы том Cinder басқаруына берілді

|`unset-keys-in-qos-specification`
|QoS спецификациясының кілттері өшірілді

|`set-keys-in-qos-specification`
|QoS спецификациясының кілттері орнатылды

|`delete-qos-specification`
|QoS спецификациясы жойылды

|`create-qos-specification`
|QoS спецификациясы жасалды

|`update-quotas-for-user`
|Пайдаланушы квоталары жаңартылды

|`delete-quotas-for-user`
|Пайдаланушы квоталары жойылды

|`update-quotas`
|Квоталар жаңартылды

|`delete-quotas`
|Квоталар жойылды

|`create-volume`
|Том жасалды

|`update-volume`
|Том жаңартылды

|`delete-volume`
|Том жойылды

|`create-volume-metadata`
|Том метадеректері жасалды

|`update-volume-metadata`
|Том метадеректері жаңартылды

|`delete-consistency-group-snapshot`
|Консистенттілік тобының снапшоты жойылды

|`create-consistency-group-snapshot`
|Консистенттілік тобының снапшоты жасалды

|`update-volume-type`
|Том түрі жаңартылды

|`delete-volume-type`
|Том түрі жойылды

|`create-volume-type`
|Том түрі жасалды

|`action-volume`
|Томмен әрекет орындалды
|===

## Cinder компонентінің v3 оқиғалары

[cols="2,3", options="header"]
|===
|Оқиға
|Сипаттама

|`accept-volume-transfer`
|Томды (volume transfer) бір пайдаланушыдан екіншісіне беру рұқсат етілді

|`create-volume-transfer`
|Томды беру жасалды

|`delete-volume-transfer`
|Томды беру жойылды

|`force-delete-backup`
|Резервтік көшірме мәжбүрлі түрде жойылды

|`delete-group-snapshot`
|Топ снапшоты жойылды

|`create-group-snapshot`
|Топ снапшоты жасалды

|`create-backup`
|Резервтік көшірме жасалды

|`delete-backup`
|Резервтік көшірме жойылды

|`restore-backup`
|Резервтік көшірмеден қалпына келтіру орындалды

|`add-private-volume-type-access-to-project`
|Жобаға томның жеке түріне қолжетімділік қосылды

|`create-consistency-group`
|Снапшоттар жасауға арналған консистенттілік тобы жасалды

|`create-consistency-group-from-source`
|Консистенттілік тобы дереккөзден жасалды

|`delete-consistency-group`
|Консистенттілік тобы жойылды

|`update-consistency-group`
|Консистенттілік тобы жаңартылды

|`unset-keys-in-qos-specification`
|QoS спецификациясының кілттері өшірілді

|`set-keys-in-qos-specification`
|QoS спецификациясының кілттері орнатылды

|`delete-qos-specification`
|QoS спецификациясы жойылды

|`create-qos-specification`
|QoS спецификациясы жасалды

|`extend-volume-size`
|Том өлшемі ұлғайтылды

|`create-volume`
|Том жасалды

|`update-volume`
|Том жаңартылды

|`delete-volume`
|Том жойылды

|`create-metadata-for-volume`
|Том метадеректері жасалды

|`update-volume-metadata`
|Том метадеректері жаңартылды

|`manage-an-existing-volume`
|Қолданыстағы том Cinder басқаруына берілді

|`reset-snapshot-status`
|Снапшот күйі қалпына келтірілді

|`update-group-type`
|Топ түрі өзгертілді

|`create-group-specs-for-group-type`
|Топ түрі үшін топ спецификациялары жасалды

|`delete-group-type`
|Топ түрі жойылды

|`create-group-type`
|Топ түрі жасалды

|`update-quotas-for-user`
|Пайдаланушы квоталары жаңартылды

|`delete-quotas-for-user`
|Пайдаланушы квоталары жойылды

|`update-quotas-for-project`
|Жобаға арналған квоталар жаңартылды

|`delete-quotas-for-project`
|Жобаға арналған квоталар жойылды

|`update-volume-type`
|Том түрі жаңартылды

|`delete-volume-type`
|Том түрі жойылды

|`create-volume-type`
|Том түрі жасалды

|`create-an-encryption-type`
|Шифрлау түрі жасалды

|`update-an-encryption-type`
|Шифрлау түрі жаңартылды

|`create-group`
|Топ жасалды

|`create-group-from-source`
|Топ дереккөзден жасалды

|`delete-group`
|Топ жойылды

|`update-group`
|Топ жаңартылды

|`create-snapshot`
|Снапшот жасалды

|`update-snapshot-metadata`
|Снапшот метадеректері жаңартылды

|`update-snapshot`
|Снапшот жаңартылды

|`delete-snapshot`
|Снапшот жойылды

|`delete-consistency-group-snapshot`
|Консистенттілік тобының снапшоты жойылды

|`create-consistency-group-snapshot`
|Консистенттілік тобының снапшоты жасалды
|===
