# {heading(Cloud Airflow)[id=airflow_metrics]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{ifdef(public)}
{include(/kz/_includes/_dp-unavailable.md)}
{/ifdef}

Cloud Airflow қызметінде метрикалар Prometheus форматында жиналады. Әр метрика үшін дашбордта көрсетуге болатын панель автоматты түрде жасалады.

## {heading(Worker-түйіндердің метрикалары)[id=airflow_metrics_worker]}

Cloud Airflow worker-түйіндерінің метрикалар тізімі {linkto(#tab_airflow_metrics_worker)[text=%number кестеде]} келтірілген.

{caption({counter(table)[id=numb_tab_airflow_metrics_worker]} — Cloud Airflow worker-түйіндерінің метрикалары кестесі)[align=right;position=above;id=tab_airflow_metrics_worker;number={const(numb_tab_airflow_metrics_worker)}]}
[cols="1,1", options="header"]
|===
|Метриканың атауы
|Сипаттамасы

|`%, CPU`
|Таңдалған уақыт аралығында орнатылған шекке қатысты CPU пайдалану пайызы

|`%, Memory`
|Таңдалған уақыт аралығында орнатылған шекке қатысты жад пайдалану пайызы

|`Disk Reads`
|Таңдалған уақыт аралығында дискіден оқылған деректер көлемі, МБ/с

|`Disk Writes`
|Таңдалған уақыт аралығында дискіге жазылған деректер көлемі, МБ/с

|===

{/caption}

## {heading(Airflow өнімділік метрикалары)[id=airflow_metrics_performance]}

Cloud Airflow өнімділік метрикаларының тізімі {linkto(#tab_airflow_metrics_performance)[text=%number кестеде]} келтірілген.

{caption({counter(table)[id=numb_tab_airflow_metrics_performance]} — Cloud Airflow өнімділік метрикалары кестесі)[align=right;position=above;id=tab_airflow_metrics_performance;number={const(numb_tab_airflow_metrics_performance)}]}
[cols="1,1", options="header"]
|===
|Метриканың атауы
|Сипаттамасы

|`Critical section of scheduler loop`
|Таңдалған уақыт аралығында критикалық секцияны орындаудың орташа уақыты, мс. Бұл секцияда тек бір жоспарлаушы ғана жұмыс істей алады

|`Running one scheduler loop`
|99-перцентиль бойынша жоспарлаушының бір циклін орындау уақыты, мс

|`Airflow Load`
|95-перцентиль бойынша деректерді сериялау жүйесінің жүктемесінің мәні

|`Running the critical section task instance query`
|95-перцентиль бойынша жоспарлаушының критикалық секциясында тапсырма даналарының күйі туралы сұрауды орындаудың орташа уақыты, мс

|`Capacity left on a triggerer`
|Кейінге қалдырылған тапсырмаларды өңдеуге арналған триггердің қалған сыйымдылығының ағымдағы мәні

|`Open slots on executor`
|Орындаушыдағы бос слоттардың ағымдағы саны

|`Running tasks on executor`
|Орындаушыда орындалып жатқан тапсырмалардың ағымдағы саны

|`Queued tasks on executor`
|Орындаушыда орындалуды күтіп тұрған тапсырмалардың ағымдағы саны

|`Open slots in the pool`
|Пулдағы бос слоттардың ағымдағы саны

|`Queued slots in the pool`
|`pool_name` тегі бар пулдағы кезектегі слоттардың ағымдағы саны

|`Scheduled slots in the pool`
|`pool_name` тегі бар пулдағы жоспарланған слоттардың ағымдағы саны

|`Running slots in the pool`
|`pool_name` тегі бар пулдағы орындалып жатқан слоттардың ағымдағы саны

|`Deferred slots in the pool`
|`pool_name` тегі бар пулдағы кейінге қалдырылған слоттардың ағымдағы саны

|`Seconds since dag_file was last processed`
|DAG-файл соңғы рет өңделгеннен бергі уақыт, секунд

|===

{/caption}