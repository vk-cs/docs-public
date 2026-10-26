# {heading(Version support policy)[id=trino_versions]}

{include(/en/_includes/_translated_by_ai_en.md)}

The Cloud Trino version support policy defines the rules for version support and describes the process of migrating to new versions. The policy serves as the basis for releasing updates and allows planning work with Cloud Trino versions.

## {heading(About versions)[id=trino_versions_general]}

Current version: `0.468.1`

The Cloud Trino version number follows the `X.YYY.Z` pattern. Here:
- `X` — Cloud Trino major version;
- `YYY` — the number of the [Trino release](https://trino.io/docs/current/release.html);
- `Z` — the build number of Cloud Trino within a single [Trino release](https://trino.io/docs/current/release.html).

Cloud Trino supports two types of versions: one current version and up to three previous versions. You can review the available versions in your management console when {linkto(../../instructions/create#trino_create)[text=creating]} a service instance. All other versions are considered *outdated*.

{note:warn}
Updates are not released for outdated Cloud Trino versions, and technical support options are limited. If you are using an outdated version, it is recommended to {linkto(#trino_versions_update)[text=update]}.
{/note}

## {heading(Release and support timelines)[id=trino_versions_release_support]}

New Cloud Trino versions are released no more than once every three months. When developing an update, the [Trino release](https://trino.io/docs/current/release.html) that most recently passed all required preparation and testing stages by {var(cloud)} specialists is used. This approach ensures maximum stability and security of the service.

When a new Cloud Trino version is released, the oldest available version is considered outdated and becomes unavailable for selection in the management console. Creating a new instance with such a version is not possible. Already created instances will continue to operate.

## {heading(Updating)[id=trino_versions_update]}

Using current Cloud Trino versions provides access to the latest release features, as well as security fixes and patches aimed at improving service stability.

A Cloud Trino update is performed by creating a new service instance with the current version. Updating an existing service instance is not supported.

{note:info}
Fixes and improvements at the {var(cloud)} service infrastructure level are performed automatically in the background and do not depend on the Cloud Trino version.
{/note}

Update recommendations:

- If you have a workload, {linkto(../../instructions/management#trino_view)[text=check]} the parameters of your service instance and {linkto(../../instructions/create#trino_create)[text=create]} a new instance with the same parameters (settings, connections, credentials), but with a newer version. Switch the workload to it and {linkto(../../instructions/management#trino_delete)[text=delete]} the old service instance if you no longer need it.
- If you do not have a workload, {linkto(../../instructions/management#trino_view)[text=check]} the service instance parameters (settings, connections, credentials) and save them before {linkto(../../instructions/management#trino_delete)[text=deleting]} it. This method can be useful if you plan to use the new version but do not need to maintain a workload.
- After migrating to the new version, update the software used to connect to the Cloud Trino service instance, for example, [Trino CLI](https://trino.io/docs/current/client/cli.html).