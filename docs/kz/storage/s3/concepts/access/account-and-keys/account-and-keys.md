# {heading(Аккаунттар мен қол жеткізу кілттері)[id=s3-concepts-account-and-keys]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{var(s3)} сервісінде бакеттер мен объектілерге қол жеткізу үшін бір-бірінен тәуелсіз екі түрлі кілт қолданылады:

- {linkto(#s3-concepts-account-and-keys-access-keys)[text=Аккаунтқа байланыстырылған қол жеткізу кілттері {ifdef(public)}{var(s3)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef}]}. Аккаунттың барлық бакеттеріне қол жеткізуді береді.
- {linkto(#s3-concepts-account-and-keys-bucket-access-keys)[text=Бакетке байланыстырылған қол жеткізу кілттері]}. Бір бакетке немесе осы бакеттегі объектілердің бір бөлігіне қол жеткізуді береді.

## {heading({ifdef(public)}{var(s3)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} аккаунты және оның қол жеткізу кілттері)[id=s3-concepts-account-and-keys-access-keys]}

{var(s3)} сервисімен жұмыс істеу үшін {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} жеке кабинетінде қол жеткізу кілттері қолданылмайды. Алайда бакеттер мен объектілермен {linkto(../../../connect/s3-cli#s3-connect-cli)[text=CLI]}, {linkto(../../../api#s3-api)[text=API]} немесе {linkto(../../../connect/s3-file-managers#s3-connect-file-managers)[text=файлдық менеджерлер]} арқылы жұмыс істеуді қаласаңыз, жобада {var(s3)} аккаунтын және оған байланыстырылатын қол жеткізу кілттерін {linkto(../../../instructions/access-management/access-keys#s3-instructions-access-keys-new-account-access-key)[text=жасау]} қажет.

Бірнеше {var(s3)} аккаунтын жасауға болады. Олардың саны бір жобада {linkto(../../../concepts/about#s3-concepts-about-limits)[text=шектеулермен]} шектелген. Аккаунтпен бір мезгілде оған қол жеткізу кілті автоматты түрде жасалады. Аккаунтқа қол жеткізу кілті — бұл кілттің публичный идентификаторынан (Access Key ID) және құпия кілттен (Secret Key) тұратын жұп. Құпия кілт жұпты жасаған кезде ғана қолжетімді, оны кейін қалпына келтіру мүмкін емес, бірақ жаңа қол жеткізу кілтін {linkto(../../../instructions/access-management/access-keys#s3-instructions-access-keys-existing-account-access-key)[text=жасауға]} болады. Бір аккаунтқа екі кілтке дейін байланыстыруға болады.

{var(s3)} аккаунттарын және оларға байланыстырылған кілттерді басқару тек жобаның иесіне {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} жеке кабинеты арқылы қолжетімді.

{note:info}
{var(s3)} аккаунтын API немесе Terraform арқылы тек жобаның иесі жасауы мүмкін.
{/note}

## {heading(Бакетке қол жеткізу кілттері)[id=s3-concepts-account-and-keys-bucket-access-keys]}

Бакетке қол жеткізу кілттері аккаунтқа емес, нақты бір бакетке байланыстырылады. Олар пайдаланушыға тек осы бакеттегі немесе оның бір директориясындағы объектілермен жұмыс істеу құқығын береді, бірақ жобадағы басқа бакеттер мен объектілерге қол жеткізуге мүмкіндік бермейді.

Бакетке қол жеткізу кілті — бұл кілттің публичный идентификаторынан (Access Key ID) және құпия кілттен (Secret Key) тұратын жұп. Құпия кілт жұпты жасаған кезде ғана қолжетімді, оны кейін қалпына келтіру мүмкін емес, бірақ жаңа қол жеткізу кілтін {linkto(../../../instructions/access-management/bucket-keys#s3-instructions-bucket-keys-add)[text=жасауға]} болады.

Бакетке қол жеткізу кілтін қосқан кезде параметр ретінде {linkto(../../../concepts/about#s3-concepts-about-object-key)[text=объект атының префиксін]} көрсетуге болады, оны {var(s3)} бакеттегі директория аты ретінде түсіндіреді. Мұндай кілт префиксті кілт (prefix access key) деп аталады. Префиксті кілт тек бакеттегі префикспен көрсетілген директориядағы объектілерге қол жеткізуді береді. Префикс көрсетпей жасалған кілт бакеттегі барлық объектілерге қол жеткізуді береді.

Аккаунтқа байланыстырылған кілттер сияқты, бакетке қол жеткізу кілттері де оның ішіндегі объектілермен CLI, API немесе файлдық менеджерлер арқылы жұмыс істеу мүмкіндігін береді. Бакетке қол жеткізу кілттерін басқаруға {linkto(../../../instructions/access-management/bucket-keys#s3-instructions-bucket-keys)[text=жеке кабинет арқылы]}{ifdef(s3,s3-pdf)} IAM Only{/ifdef} немесе {ifdef(public)}{linkto(../../../api/pak#s3-api-pak)[text=API көмегімен]}{/ifdef}{ifdef(s3,s3-pdf)}API көмегімен{/ifdef} болады.