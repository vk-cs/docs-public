<!-- Information about TLS connection -->

{includetag(connect-secure)}

{note:info}
The connection to the service instance is secured using a self-signed TLS certificate.
{/note}

{/includetag}

<!-- Browser warning -->

{includetag(browser-warning)}

{note:info}
When following the link in a browser, a warning will appear that the connection is not secure. This is because a self-signed TLS certificate cannot be verified by the browser. The connection is secure and encrypted.
{/note}

{/includetag}


<!-- Navigating to an insecure site in different browsers -->

{includetag(browsers-action)}

- Google Chrome: click **Advanced** → **Proceed to site**.
- Mozilla Firefox: click **Advanced** → **Accept the Risk and Continue**.
- Yandex Browser: click **Details** → **Make an exception for this site**.
- Safari: click **Details** → **visit this website**.

{/includetag}

<!-- Browser warning -->

{includetag(curl-insecure)}

{note:info}
The `--insecure` option allows ignoring the warning about the self-signed certificate. The connection remains encrypted and secure.
{/note}

{/includetag}
