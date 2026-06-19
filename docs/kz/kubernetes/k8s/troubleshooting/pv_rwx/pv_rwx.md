# {heading(RWX режимі жұмыс істемейді)[id=k8s-pv-rwx]}

{include(/kz/_includes/_translated_by_ai.md)}

ReadWriteMany (RWX) томына қол жеткізу режимі жұмыс істемейді: кластер тораптарының дискіге қолжетімділігі жоқ.

Бұл Cloud Containers ішінде RWX режиміндегі PVC-ге қолжетімділік іске асырылмағанына байланысты болуы мүмкін.

### {heading(Шешім)[id=k8s-pv-rwx-solution]}

Әртүрлі тораптардағы бірнеше подтан деректерге ортақ қолжетімділікті ұйымдастыру үшін жеке виртуалды машинада {linkto(../../../../computing/iaas/instructions/fs-manage#iaas-fs-manage)[text=NFS-серверді]} орналастырыңыз.
