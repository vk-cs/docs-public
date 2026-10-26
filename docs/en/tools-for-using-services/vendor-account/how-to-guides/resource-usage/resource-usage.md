You can pass resource consumption metrics to {var(cloud)} when users work with your image-based applications purchased in Marketplace. This allows {var(cloud)} to automatically charge users for the consumed resources according to their selected tariff plan.

The example below shows how to organize secure delivery of metrics to {var(cloud)} using the following security mechanisms:

- access to the Marketplace API via temporary tokens with automatic rotation performed without service downtime;
- data encryption using a public and private key pair;
- storing private keys only in protected infrastructure;
- multi-level compromise detection.

## {heading(Preparatory steps)[id=preparatory_steps]}

{include(/en/_includes/_translated_by_ai_en.md)}

1. To encrypt request data to the Marketplace API and verify the authenticity of the digital signature of the response from the Marketplace server, request the public encryption key at [marketplace@cloud.vk.com](mailto:marketplace@cloud.vk.com).
1. When [preparing the image](../../manage-apps/ibservice_add/ib_image_create) of the VM where your image-based application is installed, create a folder for storing the file with the Marketplace API access token.

    {note:warn}

    It is not recommended to use existing system folders for this purpose, since access permissions for the folder with the token will be restricted by security mechanisms. This may cause errors in the operation of the OS or other applications.

    {/note}

1. Specify in the application code the path to the file with the access token.
1. When preparing the service package of your image-based application, add additional resources to the [Terraform manifest](../../manage-apps/ibservice_add/tf_manifest/tf_manifest_steps) as shown in the example:

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

    Here:

    - `uuid` — the identifier of the image-based application instance.
    - `hosts` — the list of host names for initializing the [Marketplace agent](/en/tools-for-using-services/vendor-account/manage-apps/concepts/vendor-preconditions/ib_image_agent).
    - `target_os` — the OS of the virtual machine with the deployed application.
    - `token_file_path` — the path to the file with the token.
    - `token_file_owner` — the user who will be assigned as the owner of the token file. Optional argument.
    - `token_file_group` — the group that will be assigned to the token file. Optional argument.
    - `token_rotate` — a flag indicating whether automatic token rotation is performed:
        - `true` — the token will be updated from time to time. It is recommended to enable token rotation when passing sensitive information to {var(cloud)}, such as resource consumption metrics of users of your application.
        - `false` — the token will not be updated. This is the default value.

    For more information about the resource arguments, see the section [The ivkcs_user_data resource](../../manage-apps/ivkcs/ivkcs_resources/ivkcs_user_data).

    The resource configuration shown in the example:

    - creates a Marketplace API access token with a limited validity period;
    - places the token file `xaas-secret-auth-token.key` in the `/opt/agent` directory of the virtual machine;
    - grants permissions to the token file to the `root` user of the `root` group;
    - enables periodic token updates;
    - launches for the [Marketplace agent](/en/tools-for-using-services/vendor-account/manage-apps/concepts/vendor-preconditions/ib_image_agent) (if it is installed) a task to keep the token in the `/opt/agent/xaas-secret-auth-token.key` file up to date.

