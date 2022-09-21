В данной статье рассмотрим, как установить и настроить Docker.

После этого вы можете:

- [установить и настроить Gitlab](https://mcs.mail.ru/help/gitlab-ci-cd/gitlab-installation);
- [установить и настроить Harbor](https://mcs.mail.ru/help/gitlab-ci-cd/harbor-installation);
- [настроить авторазвертывание приложения в кластер Kubernetes](https://mcs.mail.ru/help/gitlab-ci-cd/k8s-autodeploy).

Чтобы установить и настроить Docker:

1.  Авторизуйтесь на сервере Ubuntu, получите права суперпользователя.
2.  Установите необходимые пакеты:

```
apt-get install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common
```

3.  Добавьте ключ репозитория Docker:

```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
OK
```

4.  Добавьте репозиторий Docker:

```
add-apt-repository   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
 $(lsb_release -cs) \
 stable"
```

5.  Установите Docker:

```
apt-get update && apt-get install -y docker-ce docker-ce-cli containerd.io
```

6.  Установите Docker-compose:

```
curl -L "https://github.com/docker/compose/releases/download/1.25.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

Теперь [установите и настройте Gitlab](https://mcs.mail.ru/help/gitlab-ci-cd/gitlab-installation).

## Обратная связь

Возникли проблемы или остались вопросы? [Напишите нам, мы будем рады вам помочь](https://mcs.mail.ru/help/contact-us).
