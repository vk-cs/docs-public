# {heading(Бакеттегі объектілердің өмірлік циклі)[id=s3-instructions-manage-lifecycle]}

{include(/kz/_includes/_translated_by_ai.md)}

{var(s3)} бакеттегі объектілердің {linkto(../../../concepts/lifecycle#s3-concepts-lifecycle)[text=өмірлік циклін]} (lifecycle) баптауға мүмкіндік береді. Өмірлік цикл — бұл берілген ережелер бойынша бакеттен объектілерді автоматтандырылған түрде жою.

## {heading(Өмірлік цикл ережелері конфигурациясын қарау)[id=s3-instructions-manage-lifecycle-view]}

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

1. **Lifecycle** қойындысына өтіңіз.
{/tab}

{tab(AWS CLI)}

1. Егер {linkto(../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Консольде команданы орындаңыз:

   ```console
   aws s3api get-bucket-lifecycle-configuration --bucket <ИМЯ_БАКЕТА> --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — ережелер конфигурациясын алу қажет бакеттің атауы.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.
     {/ifdef}

{/tab}

{tab(API)}

{linkto(../../api/lifecycle#api-spec-s3-get-bucket-lifecycle-configuration)[text=Сервис REST API]} ішіндегі `GET /lifecycle` әдісін пайдаланыңыз.

{/tab}

{/tabs}

## {heading(Өмірлік цикл ережелерін қосу)[id=s3-instructions-manage-lifecycle-add-rule]}

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

1. **Lifecycle** қойындысына өтіңіз.
1. **Ереже қосу** түймесін басыңыз немесе бакетте ережелер бұрыннан қосылған болса, ![plus-icon](../../assets/plus-icon.svg "inline") **Жаңа ереже қосу** түймесін басыңыз.
1. Ереже параметрлерін орнатыңыз:

   - **Ереже атауы**: тек цифрлар, латын әріптері және `-`, `_`, `.` таңбалары рұқсат етіледі. Атау бакет шегінде бірегей болуы керек.
   - **Объект кілтінің префиксі**: ереже тек көрсетілген префиксті кілттері бар объектілерге қолданылады. Сүзгі тек бір кілтті қамти алады. Префиксті кілттердің мысалдары: `image/`, `pre/`, `image/photo`.
   - **Берілген күндер санынан кейін деректерді жою**: объектілер жойылатын күндер санын көрсетіңіз.
   - **Ережені белсендіру**: қосылатын ережені қазіргі уақытта объектілерге қолдану қажет болмаса, опцияны өшіріңіз.

1. **Ереже қосу** түймесін басыңыз.

{/tab}

{/tabs}

## {heading(Өмірлік цикл ережелерін өңдеу)[id=s3-instructions-manage-lifecycle-edit-rule]}

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

1. **Lifecycle** қойындысына өтіңіз.
1. Өңдеу қажет ереже үшін ![pencil-icon](../../assets/pencil-icon.svg "inline") белгішесін басыңыз.
1. Ереженің {linkto(#s3-instructions-manage-lifecycle-add-rule)[text=параметрлерін]} өңдеңіз.
1. **Сақтау** түймесін басыңыз.

{/tab}

{/tabs}

## {heading(Өмірлік цикл ережелерін өшіру)[id=s3-instructions-manage-lifecycle-disable-rule]}

Объектілер берілген ереже бойынша жойылмауы үшін оны өшіріңіз:

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

1. **Lifecycle** қойындысына өтіңіз.
1. Оң жақта қажетті ережені өшіріңіз.

{/tab}

{/tabs}

## {heading(Өмірлік цикл ережелерін жою)[id=s3-instructions-manage-lifecycle-delete-rule]}

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

1. **Lifecycle** қойындысына өтіңіз.
1. Жою қажет ереже үшін ![trash-icon](../../assets/trash-icon.svg "inline") белгішесін басыңыз.
1. Жоюды растаңыз.

{/tab}

{/tabs}

## {heading(Өмірлік цикл ережелері конфигурациясын орнату)[id=s3-instructions-manage-lifecycle-add-configuration]}

{note:warn}
Жаңа ережелер конфигурациясын қосу ағымдағы конфигурацияны, соның ішінде жеке кабинетте берілген ережелерді де жояды.
{/note}

{tabs}

{tab(AWS CLI)}

1. Егер {linkto(../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. {linkto(../../../concepts/lifecycle#s3-concepts-lifecycle-config)[text=өмірлік цикл ережелері конфигурациясымен]} JSON форматындағы файлды дайындаңыз.
1. Консольді ашып, команданы орындаңыз:

   ```console
   aws s3api put-bucket-lifecycle-configuration --bucket <ИМЯ_БАКЕТА> --lifecycle-configuration file://<ИМЯ_ФАЙЛА>.json --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — ережелер конфигурациясын қосу қажет бакеттің атауы.
   - `<ИМЯ_ФАЙЛА>` — өмірлік цикл ережелері конфигурациясы бар файлдың атауы.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.
     {/ifdef}

{/tab}

{tab(API)}

{linkto(../../api/lifecycle#api-spec-s3-put-bucket-lifecycle)[text=Сервис REST API]} ішіндегі `PUT /lifecycle` әдісін пайдаланыңыз.

{/tab}

{/tabs}

## {heading(Өмірлік цикл ережелері конфигурациясын жою)[id=s3-instructions-manage-lifecycle-delete-configuration]}

{tabs}

{tab(AWS CLI)}

1. Егер {linkto(../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Консольде команданы орындаңыз:

   ```console
   aws s3api delete-bucket-lifecycle --bucket <ИМЯ_БАКЕТА> --endpoint-url <ENDPOINT_URL>
   ```
   
   Мұнда:

   - `<ИМЯ_БАКЕТА>` — ережелер конфигурациясын жою қажет бакеттің атауы.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.
     {/ifdef}

{/tab}

{tab(API)}

{linkto(../../api/lifecycle#api-spec-s3-delete-bucket-lifecycle)[text=Сервис REST API]} ішіндегі `DELETE /lifecycle` әдісін пайдаланыңыз.

{/tab}

{/tabs}