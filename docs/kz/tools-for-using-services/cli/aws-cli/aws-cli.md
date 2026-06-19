# {heading(AWS CLI)[id=tools-cli-aws]}

{include(/kz/_includes/_translated_by_ai.md)}

AWS пәрмен жолы интерфейсі (AWS CLI) {var(cloud)} сервистерімен консоль арқылы жұмыс істеуге мүмкіндік береді.

AWS CLI екі нұсқада қолжетімді:

- 2.X нұсқасы — қазіргі қолданыстағы жалпыға қолжетімді нұсқа, осы нұсқаны пайдаланған жөн.
- 1.X нұсқасы — кері үйлесімділікті қамтамасыз ету үшін қолжетімді алдыңғы нұсқа.

 {note:info}

{var(s3)} сервисі AWS CLI келесі нұсқаларын қолдайды: 1.36.40 немесе төмен, 2.22.35 немесе төмен.

{/note}

AWS CLI пәрмендер жиынтығы және қосымша баптаулар туралы толық ақпарат [әзірлеушінің сайтында](https://docs.aws.amazon.com/cli/index.html) қолжетімді.

## {heading({counter(aws-cli)}. AWS клиентін орнатыңыз)[id=aws-install]}

{tabs}

{tab(Linux)}
Талаптар:

- CentOS, Fedora, Ubuntu, Amazon Linux 1, Amazon Linux 2 және Linux ARM жүйелерінің 64-биттік нұсқасы;
- жүктелген пакетті архивтен шығару мүмкіндігі: `unzip` пәрмені немесе соған ұқсас құрал;
- `glibc`, `groff` және `less` пакеттері орнатылған және қолжетімді болуы керек.

Linux x86 (64-бит) үшін орындаңыз:

  ```console
  curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
  unzip awscliv2.zip
  sudo ./aws/install
  ```

Linux ARM үшін орындаңыз:

  ```console
  curl "https://awscli.amazonaws.com/awscli-exe-linux-aarch64.zip" -o "awscliv2.zip"
  unzip awscliv2.zip
  sudo ./aws/install
  ```

{/tab}

{tab(macOS)}

Талаптар:

- macOS жүйесінің 64-биттік нұсқасы.

Орнату:

1. [AWS CLI MSI орнатқышын](https://awscli.amazonaws.com/AWSCLIV2.pkg) жүктеп алып, ашыңыз немесе консольде пәрменді орындаңыз:

    ```console
    curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o   "AWSCLIV2.pkg"
    sudo installer -pkg AWSCLIV2.pkg -target /
    ```

1. Орнату шеберінің нұсқауларын орындаңыз.

{/tab}

{tab(Windows)}

Талаптар:

- Windows жүйесінің 64-биттік нұсқасы;
- әкімші құқықтары.

Орнату:

1. [AWS CLI MSI орнатқышын](https://awscli.amazonaws.com/AWSCLIV2.msi) жүктеп алып, ашыңыз немесе консольде пәрменді орындаңыз:

    ```console
   msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi
   ```

1. Орнату шеберінің нұсқауларын орындаңыз. Әдепкі бойынша AWS CLI `C:\\Program Files\\Amazon\\AWSCLIV2` ішіне орнатылады.

{/tab}

{/tabs}

## {heading({counter(aws-cli)}. AWS орнатылуын тексеріңіз)[id=aws-check]}

Консольде пәрменді орындаңыз:

  ```console
  aws --version
  ```
Егер AWS клиенті орнатылған болса, консоль шығысында оның нұсқасы көрсетіледі.
