# {heading(Deployment жұмысы)[id=k8s-deployment]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Deployment — бұл бірегей нөмірлері жоқ бірдей контейнерлер жиынтығын білдіретін Kubernetes объектісі. Deployment қолданбалардың бірнеше репликасын іске қосуға және істен шығу жағдайында қолданба даналарын автоматты түрде ауыстыруға мүмкіндік береді.

## {heading(Жаңа Deployment жасау)[id=k8s-deployment-create]}

```console
kubectl --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml create deployment <DEPLOYMENT> --image=<ОБРАЗ>
```
Мұнда:

* `<DEPLOYMENT>` — Deployment атауы.
* `<ОБРАЗ>` — контейнер бейнесінің атауы.

## {heading(Ағымдағы Deployment күйін көру)[id=k8s-deployment-describe]}

```console
kubectl --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml describe deployment <DEPLOYMENT>
```

Мұнда `<DEPLOYMENT>` — Deployment атауы.

YAML форматындағы Deployment сипаттамасының мысалы:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.7.9
        ports:
        - containerPort: 80
```

Осы мысалда NGINX бейнесі негізінде `nginx` атауымен үш бірдей контейнер жасалады. Контейнерлерге 80-порт арқылы қолжетімділік жүзеге асырылады.

Deployment жаңартылған кезде Kubernetes контейнерлерді жаңа конфигурациямен дәйекті түрде қайта іске қосады, сонымен қатар жаңа контейнерлердің жеткілікті саны сәтті іске қосылғанша ескі контейнерлер жойылмайды.

## {heading(Deployment жаңарту)[id=k8s-deployment-update]}

```console
kubectl --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml apply -f <DEPLOYMENT>
```
Мұнда `<DEPLOYMENT>` — Deployment атауы.