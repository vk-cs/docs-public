{include(/kz/_includes/_translated_by_ai.md)}

AWS CLI командасын бар бакет үшін орындаған кезде `An error occurred (NoSuchBucket) when calling the... operation: The specified bucket does not exist` қатесі қайтарылады.

Мәселе бірнеше себепке байланысты туындауы мүмкін: 

- бакет атауындағы қателер;
- AWS CLI конфигурациясындағы аймақ VK Object Storage аккаунтының [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес келмейді;
- VK Object Storage сервисінің домені командада көрсетілмеген немесе қате көрсетілген.

### Шешім

1. Бакет атауы дұрыс көрсетілгеніне көз жеткізіңіз.

1. `--endpoint-url` команда параметрінде сервис домені дұрыс көрсетілгеніне және VK Object Storage аккаунтының [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес келетініне көз жеткізіңіз:

   - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
   - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

1. AWS CLI конфигурациясын тексеріңіз:

   ```console
   aws configure list
   ```

   Жауапта `region` өрісінде VK Object Storage аккаунтының [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес келетін мәндердің бірі болуы керек:

   - `ru-msk` — Мәскеу аймағы үшін;
   - `kz-ast` — Қазақстан аймағы үшін.

1. Егер `region` өрісінің мәні көрсетілгендерден өзгеше болса, AWS CLI баптауларын өзгертіңіз:

   1. Команданы орындаңыз:

      ```console
      aws configure
      ```

   1. Параметр мәндерін толтырыңыз:

      - `AWS Access Key ID`: [VK Object Storage аккаунтыңыздың](/kz/storage/s3/instructions/access-management/access-keys) **Access Key ID** мәнін енгізіңіз;
      - `AWS Secret Access Key`: [VK Object Storage аккаунтыңыздың](/kz/storage/s3/instructions/access-management/access-keys) **Secret Key** мәнін енгізіңіз;
      - `Default region name`: `ru-msk` немесе `kz-ast` енгізіңіз;
      - `Default output format`: `json` енгізіңіз.
