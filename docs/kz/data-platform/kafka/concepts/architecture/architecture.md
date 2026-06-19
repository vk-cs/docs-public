# {heading(Сервис архитектурасы)[id=kafka_architecture]}

{include(/kz/_includes/_translated_by_ai.md)}

<!--![Сервис архитектурасы](assets/arch_diagram.png)-->

Cloud Kafka кластері біріктірілген KRaft тораптары мен [брокерден](https://kafka.apache.org/documentation/#intro_concepts_and_terms) (Kafka Broker) тұрады. Мұндай тораптардың саны таңдалған ақауға төзімділік режиміне байланысты. Кластердің өнімділігін арттыру үшін тораптар санын қолмен көбейтуге болады.

Сервис «жариялау/жазылу» қағидаты бойынша жұмыс істейді: жеткізушілер (producers) хабарламаларды топиктерге жариялайды, ал тұтынушылар (consumers) жаңа хабарламаларды алу үшін сервисті сұрайды. Жеткізушілер мен тұтынушылардың жұмыс істеуі үшін {ifdef(public)} [жүктеме теңгергіші](/kz/networks/balancing/concepts/load-balancer) {/ifdef} {ifndef(public)}жүктеме теңгергіші{/ifndef} bootstrap (Kafka bootstrap load balancer) арқылы қосылу бапталуы тиіс. Теңгергіш жеткізушілер мен тұтынушылардың ақауға төзімді қосылуын қамтамасыз етеді.
