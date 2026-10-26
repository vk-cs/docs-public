# {heading(User access session and user blocking)[id=tools-account-user-session]}

{include(/en/_includes/_translated_by_ai_en.md)}

{ifdef(private,private-pg,private-pdf,private-pg-pdf)}
- By default, there is no limit on the number of concurrent access sessions. Only an administrator can set a limit of one active access session per account.
{/ifdef}

{ifdef(private-cert)}
- Only one access session can be started per account at a time.
{/ifdef}

- After {ifndef(private-cert)}1 hour{/ifndef}{ifdef(private-cert)}5 minutes{/ifdef} of inactivity, the access session will be terminated. Please authenticate again.

- An account can be blocked if it has not been used for more than 45 days.

  {ifdef(private,private-pg,private-pdf,private-pg-pdf)}
  {note:warn}
  The {var(cloud)} administrator can change the default user inactivity period.
  {/note}
  {/ifdef}

  When logging into your management console with a blocked account, a `403` login error will appear on the screen.

  Blocking the project owner's account does not restrict the work of other users in the project. To unblock an account, contact the {var(cloud)} administrator.