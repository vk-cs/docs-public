# {heading(Configure SSL certificates)[id=desktops-ssl-certificates]}

{include(/en/_includes/_translated_by_ai_en.md)}

An SSL certificate is required for users to connect to remote desktops via a browser using a secure protocol. {ifdef(public)}When the Cloud Desktop service is deployed, the following are automatically installed on its infrastructure:

- A basic SSL certificate — a self-signed certificate issued by {var(cloud)}.
- An SSL certificate signed by the public certificate authority [Let's Encrypt](https://letsencrypt.org). This certificate is used by default.{/ifdef}

{ifdef(private,private-pg,private-pdf,private-pg-pdf)}When {var(cloud)} is deployed, a basic SSL certificate — a self-signed certificate issued by {var(cloud)} — is automatically installed on the Cloud Desktop infrastructure.{/ifdef}

In addition, you can connect your own SSL certificate at any time.

If additional chains of trust or root SSL certificates are required to access your company's internal services from a remote desktop, they must be {linkto(#desktops-add-chains-of-trust)[text=uploaded]} to Cloud Desktop.

## {heading(Connect your own SSL certificate)[id=desktops-own-certificate]}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifdef} the {var(cloud)} management console.
1. Go to the **Cloud Desktop** → **Service settings** section.
1. On the **Certificates** tab, click the **Change certificate** or **Add certificate** button. The certificate adding window will open.
1. Leave the **Use a public certificate authority for signing** option disabled.
1. Copy your certificate data and your private key into the corresponding fields and click the **Change** or **Add** button.

{ifdef(public)}

## {heading(Connect the Let's Encrypt SSL certificate)[id=desktops-public-certificate]}

If you have changed the default certificate, to return to using the Let's Encrypt certificate:

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to the **Cloud Desktop** → **Service settings** section.
1. On the **Certificates** tab, click the **Change certificate** button.
1. Enable the **Use a public certificate authority for signing** option and click the **Change** button.
{/ifdef}

## {heading(Connect the basic SSL certificate)[id=desktops-vkcloud-certificate]}

To use the basic SSL certificate from {var(cloud)}, delete the currently connected certificate{ifdef(public)}, yours or the Let's Encrypt one{/ifdef}:

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifdef} the {var(cloud)} management console.
1. Go to the **Cloud Desktop** → **Service settings** section.
1. Click ![ ](../../../../../assets/more-icon.svg "inline") in the **Certificate** block and select the **Delete** option.
1. Confirm the deletion.

   Deleting the current SSL certificate takes a few minutes. After that, the basic SSL certificate will be connected.

   {note:warn}
   It is not possible to add a new certificate until the previous one has been deleted.
   {/note}

## {heading(Upload additional chains of trust or root certificates)[id=desktops-add-chains-of-trust]}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifdef} the {var(cloud)} management console.
1. Go to the **Cloud Desktop** → **Service settings** section.
1. On the **Certificates** tab, click the **Add chain** button. The window for adding a new chain of trust will open.
1. Copy the chain of trust data into the corresponding field and click the **Add** button.
1. Repeat these steps if you need to upload additional chains of trust.