{ifdef(private-cert)}
To access the {var(cloud)} management console, you need to go through two-factor authentication. {var(cloud)} uses the account password and a code sent by email for two-factor authentication.
{/ifdef}

1. Using any supported web browser, open the page at the address:

   {ifndef(private-cert)}
    ```console
    lk.<DOMAIN_NAME>
    ```
   {/ifndef}

   {ifdef(private-cert)}
    ```console
    LK<DOMAIN_NAME>
    ```
   {/ifdef}

   Here, `<DOMAIN_NAME>` is the domain name of your company where {var(cloud)} is deployed.

1. Enter your account login and password.

   {note:warn}
   To obtain credentials, contact your {var(cloud)} administrator.
   {/note}

   {ifdef(private-cert)}
1. Click the **Log in** button. An email with a code will be sent to the email address used as the login.
1. Enter the code from the email and click the **Log in** button.
   {/ifdef}

   {ifdef(private,private-pg,private-pdf,private-pg-pdf)}
1. Click the **Log in** button.

   If two-factor authentication was enabled when {var(cloud)} was deployed, an email with a code will be sent to the email address used as the login. Enter the code from the email and click the **Log in** button.

   {note:info}
   Two-factor authentication can be enabled or disabled by the administrator when deploying {var(cloud)}.
   {/note}

   {includetag(lk-entry)}
1. (Optional) In the header of the management console, {linkto(../project-settings/manage#tools-account-project-select)[text=select]} a project to continue working.
   {/ifdef}

When working with the {var(cloud)} management console, take into account the specifics of the {linkto(../../concepts/user-session#tools-account-user-session)[text=access session and user lockout]}.
{/includetag}
   {includetag(prerequisites-lk-entry)}
1. (Optional) In the header of the management console, {linkto(../../../tools-for-using-services/account/instructions/project-settings/manage#tools-account-project-select)[text=select]} a project to continue working.
   {/ifdef}

When working with the {var(cloud)} management console, take into account the specifics of the {linkto(../../../tools-for-using-services/account/concepts/user-session#tools-account-user-session)[text=access session and user lockout]}.
{/includetag}
