# {heading(Нормативтік талаптарға сәйкестік үшін қойманы баптау)[id=s3-regulatory-requirements]}

{include(/kz/_includes/_translated_by_ai.md)}

{var(s3)} объектілерді {linkto(../../concepts/objects-lock#s3-concepts-object-lock)[text=олардың жойылуын немесе қайта жазылуын бұғаттау]} (Object Lock) арқылы қорғауға мүмкіндік береді. Объектілерді бұғаттауды сындарлы деректер үшін (мысалы, дербес деректер) пайдаланыңыз: нормативтік немесе заңнамалық талаптарға сәйкес оларды белгіленген мерзімдер ішінде өзгермейтін түрде сақтап, кейін жою қажет. Бұл аудит пен заңдық маңыздылықты қамтамасыз етуге көмектеседі.

## {heading(Дайындық қадамдары)[id=s3-regulatory-requirements-prepare]}

AWS CLI {linkto(../../connect/s3-cli#s3-connect-cli)[text=орнатылған және бапталған]} екеніне көз жеткізіңіз.

## {heading(1. Бакетті дайындаңыз)[id=s3-regulatory-requirements-bucket-create]}

1. Жаңа бакет жасаңыз:

   {include(../../_includes/_s3-manage-bucket.md)[tags=create_bucket,create_bucket_guide]} 

1. {linkto(../../concepts/versioning#s3-concepts-versioning)[text=Нұсқалауды]} қосыңыз:

   {include(../../_includes/_s3-manage-bucket.md)[tags=version_bucket]}

1. {linkto(../../concepts/objects-lock#s3-concepts-object-lock)[text=Объектілерді бұғаттауды]} қосыңыз:

   {include(../../_includes/_s3-manage-object.md)[tags=object_config_block]}

## {heading(2. Бакет үшін әдепкі сақтау саясатын баптаңыз)[id=s3-regulatory-requirements-policy-settings]}

Бакет үшін уақытша бұғаттауды {linkto(../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=қатаң режимде]} (`COMPLIANCE`) орнатып, деректерді сақтаудың нақты мерзімін көрсетіңіз:

{include(../../_includes/_s3-manage-object.md)[tags=configuration_lock_object,configuration_lock_object_guide]}

{note:err}
`COMPLIANCE` режимі орнатылғаннан кейін оны әлсіретуге немесе өшіруге болмайды, бірақ деректерді сақтау мерзімін ұлғайтуға болады.
{/note}

## {heading(3. (Қосымша) Объект үшін жеке сақтау мерзімін орнатыңыз)[id=s3-regulatory-requirements-shelf-life]}

Жеке сақтау мерзімі әртүрлі санаттарға жататын және сақтау мерзімі әртүрлі объектілер үшін орнатылуы мүмкін.

Объектіні жүктеу кезінде бұғаттауды орнатыңыз:

{include(../../_includes/_s3-manage-object.md)[tags=put_object]}

## {heading(4. Бұғаттау күйін тексеріңіз)[id=s3-regulatory-requirements-status-block]}

{include(../../_includes/_s3-manage-object.md)[tags=object_state]}

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

## {heading(5. (Қосымша) Мерзімсіз бұғаттауды орнатыңыз)[id=s3-regulatory-requirements-legal-hold-lock]}

Деректерді белгісіз мерзімге сақтау туралы ресми сұрау түскен кезде {linkto(../../concepts/objects-lock#s3-concepts-object-lock-legal-hold)[text=мерзімсіз бұғаттауды]} (legal hold) пайдаланыңыз. Ол кез келген сақтау мерзімдерінен басымдыққа ие және айқын түрде алынғанға дейін объектіні жоюға немесе өзгертуге мерзімсіз тыйым салады.

1. Бұғаттауды орнатыңыз:

   {include(../../_includes/_s3-manage-object.md)[tags=object_legal_hold]}

1. Бұғаттау күйін тексеріңіз:

   {include(../../_includes/_s3-manage-object.md)[tags=object_state_legal_hold]}
   
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
{linkto(../../instructions/objects/object-lock#s3-instructions-object-lock-legal-hold)[text=Бұғаттауды алып тастау]} тек тиісті құқықтар болған кезде ғана мүмкін және `Status=OFF` параметрі бар командамен орындалады.
{/note}
