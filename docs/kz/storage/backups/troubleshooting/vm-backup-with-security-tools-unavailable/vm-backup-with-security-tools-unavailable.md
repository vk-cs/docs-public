# {heading(Қауіпсіздік құралдарын пайдаланған кезде ВМ резервтік көшірмесі жасалмайды)[id=storage-backups-unavailable-with-security-tools]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

ВМ ішіне орнатылған ақпараттық қауіпсіздік құралдары (антивирустар, DLP) файлдық жүйені блоктаса немесе сурет түсіру сәтінде дискке жоғары жүктеме жасаса, резервтік көшірмелерді жасауға әсер етуі мүмкін.

### {heading(Шешу)[id=storage-backups-unavailable-with-security-tools-decision]}

1. ВМ оқиғалар журналында АҚ құралдарының файлдар мен дискілерге қолжетімділікті блоктамайтынын [тексеріңіз](/kz/computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-view-logs).
2. Резервтік көшірмелеу процестеріне ерекшеліктер орнатыңыз.