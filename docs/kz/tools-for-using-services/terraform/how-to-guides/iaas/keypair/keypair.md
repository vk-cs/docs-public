{include(/kz/_includes/_translated_by_ai.md)}

{note:warn}

[Terraform орнатып, баптағаныңызға](../../../quick-start) көз жеткізіңіз.

{/note}

Кілттік жұпты жасау үшін оның конфигурациясы сипатталатын `keypair.tf` файлын жасаңыз. Төмендегі мысалдан мәтінді қосып, инфрақұрылымыңыз үшін баптау мәндерін түзетіңіз. Бұл мысалда `test-keypair` атауымен кілттік жұпты жасау және `output` операторы арқылы жария және жеке кілтті экранға шығару сипатталады.

Параметрлердің толық сипаттамасы — [Terraform провайдерінің құжаттамасында](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## Кілттік жұпты жасау

{note:warn}

Осы ресурс арқылы жасалған жеке кілт Terraform күй файлыңызда шифрланбаған түрде сақталады. Бұл ресурсты өндірістік ортаға орналастырулар үшін пайдалану ұсынылмайды. Оның орнына жеке кілт файлын Terraform-нан тыс жасаңыз және оны Terraform жұмыс істейтін жүйеде қауіпсіз түрде таратыңыз.

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

## Өзгерістерді қолдану

Мысалды `keypair.tf` файлына қосып, келесі командаларды орындаңыз:

```console
terraform init
```
```console
terraform apply
```
