# {heading(Эндпоинттер)[id=spark-endpoints]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{ifdef(public)}
{include(/kz/_includes/_dp-unavailable.md)}
{/ifdef}

Cloud Spark сервипен жұмыс істеуге арналған эндпоинттерді ұсынады: Spark Connect және Spark Service. Эндпоинттер сервистің данасы бетінде **Жалпы ақпарат** қойыншасында көрсетіледі.

## {heading(Spark Connect)[id=spark-endpoints-connect]}

Spark Connect эндпоинты Spark-пен қашықтан орындау ортасы ретінде жұмыс істеуге, Jupyter Notebook немесе IDE-ден Spark-қа қосылуға және кодты жолдап орындауға мүмкіндік береді. Эндпоинтті қосу үшін оны клиенттік скрипттегі `SPARK_CONNECT_HOST` айнымалысында көрсетіңіз.

## {heading(Spark Service)[id=spark-endpoints-service]}

Spark Service эндпоинтын екі тәсілмен пайдалануға болады:

- History Server сервисінде аяқталған Spark-тапсырмалардың интерактивті логтарын браузерде қарау. Сервиске өту үшін **Жалпы ақпарат** қойыншасындағы эндпоинтті басыңыз. Сервипен жұмыс істеу туралы толығырақ — {linkto(../../instructions/interactive_logs#spark_interactive_logs)[text=Интерактивті логтарды қарау]} нұсқаулығында.
- Spark-тапсырма скриптінен Spark кластеріне қосылу. Мұндай жағдайда эндпоинтті тапсырма скриптіндегі `HOST` айнымалысында көрсетіңіз.