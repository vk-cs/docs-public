# {heading(Пайдалану External Secrets Operator)[id=k8s-external-secrets-operator]}

{include(/kz/_includes/_translated_by_ai.md)}

{linkto(../../concepts/addons-and-settings/addons#k8s-addons-eso)[text=External Secrets Operator]} аддонын қолданып, VK Cloud [құпия менеджері](/ru/security/secret-manager/concepts/about#sm-about "change-lang") сақталған Kubernetes секреттерімен синхронизацияны баптаңыз.

{note:info} 
External Secrets Operator тек {linkto(/kz/kubernetes/k8s/concepts/cluster-generations#k8s-cluster-generations)[text=екінші буын]} кластерлері үшін қолжетімді.
{/note}

## {heading(Дайындық қадамдары)[id=k8s-eso-prepare]}

1. {linkto(../../instructions/create-cluster/create-webui-gen-2#k8s-create-webui-gen-2)[text=Жоқ болса]} жаңа нұсқасы бар кластер жасаңыз.
1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Орнатыңыз және баптаңыз]} kubectl, егер бұрын жасалмаған болса.
1. {linkto(../../connect/kubectl#k8s-kubectl-check-connection)[text=Қосылыңыз]} kubectl арқылы кластерге.
1. {linkto(../../instructions/addons/advanced-installation/install-advanced-eso#k8s-install-advanced-eso)[text=External Secrets Operator аддонын орнатыңыз]}, егер бұрын жасалмаған болса.
1. {linkto(../../../../tools-for-using-services/api/rest-api/enable-api#rest-api-enable-activate)[text=API арқылы қолжетімділікті қосыңыз]}, егер бұрын жасалмаған болса.

## {heading({counter(eso)}. Секрет менеджерінде секрет жасаңыз)[id=k8s-eso-kms]}

[Жасаңыз](/ru/security/secret-manager/instructions/manage-secret#sm-manage-create "change-lang") `external-secret` идентификаторы бар секретті VK Cloud секреттер менеджерінде және оған кез келген кілттерді қосыңыз.

## {heading({counter(eso)}. Kubernetes секретін жасаңыз)[id=k8s-eso-create]}

1. `external-secrets-operator` namespace жасаңыз, егер бұрын жасалмаған болса:

   ```console
   kubectl create namespace external-secrets-operator
   ```

1. VK Cloud секреттер менеджеріне қол жеткізу паролін сақтайтын `password.yaml` манифестін жасаңыз:

   ```yaml
   apiVersion: v1
   kind: Secret
   metadata:
     name: password
     namespace: external-secrets-operator
   type: Opaque
   data:
     password: <ПАРОЛЬ_ОТ_ЛК>
   ```

   Мұнда `<ПАРОЛЬ_ОТ_ЛК>` — VK Cloud жеке кабинетіңіздің паролі base64 кодтауымен.

1. Жасалған манифестті кластерде қолданыңыз:

   ```console
   kubectl apply -f password.yaml
   ```

## {heading({counter(eso)}. SecretStore жасаңыз)[id=k8s-eso-store]}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. Беттің басындағы пайдаланушы атына басып, **Жоба параметрлері** таңдаңыз.
1. **API арқылы қолжетімділік** бетіне өтіп, келесі мәндерді көшіріп алыңыз:

    - **Project ID**;
    - **User Domain Name**;
    - **Username**.

1. `secretstore.yaml` манифестін жасаңыз — `SecretStore` типті объект, бұл VK Cloud секреттер менеджеріне қалай қосылу керектігін сипаттайды:

   ```yaml
   apiVersion: external-secrets.io/v1
   kind: SecretStore
   metadata:
     name: secret-store
     namespace: external-secrets-operator
   spec:
     provider:
       vk:
         projectID: <PROJECT_ID>
         url: <AUTH_URL>
         auth:
           domain: <USER_DOMAIN_NAME>
           username: <USERNAME>
           password:
             key: password
             name: password
      ```

   Мұнда:

    - `<PROJECT_ID>`, `<USER_DOMAIN_NAME>` және `<USERNAME>` — жоба параметрлерінен көшіріп алған мәндеріңіз.
    - `<AUTH_URL>` — аймаққа байланысты {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=мекенжай]}:
        - `https://msk.cloud.vk.com` Мәскеу аймағы үшін;
        - `https://kz.cloud.vk.com` Қазақстан аймағы үшін.

1. Жасалған манифестті кластерде қолданыңыз:

   ```console
   kubectl apply -f secretstore.yaml
   ```

## {heading({counter(eso)}. ExternalSecret жасаңыз)[id=k8s-eso-external]}

1. `externalsecret.yaml` манифестін жасаңыз — `ExternalSecret` типті объект, бұл секретті қай `SecretStore`-дан жүктеу керектігін және оны қалай жаңарту керектігін сипаттайды:

   ```yaml
   apiVersion: external-secrets.io/v1
   kind: ExternalSecret
   metadata:
     name: external-secret
     namespace: external-secrets-operator
   spec:
     refreshInterval: 5m
     secretStoreRef:
       name: secret-store
       kind: SecretStore
     target:
       name: external-secret
       creationPolicy: Owner
     data:
       - secretKey: <ИМЯ_КЛЮЧА_В_СЕКРЕТЕ>
         remoteRef:
           key: <ID_СЕКРЕТА>
           property: <КЛЮЧ_СЕКРЕТА>
   ```   

   Мұнда:

    - `<ИМЯ_КЛЮЧА_В_СЕКРЕТЕ>` — жасалатын Kubernetes секретіндегі кілт аты. Мысалы: `password`.
    - `<ID_СЕКРЕТА>` — VK Cloud секреттер менеджерінде бұрын [жасаған](#k8s-eso-kms) секретіңіздің идентификаторы.
    - `<КЛЮЧ_СЕКРЕТА>` — VK Cloud секреттер менеджеріндегі секреттегі кілт, оның мәнін Kubernetes секретімен синхронизациялау қажет.

   Мысалы, VK Cloud секреттер менеджерінде `external-secret` идентификаторы бар секретте мынадай жұптар сақталады: `key1: value1`, `key2: value2`, `key3: value3`. Егер Kubernetes секретінде `value2` мәні жаңартылсын деп қаласаңыз, `property` өрісіне `key2` жазыңыз:

   ```yaml
   key: external-secret
   property: key2
   ```

1. Жасалған манифестті кластерде қолданыңыз:

   ```console
   kubectl apply -f externalsecret.yaml
   ```

Kubernetes-те `external-secret` аты бар жаңа `Secret` типті объект жасалады. Аддон әр бес минут сайын VK Cloud секреттер менеджеріндегі секреттегі көрсетілген өрістің мәнін тексереді. Егер мән өзгерсе, аддон оны автоматты түрде Kubernetes секретінде жаңартады.

## {heading({counter(eso)}. Барлық секрет кілттерін синхронизациялау үшін ExternalSecret жасаңыз)[id=k8s-eso-secrets-all]}

1. `externalsecretall.yaml` манифестін жасаңыз. Оның көмегімен VK Cloud секреттер менеджерінде жасаған секретіңізден барлық жұп мәндерді синхронизациялай аласыз.

   ```yaml
   apiVersion: external-secrets.io/v1
   kind: ExternalSecret
   metadata:
     name: external-secret-all
     namespace: external-secrets-operator
   spec:
     refreshInterval: 5m
     secretStoreRef:
       name: secret-store
       kind: SecretStore
     target:
       name: external-secret-all
       creationPolicy: Owner
     dataFrom:
       - extract:
           key: <ID_СЕКРЕТА>
   ```

1. Жасалған манифестті кластерде қолданыңыз:

   ```console
   kubectl apply -f externalsecretall.yaml
   ```

Kubernetes-те `external-secret-all` аты бар жаңа `Secret` типті объект жасалады. Аддон әр бес минут сайын VK Cloud секреттер менеджеріндегі секреттің барлық кілттерінің мәнін тексереді. Егер олардың мәндері өзгерсе, аддон оларды автоматты түрде Kubernetes секретінде жаңартады.

## {heading({counter(eso)}. Аддон жұмысын тексеріңіз)[id=k8s-eso-check]}

1. External Secrets Operator секреттерді синхронизалағанын мына командамен тексеріңіз:

   ```console
   kubectl -n external-secrets-operator get secret
   ```

   Команда шығысында бұрын жасалған `external-secret` және `external-secret-all` аты бар секреттер болуы керек:

   ```text
   NAME                       TYPE     DATA    AGE
   external-secret            Opaque   1       ...
   external-secret-all        Opaque   2       ...
   external-secrets-webhook   Opaque   4       ...
   password                   Opaque   1       ...
   ```

1. Секреттердің мазмұнын қараңыз:

   ```console
   kubectl -n external-secrets-operator get secret external-secret -o yaml
   kubectl -n external-secrets-operator get secret external-secret-all -o yaml
   ``` 

## {heading(Қолданылмайтын ресурстарды жойыңыз)[id=k8s-eso-delete]}

Жұмыс істеп тұрған кластер тарификацияланады және есептеу ресурстарын тұтынады. Егер External Secrets Operator аддонының жұмысын тексеру үшін жасалған Kubernetes ресурстары сізге қажет болмаса, оларды жойыңыз:

1. `external-secrets-operator` namespace және оған байланысты ресурстарды жойыңыз:

   ```console
   kubectl delete namespace external-secrets-operator
   ```

{include(/kz/_includes/_delete-test-cluster-short.md)}