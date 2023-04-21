## Enable 2FA

<a name="2faon"></a>

In [personal account](https://mcs.mail.ru/app/account/profile) for enhanced account security, it is possible to enable two-factor authentication.

Two-factor authentication, also known as two-step verification (DFA or 2FA), is a type of multi-factor authentication. DFA is a technology that provides user identification through a combination of two different components. The components can be different, but the following combinations are most often used:

- password + code from SMS
- password + code from the token (or application)
- password + code from email message

VK Cloud services use a password + code combination from the application. Installation information and links to download applications for generating one-time codes are below:

- [Google Authenticator](https://support.google.com/accounts/answer/1066447)
- [Duo](https://duo.com/product/trusted-users/two-factor-authentication/duo-mobile)

Enabling two-factor authentication is available in [account settings](https://mcs.mail.ru/app/account/profile) on the "Security" tab by clicking the "Enable protection" button:

To successfully activate the function, you must:

- Download the Google Authenticator mobile app ([Android](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2) and [iOS](https://apps.apple.com/ru/app/google-authenticator/id388497605)) or Duo ([Android](https://play.google.com/store/apps/details?id=com.duosecurity.duomobile&hl=en) and [iOS](https://itunes.apple.com/us/app/duo-mobile/id422663827?mt=8))
- Open the app and add a new account
- Scan the QR code from your personal account in the application
- Enter the confirmation code generated by the application and the password from the VK Cloud account in your VK Cloud account
- Confirm the entry with the "Enable" button.

<info>

If you cannot read the QR code, you can enter the application connection code manually by clicking on the appropriate link under the QR code in the window.

As a confirmation of adding the 2FA key in the next step, the window will display backup access codes.

</info>

<warn>

Keep your backup codes in a safe place.

If the backup codes are lost and there is no access to the mailbox to which the account is registered, it will be impossible to restore access to the VK Cloud account.

</warn>

## Using 2FA

Logging into an account with 2FA enabled is carried out by the following steps

- Go to the [VK Cloud] website (https://mcs.mail.ru) and click the "Login" button;
- Enter the username and password of the account;
- Enter a one-time 6-digit code generated by the mobile application and confirm the entry with the "Login" button.

<info>

A one-time code is valid for ~30 seconds from the moment it was generated.

There is no limit to the number of login attempts, but if after a certain number of attempts you still cannot log in, you should use one of the unused backup codes to access your account, then disable 2FA and re-enable it.

</info>

## Disable 2FA

Disabling 2FA is done in the account settings menu on the "Security" tab. To disable the function, enter the password for the current VK Cloud account and the code from the application, confirm your entry with the "Disable" button.

## Password and Security

You can change the password specified during registration in the "Account Settings" -> "Security" section. Click "Change Password", then enter your current password, then enter your new password twice to confirm the change.

## Password managers

For the convenience of storing and using a large number of account passwords, backup codes and other confidential information in a virtual storage protected by a master password, locked using the [PBKDF2] standard (https://ru.wikipedia.org/wiki/PBKDF2 "PBKDF2") , you can use third-party software, for example:

- [Lastpass](https://www.lastpass.com/)
- [1password](https://1password.com/)

The password database can be stored locally or synchronized between other trusted devices.

## Accessing API

### Activate API access

Public API access is used to work through the OpenStack CLI or develop your own applications based on the cloud platform.

To activate API access:

1. [Enable](#2faon) two-factor authentication.
1. Click on the user login in the upper right corner of VK Cloud [personal account](https://mcs.mail.ru/app/).
1. In the drop-down menu, select the option **Account Settings**.
1. Click on the **Security** tab.
1. In the API access section, click **Activate API access**.

### Deactivate API access

1. [Enable](#2faon) two-factor authentication if it has been disabled.
1. Click on the user login in the upper right corner of VK Cloud [personal account](https://mcs.mail.ru/app/).
1. From the drop-down menu, select the option **Account Settings**.
1. Click on the **Security** tab.
1. In the API access section, click **Deactivate API access**.