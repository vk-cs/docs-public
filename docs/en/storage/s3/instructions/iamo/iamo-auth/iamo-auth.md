# {heading(IAM Only management console login)[id=s3-instructions-iamo-auth]}

{include(/en/_includes/_translated_by_ai_en.md)}

To access your management console, you must pass authentication.

To use the management console:

1. Using any supported web browser, open the page at the address:

   ```console
   lk.<ДОМЕННОЕ_ИМЯ>
   ```

   Here `<ДОМЕННОЕ_ИМЯ>` is the domain name that was specified during service installation.

1. Enter the login and password of your account.

   {note:warn}
   To obtain credentials, contact the administrator.
   {/note}

1. Click the **Sign in** button.
1. In the header of the management console, select the project for further work.

When working with the management console:

- Only one access session can be running simultaneously for each account.
- After 1 hour of inactivity, the access session will be terminated. Pass authentication again.
- An account may be blocked if it has not been used for more than 45 days.

  {note:warn}
  45 days is the default period. The administrator can change it.
  {/note}

  When attempting to log in to the management console using a blocked account, a «403» error will appear.

  Blocking the account of the project owner does not restrict the work of other users in the project. To unblock the account, contact the administrator.