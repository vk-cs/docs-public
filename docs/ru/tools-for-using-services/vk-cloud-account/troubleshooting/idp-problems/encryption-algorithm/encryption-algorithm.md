При попытке входа через федерацию удостоверений отображается сообщение:

```plaintext
Forbidden: received invalid saml response: failed to decrypt EncryptedAssertion: algorithm is not implemented: http://www.w3.org/2009/xmlenc11#aes256-gcm
```

Ошибка возникает, если алгоритм шифрования подписи на стороне IdP не поддерживается настройками безопасности.

## Решение

1. На стороне IdP поменяйте алгоритм шифрования подписи на один из следующих:

    * aes128-cbc,
    * aes192-cbc,
    * aes256-cbc,
    * tripledes-cbc,
    * aes128-gcm.
1. Если проблема сохраняется, обратитесь в [техническую поддержку](/ru/contacts).
