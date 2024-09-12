# {heading(История изменений)[id=changelog]}

{caption(Таблица {counter(table)[id=numb_tab_changelog]} — История изменений)[align=right;position=above;id=tab_changelog;number={const(numb_tab_changelog)}]}
[cols="1,6", options="header"]
|===
|Дата
|Описание

|17.07.24, {var(revdate)}
|
Изменения для image-based приложений. Добавлено:

* Необходимость указания типа для переменных Terraform — раздел {linkto(../ibservice_add/tf_manifest/tf_manifest_variable/#tf_manifest_variable)[text=%text]}.
* Дополнения по структуре директории `deployment` — раздел {linkto(../ibservice_add/ib_structure/#ib_structure)[text=%text]}.
* Ограничения по использованию сетей — раздел {linkto(../ibservice_add/ibservice_upload/ibservice_upload_localtest/#ibservice_upload_localtest)[text=%text]}.
* Возвращен способ просмотра логов с использованием JWT-токена — раздел {linkto(../ibservice_add/ibservice_upload/ibservice_upload_package/#ibservice_upload_package_log)[text=%text]}

|06.06.24
|
Обновлен запрос просмотра логов — раздел {linkto(../ibservice_add/ibservice_upload/ibservice_upload_deploysystemtest/#deploysystemtest_log)[text=%text]}

|28.05.24
|
Добавлена интеграция с Cloud Monitoring облачной платформы. Новые разделы:

* [Интеграция с Cloud Monitoring облачной платформы](../ib_cloud_monitoring).
* {linkto(/ru/applications-and-services/marketplace/vendor/ivkcs/ivkcs_datasources/ivkcs_monitoring_user/#ivkcs_monitoring_user)[text=%text]}.

|24.04.24
|
Изменения для image-based приложений:

* Добавлено:

   * Описание файла `settings.yaml` в сервисном пакете — разделы {linkto(../ibservice_add/ib_structure/#ib_structure)[text=%text]}, {linkto(../ibservice_add/tf_manifest/tf_manifest_settings/#tf_manifest_settings)[text=%text]}.
   * Провайдер Time — раздел {linkto(../ibservice_add/tf_manifest/tf_manifest_steps/#tf_manifest_steps)[text=%text]}.
   * Требования к сети для файла `full_description.md` — раздел {linkto(../service_description/#service_description_info)[text=%text]}.
   * Ресурсы провайдера iVK CS:

      * `ivkcs_ssh_keypair` — разделы {linkto(/ru/applications-and-services/marketplace/vendor/ivkcs/ivkcs_resources/ivkcs_resources_list/#ivkcs_resources_list)[text=%text]}, {linkto(/ru/applications-and-services/marketplace/vendor/ivkcs/ivkcs_resources/ivkcs_ssh_keypair/#ivkcs_ssh_keypair)[text=%text]}.
      * `ivkcs_user_data` — раздел {linkto(/ru/applications-and-services/marketplace/vendor/ivkcs/ivkcs_resources/ivkcs_user_data/#ivkcs_user_data)[text=%text]}.

* Обновлено:

   * Версия генератора JSON-файла — раздел {linkto(../ibservice_add/ib_structure/#ib_structure)[text=%text]}.
   * Требования к образу сервиса — раздел {linkto(../ibservice_add/ib_image_create/ib_image_requirements/#ib_image_requirements)[text=%text]}.
   * Использование SSH-ключей и установка агента на ВМ. Разделы:

      * {linkto(../ibservice_add/tf_manifest/tf_manifest_image/#tf_manifest_image)[text=%text]}.
      * {linkto(../ibservice_add/tf_manifest/tf_manifest_output/#tf_manifest_output)[text=%text]}.
      * {linkto(../tf_manifest_example/#tf_manifest_example)[text=%text]}.

   * Мониторинг — раздел {linkto(../ibservice_add/tf_manifest/tf_manifest_monitoring/#tf_manifest_monitoring)[text=%text]}.
   * Описание ресурса `ivkcs_compute_instance_reboot` — раздел {linkto(/ru/applications-and-services/marketplace/vendor/ivkcs/ivkcs_resources/ivkcs_compute_instance_reboot/#ivkcs_compute_instance_reboot)[text=%text]}.
   * Пример конфигурации ВМ для Packer — раздел {linkto(../ibservice_add/ib_image_create/ib_image_create_packer/#ib_image_create_packer)[text=%text]}.

* Удалено:

   * Автовосстановление ВМ.
   * Ресурс `ivkcs_agent_status`

|===
{/caption}
