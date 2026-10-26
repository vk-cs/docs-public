# {heading(Client registration)[id=partner-platform-accept-invitation]}

{include(/en/_includes/_translated_by_ai_en.md)}

A partner's client joins {var(cloud)} via an {linkto(../invite-client#partner-platform-invite-client)[text=invitation]} that is sent to their email.

The invitation email arrives with the subject **You are invited to join a partner project in {var(cloud)}**.

If the invitation is not in your **Inbox**, check the **Spam** folder.

## {heading(Accepting the invitation)[id=partner-platform-accept]}

The sign-in procedure depends on whether a {var(cloud)} account is registered for your email.

{tabs}

{tab(Account is not registered)}

1. Follow the **Accept invitation** link in the email.
1. In the window that opens, set a new password and click **Register**.

   The minimum password length is 8 characters. The password must contain:

   - uppercase and lowercase Latin letters;
   - at least one digit or one of the special characters `?`, `!`, `~`, `@`, `#`, `$`, `%`, `^`, `&`, `_`, `-`, `+`, `*`, `=`, `;`, `:`, `,`, `.`, `/`, `\`, `|`, `` ` ``, `[`, `]`, `{`, `}`, `(`, `)`.

   The password must not contain repeating groups of characters — for example, `aaa123123123`.

{note:info}
If, after signing in to {var(cloud)}, the **Enable two-factor authentication** page opens, {linkto(../../../../access/iam/instructions/manage-2fa#iam-manage-2fa-on)[text=configure]} this option to gain access to your management console.
{/note}

{/tab}

{tab(Account is registered)}

1. Follow the **Accept invitation** link in the email.
1. In the project invitation window that opens, click **Accept**.
1. In the authorization window, enter as the login the address to which the invitation was sent, along with your current {var(cloud)} password.

{note:warn}
If you accept a partner's invitation on an existing account, all your projects will be transferred to the {var(cloud)} partner. Payment will be processed only through the partner.
{/note}

{/tab}

{/tabs}

## {heading(What's next?)[id=partner-platform-accept-whats-next]}

After signing in, you will be taken to a project automatically created for you with the project owner {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference)[text=role]}.

{linkto(../../concepts/client-account#partner-platform-client-account)[text=Explore]} the features of the partner client's management console.

[Explore](../../../../start/support) the information about technical support for {var(cloud)} services.