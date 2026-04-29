1. Қашықтағы жұмыс үстелдерін лицензиялау түрін конфигурациялайтын топтық саясатты өңдеңіз:

   1. RDS-серверге қосылыңыз.
   1. Топтық саясаттар редакторын ашыңыз:

      1. **Start** түймесін тінтуірдің оң жақ түймесімен басып, **Run** таңдаңыз.
      1. `gpedit.msc` енгізіп, **ОК** басыңыз.

   1. **Computer Configuration** → **Administrative Templates** → **Windows Components** → **Remote Desktop Services** → **Remote Desktop Session Host** → **Licensing** тармағына өтіңіз.
   1. **Set the Remote Desktop licensing mode** саясатын тінтуірдің оң жақ түймесімен басып, **Properties** таңдаңыз.
   1. Саясат түрін қажетті түрге өзгертіңіз: **Per Device** (құрылғыға) немесе **Per User** (пайдаланушыға).
   1. Өзгерістерді қолданыңыз.
