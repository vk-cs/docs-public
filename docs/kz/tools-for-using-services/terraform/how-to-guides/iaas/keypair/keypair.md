# {heading(Кілттік жұптарды жасау)[id=terraform-keypair]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{note:warn}
{linkto(../../../quick-start#terraform-quick-start)[text=Terraform орнатқаныңызды және конфигурациялағаныңызды]} тексеріңіз.
{/note}

Кілттік жұпты жасау үшін оның конфигурациясы сипатталатын `keypair.tf` файлын жасаңыз. Төмендегі мысалдан мәтінді қосыңыз және инфрақұрылымыңыз үшін параметрлер мәндерін түзетіңіз. Бұл мысалда `test-keypair` атауы бар кілттік жұпты жасау және `output` операторы арқылы ашық және жабық кілттерді экранға шығару сипатталған.

Параметрлердің толық сипаттамасы — [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## {heading(Кілттік жұпты жасау)[id=terraform-keypair-create]}

{note:warn}
Осы ресурс арқылы генерацияланған жабық кілт Terraform күй файлыңызда шифрланбаған түрде сақталады. Бұл ресурсты өндірістік орнатулар үшін пайдалану ұсынылмайды. Оның орнына жабық кілт файлын Terraform-нан тыс жерде жасаңыз және оны Terraform жұмыс істейтін жүйеде қауіпсіз таратыңыз.
{/note}

Кілттік жұпты жасау үшін сізге `vkcs_compute_keypair` ресурсы (resource) қажет болады.

```hcl
resource "vkcs_compute_keypair" "keypair" {
  name = "test-keypair"
}

output "public_key" {
  value = vkcs_compute_keypair.keypair.public_key
}

output "private_key" {
  value = vkcs_compute_keypair.keypair.private_key
  sensitive = true
}
```

Мұнда `name` — кілттік жұптың бірегей атауы (міндетті аргумент). Бұл аргументті өзгерту жаңа кілттік жұптың жасалуына әкеледі.

## {heading(Өзгерістерді қолдану)[id=terraform-keypair-apply]}

Мысалды `keypair.tf` файлына қосыңыз және келесі командаларды орындаңыз:

```console
terraform init
```
```console
terraform apply
```