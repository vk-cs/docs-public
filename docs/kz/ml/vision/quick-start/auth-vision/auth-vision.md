# {heading(Авторизация)[id=vision-quick-start-auth-vision]}

{include(/kz/_includes/_translated_by_ai.md)}

{var(cloud)} платформасында авторизация үшін қол жеткізу токені пайдаланылады. Ол әрбір API-сұраудың параметрінде беріледі.

Қол жеткізу токенін алудың екі тәсілі бар:

- OAuth — токендер жұбын жасау: қол жеткізу токені және жаңарту токені (`refresh token`).
- Сервистік токен — пайдалану уақыты бойынша шектелмеген токенді жасау.

{note:warn}

Аккаунт қауіпсіздігін арттыру үшін OAuth-токендерін пайдаланыңыз. OAuth көмегімен авторизациялау үшін бір токеннің орнына токендер жұбы пайдаланылады, ал қол жеткізу токені тек бір сағат бойы жарамды.

{/note}

## {heading(OAuth-токендерін алу)[id=vision-quick-start-auth-vision-get-oauth-token]}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) {var(cloud)} жеке кабинетіне.
2. [Жобаны](/kz/tools-for-using-services/account/concepts/projects) таңдаңыз.
3. **AI API** → **Vision API** бөліміне өтіңіз. Токендерді алу үшін қажетті ақпарат бар бет ашылады:
   - **OAuth endpoint**: OAuth-токендерін алуға арналған сұраулардың мекенжайы;
   - **OAuth Клиент идентификаторы**: сұраудың `client_id` параметрінде берілуі тиіс аккаунт идентификаторы;
   - **OAuth Құпия кілт**: сұраудың `client_secret` параметрінде берілуі тиіс кілт.
4. Токендерді жасаңыз:

   ```console
   curl -X POST --location 'https://mcs.mail.ru/auth/oauth/v1/token'                --header 'Content-Type: application/json'                --data '{
   "client_id":"<OAUTH_ИДЕНТИФИКАТОР_КЛИЕНТА>",
   "client_secret": "<OAUTH_СЕКРЕТНЫЙ_КЛЮЧ>",
   "grant_type":"client_credentials"
   }'
   ```

Сервер жауабында екі токен болады:

- `access_token`: сервиске API-сұрауларында пайдалану үшін қол жеткізу токені. Оны бірнеше рет пайдалануға болады, бірақ ол бір сағат бойы жарамды. Токеннің өмір сүру мерзімі аяқталған кезде, жаңасын жасау қажет болады. Жобада бір уақытта 25-тен артық қол жеткізу токені белсенді бола алмайды.
- `refresh_token`: жаңа қол жеткізу токенін жасауға арналған жаңарту токені. Жобада бір уақытта 25-тен артық жаңарту токені белсенді бола алмайды. Әрбір жаңарту токені кез келген мөлшерде қол жеткізу токендерін жасай алады, бірақ бір мезетте белсенділері 25-тен артық болмауы тиіс.

{note:warn}

Жаңарту токенін (`refresh_token`) сақтап қойыңыз. Егер ол жоғалса, оны қалпына келтіру мүмкін болмайды.

{/note}

### {heading(Қол жеткізу токенін жаңарту)[id=vision-quick-start-auth-vision-get-oauth-token-update]}

Жаңарту токені арқылы жаңа қол жеткізу токенін жасау үшін команданы орындаңыз:

```console
curl -X POST --location 'https://mcs.mail.ru/auth/oauth/v1/token'             --header 'Content-Type: application/json'             --data '{
"client_id":"<OAUTH_ИДЕНТИФИКАТОР_КЛИЕНТА>",
"refresh_token":"<ТОКЕН_ОБНОВЛЕНИЯ>",
"grant_type":"refresh_token"
}'
```

Мұнда `client_id` және `refresh_token` [OAuth-токендерін алу](../auth-vision#vision-quick-start-auth-vision-get-oauth-token) кезеңінде алынған.

## {heading(Сервистік токенді алу)[id=vision-quick-start-auth-vision-get-service-token]}

1. [Өтіңіз](https://kz.cloud.vk.com/app/) {var(cloud)} жеке кабинетіне.
2. [Жобаны](/kz/tools-for-using-services/account/concepts/projects) таңдаңыз.
3. **AI API** → **Vision API** бөліміне өтіңіз.
4. **Сервистік токен қосу** түймесін басыңыз.
5. Ашылған терезеде токен қолданылатын тапсырмалар түрін таңдаңыз.
6. **Жасау** түймесін басыңыз. Жаңа токен сервистік токендер тізімінде пайда болады.
