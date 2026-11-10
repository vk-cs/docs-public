# {heading(diskimage-builder көмегімен бейнесін жасау)[id=iaas-diskimage-builder]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Қолдау көрсетілетін бейнелердің тізімі `diskimage-builder` утилитасының [ресми құжаттамасында](https://docs.openstack.org/diskimage-builder/latest/user_guide/supported_distros.html) қолжетімді.

Мысал ретінде openSUSE Leap 15.6 ОС бар ВМ бейнелерін жасау және баптау қарастырылады. Барлық әрекеттер Ubuntu ОС бар жергілікті компьютерде орындалады.

## {heading(Дайындық қадамдары)[id=iaas-diskimage-builder-preparatory-steps]}

1. Компьютеріңізде кемінде 3 ГБ дискілік орынды босатыңыз.
1. Компьютерді интернетке қолжетімді желіге қосыңыз.

## {heading(1. Қажетті бағдарламалық жасақтаманы орнатыңыз)[id=iaas-diskimage-builder-install-software]}

1. Python-жинақтарына қолдау көрсетуді баптаңыз:

   ```console
   sudo apt update
   sudo apt -y install python3-pip curl
   ```

1. [QEMU](https://www.qemu.org/) утилиталарын ұсынатын `qemu-utils` пакетін орнатыңыз:

   ```console
   sudo apt install qemu-utils
   ```

1. Python виртуалды ортасын құруға арналған `virtualenv` қосымшасын [ресми құжаттамада](https://virtualenv.pypa.io/en/latest/installation.html) сипатталғандай орнатыңыз.
1. Компьютеріңізге орнатылған Python нұсқасын анықтаңыз:

   ```console
   python3 --version
   ```

1. Python виртуалды ортасын құрыңыз және белсендіріңіз, командаларды ретімен орындаңыз:

   ```console
   virtualenv -p python<PYTHON_НҰСҚАСЫ> venv_py<PYTHON_НҰСҚАСЫ>
   source venv_py<PYTHON_НҰСҚАСЫ>/bin/activate
   ```

1. `diskimage-builder` утилитасын орнатыңыз:

   ```console
   pip install git+https://opendev.org/openstack/diskimage-builder.git
   ```

## {heading(2. openSUSE Leap ОЖ бар ВМ бейнесін жинаңыз)[id=iaas-diskimage-builder-image-build]}

Команданы орындаңыз:

```console
DIB_RELEASE=15.6 disk-image-create -t raw -o opensuse-15.6.raw vm opensuse
```

RAW пішіміндегі ВМ бейнесі бар `opensuse-15.6.raw` файлы жасалады.

{note:info}
Қалаған қасиеттері бар ВМ бейнесін жинау үшін `disk-image-create` командасының қосымша аргументтерін пайдаланыңыз. Толығырақ [ресми құжаттамада](https://docs.openstack.org/diskimage-builder/latest/user_guide/building_an_image.html).
{/note}

## {heading(3. Бейнесін {var(cloud)} жүктеңіз)[id=iaas-diskimage-builder-image-upload]}

1. OpenStack клиенті {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанын]} тексеріңіз және {var(cloud)} жобасында {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.
1. `opensuse-15.6.raw` бейнесін `Opensuse` атауымен {var(cloud)} жүктеңіз:

   ```console
   openstack image create \
       --progress \
       --private \
       --container-format bare \
       --disk-format raw \
       --file opensuse-15.6.raw \
       --property store=s3 \
       --property hw_qemu_guest_agent=True \
       --property os_require_quiesce=yes \
       --property mcs_name='Opensuse' \
       Opensuse
   ```

   Мұнда `--property <КЛЮЧ>=<МӘН>` түріндегі аргументтер бейнесіне {{ifdef(public)}{linkto(../../../../computing/iaas/instructions/images/image-metadata#iaas-image-metadata)[text=метатегтер]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}метатегтер{/ifdef} тағайындау үшін пайдаланылады.

## {heading(4. Образдың сәтті жүктелгенін тексеріңіз)[id=iaas-diskimage-builder-download-success]}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.kz/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cer)}{linkto(../../../../intro/authorization/lk_entry#prerequisites_vkc_ui)[text=Өтіңіз]}{/ifdef} в личный кабинет {var(cloud)}.
1. **Бұлтты есептеулер** → **Образдар** бөліміне өтіңіз.
1. Тізімде `Opensuse` атауы бар образдың бар екеніне көз жеткізіңіз.

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=iaas-diskimage-builder-image-delete]}

Жүктелген бейне сізге енді қажет болмаса, оны {linkto(../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-delete)[text=жойыңыз]}.