{include(/kz/_includes/_translated_by_ai.md)}

Сіз Marketplace арқылы сатып алынған image-based қолданбаларыңызбен пайдаланушылар жұмыс істеген кезде {var(cloud)} жүйесіне ресурс тұтыну метрикаларын жібере аласыз. Бұл {var(cloud)} жүйесіне пайдаланушылардан тұтынған ресурстары үшін өздері таңдаған тарифке сәйкес автоматты түрде ақы алуға мүмкіндік береді.

Төменде мысал ретінде {var(cloud)} жүйесіне метрикаларды қорғалған түрде жіберуді келесі қауіпсіздік механизмдерін пайдалана отырып қалай ұйымдастыруға болатыны көрсетілген:

- сервисті тоқтатпай орындалатын автоматты ротациясы бар уақытша токендер арқылы Marketplace API-ге қол жеткізу;
- ашық және жабық кілттер жұбын пайдаланып деректерді шифрлау;
- жабық кілттерді тек қорғалған инфрақұрылымда сақтау;
- көпдеңгейлі компрометацияны тексеру.

## {heading(Дайындық қадамдары)[id=preparatory_steps]}

1. Marketplace API-ге сұраулар деректерін шифрлау және Marketplace серверінен келген жауаптың цифрлық қолтаңбасының түпнұсқалығын тексеру үшін [marketplace@cloud.vk.com](mailto:marketplace@cloud.vk.com) мекенжайы бойынша шифрлауға арналған ашық кілтті сұратыңыз.
1. Сіздің image-based қолданбаңыз орнатылған ВМ [бейнесін дайындау](../../manage-apps/ibservice_add/ib_image_create) кезінде Marketplace API-ге қол жеткізу токені файлын сақтау үшін бума жасаңыз.

    {note:warn}

    Бұл мақсат үшін жүйелік бумаларды пайдалануға кеңес берілмейді, өйткені токені бар бумаға қол жеткізу құқықтары қауіпсіздік механизмдерімен шектеледі. Бұл ОЖ немесе басқа қолданбалардың жұмысында қателерге әкелуі мүмкін.

    {/note}

1. Қолданба кодында токен файлына жолды көрсетіңіз.
1. image-based қолданбаңыздың сервистік пакетін дайындау кезінде [Terraform манифесіне](../../manage-apps/ibservice_add/tf_manifest/tf_manifest_steps) мысалда көрсетілгендей қосымша ресурстарды қосыңыз:

    ```hcl
    resource "ivkcs_ssh_keypair" "keypair" {}
       
    resource "ivkcs_user_data" "init" {
      uuid         = var.instance_uuid
      hosts        = [local.hosts_name]
      target_os    = "almalinux9"
      token_file_path  = "/opt/agent/xaas-secret-auth-token.key"
      token_file_owner = "root"
      token_file_group = "root"
      token_rotate     = true
        
      ssh_authorized_keys = [
        ivkcs_ssh_keypair.keypair.public_key,
      ]
    }
    ```

    Мұнда:

    - `uuid` — image-based қолданба инстансының идентификаторы.
    - `hosts` — [Marketplace агентін](../../manage-apps/ibservice_add/ib_image_create/ib_image_agent) инициализациялауға арналған хост атауларының тізімі.
    - `target_os` — орналастырылған қолданбасы бар виртуалды машинаның ОЖ-сы.
    - `token_file_path` — токен файлына жол.
    - `token_file_owner` — токен файлының иесі болып тағайындалатын пайдаланушы. Міндетті емес аргумент.
    - `token_file_group` — токен файлы үшін тағайындалатын топ. Міндетті емес аргумент.
    - `token_rotate` — токеннің автоматты ротациясын орындау белгісі:
        - `true` — токен мезгіл-мезгіл жаңартылып отырады. Қолданбаңызды пайдаланушылардың ресурс тұтыну метрикалары сияқты сезімтал ақпаратты {var(cloud)} жүйесіне жіберген кезде токен ротациясын қосу ұсынылады.
        - `false` — токен жаңартылмайды. Бұл әдепкі мән.

    Ресурс аргументтері туралы толығырақ — [ivkcs_user_data ресурсы](../../manage-apps/ivkcs/ivkcs_resources/ivkcs_user_data) бөлімінде.

    Мысалда келтірілген ресурс конфигурациясы:

    - Marketplace API-ге әрекет ету мерзімі шектеулі қол жеткізу токенін жасайды;
    - `xaas-secret-auth-token.key` токені бар файлды виртуалды машинаның `/opt/agent` директориясына орналастырады;
    - токені бар файлға `root` тобының `root` пайдаланушысына құқықтар береді;
    - токенді мерзімді түрде жаңартуды қосады;
    - [Marketplace агенті](../../manage-apps/ibservice_add/ib_image_create/ib_image_agent) үшін (егер ол орнатылған болса) `/opt/agent/xaas-secret-auth-token.key` файлындағы токеннің өзектілігін қамтамасыз ету тапсырмасын іске қосады.

