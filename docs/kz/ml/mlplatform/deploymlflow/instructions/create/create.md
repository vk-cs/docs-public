{include(/kz/_includes/_translated_by_ai.md)}

Мақалада VK Cloud жеке кабинеті арқылы MLflow Deploy инстансын жасау жолы сипатталған.

Инстансты келесі құралдардың көмегімен де жасауға болады:

- [Terraform](/kz/tools-for-using-services/terraform/how-to-guides/mlplatform/deploymlflow);
- Cloud ML Platform кітапханасы, [create_deploy](../../../mlplatform-lib/lib-reference#create_deploy) әдісі;
- [MLflow Deployment Client кітапханасы](../../how-to-guides/manage-mlflow-client).

MLflow Deploy инстансы тек MLflow инстансымен бірге ғана жасалуы мүмкін. Өз кезегінде, MLflow инстансы екі режимде жұмыс істей алады: [JupyterHub-пен бірге](../../../concepts/mlflow-modes#with_jh) немесе бөлек, [Standalone режимінде](../../../concepts/mlflow-modes#standalone).

MLflow Deploy инстансын жасауға кіріспес бұрын, қажетті инфрақұрылымды дайындаңыз:

1. Егер сізге JupyterHub-пен бірге жұмыс істейтін MLflow инстансы қажет болса және JupyterHub инстансы әлі жасалмаған болса, оны [жасаңыз](../../../jupyterhub/instructions/create).
1. Егер бұл әлі жасалмаған болса, MLflow немесе MLflow Standalone инстансын [жасаңыз](../../../mlflow/instructions/create).

MLflow Deploy инстансын жасау үшін:

1. VK Cloud жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/).
1. **ML Platform** бөліміне өтіңіз.
1. **MLflow Deploy** картасындағы **Инстанс жасау** батырмасын басыңыз.
1. **Конфигурация** қадамында инстанс параметрлерін көрсетіңіз:

    - **Инстанс атауы**: инстанс атауын беріңіз, ол ОС-та хост атауы (hostname) да болады. Атау тек латын әріптерін, цифрларды және `-`, `_` және `.` арнайы таңбаларын қамтуы мүмкін.
    - **Виртуалды машина санаты**: ВМ алдын ала орнатылған конфигурацияларының [санатын](/kz/computing/iaas/concepts/vm/flavor) таңдаңыз.
    - **Виртуалды машина түрі**: ВМ алдын ала орнатылған конфигурациясын таңдаңыз.
    - **Қолжетімділік аймағы**: инстанс іске қосылатын [деректер орталығын](/kz/start/concepts/architecture#az) таңдаңыз.
    - **Диск өлшемі**: ВМ дискінің өлшемін ГБ-пен көрсетіңіз.
    - **Диск түрі**: жасалатын дискінің [түрін](/kz/computing/iaas/concepts/data-storage/disk-types#disk_types) көрсетіңіз.
    - **MLflow инстансы**: MLflow Deploy инстансы қосылатын MLflow инстансын немесе [MLflow Standalone](../../../concepts/mlflow-modes) таңдаңыз.

1. **Келесі қадам** батырмасын басыңыз.
1. **Желіні таңдау** қадамында таңдалған MLflow инстансы немесе [MLflow Standalone](../../../concepts/mlflow-modes) қосылған желіні таңдаңыз.
1. **Инстанс жасау** батырмасын басыңыз.

Инстансты жасау әдетте 10–15 минутты алады. Осы уақыт ішінде инстанс дискісіне операциялық жүйе жайылып, инстанстың ВМ-і таңдалған параметрлерге сәйкес бапталады.

Инстанс жасалғаннан кейін оның сипаттамалары бар бет ашылады.
