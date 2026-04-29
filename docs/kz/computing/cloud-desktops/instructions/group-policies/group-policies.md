{include(/kz/_includes/_translated_by_ai.md)}

{note:info}

Нұсқаулық компанияңыздағы Active Directory қызметінің инфрақұрылымын қызмет көрсететін жүйелік әкімшілерге арналған.

{/note}

Соңғы пайдаланушылар Windows ОЖ басқаруындағы виртуалды жұмыс үстелдеріне қосыла алуы үшін, Active Directory домен контроллерінің топтық саясаттарын баптаңыз.

## Дайындық қадамдары

Active Directory домен контроллерінде Group Policy Management оснасткасын іске қосыңыз.

## 1. Windows Defender Firewall үшін ереже қосыңыз

Виртуалды жұмыс үстелдеріне орнатылған Cloud Desktop агентінің жұмыс істеуі үшін Windows Defender Firewall қызметін белсендіріп, онда TCP 16002–16005 және UDP 14010–14012 порттар топтары үшін кіріс қосылымдарына рұқсат беріңіз.

1. **Computer Configuration → Policies → Windows Security → Security Settings → Windows Defender Firewall with Advanced Security – Local Group Police Object** бөліміне өтіңіз.
1. **Windows Defender Firewall Properties** сілтемесіне өтіңіз.
1. **Domain Profile** қойындысындағы **Firewall state** тізімінде `On (recommended)` мәнін таңдап, **OK** батырмасын басыңыз.
1. **Inbound Rules** сілтемесіне өтіңіз.
1. Бөлімнің контекстік мәзірінен **New Rule…** тармағын таңдаңыз.
1. **Port** опциясын таңдап, **Next** батырмасын басыңыз.
1. **TCP** және **Specific local ports** опцияларын таңдаңыз.
1. `16002–16005` мәндер ауқымын көрсетіп, **Next** батырмасын басыңыз.
1. **Allow the connection** опциясын таңдап, **Next** батырмасын басыңыз.
1. **Domain** опциясын таңдап, **Next** батырмасын басыңыз.
1. Ереже үшін атау көрсетіңіз (мысалы, `Cloud Desktop API Inbound TCP`) және **Finish** батырмасын басыңыз.
1. Дәл осылай екінші ережені қосыңыз. Ол үшін **TCP** орнына **UDP** опциясын таңдап, порттар үшін `14010–14012` мәндер ауқымын және `Cloud Desktop API Inbound UDP` ереже атауын көрсетіңіз.

## 2. Виртуалды жұмыс үстелдеріне қосылуға арналған RDP сеансының қауіпсіздікті келісу механизмін баптаңыз

Виртуалды жұмыс үстелдеріне TLS шлюзі арқылы қосылу үшін Cloud Desktop агенті жағындағы терминалдық сеанс қорғау деңгейінің стандартты баптауларын өзгертіңіз.

1. **Computer Configuration → Policies → Administrative Templates → Windows Components → Remote Desktop Services → Remote Desktop Session Host → Security** бөліміне өтіңіз.
1. **Require use of specific security layer for remote (RDP) connections** тармағының контекстік мәзірінен **Edit** тармағын таңдаңыз.
1. **Enabled** опциясын таңдаңыз.
1. **Security Layer** параметрі үшін `RDP` мәнін таңдаңыз.
1. **ОК** батырмасын басыңыз.

## 3. Соңғы пайдаланушыларға виртуалды жұмыс үстелдеріне қосылуға рұқсат беріңіз

Cloud Desktop сервисіне арналған домен тобыңызға кіретін пайдаланушыларға RDP протоколы бойынша виртуалды жұмыс үстелдеріне қосылуға рұқсат беріңіз.

1. **Computer Configuration → Policies → Windows Security → Security Settings → Restricted Groups** бөліміне өтіңіз.
1. `<сіздің домен атыңыз>\<AD пайдаланушылар тобының атауы>` тобын `BUILTIN\Remote Desktop Users` стандартты тобының мүшелеріне қосыңыз.
1. **Configuration → Policies → Administrative Templates → Windows Components → Remote Desktop Services → Remote Desktop Session Host → Connections** бөліміне өтіңіз.
1. **Allow users to connect remotely using Remote Desktop Services** тармағының контекстік мәзірінен **Edit** тармағын таңдаңыз.
1. **Enabled** опциясын таңдап, **ОК** батырмасын басыңыз.
