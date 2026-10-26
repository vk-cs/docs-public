# {heading(About the service)[id=sm-about]}

{include(/en/_includes/_translated_by_ai_en.md)}

{note:info}

To get access to the service, contact [technical support](/en/contacts).

{/note}

Secret Manager is a service for centralized storage of {linkto(#sm-about-secrets)[text=secrets]} in a secure and isolated {var(cloud)} environment.

Secret Manager allows you to manage secrets in applications and services with a large amount of sensitive data and high requirements for protecting it from unauthorized access.

## {heading(Secrets)[id=sm-about-secrets]}

A *secret* is one or more key/value pairs, where the *key* is a unique pair identifier and its *value* is sensitive data stored in the secret.

Data for the value can be:

- Generated — contain a sequence of characters that is generated automatically. The user sets its length and defines the required set of characters (letters, digits, special characters). This data type is suitable, for example, for storing passwords or tokens in services where frequent rotation is required.
- User-defined — contain a user-specified sequence of characters. This type is suitable for storing data generated in other systems or for storing your own data. For example, a code word invented by the user.

All secrets are automatically encrypted using the AES-GCM-256 algorithm.

## {heading(Versions)[id=sm-about-versions]}

Secret Manager allows you to store multiple versions of the same secret.

Each time a secret is updated, a new version is created and marked as current. The previous version remains in Secret Manager. Previous versions cannot be modified, but their content can be viewed through the {var(cloud)} management console or the {linkto(../../../../tools-for-using-services/api/api-spec/sm-api#api-spec-sm)[text=API]}.

When accessing a secret, only its current version is available.