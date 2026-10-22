# {heading(Floating IP мекенжайын қосу мүмкін емес)[id=vnet-floating-ip-create-problem]}

{include(/kz/_includes/_translated_by_ai.md)}

Floating IP мекенжайын қосу кезінде қате пайда болады.

Мүмкін себептер:

- жобаның сыртқы IP мекенжайлар санына арналған {linkto(../../../../tools-for-using-services/account/concepts/quotasandlimits#quotasandlimits-nets-subnets-ips)[text=квотасы]} таусылған;
- мекенжайлар бөлінетін {linkto(../../concepts/net-types#vnet-net-types-external-net)[text=сыртқы желіде]} бос мекенжайлар қалмаған.

### {heading(Шешім)[id=vnet-floating-ip-create-problem-resolve]}

1. Жобаның мекенжайлар санына арналған квоталарын тексеріңіз.

   Егер квота таусылған болса, оны ұлғайтуды [техникалық қолдау қызметінен](/kz/contacts) сұраңыз.

1. Егер квота таусылмаған болса және қате сақталса, мекенжайдың сыртқы желі пулынан бөлінетінін тексеріңіз:

   ```console
   openstack floating ip create <СЫРТҚЫ_ЖЕЛІНІҢ_АТАУЫ_НЕМЕСЕ_ID>
   ```

   Егер мекенжай бөлінбесе, команда қатемен аяқталады. [Техникалық қолдау қызметіне хабарласыңыз](/kz/contacts) және сыртқы желінің атауын мен қате мәтінін көрсетіңіз.
