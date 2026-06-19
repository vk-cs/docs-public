# {heading(Жұмыс үстелдерінің жеке образдары)[id=desktops-image]}

{include(/kz/_includes/_translated_by_ai.md)}

Жұмыс үстелінің образы — бұл стандартты бағдарламалық компоненттерге қосымша VDI технологиясын қолдауға арналған БҚ, сондай-ақ соңғы пайдаланушының жұмысына қажетті қолданбалар орнатылған виртуалды машинаның образы. Cloud Desktop сервисі жұмыс үстелдерін өрістетуге арналған пайдалануға дайын образдарды ұсынады. Сондай-ақ сервиске өз образдарыңызды жүктеп, пайдалана аласыз.

Жұмыс үстелінің образын кез келген қолжетімді тәсілмен дайындауға болады, мысалы Cloud Servers сервисінің {ifdef(public,private,private-pg)}[Практикалық нұсқаулықтар](../../../../computing/iaas/how-to-guides){/ifdef}{ifdef(private-pdf,private-pg-pdf)}{linkto(../../../../computing/iaas/how-to-guides#iaas-how-to-guides)[text=Практикалық нұсқаулықтар]}{/ifdef} бөліміндегі нұсқаулықтардың бірін пайдалану арқылы.

## {heading(Жеке образға қойылатын талаптар)[id=desktops-image-custom-requirements]}

Образда келесі БҚ орнатылуы тиіс:

- Операциялық жүйе:

  {ifdef(public)}
  - Active Directory каталог қызметіне қосылуды қолдайтын кез келген нұсқадағы Windows.
  - Графикалық интерфейсі орнатылған Astra Linux «Орел».
  {/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}
  - Windows 10 немесе 11.
  - Windows Server 2019 немесе 2022.
  - РЕД ОС 7.3.
  - Astra Linux 1.7.
  {/ifdef}

  Басқа операциялық жүйелерді пайдалану үшін {ifdef(public)}[техникалық қолдауға](/kz/contacts){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{var(cloud)} әкімшісіне{/ifdef} хабарласыңыз.

- [QEMU қонақ агенті](https://pve.proxmox.com/wiki/Qemu-guest-agent).
- Виртуалды машинаны бұлттық инициализациялауға арналған БҚ:

  - Astra Linux ОС үшін — [cloud-init](https://www.ibm.com/docs/kz/powervc-cloud/2.0.0?topic=init-installing-configuring-cloud-linux) пакеті.
  - Windows ОС үшін — [Cloudbase-Init](https://cloudbase.it/cloudbase-init) сервистік қолданбасы.

- Cloud Desktop Client қолданбасының пайдаланушыларына қажет қолданбалар.

{ifdef(public)}
Образдан жасалған ВМ {linkto(../../../../computing/cloud-desktops/gpu/concepts/about#gpu-about)[text=графикалық үдеткіштердің]} (GPU) мүмкіндіктерін пайдалана алуы үшін образда мыналар болуы тиіс:

- GPU драйверлері орнатылған;
- егер {linkto(../../../../computing/cloud-desktops/gpu/concepts/vgpu#vgpu-licensing)[text=виртуалды графикалық үдеткіштер]} (vGPU) пайдаланылса, лицензиялау токені бапталған.

Толығырақ {linkto(../../../../computing/cloud-desktops/gpu/how-to-guides/vgpu-setup#vgpu-setup)[text=vGPU бар ВМ баптау]} нұсқаулығында.
{/ifdef}.

## {heading(Жеке образды дайындау бойынша ұсыныстар)[id=desktops-image-recommend]}

Astra Linux ОС үшін RDP протоколын және AD каталог қызметін қолдауға арналған қосымша БҚ-ны образға орнату ұсынылады. Бұл пулда жұмыс үстелдерін өрістетуді жеделдетуге мүмкіндік береді.
