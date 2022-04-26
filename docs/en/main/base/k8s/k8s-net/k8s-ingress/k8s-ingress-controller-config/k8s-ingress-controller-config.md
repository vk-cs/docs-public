When creating a new Kubernetes cluster, there is already a pre-installed Ingress Controller.

After completing the steps to create a cluster in Virtual Networks → Load Balancers, a load balancer for the Ingress Controller is automatically created.
This possibility excludes a separate action to create a balancer for the cluster.

<info>
Certain parameters can only be configured with ConfigMap or only with annotations.
</info>

## Nginx Ingress Controller options

You can control various NGINX Ingress Controller options with ConfigMap or annotations. In the case of using ConfigMap, these parameters will be applied globally to all Ingress resources, in the case of annotations, only to the Ingress in which this annotation is used.

The following table shows the correspondence between available annotations and ConfigMap keys.

### Annotation matching

<table>
   <body>
      <tr>
         <td>Abstract</td>
         <td>ConfigMap Key</td>
         <td>Description</td>
         <td>Default value</td>
      </tr>
      <tr>
         <td>kubernetes.io/ingress.class</td>
         <td>N/A</td>
         <td>Specifies which Ingress controller should handle the Ingress resource. Set the nginx value so that the NGINX Ingress controller handles it.</td>
         <td>N/A</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/proxy-connect-timeout</td>
         <td>proxy-connect-timeout</td>
         <td>Sets the value of the proxy_connect_timeout directive.</td>
         <td>60s</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/proxy-read-timeout</td>
         <td>proxy-read-timeout</td>
         <td>Sets the value of the proxy_read_timeout directive.</td>
         <td>60s</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/client-max-body-size</td>
         <td>client-max-body-size</td>
         <td>Sets the value of the client_max_body_size directive.</td>
         <td>1m</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/proxy-buffering</td>
         <td>proxy-buffering</td>
         <td>Enables or disables buffering of responses from the proxy server.</td>
         <td>True</td>
      </tr>
      <tr>
      <td>nginx.ingress.kubernetes.io/proxy-buffers</td>
         <td>proxy-buffers</td>
         <td>Sets the value of the proxy_buffers directive.</td>
         <td>Depends on the platform.</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/proxy-buffer-size</td>
         <td>proxy-buffer-size</td>
         <td>Sets the value of the proxy_buffer_size directive</td>
         <td>Depends on the platform.</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/proxy-max-temp-file-size</td>
         <td>proxy-max-temp-file-size</td>
         <td>Sets the value of the proxy_max_temp_file_size directive.</td>
         <td>1024m</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/proxy-hide-headers</td>
         <td>proxy-hide-headers</td>
         <td>Sets the value of one or more proxy_hide_header directives. Example: "nginx.ingress.kubernetes.io/proxy-hide-headers": "header-a, header-b"</td>
         <td>N/A</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/proxy-pass-headers</td>
         <td>proxy-pass-headers</td>
         <td>Sets the value of one or more proxy_pass_header directives. Example: "nginx.ingress.kubernetes.io/proxy-pass-headers": "header-a, header-b"</td>
         <td>N/A</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>server-names-hash-bucket-size</td>
         <td>Sets the value of the server_names_hash_bucket_size directive.</td>
         <td>Depends on the size of the processor's cache line.</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>server-names-hash-max-size</td>
         <td>Sets the value of the server_names_hash_max_size directive.</td>
         <td>512</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>http2</td>
         <td>Enables HTTP / 2 on servers with SSL enabled.</td>
         <td>False</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/redirect-to-https</td>
         <td>redirect-to-https</td>
         <td>Sets a 301 redirect rule based on the value of http_x_forwarded_protoheader in the server block to force incoming traffic to go through HTTPS. Useful when terminating SSL in a load balancer before an Ingress controller - see 115</td>
         <td>False</td>
      </tr>
      <tr>
         <td>ingress.kubernetes.io/ssl-redirect</td>
         <td>ssl-redirect</td>
         <td>Sets an unconditional 301 redirect rule on all incoming HTTP traffic to force incoming traffic over HTTPS.</td>
         <td>True</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>log-format</td>
         <td>Sets custom logging format.</td>
         <td>See thetemplate file.</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/hsts</td>
         <td>hsts</td>
         <td>Enable HTTP Strong Transport Security (HSTS): The HSTS header is added to responses from backends. The preload directive is included in the header.</td>
         <td>False</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/hsts-max-age</td>
         <td>hsts-max-age</td>
         <td>Sets the value of the max-age directive of the HSTS header.</td>
         <td>2592000(1 month)</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/hsts-include-subdomains</td>
         <td>hsts-include-subdomains</td>
         <td>Adds the includeSubDomains directive to the HSTS header.</td>
         <td>False</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>ssl-protocols</td>
         <td>Sets the value of the ssl_protocols directive.</td>
         <td>TLSv1 TLSv1.1 TLSv1.2</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>ssl-prefer-server-ciphers</td>
         <td>Enables or disables the ssl_prefer_server_ciphers directive.</td>
         <td>False</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>ssl-ciphers</td>
         <td>Sets the value of the ssl_ciphers directive.</td>
         <td>HIGH:!aNULL:!MD5</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>ssl-dhparam-file</td>
         <td>Sets the contents of the dhparam. The controller will create the file and set the value of the ssl_dhparam directive with the path to the file.</td>
         <td>N/A</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>set-real-ip-from</td>
         <td>Sets the value of the set_real_ip_from directive.</td>
         <td>N/A</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>real-ip-header</td>
         <td>Sets the value of the real_ip_header directive.</td>
         <td>X-Real-IP</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>real-ip-recursive</td>
         <td>Enables or disables the real_ip_recursive directive.</td>
         <td>False</td>
      </tr>
      <tr>
      <td>nginx.ingress.kubernetes.io/server-tokens</td>
         <td>server-tokens</td>
         <td>Enables or disables server_tokensdirective. Additionally, with NGINX Plus, you can specify a custom string value, including an empty string value that disables the Server field.</td>
         <td>True</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>main-snippets</td>
         <td>Sets the custom fragment in the main context.</td>
         <td>N/A</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>http-snippets</td>
         <td>Sets a custom snippet in the http context.</td>
         <td>N/A</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/location-snippets</td>
         <td>location-snippets</td>
         <td>Sets a custom fragment in the location context.</td>
         <td>N/A</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/server-snippets</td>
         <td>server-snippets</td>
         <td>Sets a custom fragment in the server context.</td>
         <td>N/A</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/lb-method</td>
         <td>lb-method</td>
         <td>Sets the load balancing method. By default, "" defines the looping method.</td>
         <td>""</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/listen-ports</td>
         <td>N/A</td>
         <td>Configures the HTTP ports that NGINX will listen on.</td>
         <td>[80]</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/listen-ports-ssl</td>
         <td>N/A</td>
         <td>Configures the HTTPS ports that NGINX will listen on.</td>
         <td>[443]</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>worker-processes</td>
         <td>Sets the value of the worker_processes directive.</td>
         <td>auto</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>worker-rlimit-nofile</td>
         <td>Sets the value of the worker_rlimit_nofile directive.</td>
         <td>N/A</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>worker-connections</td>
         <td>Sets the value of the worker_connections directive.</td>
         <td>1024</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>worker-cpu-affinity</td>
         <td>Sets the value of the worker_cpu_affinity directive.</td>
         <td>N/A</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>worker-shutdown-timeout</td>
         <td>Sets the value of the worker_shutdown_timeout directive.</td>
         <td>N/A</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/keepalive</td>
         <td>keepalive</td>
         <td>Sets the value of the keepalive directive. Note that proxy_set_header Connection ""; is added to the generated configuration when the value of &gt; 0.</td>
         <td>0</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>proxy-protocol</td>
         <td>Enable PROXY protocol for incoming connections.</td>
         <td>False</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/rewrites</td>
         <td>N/A</td>
         <td>Configure URL rewriting.</td>
         <td>N/A</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/ssl-services</td>
         <td>N/A</td>
         <td>Enables HTTPS when connecting to service endpoints.</td>
         <td>N/A</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/websocket-services</td>
         <td>N/A</td>
         <td>Enables websockets for the server.</td>
         <td>N/A</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/max-fails</td>
         <td>max-fails</td>
         <td>Sets the value of the max_fails parameter of the server directive.</td>
         <td>1</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/fail-timeout</td>
         <td>fail-timeout</td>
         <td>Sets the value of the fail_timeout parameter of the server directive.</td>
         <td>10s</td>
      </tr>
   </tbody>
