{include(/kz/_includes/_translated_by_ai.md)}
[cert-manager](https://cert-manager.io/) құралының көмегімен Kubernetes кластерлеріндегі сертификаттарды басқаруға болады:

- Сертификаттау орталығы (certificate authority, CA) рөлін атқаратын көздерге сұраулар жіберу арқылы сертификаттарды, соның ішінде өздігінен қол қойылған (self-signed) сертификаттарды шығару.

  Көздер мысалдары:

  - [Venafi](https://www.venafi.com/) сияқты киберқауіпсіздік шешімдерінің провайдерлері;
  - [Let’s Encrypt](https://letsencrypt.org/) сияқты сертификаттар провайдерлері;
  - [HashiCorp Vault](https://www.vaultproject.io/) сияқты құпиялар қоймалары;
  - ішінде сертификаттың ашық бөлігі мен жеке кілті бар жергілікті контейнерлер.

- Қолданылу мерзімі аяқталып жатқан сертификаттарды автоматты түрде қайта шығару.

`cert-manager` көмегімен шығарылған сертификат басқа Kubernetes ресурстарына қолжетімді болады. Мысалы, оны Ingress үшін пайдалануға болады.

Төменде [Helm 3](https://helm.sh/) көмегімен Kubernetes кластерлерінде `cert-manager` орнату және жаңарту қалай орындалатыны көрсетіледі. Сондай-ақ `cert-manager` жұмысқа қабілеттілігін тексеру үшін өздігінен қол қойылған сертификат шығарылады.

## Дайындық қадамдары

1. Егер сізде әлі Kubernetes кластеры болмаса, оны жасаңыз.

   {note:info}

   Уақытты үнемдеу үшін VK Cloud-та бірнеше минут ішінде [Kubernetes кластерін](../../../../kubernetes/k8s/instructions/create-cluster) жасай аласыз.

   {/note}

1. Кластер нұсқасын анықтаңыз.

1. Кластерге қосылу жоспарланған хостта, егер утилита әлі орнатылмаса, `kubectl` [орнатыңыз](https://kubernetes.io/docs/tasks/tools/#kubectl).

   Орнату үшін кластермен [үйлесімді](https://kubernetes.io/releases/version-skew-policy/#kubectl) `kubectl` нұсқасын таңдаңыз.

1. `kubectl` көмегімен кластерге қосыла алатыныңызға көз жеткізіңіз.

1. Кластерге қосылу жоспарланған хостта, егер утилита әлі орнатылмаса, 3.0.0 немесе одан жоғары нұсқадағы Helm-ді [орнатыңыз](https://helm.sh/docs/intro/install/).

   Орнату үшін кластермен [үйлесімді](https://helm.sh/docs/topics/version_skew/) Helm нұсқасын таңдаңыз.

## 1. Репозиторийді қосып, орнату үшін нұсқаны таңдаңыз

1. `cert-manager` репозиторийін қосыңыз:

   ```console
   helm repo add jetstack https://charts.jetstack.io
   ```

1. Чарттар кешін (charts) жаңартыңыз:

   ```console
   helm repo update
   ```

1. Қолжетімді `cert-manager` чарттары мен олардың нұсқаларының тізімін алыңыз:

   ```console
   helm search repo jetstack -l
   ```

1. Кластерге орнатылатын `cert-manager` нұсқасын таңдаңыз.

   `cert-manager` және Kubernetes нұсқаларының үйлесімділік кестесі [cert-manager ресми құжаттамасында](https://cert-manager.io/docs/installation/supported-releases/) берілген.

   {note:info}

   Төменде `1.12.3` нұсқасына дейінгі [жаңартуды](#5_cert_manager_zhanartynyz) қосымша көрсету үшін `1.11.3` нұсқасындағы `cert-manager` орнатылады.

   Сіз өзіңізге қолайлы кез келген нұсқаны таңдай аласыз. Төменде келтірілген пәрмендерді таңдалған нұсқаға сәйкес түзетіңіз.

   {/note}

## 2. cert-manager орнатыңыз

1. `cert-manager` жұмысына қажетті Custom Resource Definitions (CRDs) орнатыңыз.

   CRD-лер `kubectl` көмегімен қолмен орнатылады. Бұл әдіс ең қауіпсіз болғандықтан, оны [пайдалану ұсынылады](https://cert-manager.io/docs/installation/helm/#crd-considerations).

   Пәрменді орындаңыз:

   ```console
   kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.11.3/cert-manager.crds.yaml
   ```

1. Таңдалған `cert-manager` нұсқасын орнатыңыз.

   Бұл пәрмен көрсетілген нұсқадағы `cert-manager` атты релизді `cert-manager` аттар кеңістігіне (namespace) орнатады. Егер кластерде мұндай кеңістік болмаса, ол автоматты түрде жасалады.

   {tabs}

   {tab(Linux (bash) / macOS (zsh))}

   ```console
   helm install cert-manager jetstack/cert-manager \
     --version v1.11.3 \
     --namespace cert-manager \
     --create-namespace
   ```

   {/tab}

   {tab(Windows (PowerShell))}

   ```console
   helm install cert-manager jetstack/cert-manager `
     --version v1.11.3 `
     --namespace cert-manager `
     --create-namespace
   ```

   {/tab}

   {/tabs}

   Орнату сәтті аяқталса, Helm хабарламасында мыналар көрсетіледі:

   - `STATUS`: `deployed`;
   - `NOTES`: `cert-manager v1.11.3 has been deployed successfully!`.

   {cut(Команда шығысының мысалы)}

   ```text
   NAME: cert-manager
   LAST DEPLOYED: Thu Aug 17 15:06:35 2023
   NAMESPACE: cert-manager
   STATUS: deployed
   REVISION: 1
   TEST SUITE: None
   NOTES:
   cert-manager v1.11.3 has been deployed successfully!
   
   In order to begin issuing certificates, you will need to set up a ClusterIssuer
   or Issuer resource (for example, by creating a 'letsencrypt-staging' issuer).
   
   More information on the different types of issuers and how to configure them
   can be found in our documentation:
   
   https://cert-manager.io/docs/configuration/
   
   For information on how to configure cert-manager to automatically provision
   Certificates for Ingress resources, take a look at the `ingress-shim`
   documentation:
   
   https://cert-manager.io/docs/usage/ingress/
   ```

   {/cut}

## 3. cert-manager жұмысқа қабілеттілігін тексеріңіз

1. `cert-manager` аттар кеңістігінде қажетті подтардың сәтті жасалғанын және олардың `Running` күйінде тұрғанын тексеріңіз:

   ```console
   kubectl get pods -n cert-manager
   ```

   {cut(Команда шығысының мысалы)}

   ```text
   NAME                                       READY   STATUS    RESTARTS   AGE
   cert-manager-...                           1/1     Running   0          3m20s
   cert-manager-cainjector-...                1/1     Running   0          3m20s
   cert-manager-webhook-...                   1/1     Running   0          3m20s
   ```

   {/cut}

1. Тест мақсатында өздігінен қол қойылған сертификат шығарыңыз:

   1. Манифест файлын жасаңыз:

      {cut(cert-manager-test-resources.yaml)}

      ```yaml
      apiVersion: v1
      kind: Namespace
      metadata:
        name: cert-manager-test
      ---
      apiVersion: cert-manager.io/v1
      kind: Issuer
      metadata:
        name: test-selfsigned
        namespace: cert-manager-test
      spec:
        selfSigned: {}
      ---
      apiVersion: cert-manager.io/v1
      kind: Certificate
      metadata:
        name: selfsigned-cert
        namespace: cert-manager-test
      spec:
        dnsNames:
          - example.com
        secretName: selfsigned-cert-tls
        issuerRef:
          name: test-selfsigned
      ```

      {/cut}

      Бұл манифесте мыналар сипатталған:

      - `Issuer` және `Certificate` ресурстары орналастырылатын `cert-manager-test` аттар кеңістігі;
      - өздігінен қол қойылған сертификаттарды шығаруға жауап беретін `Issuer` ресурсы;
      - өздігінен қол қойылған сертификат параметрлері бар `Certificate` ресурсы.

   1. Манифест файлын қолданыңыз.

      ```console
      kubectl apply -f cert-manager-test-resources.yaml
      ```

      Манифесте сипатталған ресурстар жасалады. Сондай-ақ `cert-manager` басқа қажетті ресурстарды автоматты түрде жасайды.

   1. Барлық қажетті ресурстардың жасалғанын тексеріңіз:

      ```console
      kubectl get issuers,clusterissuers,certificates,certificaterequests,orders,challenges,secrets -n cert-manager-test
      ```

      Шығыста мыналар болуы керек:
      - манифесте сипатталған конфигурациясы бар `Issuer` және `Certificate`, `READY: True` күйінде;
      - `CertificateRequest`, `READY: True` күйінде;
      - сертификат деректерін қамтитын `Secret`.

      {cut(Команда шығысының мысалы)}

      ```text
      NAME                                     READY   AGE
      issuer.cert-manager.io/test-selfsigned   True    39m
      
      NAME                                          READY   SECRET                AGE
      certificate.cert-manager.io/selfsigned-cert   True    selfsigned-cert-tls   39m
      
      NAME                                                       APPROVED   DENIED   READY   ISSUER            REQUESTOR                                         AGE
      certificaterequest.cert-manager.io/selfsigned-cert-...     True                True    test-selfsigned   system:serviceaccount:cert-manager:cert-manager   39m
      
      NAME                         TYPE                DATA   AGE
      secret/selfsigned-cert-tls   kubernetes.io/tls   3      39m
      ```
      {/cut}

   1. Сертификат күйін тексеріңіз:

      ```console
      kubectl describe certificate selfsigned-cert -n cert-manager-test
      ```

      Сертификат сәтті шығарылған жағдайда:

      - Күй туралы ақпаратта (`Status`) `Certificate is up to date and has not expired` жолы болады.
      - Оқиғалар тізімінде (`Events`) `The certificate has been successfully issued` хабарламасы бар оқиға болады.

      {cut(Команда шығысының бір бөлігінің мысалы)}

      ```text
      ...

      Status:
        Conditions:
          Last Transition Time:  2023-08-17T08:11:27Z
          Message:               Certificate is up to date and has not expired
          Observed Generation:   1
          Reason:                Ready
          Status:                True
          Type:                  Ready
        Not After:               2023-11-15T08:11:27Z
        Not Before:              2023-08-17T08:11:27Z
        Renewal Time:            2023-10-16T08:11:27Z
        Revision:                1
      Events:
        Type    Reason     Age    From                                       Message
        ----    ------     ----   ----                                       -------
        Normal  Issuing    3m16s  cert-manager-certificates-trigger          Issuing certificate as Secret does not exist
        Normal  Generated  3m16s  cert-manager-certificates-key-manager      Stored new private key in temporary Secret resource "selfsigned-cert-..."
        Normal  Requested  3m16s  cert-manager-certificates-request-manager  Created new CertificateRequest resource "selfsigned-cert-..."
        Normal  Issuing    3m16s  cert-manager-certificates-issuing          The certificate has been successfully issued
      ```

      {/cut}

   Егер сертификат сәтті шығарылса, онда `cert-manager` дұрыс орнатылған және жұмыс істеп тұр.

## 4. (Опционалды) cert-manager ресурстарының резервтік көшірмесін жасаңыз

{note:info}

Қауіпсіздік мақсатында `cert-manager` [жаңартуының](#5_cert_manager_zhanartynyz) алдында сақтық көшірмені жасау [ұсынылады](https://cert-manager.io/docs/tutorials/backup).

{/note}

`Issuer`, `ClusterIssuer` және `Certificate` ресурстарының резервтік көшірмесі жасалады. Оған мыналар кірмейді:

- `CertificateRequests` ресурстары. Мұндай ресурстарды сақтық көшірмеге қосу [ұсынылмайды](https://cert-manager.io/docs/tutorials/backup/#backing-up-cert-manager-resource-configuration), өйткені бұл сақтық көшірмеден қалпына келтіруді қиындатуы мүмкін.

- Тікелей сертификат деректерін сақтайтын және соның ішінде жеке кілтті қамтитын құпиялар.

  {note:warn}

  Егер сақтық көшірмеден қалпына келтіру кезінде `Cerificate` ресурсы үшін сәйкес құпия табылмаса, онда [сертификат қайта шығарылады](https://cert-manager.io/docs/tutorials/backup/#backing-up-cert-manager-resource-configuration).

  {/note}

Резервтік көшірме жасау үшін пәрменді орындаңыз:

{tabs}

{tab(Linux (bash) / macOS (zsh))}

```console
kubectl get -o yaml \
  --all-namespaces \
  issuer,clusterissuer,certificate \
> cert-manager-backup.yaml
```

{/tab}

{tab(Windows (PowerShell))}

```console
kubectl get -o yaml `
  --all-namespaces `
  issuer,clusterissuer,certificate `
> cert-manager-backup.yaml
```

{/tab}

{/tabs}

Кеңейтілген резервтік көшіру және резервтік көшірмеден қалпына келтіру туралы [cert-manager ресми құжаттамасынан](https://cert-manager.io/docs/tutorials/backup) оқыңыз.

## 5. cert-manager жаңартыңыз

1. Орнатылған `cert-manager` релизінің нұсқасын қараңыз:

   ```console
   helm list --namespace cert-manager
   ```

1. Чарттар кешін жаңартыңыз:

   ```console
   helm repo update
   ```

1. Қолжетімді `cert-manager` чарттары мен олардың нұсқаларының тізімін алыңыз:

   ```console
   helm search repo jetstack -l
   ```

1. Жаңартуға арналған `cert-manager` ресми құжаттамасын оқып шығыңыз. Онда жаңарту бойынша ұсынымдар, критикалық өзгерістер (breaking changes) тізімі және басқа да пайдалы ақпарат бар.

   Атап айтқанда, әр жолы бір минорлық нұсқаға ғана жаңарту [ұсынылады](https://cert-manager.io/docs/installation/upgrading/) (мысалы, 1.**11**.3 → 1.**12**.3).

1. Жаңартылатын нұсқаны таңдаңыз.

   `cert-manager` және Kubernetes нұсқаларының үйлесімділік кестесі [cert-manager ресми құжаттамасында](https://cert-manager.io/docs/installation/supported-releases/) берілген.

   {note:info}

   Төменде `1.11.3` нұсқасынан `1.12.3` нұсқасына дейін жаңарту орындалады.

   Егер бұған дейін `cert-manager`-дің басқа нұсқасы орнатылған болса, жоғарыдағы ұсынымдарды ескере отырып, жаңарту үшін қажетті нұсқаны таңдаңыз.

   {/note}

1. Кластерде орнатылған CRDs жаңартыңыз.

   Бұл CRD-лер бұрын [қолмен орнатылғандықтан](#2_cert_manager_ornatynyz), `cert-manager` өзі жаңартылар алдында оларды да қолмен жаңартыңыз.

   ```console
   kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.12.3/cert-manager.crds.yaml
   ```

1. Таңдалған нұсқаға дейін `cert-manager` релизін жаңартыңыз:

   {tabs}

   {tab(Linux (bash) / macOS (zsh))}

   ```console
   helm upgrade cert-manager jetstack/cert-manager \
     --version v1.12.3 \
     --namespace cert-manager
   ```

   {/tab}

   {tab(Windows (PowerShell))}

   ```console
   helm upgrade cert-manager jetstack/cert-manager `
     --version v1.12.3 `
     --namespace cert-manager
   ```

   {/tab}

   {/tabs}

   Жаңарту сәтті аяқталса, Helm хабарламасында мыналар көрсетіледі:
   - `Release "cert-manager" has been upgraded. Happy Helming!`;
   - `STATUS`: `deployed`;
   - `NOTES`: `cert-manager v1.12.3 has been deployed successfully!`.

   {cut(Команда шығысының мысалы)}

   ```text
   Release "cert-manager" has been upgraded. Happy Helming!
   NAME: cert-manager
   LAST DEPLOYED: Thu Aug 17 15:17:35 2023
   NAMESPACE: cert-manager
   STATUS: deployed
   REVISION: 2
   TEST SUITE: None
   NOTES:
   cert-manager v1.12.3 has been deployed successfully!
   
   In order to begin issuing certificates, you will need to set up a ClusterIssuer
   or Issuer resource (for example, by creating a 'letsencrypt-staging' issuer).
   
   More information on the different types of issuers and how to configure them
   can be found in our documentation:
   
   https://cert-manager.io/docs/configuration/
   
   For information on how to configure cert-manager to automatically provision
   Certificates for Ingress resources, take a look at the `ingress-shim`
   documentation:
   
   https://cert-manager.io/docs/usage/ingress/
   ```

   {/cut}

## Пайдаланылмайтын ресурстарды жойыңыз

1. `cert-manager-test-resources.yaml` манифестінде сипатталған ресурстарды жойыңыз:

   ```console
   kubectl delete -f cert-manager-test-resources.yaml
   ```

   {note:warn}

   Ішіндегінің барлығымен бірге `cert-manager-test` аттар кеңістігі, соның ішінде `cert-manager` автоматты түрде жасаған қосымша ресурстар да жойылады.

   {/note}

1. `cert-manager` және онымен байланысты ресурстарды жойыңыз:

   1. Кластерде `cert-manager` жасаған ресурстардың енді жоқ екеніне көз жеткізіңіз:

      ```console
      kubectl get issuers,clusterissuers,certificates,certificaterequests,orders,challenges --all-namespaces
      ```

      Егер мұндай ресурстар бар болса, оларды жойыңыз.

   1. `cert-manager` релизін жойыңыз:

      ```console
      helm delete cert-manager --namespace cert-manager
      ```

   1. `cert-manager` аттар кеңістігін жойыңыз:

      ```console
      kubectl delete ns cert-manager
      ```

   1. Кластерге `cert-manager` үшін орнатылған CRDs жойыңыз:

      ```console
      kubectl delete -f https://github.com/cert-manager/cert-manager/releases/download/v1.12.3/cert-manager.crds.yaml
      ```
