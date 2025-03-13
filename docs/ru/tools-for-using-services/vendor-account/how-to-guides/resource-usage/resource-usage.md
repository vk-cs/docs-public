Вы можете передавать в VK Cloud метрики потребления ресурсов при работе пользователей с вашими image-based приложениями, купленными в Marketplace. Это позволит VK Cloud автоматически взимать с пользователей плату за потребленные ресурсы в соответствии с выбранным ими тарифом.

Ниже на примере показано, как организовать защищенную отправку метрик в VK Cloud, используя следующие механизмы обеспечения безопасности:

- доступ к Marketplace API по временным токенам с автоматической ротацией, выполняемой без остановки сервиса;
- шифрование данных с использованием пары из публичного и приватного ключей;
- хранение приватных ключей только в защищенной инфраструктуре;
- многоуровневая проверка на компрометацию.

## {heading(Подготовительные шаги)[id=preparatory_steps]}

1. Чтобы шифровать данные запросов к Marketplace API и проверять подлинность цифровой подписи ответа от сервера Marketplace, запросите публичный ключ шифрования по адресу [marketplace@cloud.vk.com](mailto:marketplace@cloud.vk.com).
1. При [подготовке образа](../../manage-apps/ibservice_add/ib_image_create) ВМ, на которой установлено ваше image-based приложение, создайте папку для хранения файла с токеном доступа к Marketplace API.

    <warn>

    Не рекомендуется использовать для этой цели существующие системные папки, так как права доступа к папке с токеном будут ограничены механизмами обеспечения безопасности. Это может повлечь ошибки в работе ОС или других приложений.

    </warn>

1. Укажите в коде приложения путь к файлу с токеном доступа.
1. При подготовке сервисного пакета вашего image-based приложения добавьте в [манифест Terraform](../../manage-apps/ibservice_add/tf_manifest/tf_manifest_steps) дополнительные ресурсы, как показано в примере:

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

    Здесь:

    - `uuid` — идентификатор инстанса image-based приложения.
    - `hosts` — список имен хостов для инициализации [агента Marketplace](../../manage-apps/ibservice_add/ib_image_create/ib_image_agent).
    - `target_os` — OC виртуальной машины с развернутым приложением.
    - `token_file_path` — путь к файлу с токеном.
    - `token_file_owner` — пользователь, который назначается владельцем файла с токеном. Необязательный аргумент.
    - `token_file_group` — группа, которая назначается файлу с токеном. Необязательный аргумент.
    - `token_rotate` — признак выполнения автоматической ротации токена:
        - `true` — токен будет обновляться время от времени. Рекомендуется включать ротацию токена при передаче в VK Cloud чувствительной информации, такой как метрики потребления ресурсов пользователями вашего приложения.
        - `false` — токен не будет обновляться. Это значение по умолчанию.

    Подробнее об аргументах ресурса — в разделе [Ресурс ivkcs_user_data](../../manage-apps/ivkcs/ivkcs_resources/ivkcs_user_data).

    Приведенная в примере конфигурация ресурсов:

    - создает токен доступа к Marketplace API с ограниченным сроком действия;
    - размещает файл с токеном `xaas-secret-auth-token.key` в директории `/opt/agent` виртуальной машины;
    - предоставляет права на файл с токеном пользователю `root` группы `root`;
    - включает периодическое обновление токена;
    - запускает для [агента Marketplace](../../manage-apps/ibservice_add/ib_image_create/ib_image_agent) (если он установлен) задачу обеспечивать актуальность токена в файле `/opt/agent/xaas-secret-auth-token.key`.

