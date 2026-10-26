# {heading(The x-amz-content-sha256 error when working with AWS CLI v2)[id=s3-error-x-amz-content-sha256]}

{include(/en/_includes/_translated_by_ai_en.md)}

When working with object storage, the message `x-amz-content-sha256 must be UNSIGNED-PAYLOAD` appears.

This may be caused by the use of AWS CLI version 2.

### {heading(Solution)[id=s3-error-x-amz-content-sha256-resolve]}

Add the `--no-sign-request` flag to your command or configure your AWS CLI profile to use signature version 2 (SigV2).