# {heading(Аккаунттар және қолжетімділік кілттері)[id=s3-concepts-account-and-keys]}

{include(/kz/_includes/_translated_by_ai.md)}

{var(s3)} ішінде бакеттер мен объектілерге қол жеткізу үшін бір-бірінен тәуелсіз екі түрлі кілт қолданылады:

- {linkto(#s3-concepts-account-and-keys-access-keys)[text={ifdef(public)}{var(s3)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} аккаунтына байланыстырылған қолжетімділік кілттері]}. Аккаунттың барлық бакеттеріне қолжетімділік береді.
- {linkto(#s3-concepts-account-and-keys-bucket-access-keys)[text=Бакетке байланыстырылған қолжетімділік кілттері]}. Бір бакетке немесе осы бакеттегі объектілердің бір бөлігіне қолжетімділік береді.

## {heading({ifdef(public)}{var(s3)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} аккаунты және оның қолжетімділік кілттері)[id=s3-concepts-account-and-keys-access-keys]}

{ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} жеке кабинетінде {var(s3)} сервисімен жұмыс істеу үшін қолжетімділік кілттері қолданылмайды. Бірақ егер сіз бакеттермен және объектілермен {linkto(../../../connect/s3-cli#s3-connect-cli)[text=CLI]}, {ifdef(public)}{linkto(../../../api#s3-api)[text=API]}{/ifdef}{ifdef(s3,s3-pdf)}{linkto(../../../../api#s3-api)[text=API]}{/ifdef} немесе {linkto(../../../connect/s3-file-managers#s3-connect-file-managers)[text=файл менеджерлері]} арқылы жұмыс істегіңіз келсе, жобада {var(s3)} аккаунтын және оған байланыстырылатын қолжетімділік кілттерін {linkto(../../../instructions/access-management/access-keys#s3-instructions-access-keys-new-account-access-key)[text=жасау]} қажет.

Сіз бірнеше {var(s3)} аккаунтын жасай аласыз. Бір жобадағы олардың саны {linkto(../../../concepts/about#s3-concepts-about-limits)[text=лимиттермен]} шектелген. Аккаунтпен бірге оған қолжетімділік кілті автоматты түрде жасалады. Аккаунтқа қолжетімділік кілті — бұл кілттің жария идентификаторынан (Access Key ID) және құпия кілттен (Secret Key) тұратын жұп. Құпия кілт тек жұп жасалған кезде ғана қолжетімді, кейін оны қалпына келтіру мүмкін емес, бірақ сіз {linkto(../../../instructions/access-management/access-keys#s3-instructions-access-keys-existing-account-access-key)[text=жаңа қолжетімділік кілтін жасай]} аласыз. Бір аккаунтқа екі кілтке дейін байланыстыруға болады.

{var(s3)} аккаунттарын және оларға байланыстырылған кілттерді басқару тек {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} жеке кабинетінде қолжетімді.

## {heading(Бакетке қолжетімділік кілттері)[id=s3-concepts-account-and-keys-bucket-access-keys]}

Бакетке қолжетімділік кілттері аккаунтқа емес, нақты бір бакетке байланыстырылған. Олар пайдаланушыға объектілермен тек осы бакетте немесе оның бір директориясында жұмыс істеу құқығын береді, бірақ жобадағы басқа бакеттер мен объектілерге қолжетімділік бермейді.

Бакетке қолжетімділік кілті — бұл кілттің жария идентификаторынан (Access Key ID) және құпия кілттен (Secret Key) тұратын жұп. Құпия кілт тек жұп жасалған кезде ғана қолжетімді, кейін оны қалпына келтіру мүмкін емес, бірақ сіз {linkto(../../../instructions/access-management/bucket-keys#s3-instructions-bucket-keys-add)[text=жаңа қолжетімділік кілтін жасай]} аласыз.

Бакетке қолжетімділік кілтін қосқанда параметр ретінде {linkto(../../../concepts/about#s3-concepts-about-object-key)[text=объект атауына префиксті]} көрсетуге болады, оны {var(s3)} бакеттегі директория атауы ретінде интерпретациялайды. Мұндай кілт префикстік (prefix access key) деп аталады. Префикстік кілт префикспен берілген бакет директориясындағы объектілерге ғана қолжетімділік береді. Префикс көрсетілмей жасалған кілт бакеттегі барлық объектілерге қолжетімділік береді.

Аккаунтқа байланыстырылған кілттер сияқты, бакетке қолжетімділік кілттері де ондағы объектілермен CLI, API немесе файл менеджерлері арқылы жұмыс істеуге мүмкіндік береді. Бакетке қолжетімділік кілттерін {linkto(../../../instructions/access-management/bucket-keys#s3-instructions-bucket-keys)[text=жеке кабинет арқылы]}{ifdef(s3,s3-pdf)} IAM Only{/ifdef} немесе {ifdef(public)}{linkto(../../../api/pak#s3-api-pak)[text=API көмегімен]}{/ifdef}{ifdef(s3,s3-pdf)}{linkto(../../../../api/pak#s3-api-pak)[text=API көмегімен]}{/ifdef} басқаруға болады.