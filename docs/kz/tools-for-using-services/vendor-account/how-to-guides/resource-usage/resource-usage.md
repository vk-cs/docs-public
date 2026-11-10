{var(cloud)} платформасына Marketplace-те сатып алынған image-based қолданбаларыңызбен жұмыс істеу кезінде пайдаланушылардың ресурстарды тұтыну метрикаларын жібере аласыз. Бұл {var(cloud)} платформасына пайдаланушылардан тұтынылған ресурстар үшін олар таңдаған тарифке сәйкес ақыны автоматты түрде алуға мүмкіндік береді.

Төменде мысалда қауіпсіздікті қамтамасыз етудің келесі механизмдерін пайдалана отырып, метрикаларды {var(cloud)} платформасына қорғалған түрде жіберу жолы көрсетілген:

- қызметті тоқтатпай орындалатын автоматты ротациясы бар уақытша токендер арқылы Marketplace API-ға қолжетімділік;
- ашық және жабық кілттер жұбын пайдалана отырып деректерді шифрлау;
- жабық кілттерді тек қорғалған инфрақұрылымда сақтау;
- компрометацияны көпдеңгейлі тексеру.

## {heading(Дайындық қадамдар)[id=preparatory_steps]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

1. Marketplace API-ға жасалатын сұраулардың деректерін шифрлау және Marketplace серверінің жауабының цифрлық қолтаңбасының растығын тексеру үшін [marketplace@cloud.vk.com](mailto:marketplace@cloud.vk.com) мекенжайы бойынша шифрлаудың ашық кілтін сұраңыз.
1. Сіздің image-based қолданбаңыз орнатылған ВМ [бейнесін дайындау](../../manage-apps/ibservice_add/ib_image_create) кезінде Marketplace API-ға қолжетімділік токені сақталатын файлға арналған қалтаны жасаңыз.

    {note:warn}

    Бұл мақсатқа бар жүйелік қалталарды пайдалану ұсынылмайды, себебі токен орналасқан қалтаға қолжетімділік құқықтары қауіпсіздікті қамтамасыз ету механизмдерімен шектеледі. Бұл ОЖ немесе басқа қолданбалардың жұмысында қателерге әкелуі мүмкін.

    {/note}

1. Қолданба кодында қолжетімділік токені сақталған файлға апаратын жолды көрсетіңіз.
1. Image-based қолданбаңыздың сервисілік пакетін дайындау кезінде [Terraform манифесіне](../../manage-apps/ibservice_add/tf_manifest/tf_manifest_steps) мысалда көрсетілгендей қосымша ресурстарды қосыңыз:

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

    - `uuid` — image-based қолданбаның инстансының идентификаторы.
    - `hosts` — [Marketplace агентіне](/kz/tools-for-using-services/vendor-account/manage-apps/concepts/vendor-preconditions/ib_image_agent) арналған хост атауларының тізімі.
    - `target_os` — қолданба орнатылған виртуалды машинаның ОЖ.
    - `token_file_path` — токені бар файлға апаратын жол.
    - `token_file_owner` — токені бар файлдың иесі болып тағайындалатын пайдаланушы. Міндетті емес аргумент.
    - `token_file_group` — токені бар файлға тағайындалатын топ. Міндетті емес аргумент.
    - `token_rotate` — токеннің автоматты ротациясын орындау белгісі:
        - `true` — токен уақыт сайын жаңартылады. Қолданбаңыздың пайдаланушыларының ресурстарды тұтыну метрикалары сияқты құпия ақпаратты {var(cloud)} платформасына жіберу кезінде токен ротациясын қосу ұсынылады.
        - `false` — токен жаңартылмайды. Бұл әдепкі мән.

    Ресурс аргументтері туралы толығырақ — [ivkcs_user_data ресурсы](../../manage-apps/ivkcs/ivkcs_resources/ivkcs_user_data) бөлімінде.

    Мысалда келтірілген ресурстар конфигурациясы:

    - қолданылу мерзімі шектеулі Marketplace API қолжетімділігінің токенін жасайды;
    - токені бар `xaas-secret-auth-token.key` файлын виртуалды машинаның `/opt/agent` каталогына орналастырады;
    - токені бар файлға `root` тобының `root` пайдаланушысына құқықтар береді;
    - токеннің мерзімді жаңартылуын қосады;
    - [Marketplace агенті үшін](/kz/tools-for-using-services/vendor-account/manage-apps/concepts/vendor-preconditions/ib_image_agent) (орнатылған болса) `/opt/agent/xaas-secret-auth-token.key` файлындағы токенді өзекті күйде ұстау міндеттемесін іске қосады.

