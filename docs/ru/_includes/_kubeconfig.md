{includetag(novariables)}
Выполните действия на хосте, с которого планируется подключаться к кластеру:

1. Загрузите файл конфигурации кластера:

    1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud под аккаунтом пользователя, который будет подключаться к кластеру.
    1. Выберите проект, где находится нужный кластер.
    1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
    1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного кластера и выберите пункт **Получить Kubeconfig для доступа к кластеру**.

   Файл конфигурации автоматически создается для каждого нового кластера и имеет имя в формате `<имя кластера>_kubeconfig.yaml`.

   Далее предполагается, что загруженный файл имеет имя `kubernetes-cluster-1234_kubeconfig.yaml` и находится в директории `C:\Users\user\.kube` (для Windows) или `/home/user/.kube` (для Linux и macOS). Скорректируйте приведенные ниже команды при необходимости.   

1. Файл конфигурации содержит чувствительную информацию, которая не должна быть доступна другим пользователям. Поэтому ограничьте права доступа к этому файлу:

   <tabs>
   <tablist>
   <tab>Windows (PowerShell)</tab>
   <tab>Linux (bash)/macOS (zsh)</tab>
   </tablist>
   <tabpanel>

   ```powershell
   icacls.exe 'C:\Users\user\.kube\kubernetes-cluster-1234_kubeconfig.yaml' `
     /c /t `
     /Inheritance:d `
     /Remove:g BUILTIN\Administrators Everyone Users `
     /Grant:r ${env:UserName}:RW
   ```

   </tabpanel>
   <tabpanel>

   ```bash
   sudo chmod 0600 /home/user/.kube/kubernetes-cluster-1234_kubeconfig.yaml
   ```

   </tabpanel>
   </tabs>

{/includetag}
{includetag(variables)}

1. Поместите путь к файлу конфигурации в переменную среды окружения `$KUBECONFIG`:

   <tabs>
   <tablist>
   <tab>Windows (PowerShell)</tab>
   <tab>Linux (bash)/macOS (zsh)</tab>
   </tablist>
   <tabpanel>

   ```powershell
   $env:KUBECONFIG = 'C:\Users\user\.kube\kubernetes-cluster-1234_kubeconfig.yaml'
   ```

   </tabpanel>
   <tabpanel>

   ```bash
   export KUBECONFIG=/home/user/.kube/kubernetes-cluster-1234_kubeconfig.yaml
   ```

   </tabpanel>
   </tabs>
{/includetag}   