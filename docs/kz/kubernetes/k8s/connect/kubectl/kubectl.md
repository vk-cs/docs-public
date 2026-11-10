# {heading(kubectl көмегімен кластерге қосылу)[id=k8s-kubectl]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{ifdef(public)}

`kubectl` утилитасы Kubernetes кластерін пәрмен жолынан басқару бойынша барлық операциялар спектрін орындауға мүмкіндік береді. Толығырақ [Kubernetes ресми құжаттамасында](https://kubernetes.io/docs/reference/kubectl/).
{/ifdef}

{ifndef(public)}
`kubectl` — Kubernetes кластерлерін басқаруға арналған пәрмен жолы құралы. `kubectl` қолданбаларды жайластыру, кластер ресурстарын тексеру және логтарды қарау үшін пайдаланылады. `kubectl` операцияларының толық тізімі [ресми құжаттамада](https://kubernetes.io/docs/reference/kubectl/overview/) келтірілген.
{/ifndef}

Кластерге қосылу тәсілі оның IP мекенжайына байланысты:

* Егер кластерге сыртқы IP мекенжайы тағайындалса, оған интернетке қолжетімділігі бар кез келген хосттан қосылуға болады.
* Егер кластерге тек ішкі IP мекенжайы тағайындалса, оған тек {var(cloud)} ішіндегі хосттан — кластермен бір ішкі желіде орналасқан виртуалды машинадан қосылуға болады.

## {heading(Дайындық қадамдары)[id=k8s-kubectl-before-work]}

1. Кластерге қосылу жоспарланып отырған хостта, егер `kubectl` утилитасы әлі орнатылмаған болса, оны орнатыңыз.

   {ifdef(public)}
   {note:warn}
   `kubectl` минорлық нұсқасы сіз қосылатын кластердің минорлық нұсқасынан бір бірліктен артық айырмашылығы жоқ екеніне көз жеткізіңіз. Мысалы, 1.32 нұсқасындағы `kubectl` 1.**31**, 1.**32** және 1.**33** нұсқаларындағы кластерлермен дұрыс жұмыс істейді.

   Толығырақ [Kubernetes ресми құжаттамасында](https://kubernetes.io/releases/version-skew-policy/#kubectl).
   {/note}
   {/ifdef}

   {ifndef(public)}
   {note:warn}
   `kubectl` минорлық нұсқасы сіз қосылатын кластердің минорлық нұсқасынан бір бірліктен артық айырмашылығы жоқ екеніне көз жеткізіңіз. Мысалы: 1.23 нұсқасындағы `kubectl` 1.22, 1.23 және 1.24 нұсқаларындағы кластерлермен дұрыс жұмыс істейді.
   {/note}
   {/ifndef}

   {ifdef(public)}
   {tabs}

   {tab(Linux (curl))}

    1. `kubectl` утилитасының қажетті нұсқасын жүктеп алыңыз.

       1.33.0 нұсқасындағы кластермен үйлесімді `kubectl` утилитасын жүктеу пәрменінің мысалы:

       ```console
       curl -LO https://dl.k8s.io/release/v1.33.0/bin/linux/amd64/kubectl
       ```

    1. `kubectl` екілік файлын орындалатын етіңіз:

       ```console
       sudo chmod +x ./kubectl
       ```

    1. Бұл файлды `PATH` орта айнымалысында қамтылған директорияға, мысалы, `/usr/local/bin` ішіне орналастырыңыз:

       ```console
       sudo mv ./kubectl /usr/local/bin/kubectl
       ```

    1. Пәрменді орындап, `kubectl` нұсқасын тексеріңіз:

       ```console
       kubectl version
       ```

   {/tab}

   {tab(Linux (apt))}

    1. Kubernetes репозиторийін қосыңыз:

        1. `apt` пайдалану үшін қажетті бумаларды орнатыңыз:

           ```console
           sudo apt-get update
           sudo apt-get install -y apt-transport-https ca-certificates curl gnupg
           ```

        1. Репозиторий баптаулары бар файлды жасаңыз. 1.33.0 нұсқасындағы кластерлерге арналған пәрмендер мысалы:

           ```console
           curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.33/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
           sudo chmod 644 /etc/apt/keyrings/kubernetes-apt-keyring.gpg
           echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.33/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list
           sudo chmod 644 /etc/apt/sources.list.d/kubernetes.list
           ```

        1. Бумалар тізімін жаңартыңыз:

           ```console
           sudo apt-get update
           ```

    1. `kubectl` орнатыңыз:

       ```console
       sudo apt-get install -y kubectl
       ```

       {note:info}
       Орнатуға қолжетімді барлық нұсқалардың тізімін `sudo apt-cache policy kubectl` пәрмені арқылы алуға болады.
       {/note}

    1. Пәрменді орындап, `kubectl` нұсқасын тексеріңіз:

       ```console
       kubectl version
       ```

   {/tab}

   {tab(Linux (yum))}

    1. Kubernetes репозиторийін қосыңыз. 1.33.0 нұсқасындағы кластерлерге арналған пәрмендер мысалы:

       ```console
       cat <<EOF | sudo tee /etc/yum.repos.d/kubernetes.repo
       [kubernetes]
       name=Kubernetes
       baseurl=https://pkgs.k8s.io/core:/stable:/v1.33/rpm/
       enabled=1
       gpgcheck=1
       gpgkey=https://pkgs.k8s.io/core:/stable:/v1.33/rpm/repodata/repomd.xml.key
       EOF
       ```

    1. `kubectl` орнатыңыз:

       ```console
       sudo yum install -y kubectl
       ```

       {note:info}
       Орнатуға қолжетімді барлық нұсқалардың тізімін `yum --showduplicates list kubectl` пәрмені арқылы алуға болады.
       {/note}

    1. Пәрменді орындап, `kubectl` нұсқасын тексеріңіз:

       ```console
       kubectl version
       ```

   {/tab}

   {tab(macOS (curl))}

    1. `kubectl` утилитасының қажетті нұсқасын жүктеп алыңыз.

       1.33.0 нұсқасындағы кластермен үйлесімді `kubectl` утилитасын жүктеу пәрмендерінің мысалдары:

       * Intel:

         ```console
         curl -LO https://dl.k8s.io/release/v1.33.0/bin/darwin/amd64/kubectl
         ```

       * Apple Silicon:

         ```console
         curl -LO https://dl.k8s.io/release/v1.33.0/bin/darwin/arm64/kubectl
         ```

    1. `kubectl` екілік файлын орындалатын етіңіз:

       ```console
       sudo chmod +x ./kubectl
       ```

    1. Бұл файлды `PATH` орта айнымалысында қамтылған директорияға, мысалы, `/usr/local/bin` ішіне орналастырыңыз:

       ```console
       sudo mv ./kubectl /usr/local/bin/kubectl
       ```

    1. Пәрменді орындап, `kubectl` нұсқасын тексеріңіз:

       ```console
       kubectl version
       ```

   {/tab}

   {tab(macOS (Homebrew))}

    1. Орнату пәрмендерінің бірін орындаңыз:

       ```console
       brew install kubectl
       ```

       Немесе:

       ```console
       brew install kubernetes-cli
       ```

    1. Пәрменді орындап, `kubectl` нұсқасын тексеріңіз:

       ```console
       kubectl version
       ```
   {/tab}

   {tab(Windows)}

    1. `kubectl` утилитасының қажетті нұсқасын жүктеп алыңыз.

       1.33.0 нұсқасындағы кластермен үйлесімді `kubectl` утилитасын жүктеу пәрменінің мысалы:

       ```console
       curl -LO https://dl.k8s.io/release/v1.33.0/bin/windows/amd64/kubectl.exe
       ```

    1. `PATH` орта айнымалысында `kubectl.exe` файлы жүктелген директорияны көрсетіңіз:

       1. **Бастау -> Бұл компьютер -> Қасиеттер -> Жүйенің қосымша параметрлері -> Орта айнымалылары -> Жүйелік айнымалылар** мәзір бөліміне өтіңіз.
       1. `kubectl.exe` файлы бар директорияға жолды қосып, `PATH` айнымалысының мәнін өзгертіңіз.

       {note:info}
       Docker Desktop for Windows `PATH` орта айнымалысына `kubectl` бағдарламасының өз нұсқасын қосады. Егер Docker Desktop орнатылған болса:

       * не жүктелген файлға жолды Docker Desktop орнатушысы қосқан жазбаның алдына қойыңыз;
       * не Docker Desktop-пен бірге жеткізілетін `kubectl` файлын жойыңыз.
       {/note}

    1. Пәрменді орындап, `kubectl` нұсқасын тексеріңіз:

       ```console
       kubectl version
       ```

   {/tab}

   {/tabs}
   {/ifdef}

   {ifndef(public)}
   {tabs}

   {tab(Ubuntu, Debian және HypriotOS)}
   ```console
   sudo apt-get update && sudo apt-get install -y apt-transport-https
   curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
   echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list.d/kubernetes.list
   sudo apt-get update
   sudo apt-get install -y kubectl
   ```
   {/tab}

   {tab(CentOS, Red Hat Enterprise Linux және Fedora)}
   ```console
   sudo yum install -y kubectl
   ```
   {/tab}

   {tab(РЕД ОС)}
   ```console
   sudo yum install kubernetes-client
   ```
   {/tab}

   {tab(macOS)}
   ```console
   brew install kubernetes-cli
   ```
   {/tab}

   {/tabs}
   {/ifndef}

{ifdef(public)}
1. {linkto(../../concepts/access-management#k8s-access-management)[text=Single Sign-On (SSO)]} пайдаланып қосылу үшін қажет нәрсенің бәрін дайындаңыз.

    1. Кластерге қосылу жоспарланып отырған хостта, егер `client-keystone-auth` плагині әлі орнатылмаған болса, оны орнатыңыз:

       {include(/kz/_includes/_client-keystone-auth.md)}

    1. Сізде Kubernetes кластерлерімен жұмыс істеу үшін {linkto(../../../../access/iam/concepts/rolesandpermissions#iam-concepts-rolesandpermissions)[text=қажетті рөл]} бар екенін тексеріңіз. Мұндай рөл болмаса, жобаның иесінен немесе суперәкімшісінен оны сізге қосуды сұраңыз.
    1. {linkto(../../../../tools-for-using-services/api/rest-api/enable-api#rest-api-enable-activate)[text=API арқылы қатынауды белсендіріңіз]}.
{/ifdef}

{ifndef(public)}
1. Kubernetes 1.27 және одан жоғары нұсқадағы кластерге Single Sign-On (SSO) пайдаланып қосылу үшін `keystone-auth` утилитасын орнатыңыз.

   {note:warn}
   `keystone-auth` утилитасын орнату тек {var(cloud)} үшін екі факторлы аутентификация өшірілген жағдайда қажет.
   {/note}

   1. Дистрибутивтен `<ДЕПЛОЙ_НОДА>:<ПОРТ>/repository/share/kubernetes/client-keystone-auth.zip` мекенжайында орналасқан архивті жүктеп алыңыз.

      Мұндағы:

      * `<ДЕПЛОЙ_НОДА>` — Nexus іске қосылған деплой-нода IP-мекенжайы.
      * `<ПОРТ>` — порт атауы немесе идентификаторы.

   1. Архивті тарқатыңыз. Операциялық жүйе түрін — `$GOOS` және пайдаланылатын архитектураны — `$GOARCH` таңдаңыз.
   1. `keystone-auth` орнатыңыз:

      ```console
      chmod -R +x client-keystone-auth/$GOOS/$GOARCH
      sudo mv client-keystone-auth/$GOOS/$GOARCH/* /usr/bin/
      ```

   1. Кластерге қай пайдаланушы атынан қосылу орындалатынын анықтаңыз:

      * {var(cloud)} әкімшісіне хабарласып, пайдаланушыға `mcs_k8s_admin` рөлін қосуды сұраңыз.
      * Жеке кабинетте пайдаланушы үшін API арқылы қатынауға {linkto(../../../../tools-for-using-services/api/rest-api/case-keystone-token#rest-api-keystone-token)[text=токен алыңыз]}.
{/ifndef}

{ifdef(public)}
## {heading(Кластерге қосылу)[id=k8s-kubectl-connect]}

{include(/kz/_includes/_kubeconfig.md)[tags=novariables,variables]}
{/ifdef}

{ifndef(public)}
## {heading(Kubeconfig файлын дайындау)[id=k8s-kubectl-kubeconfig]}

1. Конфигурация файлы кластер жасалған кезде құрылғыға автоматты түрде сақталады. Егер бұл орындалмаса, келесі қадамдарды орындаңыз:

   1. {linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]} {var(cloud)} жеке кабинетіне.
   1. **Кластеры Kubernetes** → **Кластеры Kubernetes** бөліміне өтіңіз.
   1. Қажетті кластер үшін ![](../../../../assets/more-icon.svg "inline") басып, **Получить Kubeconfig для доступа к кластеру** тармағын таңдаңыз. Кеңейтімі `.yaml` болатын файл жүктеледі.

      {note:warn}
      Әрі қарай жүктелген файлдың атауы `kubernetes-cluster-1234_kubeconfig.yaml` болады және ол `C:\Users\user\.kube` (Windows үшін) немесе `/home/user/.kube` (Linux және macOS үшін) директориясында орналасқан деп есептеледі. Қажет болса, төмендегі командаларды өзгертіңіз.
      {/note}

1. `kubeconfig` файлына қолжетімділік құқықтарын шектеңіз:

   {tabs}

   {tab(Linux)}
   ```console
   sudo chmod 0600 /home/user/.kube/kubernetes-cluster-1234_kubeconfig.yaml
   ```
   {/tab}

   {tab(Windows)}
   ```console
   icacls.exe 'C:\Users\user\.kube\kubernetes-cluster-1234_kubeconfig.yaml' `
   /c /t `
   /Inheritance:d `
   /Remove:g BUILTIN\Administrators Everyone Users `
   /Grant:r ${env:UserName}:RW
   ```
   {/tab}

   {/tabs}

1. `kubeconfig` файлына қатынау токенін қосыңыз:

   1. Бет тақырыбындағы пайдаланушы атын басып, **Жоба баптаулары** тармағын таңдаңыз.
   1. **API арқылы қатынау** қойындысына өтіп, **API арқылы қатынау үшін токен** мәнін көшіріңіз.
   1. `kubeconfig` файлын ашып, `users` бөліміне токенді қосыңыз.

      Kubeconfig файлының мысалы:

      ```console
      apiVersion: v1
      clusters:
      - cluster:
          certificate-authority-data: LS0tLS1CRUdJTiBDR.......0tLS0K
          server: https://10.31.1.9:6443
        name: kubernetes-cluster-5109
      contexts:
      - context:
          cluster: kubernetes-cluster-1234
          user: kubernetes-cluster-1234
        name: default/kubernetes-cluster-1234
      current-context: default/kubernetes-cluster-1234
      kind: Config
      preferences: {}
      users:
      - name: kubernetes-cluster-1234
        user:
          token: {{ <ТОКЕН> }}

      ```

      Мұндағы `<ТОКЕН>` — API арқылы қатынауға арналған токен.

1. `kubeconfig` файлын экспорттаңыз:

   {tabs}

   {tab(Linux)}
   ```console
   export KUBECONFIG=<ПУТЬ>
   ```

   Мұндағы `<ПУТЬ>` — `kubeconfig` конфигурация файлының жолы.
   {/tab}

   {tab(Windows)}
   ```console
   env:KUBECONFIG = 'C:\Users\user\.kube\kubernetes-cluster-1234_kubeconfig.yaml'
   ```
   {/tab}

   {/tabs}
{/ifndef}

## {heading(Кластерге қосылуды тексеру)[id=k8s-kubectl-check-connection]}

{ifdef(public)}
{tabs}

{tab(Kubernetes 1.23 және одан жоғары нұсқасы)}

Хостта:

1. Пәрменді орындаңыз:

   ```console
   kubectl cluster-info
   ```

1. {var(cloud)} жеке кабинетіне арналған пайдаланушы құпиясөзін енгізіңіз.

   Бұл кластерге қосылған кезде {linkto(../../concepts/access-management#k8s-access-management)[text=аутентификация]} үшін қажет.

{/tab}

{tab(Kubernetes 1.22 және одан төмен нұсқасы)}

Хостта мына пәрменді орындаңыз:

```console
kubectl cluster-info
```

{/tab}

{/tabs}

Егер кластер қалыпты жұмыс істеп тұрса және `kubectl` онымен жұмыс істеуге бапталған болса, ұқсас ақпарат шығарылады:

```text
Kubernetes control plane is running at...
CoreDNS is running at...
To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```
{/ifdef}

{ifndef(public)}
Кластерге қосылуды тексеріңіз:

```console
kubectl cluster-info
```

Күтілетін нәтиженің мысалы:

```console
Kubernetes control plane is running at https://192.168.24.118:6443
Heapster is running at https://192.168.24.118:6443/api/v1/namespaces/kube-system/services/heapster/proxy
CoreDNS is running at https://192.168.24.118:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
```
{/ifndef}
