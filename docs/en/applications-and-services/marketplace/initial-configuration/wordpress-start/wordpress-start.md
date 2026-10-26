# {heading(Installing and configuring the WordPress service)[id=marketplace-wordpress-start]}

{include(/en/_includes/_translated_by_ai_en.md)}

WordPress is a website content management system (CMS) offering extensive capabilities for creating websites of varying complexity, from a blog to an online store. WordPress includes tools that allow the user to add the desired functions to their website without resorting to programming.

After completing all the steps of this guide, you will:

1. Connect the WordPress service in your {var(cloud)} management console.
1. Perform the basic configuration of your website and upload the initial content to it.
1. Explore the capabilities of the service.

{note:info}
{var(cloud)} provides a domain name for your WordPress website. To move your website to a new domain, use the {linkto(../../../../applications-and-services/marketplace/initial-configuration/wordpress-domain#marketplace-wordpress-domain)[text=guide]}.
{/note}

## {heading(1. Connect the WordPress service)[id=marketplace-wordpress-start-connect]}

1. {linkto(../../../../intro/onboarding/account/create-account#onboarding-create-account)[text=Register]} in {var(cloud)}.
1. To have internet access to the WordPress service after it is deployed:

   1. {linkto(../../../../networks/vnet/instructions/net#vnet-net-add)[text=Create]} a network with internet access if one has not been created earlier.
   1. In the {linkto(../../../../networks/vnet/instructions/net#vnet-net-subnet-edit)[text=subnet settings]} where the VM with the deployed service will reside, disable the **Private DNS** option.

1. In your [management console of {var(cloud)}](https://msk.cloud.vk.ru/app), go to the **Application Store** section.
1. On the **WordPress** service card, click the **Details** button.
1. On the page with the service description, click the **Connect** button.
1. Enter the data on the **Server parameters** page.

   1. Specify how WordPress will be deployed:

      - `external` — with an external IP address and a name in the `*.xaas.msk.bizmrg.com` domain;
      - `internal` — accessible only via an internal IP address.

   1. Enable monitoring to automatically send metrics of the virtual machine running WordPress to the {linkto(../../../../monitoring-services/monitoring#monitoring)[text=Cloud Monitoring]} service. These metrics will be available in the **Monitoring** section of your management console.
   1. Specify the parameters of the virtual machine where the service instance will be deployed:

      - **Network**: select the network where the VM with the deployed service will reside. If the `external` type is specified for WordPress, select a network with internet access and a subnet for which the **Private DNS** option is disabled.
      - **Availability zone**: select the data center where the VM will run.
      - **Virtual machine type**: select a predefined {linkto(../../../../computing/iaas/concepts/vm/flavor#iaas-flavor)[text=VM configuration]}.

   1. Specify the parameters of the system disk and the data disk.

      - **Disk size**: specify the required VM disk size in gigabytes.
      - **Disk type**: select {linkto(../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-list)[text=one of the disk types]} — `HDD`, `SSD`, or `High-IOPS SSD`.

   1. Click the **Next step** button.
   1. Specify the WordPress initialization parameters.

      - **Site title**: specify the name for your website.
      - **WordPress administrator username**: set the website administrator login. Use only Latin letters, digits, spaces, and the special characters `-`, `_`, `.`, and `@`.
      - **WordPress administrator email**: specify the email address that will receive notifications and confirmation codes from WordPress.
      - **WordPress DB name**: specify the name of the WordPress database.
      - **WordPress DB username**: specify the user on whose behalf WordPress will access the database.

      {note:info}
      In the database, WordPress stores all the content you create on the website, as well as your website parameters and information about its users. The MySQL DBMS is used to manage the database.
      {/note}

   1. Enable S3 backup to create daily backup copies of WordPress data in the {var(cloud)} object storage. The storage is created automatically. The last 7 copies are retained.
   1. Click the **Next step** button.

1. Review the cost of the infrastructure for deploying the service and click the **Connect tariff** button.

   The cloud infrastructure deployment will begin, and the service properties page will open. The status of the process will also be displayed in the **Application Store** → **My services** section.

   After a successful deployment, messages will arrive at the email address registered in {var(cloud)}:

   - a notification with a link to the service instance in your {var(cloud)} management console;
   - an email with a one-time link.

1. Follow the one-time link from the email and save the data for accessing the service:

   - `wordpress_login_url` — a link to the WordPress dashboard;
   - `default_admin_user` and `default_admin_password` — the administrator login and password;
   - `wordpress_url` — a link to your WordPress website;
   - `default_db_name` and `default_db_password` — the login and password of the WordPress database user;
   - `keypair` — the private key for SSH connection.

   {note:info}
   If the access data is lost, {linkto(../../../../applications-and-services/marketplace/instructions/pr-instance-manage#marketplace-pr-instance-manage-update-access)[text=generate]} new ones.
   {/note}

1. In your browser, follow the link from `wordpress_login_url`.
1. Click **Log In** and sign in to WordPress using the administrator login and password received via the link from the email.

## {heading(2. Configure your website and upload the first content to it)[id=marketplace-wordpress-start-settings]}

1. Go to the **Settings** → **General** section and configure the time zone, date and time format, and website language.
1. Go to the **Plugins** → **Add New Plugin** section and install a plugin for protection against hacks, for example **Wordfence** or **Solid Security**.
1. Go to the **Settings** → **Permalinks** section and configure the URL structure. It is recommended to choose the **Post name** option so that the links are readable.
1. Go to the **Appearance** → **Themes** section and select a theme for your website.

   {note:info}
   WordPress provides free and paid themes, and also allows uploading your own ones.
   {/note}

2. (Optional) Go to the **Plugins** → **Add New Plugin** section and add additional features to your website, such as feedback forms, SEO optimization, or spam protection.

   {note:info}
   Useful plugins for WordPress:

   - `Yoast SEO` for SEO optimization.
   - `Akismet` for spam protection.
   - `Elementor` or `Gutenberg` for creating and editing pages.
   {/note}

1. Add pages (in the **Pages** → **Add New Page** section) or posts (in the **Posts** → **Add New Post** section) to your website:

   - Posts are suitable for regularly adding new content to the website, for example for keeping a blog.
   - Pages are used for static content, such as a company description or contact information.

1. (Optional) Go to the **Media** → **Add New Media File** section and upload media content to your website: images, videos, or documents.

   Your WordPress website is ready to go. Open it using the link from `wordpress_url`.

## {heading(3. (Optional) Learn about the additional capabilities of WordPress)[id=marketplace-wordpress-start-opportunities]}

{cut(Modular approach to content editing)}

By default, WordPress uses the Gutenberg editor, which allows creating content in the form of blocks. Blocks are separate content elements, such as text, images, videos, headings, etc. Blocks can be added to a page as a separate module, moved, and configured.

The main types of blocks:

- `Paragraph` — for adding text.
- `Image` — for inserting pictures.
- `Heading` — for structuring text using headings of different levels.
- `Gallery` — for adding several images.
- `Video` — for inserting a video from the library or via a YouTube link.
- `Buttons` — for creating buttons.

With the Gutenberg editor, you can quickly create pages and posts without using HTML or PHP.

{/cut}

{cut(Creating menus and submenus)}

Menus and submenus are used to improve content organization and website navigation.

To create a menu:

1. Go to the **Appearance** → **Menus** section.
1. Create a new menu by adding links to pages, posts, categories, or external links.
1. Specify where the menu should be displayed on the website, for example in the header or footer.

{note:info}
The ability to use menus depends on the theme selected for the website.
{/note}

{/cut}

{cut(Adding categories and tags to the website)}

Categories and tags help organize content, especially on websites with regularly added new posts, such as blogs.

- Categories are suitable for coarse sorting of posts. For example, for a cooking blog, you can create categories `Breakfasts`, `Dinners`, `Desserts`.
- Tags are used to mark specific topics within each post. For example, for an oatmeal recipe, you can add tags `oatmeal`, `vegan`, `quick`.

You can add or edit categories and tags in the **Posts** → **Categories** and **Posts** → **Tags** sections.

{/cut}

{cut(Installing plugins)}

WordPress allows extending the functionality of your website by installing plugins.

Examples of plugins:

- `Elementor` — a visual page builder. It allows creating pages via drag-and-drop using ready-made blocks and templates.
- `Contact Form 7` — a simple plugin for creating contact forms. It makes it easy to add a feedback form to the website.
- `WP Super Cache` — a plugin for improving website performance by caching pages, which speeds up their loading.
- `UpdraftPlus` — a plugin for automatic website backups that helps ensure data safety in case of failures.
- `WooCommerce` — if you plan to create an online store, this plugin adds all the necessary functions for sales: a cart, product pages, payment and shipping methods.

New plugins can be installed in the **Plugins** → **Add New Plugin** section.

{/cut}

{cut(Managing website user roles and access rights)}

WordPress supports roles with different access levels for website users:

- `Administrator` has full control over the website.
- `Editor` can manage all posts, pages, comments, and media files.
- `Author` can create and publish their own posts.
- `Contributor` can create post drafts but cannot publish them.
- `Subscriber` can only read content and leave comments.

These roles can be configured in the **Users** → **All users** section.

If you need more control over access rights, use the `User Role Editor` plugin. It can be installed in the **Plugins** → **Add New Plugin** section.

{/cut}

{cut(Adding widgets to the website)}

Widgets are small modules that you can add to the sidebars or footer of your website. They are designed to display various elements: recent posts, a search bar, a list of categories, popular posts.

Widgets can be added in the **Appearance** → **Widgets** section.

{note:info}
The ability to use widgets depends on the theme selected for the website.
{/note}

{/cut}

{cut(SEO optimization)}

To improve the visibility of your website in search engines, you can use the `Yoast SEO` plugin. It allows you to:

- Optimize the website pages and posts for search engines using keywords.
- Generate XML sitemaps for search engines.
- Configure meta tags (titles, descriptions) for each page.

The plugin can be installed in the **Plugins** → **Add New Plugin** section.

{/cut}

{cut(Creating media libraries and galleries)}

In the **Media** → **Add New Media File** section, you can upload images, videos, and audio. WordPress allows you to:

- Create folders in the library of uploaded media files using additional plugins.
- Resize images directly in WordPress.
- Use the `Gallery` block to create photo albums on the website pages.

{/cut}

{cut(Comment support)}

WordPress supports a comment system. In the **General** → **Discussion** section, you can:

- Specify who can leave comments, for example only registered users.
- Enable comment moderation before their publication.

You can also enable spam protection using the `Akismet` plugin.

{/cut}

{cut(Multilingual support)}

For creating a website that supports multiple languages, WordPress offers specialized plugins:

- `Polylang` — a free plugin that allows translating pages, posts, categories, and tags.
- `WPML` — a paid plugin for creating multilingual websites with more extensive capabilities.

{/cut}

{cut(Configuring website backups)}

WordPress supports the `UpdraftPlus` plugin, which allows automatically saving website backup copies to Google Drive, Dropbox, or other cloud services.

{/cut}

## {heading(Deleting unused resources)[id=marketplace-wordpress-start-delete]}

The WordPress service creates infrastructure that consumes computing resources. If you no longer need the service, {linkto(../../../../applications-and-services/marketplace/instructions/pr-instance-manage#marketplace-pr-instance-manage-delete)[text=delete]} the service instance. Its infrastructure will also be deleted.