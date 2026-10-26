# {heading(SDK file upload does not work)[id=s3-install-boto-problem]}

{include(/en/_includes/_translated_by_ai_en.md)}

File upload using the Python SDK does not work.

The issue may be caused by incompatibility with the current version of the boto3 library.

### {heading(Solution)[id=s3-install-boto-problem-resolve]}

Install an older version of the boto3 library, for example 1.35.77.