# {heading(Docker-ге қосылу мүмкін емес)[id=k8s-docker-connect-problem]}

{include(/kz/_includes/_translated_by_ai.md)}

Docker тізіліміне қосылған кезде `x509: certificate signed by unknown authority` қатесі пайда болады.

Мәселе {linkto(../../connect/docker-registry#k8s-docker-registry)[text=Docker тізіліміне қосылу]} үшін пайдаланылатын цифрлық сертификаттың түпнұсқалығын тексеру мүмкін болмаған жағдайда туындайды. Мысалы, әдепкі бойынша қосылу үшін жүйе жасаған өздігінен қол қойылған сертификат пайдаланылады.

{note:info}

{linkto(/kz/kubernetes/k8s/instructions/create-cluster/create-webui-gen-2#k8s-create-webui-gen-2)[text=Кластерді жасау]} кезінде контейнер бейнелерін цифрлық сертификаттың түпнұсқалығын тексермей жүктеп алуға және іске қосуға болатын сенімді Docker тізілімдерінің мекенжайларын қоса аласыз.

{/note}

### {heading(Шешім)[id=k8s-docker-connect-problem-solution]}

1. Docker конфигурациясының `daemon.json` файлына Docker тізілімінің endpoint мекенжайы бар `insecure-registries` параметрін қосыңыз.

   Мекенжай `<IP_АДРЕС_РЕЕСТРА_DOCKER>:<ПОРТ_РЕЕСТРА_DOCKER>` форматында беріледі.

   `daemon.json` файлын толтыру мысалы:

   ```json
   {
     ...
     "insecure-registries": [
       "192.0.2.2:5000"
     ],
     ...
   }
   ```

1. Docker Engine жүйесін қайта жүктеңіз.
1. Егер мәселе сақталса, [техникалық қолдау қызметіне](/kz/contacts) хабарласыңыз.
