# {heading(Astro-сайтын нысаналық қоймада CDN арқылы орналастыру)[id=cdn-ssh]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{var(s3)} және CDN көмегімен Astro фреймворкіндегі статикалық сайтты жаһандық контент жеткізумен және төмен кешігуге ие түрде орналастыруға болады. Нысаналық қойма фронтенд үшін serverless-хостинг рөлін атқарады, ал CDN edge-серверлерде кэштеуді және контентті HTTPS арқылы жеткізуді қамтамасыз етеді.

Мысал ретінде келесі деректер қолданылады:

- Бакет атауы: `astro-site-bucket`
- Сайттың домен атауы: `astro.example.com`
- Жинақталған жобаның директориясы: `./dist`
- Қойманың эндпоинті: `https://hb.ru-msk.vkcloud-storage.ru`

## {heading(Дайындық қадамдар)[id=cdn-ssh-prepare]}

1. AWS CLI {linkto(../../connect/s3-cli#s3-connect-cli)[text=орнатылғанын және бапталғанын]} тексеріңіз.
1. Келесі параметрлерімен {var(s3)} {linkto(../../instructions/buckets/manage-bucket#s3-instructions-manage-bucket)[text=бакет жасаңыз]}:

   - Атауы: `astro-site-bucket`. Бакет атауы {linkto(../../concepts/about#s3-concepts-about-bucket-naming)[text=атау ережелеріне]} сәйкес болуы тиіс.
   - Сақтау класы: `Hotbox` — көптеген файлдарды жылдам таратуға жарамды.

1. Егер әлі орнатылмаған болса, [Node.js](https://nodejs.org/) 18 нұсқасын немесе одан жаңалауын орнатыңыз.
1. Astro жобасын жасаңыз:

   ```console
   npm create astro@latest
   ```

1. `astro.example.com` доменінің DNS-жазбаларын басқаруға қолжетімділігіңіз бар екенін тексеріңіз.

## {heading(1. Astro-жобасын жинаңыз)[id=cdn-ssh-step1]}

1. Astro жобасының директориясына өтіңіз.
1. `astro.config.mjs` файлында статикалық шығу бапталғанын тексеріңіз:

   ```javascript
   import { defineConfig } from 'astro/config';

   export default defineConfig({
     output: 'static',
   });
   ```

1. Жобаны жинаңыз:

   ```console
   npm run build
   ```

   `./dist` директориясында сайттың статикалық файлдары пайда болады: `index.html`, қате беттері, суреттер, CSS және JavaScript файлдары.

1. `./dist` түбірінде `index.html` және `404.html` файлдары бар екенін тексеріңіз. Егер `404.html` файлы автоматты түрде жасалмаған болса, оны қолмен жасаңыз.

## {heading(2. Статикалық сайтты хостингке арналған бакетті баптаңыз)[id=cdn-ssh-step2]}

Статикалық сайт конфигурациясын {linkto(../../instructions/manage-static-site#s3-instructions-manage-static-site-setup)[text=баптаңыз]}. Конфигурацияда бакет үшін индекстік құжатты және қате бетін көрсетіңіз. 
Бұл {linkto(../../concepts/static-site-hosting#s3-concepts-static-site-hosting-config)[text=конфигурация файлы]} арқылы немесе бірден AWS CLI командасында жасалуы мүмкін:

```console
aws s3api put-bucket-website \
  --bucket astro-site-bucket \
  --website-configuration '{"IndexDocument":{"Suffix":"index.html"},"ErrorDocument":{"Key":"404.html"}}' \
  --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
```

Мұнда:

- `index.html` — бакет түбіріне өткенде берілетін құжат.
- `404.html` — 404 қатесі кезінде берілетін құжат.

Конфигурация бапталғаннан кейін статикалық сайт келесі мекенжай бойынша қолжетімді болады: `https://astro-site-bucket.hb-website.hb.ru-msk.vkcloud-storage.ru`

{note:info}
{var(s3)} қызметіндегі веб-сайттарды статикалық хостинг HTTP арқылы қолжетімді. HTTPS арқылы қолжетімділік {linkto(#cdn-ssh-step5)[text=CDN-ресурсын баптау]} кезінде орнатылады.
{/note}

## {heading(3. Қолжетімділік құқықтарын және CORS баптаңыз)[id=cdn-ssh-step3]}

1. Сайт нысандарына жалпыхалықтық оқу қолжетімділігін баптаңыз. Әдістердің бірін қолданыңыз.

   {tabs}

   {tab(Қолжетімділік саясаты (ұсынылады))}

   1. Нысандарды анонимді оқуға рұқсат беретін саясаты бар `policy.json` файлын жасаңыз:

      ```json
      {
      "Version": "2012-10-17",
      "Statement": [
         {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": ["arn:aws:s3:::astro-site-bucket/*"]
         }
      ]
      }
      ```

   1. Саясатты қолданыңыз:

      ```console
      aws s3api put-bucket-policy \
      --bucket astro-site-bucket \
      --policy file://policy.json \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
      ```

   {/tab}

   {tab(ACL)}

   Бакет үшін `public-read` стандартты ACL орнатыңыз:

   ```console
   aws s3api put-bucket-acl \
     --bucket astro-site-bucket \
     --acl public-read \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Нысандарды жүктеген кезде әр нысан оқуға қолжетімді болуы үшін `--acl public-read` жалаушасын да көрсетіңіз.
   {/tab}

   {/tabs}

   {note:warn}
   Оқуға арналған жалпыхалықтық қолжетімділік кез келген пайдаланушыға бакеттен нысандарды жүктеп алуға мүмкіндік береді. Осы бакетке құпия деректерді жүктемеңіз. Бакетпен операциялардың төлемі оның иесіне жүктеледі.
   {/note}

1. Егер сайт қоймадағы ресурстарға кросс-домендік сұраныстар жасаса, бакет үшін {linkto(../../instructions/access-management/cors#s3-instructions-cors-add)[text=CORS баптаңыз]}.

   CORS XML-конфигурациясының мысалы:

   ```xml
   <CORSConfiguration>
     <CORSRule>
       <AllowedOrigin>https://astro.example.com</AllowedOrigin>
       <AllowedMethod>GET</AllowedMethod>
       <AllowedMethod>HEAD</AllowedMethod>
       <AllowedHeader>*</AllowedHeader>
       <MaxAgeSeconds>3000</MaxAgeSeconds>
     </CORSRule>
   </CORSConfiguration>
   ```

   Мұнда:

   - `AllowedOrigin` — бакетке сұраныстар жасауға рұқсат етілген сайт домені.
   - `AllowedMethods` — сұраныстарда рұқсат етілген HTTP-әдістер.
   - `MaxAgeSeconds` — алдын ала сұраныс нәтижелерін браузерде кэштеу уақыты.

## {heading(4. Сайт файлдарын бакетке жүктеңіз)[id=cdn-ssh-step4]}

1. AWS CLI көмегімен `./dist` директориясының мазмұнын бакетпен синхрондаңыз:

   ```console
   aws s3 sync ./dist s3://astro-site-bucket \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Команда тек жаңа және өзгертілген файлдарды жүктейді, бұл қайта деплойлауды жылдамдатады.

   {note:info}
   Синхрондау үшін rclone немесе {linkto(../../connect/s3-file-managers#s3-connect-file-managers)[text=файлдық менеджерлер]} (CyberDuck, WinSCP) де қолдануға болады.
   {/note}

1. Файлдар жүктелгенін тексеріңіз:

   ```console
   aws s3 ls s3://astro-site-bucket \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

## {heading(5. CDN қосыңыз және домен байланыстырыңыз)[id=cdn-ssh-step5]}

1. `astro-site-bucket` бакетінің интерфейсі арқылы CDN-ресурсын {linkto(../../../../networks/cdn/instructions/create-resource#cdn-create-resource-bucket-ui)[text=жасаңыз]}. Параметрлерде көрсетіңіз:

   * **Жеке домен**:`astro.example.com`.
   * **Кэштің өмір сүру уақыты**: `4`. Статикалық сайт үшін `1`-ден `7` күнге дейінгі мәнді көрсеткен ұсынылады.

1. Әрі қарай баптау үшін **CDN** бөліміне өту үшін **CDN-ресурсіне өту** түймесін басыңыз.
1. CDN-ресурсының қызметтік домен атауын сақтаңыз (мысалы, `cl-541e19d9.service.cdn.msk.vkcs.cloud`) — ол CNAME-жазбасын жасау үшін қажет болады.
1. Соңғы пайдаланушыларға контентке қолжетімділікті {linkto(../../../../networks/cdn/instructions/manage-cdn/enable-cdn#cdn-enable-cdn)[text=қосыңыз]}. Бұл кейін [Let's Encrypt](https://letsencrypt.org/ru/) SSL-сертификаты ретінде таңдау мүмкіндігі үшін қажет.
1. Пайдаланушыларға деректерді қауіпсіз жеткізу үшін CDN-ресурсы үшін дереккөзбен өзара әрекеттесу хаттамасы ретінде HTTPS {linkto(../../../../networks/cdn/instructions/manage-cdn/origin-settings#cdn-origin-settings-protocol)[text=таңдаңыз]}. Бұл Let's Encrypt SSL-сертификаты ретінде қолдану үшін де қажет.
1. CDN-ресурсының шифрлау баптауларында **Let's Encrypt** опциясын таңдаңыз — CNAME-жазбалары DNS-те таралғаннан кейін (әдетте 30 минутқа дейін) автоматты түрде жасалатын тегін SSL-сертификаты қолданылады.
SSL-сертификаттарын басқару туралы толығырақ — {linkto(../../../../networks/cdn/instructions/manage-cdn/ssl#cdn-ssl)[text=SSL-сертификатын қолдану]} бөлімінде.
1. DNS-жазбасын баптаңыз: `astro.example.com` домені үшін CNAME-жазбасын жасаңыз, псевдоним ретінде сақталған CDN-ресурсының қызметтік домен атауын көрсетіңіз. Егер {var(cloud)} DNS қызметі қолданылса, {linkto(../../../../networks/dns/instructions/publicdns/records#dns-records-add)[text=DNS-жазбаларын қосу нұсқаулығын]} орындаңыз.

## {heading(6. Кэштеу ережелерін баптаңыз)[id=cdn-ssh-step6]}

CDN-ресурсында кэштеуді {linkto(../../../../networks/cdn/instructions/manage-cdn/caching#cdn-caching-cdn-resource)[text=баптаңыз]}. Әртүрлі контент түрлері үшін ұсынылатын TTL мәндері туралы толығырақ {linkto(../../../../networks/cdn/concepts/cache#cdn-cache)[text=Контентті кэштеу]} бөлімінде.

## {heading(7. Контентке қолжетімділікті баптаңыз)[id=cdn-ssh-step8]}

1. Басқа сайттардың сіздің ресурстарыңызды қолдануын болдырмау үшін домен бойынша қолжетімділік саясатын {linkto(../../../../networks/cdn/instructions/manage-cdn/security#cdn-security-access-policy-domain)[text=баптаңыз]}.
1. Дереккөздерге географиялық белгі бойынша контентке қолжетімділікті шектеу үшін елдер бойынша қолжетімділік саясатын {linkto(../../../../networks/cdn/instructions/manage-cdn/security#cdn-security-access-policy-country)[text=баптаңыз]}.

## {heading(Жұмыс істеуін тексеріңіз)[id=cdn-ssh-check]}

1. Сайтты браузерде `https://astro.example.com` мекенжайы бойынша ашыңыз. Astro-сайттың басты беті көрсетілуі тиіс.

1. Қате бетін тексеріңіз — мысалы, `https://astro.example.com/nonexistent-page` сияқты жоқ URL ашыңыз. `404.html` беті көрсетілуі тиіс.

1. Жауап тақырыптарын тексеріңіз:

   ```console
   curl -I https://astro.example.com
   ```

   Келесілерді тексеріңіз:

   - `Content-Type` тақырыбында дұрыс MIME-типі көрсетілген.
   - CDN-нен кэштеу тақырыптары бар.

1. Суреттер мен басқа статикалық ресурстардың дұрыс жүктелетінін тексеріңіз.

## {heading(Қолданылмайтын ресурстарды жойыңыз)[id=cdn-ssh-delete]}

Жасалған ресурстар {linkto(../../tariffication#s3-tariffication)[text=тарифтеленеді]}. Егер олар сізге қажет болмаса:

1. Бакеттен {linkto(../../instructions/objects/manage-object#s3-instructions-manage-object-delete)[text=нысандарды жойыңыз]}.
1. {linkto(../../instructions/buckets/manage-bucket#s3-instructions-manage-bucket-delete)[text=Бакетті жойыңыз]}.
1. Егер қажет болмаса, {linkto(../../../../networks/cdn/instructions/delete-resource#cdn-delete-resource)[text=CDN-ресурсын жойыңыз]}.