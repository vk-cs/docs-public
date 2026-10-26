{includetag(edit_info)}
{ifdef(public)}
## {heading(Editing the user profile)[id=account-manage-editinfo-profile]}

1. [Go to](https://cloud.vk.ru/account) your {var(cloud)} account.
1. Go to the **Personal information** section.
   {/ifdef}

   {ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]} the {var(cloud)} management console.
1. Click the username in the page header and select **Account settings**.
1. On the **User profile** tab, review the information.
   {/ifdef}

1. {ifdef(public)}Fill in the fields{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}Change the following data{/ifdef}:

   - **First and last name**{ifdef(public)}: enter your first and last name{/ifdef};
   - **Company**{ifdef(public)}: specify the name of the company you work at{/ifdef};
   - **Position**{ifdef(public)}: specify your position{/ifdef}.

   {note:info}
   To change your phone number {ifdef(public)}or email, {linkto(../../../../../intro/onboarding/contact_support#onboarding-contact-support)[text=contact technical support]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}, email address, or password, contact your {var(cloud)} administrator{/ifdef}.
   {/note}

1. Click **Save changes**.

{ifdef(public)}
## {heading(Changing the password)[id=account-manage-editinfo-password]}

1. [Go to](https://cloud.vk.ru/account) your {var(cloud)} account.
1. Go to the **Security** section.
1. Click the ![pencil-icon](../../../../../assets/pencil-icon.svg "inline") icon to edit the password.
1. Fill in the fields:

   - **Old password**: enter your current account password;
   - **New password**: set a new password for the account;
   - **Repeat password**: enter the new password again.

1. Click **Save**.
   {/ifdef}

{/includetag}