1. (Optional) To use the Marketplace agent for keeping the token in the file up to date, make sure that the [Terraform manifest](../../manage-apps/ibservice_add/tf_manifest/tf_manifest_steps) does not prohibit the agent installation: `agent_install = false`.

   If the `agent_install` argument is not specified or has the value `true`, the agent will be installed automatically during the deployment of your image-based application.

   {note:warn}

   It is not recommended to prohibit the agent installation if you enable token rotation. Without the agent, the token in the file will not be updated. Your application will need to regularly [request the token](#get_token) from the Marketplace API to receive its updates in a timely manner.

   {/note}

## {heading(1. Get the Marketplace API access token)[id=get_token]}

On the first API call, extract the token from the file whose path was [specified](#preparatory_steps) in the `token_file_path` parameter of the Terraform manifest. On subsequent calls, the way to obtain the token depends on whether the agent is installed on your application instance.

{tabs}

{tab(Agent is installed)}

Extract the current version of the token from the file whose path was [specified](#preparatory_steps) in the `token_file_path` parameter of the Terraform manifest.

{/tab}

{tab(Agent is not installed)}

Get the token via a request to the Marketplace API:

```shell
curl https://msk.cloud.vk.ru/marketplace/api/infra-api/v1-public/auth/key \
-H 'Authorization: Bearer <TOKEN>'
```

Here `<TOKEN>` is the current version of the API access token.

Response structure:

```json
{
    "instance_uuid": "<INSTANCE_UUID>",
    "key": "<NEW_TOKEN>",
    "secondary_key": "<TOKEN>"
}
```

Here:

- `instance_uuid` — the identifier of your application instance.
- `key` — the updated access token.
- `secondary_key` — the access token whose validity period is about to expire. This parameter may be absent.

If the response does not contain the `secondary_key` parameter, continue using the current token. Otherwise, in subsequent API requests use the token passed in the `key` parameter. After replacing the token with a new one, the previous one will become invalid.

{note:warn}

If token rotation is enabled, token requests must be performed regularly to keep the token up to date.

{/note}

{/tab}

{/tabs}

## 2. Prepare the source data

1. Create a JSON file containing the metrics to be sent and the time of collecting these metrics (`base_date`).
1. Add a timestamp in UTC format (`timestamp`) to the file.

Example of a JSON file with source data for sending:

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

You can send no more than 50 metrics at a time.

## 3. Encrypt the data for sending

{note:info}
Examples of how you can implement data encryption in your application are provided below.
{/note}

1. Generate a key for AES-256 symmetric encryption. Generation parameters:

    - Method: cryptographically secure random number generator `crypto/rand`.
    - Key size: 32 bytes.

1. Generate an initialization vector (IV) for the CBC (Cipher Block Chaining) encryption mode. Generation parameters:

    - Method: cryptographically secure random number generator `crypto/rand`.
    - IV size: 16 bytes.

1. Encrypt the JSON file with the source data. Encryption parameters:

    - Algorithm: AES in CBC mode.
    - Padding scheme: PKCS7.
    - Key: the 32-byte key generated in the previous steps.
    - IV: the 16-byte initialization vector generated in the previous steps.

1. Encrypt the symmetric encryption key and the initialization vector. Encryption parameters:

    - Algorithm: RSA with the OAEP padding scheme.
    - Hash function: SHA-256.
    - Key: the [public key](#preparatory_steps) obtained earlier.

1. Compose the request body for the API call using the following structure:

    ```json
    {
        "encryptedPayload": "<ENCRYPTED_DATA>",
        "encryptedKey": "<ENCRYPTED_KEY>",
        "encryptedIV": "<ENCRYPTED_IV>"
    }
    ```

    Here:

    - `<ENCRYPTED_DATA>` — the encrypted JSON file with the source data.
    - `<ENCRYPTED_KEY>` — the encrypted symmetric encryption key.
    - `<ENCRYPTED_IV>` — the encrypted initialization vector.

{cut(Data encryption examples)}

{tabs}

{tab(Python)}

```python
def encrypt_message(public_key_pem: str, data) -> dict:
    symmetric_key = os.urandom(32)  # AES-256
    iv = os.urandom(16)
 
    message_json = json.dumps(data).encode('utf-8')

# Create padding for symmetric encryption
    padder = sym_padding.PKCS7(algorithms.AES.block_size).padder()
    padded_data = padder.update(message_json) + padder.finalize()

# Encrypt the data with the symmetric key
    cipher = Cipher(algorithms.AES(symmetric_key), modes.CBC(iv))
    encryptor = cipher.encryptor()
    encrypted_message = encryptor.update(padded_data) + encryptor.finalize()

# Load the public key
    public_key = serialization.load_pem_public_key(public_key_pem.encode('utf-8'))

# Encrypt the symmetric key and IV with the public key
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

// Insert the public key instead of the <PUBLIC_KEY> placeholder
const publicKeyPEM = `-----BEGIN RSA PUBLIC KEY-----
<PUBLIC_KEY>
-----END RSA PUBLIC KEY-----`
 
type EncryptedMessage struct {
    EncryptedPayload string `json:"encryptedPayload"`
    EncryptedKey     string `json:"encryptedKey"`
    EncryptedIV      string `json:"encryptedIV"`
}
 
func encryptMessage(payload []byte, publicKey *rsa.PublicKey) (*EncryptedMessage, error) {
    // Generate the symmetric key (32 bytes for AES-256)
    symmetricKey := make([]byte, 32)
    if _, err := rand.Read(symmetricKey); err != nil {
        return nil, fmt.Errorf("failed to generate symmetric key: %v", err)
    }
 
    // Generate the IV (16 bytes for CBC)
    iv := make([]byte, 16)
    if _, err := rand.Read(iv); err != nil {
        return nil, fmt.Errorf("failed to generate IV: %v", err)
    }
 
    // Create the structure for encryption with a timestamp
    messageToEncrypt := struct {
        Payload   string    `json:"payload"`
        Timestamp time.Time `json:"timestamp"`
    }{
        Payload:   base64.URLEncoding.EncodeToString(payload),
        Timestamp: time.Now().UTC(),
    }
 
    // Serialize the structure
    messageBytes, err := json.Marshal(messageToEncrypt)
    if err != nil {
        return nil, fmt.Errorf("failed to marshal message: %v", err)
    }
 
    // Create the AES block cipher
    block, err := aes.NewCipher(symmetricKey)
    if err != nil {
        return nil, fmt.Errorf("failed to create cipher: %v", err)
    }
 
    // Create the CBC mode
    mode := cipher.NewCBCEncrypter(block, iv)
 
    // Add padding (PKCS7)
    paddedPayload := pkcs7Pad(messageBytes, aes.BlockSize)
 
    // Encrypt the payload
    encryptedPayload := make([]byte, len(paddedPayload))
    mode.CryptBlocks(encryptedPayload, paddedPayload)
 
    // Encrypt the symmetric key with the public key using OAEP
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
 
    // Encrypt the IV with the public key using OAEP
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
 
    // Compose the encrypted message
    return &EncryptedMessage{
        EncryptedPayload: base64.URLEncoding.EncodeToString(encryptedPayload),
        EncryptedKey:     base64.URLEncoding.EncodeToString(encryptedKey),
        EncryptedIV:      base64.URLEncoding.EncodeToString(encryptedIV),
    }, nil
}
 
// pkcs7Pad adds padding according to PKCS7
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
    // Decode the PEM into the public key structure
    block, _ := pem.Decode([]byte(publicKeyPEM))
    if block == nil {
        panic("Failed to decode PEM block")
    }
 
    publicKey, err := x509.ParsePKCS1PublicKey(block.Bytes)
    if err != nil {
        panic(fmt.Sprintf("Failed to parse public key: %v", err))
    }
 
    // Test message
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
    fmt.Printf("Original message: %s\n", message)
 
    // Encrypt the message
    encryptedMsg, err := encryptMessage(message, publicKey)
    if err != nil {
        panic(fmt.Sprintf("Encryption error: %v", err))
    }
 
    // Convert to JSON
    jsonData, err := json.MarshalIndent(encryptedMsg, "", "    ")
    if err != nil {
        panic(fmt.Sprintf("Failed to create JSON: %v", err))
    }
 
    fmt.Printf("\nJSON for the API request:\n%s\n", string(jsonData))
}
```

{/tab}

{/tabs}

{/cut}

## 4. (Optional) Test sending metrics

To debug the process of sending metrics to {var(cloud)}, make a request to the Marketplace API:

```shell
curl -X POST https://msk.cloud.vk.ru/marketplace/api/infra-api/v1-public/metrics/decrypt \
-H 'Authorization: Bearer <TOKEN>' \
-H 'Content-Type: application/json' \
--data-raw '{
    "encryptedPayload": "<ENCRYPTED_DATA>",
    "encryptedKey": "<ENCRYPTED_KEY>",
    "encryptedIV": "<ENCRYPTED_IV>"
}'
```

Here:

- `<TOKEN>` — the API access token.
- `<ENCRYPTED_DATA>` — the encrypted JSON file with the source data.
- `<ENCRYPTED_KEY>` — the encrypted symmetric encryption key.
- `<ENCRYPTED_IV>` — the encrypted initialization vector.

Upon successful processing of the request, the API will return the list of the passed metrics.

Response example:

```json
{
    "payload": {
        "metrics_ids": [5001, 5002],
        "timestamp": "2024-03-20T14:00:02Z"
    },
    "signature": "<ENCRYPTED_SIGNATURE>",
}
```

{note:warn}

Resource consumption accounting based on the passed metrics and corresponding charges for users will not be performed.

{/note}

## 5. Send the metrics to {var(cloud)}

Make a request to the Marketplace API:

```shell
curl -X POST https://msk.cloud.vk.ru/marketplace/api/infra-api/v1-public/metrics/push \
-H 'Authorization: Bearer <TOKEN>' \
-H 'Content-Type: application/json' \
--data-raw '{
    "encryptedPayload": "<ENCRYPTED_DATA>",
    "encryptedKey": "<ENCRYPTED_KEY>",
    "encryptedIV": "<ENCRYPTED_IV>"
}'
```

Here:

- `<TOKEN>` — the API access token.
- `<ENCRYPTED_DATA>` — the encrypted JSON file with the source data.
- `<ENCRYPTED_KEY>` — the encrypted symmetric encryption key.
- `<ENCRYPTED_IV>` — the encrypted initialization vector.

Upon successful processing of the request, the API will return the list of the passed metrics.

Response example:

```json
{
    "payload": {
        "metrics_ids": [5001, 5002],
        "timestamp": "2024-03-20T14:00:02Z"
    },
    "signature": "<ENCRYPTED_SIGNATURE>",
}
```