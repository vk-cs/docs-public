# {heading(Headlamp арқылы кластерге қосылу)[id=mk8s-headlamp]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

[Headlamp](https://headlamp.dev/) — бұл Managed Containers қызметіндегі Kubernetes кластерлерін басқаруға арналған графикалық интерфейс (GUI). Headlamp — Lens-тің заманауи және икемді баламасы, ол кластердің ресурстарын `kubectl` қолмен енгізген командаșыз браузерде немесе жергілікті қосымшада қарауға және өңдеуге мүмкіндік береді.

Headlamp-ті екі тәсілмен орнатуға болады:

- Тікелей кластерге ([In-cluster](https://headlamp.dev/docs/latest/installation/in-cluster/) режимі). Бұл режимде Headlamp Kubernetes кластеріне бір под түрінде орнатылады. Бұл подтың ішінде Headlamp Kubernetes API проксиі ретінде жұмыс істейді: браузер Headlamp-ке жүгінеді, ал ол Kubernetes API-серверіне жүгінеді. Бұл режимде әр пайдаланушының құрылғысына қосымша орнатудың қажеті жоқ, пайдаланушылар тобы үшін кластерге орталықтандырылған қолжетімділікті конфигурациялауға болады.

- Жергілікті түрде өз компьютеріңізге қосымша ретінде ([Desktop](https://headlamp.dev/docs/latest/installation/desktop/) режимі). Бұл режимде Headlamp іске қосылғанда фонахта жергілікті Headlamp сервері де, қосымша терезесі түріндегі веб-интерфейс де іске қосылады. Бұл режим өнімділігі жоғарырақ және кластермен жеке жұмыс істеуге ең қолайлы.

Толығырақ [Headlamp ресми құжаттамасында](https://headlamp.dev/docs/latest/).

## {heading(Дайындық қадамдары)[id=mk8s-headlamp-in-cluster-prep]}

{tabs}
{tab(Кластерге орнату)}

1. Егер әлі жасалмаса, {linkto(../../instructions/create-cluster/create-webui-gen-2#mk8s-create-webui-gen-2)[text=кластерді жасаңыз]}.
1. {linkto(../kubectl#mk8s-kubectl-check-connection)[text=`kubectl` көмегімен кластерге қосыла алатыныңызға көз жеткізіңіз]}.
1. Кластерге қосылуды жоспарлап отырған хостта `kauthproxy` утилитасы әлі орнатылмаған болса, оны орнатыңыз:

    1. Қажетті нұсқаның архивін [релиздер бетінен](https://github.com/int128/kauthproxy/releases) жүктеңіз:

        * Linux үшін: `kauthproxy_linux_....zip`;
        * macOS үшін: `kauthproxy_darwin_....zip`;
        * Windows үшін: `kauthproxy_windows_....zip`.

    1. Архивті ашыңыз.

    1. Орындалатын файлды `PATH` орта айнымалысына кіретін директорияға орналастырыңыз, мысалы:

        * Linux және macOS үшін: `/usr/local/bin` ішіне;
        * Windows үшін: `C:\` ішіне.

1. Кластерге қосылуды жоспарлап отырған хостта, егер әлі жасалмаса, {linkto(../../install-tools/helm#mk8s-helm)[text=Helm клиентін орнатыңыз]}.

{/tab}

{tab(Жергілікті орнату)}

1. Егер әлі жасалмаса, {linkto(../../instructions/create-cluster/create-webui-gen-2#mk8s-create-webui-gen-2)[text=кластерді жасаңыз]}.
1. {linkto(../../../../tools-for-using-services/api/rest-api/enable-api#rest-api-enable-activate)[text=API арқылы қолжетімділік іске қосылғанына көз жеткізіңіз]}.
1. {linkto(../../concepts/access-management#mk8s-access-management)[text=Single Sign-On (SSO)]} қолданып кластерге қосылу үшін `client-keystone-auth` плагинін орнатыңыз:

   {include(/kz/_includes/_client-keystone-auth.md)}

{/tab}
{/tabs}

## {heading(Headlamp-ті орнату)[id=mk8s-headlamp-install]}

{tabs}
{tab(Кластерге орнату)}

1. Headlamp репозиторийін қосыңыз:

   ```console
   helm repo add headlamp https://kubernetes-sigs.github.io/headlamp/
   helm repo update
   ```

1. `headlamp` атау кеңістігін жасаңыз және оған Headlamp-ті орнатыңыз:

   ```console
   helm install my-headlamp headlamp/headlamp --namespace headlamp --create-namespace
   ```

1. Headlamp орнатылған под іске қосылғанына көз жеткізіңіз:

   ```console
   kubectl get pods -n headlamp
   ```

   Команда шығысында подтың статусы `Running` болуы керек.

Кластерге Headlamp орнатудың басқа тәсілдері [ресми құжаттамада](https://headlamp.dev/docs/latest/installation/in-cluster/) қолжетімді.

{/tab}

{tab(Жергілікті орнату)}

[Ресми құжаттамада](https://headlamp.dev/docs/latest/installation/desktop/) сипатталған тәсілдердің бірімен Headlamp-ті құрылғыңызға орнатыңыз.

{/tab}
{/tabs}

## {heading(Кластерге қосылу)[id=mk8s-headlamp-in-cluster-connect]}

{tabs}
{tab(Кластерге орнату)}

1. Хостта терминалдың бөлек сессиясында команданы орындаңыз:

   ```console
   kauthproxy -n headlamp http://my-headlamp.svc
   ```

   Бұл терминал сессиясын жаппаңыз, әйтпесе Headlamp веб-интерфейсіне қолжетімділік жоғалады.

1. Егер ол `kubeconfig` конфигурация файлына жазылмаса, {var(cloud)} жеке кабинетінің құпиясөзін енгізіңіз. `kauthproxy` бұл құпиясөзді мерзімді түрде қайта сұрайды.

Қосылғаннан кейін Headlamp веб-интерфейсі ашылады.

{/tab}

{tab(Жергілікті орнату)}

{include(/kz/_includes/_kubeconfig.md)[tags=headlamp]}

1. Кластерге қолжетімділіктің құпиясөзін тәсілдердің бірімен көрсетіңіз:

   {tabs}

   {tab(kubeconfig)}

   Бұл тәсіл нақты бір кластерге қосылу үшін құпиясөзді көрсетуге мүмкіндік береді.

   Кластердің конфигурация файлында құпиясөзді көрсетіңіз:

    1. `config.yaml` файлын ашыңыз.
    1. `#` белгісін жойып, жолдардағы түсіндірмесізді алыңыз:

       ```yaml
       # - name: "OS_PASSWORD"

#  value: "put your password here"
       ```
    1. {var(cloud)} жеке кабинетіне авторизацияланғанда пайдаланатын құпиясөзді көрсетіңіз.

   {/tab}

   {tab(Уақытша орта айнымалысы)}

   Бұл тәсіл терминал сессиясында құпиясөзді көрсетуге мүмкіндік береді. Құпиясөзді бірнеше кластерге қосылу үшін пайдалануға болады, бірақ тек сессия жұмыс істеп тұрған уақытта.

   Терминал сессиясын ашып, консольде құпиясөзді көрсетіңіз:

   {tabs}

   {tab(Windows)}

      ```console
      $env:OS_PASSWORD = "<ҚҰПИЯСӨЗ>"
      ```

   Мұнда `<ҚҰПИЯСӨЗ>` — {var(cloud)} жеке кабинетіне авторизациялану үшін сіздің құпиясөзіңіз.

   {/tab}

   {tab(Linux)}

      ```console
      export OS_PASSWORD=<ҚҰПИЯСӨЗ>
      ```

   Мұнда `<ҚҰПИЯСӨЗ>` — {var(cloud)} жеке кабинетіне авторизациялану үшін сіздің құпиясөзіңіз.

   {/tab}

   {/tabs}

   {/tab}

   {tab(Тұрақты орта айнымалысы)}

   Бұл тәсіл пайдаланушының тұрақты айнымалыларында құпиясөзді көрсетуге мүмкіндік береді. Құпиясөзді бірнеше кластерге қосылу үшін, терминал сессиясына тәуелсіз, пайдалануға болады.

   {tabs}

   {tab(Windows)}

    1. Кластерге қосылуды жоспарлап отырған хостта **Пуск** → **Параметрлер** бөлімін ашыңыз.
    1. Іздеу жолынан **Ағымдағы пайдаланушының орта айнымалыларын өзгерту** опциясын таңдаңыз.
    1. **Пайдаланушының орта айнымалылары** терезесінде жаңа айнымалыны қосыңыз:

        * **Аты**: `OS_PASSWORD`;
        * **Мәні**: {var(cloud)} жеке кабинетіне авторизациялану үшін сіздің құпиясөзіңіз.

   {/tab}

   {tab(Linux)}

    1. `~/.bashrc` файлын ашыңыз.
    1. Файлға жолды қосыңыз:

       ```console
       export OS_PASSWORD=<ҚҰПИЯСӨЗ> 
       ```

       Мұнда `<ҚҰПИЯСӨЗ>` — {var(cloud)} жеке кабинетіне авторизациялану үшін сіздің құпиясөзіңіз.

    1. Өзгерістерді сақтаңыз.

   {/tab}

   {tab(macOS)}

    1. `.bashrc` немесе `.zshrc` файлын ашыңыз.
    1. Файлға жолды қосыңыз:

       ```console
       export OS_PASSWORD=<ҚҰПИЯСӨЗ> 
       ```

       Мұнда `<ҚҰПИЯСӨЗ>` — {var(cloud)} жеке кабинетіне авторизациялану үшін сіздің құпиясөзіңіз.

    1. Өзгерістерді сақтаңыз.

   {/tab}

   {/tabs}

   {/tab}

   {/tabs}

1. Headlamp қосымшасын іске қосыңыз. Онда бұрын жүктеп алған конфигурация файлы бар кластердің беті автоматты түрде ашылады. Егер бірненде көп кластерді көрсетсеңіз, қажеттісін қолмен таңдаңыз.

{/tab}
{/tabs}