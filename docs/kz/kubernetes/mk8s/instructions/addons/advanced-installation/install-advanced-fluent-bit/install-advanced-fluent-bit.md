# {heading(Fluent Bit)[id=mk8s-install-advanced-fluent-bit]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(Дайындық қадамдары)[id=mk8s-install-advanced-fluent-bit-prep]}

{include(/kz/_includes/_addon-prep.md)}

## {heading(Аддонды орнату)[id=mk8s-install-advanced-fluent-bit-install]}

{linkto(../../../../concepts/addons-and-settings/addons#mk8s-addons-fluent-bit)[text=Fluent Bit]} аддоны үшін тек {linkto(../../../../concepts/addons-and-settings/addons#mk8s-addons-install-features)[text=стандартты орнату нұсқасы]} қолжетімді.

Аддон кластердің барлық тораптарына, соның ішінде master-тораптарға [DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/) контроллері түрінде орнатылады.

{tabs}

{tab(Жеке кабинет)}

 1. [Өтіңіз](https://kz.cloud.vk.kz/app/) {var(cloud)} жеке кабинетіне.
 1. Қажетті кластер орналасқан жобаны таңдаңыз.
 1. **Kubernetes кластерлері → Kubernetes кластерлері** бөліміне өтіңіз.
 1. Қажетті кластердің атауын басыңыз.
 1. **Аддондар** қойындысына өтіңіз.
 1. `fluent-bit` аддонының карточкасындағы **Орнату** түймесін, содан кейін **Аддонды орнату** түймесін басыңыз.
 1. (Қосымша) Мыналарды өңдеңіз:

     - таңдалған нұсқаны;
     - қолданба атауын;
     - аддон орнатылатын атаулар кеңістігінің атауын.

 1. {linkto(#mk8s-install-advanced-fluent-bit-edit-code)[text=Аддонды баптау кодын]} өңдеңіз: `Output` секциясында логтарды таңдалған сервиске жеткізу параметрлерін көрсетіңіз. Басқа параметрлерді өз қалауыңыз бойынша қалдырыңыз.

     {note:warn}
     Қате берілген баптау коды орнату кезінде қателерге немесе аддонның жұмыс істемеуіне әкелуі мүмкін.
     {/note}

 1. **Аддонды орнату** түймесін басыңыз.

    Аддонды кластерге орнату басталады. Бұл процесс ұзақ уақыт алуы мүмкін.

{/tab}

{/tabs}

## {heading(Орнату кезінде аддонды баптау кодын өңдеу)[id=mk8s-install-advanced-fluent-bit-edit-code]}

Өрістердің сипаттамасымен бірге аддонды баптаудың толық коды жеке кабинетте қолжетімді.

Баптау кодын өңдемей аддонды орнату мүмкін емес — логтарды жеткізу параметрлерін міндетті түрде көрсету керек:

1. Кодтың `Output` секциясында таңдалған сервиске жеткізу параметрлерін көрсетіңіз.

   {cut(Логтарды Elasticsearch-ке жеткізуді баптау мысалы)}

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
   Elasticsearch параметрлері туралы толығырақ [ресми құжаттама бөлімінде](https://docs.fluentbit.io/manual/pipeline/outputs/elasticsearch) оқыңыз.

   {/cut}

   {cut(Логтарды Loki-ге жеткізуді баптау мысалы)}

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

   Loki параметрлері туралы толығырақ [Fluent Bit ресми құжаттамасында](https://docs.fluentbit.io/manual/pipeline/outputs/loki) оқыңыз.

   {/cut}

1. (Қосымша) Баптау кодының басқа параметрлерін өңдеңіз. Конфигурация файлының параметрлері туралы толығырақ [Fluent Bit ресми құжаттамасында](https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/classic-mode/configuration-file) оқыңыз. Сондай-ақ [GitHub](https://github.com/fluent/helm-charts/blob/main/charts/fluent-bit/values.yaml) сайтында Fluent Bit баптау кодының мысалы қолжетімді.

   {note:warn}
   Аддонның дұрыс орнатылуы мен жұмыс істеуі үшін қажетті өрістерді немесе осы өрістерде көрсетілген мәндерді жоймаңыз.

   Аддонды баптау кодында осындай өрістерді табуға мүмкіндік беретін түсініктемелер бар.
   {/note}

1. Өңдеуді аяқтағаннан кейін {linkto(#mk8s-install-advanced-fluent-bit-install)[text=аддонды орнатуды жалғастырыңыз]}.

Пайплайн туралы толығырақ [ресми құжаттамада](https://docs.fluentbit.io/manual/pipeline) оқуға болады.
