# {heading(Service account үшін kubeconfig файлын жасау)[id=k8s-sa-kubeconfig]}

{include(/kz/_includes/_translated_by_ai.md)}

Cloud Containers кластеріне {linkto(../../connect/kubectl#k8s-kubectl)[text=kubectl көмегімен қосылғанда]} кластер конфигурациясының файлы — [kubeconfig](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) пайдаланылады. Әдетте кластермен жұмыс істеу үшін бірыңғай кіру {linkto(../../concepts/access-management#k8s-access-management)[text=технологиясын]} пайдалануға бапталған VK Cloud жеке кабинетінен алынған kubeconfig қолданылады. Сондықтан `kubectl` құралымен жұмыс істегенде пайдаланушының паролін мезгіл-мезгіл енгізу керек болады.

Мұндай аутентификация процесі кластерге қолжетімділік қажет автоматтандырылған құралдармен жұмыс істегенде ыңғайсыз. Олармен жұмыс істеу үшін service account арналған kubeconfig файлын пайдаланған ыңғайлырақ. Бұл kubeconfig пароль енгізбей-ақ, өмір сүру мерзімі шексіз токен арқылы аутентификациялануға мүмкіндік береді.

## {heading(Дайындық қадамдары)[id=k8s-sa-kubeconfig-prepare]}

{include(/kz/_includes/_create-test-cluster.md)}

   Кластерді жасау кезінде **Сыртқы IP тағайындау** опциясын таңдаңыз. Кластердің қалған параметрлерін өз қалауыңызша таңдаңыз.

1. `kubectl` көмегімен жасалған кластерге қосыла алатыныңызға {linkto(../../connect/kubectl#k8s-kubectl)[text=көз жеткізіңіз]}.

   Бұл кезде VK Cloud жеке кабинетінен жүктелген kubeconfig пайдаланылады.

1. kubeconfig-ке нұсқайтын орта айнымалыларын орнатыңыз:

   - `VKCLOUD_KUBECONFIG`: VK Cloud жеке кабинетінен жүктелген kubeconfig-ке жол.
   - `SA_KUBECONFIG`: service account үшін kubeconfig-ке жол (файлдың өзі кейінірек жасалады).

   Бұл `kubectl` құралымен әрі қарай жұмысты жеңілдетеді.

   {note:info}

   Kubeconfig файлдарыңызға жол төмендегі мысалдан өзгеше болуы мүмкін.

   {/note}

   {tabs}

   {tab(Linux (bash)/macOS (zsh))}

   ```console
   export VKCLOUD_KUBECONFIG="/home/user/.kube/kubernetes-cluster-1234_kubeconfig.yaml"
   export SA_KUBECONFIG="/home/user/.kube/sa_kubeconfig.yaml"

   ```

   {/tab}

   {tab(Windows (PowerShell))}

   ```console
   $VKCLOUD_KUBECONFIG="C:\Users\user\.kube\kubernetes-cluster-1234_kubeconfig.yaml"
   $SA_KUBECONFIG="C:\Users\user\.kube\sa_kubeconfig.yaml"

   ```

   {/tab}

   {/tabs}

1. Кластерге қосылғаннан кейін қажетті Kubernetes ресурстарын жасауға құқықтарыңыз бар екеніне көз жеткізіңіз:

   ```console
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG auth can-i create serviceaccount
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG auth can-i create secret
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG auth can-i create clusterrolebinding

   ```

   Әр команда үшін `yes` жауабы шығуы керек.

   Егер осы ресурстардың кез келгенін жасауға құқық болмаса (`no` жауабы), кластерге қосылу орындалып жатқан VK Cloud пайдаланушысының {linkto(../../../../tools-for-using-services/account/instructions/project-settings/access-manage#project-access-user-role-edit)[text=рөлін түзетіңіз]}.

   Рөлдік модель және қолжетімді рөлдер туралы толығырақ {linkto(../../concepts/access-management#k8s-access-management)[text=Қолжетімділікті басқару]} бөлімінен оқыңыз.

## {heading(1. Service account жасаңыз және оны рөлмен байланыстырыңыз)[id=k8s-sa-kubeconfig-create-sa]}

1. `kube-system` аттар кеңістігінде `example-sa` service account-ын жасаңыз:

   {tabs}

   {tab(Linux (bash)/macOS (zsh))}

   ```console
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG \
     create serviceaccount example-sa -n kube-system

   ```

   {/tab}

   {tab(Windows (PowerShell))}

   ```console
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG `
     create serviceaccount example-sa -n kube-system

   ```

   {/tab}

   {/tabs}

   Команда шығысының мысалы:

   ```text
   serviceaccount/example-sa created
   ```

1. Service account-қа тағайындау қажет кластерлік рөлді таңдаңыз.

   Барлық кластерлік рөлдердің тізімін егжей-тегжейлі сипаттамасымен алу үшін келесі команданы орындаңыз:

   ```console
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG describe clusterroles
   ```

   Рөлді таңдағанда кластермен жұмыс істеу қауіпсіздігін арттыру үшін [ең аз артықшылықтар қағидатын](https://ru.wikipedia.org/wiki/Принцип_минимальных_привилегий) ұстаныңыз. Рөлдік модель туралы толығырақ [Kubernetes ресми құжаттамасында](https://kubernetes.io/docs/reference/access-authn-authz/rbac/).

   Төменде мысал ретінде `edit` рөлі тағайындалады. Ол жеке кабинеттегі `Оператор Kubernetes` рөліне {linkto(../../concepts/access-management#k8s-access-management-kubernetes-roles)[text=сәйкес келеді]}.

1. Жасалған service account-ты таңдалған кластерлік рөлмен байланыстырыңыз. Ол үшін `example-binding` атауымен `ClusterRoleBinding` ресурсын жасаңыз.

   Service account тиесілі аттар кеңістігімен бірге көрсетілуі керек.

   {tabs}

   {tab(Linux (bash)/macOS (zsh))}

   ```console
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG \
     create clusterrolebinding example-binding \
       --serviceaccount=kube-system:example-sa \
       --clusterrole=edit
   ```

   {/tab}

   {tab(Windows (PowerShell))}

   ```console
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG `
     create clusterrolebinding example-binding `
       --serviceaccount=kube-system:example-sa `
       --clusterrole=edit

   ```

   {/tab}

   {/tabs}

   Команда шығысының мысалы:

   ```text
   clusterrolebinding.rbac.authorization.k8s.io/example-binding created
   ```

## {heading(2. Service account үшін токен алыңыз)[id=k8s-sa-kubeconfig-get-token]}

1. Service account үшін токені бар `example-token` құпиясын жасаңыз:

   1. Манифест файлын жасаңыз:

      {cut(example-token.yaml)}

      <!-- prettier-ignore -->
      ```yaml
      apiVersion: v1
      kind: Secret
      type: kubernetes.io/service-account-token
      metadata:
        name: example-token
        namespace: kube-system
        annotations:
          kubernetes.io/service-account.name: example-sa
      ```

      {/cut}

      Манифест өрістеріне түсіндірмелер:

      - `type`: `kubernetes.io/service-account-token` арнайы secret түрі. Мұндай secret service account үшін токенді сақтайды.
      - `metadata.namespace`: secret үшін аттар кеңістігі. Secret service account орналасқан аттар кеңістігінде орналасуы керек.
      - `metadata.annotations`: service account атауы бар `kubernetes.io/service-account.name` арнайы аннотациясы. Жасалған secret-тен алынған токен осы account-пен байланысады.

   1. Манифест файлын қолданыңыз:

      ```console
      kubectl --kubeconfig $VKCLOUD_KUBECONFIG apply -f example-token.yaml
      ```

      Берілген параметрлері бар secret жасалады. Команда шығысының мысалы:

      ```text
      secret/example-token created
      ```

1. Жасалған secret-тен service account-қа токен тағайындалғанына көз жеткізіңіз:

   {tabs}

   {tab(Linux (bash)/macOS (zsh))}

   ```console
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG \
     describe serviceaccount example-sa -n kube-system

   ```

   {/tab}

   {tab(Windows (PowerShell))}

   ```console
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG `
     describe serviceaccount example-sa -n kube-system

   ```

   {/tab}

   {/tabs}

   Шығыста `Tokens` өрісінде secret-ке сілтеме болуы керек.

   {cut(Команда шығысының мысалы)}

   ```text
   Name:                example-sa
   Namespace:           kube-system
   Labels:              <none>
   Annotations:         <none>
   Image pull secrets:  <none>
   Mountable secrets:   <none>
   Tokens:              example-token
   Events:              <none>
   ```

   {/cut}

1. Токен мәнін алыңыз.

   Secret токенді кодталған түрде сақтайды ([Base64](https://developer.mozilla.org/en-US/docs/Glossary/Base64) кодтау сызбасы). Оны kubeconfig ішінде пайдалану үшін токенді декодтау қажет:

   {tabs}

   {tab(Linux (bash)/macOS (zsh))}

   ```console
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG \
     get secret example-token -n kube-system \
     --template={{.data.token}} | base64 --decode

   ```

   {/tab}

   {tab(Windows (PowerShell))}

   ```console
   [System.Text.Encoding]::UTF8.GetString( `
     [System.Convert]::FromBase64String( `
       (kubectl --kubeconfig $VKCLOUD_KUBECONFIG `
          get secret example-token -n kube-system -o json `
          | ConvertFrom-Json).data.token))

   ```

   {/tab}

   {/tabs}

   Токеннің мәні шығарылады. Оны сақтап қойыңыз.

   {note:err}

   Токеннің мәні — құпия ақпарат. Егер ол әшкереленсе, {linkto(#k8s-sa-kubeconfig-revoke-token)[text=токенді кері қайтарып алыңыз]}.

   {/note}

## {heading(4. Service account үшін kubeconfig жасаңыз)[id=k8s-sa-kubeconfig-create]}

1. Бұл kubeconfig үшін негізді VK Cloud жеке кабинетінен жүктелген kubeconfig-ті көшіру арқылы жасаңыз.

   ```console
   cp $VKCLOUD_KUBECONFIG $SA_KUBECONFIG
   ```

1. (Опционалды) kubeconfig құрылымымен танысыңыз:

   ```console
   kubectl --kubeconfig $SA_KUBECONFIG config view
   ```

   Kubeconfig мазмұны ықшамдалған түрде шығарылады: кейбір өрістердің мәндері түсіріліп қалады.

   {cut(Қарапайым kubeconfig мысалы)}

   <!-- prettier-ignore -->
   ```yaml
   apiVersion: v1
   clusters: # Кластерлер
     - cluster: <кластер туралы ақпарат>
       name: <кластер атауы>
   contexts: # Кластермен жұмыс жүргізілетін контексттер
     - context:
         cluster: <кластер атауы>
         user: <пайдаланушы аты>
       name: <контекст атауы>
   current-context: <ағымдағы контекст атауы>
   kind: Config
   preferences: {}
   users: # Пайдаланушылар
     - name: <пайдаланушы аты>
       user:
         token: <аутентификация деректері>
   ```

   {/cut}

   Kubeconfig кластермен жұмыс істеуге қажетті барлық параметрлерді қамтиды:

   - `clusters`: кластерлердің және оларға қосылу деректерінің тізімі.

     Cloud Containers кластеріне арналған kubeconfig жалғыз кластер туралы жазбаны қамтиды.

   - `users`: пайдаланушылардың және олардың кластердегі аутентификация деректерінің тізімі.

     Cloud Containers кластеріне арналған kubeconfig `keystone-auth` көмегімен аутентификацияланатын жалғыз пайдаланушы туралы жазбаны қамтиды.

   - `contexts`: `kubectl` жұмыс істейтін контекст. Ең қарапайым жағдайда контекст — бұл кластер атауы мен пайдаланушы атының комбинациясы.

     Cloud Containers кластеріне арналған kubeconfig жалғыз контекст туралы жазбаны қамтиды. Бұл контекст kubeconfig ішінде бұрыннан анықталған кластер мен пайдаланушы жазбаларын пайдаланады.

   `kubectl` көрсетілген контекстте жұмыс істегенде, контексте берілген кластермен көрсетілген пайдаланушы атынан жұмыс істейді.

1. Service account үшін kubeconfig мазмұнын бұл файлда бұрын бапталған service account-пен байланысты параметрлер болатындай етіп өзгертіңіз:

   1. Бар пайдаланушыны жойыңыз.

      Бұл пайдаланушы VK Cloud пайдаланушысына сәйкес келеді және автоматтандырылған құралдар пайдаланатын kubeconfig ішінде болмауы керек.

      1. Пайдаланушылар тізімін алыңыз:

         {tabs}

         {tab(Linux (bash)/macOS (zsh))}

         ```console
         kubectl --kubeconfig $SA_KUBECONFIG \
           config get-users

         ```

         {/tab}

         {tab(Windows (PowerShell))}

         ```console
         kubectl --kubeconfig $SA_KUBECONFIG `
           config get-users

         ```

         {/tab}

         {/tabs}

      1. Тізімнен қажетті атауды пайдаланып, пайдаланушыны жойыңыз:

         {tabs}

         {tab(Linux (bash)/macOS (zsh))}

         ```console
         kubectl --kubeconfig $SA_KUBECONFIG \
           config delete-user <пайдаланушы аты>

         ```

         {/tab}

         {tab(Windows (PowerShell))}

         ```console
         kubectl --kubeconfig $SA_KUBECONFIG `
           config delete-user <пайдаланушы аты>

         ```

         {/tab}

         {/tabs}

         Команда шығысының ішінара мысалы:

         ```text
         deleted user kubernetes-cluster-1234 from ...sa_kubeconfig.yaml
         ```

   1. `example-sa` жаңа пайдаланушысын қосыңыз.

      Бұл пайдаланушы бұрын жасалған service account-қа сәйкес келеді. Аутентификация үшін бұрын алынған токен пайдаланылады.

      {tabs}

      {tab(Linux (bash)/macOS (zsh))}

      ```console
      kubectl --kubeconfig $SA_KUBECONFIG \
        config set-credentials example-sa --token="<токен мәні>"

      ```

      {/tab}

      {tab(Windows (PowerShell))}

      ```console
      kubectl --kubeconfig $SA_KUBECONFIG `
        config set-credentials example-sa --token="<токен мәні>"

      ```

      {/tab}

      {/tabs}

      Команда шығысының мысалы:

      ```text
      User "example-sa" set.
      ```

   1. Ағымдағы контекстті қосылған пайдаланушыны пайдалану үшін баптаңыз:

      {tabs}

      {tab(Linux (bash)/macOS (zsh))}

      ```console
      kubectl --kubeconfig $SA_KUBECONFIG \
        config set-context --current --user="example-sa"

      ```

      {/tab}

      {tab(Windows (PowerShell))}

      ```console
      kubectl --kubeconfig $SA_KUBECONFIG `
        config set-context --current --user="example-sa"

      ```

      {/tab}

      {/tabs}

      Шығыс мысалы:

      ```text
      Context "default/kubernetes-cluster-1234" modified.
      ```

1. (Опционалды) Service account үшін жаңартылған kubeconfig мазмұнын тексеріңіз:

   ```console
   kubectl --kubeconfig $SA_KUBECONFIG config view
   ```

   Бұл kubeconfig ішінде бұрын қосылған `example-sa` пайдаланушысынан басқа пайдаланушылар болмауы керек. Жалғыз контекст осы пайдаланушыны пайдалануы керек.

   {cut(Команда шығысының мысалы)}

   <!-- prettier-ignore -->
   ```yaml
   apiVersion: v1
   clusters:
   - cluster:
       certificate-authority-data: DATA+OMITTED
       server: https://203.0.113.123:6443
     name: kubernetes-cluster-1234
   contexts:
   - context:
       cluster: kubernetes-cluster-1234
       user: example-sa
     name: default/kubernetes-cluster-1234
   current-context: default/kubernetes-cluster-1234
   kind: Config
   preferences: {}
   users:
   - name: example-sa
     user:
       token: REDACTED
   ```

   {/cut}

## {heading(5. Жасалған kubeconfig жұмысын тексеріңіз)[id=k8s-sa-kubeconfig-check]}

Кластер және оның ресурстары туралы ақпарат алу үшін, мысалы, `kubectl` командаларын және бұрын жасалған service account үшін kubeconfig файлын пайдаланыңыз:

1. Кластер туралы ақпарат алыңыз:

   ```console
   kubectl --kubeconfig $SA_KUBECONFIG cluster-info
   ```

   {cut(Команда шығысының мысалы)}

   ```text
   Kubernetes control plane is running at https://203.0.113.123:6443
   CoreDNS is running at https://203.0.113.123:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
   ```

   {/cut}

1. `default` аттар кеңістігіндегі негізгі ресурстар тізімін алыңыз:

   ```console
   kubectl --kubeconfig $SA_KUBECONFIG get all -n default
   ```

   {cut(Команда шығысының мысалы)}

   ```text
   NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
   service/kubernetes   ClusterIP   10.254.0.1   <none>        443/TCP   3d1h
   ```

   {/cut}

Егер командаларды орындау кезінде пароль сұралмаса, онда алынған kubeconfig-ті Cloud Containers кластеріне қол жеткізу үшін автоматтандырылған құралдармен бірге пайдалануға болады.

{note:err}

Kubeconfig файлын қорғау үшін қажетті шараларды қамтамасыз етіңіз. Онда құпия ақпарат бар: токен мәні ашық түрде сақталады.

Kubeconfig әшкереленген жағдайда {linkto(#k8s-sa-kubeconfig-revoke-token)[text=токенді кері қайтарып алыңыз]}.

{/note}

## {heading(Әшкереленген токенді кері қайтарып алыңыз)[id=k8s-sa-kubeconfig-revoke-token]}

Егер бұрын жасалған токен немесе оны қамтитын kubeconfig әшкереленсе, кластерге рұқсатсыз қолжетімділікті болдырмау үшін токенді кері қайтарып алыңыз.

Ол үшін токенді сақтау үшін пайдаланылатын secret-ті жойыңыз:

```console
kubectl --kubeconfig $VKCLOUD_KUBECONFIG delete secret example-token -n kube-system
```

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=k8s-sa-kubeconfig-revoke-delete]}

Жұмыс істеп тұрған кластер тарификацияланады және есептеу ресурстарын тұтынады. Егер kubeconfig жұмысын тексеру үшін жасалған Kubernetes ресурстары енді қажет болмаса, оларды жойыңыз:

1. `example-binding` ресурсын, `example-token` secret-ін және `example-sa` service account-ын жойыңыз:

   {tabs}

   {tab(Linux (bash)/macOS (zsh))}

   ```console
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG \
     delete clusterrolebinding example-binding
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG \
     delete secret example-token -n kube-system
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG \
     delete serviceaccount example-sa -n kube-system

   ```

   {/tab}

   {tab(Windows (PowerShell))}

   ```console
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG `
     delete clusterrolebinding example-binding
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG `
     delete secret example-token -n kube-system
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG `
     delete serviceaccount example-sa -n kube-system

   ```

   {/tab}

   {/tabs}

{ifdef(public)}
{include(/kz/_includes/_delete-test-cluster-short.md)}
{/ifdef}
