# {heading(Floating IP-мекенжайын қосу мүмкін емес)[id=vnet-floating-ip-create-problem]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Floating IP-мекенжайын қосу кезінде қате пайда болады.

Мүмкін себептер:

- жобаның сыртқы IP-мекенжайлар санына арналған {linkto(../../../../tools-for-using-services/account/concepts/quotasandlimits#quotasandlimits-nets-subnets-ips)[text=квота]} таусылып қалған;
- {linkto(../../concepts/net-types#vnet-net-types-external-net)[text=сыртқы желіде]}, мекенжайлар бөлінетін желіде, бос мекенжайлар жоқ.

### {heading(Шешім)[id=vnet-floating-ip-create-problem-resolve]}

1. Жобаның мекенжайлар санына арналған квоталарын тексеріңіз.

   Егер квота таусылған болса, [техникалық қолдау көрсету](/kz/contacts) қызметіне оны ұлғайтуға сұраныс жіберіңіз.

1. Егер квота таусылмаған, бірақ қата сақталса, мекенжайдың сыртқы желі пулынан бөлінетінін тексеріңіз:

   ```console
   openstack floating ip create <ИМЯ_ИЛИ_ID_ВНЕШНЕЙ_СЕТИ>
   ```

   Егер мекенжай бөлінбесе, команда қатемен аяқталады. [Техникалық қолдау көрсету](/kz/contacts) қызметіне хабарласып, сыртқы желінің атауын және қате мәтінін көрсетіңіз.