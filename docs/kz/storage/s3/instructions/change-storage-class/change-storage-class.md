# {heading(Сақтау сыныптары)[id=s3-instructions-change-storage-class]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{var(s3)} мына нысандар үшін {linkto(../../concepts/about#s3-concepts-about-storage-class)[text=сақтау сыныптарын]} өзгертуге қолдау көрсетеді:

- бакет,
- объект,
- құрама жүктеу.

{ifdef(public)}

{note:err}
Сақтау сыныбын өзгерген кезде [тарифтеленетін](../../tariffication) трафик беріледі.
{/note}

{/ifdef}

## {heading(Бакеттің сақтау сыныбын өзгерту)[id=s3-instructions-change-storage-class-bucket]}

{note:warn}
Бакеттің сақтау сыныбын өзгергенде оның құрамындағы нысандардың сақтау сыныбы өзгеріссіз қалады. Жаңа сынып жаңадан қосылатын нысандарға қолданылады.
{/note}

{tabs}

{tab(Жеке кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. {var(cloud)} жеке кабинетына [өтіңіз](https://msk.cloud.vk.ru/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетына {linkto(../iamo/iamo-auth#s3-instructions-iamo-auth)[text=кіріңіз]}.

{/ifdef}

1. Қажетті бакет орналасқан жобаны таңдаңыз.
1. **Object Storage** → **Бакеттер** бөліміне өтіңіз.
1. Бакеттің баптауларына мына тәсілдердің бірімен өтіңіз:

   - Қажетті бакет үшін ![ ](../../assets/more-icon.svg "inline") басып, **Баптаулар** тармағын таңдаңыз.
   - Қажетті бакеттің атауын басып, бакет бетінде ![ ](../../assets/settings-icon.svg "inline") түймесін басыңыз.

1. **Сақтау сыныбы** қойындысына өтіңіз.
1. Қажетті сыныпты белгілеп, **Өзгерістерді сақтау** түймесін басыңыз.

   Енді осы бакетке қосатын жаңа нысандар сәйкес сақтау сыныбына ие болады. Бұрын қосылған нысандардың сақтау сыныбы өзгермейді.

   Әр нысанның сақтау сыныбын бакет нысандары тізіміндегі **Сақтау сыныбы** бағанынан {linkto(../objects/manage-object#s3-instructions-manage-object-list)[text=қарауға]} болады.

{/tab}

{/tabs}

## {heading(Объекттің сақтау сыныбын өзгерту)[id=s3-instructions-change-storage-class-object]}

{tabs}

{tab(AWS CLI)}

1. {linkto(../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатылып, бапалмаған болса, орнатыңыз және бапаңыз.
1. Консольде команданы орындаңыз:

   - бакеттегі бір объект үшін:

     ```console
     aws s3 cp s3://<ИМЯ_БАКЕТА>/<КЛЮЧ_ОБЪЕКТА> s3://<ИМЯ_БАКЕТА>/ --storage-class <КЛАСС_ХРАНЕНИЯ> --endpoint-url <ENDPOINT_URL>
     ```

   - бакеттегі барлық объект үшін:

     ```console
     aws s3 cp s3://<ИМЯ_БАКЕТА>/ s3://<ИМЯ_БАКЕТА>/ --recursive --storage-class <КЛАСС_ХРАНЕНИЯ> --endpoint-url <ENDPOINT_URL>
     ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — қажетті объект немесе объектілер орналасқан бакеттің атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — жолын қоса алғанда, объекттің толық атауы.
   - `<КЛАСС_ХРАНЕНИЯ>` — объектілерге тағылатын сақтау сыныбы.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Москва өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік атауы бар сілтеме. Атау пішімі өзгеше болуы мүмкін. Сілтеменің дәл пішімін білу үшін әкімшіңізге жүгініңіз.
     {/ifdef}

{/tab}

{/tabs}

## {heading(Құрама жүктеудің сақтау сыныбын өзгерту)[id=s3-instructions-change-storage-class-multipart-upload]}

Сақтау сыныбы құрама жүктеуді (InitiateMultipart және CompleteMultipart операцияларын) инициациялау немесе аяқтау кезінде тағылады. Сынып көрсетілмесе, бакеттің сақтау сыныбы тағылады.

Құрама жүктеу арқылы бакетке орналастырылған объекттің сақтау сыныбын өзгерту үшін:

{tabs}

{tab(AWS CLI)}

1. {linkto(../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатылып, бапалмаған болса, орнатыңыз және бапаңыз.
1. Құрама жүктеудің аяқталуын күтіңіз.
1. Консольде команданы орындаңыз:

   - бакеттегі бір объект үшін:

     ```console
     aws s3 cp s3://<ИМЯ_БАКЕТА>/<КЛЮЧ_ОБЪЕКТА> s3://<ИМЯ_БАКЕТА>/ --storage-class <КЛАСС_ХРАНЕНИЯ> --endpoint-url <ENDPOINT_URL>
     ```

   - бакеттегі барлық объект үшін:

     ```console
     aws s3 cp s3://<ИМЯ_БАКЕТА>/ s3://<ИМЯ_БАКЕТА>/ --recursive --storage-class <КЛАСС_ХРАНЕНИЯ> --endpoint-url <ENDPOINT_URL>
     ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — қажетті объект немесе объектілер орналасқан бакеттің атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — жолын қоса алғанда, объекттің толық атауы.
   - `<КЛАСС_ХРАНЕНИЯ>` — объектілерге тағылатын сақтау сыныбы.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Москва өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік атауы бар сілтеме. Атау пішімі өзгеше болуы мүмкін. Сілтеменің дәл пішімін білу үшін әкімшіңізге жүгініңіз.
     {/ifdef}

{/tab}

{/tabs}