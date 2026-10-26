# {heading(Secret version management)[id=sm-versions]}

{include(/en/_includes/_translated_by_ai_en.md)}

{note:info}

To get access to the service, contact [technical support](/en/contacts).

{/note}

## {heading(Creating a new secret version)[id=sm-versions-create]}

{tabs}

{tab(Management console)}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Go to the **Security services → Secrets Manager** section.
1. In the list of secrets, click the name of the desired secret.
1. Go to the **Version history** tab.
1. Click **Create version**.
1. Specify one or more key/value pairs for the new version:

    - **Key** — a unique identifier of the pair, set manually.
    - **Value** — a string containing sensitive data. Fill in the field manually or click **Generate** to configure automatic filling.

        - **Number of characters** — the length of the data string.
        - **Character usage** — which characters the sequence is generated from. Several types can be selected:

            - `Uppercase Latin letters (A-Z)`,
            - `Lowercase Latin letters (a-z)`,
            `Digits from 0 to 9`,
            - `Special characters`. The following special characters are supported: `!`, `"`, `#`, `$`, `%`, `&`,`'`, `(`, `)`, `*`, `+`, `,`, `-`, `.`,`/`,`:`, `;`, `<`, `=`, `>`, `?`, `@`, `[`,`\`, `]`, `^`, `_`, `` ` ``, `{`,`|`, `}`, `~`.

        After configuring the parameters, click **Generate**. The **Value** field will show a random set of characters generated automatically, without user intervention.

    If you need to add several key/value pairs, click **Add key**.

1. (Optional) Fill in the **Description** field.
1. Click **Create**.

{/tab}

{/tabs}

## {heading(Viewing secret versions)[id=sm-versions-view]}

{tabs}

{tab(Management console)}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Go to the **Security services → Secrets Manager** section.
1. In the list of secrets, click the name of the desired secret.
1. Go to the **Version history** tab.
1. Click the number of the desired version. A window with information about the version will open:

    - **Key** — a unique identifier of the pair.
    - **Value** — a string with sensitive data in masked form.

        To view the value, click the ![ ](../../../../assets/eye-icon.svg "inline") icon.

{/tab}

{/tabs}