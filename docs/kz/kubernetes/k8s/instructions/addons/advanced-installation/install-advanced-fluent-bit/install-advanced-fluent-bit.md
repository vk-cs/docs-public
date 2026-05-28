{include(/kz/_includes/_translated_by_ai.md)}

{note:info}
Бұл аддон тек [бірінші буындағы](/kz/kubernetes/k8s/concepts/cluster-generations) кластерлер үшін қолжетімді.
{/note}

## Дайындық қадамдары

{include(/kz/_includes/_addon-prep.md)}

## Аддонды орнату

Аддон үшін тек [стандартты орнату нұсқасы](../../../../concepts/addons-and-settings/addons#addondardy_ornatu_erekshelikteri) қолжетімді.

Аддон master-түйіндерді қоса алғанда, кластердің барлық түйіндеріне [DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/) контроллері түрінде орнатылады.

   {tabs}
   
   {tab(Жеке кабинет)}
      
   1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
   1. Қажетті кластер орналасқан жобаны таңдаңыз.
   1. **Контейнерлер → Kubernetes кластерлері** бөліміне өтіңіз.
   1. Қажетті кластердің атауын басыңыз.
   1. **Аддондар** қойындысына өтіңіз.
   1. Егер кластерде орнатылған аддондар бұрыннан бар болса, **Аддон қосу** батырмасын басыңыз.
   1. `fluent-bit` аддонының карточкасындағы **Орнату** батырмасын басыңыз.
   1. Ашылмалы тізімнен аддонның қажетті нұсқасын таңдаңыз.
   1. **Аддонды орнату** батырмасын басыңыз.
   1. (Опционалды түрде) Мыналарды өңдеңіз:

      - таңдалған нұсқаны;
      - қолданба атауын;
      - аддон орнатылатын атаулар кеңістігінің атауын.
   1. [Аддонды баптау кодын](#ornatu_kezinde_addondy_baptau_kodyn_ondeu) өңдеңіз: `Output` бөлімінде журналдарды таңдалған сервиске жеткізу параметрлерін орнатыңыз. Қалған параметрлерді өз қалауыңыз бойынша қалдырыңыз.

        {note:warn}

        Қате берілген баптау коды орнату кезінде қателерге немесе аддонның жұмыс істемеуіне әкелуі мүмкін.

        {/note}

   1. **Аддонды орнату** батырмасын басыңыз.

      Кластерге аддонды орнату басталады. Бұл процесс ұзақ уақыт алуы мүмкін.

   {/tab}
   
   {tab(Terraform)}
   
   1. Егер бұл әлі жасалмаса, [Terraform орнатып, ортаны баптаңыз](/kz/tools-for-using-services/terraform/quick-start).
   1. Кластерді сипаттайтын Terraform конфигурация файлдарыңызғал мыналарды қосыңыз:

      - ресурс [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md);
      - деректер көзі [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md);
      - деректер көзі [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md).

      Қажет болса, сілтемелерде келтірілген ресурстар мен дереккөздерді пайдалану мысалдарын өз міндетіңізге және Terraform конфигурацияңызғал бейімдеңіз. Мысалы, `vkcs_kubernetes_addon` ресурсын өзгерту арқылы аддонды баптау кодын өңдей аласыз.

      {note:warn}
      Қате берілген баптау коды орнату кезінде қателерге немесе аддонның жұмыс істемеуіне әкелуі мүмкін.
      {/note}

   1. Конфигурация файлдарының дұрыс екенін және қажетті өзгерістерді қамтитынын тексеріңіз:

      ```console
      terraform validate && terraform plan
      ```

   1. Өзгерістерді қолданыңыз:

      ```console
      terraform apply
      ```

   {/tab}
   
   {/tabs}

## Орнату кезінде аддонды баптау кодын өңдеу

Өрістер сипаттамасымен бірге аддонды баптаудың толық коды мына жерлерде қолжетімді:

- жеке кабинетте;
- егер Terraform қолданылса, `configuration_values` дереккөзіндегі [configuration_values](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md) атрибутында.

Аддонды баптау кодын өңдемей орнату мүмкін емес — журналдарды жеткізу параметрлерін міндетті түрде орнату керек:

1. Кодтың `Output` бөлімінде таңдалған сервиске жеткізу параметрлерін орнатыңыз.

   {cut(Elasticsearch-ке журналдарды жеткізуді баптау мысалы)}

   <!-- prettier-ignore -->
   ```yaml
   outputs: |
      [OUTPUT]
         Name es
         Match k8s.*
         Host XX.XX.XX.XX
         Logstash_Format On
         Logstash_Prefix k8s
         Logstash_Prefix_Key $kubernetes['pod_name']
         Retry_Limit False
         TLS off
         TLS.debug 4
         TLS.verify off
         Suppress_Type_Name on
         Trace_Error On
         Trace_Output Off
         Replace_Dots On

      [OUTPUT]
         Name es
         Match host.*
         Host XX.XX.XX.XX
         Logstash_Format On
         Logstash_Prefix host
         Logstash_Prefix_Key $_HOSTNAME
         Retry_Limit False
         TLS off
         TLS.debug 4
         TLS.verify off
         Suppress_Type_Name on
         Trace_Error On
         Trace_Output Off
         Replace_Dots On
   ```
   Elasticsearch параметрлері туралы толық алқпаратты [ресми құжаттаманың бөлімінен](https://docs.fluentbit.io/manual/pipeline/outputs/elasticsearch) оқыңыз.

   {/cut}

   {cut(Loki-ге журналдарды жеткізуді баптау мысалы)}

   <!-- prettier-ignore -->
   ```yaml
   outputs: |
      [OUTPUT]
         Name loki
         host XX.XX.XX.XX
         match k8s.*
         labels source=kubernetes, pod=$kubernetes['pod_name'], namespace=$kubernetes['namespace_name']

      [OUTPUT]
         Name loki
         host XX.XX.XX.XX
         match host.*
         labels source=systemd, host=$_HOSTNAME, service=$_SYSTEMD_UNIT
   ```

   Loki параметрлері туралы толық алқпаратты [Fluent Bit ресми құжаттамасынан](https://docs.fluentbit.io/manual/pipeline/outputs/loki) оқыңыз.

   {/cut}

1. (Опционалды түрде) Баптау кодының басқал параметрлерін өңдеңіз. Конфигурация файлының параметрлері туралы толығырақ [Fluent Bit ресми құжаттамасынан](https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/classic-mode/configuration-file) оқыңыз. Сондай-алқ [GitHub](https://github.com/fluent/helm-charts/blob/main/charts/fluent-bit/values.yaml)-та Fluent Bit баптау кодының мысалы қолжетімді.

   {note:warn}

   Аддонды дұрыс орнату және оның жұмыс істеуі үшін қажет өрістерді немесе сол өрістерде берілген мәндерді өшірмеңіз.

   Аддонды баптау кодында мұндай өрістерді табуғал мүмкіндік беретін түсіндірмелер бар.

   {/note}

1. По завершении редактирования кода [аддонды орнатуды жалғастырыңыз](#addondy_ornatu).

Пайплайн туралы толығырақ [ресми құжаттамадан](https://docs.fluentbit.io/manual/pipeline) оқуғал болады.