</table>

## Configuration with ConfigMaps

There are two options for using ConfigMap:
<tabs>
<tablist>
<tab>From your computer</tab>
<tab>Direct to Kubernetes</tab>
</tablist>
<tabpanel>

You should edit the nginx-config.yaml file, setting the necessary parameters.
Next, apply this file on the Kubernetes cluster:

```bash
kubectl apply -f nginx-config.yaml
```

After that, the NGINX Ingress Controller configuration will be changed.
If you need to update some settings, you need to edit the nginx-config.yaml file and run the following command again:

```bash
kubectl apply -f nginx-config.yaml
```

</tabpanel>
<tabpanel>

The Nginx-ingress deployed by Helm takes parameters from the ConfigMap located in the namespace in which it is deployed.
To get the namespace, run the command:

```bash
helm ls -A | grep nginx
```

```yaml
NAME NAMESPACE REVISION UPDATED STATUS CHART APP VERSION
ingress-nginx ingress-nginx 1 2021-12-07 10:03:02.541220976 +0000 UTC deployed ingress-nginx-3.36.0 0.49.0
```

To apply parameters to the Ingress Controller, you must add them to the ConfigMap in the appropriate namespace. To add or change parameters to Nginx Ingress Controller follow these steps:

1. Get a list of available ConfigMap:

