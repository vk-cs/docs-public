{include(/kz/_includes/_translated_by_ai.md)}

Идентификация федерациясы арқылы кіруге әрекет жасағанда келесі хабар көрсетіледі:

```plaintext
Forbidden: received invalid saml response: failed to decrypt EncryptedAssertion: algorithm is not implemented: http://www.w3.org/2009/xmlenc11#aes256-gcm
```

Қате IdP жағындағы қолтаңбаны шифрлау алгоритмін қауіпсіздік баптаулары қолдамаса пайда болады.

## Шешім

1. IdP жағында қолтаңбаны шифрлау алгоритмін келесілердің біріне ауыстырыңыз:

    * aes128-cbc,
    * aes192-cbc,
    * aes256-cbc,
    * tripledes-cbc,
    * aes128-gcm.
1. Егер мәселе сақталса, [техникалық қолдау қызметіне](/kz/contacts) хабарласыңыз.
