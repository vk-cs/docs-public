# {heading(cert-operator пайдалану)[id=mk8s-cert-operator]}

{include(/kz/_includes/_translated_by_ai.md)}

Өздігінен қол қойылған сертификаттары бар контейнер тізілімдерінен образдарды жүктеу үшін {linkto(../../concepts/addons-and-settings/addons#mk8s-addons-cert-operator)[text=cert-operator]} аддонын пайдаланыңыз. Аддон тізілімге сенімді өзі қамтамасыз етеді.

## {heading(Дайындық қадамдары)[id=mk8s-cert-operator-prepare]}

{include(/kz/_includes/_create-test-cluster.md)}
1. `kubectl` көмегімен кластерге {linkto(../../connect/kubectl#mk8s-kubectl)[text=қосыла алатыныңызға көз жеткізіңіз]}.
1. Егер бұл әлі жасалмаған болса, {linkto(../../instructions/addons/advanced-installation/install-advanced-cert-operator#mk8s-install-advanced-cert-operator)[text=cert-operator аддонын орнатыңыз]}.
1. Тізілімнің CA-сертификатын PEM пішімінде дайындаңыз. Тізбек қажет болса, бірнеше сертификатты қатарынан біріктіріңіз.

   Аддон тек CA-сертификаттармен және олардың тізбектерімен жұмыс істейді. Клиенттік сертификаттар, жабық кілттер және өзара TLS аутентификациясы (mutual TLS, mTLS) пайдаланылмайды.

## {heading({counter(cert-operator)}. RegistryCertificate объектін жасаңыз)[id=mk8s-cert-operator-create]}

1. Тізілімнің CA-сертификатын сипаттайтын `RegistryCertificate` түріндегі объект — `registry-certificate.yaml` манифестін жасаңыз:

   ```yaml
   apiVersion: crio.registry/v1alpha1
   kind: RegistryCertificate
   metadata:
     name: <ОБЪЕКТ_АТАУЫ>
   spec:
     host: <ТІЗІЛІМ_МЕКЕНЖАЙЫ>
     certificate: |
       -----BEGIN CERTIFICATE-----
       <СЕРТИФИКАТ_МАЗМҰНЫ>
       -----END CERTIFICATE-----
   ```

   Мұнда:

   - `<ОБЪЕКТ_АТАУЫ>` — кез келген бірегей атау. Объект бүкіл кластерге қатысты, сондықтан атаулар кеңістігі көрсетілмейді.
   - `<ТІЗІЛІМ_МЕКЕНЖАЙЫ>` — тізілімнің `host[:port]` пішіміндегі мекенжайы, мысалы, `registry.example.com:5000`.

      Тізілімнің бір мекенжайы үшін бірнеше объект жасалса, әліпби бойынша бірінші объект қолданылады. Объектідегі тізілім мекенжайы қате болса, объект қолданылмайды.

   - `<СЕРТИФИКАТ_МАЗМҰНЫ>` — CA-сертификаттың мазмұны.

      Объектідегі сертификат қате болса, ол қолданылмайды. Егер осы тізілім үшін бұрын CA-сертификат қолданылған болса, ол өзгеріссіз қалады.

1. Жасалған манифесті кластерде қолданыңыз:

   ```console
   kubectl apply -f registry-certificate.yaml
   ```

   Аддон CA-сертификатты барлық worker-түйіндерге тасымалдайды. Әдепкіде бұл 30 секундтан аспайды. Кейінірек объектідегі CA-сертификатты өзгертсеңіз, аддон түйіндердегі бұрынғы сертификатты жаңасымен ауыстырады.

## {heading({counter(cert-operator)}. Аддон жұмысын тексеріңіз)[id=mk8s-cert-operator-check]}

Аддонның CA-сертификатты қолданғанына мына команданы орындау арқылы көз жеткізіңіз:

```console
kubectl describe regcert <ОБЪЕКТ_АТАУЫ>
```

Әр worker-түйін үшін CA-сертификатты қолдану күйі `State` өрісінде көрсетіледі:

- `Synced` — CA-сертификат қолданылды.
- `Failed` — CA-сертификат қолданылмады. Себебі `Message` өрісінде көрсетілген.

`cert-operator` көмегімен CA-сертификаттарды қолданудың ерекшеліктері мен шектеулері туралы толығырақ {linkto(../../concepts/addons-and-settings/addons#mk8s-addons-cert-operator)[text=Аддондар]} бөлімінен оқыңыз.

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=mk8s-cert-operator-delete]}

Жұмыс істеп тұрған кластер тарифтеледі және есептеу ресурстарын тұтынады. Егер cert-operator аддонының жұмысын тексеру үшін жасалған Kubernetes ресурстары енді қажет болмаса, оларды жойыңыз:

1. `RegistryCertificate` объектін жойыңыз:

   ```console
   kubectl delete regcert <ОБЪЕКТ_АТАУЫ>
   ```

   Аддон CA-сертификатты worker-түйіндерден жояды. Нәтижесінде CA-сертификат қолданылмайды, ал тізілім сенімді болудан қалады.

1. (Қосымша) {linkto(../../instructions/addons/manage-addons#mk8s-manage-addons-delete)[text=Аддонды жойыңыз]}.

   Түйіндерге бұрыннан жазылған CA-сертификаттар қалады, бірақ `RegistryCertificate` объектілерін синхрондау тоқтайды. Синхрондауды жалғастыру үшін аддонды қайта {linkto(../../instructions/addons/advanced-installation/install-advanced-cert-operator#mk8s-install-advanced-cert-operator)[text=орнату]} қажет болады.

{include(/kz/_includes/_delete-test-cluster-short.md)}
