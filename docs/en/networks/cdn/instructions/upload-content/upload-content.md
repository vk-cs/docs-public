# {heading(Uploading content to CDN)[id=cdn-upload-content]}

{include(/en/_includes/_translated_by_ai_en.md)}

Content can be uploaded to the CDN resource cache in advance, before consumers request it, to [reduce the load](../../concepts/about) on origin servers.

To upload content to the CDN:

{tabs}

{tab(Management console)}

1. [Navigate](https://msk.cloud.vk.ru/app/) to the {var(cloud)} management console.
1. Select the project.
1. Go to the **CDN** → **CDN resources** section.
1. Upload the content using one of the following methods:

   {tabs}
   
   {tab(CDN resource context menu)}
      
     1. Click ![ ](../../../../assets/more-icon.svg "inline") for the desired CDN resource and select **Upload to CDN**.
     1. In the window that opens, specify the paths to the files that need to be uploaded to the CDN. The path must not contain information about the origin server: an IP address or a domain name. Each path must be on a new line.
     1. Click the **Fill cache** button.

   {/tab}
   
   {tab(CDN resource page)}
   
     1. Click the CDN resource name and go to the **Content** tab.
     1. In the **Cache preloading** block, specify the values of the **File paths without domain** parameter: paths to the files that need to be uploaded to the CDN. The path must not contain information about the origin server: an IP address or a domain name. Each path must be on a new line.
     1. Click the **Fill cache** button.

   {/tab}
   
   {/tabs}

{/tab}

{/tabs}