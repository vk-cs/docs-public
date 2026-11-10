# {heading(Keystone рұқсат токенін алу)[id=rest-api-keystone-token]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Keystone токені {var(cloud)} кейбір сервистерімен және компоненттерімен олардың API арқылы жұмыс істеу үшін қажет — мысалы, Cloud Servers сервисіндегі виртуалды желілер сервисімен (Neutron) және резервтік көшірмелеу жүйесімен (Karboii).

{ifdef(public)}

## {heading(Дайындық қадамдары)[id=rest-api-keystone-token-prepare]}

{include(../../../../_includes/_prerequisites-api.md)[tags=api-token-prerequisites]}
{/ifdef}

## {heading(Токенді генерациялау)[id=rest-api-keystone-token-gen]}

{include(../../../../_includes/_prerequisites-api.md)[tags=api-token-gen,case-keystone-token]}

{ifndef(public)}

## {heading(Токенді қайта шығару)[id=rest-api-keystone-token-reissue]}

{include(../../../../_includes/_prerequisites-api.md)[tags=api-token-reissue]}
{/ifndef}

{ifdef(public)}

## {heading(Токенді пайдалану мысалы)[id=rest-api-keystone-token-example]}

{include(../../../../_includes/_prerequisites-api.md)[tags=api-token-example]}
{/ifdef}