# {heading(Сұрақтар мен жауаптар)[id=k8s-faq]}

{include(/kz/_includes/_translated_by_ai.md)}

{cut(Жеке кабинетте кластер түйіндеріндегі дискілердің өлшемін қалай үлкейтуге болады?)}

Бұрыннан жасалған worker-түйін үшін диск өлшемін өзгерту мүмкін емес.

Қолжетімді дискілік кеңістікті ұлғайту үшін:

1. [Қажетті диск өлшемі бар жаңа worker-түйіндер тобын жасаңыз](https://cloud.vk.com/docs/kubernetes/k8s/instructions/manage-node-group#add_group).
1. Жүктемені жаңа түйіндер тобына көшіріңіз. Толығырақ Kubernetes [ресми құжаттамасында](https://kubernetes.io/docs/home/) берілген.
1. Сервистердің жұмысқа қабілеттілігін тексеріңіз.
1. [Ескі worker-түйіндер тобын жойыңыз](https://cloud.vk.com/docs/kubernetes/k8s/instructions/manage-node-group#udalit_gruppu_uzlov).

{/cut}

{cut(Kubernetes сервисінің жүктеме теңгергіші клиенттердің IP мекенжайларын ала ала ма?)}

Иә, ала алады.

{linkto(../instructions/addons/advanced-installation/install-advanced-ingress#k8s-install-advanced-ingress)[text=ingress-nginx]} аддонын пайдаланыңыз. Аддонды орнату кезінде бұл баптау әдепкі бойынша қосылады.

Егер сіз ingress-nginx аддонын орнатпай-ақ Ingress NGINX компонентін пайдалансаңыз, Ingress конфигурациясында (ConfigMap) `use-proxy-protocol` аннотациясын қолданыңыз:

```console
annotations:
     nginx.ingress.kubernetes.io/use-proxy-protocol: "true"
```

`use-proxy-protocol` аннотациясы proxy protocol-ды қосады. Бұл прокси-серверлер мен жүктеме теңгергіштері арқылы берілетін клиенттердің IP мекенжайларын алуға мүмкіндік береді.

{/cut}

{cut(Limit Range арқылы подтар үшін шектеулерді автоматты түрде қоюды өшіруге бола ма?)}

Limit Range — под жасалған кезде қолданылатын саясат. Оны өшіру мүмкін емес, бірақ сіз {linkto(../concepts/addons-and-settings/settings#k8s-settings-requests-and-limits)[text=контейнерлердің]} конфигурация файлдарында `requests` және `limits` мәндерін өзіңіз орната аласыз.
{/cut}

{cut(Басқарылатын кластерге Windows ОЖ негізіндегі түйіндерді қосуға бола ма?)}

Windows ОЖ негізіндегі түйіндерді қосуға қолдау көрсетілмейді.
{/cut}
