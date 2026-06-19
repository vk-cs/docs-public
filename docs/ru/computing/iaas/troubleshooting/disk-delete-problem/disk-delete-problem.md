# {heading(Не получается удалить диск)[id=iaas-disk-delete-problem]}

Не получается удалить диск в личном кабинете или с помощью OpenStack CLI.

Это может быть связано с тем, что диск не отключен от виртуальной машины или не удалены снимки диска. 

### {heading(Решение)[id=iaas-disk-delete-problem-decision]}

1. Убедитесь, что диск {linkto(../../../../computing/iaas/instructions/volumes/volumes-connect#iaas-volumes-connect-dismount-disk)[text=отключен]} от ВМ и {linkto(../../../../computing/iaas/instructions/volumes/volumes-snapshots#iaas-volumes-snapshots)[text=удалены]} его снимки.
1. Попробуйте {linkto(../../../../computing/iaas/instructions/volumes/volumes-manage#iaas-volumes-manage)[text=удалить]} диск.
1. Если проблема сохраняется, обратитесь {ifdef(public)}в [техническую поддержку](/ru/contacts){/ifdef}{ifdef(private,private-pg)}к администратору {var(cloud)}{/ifdef}.