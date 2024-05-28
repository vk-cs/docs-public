CDN servers support data transfer over HTTP/2 by default. The current versions of most browsers are compatible with this protocol.

<info>

To utilize CDN over HTTP/2, configure SSL certificates for your CDN resource, as browsers make requests over HTTPS when operating with HTTP/2.

</info>

When a browser requests content via HTTP/2, both CDN servers and HTTP/2-supporting origin servers will deliver the content using this protocol. If the origin servers do not support HTTP/2, they will deliver the content using a supported protocol (for example, HTTP/1.1). The browser will combine all the received content into a single page, even if it was obtained through different protocols.

If a browser does not support HTTP/2, CDN servers or origin servers deliver content using a supported protocol (for example, HTTP/1.1).
