# {heading(Өзгерістер тарихы)[id=changelog]}

{include(/kz/_includes/_translated_by_ai.md)}

{caption(Кесте {counter(table)[id=numb_tab_changelog]} — Өзгерістер тарихы)[align=right;position=above;id=tab_changelog;number={const(numb_tab_changelog)}]}
[cols="1,6", options="header"]
|===
|Күні
|Сипаттамасы

|17.07.24, {var(revdate)}
|
image-based қолданбалары үшін өзгерістер. Қосылды:

* Terraform айнымалылары үшін түрді көрсету қажеттілігі — {linkto(../ibservice_add/tf_manifest/tf_manifest_variable#tf_manifest_variable)[text=%text]} бөлімі.
* `deployment` директориясының құрылымы бойынша толықтырулар — {linkto(../ibservice_add/ib_structure#ib_structure)[text=%text]} бөлімі.
* Желілерді пайдалану бойынша шектеулер — {linkto(../ibservice_add/ibservice_upload/ibservice_upload_localtest#ibservice_upload_localtest)[text=%text]} бөлімі.
* JWT-токенді пайдаланып логтарды қарау тәсілі қайтарылды — {linkto(../ibservice_add/ibservice_upload/ibservice_upload_package#ibservice_upload_package_log)[text=%text]} бөлімі.

|06.06.24
|
Логтарды қарау сұрауы жаңартылды — {linkto(../ibservice_add/ibservice_upload/ibservice_upload_deploysystemtest#deploysystemtest_log)[text=%text]} бөлімі.

|28.05.24
|
Бұлттық платформаның Cloud Monitoring сервисімен интеграция қосылды. Жаңа бөлімдер:

* [Бұлттық платформаның Cloud Monitoring сервисімен интеграция](../ib_cloud_monitoring).
* {linkto(/kz/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_datasources/ivkcs_monitoring_user#ivkcs_monitoring_user)[text=%text]}.

|24.04.24
|
image-based қолданбалары үшін өзгерістер:

* Қосылды:

    * Сервистік пакеттегі `settings.yaml` файлының сипаттамасы — {linkto(../ibservice_add/ib_structure#ib_structure)[text=%text]}, {linkto(../ibservice_add/tf_manifest/tf_manifest_settings#tf_manifest_settings)[text=%text]} бөлімдері.
    * Time провайдері — {linkto(../ibservice_add/tf_manifest/tf_manifest_steps#tf_manifest_steps)[text=%text]} бөлімі.
    * `full_description.md` файлына арналған желі талаптары — {linkto(../service_description#service_description_info)[text=%text]} бөлімі.
    * iVK CS провайдерінің ресурстары:

        * `ivkcs_ssh_keypair` — {linkto(/kz/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_resources_list#ivkcs_resources_list)[text=%text]}, {linkto(/kz/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_ssh_keypair#ivkcs_ssh_keypair)[text=%text]} бөлімдері.
        * `ivkcs_user_data` — {linkto(/kz/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_user_data#ivkcs_user_data)[text=%text]} бөлімі.

* Жаңартылды:

    * JSON-файл генераторының нұсқасы — {linkto(../ibservice_add/ib_structure#ib_structure)[text=%text]} бөлімі.
    * Қызмет образына қойылатын талаптар — {linkto(../ibservice_add/ib_image_create/ib_image_requirements#ib_image_requirements)[text=%text]} бөлімі.
    * SSH кілттерін пайдалану және ВМ-ге агентті орнату. Бөлімдер:

        * {linkto(../ibservice_add/tf_manifest/tf_manifest_image#tf_manifest_image)[text=%text]}.
        * {linkto(../ibservice_add/tf_manifest/tf_manifest_output#tf_manifest_output)[text=%text]}.
        * {linkto(../ibservice_add/tf_manifest/tf_manifest_steps#tf_manifest_example)[text=%text]}.

    * Мониторинг — {linkto(../ibservice_add/tf_manifest/tf_manifest_monitoring#tf_manifest_monitoring)[text=%text]} бөлімі.
    * `ivkcs_compute_instance_reboot` ресурсының сипаттамасы — {linkto(/kz/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_compute_instance_reboot#ivkcs_compute_instance_reboot)[text=%text]} бөлімі.
    * Packer үшін ВМ конфигурациясының мысалы — {linkto(../ibservice_add/ib_image_create/ib_image_create_packer#ib_image_create_packer)[text=%text]} бөлімі.

* Жойылды:

    * ВМ автоқалпына келтіру.
    * `ivkcs_agent_status` ресурсы

|===
{/caption}