1. (Опционально) Чтобы использовать агент Marketplace для актуализации токена в файле, убедитесь, что в [манифесте Terraform](../../manage-apps/ibservice_add/tf_manifest/tf_manifest_steps) нет запрета на установку агента: `agent_install = false`.

   Если аргумент `agent_install` не указан или имеет значение `true`, агент будет установлен автоматически в процессе развертывания вашего image-based приложения.

   <warn>

   Не рекомендуется запрещать установку агента, если вы включаете ротацию токена. Без агента токен в файле обновляться не будет. Вашему приложению необходимо будет регулярно [запрашивать токен](#get_token) в Marketplace API, чтобы своевременно получать его обновления.

   </warn>

## {heading(1. Получите токен доступа к Marketplace API)[id=get_token]}

При первом обращении к API извлеките токен из файла, путь к которому был [указан](#preparatory_steps) в параметре `token_file_path` манифеста Terraform. При последующих обращениях способ получения токена зависит от того, установлен ли агент на инстансе вашего приложения.

<tabs>
<tablist>
<tab>Агент установлен</tab>
<tab>Агент не установлен</tab>
</tablist>
<tabpanel>

Извлеките актуальную версию токена из файла, путь к которому был [указан](#preparatory_steps) в параметре `token_file_path` манифеста Terraform.

</tabpanel>
<tabpanel>

Получите токен через запрос к Marketplace API:

```shell
curl https://msk.cloud.vk.com/marketplace/api/infra-api/v1-public/auth/key \
-H 'Authorization: Bearer <TOKEN>'
```

Здесь `<ТОКЕН>` — текущая версия токена доступа к API.

Структура ответа:

```json
{
    "instance_uuid": "<UUID_ИНСТАНСА>",
    "key": "<НОВЫЙ_ТОКЕН>",
    "secondary_key": "<ТОКЕН>"
}
```

Здесь:

- `instance_uuid` — идентификатор инстанса вашего приложения.
- `key` — обновленный токен доступа.
- `secondary_key` — токен доступа, срок действия которого скоро истечет. Этот параметр может отсутствовать.

Если в ответе нет параметра `secondary_key`, продолжайте использовать текущий токен. В противном случае при следующих запросах к API используйте токен, переданный в параметре `key`. После замены токена на новый предыдущий станет недействительным.

<warn>

Если ротация токена включена, запросы получения токена необходимо выполнять регулярно, чтобы поддерживать его в актуальном состоянии.

</warn>

</tabpanel>
</tabs>

## 2. Подготовьте исходные данные

1. Сформируйте JSON-файл, содержащий метрики для отправки и время сбора этих метрик (`base_date`).
1. Дополните файл временной меткой в формате UTC (`timestamp`).

Пример JSON-файла с исходными данными для отправки:

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

За один раз можно отправить не более 50 метрик.

## 3. Зашифруйте данные для отправки

<info>

Примеры того, как можно реализовать шифрование данных в вашем приложении, приведены ниже.

</info>

1. Сгенерируйте ключ для симметричного шифрования AES-256. Параметры генерации:

    - Метод: криптографически безопасный генератор случайных чисел `crypto/rand`.
    - Размер ключа: 32 байт.

1. Сгенерируйте вектор инициализации (IV) для режима шифрования CBC (Cipher Block Chaining). Параметры генерации:

    - Метод: криптографически безопасный генератор случайных чисел `crypto/rand`.
    - Размер IV: 16 байт.

1. Зашифруйте JSON-файл с исходными данными. Параметры шифрования:

    - Алгоритм: AES в режиме CBC.
    - Схема дополнения (padding): PKCS7.
    - Ключ: сгенерированный на предыдущих шагах 32-байтный ключ.
    - IV: сгенерированный на предыдущих шагах 16-байтный вектор инициализации.

1. Зашифруйте ключ для симметричного шифрования и вектор инициализации. Параметры шифрования:

    - Алгоритм: RSA со схемой дополнения OAEP.
    - Хеш-функция: SHA-256.
    - Ключ: полученный ранее [публичный ключ](#preparatory_steps).

1. Сформируйте содержимое для запроса к API, используя следующую структуру:

    ```json
    {
        "encryptedPayload": "<ЗАШИФРОВАННЫЕ_ДАННЫЕ>",
        "encryptedKey": "<ЗАШИФРОВАННЫЙ_КЛЮЧ>",
        "encryptedIV": "<ЗАШИФРОВАННЫЙ_IV>"
    }
    ```

    Здесь:

    - `<ЗАШИФРОВАННЫЕ_ДАННЫЕ>` — зашифрованный JSON-файл с исходными данными.
    - `<ЗАШИФРОВАННЫЙ_КЛЮЧ>` — зашифрованный ключ для симметричного шифрования.
    - `<ЗАШИФРОВАННЫЙ_IV>` — зашифрованный вектор инициализации.

<details>
<summary>Примеры шифрования данных</summary>

<tabs>
<tablist>
<tab>Python</tab>
<tab>Golang</tab>
</tablist>
<tabpanel>

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

</tabpanel>
<tabpanel>

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

</tabpanel>
</tabs>

</details>

## 4. (Опционально) Протестируйте отправку метрик

Для отладки процесса передачи метрик в VK Cloud выполните запрос к Marketplace API:

```shell
curl -X POST https://msk.cloud.vk.com/marketplace/api/infra-api/v1-public/metrics/decrypt \
-H 'Authorization: Bearer <ТОКЕН>' \
-H 'Content-Type: application/json' \
--data-raw '{
    "encryptedPayload": "<ЗАШИФРОВАННЫЕ_ДАННЫЕ>",
    "encryptedKey": "<ЗАШИФРОВАННЫЙ_КЛЮЧ>",
    "encryptedIV": "<ЗАШИФРОВАННЫЙ_IV>"
}'
```

Здесь:

- `<ТОКЕН>` — токен доступа к API.
- `<ЗАШИФРОВАННЫЕ_ДАННЫЕ>` — зашифрованный JSON-файл с исходными данными.
- `<ЗАШИФРОВАННЫЙ_КЛЮЧ>` — зашифрованный ключ для симметричного шифрования.
- `<ЗАШИФРОВАННЫЙ_IV>` — зашифрованный вектор инициализации.

При успешной обработке запроса API возвратит список переданных метрик.

Пример ответа:

```json
{
    "payload": {
        "metrics_ids": [5001, 5002],
        "timestamp": "2024-03-20T14:00:02Z"
    },
    "signature": "<ЗАШИФРОВАННАЯ_ПОДПИСЬ>",
}
```

<warn>

Учет потребления ресурсов согласно переданным метрикам и соответствующие начисления для пользователей производиться не будут.

</warn>

## 5. Отправьте метрики в VK Cloud

Выполните запрос к Marketplace API:

```shell
curl -X POST https://msk.cloud.vk.com/marketplace/api/infra-api/v1-public/metrics/push \
-H 'Authorization: Bearer <ТОКЕН>' \
-H 'Content-Type: application/json' \
--data-raw '{
    "encryptedPayload": "<ЗАШИФРОВАННЫЕ_ДАННЫЕ>",
    "encryptedKey": "<ЗАШИФРОВАННЫЙ_КЛЮЧ>",
    "encryptedIV": "<ЗАШИФРОВАННЫЙ_IV>"
}'
```

Здесь:

- `<ТОКЕН>` — токен доступа к API.
- `<ЗАШИФРОВАННЫЕ_ДАННЫЕ>` — зашифрованный JSON-файл с исходными данными.
- `<ЗАШИФРОВАННЫЙ_КЛЮЧ>` — зашифрованный ключ для симметричного шифрования.
- `<ЗАШИФРОВАННЫЙ_IV>` — зашифрованный вектор инициализации.

При успешной обработке запроса API возвратит список переданных метрик.

Пример ответа:

```json
{
    "payload": {
        "metrics_ids": [5001, 5002],
        "timestamp": "2024-03-20T14:00:02Z"
    },
    "signature": "<ЗАШИФРОВАННАЯ_ПОДПИСЬ>",
}
```
