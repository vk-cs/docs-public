{include(/kz/_includes/_translated_by_ai.md)}

VK Object Storage объектілерді [оларды жоюды немесе қайта жазуды бұғаттау](/kz/storage/s3/concepts/objects-lock) (Object Lock) арқылы қорғауға мүмкіндік береді. Объектілерді бұғаттауды нормативтік немесе заңнамалық талаптарға сәйкес белгіленген мерзім ішінде өзгермейтін түрде сақталуы және кейіннен жойылуы тиіс сыни деректер (мысалы, дербес деректер) үшін пайдаланыңыз. Бұл аудит пен заңдық маңыздылықты қамтамасыз етуге көмектеседі.

## Дайындық қадамдары

AWS CLI [орнатылған және бапталғанына](/kz/storage/s3/connect/s3-cli) көз жеткізіңіз.

## 1. Бакетті дайындаңыз

Бакетті келесі тәсілдердің бірімен дайындаңыз:

{tabs}
{tab(Жаңа бакет үшін)}

Объектілерді жоюдан бұғаттау мүмкіндігі бар жаңа бакет жасаңыз:

   {include(/kz/_includes/_s3-manage-bucket.md)[tags=create_bucket_block]}

{/tab}
{tab(Бар бакет үшін)}

Бакет объектілерін бұғаттауды конфигурациялаңыз:

   {include(/kz/_includes/_s3-manage-object.md)[tags=object_config_block]}

{/tab}
{/tabs}

## 2. Бакет үшін әдепкі сақтау саясатын баптаңыз

Бакет үшін [қатаң режимде](/kz/storage/s3/concepts/objects-lock#compliance-lock) (`COMPLIANCE`) уақытша бұғаттауды орнатып, деректерді сақтаудың нақты мерзімін көрсетіңіз:

{include(/kz/_includes/_s3-manage-object.md)[tags=configuration_lock_object]}

{note:err}

`COMPLIANCE` режимі орнатылғаннан кейін оны әлсіретуге немесе өшіруге болмайды, бірақ деректерді сақтау мерзімін ұлғайтуға болады.

{/note}

## 3. (Опционалды) Объект үшін жеке сақтау мерзімін орнатыңыз

Жеке сақтау мерзімі әртүрлі санаттарға жататын және сақтау мерзімі әртүрлі объектілер үшін орнатылуы мүмкін.

Объектіні жүктеу кезінде бұғаттауды орнатыңыз:

{include(/kz/_includes/_s3-manage-object.md)[tags=put_object]}

## 4. Бұғаттау күйін тексеріңіз

{include(/kz/_includes/_s3-manage-object.md)[tags=object_state]}

{cut(Команда шығысының мысалы)}

```json
{
  "Retention": {
    "Mode": "COMPLIANCE",
    "RetainUntilDate": "2030-01-01T00:00:00+00:00"
  }
}
```

{/cut}

## 5. (Опционалды) Мерзімсіз бұғаттауды орнатыңыз

Деректерді белгісіз мерзімге сақтау туралы ресми сұрау алынған жағдайда [мерзімсіз бұғаттауды](/kz/storage/s3/concepts/objects-lock#legal-hold-lock) (legal hold) пайдаланыңыз. Оның басымдығы кез келген сақтау мерзімінен жоғары және ол анық түрде алынғанға дейін объектіні жоюға немесе өзгертуге мерзімсіз тыйым салады.

1. Бұғаттауды орнатыңыз:

   {include(/kz/_includes/_s3-manage-object.md)[tags=object_legal_hold]}

1. Бұғаттау күйін тексеріңіз:

   {include(/kz/_includes/_s3-manage-object.md)[tags=object_state_legal_hold]}
   
   {cut(Команда шығысының мысалы)}
   
   ```json
   {
     "LegalHold": {
       "Status": "ON"
     }
   }
   ```
   
   {/cut}

{note:warn}

[Бұғаттауды алып тастау](/kz/storage/s3/instructions/objects/object-lock#object_legal_hold) тек тиісті құқықтар болған жағдайда ғана мүмкін және `Status=OFF` параметрі бар командамен орындалады.

{/note}
