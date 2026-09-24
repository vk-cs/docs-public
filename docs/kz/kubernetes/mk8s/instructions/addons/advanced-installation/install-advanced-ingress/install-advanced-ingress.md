# {heading(Ingress NGINX)[id=mk8s-install-advanced-ingress]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(Дайындық қадамдары)[id=mk8s-install-advanced-ingress-prepare]}

{include(/kz/_includes/_addon-prep.md)}

## {heading(Аддонды орнату)[id=mk8s-install-advanced-ingress-install]}

{note:warn}

Аддонды орнату кезінде ол үшін {linkto(../../../../../../networks/balancing/concepts/load-balancer#balancing-load-balancer-types)[text=стандартты жүктеме теңгергіші]} жасалады. Теңгергішті пайдалану {linkto(../../../../../../networks/vnet/tariffication#vnet-tariffication)[text=тарифтеледі]}.

{/note}

Аддон үшін {linkto(../../../../concepts/addons-and-settings/addons#mk8s-addons-install-features)[text=орнатудың бірнеше нұсқасы]} қолжетімді.

{tabs}

{tab(Стандартты орнату)}

1. Аддонды орнатыңыз:

   {tabs}
   
   {tab(Жеке кабинет)}
      
   1. [Өтіңіз](https://kz.cloud.vk.kz/app/) VK Cloud жеке кабинетіне.
   1. Қажетті кластер орналасқан жобаны таңдаңыз.
   1. **Контейнерлер → Kubernetes кластерлері** бөліміне өтіңіз.
   1. Қажетті кластердің атауын басыңыз.
   1. **Аддондар** қойындысына өтіңіз.
   1. Егер кластерде орнатылған аддондар бұрыннан бар болса, **Аддон қосу** батырмасын басыңыз.
   1. `ingress-nginx` аддонының карточкасындағы **Аддонды орнату** батырмасын басыңыз.
   1. Қажет болса, мыналарды өңдеңіз:

      - қолданба атауын;
      - аддон орнатылатын атаулар кеңістігінің атауын;
      - {linkto(#mk8s-install-advanced-ingress-edit-code)[text=аддонды баптау коды]}.

        {note:warn}

        Қате берілген баптау коды орнату кезінде қателерге немесе аддонның жұмыс істемеуіне әкелуі мүмкін.

        {/note}

   1. **Аддонды орнату** батырмасын басыңыз.

      Кластерге аддонды орнату басталады. Бұл процесс ұзақ уақыт алуы мүмкін.

   {/tab}
   
<!-- удалена таба Terraform, при работе над задачей по TF забрать её из k8s и подставить нужные значения -->

   {/tabs}

1. {linkto(#mk8s-install-advanced-ingress-get-ip)[text=Теңгергіштің IP мекенжайын алыңыз]}.

{/tab}

{tab(Бөлінген worker-түйіндерге орнату)}

1. Егер бұл әлі жасалмаса, аддонды орнату үшін бөлінген worker-түйіндер тобын дайындаңыз:

   {tabs}
   
   {tab(Жеке кабинет)}
      
   1. [Өтіңіз](https://kz.cloud.vk.kz/app/) VK Cloud жеке кабинетіне.
   1. Қажетті кластер орналасқан жобаны таңдаңыз.
   1. **Контейнерлер → Kubernetes кластерлері** бөліміне өтіңіз.
   1. Тізімнен қажетті кластерді табыңыз.

   1. Кластерде аддондар орналастырылатын бөлінген worker-түйіндер тобы бар екеніне көз жеткізіңіз.

      Егер мұндай топ жоқ болса — {linkto(../../../manage-node-group#mk8s-manage-node-group-add-group)[text=оны қосыңыз]}.

   1. Егер бұл әлі жасалмаса, осы түйіндер тобы үшін {linkto(../../../manage-node-group#mk8s-manage-node-group-labels-taints)[text=мына мәндерді орнатыңыз]}:

      - **Белгіні (label)**: `addonNodes` кілті, `dedicated` мәні.
      - **Шектеуді (taint)**: `NoSchedule` әсері, `addonNodes` кілті, `dedicated` мәні.

   {/tab}

   {/tabs}

1. Аддонды орнатыңыз:

   {tabs}
   
   {tab(Жеке кабинет)}
      
   1. [Өтіңіз](https://kz.cloud.vk.kz/app/) VK Cloud жеке кабинетіне.
   1. Қажетті кластер орналасқан жобаны таңдаңыз.
   1. **Контейнерлер → Kubernetes кластерлері** бөліміне өтіңіз.
   1. Қажетті кластердің атауын басыңыз.
   1. **Аддондар** қойындысына өтіңіз.
   1. Егер кластерде орнатылған аддондар бұрыннан бар болса, **Аддон қосу** батырмасын басыңыз.
   1. `ingress-nginx` аддонының карточкасындағы **Аддонды орнату** батырмасын басыңыз.
   1. Қажет болса, мыналарды өңдеңіз:

      - қолданба атауын;
      - аддон орнатылатын атаулар кеңістігінің атауын;
      - {linkto(#mk8s-install-advanced-ingress-edit-code)[text=аддонды баптау коды]}.

   1. Аддонды баптау кодында қажетті ерекшеліктерді (tolerations) және түйін селекторларын (nodeSelector) орнатыңыз:

      {tabs}
      
      {tab(Ерекшеліктер)}
            
      ```yaml
      tolerations:
        - key: "addonNodes"
          operator: "Equal"
          value: "dedicated"
          effect: "NoSchedule"
      ```

      Бұл ерекшелікті мына өрістер үшін орнатыңыз:

      - `controller.tolerations`;
      - `defaultBackend.tolerations`.

      {/tab}
      
      {tab(Түйін селекторлары)}
      
      ```yaml
      nodeSelector:
        addonNodes: dedicated
      ```

      Бұл селекторды мына өрістер үшін орнатыңыз:

      - `controller.nodeSelector`;
      - `defaultBackend.nodeSelector`.

      {/tab}

      {/tabs}

      {note:warn}

      Қате берілген баптау коды орнату кезінде қателерге немесе аддонның жұмыс істемеуіне әкелуі мүмкін.

      {/note}

   1. **Аддонды орнату** батырмасын басыңыз.

      Кластерге аддонды орнату басталады. Бұл процесс ұзақ уақыт алуы мүмкін.

   {/tab}

<!-- удалена таба Terraform, при работе над задачей по TF забрать её из k8s и подставить нужные значения -->

   {/tabs}

1. {linkto(#mk8s-install-advanced-ingress-get-ip)[text=Теңгергіштің IP мекенжайын алыңыз]}.

{/tab}

{tab(Жылдам орнату)}

{note:info}

Жылдам орнату кезінде аддонды баптау коды өңделмейді. Floating IP мекенжайы бар жүктеме теңгергіші жасалады, ал Ingress-контроллер интернеттен қолжетімді болады.

Егер бұл сізге сәйкес келмесе, **стандартты орнатуды** немесе **бөлінген worker-түйіндерге орнатуды** орындаңыз.

{/note}

1. Аддонды орнатыңыз:

   {tabs}
   
   {tab(Жеке кабинет)}
      
   1. [Өтіңіз](https://kz.cloud.vk.kz/app/) VK Cloud жеке кабинетіне.
   1. Қажетті кластер орналасқан жобаны таңдаңыз.
   1. **Контейнерлер → Kubernetes кластерлері** бөліміне өтіңіз.
   1. Қажетті кластердің атауын басыңыз.
   1. **Аддондар** қойындысына өтіңіз.
   1. Егер кластерде орнатылған аддондар бұрыннан бар болса, **Аддон қосу** батырмасын басыңыз.
   1. `ingress-nginx` аддонының карточкасындағы **Аддонды орнату** батырмасын басыңыз.
   1. Қажет болса, мыналарды өңдеңіз:

      - қолданба атауын;
      - аддон орнатылатын атаулар кеңістігінің атауын;

   1. **Аддонды орнату** батырмасын басыңыз.

      Кластерге аддонды орнату басталады. Бұл процесс ұзақ уақыт алуы мүмкін.

   {/tab}
   
<!-- удалена таба Terraform, при работе над задачей по TF забрать её из k8s и подставить нужные значения -->

   {/tabs}

1. {linkto(#mk8s-install-advanced-ingress-get-ip)[text=Теңгергіштің IP мекенжайын алыңыз]}.

{/tab}

{/tabs}

## {heading(Орнату кезінде аддонды баптау кодын өңдеу)[id=mk8s-install-advanced-ingress-edit-code]}

{note:info}
- Аддон кодын өңдеу стандартты орнатуға және бөлінген worker-түйіндерге орнатуға қолданылады.
- Өрістер сипаттамасымен бірге аддонды баптаудың толық коды [GitHub](https://github.com/kubernetes/ingress-nginx/blob/main/charts/ingress-nginx/values.yaml)-та қолжетімді.
{/note}

### {heading(Ingress-контроллер үшін теңгергіш түрін өзгерту)[id=mk8s-install-advanced-ingress-change-balancer]}

Аддонды әдепкі параметрлермен орнатқанда Floating IP мекенжайы бар жүктеме теңгергіші жасалады, ал Ingress-контроллер интернеттен қолжетімді болады.

Ingress-контроллер интернеттен қолжетімді болмауы үшін ішкі жүктеме теңгергіші жасалатын аннотацияны көрсетіңіз:

```yaml
---
service:
  annotations:
    {
      "loadbalancer.openstack.org/proxy-protocol": "true",
      "service.beta.kubernetes.io/openstack-internal-load-balancer": "true",
    }
```

Кодты өңдегеннен кейін {linkto(#mk8s-install-advanced-ingress-install)[text=аддонды орнатуды жалғастырыңыз]}.

### {heading(Autoscaler модулі арқылы Ingress-контроллер түйінін жоюға тыйым салу)[id=mk8s-install-advanced-ingress-delete-prohibition]}

Autoscaler модулі кластерді автоматты түрде масштабтайды: жүктеме артқанда түйіндерді қосады, азайғанда — жояды. Модульге аддон поды жұмыс істеп тұрған түйінді жоюға тыйым салу үшін под аннотациясында жоюға тыйым көрсету керек:

```yaml
controller:
  podAnnotations:
    cluster-autoscaler.kubernetes.io/safe-to-evict: "false"
```

Кодты өңдегеннен кейін {linkto(#mk8s-install-advanced-ingress-install)[text=аддонды орнатуды жалғастырыңыз]}.

## {heading(Теңгергіштің IP мекенжайын алу)[id=mk8s-install-advanced-ingress-get-ip]}

{note:info}

Төменде `ingress-nginx` сервисінің атауы және `ingress-nginx` атаулар кеңістігі пайдаланылады. Егер аддонды қосу кезінде басқа параметрлер таңдалған болса, командаларды түзетіңіз.

{/note}

{tabs}

<!-- удалена таба Kubernetes Dashboard. раскомментировать для Headlamp: забрать шаги и k8s с заменой на Headlamp или удалить -->

{tab(kubectl)}

1. `kubectl` көмегімен кластерге қосыла алатыныңызға {linkto(../../../../connect/kubectl#mk8s-kubectl-check-connection)[text=көз жеткізіңіз]}.

1. Команданы орындаңыз:

   ```console
   kubectl get svc ingress-nginx-controller -n ingress-nginx
   ```

   `EXTERNAL-IP` бағанында теңгергішке тағайындалған Floating IP мекенжайы көрсетіледі.

{/tab}

{/tabs}