# {heading(Не получается загрузить образ ВМ)[id=iaas-image-loading-problem]}

Проблемы с загрузкой образа виртуальной машины могут возникнуть из-за следующих причин:

- большой размер загружаемого файла;
- формат файла не совместим с {var(cloud)};
- исчерпан лимит на общий объем образов.

### {heading(Решение)[id=iaas-image-loading-problem-decision]}

1. Убедитесь, что формат загружаемого файла — RAW. Если ваш образ в другом формате, {linkto(../../../../computing/iaas/how-to-guides/packer#iaas-packer-convert-image)[text=выполните его конвертацию]}.
1. Убедитесь, что размер загружаемого файла не превышает 500 ГБ. {ifdef(public)}Если необходимо загрузить образ большего размера, воспользуйтесь {linkto(../../../../storage/s3/how-to-guides/load-large-image#s3-load-large-image)[text=инструкцией]}{/ifdef}.
1. Попробуйте {linkto(../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-import)[text=загрузить образ]} с использованием OpenStack CLI.
1. Если проблема сохраняется, обратитесь {ifdef(public)}в [техническую поддержку](/ru/contacts){/ifdef}{ifdef(private,private-pg)}к администратору {var(cloud)}{/ifdef}.

{ifdef(public)}
{note:info}
Лимит на общий объем загруженных образов составляет 2 ТБ. Чтобы увеличить лимит, обратитесь в [техническую поддержку](/ru/contacts).
{/note}
{/ifdef}