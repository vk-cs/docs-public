{includetag(api-intro)}
{ifndef(public)}
HTTP және HTTPS сұраулары REST API-ға әдепкі бойынша деплой-түйіннен және басқарушы түйіндерден орындалады. Сұраулардың басқа ішкі желілерден жұмыс істеуі үшін оларға қолжетімділік (Firewall және маршруттау) бапталуы қажет.
{/ifndef}

{ifdef(public)}
{var(cloud)} API-мен өзара әрекеттесу эндпоинттер арқылы орындалады. Кейбір жағдайларда аутентификация үшін токен қажет болады.
{/ifdef}
{/includetag}

{includetag(api-token-prerequisites)}
1. [Өтіңіз](https://msk.cloud.vk.ru/app/) {var(cloud)} жеке кабинетіне.
{ifdef(public)}
1. API арқылы қолжетімділіктің {linkto(../../../../tools-for-using-services/api/rest-api/enable-api#rest-api-enable-activate)[text=белсендірілгеніне]} көз жеткізіңіз.
{/ifdef}
{ifndef(public)}
1. Екі факторлы аутентификацияның {linkto(../../../../access/iam/instructions/manage-2fa#iam-manage-2fa-on)[text=қосылғанына]} және API арқылы қолжетімділіктің {linkto(../../../../tools-for-using-services/api/rest-api/enable-api#rest-api-enable-activate)[text=белсендірілгеніне]} көз жеткізіңіз.
{/ifndef}
1. Жеке кабинет бетінің тақырыбында токенді пайдаланғыңыз келетін жобаны таңдаңыз.
{/includetag}

{includetag(api-token-gen)}
{note:warn}
{ifdef(public)}Жасалған токен бір сағат бойы жарамды. {/ifdef}Шығарылған барлық токендер өз қолданылу мерзімінің соңына дейін жарамды болып қалады.
{/note}

Токенді алыңыз:

{tabs}

{tab(Жеке кабинет)}
   {ifndef(public)}
   {/includetag}
   {includetag(case-keystone-token)}
1. {linkto(../../../account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]} {var(cloud)} жеке кабинетіне.
   {/includetag}
   {includetag(prerequisites-api)}
1. {linkto(../prerequisites-lk-entry#prerequisites-lk-entry)[text=Өтіңіз]} {var(cloud)} жеке кабинетіне.
   {/includetag}
   {includetag(api-token-gen)}
1. Жеке кабинет бетінің тақырыбында токенді пайдаланғыңыз келетін жобаны таңдаңыз.
   {/ifndef}
1. Бет тақырыбындағы пайдаланушы атын басып, **Жоба баптаулары** тармағын таңдаңыз.
1. **API арқылы қатынау** қойындысына өтіңіз.
   {ifdef(public)}
   Бет ашылғанда жаңа токен автоматты түрде жасалады. Бет ашық тұрса, сағатына бір рет жаңа токен жасалады.
   {/ifdef}
   {/includetag}
   {includetag(case-keystone-token)}
1. Беттің төменгі жағынан **API арқылы қатынау үшін токен** параметрін тауып, оның жанындағы ![Көшіру](../../../../assets/copy-icon.svg "inline") белгішесін басыңыз. Токен көшіріледі.
   {/includetag}
   {includetag(prerequisites-api)}
1. Беттің төменгі жағынан **API арқылы қатынау үшін токен** параметрін тауып, оның жанындағы ![Көшіру](../../../assets/copy-icon.svg "inline") белгішесін басыңыз. Токен көшіріледі.
   {/includetag}
   {includetag(api-token-gen)}
   {ifdef(public)}
   Токеннің қолданылу мерзімі ![Көшіру](../../../../assets/copy-icon.svg "inline") белгішесіне тінтуір меңзерін апарғанда көрсетіледі. Токеннің мерзімі жақында аяқталатын болса, **Қайта шығару** түймесін пайдаланыңыз.
   {/ifdef}
{/tab}

{tab(OpenStack CLI)}
   {/includetag}
   {includetag(case-keystone-token)}
1. OpenStack клиентін {linkto(../../../cli/openstack-cli#tools-cli-openstack)[text=орнатып]}, жобада аутентификациядан өтіңіз.
   {/includetag}
   {includetag(prerequisites-api)}
1. OpenStack клиентін {linkto(../prerequisites-openstack-cli#prerequisites-openstack-cli)[text=орнатып]}, жобада аутентификациядан өтіңіз.
   {/includetag}
   {includetag(api-token-gen)}
1. Команданы орындаңыз:

   ```console
   openstack token issue -c id -f value
   ```

   Токеннің мәні консольге шығарылады.

{/tab}

{ifdef(public)}
{tab(cURL)}

1. Егер орнатылмаған болса, [cURL](https://github.com/curl/curl/blob/master/docs/INSTALL.md) утилитасын орнатыңыз.
1. Жобада {linkto(../../../cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}. OpenStack клиентімен және cURL утилитасымен жұмыс істеу үшін аутентификация процедурасы бірдей.
1. Команданы орындаңыз. Команда операциялық жүйеңізге байланысты болады. Таңдау үшін екі аутентификация әдісі қолжетімді:

   - `password` — құпиясөз бойынша жаңа токен жасау;
   - `token` — бар токен бойынша жаңа токен жасау.

   {tabs}
    
   {tab(Linux)}
     
   `password` әдісі үшін команда мысалы:

   ```console
   curl -X POST \
   -H "Content-Type: application/json" \
   -d '{
       "auth": {
           "identity": {
               "methods": [
                   "password"
               ],
               "password": {
                   "user": {
                       "domain": {
                           "name": "'$OS_USER_DOMAIN_NAME'"
                       },
                       "name": "'$OS_USERNAME'",
                       "password": "'$OS_PASSWORD'"
                   }
               }
           },
           "scope": {
               "project": {
                   "id": "'$OS_PROJECT_ID'"
               }
           }
       }
   }' \
   -i "https://infra.mail.ru/infra/identity/v3/auth/tokens" | grep -i '^x-subject-token'| cut -d ':' -f 1,2
   ```

   `token` әдісі үшін команда мысалы:   

   ```console
   curl -X POST \
   -H "Content-Type: application/json" \
   -d '{
       "auth": {
           "identity": {
               "methods": [
                   "token"
               ],
               "token": {
                  "id": "'$OS_TOKEN'"
               }
           },
           "scope": {
               "project": {
                   "id": "'$OS_PROJECT_ID'"
               }
           }
       }
   }' \
   -i "https://infra.mail.ru/infra/identity/v3/auth/tokens" | grep -i '^x-subject-token'| cut -d ':' -f 1,2
   ```
   {/tab}
    
   {tab(Windows (cmd))}

   `password` әдісі үшін команда мысалы:

   ```console
   curl -X POST ^
   -H "Content-Type: application/json" ^
   -d "{\"auth\": {\"identity\": {\"methods\": [\"password\"], \"password\": {\"user\": {\"domain\": {\"name\": \"%OS_USER_DOMAIN_NAME%\"}, \"name\": \"%OS_USERNAME%\",\"password\": \"%OS_PASSWORD%\"}}}, \"scope\": {\"project\": {\"id\": \"%OS_PROJECT_ID%\"}}}}" ^
   -i "https://infra.mail.ru/infra/identity/v3/auth/tokens" | findstr /B x-subject-token | findstr x-subject-token
   ```

   `token` әдісі үшін команда мысалы:

   ```console
   curl -X POST ^
   -H "Content-Type: application/json" ^
   -d "{\"auth\": {\"identity\": {\"methods\": [\"token\"], \"token\": {\"id\": \"%$OS_TOKEN%\"}}, \"scope\": {\"project\": {\"id\": \"%OS_PROJECT_ID%\"}}}}" ^
   -i "https://infra.mail.ru/infra/identity/v3/auth/tokens" | findstr /B x-subject-token | findstr x-subject-token
   ```
   
   {/tab}
    
   {/tabs}

Токеннің мәні `x-subject-token` параметрінде шығарылады.

{cut(Токен алу сұранысына жауап мысалдары)}

{tabs}

{tab(Linux)}

```console
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 27038  100 26470  100   568  99259   2129 --:--:-- --:--:-- --:--:-- 99138
x-subject-token: <ТОКЕН_МӘНІ>
```
{/tab}

{tab(Windows (cmd))}

```console
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   230    0     0  100   230      0    920 --:--:-- --:--:-- --:--:--   923FINDSTR: Слишком длинная строка 12.
FINDSTR: Слишком длинная строка 12.
100 26700  100 26470  100   230  49114    426 --:--:-- --:--:-- --:--:-- 49628
FINDSTR: Слишком длинная строка 12.
x-subject-token: <ТОКЕН_МӘНІ>
```

{/tab}

{/tabs}

{/cut}

{/tab}
{/ifdef}

{/tabs}
{/includetag}

{includetag(api-token-reissue)}
Токеннің қолданылу мерзімі аяқталғаннан кейін оны жеке кабинетте қайта шығаруға болады:

1. Бет тақырыбындағы пайдаланушы атын басып, **Жоба баптаулары** тармағын таңдаңыз.
1. **API арқылы қатынау** қойындысына өтіңіз.
1. Бет төменінде **Қайта шығару** түймесін басыңыз.
{/includetag}

{includetag(api-token-example)}
Міндет: REST API арқылы желілер тізімін алу (Neutron сервисі).

1. Жеке кабинетте [қараңыз](https://msk.cloud.vk.ru/app/project/endpoints) Neutron сервисіне сұраныс жасалатын эндпоинтті. Бұл мысалда: `https://infra.mail.ru:9696`.
1. {linkto(#rest-api-keystone-token-gen)[text=Токенді алыңыз]}: жаңа токен жасаңыз немесе қолданыстағы токеннің мәнін көшіріңіз.
1. cURL утилитасы көмегімен команданы орындаңыз:

   ```console
   curl https://infra.mail.ru:9696/v2.0/networks -H "Accept: application/json" -H "X-Auth-Token: <АЛДЫҢҒЫ ҚАДАМДА АЛЫНҒАН ТОКЕН>"
   ```

   {cut(Нәтиже мысалы)}

   ```json
   {
       "networks": [
           {
               "ipv6_address_scope": null,
               "dns_domain": null,
               "revision_number": 6,
               "port_security_enabled": true,
               "id": "0e4d7c1e-ba20-0000-0000-7623648487a6",
               "router:external": false,
               "availability_zone_hints": [],
               "availability_zones": [
                   "nova"
               ],
               "ipv4_address_scope": null,
               "shared": false,
               "project_id": "b5b7ffd4ef0547e5b222f44500000000",
               "status": "ACTIVE",
               "subnets": [
                   "5ab0164b-2528-0000-0000-b2a8d5e62661"
               ],
               "private_dns_domain": "mcs.local.",
               "description": "",
               "tags": [],
               "updated_at": "2022-11-22T07:24:53Z",
               "name": "demoNet2",
               "admin_state_up": true,
               "tenant_id": "b5b7ffd4ef0547e5b222f44500000000",
               "created_at": "2022-11-22T07:24:51Z",
               "mtu": 1500,
               "sdn": "neutron"
           }
       ]
   }
   ```

   {/cut}

Токенді пайдаланудың басқа мысалдары:

- Cloud Logging сервисінде {linkto(../../api-spec/logging#api-spec-logging)[text=журналдарды қарау]};
- жария DNS-пен {linkto(../../api-spec/network-api/api-dns#api-spec-dns)[text=жұмыс істеу]}.

{/includetag}