```bash
kubectl -n ingress-nginx get configmap
```

```yaml
NAME DATA AGE
ingress-controller-leader-nginx 0 35d
ingress-nginx-controller 7 35d
kube-root-ca.crt 1 35d
```

Pay attention to `ingress-nginx-controller`.

2. Edit the `data` section. You can add or change the required parameters.

```bash
kubectl -n ingress-nginx edit cm ingress-nginx-controller
```

```yaml
data:
   ...
  proxy-buffer-size: "256k"
  proxy-buffers: "4 256k"
  proxy-connect-timeout: "1d"
  proxy-read-timeout: "1d"
```

You can see the full list of options [here](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/).

3. Save your changes.

</tabpanel>
</tabs>

## Configuration via annotations

If you need to customize settings for a specific Ingress, the easiest way is to use annotations. Values ​​used in annotations take precedence over ConfigMap.

For example, cafe-ingress-with-annotations.yaml:

```yaml
apiVersion: networking.k8s.io/v1
kind: IngressClass
metadata:
  name: nginx
spec:
  controller: k8s.io/ingress-nginx

---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: cafe-ingress-with-annotations
  annotations:
    nginx.ingress.kubernetes.io/proxy-connect-timeout: "30"
    nginx.ingress.kubernetes.io/proxy-read-timeout: "20"
    nginx.ingress.kubernetes.io/proxy-body-size: "4m"
spec:
  rules:
  host: cafe.example.com
    http:
      paths:
      - path: /tea
        backend:
          service:
            name: tea-svc
            port:
              number: 80
      - path: /coffee
        backend:
          service:
            name: coffee-svc
            port:
              number: 80
  ingressClassName: nginx
```
