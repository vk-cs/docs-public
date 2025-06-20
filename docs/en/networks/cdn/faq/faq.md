{cut(Where are the CDN points of presence?)}

{cut(The CDN points of presence in Russia)}

- Aksai
- Angarsk
- Voronezh
- Ekaterinburg
- Kazan
- Krasnodar
- Krasnoyarsk
- Moscow
- Nizhny Novgorod
- Novosibirsk
- Petrozavodsk
- Pskov
- Saint Petersburg
- Samara
- Khabarovsk
- Chelyabinsk

{/cut}

{cut(The CDN points of presence outside Russia)}

- Almaty
- Amsterdam
- Ashburn
- Ashgabat
- Bishkek
- Hong Kong
- Dushanbe
- Minsk
- Sao Paulo
- Singapore
- Sukhum
- Tashkent
- Frankfurt

{/cut}

{/cut}

{cut(Is it possible to enable WAF and DDoS protection?)}

Yes, it is. Contact [technical support](mailto:support@mcs.mail.ru) to make an application for connection.

{/cut}

{cut(Is it possible to protect content using Secure token?)}

Yes, it is. Contact [technical support](mailto:support@mcs.mail.ru) to make an application for enabling and setting up Secure token.

{/cut}

{cut(Can I use HTTP/2 protocol?)}

CDN servers have HTTP/2 enabled by default. If the origin servers do not support HTTP/2, they will deliver the content using a supported protocol (for example, HTTP/1.1). In this case, the browser combines all received content into a single page, even if it is received via different protocols. Read more about [HTTP/2 support](../concepts/http2-support).

{/cut}

{cut(Can I deal with CDN via API?)}

You can find endpoints for managing and monitoring CDN resources in the [API help](/ru/tools-for-using-services/api/api-cdn "change-lang") section.

{/cut}

{cut(Is it possible to add rewrite rules and provide access to raw logs?)}

Unfortunately, this option is not provided.

{/cut}

{cut(Can I get CDN statistics?)}

Read about getting statistics in the [Statistics] section(/en/networks/cdn/monitoring).

{/cut}

{cut(Why do I not have access to the CDN service?)}

Not all user roles have access to the CDN service. If you were invited to a project, check the access for your [role](/en/tools-for-using-services/account/concepts/rolesandpermissions).

If your role has permissions to work in the CDN service, but the service is unavailable, contact [technical support](mailto:support@mcs.mail.ru).

{/cut}