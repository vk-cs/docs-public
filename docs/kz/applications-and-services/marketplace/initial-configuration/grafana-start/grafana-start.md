# {heading(Grafana өрістету)[id=marketplace-grafana-start]}

{include(/kz/_includes/_translated_by_ai.md)}

Сіз ресурстар мониторингі деректерін [Grafana](https://kz.cloud.vk.com/app/services/marketplace/v2/apps/service/e9ec618a-ca38-483b-916c-0c1fce9620be/latest/info) сервисінің көмегімен визуализациялай аласыз.

Бұл нұсқаулық VK Cloud-тағы ВМ-де Grafana 10 сервисін өрістетуге, сервис консоліне кіруге және жаңа пайдаланушы жасауға көмектеседі.

Grafana сервисін пайдалану арқылы сіз [Marketplace](/kz/start/legal/vk/marketplace) және [Grafana Labs](https://grafana.com/legal/grafana-labs-license) сервистерінің лицензиялық келісімдерімен келісесіз.

Жобада Grafana сервисін өрістету үшін:

1. VK Cloud-та [тіркеліңіз](/kz/intro/onboarding/account).
1. Егер бұрын жасалмаған болса, [желіні](/kz/networks/vnet/instructions/net#vnet-net-add) жасаңыз.
1. Өрістетілген сервисі бар ВМ орналасатын [ішкі желі баптауларында](/kz/networks/vnet/instructions/net#vnet-net-subnet-edit) **Приватный DNS** опциясын өшіріңіз.
1. Grafana сервисін [өрістетіңіз](../../instructions/pr-instance-add):

   - **Как будет размещена Grafana**: сервиске сыртқы IP-мекенжай арқылы қол жеткізу үшін Grafana үшін `external` қол жеткізу түрін көрсетіңіз.
   - **Резервное копирование**: деректерді [VK Object Storage](/kz/storage/s3) объектілік қоймасына сақтамау үшін `no` нұсқасын таңдаңыз. `yes` нұсқасы таңдалса, соңғы 7 күндегі деректер көшіріледі.
   - **Сеть**: бұрын жасалған желі мен ішкі желіні таңдаңыз.

   Қалған параметрлерді өз қалауыңыз бойынша көрсетіңіз.

   Орнатудың аяқталуын күтіңіз — поштаға URL мен құпиясөзі бар бір реттік сілтеме келеді. Сервис `https://grafana-<ID>.xaas.msk.vkcs.cloud` түріндегі мекенжай бойынша өрістетіледі (Grafana консолі).

1. Хаттағы `grafana_url` сілтемесі бойынша Grafana консоліне өтіңіз.
1. **Sign in** түймесін басыңыз.
1. Ашылған терезеде `admin` логинін және хаттағы құпиясөзді енгізіңіз. Кіргеннен кейін құпиясөзді ауыстыру ұсынылады.
1. Жаңа құпиясөзді көрсетіңіз.
1. (Қосымша) [ресми құжаттамадағы](https://grafana.com/docs/grafana/v10.0/getting-started/build-first-dashboard) нұсқаулыққа сәйкес дашборд жасаңыз.

{note:info}

Сервистің кеңейтілген конфигурациясы үшін [Grafana](https://grafana.com/docs/grafana/v10.0) ресми нұсқаулығын пайдаланыңыз.

{/note}
