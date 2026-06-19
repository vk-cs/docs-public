# {heading(ВМ интерфейсі бапталмаған)[id=iaas-restored-vm-no-interface]}

{include(/kz/_includes/_translated_by_ai.md)}

Резервтік көшірмеден қалпына келтірілген ВМ-де интерфейстер бапталмаған.

### {heading(Шешім)[id=iaas-restored-vm-no-interface-decision]}

Резервтік көшірмеден қалпына келтіргеннен кейін ВМ операциялық жүйесіндегі интерфейс баптауларын [тексеріп, қажет болса түзетіңіз](/kz/computing/iaas/troubleshooting/linux-vm-network#1_proverte_nastroyki_setevogo_interfeysa). ВМ-нің ішкі және сыртқы мекенжайларының баптаулары [жеке кабинеттегі](https://kz.cloud.vk.com/app/) баптауларға сәйкес келуі керек.

{note:info}
Сыртқы IP болуы тиіс барлық ВМ-ді қосу үшін [Floating IP мекенжайларын](/kz/networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip) пайдаланыңыз. Егер ВМ жойылса немесе оны қайта құру қажет болса, Floating IP мекенжайы жобада қалады және оны қалпына келтірілген ВМ-ге тағайындауға болады.
{/note}
