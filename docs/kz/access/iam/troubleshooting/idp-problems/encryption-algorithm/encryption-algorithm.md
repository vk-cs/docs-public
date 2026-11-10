
{include(/kz/_includes/_translated_by_ai_kz.md)}

Удостоверениелер федерациясы арқылы кіруге әрекет жасағанда мына хабарлама көрсетіледі:

```plaintext
Forbidden: received invalid saml response: failed to decrypt EncryptedAssertion: algorithm is not implemented: http://www.w3.org/2009/xmlenc11#aes256-gcm
```

Қате IdP жағындағы қолтаңбаны шифрлау алгоритмі қауіпсіздік параметрлеріне қолдамайтын жағдайда пайда болады.

## Шешім

1. IdP жағында қолтаңбаны шифрлау алгоритмін мыналардың біріне өзгертіңіз:

   - aes128-cbc,
   - aes192-cbc,
   - aes256-cbc,
   - tripledes-cbc,
   - aes128-gcm.

1. Егер мәселе сақталса, [техникалық қолдау көрсету қызметіне](/kz/contacts) жүгініңіз.