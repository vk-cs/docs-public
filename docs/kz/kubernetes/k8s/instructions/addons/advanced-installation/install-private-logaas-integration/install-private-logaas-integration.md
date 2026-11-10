# {heading(Fluent Bit)[id=k8s-install-private-logaas-integration]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Fluent Bit аддоны Kubernetes кластерінен логтерді жіберу қызметін ұйымдастыруға мүмкіндік береді.

Логтердің көздері ретінде kubelet қызметтері мен кластер түйіндерінде орналасқан подтар (pods) қызмет етеді.

Таңдалған орнату нұсқасына қарамастан, аддон кластердің барлық түйіндеріне, оның ішінде master-түйіндерге DaemonSet түрінде орнатылады.

## {heading(Аддонды орнату)[id=k8s-install-advanced-logaas-integration-install]}

Fluent Bit аддонын орнату үшін:

1. {var(cloud)} жеке кабинетіне {linkto(../../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}.
1. **Кластеры Kubernetes** → **Кластеры Kubernetes** бөліміне өтіп, қажетті кластердің атауын басыңыз.
1. **Аддоны** қойындысына өтіңіз.
1. `logaas-integration` аддонының карточкасындағы **Установить** түймесін басып, **Установить аддон** түймесін басыңыз.
1. Қажет болса, өзгертіңіз:

   * Қосымшаның атауы.
   * Аддон орнатылатын аттар кеңістігінің атауы.
   * Аддон коды.

     Код параметрлерінің толық сипаттамасы [Fluent Bit репозиторийінде](https://github.com/fluent/helm-charts/blob/main/charts/fluent-bit/values.yaml) қолжетімді.

1. **Установить аддон** түймесін басыңыз. Аддонды орнату көп уақыт алуы мүмкін.

Қажет болса, аддонды келесі арқылы мұқият баптаңыз:

* Пайдаланушы сүзгілері.

  Логтердің қызметке тек берілген ең төменгі сыни деңгейі барлары түсуі үшін, аддон кодында `customFilter` өрісінде пайдаланушы сүзгілеріне бір немесе бірнеше ереже белгілеңіз. Бұл ережелерді белгілі бір аттар кеңістігінің деңгейінде және аттар кеңістігіндегі белгілі бір подтардың деңгейінде баптауға болады. Код мысалы:

  ```console
  customFilter:
    - namespace: kube-system
      rules: # Одно правило для пространства имен
      - min_level: WARN
      - min_level: ERROR
        podprefix: kube-internal
    - namespace: default
      rules: # Несколько правил для подов в пространстве имен
        - podprefix: test-pod
          min_level: WARN
        - podprefix: someapi
          min_level: DEBUG
  ```

  Мұнда:

  * `namespace` — аттар кеңістігінің атауы.
  * `min_level` — ең төменгі сыни деңгейдің әріптік белгісі. Мысалдар: WARN, ERROR, DEBUG.
  * `podprefix` — под атауының префиксі.

* Пайдаланушы үлгілері

  Стандартты аддон механизмдерін айналып өтіп, логтерге қажетті сыни деңгейді белгілеу үшін, аддон кодында customRegexp пайдаланушы үлгілеріне бір немесе бірнеше ереже белгілеңіз. Егер логтағы жазбаның бір бөлігі берілген Lua үлгісіне ([pattern](https://www.lua.org/manual/5.4/manual.html#6.4.1)) сәйкес келсе, онда бұл жазбаға ережеде берілген сыни деңгей тағайындалады. Егер сәйкестіктер болмаса, жазбаға Fluent Bit парсерлері арқылы анықталған сыни деңгей тағайындалады. Бұл аддонда қолданылатын деңгейді автоматты анықтау механизмі белгілі бір қосымшаның логтерінің деңгейін дұрыс анықтамаған жағдайда пайдалы болуы мүмкін.

  Бұл ережелер белгілі бір аттар кеңістігінің деңгейінде және аттар кеңістігіндегі белгілі бір подтардың деңгейінде әрекет етеді. Код мысалы:

  ```console
  - namespace: kube-system
    rules: # Одно правило для пространства имен: настройка нескольких уровней
    - levels:
      - level: WARN
        reg_exp: "text message"
  - namespace: default
    rules: # Несколько правил для подов в пространстве имен: настройка нескольких
    - podprefix: test-pod
      levels:
      - level: ERROR
        reg_exp: "text message"
      - level: WARN
        reg_exp: "json message"
    - podprefix: another-another-test-pod
      levels:
      - level: WARN
        reg_exp: "text message"
      - level: FATAL
        reg_exp: "some"
      - levels:
      - level: ERROR
        reg_exp: "text message"
      - level: INFO
        reg_exp: "some"
  ```

  Мұнда:

  * `namespace` — аттар кеңістігінің атауы.
  * `level` — ең төменгі сыни деңгейдің әріптік белгісі. Мысалдар: WARN, ERROR, DEBUG, INFO, FATAL.
  * `podprefix` — под атауының префиксі.
  * `reg_exp` — Lua үлгісі.

Аддонмен жұмыс істеу туралы толығырақ — [Fluent Bit](https://docs.fluentbit.io/manual/installation/getting-started-with-fluent-bit) ресми құжаттамасында.