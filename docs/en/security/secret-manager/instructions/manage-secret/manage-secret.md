# {heading(Secret management)[id=sm-manage-secret]}

{include(/en/_includes/_translated_by_ai_en.md)}

{note:info}

To gain access to the service, contact [technical support](/en/contacts).

{/note}

## {heading(Viewing the list of secrets)[id=sm-manage-list]}

{tabs}

{tab(Personal account)}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Go to the **Security services** → **Secret Manager** section. A page will open with the list of all secrets created in the project.

{/tab}

{/tabs}

## {heading(Creating a secret)[id=sm-manage-create]}

{tabs}

{tab(Personal account)}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Go to the **Security services** → **Secret Manager** section.
1. Click **Create**.
1. Fill in the **Name** field.
1. (Optional) Fill in the **Description** field.
1. Set the secret **Identifier** following the naming rules.

    - It can contain only digits, Latin letters, and the symbols `-`, `_`, `.` and ``/``.
    - It must be unique among all secrets in the project.

1. In the **Data configuration** block, specify one or more key/value pairs.

    - **Key** — a unique pair identifier, set manually.
    - **Value** — a string with sensitive data. Fill in the field manually or click **Generate** to configure automatic filling.

        - **Number of characters** — the length of the data string.
        - **Character usage** — which characters the sequence is generated from. Several types can be selected:

            - `Uppercase Latin letters (A-Z)`,
            - `Lowercase Latin letters (a-z)`,
            - `Digits from 0 to 9`,
            - `Special characters`.
            
                The following special characters are supported: `!`, `"`, `#`, `$`, `%`, `&`,`'`, `(`, `)`, `*`, `+`, `,`, `-`, `.`,`/`,`:`, `;`, `<`, `=`, `>`, `?`, `@`, `[`,`\`, `]`, `^`, `_`, `` ` ``, `{`,`|`, `}`, `~`.

        After configuring the parameters, click **Generate**. The **Value** field will display a random set of characters generated automatically without user intervention.

    If you need to add several key/value pairs, click **Add key**.

1. If necessary, disable the **Deletion protection** option. It is enabled by default.
1. Click **Create**.

{/tab}

{/tabs}

## {heading(Viewing secret information)[id=sm-manage-view]}

{tabs}

{tab(Personal account)}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Go to the **Security services** → **Secret Manager** section.
1. In the list of secrets, click the name of the desired secret. The secret card will open on the **General information** tab.

{/tab}

{/tabs}

## {heading(Editing secret parameters)[id=sm-manage-edit]}

Only the secret parameters can be edited. To update the secret content, {linkto(../versions#sm-versions-create)[text=create]} a new version.

{tabs}

{tab(Personal account)}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Go to the **Security services** → **Secret Manager** section.
1. Open the editing window in one of the following ways.

    - From the list of secrets:

        1. In the list of secrets, click ![ ](../../../../assets/more-icon.svg "inline") for the desired secret.
        1. Select **Edit**.

    - On the secret page:

        1. In the list of secrets, click the name of the desired secret.
        1. On the secret page, click **Edit**.

1. Make the necessary changes.
1. Click **Save**.

{/tab}

{/tabs}

## {heading(Deleting a secret)[id=sm-manage-delete]}

{note:warn}
Before deleting a secret, {linkto(#sm-manage-edit)[text=remove]} the deletion protection.
{/note}

{tabs}

{tab(Personal account)}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Go to the **Security services** → **Secret Manager** section.
1. Delete the secret in one of the following ways.

    - From the list of secrets:

        1. In the list of secrets, click ![ ](../../../../assets/more-icon.svg "inline") for the desired secret.
        1. Select **Delete** and confirm the action.

    - On the secret page:

        1. In the list of secrets, click the name of the desired secret.
        1. On the secret page, click ![ ](../../../../assets/more-icon.svg "inline").
        1. Select **Delete** and confirm the action.

{/tab}

{/tabs}