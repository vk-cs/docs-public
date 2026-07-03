{includetag(k8s-admin)}
Название в личном кабинете: `Администратор Kubernetes`.

Роль с максимально широким набором разрешений для работы с сервисом {linkto(/ru/kubernetes/k8s/concepts/about#k8s-about)[text=Cloud Containers]}. Некоторые действия доступны только в определенном состоянии кластера. Например, установка и удаление аддонов возможны, только если кластер запущен.

Пользователь с этой ролью может: 

- создавать и удалять кластеры;
{include(/ru/_includes/_iam_k8s_actions.md)}

{/includetag}

{includetag(k8s-editor)}
Название в личном кабинете: `Оператор Kubernetes`.

Роль с разрешениями для работы в сервисе {linkto(/ru/kubernetes/k8s/concepts/about#k8s-about)[text=Cloud Containers]}. Некоторые действия доступны только в определенном состоянии кластера. Например, установка и удаление аддонов возможны, только если кластер запущен.

Пользователь с этой ролью может:
{include(/ru/_includes/_iam_k8s_actions.md)}

{/includetag}

{includetag(k8s-viewer)}
Название в личном кабинете: `Аудитор Kubernetes`.

Роль с разрешениями на просмотр сервиса {linkto(/ru/kubernetes/k8s/concepts/about#k8s-about)[text=Cloud Containers]}.

Пользователь с этой ролью может:

- просматривать информацию о кластере и группах узлов;
- получать файл `kubeconfig`;
- получать секрет для доступа в Kubernetes Dashboard.

{/includetag}