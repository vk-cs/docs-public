# {heading(Kubernetes Dashboard көмегімен кластерге қосылу)[id=k8s-k8s-dashboard]}

{include(/kz/_includes/_translated_by_ai.md)}

Kubernetes Dashboard — бұл Cloud Containers-Тегі барлық {linkto(/kz/kubernetes/k8s/concepts/cluster-generations#k8s-cluster-generations)[text=бірінші буын]} кластерлерінде қол жетімді Kubernetes кластерлеріне арналған әмбебап веб-интерфейс. Ол пайдаланушыларға кластердің өзін де, онда жұмыс істеп тұрған қолданбаларды да басқаруға мүмкіндік береді. Толығырақ [Kubernetes ресми құжаттамасында](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/).

Kubernetes Dashboard-қа қосылу тәсілі кластердің IP мекенжайына байланысты:

* Егер кластерге сыртқы IP мекенжайы тағайындалса, интернетке қолжетімділігі бар кез келген хосттан қосылуға болады.
* Егер кластерге тек ішкі IP мекенжайы тағайындалса, тек VK Cloud ішіндегі хосттан — кластермен бір ішкі желіде орналасқан виртуалды машинадан қосылуға болады.

Kubernetes Dashboard-қа қосылу үшін хостта браузер орнатылған болуы керек.

{note:info}
Kubernetes Dashboard тек {linkto(/kz/kubernetes/k8s/concepts/cluster-generations#k8s-cluster-generations)[text=бірінші буын]} кластерлері үшін ғана қолжетімді.
{/note}

## {heading(Дайындық қадамдары)[id=k8s-k8s-dashboard-before-work]}

1. {linkto(../kubectl#k8s-kubectl-check-connection)[text=Көз жеткізіңіз]}, `kubectl` көмегімен кластерге қосыла алатыныңызға.

1. Кластерге қосылу жоспарланып отырған хостта, егер `kauthproxy` утилитасы әлі орнатылмаған болса, оны орнатыңыз:

   1. [Релиздер бетінен](https://github.com/int128/kauthproxy/releases) қажетті нұсқадағы архивті жүктеп алыңыз:

      * Linux үшін: `kauthproxy_linux_....zip`;
      * macOS үшін: `kauthproxy_darwin_....zip`;
      * Windows үшін: `kauthproxy_windows_....zip`.

   1. Архивті ашыңыз.

   1. Орындалатын файлды `PATH` орта айнымалысында қамтылған директорияға, мысалы, мына жерге орналастырыңыз:

      * Linux/macOS үшін `/usr/local/bin`;
      * Windows үшін `C:\`.

## {heading(Кластерге қосылу)[id=k8s-k8s-dashboard-connect-to-cluster]}

{tabs}

{tab(Kubernetes 1.23 және одан жоғары нұсқасы)}

1. Хостта терминалдың бөлек сессиясында мына пәрменді орындаңыз:

   ```console
   kauthproxy -n kubernetes-dashboard https://kubernetes-dashboard.svc
   ```

   {note:warn}

   Бұл терминал сессиясын жаппаңыз, әйтпесе Kubernetes Dashboard веб-интерфейсіне қолжетімділік жоғалады.

   {/note}

1. Егер ол kubeconfig конфигурация файлына жазылмаған болса, VK Cloud жеке кабинетінің құпиясөзін енгізіңіз.

   `kauthproxy` бұл құпиясөзді мезгіл-мезгіл қайта сұрап отырады.

   Браузер ашылады және сіз Kubernetes Dashboard веб-интерфейсіне бағытталасыз.

{/tab}

{tab(Kubernetes 1.22 және одан төмен нұсқасы)}

1. Secret алыңыз:

   1. Кластерге қосылатын пайдаланушы аккаунтымен VK Cloud [жеке кабинетіне](https://kz.cloud.vk.com/app/) өтіңіз.
   1. Қажетті кластер орналасқан жобаны таңдаңыз.
   1. **Контейнерлер → Kubernetes кластерлері** бөліміне өтіңіз.
   1. Қажетті кластер үшін ![](../../../../assets/more-icon.svg "inline") түймесін басып, **Kubernetes Dashboard-қа кіру үшін Secret алу** тармағын таңдаңыз.
   1. **Көшіру** түймесін басыңыз.

      Secret алмасу буферіне көшіріледі.

1. Хостта терминалдың бөлек сессиясында мына пәрменді орындаңыз:

   ```console
   kauthproxy -n kube-system https://kubernetes-dashboard.svc
   ```

   {note:warn}

   Бұл терминал сессиясын жаппаңыз, әйтпесе Kubernetes Dashboard веб-интерфейсіне қолжетімділік жоғалады.

   {/note}

   Браузер ашылады және сіз Kubernetes Dashboard авторизация бетіне бағытталасыз.

1. **Token** опциясын таңдап, бұрын көшірілген secret мәнін қойыңыз.

1. **Sign In** түймесін басыңыз.

   Kubernetes Dashboard веб-интерфейсі ашылады.

{/tab}

{/tabs}
