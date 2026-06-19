# {heading(Аккаунты и ключи доступа)[id=s3-concepts-account-and-keys]}

В {var(s3)} для доступа к бакетам и объектам используются два независимых друг от друга вида ключей:

- {linkto(#s3-concepts-account-and-keys-access-keys)[text=Ключи доступа, привязанные к аккаунту {ifdef(public)}{var(s3)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef}]}. Дают доступ ко всем бакетам аккаунта.
- {linkto(#s3-concepts-account-and-keys-bucket-access-keys)[text=Ключи доступа, привязанные к бакету]}. Дают доступ к одному бакету или части объектов в этом бакете.

## {heading(Аккаунт {ifdef(public)}{var(s3)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} и его ключи доступа)[id=s3-concepts-account-and-keys-access-keys]}

В личном кабинете {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} для работы с сервисом {var(s3)} ключи доступа не используются. Но если вы хотите работать с бакетами и объектами через {linkto(../../../connect/s3-cli#s3-connect-cli)[text=CLI]}, {linkto(../../../api#s3-api)[text=API]} или {linkto(../../../connect/s3-file-managers#s3-connect-file-managers)[text=файловые менеджеры]}, в проекте нужно {linkto(../../../instructions/access-management/access-keys#s3-instructions-access-keys-new-account-access-key)[text=создать]} аккаунт {var(s3)} и ключи доступа, которые будут к нему привязаны.

Вы можете создать несколько аккаунтов {var(s3)}. Их количество в одном проекте ограничено {linkto(../../../concepts/about#s3-concepts-about-limits)[text=лимитами]}. Одновременно с аккаунтом автоматически создается ключ доступа к нему. Ключ доступа к аккаунту — это пара из публичного идентификатора ключа (Access Key ID) и секретного ключа (Secret Key). Секретный ключ доступен только при создании пары, восстановить его позднее невозможно, но вы можете {linkto(../../../instructions/access-management/access-keys#s3-instructions-access-keys-existing-account-access-key)[text=создать]} новый ключ доступа. К одному аккаунту можно привязать до двух ключей.

Управление аккаунтами {var(s3)} и привязанными к ним ключами доступно только в личном кабинете {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef}.

## {heading(Ключи доступа к бакету)[id=s3-concepts-account-and-keys-bucket-access-keys]}

Ключи доступа к бакету привязываются к конкретному бакету, а не к аккаунту. Они наделяют пользователя правом работать с объектами только в этом бакете или в одной его директории, но не дают доступа к другим бакетам и объектам в проекте.

Ключ доступа к бакету — это пара из публичного идентификатора ключа (Access Key ID) и секретного ключа (Secret Key). Секретный ключ доступен только при создании пары, восстановить его позднее невозможно, но вы можете {linkto(../../../instructions/access-management/bucket-keys#s3-instructions-bucket-keys-add)[text=создать]} новый ключ доступа.

При добавлении ключа доступа в бакет в качестве параметра можно указать {linkto(../../../concepts/about#s3-concepts-about-object-key)[text=префикс к имени объекта]}, который {var(s3)} интерпретирует как имя директории в бакете. Такой ключ называется префиксным (prefix access key). Префиксный ключ дает доступ только к объектам в директории бакета, заданной префиксом. Ключ, созданный без указания префикса, дает доступ ко всем объектам в бакете.

Как и ключи, привязанные к аккаунту, ключи доступа к бакету дают возможность работать с объектами в нем через CLI, API или файловые менеджеры. Управлять ключами доступа к бакету можно {linkto(../../../instructions/access-management/bucket-keys#s3-instructions-bucket-keys)[text=через личный кабинет]}{ifdef(s3,s3-pdf)} IAM Only{/ifdef} или {linkto(../../../api/pak#s3-api-pak)[text=с помощью API]}.
