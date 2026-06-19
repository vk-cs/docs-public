# {heading(diskimage-builder көмегімен образ жасау)[id=iaas-diskimage-builder]}

{include(/kz/_includes/_translated_by_ai.md)}

Қолдау көрсетілетін образдар тізімі `diskimage-builder` утилитасының [ресми құжаттамасында](https://docs.openstack.org/diskimage-builder/latest/user_guide/supported_distros.html) қолжетімді.

Мысал ретінде OpenSuse Leap ОС-ы бар ВМ образын жасау және баптау қарастырылады. Барлық әрекеттер Ubuntu ОС-ы орнатылған жергілікті компьютерде орындалады.

## {heading(Дайындық қадамдары)[id=iaas-diskimage-builder-preparatory-steps]}

1. Компьютеріңізде кемінде 3 ГБ дискілік орынды босатыңыз.
1. Компьютерді интернетке қолжетімді желіге қосыңыз.

## {heading(1. Қажетті БҚ орнатыңыз)[id=iaas-diskimage-builder-install-software]}

1. Python кітапханаларын қолдауды баптаңыз:

   ```console
   sudo apt update
   sudo apt -y install python-pip curl
   ```

1. [QEMU](https://www.qemu.org/) утилиталарын ұсынатын `qemu-utils` бумасын орнатыңыз:

   ```console
   sudo apt install qemu-utils
   ```

1. [ресми құжаттамада](https://virtualenv.pypa.io/en/latest/installation.html) сипатталғандай, Python виртуалды ортасын жасау үшін `virtualenv` қолданбасын орнатыңыз.
1. Компьютеріңізде орнатылған Python нұсқасын анықтаңыз:

   ```console
   python –version
   ```

1. Командаларды кезекпен орындап, Python виртуалды ортасын жасаңыз және іске қосыңыз:

   ```console
   virtualenv -p python<ВЕРСИЯ_PYTHON> venv_py<ВЕРСИЯ_PYTHON>
   source venv_py<ВЕРСИЯ_PYTHON>/bin/activate
   ```

1. `diskimage-builder` утилитасын орнатыңыз:

   ```console
   pip install git+https://opendev.org/openstack/diskimage-builder.git
   ```

## {heading(2. OpenSuse Leap ОС-ы бар ВМ образын құрастырыңыз)[id=iaas-diskimage-builder-image-build]}

Команданы орындаңыз:

```console
DIB_RELEASE=15.3 disk-image-create -t raw -o opensuse-15.3.raw vm opensuse
```

RAW форматындағы ВМ образы бар `opensuse-15.3.raw` файлы жасалады.

{note:info}
Қажетті қасиеттері бар ВМ образын құрастыру үшін `disk-image-create` командасының қосымша аргументтерін пайдаланыңыз. Толығырақ [ресми құжаттамада](https://docs.openstack.org/diskimage-builder/latest/user_guide/building_an_image.html).
{/note}

## 3. Образды {var(cloud)} ішіне жүктеңіз

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack) көз жеткізіңіз және {var(cloud)} жобаңызда [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#openstack-authorize).
1. `opensuse-15.3.raw` образын {var(cloud)} ішіне `Opensuse` атауымен жүктеңіз:

   ```console
   openstack image create        --progress        --private        --container-format bare        --disk-format raw        --file opensuse-15.3.raw        --property store=s3        --property hw_qemu_guest_agent=True        --property os_require_quiesce=yes        --property mcs_name='Opensuse'        Opensuse
   ```

   Мұнда `--property <КЛЮЧ>=<ЗНАЧЕНИЕ>` түріндегі аргументтер образға [метатегтерді](/kz/computing/iaas/instructions/images/image-metadata) тағайындау үшін қолданылады.

## {heading(4. Образдың сәтті жүктелгенін тексеріңіз)[id=iaas-diskimage-builder-download-success]}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cer)}{linkto(../../../../intro/authorization/lk_entry#prerequisites_vkc_ui)[text=Өтіңіз]}{/ifdef} в личный кабинет {var(cloud)}.
1. **Бұлтты есептеулер** → **Образдар** бөліміне өтіңіз.
1. Тізімде `Opensuse` атауы бар образдың бар екеніне көз жеткізіңіз.

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=iaas-diskimage-builder-image-delete]}

Егер жүктелген образ енді қажет болмаса, оны [жойыңыз](/kz/computing/iaas/instructions/images/images-manage#iaas-images-manage-delete).
