{include(/kz/_includes/_translated_by_ai.md)}

`kubectl` утилитасы Kubernetes кластерін пәрмен жолынан басқару бойынша барлық операциялар спектрін орындауға мүмкіндік береді. Толығырақ [Kubernetes ресми құжаттамасында](https://kubernetes.io/docs/reference/kubectl/).

Кластерге қосылу тәсілі оның IP мекенжайына байланысты:

- Егер кластерге сыртқы IP мекенжайы тағайындалса, оған интернетке қолжетімділігі бар кез келген хосттан қосылуға болады.
- Егер кластерге тек ішкі IP мекенжайы тағайындалса, оған тек VK Cloud ішіндегі хосттан — кластермен бір ішкі желіде орналасқан виртуалды машинадан қосылуға болады.

## Дайындық қадамдары

1. Кластерге қосылу жоспарланып отырған хостта, егер `kubectl` утилитасы әлі орнатылмаған болса, оны орнатыңыз.

   {note:warn}

   `kubectl` минорлық нұсқасы сіз қосылатын кластердің минорлық нұсқасынан бір бірліктен артық айырмашылығы жоқ екеніне көз жеткізіңіз. Мысалы, 1.32 нұсқасындағы `kubectl` 1.**31**, 1.**32** және 1.**33** нұсқаларындағы кластерлермен дұрыс жұмыс істейді.

   Толығырақ [Kubernetes ресми құжаттамасында](https://kubernetes.io/releases/version-skew-policy/#kubectl).

   {/note}

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

        - Intel:

          ```console
          curl -LO https://dl.k8s.io/release/v1.33.0/bin/darwin/amd64/kubectl
          ```

        - Apple Silicon:
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
        1. `PATH` файлы бар директорияға жолды қосып, `kubectl.exe` айнымалысының мәнін өзгертіңіз.

       {note:info}

       Docker Desktop for Windows `kubectl` орта айнымалысына `PATH` бағдарламасының өз нұсқасын қосады. Егер Docker Desktop орнатылған болса:

        - не жүктелген файлға жолды Docker Desktop орнатушысы қосқан жазбаның алдына қойыңыз;
        - не Docker Desktop-пен бірге жеткізілетін `kubectl` файлын жойыңыз.

       {/note}

    1. Пәрменді орындап, `kubectl` нұсқасын тексеріңіз:

       ```console
       kubectl version
       ```

   {/tab}

   {/tabs}

1. [Single Sign-On (SSO)](../../concepts/access-management) пайдаланып қосылу үшін қажет нәрсенің бәрін дайындаңыз.

    1. Кластерге қосылу жоспарланып отырған хостта, егер `client-keystone-auth` плагині әлі орнатылмаған болса, оны орнатыңыз:

       {include(/kz/_includes/_client-keystone-auth.md)}

    1. Сізде Kubernetes кластерлерімен жұмыс істеу үшін [қажетті рөл](/kz/tools-for-using-services/account/concepts/rolesandpermissions#cloud_containers_servisi_rolderine_arnalgan_kukyktar) бар екенін тексеріңіз. Егер мұндай рөл болмаса, жоба иесінен немесе суперәкімшіден оны сізге қосуды сұраңыз.
    1. [API арқылы қолжетімділікті белсендіріңіз](/kz/tools-for-using-services/api/rest-api/enable-api#api_arkyly_kolzhetimdilikti_belsendiru).

## {heading(Кластерге қосылу)[id=connect]}

{include(/kz/_includes/_kubeconfig.md)}

## {heading(Кластерге қосылуды тексеру)[id=check_connection]}

{tabs}

{tab(Kubernetes 1.23 және одан жоғары нұсқасы)}

Хостта:

1. Пәрменді орындаңыз:

   ```console
   kubectl cluster-info
   ```

1. VK Cloud жеке кабинетіне арналған пайдаланушы құпиясөзін енгізіңіз.

   Бұл кластерге қосылған кезде [аутентификация](../../concepts/access-management) үшін қажет.

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