1. (Опционалды) Файлдағы токенді өзекті күйде ұстау үшін Marketplace агентін пайдалану мақсатында [Terraform манифесінде](../../manage-apps/ibservice_add/tf_manifest/tf_manifest_steps) агентті орнатуға тыйым жоқ екеніне көз жеткізіңіз: `agent_install = false`.

   Егер `agent_install` аргументі көрсетілмесе немесе `true` мәніне ие болса, агент image-based қолданбаңызды орналастыру процесінде автоматты түрде орнатылады.

   {note:warn}

   Егер токен ротациясын қоссаңыз, агентті орнатуға тыйым салу ұсынылмайды. Агентсіз файлдағы токен жаңартылмайды. Қолданбаңызға жаңартылған нұсқасын дер кезінде алу үшін Marketplace API арқылы токенді тұрақты түрде [сұратып](#get_token) отыру қажет болады.

   {/note}

## {heading(1. Marketplace API-ге қол жеткізу токенін алыңыз)[id=get_token]}

API-ге алғаш жүгінген кезде Terraform манифесінің `token_file_path` параметрінде [көрсетілген](#preparatory_steps) файлдан токенді шығарып алыңыз. Кейінгі жүгінулерде токенді алу тәсілі қолданбаңыздың инстансында агенттің орнатылғанына байланысты болады.

{tabs}

{tab(Агент орнатылған)}

Terraform манифесінің `token_file_path` параметрінде [көрсетілген](#preparatory_steps) файлдан токеннің өзекті нұсқасын шығарып алыңыз.

{/tab}

{tab(Агент орнатылмаған)}

Marketplace API-ге сұрау арқылы токенді алыңыз:

```shell
curl https://kz.cloud.vk.com/marketplace/api/infra-api/v1-public/auth/key \
-H 'Authorization: Bearer <TOKEN>'
```

Мұнда `<ТОКЕН>` — API-ге қол жеткізу токенінің ағымдағы нұсқасы.

Жауап құрылымы:

```json
{
    "instance_uuid": "<UUID_ИНСТАНСА>",
    "key": "<НОВЫЙ_ТОКЕН>",
    "secondary_key": "<ТОКЕН>"
}
```

Мұнда:

- `instance_uuid` — қолданбаңыз инстансының идентификаторы.
- `key` — жаңартылған қол жеткізу токені.
- `secondary_key` — қолданылу мерзімі жақында аяқталатын қол жеткізу токені. Бұл параметр болмауы мүмкін.

Егер жауапта `secondary_key` параметрі болмаса, ағымдағы токенді пайдалануды жалғастырыңыз. Әйтпесе API-ге келесі сұрауларда `key` параметрінде берілген токенді пайдаланыңыз. Токенді жаңасына ауыстырғаннан кейін алдыңғысы жарамсыз болады.

{note:warn}

Егер токен ротациясы қосылған болса, оны өзекті күйде ұстау үшін токен алу сұрауларын тұрақты түрде орындау қажет.

{/note}

{/tab}

{/tabs}

## 2. Бастапқы деректерді дайындаңыз

1. Жіберілетін метрикалар мен осы метрикаларды жинау уақытын (`base_date`) қамтитын JSON-файлды қалыптастырыңыз.
1. Файлды UTC форматындағы уақыт белгісімен (`timestamp`) толықтырыңыз.

Жіберуге арналған бастапқы деректері бар JSON-файл мысалы:

```json
{
  "payload": {
    "metrics": [
      {
        "id": 5001,
        "param": "cpu_usage",
        "value": 85.5
      },
      {
        "id": 5002,
        "param": "ram_usage",
        "value": 16384
      }
    ],
    "base_date": "2024-03-20T14:00:00Z"
  },
  "timestamp": "2024-03-20T14:00:00Z"
}
```

Бір ретте 50-ден артық метрика жіберуге болмайды.

## 3. Жіберілетін деректерді шифрлаңыз

{note:info}

Қолданбаңызда деректерді шифрлауды қалай іске асыруға болатынының мысалдары төменде келтірілген.

{/note}

1. AES-256 симметриялық шифрлауы үшін кілт жасаңыз. Генерация параметрлері:

    - Әдіс: `crypto/rand` криптографиялық тұрғыдан қауіпсіз кездейсоқ сандар генераторы.
    - Кілт өлшемі: 32 байт.

1. CBC (Cipher Block Chaining) шифрлау режимі үшін инициализация векторын (IV) жасаңыз. Генерация параметрлері:

    - Әдіс: `crypto/rand` криптографиялық тұрғыдан қауіпсіз кездейсоқ сандар генераторы.
    - IV өлшемі: 16 байт.

1. Бастапқы деректері бар JSON-файлды шифрлаңыз. Шифрлау параметрлері:

    - Алгоритм: CBC режиміндегі AES.
    - Толықтыру схемасы (padding): PKCS7.
    - Кілт: алдыңғы қадамдарда жасалған 32 байттық кілт.
    - IV: алдыңғы қадамдарда жасалған 16 байттық инициализация векторы.

1. Симметриялық шифрлауға арналған кілт пен инициализация векторын шифрлаңыз. Шифрлау параметрлері:

    - Алгоритм: OAEP толықтыру схемасы бар RSA.
    - Хеш-функция: SHA-256.
    - Кілт: бұрын алынған [ашық кілт](#preparatory_steps).

1. API-ге сұрау мазмұнын келесі құрылымды пайдаланып қалыптастырыңыз:

    ```json
    {
        "encryptedPayload": "<ЗАШИФРОВАННЫЕ_ДАННЫЕ>",
        "encryptedKey": "<ЗАШИФРОВАННЫЙ_КЛЮЧ>",
        "encryptedIV": "<ЗАШИФРОВАННЫЙ_IV>"
    }
    ```

    Мұнда:

    - `<ЗАШИФРОВАННЫЕ_ДАННЫЕ>` — бастапқы деректері бар шифрланған JSON-файл.
    - `<ЗАШИФРОВАННЫЙ_КЛЮЧ>` — симметриялық шифрлауға арналған шифрланған кілт.
    - `<ЗАШИФРОВАННЫЙ_IV>` — шифрланған инициализация векторы.

{cut(Деректерді шифрлау мысалдары)}

{tabs}

{tab(Python)}

```python
def encrypt_message(public_key_pem: str, data) -> dict:
    symmetric_key = os.urandom(32)  # AES-256
    iv = os.urandom(16)
 
    message_json = json.dumps(data).encode('utf-8')
 
    # Создаем падддинг для симметричного шифрования
    padder = sym_padding.PKCS7(algorithms.AES.block_size).padder()
    padded_data = padder.update(message_json) + padder.finalize()
 
    # Шифруем данные симметричным ключом
    cipher = Cipher(algorithms.AES(symmetric_key), modes.CBC(iv))
    encryptor = cipher.encryptor()
    encrypted_message = encryptor.update(padded_data) + encryptor.finalize()
 
    # Загружаем публичный ключ
    public_key = serialization.load_pem_public_key(public_key_pem.encode('utf-8'))
 
    # Шифруем симметричный ключ и IV публичным ключом
    encrypted_key = public_key.encrypt(
        symmetric_key,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )
 
    encrypted_iv = public_key.encrypt(
        iv,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )
    api_request = {
        "encryptedPayload": base64.urlsafe_b64encode(encrypted_message).decode('utf-8'),
        "encryptedKey": base64.urlsafe_b64encode(encrypted_key).decode('utf-8'),
        "encryptedIV": base64.urlsafe_b64encode(encrypted_iv).decode('utf-8')
    }
 
    return api_request
```

{/tab}

{tab(Golang)}

```golang
package main
 
import (
    "crypto/aes"
    "crypto/cipher"
    "crypto/rand"
    "crypto/rsa"
    "crypto/sha256"
    "crypto/x509"
    "encoding/base64"
    "encoding/json"
    "encoding/pem"
    "fmt"
    "time"
)

// Вставьте публичный ключ вместо плейсхолдера <ПУБЛИЧНЫЙ_КЛЮЧ>
const publicKeyPEM = `-----BEGIN RSA PUBLIC KEY-----
<ПУБЛИЧНЫЙ_КЛЮЧ>
-----END RSA PUBLIC KEY-----`
 
type EncryptedMessage struct {
    EncryptedPayload string `json:"encryptedPayload"`
    EncryptedKey     string `json:"encryptedKey"`
    EncryptedIV      string `json:"encryptedIV"`
}
 
func encryptMessage(payload []byte, publicKey *rsa.PublicKey) (*EncryptedMessage, error) {
    // Генерируем симметричный ключ (32 байта для AES-256)
    symmetricKey := make([]byte, 32)
    if _, err := rand.Read(symmetricKey); err != nil {
        return nil, fmt.Errorf("failed to generate symmetric key: %v", err)
    }
 
    // Генерируем IV (16 байт для CBC)
    iv := make([]byte, 16)
    if _, err := rand.Read(iv); err != nil {
        return nil, fmt.Errorf("failed to generate IV: %v", err)
    }
 
    // Создаем структуру для шифрования с timestamp
    messageToEncrypt := struct {
        Payload   string    `json:"payload"`
        Timestamp time.Time `json:"timestamp"`
    }{
        Payload:   base64.URLEncoding.EncodeToString(payload),
        Timestamp: time.Now().UTC(),
    }
 
    // Сериализуем структуру
    messageBytes, err := json.Marshal(messageToEncrypt)
    if err != nil {
        return nil, fmt.Errorf("failed to marshal message: %v", err)
    }
 
    // Создаем блочный шифр AES
    block, err := aes.NewCipher(symmetricKey)
    if err != nil {
        return nil, fmt.Errorf("failed to create cipher: %v", err)
    }
 
    // Создаем режим CBC
    mode := cipher.NewCBCEncrypter(block, iv)
 
    // Добавляем padding (PKCS7)
    paddedPayload := pkcs7Pad(messageBytes, aes.BlockSize)
 
    // Шифруем payload
    encryptedPayload := make([]byte, len(paddedPayload))
    mode.CryptBlocks(encryptedPayload, paddedPayload)
 
    // Шифруем симметричный ключ публичным ключом с использованием OAEP
    encryptedKey, err := rsa.EncryptOAEP(
        sha256.New(),
        rand.Reader,
        publicKey,
        symmetricKey,
        nil,
    )
    if err != nil {
        return nil, fmt.Errorf("failed to encrypt symmetric key: %v", err)
    }
 
    // Шифруем IV публичным ключом с использованием OAEP
    encryptedIV, err := rsa.EncryptOAEP(
        sha256.New(),
        rand.Reader,
        publicKey,
        iv,
        nil,
    )
    if err != nil {
        return nil, fmt.Errorf("failed to encrypt IV: %v", err)
    }
 
    // Формируем зашифрованное сообщение
    return &EncryptedMessage{
        EncryptedPayload: base64.URLEncoding.EncodeToString(encryptedPayload),
        EncryptedKey:     base64.URLEncoding.EncodeToString(encryptedKey),
        EncryptedIV:      base64.URLEncoding.EncodeToString(encryptedIV),
    }, nil
}
 
// pkcs7Pad добавляет padding согласно PKCS7
func pkcs7Pad(data []byte, blockSize int) []byte {
    padding := blockSize - len(data)%blockSize
    padText := make([]byte, len(data)+padding)
    copy(padText, data)
    for i := len(data); i < len(padText); i++ {
        padText[i] = byte(padding)
    }
    return padText
}
 
func main() {
    // Декодируем PEM в структуру публичного ключа
    block, _ := pem.Decode([]byte(publicKeyPEM))
    if block == nil {
        panic("Ошибка декодирования PEM блока")
    }
 
    publicKey, err := x509.ParsePKCS1PublicKey(block.Bytes)
    if err != nil {
        panic(fmt.Sprintf("Ошибка парсинга публичного ключа: %v", err))
    }
 
    // Тестовое сообщение
    jsn := `{
        "metrics": [
            {
                "id": "unique-id",
                "param": "cpu_usage",
                "value": 1.5
            }
        ],
        "base_date": "2024-10-24T10:00:00Z"
    }`
    message := []byte(jsn)
    fmt.Printf("Исходное сообщение: %s\n", message)
 
    // Шифруем сообщение
    encryptedMsg, err := encryptMessage(message, publicKey)
    if err != nil {
        panic(fmt.Sprintf("Ошибка шифрования: %v", err))
    }
 
    // Конвертируем в JSON
    jsonData, err := json.MarshalIndent(encryptedMsg, "", "    ")
    if err != nil {
        panic(fmt.Sprintf("Ошибка создания JSON: %v", err))
    }
 
    fmt.Printf("\nJSON для API запроса:\n%s\n", string(jsonData))
}
```

{/tab}

{/tabs}

{/cut}

## 4. (Опционалды) Метрикаларды жіберуді тестілеңіз

{var(cloud)} жүйесіне метрикаларды беру процесін жөндеу үшін Marketplace API-ге сұрау орындаңыз:

```shell
curl -X POST https://kz.cloud.vk.com/marketplace/api/infra-api/v1-public/metrics/decrypt \
-H 'Authorization: Bearer <ТОКЕН>' \
-H 'Content-Type: application/json' \
--data-raw '{
    "encryptedPayload": "<ЗАШИФРОВАННЫЕ_ДАННЫЕ>",
    "encryptedKey": "<ЗАШИФРОВАННЫЙ_КЛЮЧ>",
    "encryptedIV": "<ЗАШИФРОВАННЫЙ_IV>"
}'
```

Мұнда:

- `<ТОКЕН>` — API-ге қол жеткізу токені.
- `<ЗАШИФРОВАННЫЕ_ДАННЫЕ>` — бастапқы деректері бар шифрланған JSON-файл.
- `<ЗАШИФРОВАННЫЙ_КЛЮЧ>` — симметриялық шифрлауға арналған шифрланған кілт.
- `<ЗАШИФРОВАННЫЙ_IV>` — шифрланған инициализация векторы.

Сұрау сәтті өңделсе, API берілген метрикалардың тізімін қайтарады.

Жауап мысалы:

```json
{
    "payload": {
        "metrics_ids": [5001, 5002],
        "timestamp": "2024-03-20T14:00:02Z"
    },
    "signature": "<ЗАШИФРОВАННАЯ_ПОДПИСЬ>",
}
```

{note:warn}

Берілген метрикаларға сәйкес ресурс тұтынуды есепке алу және пайдаланушыларға тиісті есептеулер жүргізілмейді.

{/note}

## 5. Метрикаларды {var(cloud)} жүйесіне жіберіңіз

Marketplace API-ге сұрау орындаңыз:

```shell
curl -X POST https://kz.cloud.vk.com/marketplace/api/infra-api/v1-public/metrics/push \
-H 'Authorization: Bearer <ТОКЕН>' \
-H 'Content-Type: application/json' \
--data-raw '{
    "encryptedPayload": "<ЗАШИФРОВАННЫЕ_ДАННЫЕ>",
    "encryptedKey": "<ЗАШИФРОВАННЫЙ_КЛЮЧ>",
    "encryptedIV": "<ЗАШИФРОВАННЫЙ_IV>"
}'
```

Мұнда:

- `<ТОКЕН>` — API-ге қол жеткізу токені.
- `<ЗАШИФРОВАННЫЕ_ДАННЫЕ>` — бастапқы деректері бар шифрланған JSON-файл.
- `<ЗАШИФРОВАННЫЙ_КЛЮЧ>` — симметриялық шифрлауға арналған шифрланған кілт.
- `<ЗАШИФРОВАННЫЙ_IV>` — шифрланған инициализация векторы.

Сұрау сәтті өңделсе, API берілген метрикалардың тізімін қайтарады.

Жауап мысалы:

```json
{
    "payload": {
        "metrics_ids": [5001, 5002],
        "timestamp": "2024-03-20T14:00:02Z"
    },
    "signature": "<ЗАШИФРОВАННАЯ_ПОДПИСЬ>",
}
```
