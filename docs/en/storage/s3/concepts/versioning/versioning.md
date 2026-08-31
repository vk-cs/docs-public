Versioning (version control) is a mechanism that lets a bucket store the history of an object's changes as a set of its versions. Versioning is enabled at the bucket level and applies to all objects inside it.

In buckets with versioning enabled, the {var(s3)} service works as follows:

- If you try to overwrite an object, a new version of the object appears in the bucket, but the previous version is not deleted.
- If {var(s3)} receives several requests to write the same object at the same time, it stores all the received versions of the object in the bucket.
- If you try to delete an object from the bucket, {var(s3)} adds a [delete marker](#delete-marker) to the bucket and makes it the current version of the object. Previous versions remain in the bucket but are unavailable via a `GET` request to the object.

As a result, no changes to objects in the bucket are lost. This simplifies recovering data that was deleted or damaged due to unintended user actions or application errors.

## Bucket versioning statuses

- Unversioned.

  New buckets created without enabling versioning, as well as buckets created before versioning was implemented in {var(s3)}, have no versioning status. For all objects in these buckets, the [version ID](#version-id) is `null`.

- Versioning-enabled.

  Versioning is enabled either when the bucket is created or afterwards, in the control panel or via the AWS CLI. Enabling versioning does not change existing objects in the bucket — they keep the `null` version ID. After it's enabled, every new object uploaded to the bucket, or every new version of an existing object, gets a unique version ID.

  Once you enable versioning, you cannot disable it — you can only suspend it.

- Versioning-suspended.

  Suspending versioning stops the creation of new object versions. While versioning is suspended:

  - Existing object versions in the bucket are not changed.
  - New objects or new versions of existing objects uploaded to the bucket get the `null` version ID.
  - If the bucket already has an object version with the `null` ID and you upload an object with the same key, it overwrites the existing `null` version.

## {heading(Version ID)[id=version-id]}

A version ID is a string of characters that {var(s3)} automatically generates when an object is uploaded to a bucket.

If versioning is enabled for a bucket, objects get a unique version ID on upload. If versioning is not enabled or is suspended, uploaded objects get the `null` version ID.

You can use a version ID in a URL, since it contains only [unreserved characters](https://www.ietf.org/rfc/rfc3986.txt): Latin letters, digits, and the `-`, `.`, `_`, `~` characters.

## {heading(Delete marker)[id=delete-marker]}

A delete marker is a special version of an object that {var(s3)} adds to a versioning-enabled bucket when you delete an object from it. Like any other object, a delete marker has a [key](/ru/storage/s3/concepts/about#s3-concepts-about-object-key "change-lang") and a version ID, but no content. The key of the object you delete becomes the key of the delete marker, and the delete marker itself becomes the current version of the object. The other versions of the object are not changed.

Although the object technically remains in the bucket, {var(s3)} treats it as deleted. For example, a `GET` request to the object returns a `404 (Not Found)` error.

A delete marker does not disappear from a versioning-enabled bucket even if the deleted object is later overwritten, so an object can have several delete markers in its version history.

You can delete a delete marker from an object's version history with a `DELETE` request that specifies the version ID of that delete marker.

Creating a delete marker does not depend on [object lock](/en/storage/s3/concepts/objects-lock): a marker is added even if the current version of the object is protected, because the protected version itself is not deleted or changed.

## How versioning affects object operations

### Adding an object

The result of adding an object to a bucket depends on the bucket's versioning status:

- Versioning enabled: a new version of the object is created, differing from the previous one by its version ID and a later creation time.
- Versioning suspended: a new version of the object is created with the `null` version ID. If a version with the `null` ID already exists, it is overwritten.
- No versioning: the new object gets the `null` version ID. If the object already exists in the bucket, it is overwritten.

### Deleting an object or its version

The result of deletion depends on the bucket's versioning status and whether a version ID is specified in the delete request.

Versioning enabled:

- No version ID specified: a [delete marker](#delete-marker) is created and becomes the current version of the object. Existing versions are not changed. This happens even if [object lock](/en/storage/s3/concepts/objects-lock) is set on the current version of the object, since the version itself is not actually deleted.
- Version ID specified and [object lock](/en/storage/s3/concepts/objects-lock) disabled: the object version or delete marker with the specified ID is deleted. If it is the only version, deleting it permanently removes the object from the bucket.
- Version ID specified and [object lock](/en/storage/s3/concepts/objects-lock) enabled: the object cannot be deleted until the [retention period](/en/storage/s3/concepts/objects-lock#temporary_lock) expires or the [legal hold](/en/storage/s3/concepts/objects-lock#legal-hold-lock) is removed.

  Users with `WRITE` [permissions](/ru/storage/s3/concepts/access/s3-acl#permissions "change-lang") can [bypass](/ru/storage/s3/instructions/objects/object-lock#s3-instructions-object-lock-bypass-governance-retention "change-lang") the retention period in [managed mode](/en/storage/s3/concepts/objects-lock#governance-lock) (`GOVERNANCE`).

Versioning suspended:

- No version ID specified: the object version with the `null` ID, if it exists, is deleted, and a [delete marker](#delete-marker) is created and becomes the current version of the object.
- Version ID specified: the object version or delete marker with the specified ID is deleted. If it is the only version, deleting it permanently removes the object from the bucket.

No versioning:

- No version ID specified: the object is permanently deleted from the bucket.
- Version ID specified: a `204` response is returned, since no such object version exists.
