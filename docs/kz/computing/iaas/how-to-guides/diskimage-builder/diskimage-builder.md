{include(/kz/_includes/_translated_by_ai.md)}

{note:info}

Қолдау көрсетілетін образдар тізімі `diskimage-builder` утилитасының [ресми құжаттамасында](https://docs.openstack.org/diskimage-builder/latest/user_guide/supported_distros.html) қолжетімді.

{/note}

Мысал ретінде OpenSuse Leap ОС-ы бар ВМ образын жасау және баптау қарастырылады. Барлық әрекеттер Ubuntu ОС-ы орнатылған жергілікті компьютерде орындалады.

## Дайындық қадамдары

1. Компьютеріңізде кемінде 3 ГБ дискілік орынды босатыңыз.
1. Компьютерді интернетке қолжетімді желіге қосыңыз.

## 1. Қажетті БҚ орнатыңыз

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
    virtualenv -p python<версия Python> venv_py<версия Python>
    source venv_py<версия Python>/bin/activate
    ```

1. `diskimage-builder` утилитасын орнатыңыз:

    ```console
    pip install git+https://opendev.org/openstack/diskimage-builder.git
    ```

## 2. OpenSuse Leap ОС-ы бар ВМ образын құрастырыңыз

Команданы орындаңыз:

```console
DIB_RELEASE=15.3 disk-image-create -t raw -o opensuse-15.3.raw vm opensuse
```

RAW форматындағы ВМ образы бар `opensuse-15.3.raw` файлы жасалады.

{note:info}

Қажетті қасиеттері бар ВМ образын құрастыру үшін `disk-image-create` командасының қосымша аргументтерін пайдаланыңыз. Толығырақ [ресми құжаттамада](https://docs.openstack.org/diskimage-builder/latest/user_guide/building_an_image.html).

{/note}

## 3. Образды VK Cloud ішіне жүктеңіз

1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack) көз жеткізіңіз және VK Cloud жобаңызда [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu).
1. `opensuse-15.3.raw` образын VK Cloud ішіне `Opensuse` атауымен жүктеңіз:

    ```console
    openstack image create \
        --progress \
        --private \
        --container-format bare \
        --disk-format raw \
        --file opensuse-15.3.raw \
        --property store=s3 \
        --property hw_qemu_guest_agent=True \
        --property os_require_quiesce=yes \
        --property mcs_name='Opensuse' \
        Opensuse
    ```

   Мұнда `--property <ключ>=<значение>` түріндегі аргументтер образға [метатегтерді](/kz/computing/iaas/instructions/images/image-metadata) тағайындау үшін қолданылады.

## 4. Образдың сәтті жүктелгенін тексеріңіз

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне өтіңіз.
1. **Бұлтты есептеулер** → **Образдар** бөліміне өтіңіз.
1. Тізімде `Opensuse` атауы бар образдың бар екеніне көз жеткізіңіз.

## Пайдаланылмайтын ресурстарды жойыңыз

Егер жүктелген образ енді қажет болмаса, оны [жойыңыз](/kz/computing/iaas/instructions/images/images-manage#obrazdy_zhoyu).
