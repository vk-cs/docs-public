# {heading(Сақтау кластары)[id=s3-instructions-change-storage-class]}

{include(/kz/_includes/_translated_by_ai.md)}

{var(s3)} келесі мәндер үшін {linkto(../../concepts/about#s3-concepts-about-storage-class)[text=сақтау кластарының]} өзгертілуін қолдайды:

- бакет,
- объект,
- құрамдас жүктеу.

{ifdef(public)}

{note:err}
Сақтау класын өзгерткен кезде [тарифтелетін](../../tariffication) трафик беріледі.
{/note}

{/ifdef}

## {heading(Бакеттің сақтау класын өзгерту)[id=s3-instructions-change-storage-class-bucket]}

{note:warn}
Бакеттің сақтау класын өзгерткен кезде, оның ішіндегі объектілердің сақтау класы бұрынғыша қалады. Жаңа класс жаңадан қосылатын объектілерге қолданылады.
{/note}

{tabs}

{tab(Жеке кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.com/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетіне {linkto(../../iamo-auth#s3-instructions-iamo-auth)[text=кіріңіз]}.

{/ifdef}

1. Қажетті бакет орналасқан жобаны таңдаңыз.
1. **Объектілік қойма** → **Бакеттер** бөліміне өтіңіз.
1. Бакет баптауларына келесі тәсілдердің бірімен өтіңіз:

   - Қажетті бакет үшін ![ ](../../assets/more-icon.svg "inline") түймесін басып, **Баптаулар** тармағын таңдаңыз.
   - Қажетті бакет атауын басыңыз, содан кейін бакет бетінде ![ ](../../assets/settings-icon.svg "inline") түймесін басыңыз.

1. **Сақтау класы** қойындысына өтіңіз.
1. Қажетті класты белгілеп, **Өзгерістерді сақтау** түймесін басыңыз.
   
   Енді осы бакетке қосатын жаңа объектілер сәйкес сақтау класына ие болады. Бұрын қосылған объектілердің сақтау класы өзгермейді.
   
   Әр объектінің сақтау класын бакет объектілері тізіміндегі **Сақтау класы** бағанынан {linkto(../objects/manage-object#s3-instructions-manage-object-list)[text=қарауға]} болады.

{/tab}

{/tabs}

## {heading(Объектінің сақтау класын өзгерту)[id=s3-instructions-change-storage-class-object]}

{tabs}

{tab(AWS CLI)}

1. Егер {linkto(../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Консольде команданы орындаңыз:

   - бакеттегі бір объект үшін:

     ```console
     aws s3 cp s3://<ИМЯ_БАКЕТА>/<КЛЮЧ_ОБЪЕКТА> s3://<ИМЯ_БАКЕТА>/ --storage-class <КЛАСС_ХРАНЕНИЯ> --endpoint-url <ENDPOINT_URL>
     ```

   - бакеттегі барлық объектілер үшін:

     ```console
     aws s3 cp s3://<ИМЯ_БАКЕТА>/ s3://<ИМЯ_БАКЕТА>/ --recursive --storage-class <КЛАСС_ХРАНЕНИЯ> --endpoint-url <ENDPOINT_URL>
     ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — қажетті объект(ілер) орналасқан бакеттің атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса.
   - `<КЛАСС_ХРАНЕНИЯ>` — объектілерге тағайындалатын сақтау класы.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.
     {/ifdef}

{/tab}

{/tabs}

## {heading(Құрамдас жүктеудің сақтау класын өзгерту)[id=s3-instructions-change-storage-class-multipart-upload]}

Сақтау класы құрамдас жүктеуді инициализациялау немесе аяқтау кезеңінде беріледі (`InitiateMultipart` және `CompleteMultipart` операциялары). Егер класс көрсетілмесе, бакеттің сақтау класы тағайындалады.

Құрамдас жүктеу арқылы бакетке орналастырылған объектінің сақтау класын өзгерту үшін:

{tabs}

{tab(AWS CLI)}

1. Егер {linkto(../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Құрамдас жүктеудің аяқталуын күтіңіз.
1. Консольде команданы орындаңыз:

   - бакеттегі бір объект үшін:

     ```console
     aws s3 cp s3://<ИМЯ_БАКЕТА>/<КЛЮЧ_ОБЪЕКТА> s3://<ИМЯ_БАКЕТА>/ --storage-class <КЛАСС_ХРАНЕНИЯ> --endpoint-url <ENDPOINT_URL>
     ```

   - бакеттегі барлық объектілер үшін:

     ```console
     aws s3 cp s3://<ИМЯ_БАКЕТА>/ s3://<ИМЯ_БАКЕТА>/ --recursive --storage-class <КЛАСС_ХРАНЕНИЯ> --endpoint-url <ENDPOINT_URL>
     ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — қажетті объект(ілер) орналасқан бакеттің атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса.
   - `<КЛАСС_ХРАНЕНИЯ>` — объектілерге тағайындалатын сақтау класы.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.
     {/ifdef}

{/tab}

{/tabs}