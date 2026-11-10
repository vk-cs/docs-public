# {heading(Бакетпен AWS CLI арқылы жұмыс істегенде NoSuchBucket қатесі пайда болады)[id=s3-no-such-bucket]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Бар болатын бакет үшін AWS CLI-де команда орындағанда `An error occurred (NoSuchBucket) when calling the... operation: The specified bucket does not exist` қатесі қайтарылады.

Мәселе бірнеше себептермен пайда болуы мүмкін:

- бакет атауындағы қателер;
- AWS CLI конфигурациясындағы регион {ifdef(public)}аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=регионына]} {/ifdef}{ifdef(s3,s3-pdf)}сіздің инсталляцияңыздың регионына {var(s3)}{/ifdef} сәйкес келмейді;
- {var(s3)} сервисінің домені команда көрсетілмеген немесе дұрыс көрсетілмеген.

### {heading(Шешу)[id=s3-no-such-bucket-resolve]}

1. Бакет атауы дұрыс көрсетілгенін тексеріңіз.
   {ifdef(public)}
1. Команданың `--endpoint-url` параметрінде сервис домені дұрыс көрсетілгені және {var(s3)} аккаунтының {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=регионына]} сәйкес келетінін тексеріңіз:

   - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу регионасының домені;
   - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан регионасының домені.
   {/ifdef}
   {ifdef(s3,s3-pdf)}
1. Команданың `--endpoint-url` параметрінде сервис домені дұрыс көрсетілгенін тексеріңіз.
   {/ifdef}
1. AWS CLI конфигурациясын тексеріңіз:

   ```console
   aws configure list
   ```
   {ifdef(public)}
   Жауапта `region` өрісінде {var(s3)} аккаунтының {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=регионына]} сәйкес келетін мәндердің бірі болуы керек:

   - `ru-msk` — Мәскеу регионасы үшін;
   - `kz-ast` — Қазақстан регионасы үшін.
   {/ifdef}

   {ifdef(s3,s3-pdf)}
   Жауапта `region` өрісінде сіздің инсталляцияңызда қолданылатын регион коды болуы керек. Әдепкі бойынша: `ru-msk`.
   {/ifdef}

1. Егер `region` өрісінің мәні дұрыс болмаса, AWS CLI баптауларын өзгертіңіз:

   1. Команданы орындаңыз:

      ```console
      aws configure
      ```

   1. Параметрлердің мәндерін толтырыңыз:

      - `AWS Access Key ID`: сіздің {linkto(../../instructions/access-management/access-keys#s3-instructions-access-keys)[text={var(s3)} аккаунтыңыз]} үшін **Access Key ID** мәнін енгізіңіз.
      - `AWS Secret Access Key`: сіздің {linkto(../../instructions/access-management/access-keys#s3-instructions-access-keys)[text={var(s3)} аккаунтыңыз]} үшін **Secret Key** мәнін енгізіңіз.
      - `Default region name`: {ifdef(public)}`ru-msk` немесе `kz-ast`{/ifdef}{ifdef(s3,s3-pdf)}сіздің инсталляцияңызда қолданылатын регион кодын енгізіңіз. Әдепкі бойынша: `ru-msk`{/ifdef}.
      - `Default output format`: `json` енгізіңіз.