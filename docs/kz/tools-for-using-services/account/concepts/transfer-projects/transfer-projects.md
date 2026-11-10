## {heading(Жобалар арасында объектілерді беру)[id=project-concepts-object-transfer]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{linkto(../../../../computing/iaas/instructions/volumes/volumes-transfer#iaas-volumes-transfer)[text=Дисктерді]} жобадан жобаға {linkto(../../../../computing/iaas/instructions/volumes/volumes-transfer#iaas-volumes-transfer)[text=беруге]} болады. Бұл жобалар арасында виртуалды машиналарды тасымалдауға мүмкіндік береді.

Дисктерді тек бір регион шегінде беруге болады. Егер жобалар әртүрлі регионах болса, диск бейнесін жергілікті жерге {linkto(../../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-export)[text=шығарып]} алыңыз және оны жаңа жобаға {linkto(../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-import)[text=жүктеңіз]}.

PaaS-сервистерінің объектілерін жобалар арасында тасымалдауға қолдау көрсетілмейді. Мысалы, дерекқор орнатылған виртуалды машинаны басқа жобаға тек қарапайым виртуалды машина ретінде беруге болады. Мұндай виртуалды машинаны дерекқор инстансы ретінде беру немесе басқа жобадан алынған дискпен дерекқор инстансын жасау мүмкін емес.

[Техникалық қолдау көрсетуге](/kz/contacts) жүгінген кезде келесі объектілерді тасымалдауға болады:

- Floating IP-адрестерді;
- {linkto(../../../../networks/vnet/concepts/net-types#vnet-net-types-external-net)[text=сыртқы желінің]} адресін.