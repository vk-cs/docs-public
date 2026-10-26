# {heading(Error when integrating with {var(s3)})[id=s3-error-tier-is-alredy-in-use]}

{include(/en/_includes/_translated_by_ai_en.md)}

When integrating with {var(s3)} storage, MinIO displays the message `Tier is already in use`.

This means that a configuration for the remote S3 storage (remote tier) already exists.

### {heading(Solution)[id=s3-error-tier-is-alredy-in-use-resolve]}

Delete the existing configuration in MinIO before creating a new one.