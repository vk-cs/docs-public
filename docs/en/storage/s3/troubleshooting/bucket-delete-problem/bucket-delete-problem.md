# {heading(Cannot delete a bucket)[id=s3-bucket-delete-problem]}

{include(/en/_includes/_translated_by_ai_en.md)}

A bucket cannot be deleted via the management console or AWS CLI.

This problem may occur if the bucket contains objects.

{ifdef(public)}

{note:warn}
A bucket with the `Backup` storage class cannot be deleted, but objects stored in the bucket can be {linkto(../../../backups/instructions/manage-backup-copy#backup-copy-delete)[text=deleted via the Cloud Backup service]}.
{/note}

{/ifdef}

### {heading(Solution)[id=s3-bucket-delete-problem-resolve]}

1. {linkto(../../instructions/objects/object-lock#s3-instructions-object-lock)[text=Make sure]} that the object deletion lock is disabled.
1. {linkto(../../instructions/objects/manage-object#s3-instructions-manage-object-delete)[text=Delete all objects]} from the bucket.
1. {linkto(../../instructions/objects/manage-object#s3-instructions-manage-object-parts-delete)[text=Delete incomplete multipart uploads]} from the bucket, if any.
1. {linkto(../../instructions/buckets/manage-bucket#s3-instructions-manage-bucket-delete)[text=Delete]} the bucket.