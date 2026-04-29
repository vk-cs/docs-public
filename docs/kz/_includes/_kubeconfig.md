{includetag(novariables)}
Кластерге қосылу жоспарланып отырған хостта мына әрекеттерді орындаңыз:

1. Кластердің конфигурация файлын жүктеп алыңыз:

    1. Кластерге қосылатын пайдаланушы аккаунтымен [VK Cloud жеке кабинетіне](https://kz.cloud.vk.com/app/) өтіңіз.
    1. Қажетті кластер орналасқан жобаны таңдаңыз.
    1. **Контейнерлер → Кластерлер Kubernetes** бөліміне өтіңіз.
    1. Қажетті кластер үшін ![ ](/kz/assets/more-icon.svg "inline") батырмасын басып, **Кластерге қол жеткізу үшін Kubeconfig алу** тармағын таңдаңыз.

   Конфигурация файлы әрбір жаңа кластер үшін автоматты түрде жасалады және `<кластер атауы>_kubeconfig.yaml` пішіміндегі атауға ие болады.

   Бұдан әрі жүктеп алынған файлдың атауы `kubernetes-cluster-1234_kubeconfig.yaml` және ол `C:\Users\user\.kube` директориясында (Windows үшін) немесе `/home/user/.kube` директориясында (Linux және macOS үшін) орналасқан деп есептеледі. Қажет болса, төменде келтірілген командаларды түзетіңіз.   

1. Конфигурация файлында басқа пайдаланушыларға қолжетімді болмауы тиіс сезімтал ақпарат бар. Сондықтан осы файлға қол жеткізу құқықтарын шектеңіз:

   {tabs}

   {tab(Linux (bash)/macOS (zsh))}

   ```console
   sudo chmod 0600 /home/user/.kube/kubernetes-cluster-1234_kubeconfig.yaml
   ```

   {/tab}

   {tab(Windows (PowerShell))}

   ```console
   icacls.exe 'C:\Users\user\.kube\kubernetes-cluster-1234_kubeconfig.yaml' `
     /c /t `
     /Inheritance:d `
     /Remove:g BUILTIN\Administrators Everyone Users `
     /Grant:r ${env:UserName}:RW
   ```

   {/tab}

   {/tabs}

{/includetag}
{includetag(variables)}

1. Конфигурация файлының жолын `$KUBECONFIG` орта айнымалысында көрсетіңіз:

   {tabs}

   {tab(Linux (bash)/macOS (zsh))}

   ```console
   export KUBECONFIG=/home/user/.kube/kubernetes-cluster-1234_kubeconfig.yaml
   ```

   {/tab}

   {tab(Windows (PowerShell))}

   ```console
   $env:KUBECONFIG = 'C:\Users\user\.kube\kubernetes-cluster-1234_kubeconfig.yaml'
   ```

   {/tab}

   {/tabs}
   
{/includetag}   
