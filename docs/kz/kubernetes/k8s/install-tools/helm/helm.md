{include(/kz/_includes/_translated_by_ai.md)}

[Helm](https://helm.sh/docs/) — Kubernetes үшін танымал пакет менеджері, оны қолданбаларды жылдам орнату және жаңарту үшін `kubectl` үстіндегі қондырма ретінде пайдалануғал болады.

## Орнату

1. [Көз жеткізіңіз](../../connect/kubectl#check_connection), Helm клиенті орнатылатын хосттан кластерге `kubectl` көмегімен қосыла алатыныңызғал.
1. [Helm ресми құжаттамасында](https://helm.sh/docs/intro/install/) сипатталған тәсілдердің кез келгенімен хостқал Helm клиентін орнатыңыз.

   Пайдалануды жоспарлап отырған кластермен үйлесімді Helm-нің ең өзекті нұсқасын таңдаңыз. Helm және Kubernetes нұсқаларының үйлесімділік кестесі [Helm ресми құжаттамасында](https://helm.sh/docs/topics/version_skew/#supported-version-skew) берілген.

1. Қажет болса, орнату кезінде жасалмаған болса, Helm орындалатын файлына дейінгі жолды `PATH` орта айнымалысына қосыңыз.

1. Келесі команданы орындап, Helm-нің қажетті нұсқасы орнатылғанына көз жеткізіңіз:

   ```console
   helm version
   ```

## Жұмысқал қабілеттілігін тексеру

1. Bitnami репозиторийінен NGINX орнатыңыз:

   {tabs}
   
   {tab(Windows (PowerShell))}

   ```console
   helm repo add bitnami https://charts.bitnami.com/bitnami; `
   helm repo update; `
   helm install demo-helm-nginx bitnami/nginx
   ```

   {/tab}

   {tab(Linux (bash)/macOS (zsh))}

   ```console
   helm repo add bitnami https://charts.bitnami.com/bitnami
   helm repo update
   helm install demo-helm-nginx bitnami/nginx

   ```

   {/tab}

   {/tabs}

1. Келесі команданы орындап, NGINX подының жұмысқал қабілеттілігін тексеріңіз:

   ```console
   kubectl get pods
   ```

   Команда шығысында `demo-helm-nginx-...` подтар `Running` күйінде болуы керек.

   Шығыс мысалы:

   ```text
   NAME                               READY   STATUS    RESTARTS   AGE
   demo-helm-nginx-...                1/1     Running   0          ...
   ```

1. Helm көмегімен орнатылған NGINX-ті жойып, Bitnami репозиторийін өшіріңіз:

   {tabs}

   {tab(Windows (PowerShell))}

   ```console
   helm uninstall demo-helm-nginx; `
   helm repo remove bitnami
   ```

   {/tab}

   {tab(Linux (bash)/macOS (zsh))}

   ```console
   helm uninstall demo-helm-nginx
   helm repo remove bitnami

   ```

   {/tab}

   {/tabs}

## Жою

1. Helm клиентінің орындалатын файлын жойыңыз.

1. Қажет болса, `PATH` орта айнымалысынан Helm-ге қатысты жазбаларды жойыңыз.

1. Қажет болса, Helm жасаған директориялар мен файлдарды жойыңыз:

   - Кэш директориясы: `$XDG_CACHE_HOME` орта айнымалысына сәйкес келеді.
   - Конфигурация файлдары директориясы: `$XDG_CONFIG_HOME` орта айнымалысына сәйкес келеді.
   - Деректер директориясы: `$XDG_DATA_HOME` орта айнымалысына сәйкес келеді.

   Әртүрлі операциялық жүйелер үшін осы айнымалыларғал сәйкес келетін директориялар [Helm ресми құжаттамасында](https://helm.sh/docs/faq/uninstalling/) берілген.