# {heading(Кластер баптаулары)[id=k8s-settings]}

{include(/kz/_includes/_translated_by_ai.md)}

Cloud Containers кластерлерінде төменде келтірілген белгілі бір баптаулар әлдеқашан қолданылған.

## {heading(kube-proxy жұмыс режимі)[id=k8s-settings-kube-proxy-mode]}

Kubernetes желілік проксиі әрбір торапта орындалып, сервистер мен басқа Kubernetes ресурстарының IP мекенжайларына қатынасуын қамтамасыз етеді.

Бұл прокси [бірнеше режимде](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-proxy/#options) жұмыс істей алады, олар `--proxy-mode` баптауының сипаттамасында келтірілген. Cloud Containers кластерлерінде прокси `iptables` режимінде жұмыс істейді. Бұл жұмыс режимі мыналарға әсер етеді:

- {linkto(../../../how-to-guides/load-balancer#k8s-load-balancer)[text=жүктеме теңгергіштерінің әрекетіне]};
- {linkto(../../../how-to-guides/dns/local-dns-cache#k8s-local-dns-cache)[text=жергілікті кэштейтін DNS-сервердің әрекеті мен баптауларына]}.

## {heading(Подтар үшін лимиттер баптаулары)[id=k8s-settings-requests-and-limits]}

Подтармен жұмыс істегенде, олардың конфигурациялық файлдарында осы подқа кіретін контейнерлер үшін `requests` және `limits` параметрлерін {linkto(../../../reference/resource-limiting#k8s-resource-limiting)[text=көрсету ұсынылады]}.

Егер бұл параметрлер көрсетілмесе, Cloud Containers кластерлерінде тиісті контейнерлер үшін келесі мәндер автоматты түрде қолданылады:

- `requests`: 100m CPU және 64 МБ бөлінетін жад.
- `limits`: 500m CPU және 512 МБ бөлінетін жад.

Бұл дұрыс жұмыс істемейтін контейнердің жеке worker-тораптың немесе тіпті бүкіл кластердің барлық есептеу ресурстарын сарқып қою жағдайын болдырмауға мүмкіндік береді.

## {heading(Gatekeeper алдын ала бапталған үлгілері мен шектеулері)[id=k8s-settings-templates-and-limitations]}

Cloud Containers сервисінде Kubernetes кластерлерінде бірнеше кең таралған осалдықтан кластерлерді негізгі қорғауды қамтамасыз ететін {linkto(../../security-policies#k8s-security-policies-default)[text=әдепкі қауіпсіздік саясаттары]} қолданылады. Әдепкі саясаттарды жою немесе өзгерту мүмкін емес.

Саясаттар және олармен жұмыс істеу жөніндегі ұсынымдар туралы толығырақ {linkto(../../security-policies#k8s-security-policies)[text=Қауіпсіздік саясаттары]} бөлімінен оқыңыз.
