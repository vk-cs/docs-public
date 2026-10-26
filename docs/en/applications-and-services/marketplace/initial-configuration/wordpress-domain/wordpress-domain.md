# {heading(Changing the domain for the WordPress service)[id=marketplace-wordpress-domain]}

{include(/en/_includes/_translated_by_ai_en.md)}

This guide will help you change the domain and configure SSL certificates for your WordPress site. The following example is considered:

- The WordPress service is deployed on a server running AlmaLinux using the HTTPD (Apache) process and the SELinux mandatory access control system.
- This server is located in the `old-domain.com` domain and will be moved to the new domain `new-domain.com`, registered by you yourself.

## {heading(1. Change the domain name on the server)[id=marketplace-wordpress-domain-edit-name-on-server]}

1. Edit the Apache virtual host configuration:

   1. Open the Apache configuration file for your site. It is usually located in `/etc/httpd/conf.d/your-site.conf`.
   1. Find the `VirtualHost` block and replace the current domain name in it with the new one.

      Example of a block with the new domain name:

      ```apache
      <VirtualHost *:80>
          ServerName new-domain.com
          ServerAlias www.new-domain.com
          DocumentRoot /var/www/html
          <Directory "/var/www/html">
              AllowOverride All
              Require all granted
          </Directory>
      </VirtualHost>
      ```

1. If additional configuration files are used (for example, for subdomains), replace the domain name in them with the new one.
1. Restart Apache using the command:

   ```console
   sudo systemctl restart httpd
   ```

1. If you have SELinux enabled, configure it to work with the new domain:

   1. Restore the SELinux security context for the `/var/www/html/` folder so that Apache has access to the new configurations. To do this, run the command:

      ```console
      sudo restorecon -Rv /var/www/html/
      ```

   1. Allow the HTTPD daemon to establish external network connections and access user home directories. To do this, run the commands:

      ```console
      sudo setsebool -P httpd_can_network_connect 1
      sudo setsebool -P httpd_enable_homedirs 1
      ```

1. Configure the SSL certificate.

   1. Install the `Certbot` package for automatic obtaining of certificates from Let's Encrypt by running the command:

      ```console
      sudo dnf install certbot python3-certbot-apache
      ```

   1. Run `Certbot` and follow the instructions to automatically install the SSL certificate on the new domain:

      ```console
      sudo certbot --apache -d new-domain.com -d www.new-domain.com
      ```

   1. When `Certbot` offers HTTP to HTTPS redirection, enable this option. This will allow automatically redirecting users to a secure connection.
   1. After the SSL certificate is installed, enable its automatic verification and renewal by running the command:
  
      ```console
      sudo systemctl enable certbot-renew.timer
      ```

   1. Restart Apache using the command:

      ```console
      sudo systemctl restart httpd
      ```

      {note:info}
      From this moment on, use the address `http://new-domain.com/wp-admin` to access the WordPress dashboard.
      {/note}

## {heading(2. Change the domain name in the WordPress settings)[id=marketplace-wordpress-domain-edit-name-in-settings]}

1. Change the URLs in the WordPress settings:

   1. Navigate to `http://new-domain.com/wp-admin` in your browser.
   1. Log in to WordPress using the administrator username and password.
   1. Go to the **Settings** → **General** section.
   1. Replace the domain name with the new one in the **WordPress Address (URL)** and **Site Address (URL)** fields:

      ```txt
      https://new-domain.com
      ```

   1. Click the **Save Changes** button.

1. Replace all links to the old domain with new ones in the content and database settings by running the commands:

   ```console
   cd /var/www/html
   wp search-replace 'http://old-domain.com' 'https://new-domain.com' --allow-root
   ```

1. If you use a caching plugin, for example, **WP Super Cache** or **W3 Total Cache**, clear the entire cache via the plugin settings.
1. Regenerate the permanent URL structure on the site. To do this, go to the **Settings** → **Permalinks** section and click the **Save Changes** button.

   {note:info}
   From this moment on, use the address `http://new-domain.com` to access your WordPress site.
   {/note}

## {heading(3. Verify that the site works correctly)[id=marketplace-wordpress-domain-check-correct]}

1. Check the SSL certificate:

   1. Go to the site and make sure it opens via the HTTPS protocol without errors.
   1. Use online tools, such as [SSL Labs](https://www.ssllabs.com/ssltest), to verify the correctness of the SSL certificate.

1. Make sure that all requests to the old domain are correctly redirected to the new one. This can be done using the [Redirect Checker](https://www.redirect-checker.org) tool.
1. Check the site functionality:

   1. Browse the pages of the site and make sure that the links work correctly.
   1. Make sure that all media files are loaded via the new URL links.

## {heading(4. Strengthen the site security)[id=marketplace-wordpress-domain-increase-security]}

To improve security, configure HSTS — a mechanism that forcibly activates a secure connection via the HTTPS protocol. To do this, add the following lines to the Apache configuration:

```apache
<VirtualHost *:443>
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
</VirtualHost>
```

## {heading(5. Update the links to your site)[id=marketplace-wordpress-domain-update-links]}

1. If your site has already been indexed by search engines, submit a new XML sitemap to Google Search Console and Yandex Webmaster, specifying the new domain name in it.
1. If you actively maintain social media or other external resources, update the links to your domain in them.