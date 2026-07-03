# {heading(AWS CLI арқылы бакетпен жұмыс істегенде NoSuchBucket қатесі пайда болады)[id=s3-no-such-bucket]}

{include(/kz/_includes/_translated_by_ai.md)}

AWS CLI-де бар бакет үшін команданы орындаған кезде `An error occurred (NoSuchBucket) when calling the... operation: The specified bucket does not exist` қатесі қайтарылады.

Мәселе бірнеше себепке байланысты туындауы мүмкін:

- бакет атауындағы қате жазылу;
- AWS CLI конфигурациясындағы өңір {ifdef(public)}аккаунттың {linkto(/kz/tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} {/ifdef}{ifdef(s3,s3-pdf)}{var(s3)} инсталляцияңыздың өңіріне{/ifdef} сәйкес келмейді;
- {var(s3)} сервисінің домені командада көрсетілмеген немесе қате көрсетілген.

### {heading(Шешімі)[id=s3-no-such-bucket-resolve]}

1. Бакет атауы дұрыс көрсетілгеніне көз жеткізіңіз.
   {ifdef(public)}
1. Команданың `--endpoint-url` параметрінде сервис домені дұрыс көрсетілгеніне және {var(s3)} аккаунтының {linkto(/kz/tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келетініне көз жеткізіңіз:

   - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
   - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
   {/ifdef}
   {ifdef(s3,s3-pdf)}
1. Команданың `--endpoint-url` параметрінде сервис домені дұрыс көрсетілгеніне көз жеткізіңіз.
   {/ifdef}
1. AWS CLI конфигурациясын тексеріңіз:

   ```console
   aws configure list
   ```
   {ifdef(public)}
   Жауаптағы `region` өрісінде {var(s3)} аккаунтының {linkto(/kz/tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келетін мәндердің бірі болуы керек:

   - `ru-msk` — Мәскеу өңірі үшін;
   - `kz-ast` — Қазақстан өңірі үшін.
   {/ifdef}

   {ifdef(s3,s3-pdf)}
   Жауаптағы `region` өрісінде инсталляцияңызда қолданылатын өңір коды болуы керек. Әдепкі бойынша: `ru-msk`.
   {/ifdef}

1. Егер `region` өрісінің мәні дұрыс болмаса, AWS CLI баптауларын өзгертіңіз:

   1. Команданы орындаңыз:
    
      ```console
      aws configure
      ```
      
   1. Параметр мәндерін толтырыңыз:

      - `AWS Access Key ID`: {linkto(../../instructions/access-management/access-keys#s3-instructions-access-keys)[text={var(s3)} аккаунтыңыз]} үшін **Access Key ID** мәнін енгізіңіз.
      - `AWS Secret Access Key`: {linkto(../../instructions/access-management/access-keys#s3-instructions-access-keys)[text={var(s3)} аккаунтыңыз]} үшін **Secret Key** мәнін енгізіңіз.
      - `Default region name`: {ifdef(public)}`ru-msk` немесе `kz-ast`{/ifdef}{ifdef(s3,s3-pdf)}инсталляцияңызда қолданылатын өңір кодын енгізіңіз. Әдепкі бойынша: `ru-msk`{/ifdef}.
      - `Default output format`: `json` енгізіңіз.