1. (Міндетті емес) Агентті токеннің өзектілігін сақтау үшін пайдалану үшін [Terraform манифесінде](../../manage-apps/ibservice_add/tf_manifest/tf_manifest_steps) агентті орнатуға тыйым салынбағанына көз жеткізіңіз: `agent_install = false`.

   Егер `agent_install` аргументі көрсетілмесе немесе `true` мәні болса, агент сіздің image-based қолданбаңыз орнатылу барысында автоматты түрде орнатылады.

   {note:warn}

   Токен ротациясын қоссаңыз, агенттің орнатылуына тыйым салу ұсынылмайды. Агент болмаса, файлдағы токен жаңартылмайды. Қолданбаңыз жаңартуларды уақтылы алу үшін Marketplace API-дан [токенді мезгіл-мезгіл сұрап](#get_token) тұруы қажет болады.

   {/note}

## {heading(1. Marketplace API қолжетімдігінің токенін алыңыз)[id=get_token]}

API-ға алғашқы өтіну кезінде токенді Terraform манифесінің `token_file_path` параметрінде [көрсетілген](#preparatory_steps) файлдан алыңыз. Кейінгі өтінімдер кезінде токен алу тәсілі қолданбаңыздың инстансында агент орнатылған-орнатылмағанына байланысты.

{tabs}

{tab(Агент орнатылған)}

Токеннің өзекті нұсқасын Terraform манифесінің `token_file_path` параметрінде [көрсетілген](#preparatory_steps) файлдан алыңыз.

{/tab}

{tab(Агент орнатылмаған)}

Marketplace API-ға сұрау арқылы токенді алыңыз:

```shell
curl https://msk.cloud.vk.ru/marketplace/api/infra-api/v1-public/auth/key \
-H 'Authorization: Bearer <TOKEN>'
```

Мұнда `<ТОКЕН>` — API қолжетімдігі токенінің өзекті нұсқасы.

Жауап құрылымы:

```json
{
    "instance_uuid": "<UUID_ИНСТАНСА>",
    "key": "<НОВЫЙ_ТОКЕН>",
    "secondary_key": "<ТОКЕН>"
}
```

Мұнда:

- `instance_uuid` — қолданбаңыздың инстансының идентификаторы.
- `key` — жаңартылған қолжетімділік токені.
- `secondary_key` — қолданылу мерзімі жақында бітетін қолжетімділік токені. Бұл параметр болмауы мүмкін.

Егер жауапта `secondary_key` параметрі болмаса, ағымдағы токенді пайдалана беруді жалғастырыңыз. Әйтпесе, API-ға келесі сұрауларда `key` параметрімен берілген токенді пайдаланыңыз. Токен жаңасына ауыстырылғаннан кейін алдыңғысы жарамсыз болады.

{note:warn}

Токен ротациясы қосылған болса, оның өзекті күйін сақтау үшін токен алу сұрауларын мезгіл-мезгіл орындау қажет.

{/note}

{/tab}

{/tabs}

## 2. Бастапқы деректерді дайындаңыз

1. Жіберілетін метрикаларды және олардың жиналу уақытын (`base_date`) қамтитын JSON-файлды құрыңыз.
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

Бір мезгілде 50 метрикадан асырып жібере алмайсыз.

## 3. Жіберуге арналған деректерді шифрлаңыз

{note:info}
Қолданбаңызда деректерді шифрлауды қалай жүзеге асыруға болатынының мысалдары төменде келтірілген.
{/note}

1. AES-256 симметриялық шифрлауына арналған кілтті генерациялаңыз. Генерациялау параметрлері:

    - Әдіс: `crypto/rand` криптографиялық қауіпсіз кездейсоқ сандар генераторы.
    - Кілт өлшемі: 32 байт.

1. CBC (Cipher Block Chaining) шифрлау режиміне арналған инициализация векторын (IV) генерациялаңыз. Генерациялау параметрлері:

    - Әдіс: `crypto/rand` криптографиялық қауіпсіз кездейсоқ сандар генераторы.
    - IV өлшемі: 16 байт.

1. Бастапқы деректері бар JSON-файлды шифрлаңыз. Шифрлау параметрлері:

    - Алгоритм: CBC режиміндегі AES.
    - Толықтыру схемасы (padding): PKCS7.
    - Кілт: алдыңғы қадамдарда генерацияланған 32 байттық кілт.
    - IV: алдыңғы қадамдарда генерацияланған 16 байттық инициализация векторы.

1. Симметриялық шифрлау кілтін және инициализация векторын шифрлаңыз. Шифрлау параметрлері:

    - Алгоритм: OAEP толықтыру схемасы бар RSA.
    - Хэш-функция: SHA-256.
    - Кілт: бұрын алынған [ашық кілт](#preparatory_steps).

1. API-ға сұрау үшін мазмұнды келесі құрылымды пайдалана отырып құрыңыз:

    ```json
    {
        "encryptedPayload": "<ЗАШИФРОВАННЫЕ_ДАННЫЕ>",
        "encryptedKey": "<ЗАШИФРОВАННЫЙ_КЛЮЧ>",
        "encryptedIV": "<ЗАШИФРОВАННЫЙ_IV>"
    }
    ```

    Мұнда:

    - `<ЗАШИФРОВАННЫЕ_ДАННЫЕ>` — бастапқы деректері бар шифрланған JSON-файл.
    - `<ЗАШИФРОВАННЫЙ_КЛЮЧ>` — шифрланған симметриялық шифрлау кілті.
    - `<ЗАШИФРОВАННЫЙ_IV>` — шифрланған инициализация векторы.

{cut(Деректерді шифрлау мысалдары)}

{tabs}

{tab(Python)}

```python
def encrypt_message(public_key_pem: str, data) -> dict:
    symmetric_key = os.urandom(32)  # AES-256
    iv = os.urandom(16)

    message_json = json.dumps(data).encode('utf-8')

# Симметриялық шифрлауға арналған паддинг жасаймыз
    padder = sym_padding.PKCS7(algorithms.AES.block_size).padder()
    padded_data = padder.update(message_json) + padder.finalize()

# Деректерді симметриялық кілтпен шифрлаймыз
    cipher = Cipher(algorithms.AES(symmetric_key), modes.CBC(iv))
    encryptor = cipher.encryptor()
    encrypted_message = encryptor.update(padded_data) + encryptor.finalize()

# Ашық кілтті жүктейміз
    public_key = serialization.load_pem_public_key(public_key_pem.encode('utf-8'))

# Симметриялық кілт пен IV-ны ашық кілтпен шифрлаймыз
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

// <АШЫҚ_КІЛТ> плейсхолдерінің орнына ашық кілтті қойыңыз
const publicKeyPEM = `-----BEGIN RSA PUBLIC KEY-----
<АШЫҚ_КІЛТ>
-----END RSA PUBLIC KEY-----`

type EncryptedMessage struct {
    EncryptedPayload string `json:"encryptedPayload"`
    EncryptedKey     string `json:"encryptedKey"`
    EncryptedIV      string `json:"encryptedIV"`
}

func encryptMessage(payload []byte, publicKey *rsa.PublicKey) (*EncryptedMessage, error) {
    // Симметриялық кілтті генерациялаймыз (AES-256 үшін 32 байт)
    symmetricKey := make([]byte, 32)
    if _, err := rand.Read(symmetricKey); err != nil {
        return nil, fmt.Errorf("failed to generate symmetric key: %v", err)
    }

    // IV-ны генерациялаймыз (CBC үшін 16 байт)
    iv := make([]byte, 16)
    if _, err := rand.Read(iv); err != nil {
        return nil, fmt.Errorf("failed to generate IV: %v", err)
    }

    // timestamp бар шифрлау құрылымын жасаймыз
    messageToEncrypt := struct {
        Payload   string    `json:"payload"`
        Timestamp time.Time `json:"timestamp"`
    }{
        Payload:   base64.URLEncoding.EncodeToString(payload),
        Timestamp: time.Now().UTC(),
    }

    // Құрылымды сериализациялаймыз
    messageBytes, err := json.Marshal(messageToEncrypt)
    if err != nil {
        return nil, fmt.Errorf("failed to marshal message: %v", err)
    }

    // AES блоктық шифрын жасаймыз
    block, err := aes.NewCipher(symmetricKey)
    if err != nil {
        return nil, fmt.Errorf("failed to create cipher: %v", err)
    }

    // CBC режимін жасаймыз
    mode := cipher.NewCBCEncrypter(block, iv)

    // Padding қосамыз (PKCS7)
    paddedPayload := pkcs7Pad(messageBytes, aes.BlockSize)

    // Payload-ты шифрлаймыз
    encryptedPayload := make([]byte, len(paddedPayload))
    mode.CryptBlocks(encryptedPayload, paddedPayload)

    // Симметриялық кілтті OAEP пайдалана отырып ашық кілтпен шифрлаймыз
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

    // IV-ты OAEP пайдалана отырып ашық кілтпен шифрлаймыз
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

    // Шифрланған хабарламаны құрастырамыз
    return &EncryptedMessage{
        EncryptedPayload: base64.URLEncoding.EncodeToString(encryptedPayload),
        EncryptedKey:     base64.URLEncoding.EncodeToString(encryptedKey),
        EncryptedIV:      base64.URLEncoding.EncodeToString(encryptedIV),
    }, nil
}

// pkcs7Pad PKCS7 бойынша padding қосады
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
    // PEM-ді ашық кілт құрылымына декодтаймыз
    block, _ := pem.Decode([]byte(publicKeyPEM))
    if block == nil {
        panic("PEM блогын декодтау қатесі")
    }

    publicKey, err := x509.ParsePKCS1PublicKey(block.Bytes)
    if err != nil {
        panic(fmt.Sprintf("Ашық кілтті парсингтеу қатесі: %v", err))
    }

    // Тестік хабарлама
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
    fmt.Printf("Бастапқы хабарлама: %s\n", message)

    // Хабарламаны шифрлаймыз
    encryptedMsg, err := encryptMessage(message, publicKey)
    if err != nil {
        panic(fmt.Sprintf("Шифрлау қатесі: %v", err))
    }

    // JSON-ға түрлендіреміз
    jsonData, err := json.MarshalIndent(encryptedMsg, "", "    ")
    if err != nil {
        panic(fmt.Sprintf("JSON жасау қатесі: %v", err))
    }

    fmt.Printf("\nAPI сұрауына арналған JSON:\n%s\n", string(jsonData))
}
```

{/tab}

{/tabs}

{/cut}

## 4. (Міндетті емес) Метрикаларды жіберуін тексеріңіз

{var(cloud)} платформасына метрикаларды беру процесін отладкалау үшін Marketplace API-ға сұрау орындаңыз:

```shell
curl -X POST https://msk.cloud.vk.ru/marketplace/api/infra-api/v1-public/metrics/decrypt \
-H 'Authorization: Bearer <ТОКЕН>' \
-H 'Content-Type: application/json' \
--data-raw '{
    "encryptedPayload": "<ЗАШИФРОВАННЫЕ_ДАННЫЕ>",
    "encryptedKey": "<ЗАШИФРОВАННЫЙ_КЛЮЧ>",
    "encryptedIV": "<ЗАШИФРОВАННЫЙ_IV>"
}'
```

Мұнда:

- `<ТОКЕН>` — API қолжетімдігінің токені.
- `<ЗАШИФРОВАННЫЕ_ДАННЫЕ>` — бастапқы деректері бар шифрланған JSON-файл.
- `<ЗАШИФРОВАННЫЙ_КЛЮЧ>` — шифрланған симметриялық шифрлау кілті.
- `<ЗАШИФРОВАННЫЙ_IV>` — шифрланған инициализация векторы.

Сұрау сәтті өңделген жағдайда API жіберілген метрикалардың тізімін қайтарады.

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

Берілген метрикаларға сәйкес ресурстарды тұтынуды есептеу және пайдаланушылар үшін тиісті есептелімдер жасалмайды.

{/note}

## 5. Метрикаларды {var(cloud)} платформасына жіберіңіз

Marketplace API-ға сұрау орындаңыз:

```shell
curl -X POST https://msk.cloud.vk.ru/marketplace/api/infra-api/v1-public/metrics/push \
-H 'Authorization: Bearer <ТОКЕН>' \
-H 'Content-Type: application/json' \
--data-raw '{
    "encryptedPayload": "<ЗАШИФРОВАННЫЕ_ДАННЫЕ>",
    "encryptedKey": "<ЗАШИФРОВАННЫЙ_КЛЮЧ>",
    "encryptedIV": "<ЗАШИФРОВАННЫЙ_IV>"
}'
```

Мұнда:

- `<ТОКЕН>` — API қолжетімдігінің токені.
- `<ЗАШИФРОВАННЫЕ_ДАННЫЕ>` — бастапқы деректері бар шифрланған JSON-файл.
- `<ЗАШИФРОВАННЫЙ_КЛЮЧ>` — шифрланған симметриялық шифрлау кілті.
- `<ЗАШИФРОВАННЫЙ_IV>` — шифрланған инициализация векторы.

Сұрау сәтті өңделген жағдайда API жіберілген метрикалардың тізімін қайтарады.

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