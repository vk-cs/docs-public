# {heading(Changelog)[id=changelog]}

{include(/en/_includes/_translated_by_ai_en.md)}

{caption(Table {counter(table)[id=numb_tab_changelog]} — Changelog)[align=right;position=above;id=tab_changelog;number={const(numb_tab_changelog)}]}
[cols="1,6", options="header"]
|===
|Date
|Description

|17.07.24, {var(revdate)}
|
Changes for image-based applications. Added:

* The need to specify the type for Terraform variables — section {linkto(../ibservice_add/tf_manifest/tf_manifest_variable#tf_manifest_variable)[text=%text]}.
* Additions regarding the `deployment` directory structure — section {linkto(../ibservice_add/ib_structure#ib_structure)[text=%text]}.
* Restrictions on the use of networks — section {linkto(../ibservice_add/ibservice_upload/ibservice_upload_localtest#ibservice_upload_localtest)[text=%text]}.
* Restored the method for viewing logs using a JWT token — section {linkto(../ibservice_add/ibservice_upload/ibservice_upload_package#ibservice_upload_package_log)[text=%text]}

|06.06.24
|
Updated the log viewing request — section {linkto(../ibservice_add/ibservice_upload/ibservice_upload_deploysystemtest#deploysystemtest_log)[text=%text]}

|28.05.24
|
Added integration with the cloud platform's Cloud Monitoring. New sections:

* [Integration with the cloud platform's Cloud Monitoring](../ib_cloud_monitoring).
* {linkto(/en/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_datasources/ivkcs_monitoring_user#ivkcs_monitoring_user)[text=%text]}.

|24.04.24
|
Changes for image-based applications:

* Added:

   * Description of the `settings.yaml` file in the service package — sections {linkto(../ibservice_add/ib_structure#ib_structure)[text=%text]}, {linkto(../ibservice_add/tf_manifest/tf_manifest_settings#tf_manifest_settings)[text=%text]}.
   * Time provider — section {linkto(../ibservice_add/tf_manifest/tf_manifest_steps#tf_manifest_steps)[text=%text]}.
   * Network requirements for the `full_description.md` file — section {linkto(../service_description#service_description_info)[text=%text]}.
   * Resources of the iVK CS provider:

      * `ivkcs_ssh_keypair` — sections {linkto(/en/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_resources_list#ivkcs_resources_list)[text=%text]}, {linkto(/en/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_ssh_keypair#ivkcs_ssh_keypair)[text=%text]}.
      * `ivkcs_user_data` — section {linkto(/en/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_user_data#ivkcs_user_data)[text=%text]}.

* Updated:

   * Version of the JSON file generator — section {linkto(../ibservice_add/ib_structure#ib_structure)[text=%text]}.
   * Requirements for the service image — section [Marketplace Agent](/en/tools-for-using-services/vendor-account/manage-apps/concepts/vendor-preconditions/image_based#image_based_req_image).
   * Use of SSH keys and agent installation on a VM. Sections:

      * {linkto(../ibservice_add/tf_manifest/tf_manifest_image#tf_manifest_image)[text=%text]}.
      * {linkto(../ibservice_add/tf_manifest/tf_manifest_output#tf_manifest_output)[text=%text]}.
      * {linkto(../ibservice_add/tf_manifest/tf_manifest_steps#tf_manifest_example)[text=%text]}.

   * Monitoring — section {linkto(../ibservice_add/tf_manifest/tf_manifest_monitoring#tf_manifest_monitoring)[text=%text]}.
   * Description of the `ivkcs_compute_instance_reboot` resource — section {linkto(/en/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_compute_instance_reboot#ivkcs_compute_instance_reboot)[text=%text]}.
   * Example of VM configuration for Packer — section {linkto(../ibservice_add/ib_image_create/ib_image_create_packer#ib_image_create_packer)[text=%text]}.

* Removed:

   * Automatic VM recovery.
   * The `ivkcs_agent_status` resource

|===
{/caption}