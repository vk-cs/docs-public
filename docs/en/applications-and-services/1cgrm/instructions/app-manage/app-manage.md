# {heading(Application management)[id=1cgrm-app-manage]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Viewing connected applications)[id=1cgrm-app-manage-view]}

{tabs}

{tab(Personal account)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to the **1C:Ready Workplace** → **Applications** section.

   A list of all connected 1C applications will be displayed.

{/tab}

{/tabs}

## {heading(Transition to the application)[id=1cgrm-app-manage-transition]}

{tabs}

{tab(Personal account)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to the **1C:Ready Workplace** → **Applications** section.

{include(/en/_includes/_1c_app.md)[tags=1c_app_transition]}

1. Authenticate in the 1C application. To do this, use the login and password of the 1C application administrator account created when [connecting the service](/en/applications-and-services/1cgrm/connect).
1. Share the link to the 1C application with the users who will work with it.

{/tab}

{/tabs}

## {heading(Freezing the application)[id=1cgrm-app-manage-freezing]}

{tabs}

{tab(Personal account)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to the **1C:Ready Workplace** → **Applications** section.
1. Click ![ ](../../../../assets/more-icon.svg "inline") for the desired application and select **Stop**.
1. Confirm the freezing and wait for the operation to complete.

{/tab}

{/tabs}

After the application is frozen in {var(cloud)}, the 1C application will be unavailable for use, but funds continue to be debited from the project's management console balance.

## {heading(Starting the application)[id=1cgrm-app-manage-running]}

{tabs}

{tab(Personal account)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to the **1C:Ready Workplace** → **Applications** section.
1. Click ![ ](../../../../assets/more-icon.svg "inline") for the desired application and select **Start**.
1. Confirm the start and wait for the operation to complete.

{/tab}

{/tabs}

After the application is started in {var(cloud)}, access to the 1C application will be restored for other users to work with.

## {heading(Deleting the application)[id=1cgrm-app-manage-deleting]}

{tabs}

{tab(Personal account)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to the **1C:Ready Workplace** → **Applications** section.
1. Click ![ ](../../../../assets/more-icon.svg "inline") for the desired application and select **Delete application**.
1. Confirm the deletion and wait for the operation to complete.

{/tab}

{/tabs}

After the application is deleted in {var(cloud)}, all its data will be deleted. A deleted application cannot be restored.

To obtain [data backups](/en/applications-and-services/1cgrm/concepts/about#1cgrm-backup), contact [technical support](/en/applications-and-services/1cgrm/concepts/about#1cgrm-support).

{note:err}
After the application is deleted in {var(cloud)}, backups of the 1C application data are stored for 30 days.
{/note}