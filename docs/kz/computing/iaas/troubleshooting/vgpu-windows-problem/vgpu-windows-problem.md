# {heading(vGPU бар ВМ-дегі 12 кодымен бейнеадаптер қатесі)[id=iaas-vgpu-windows-problem]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Жеке образдан жиналған {linkto(../../../../computing/gpu/concepts/vgpu#gpu-vgpu)[text=vGPU]} және Windows ОЖ бар ВМ-де құрылғылар диспетчерінде бейнеадаптер сипаттарында қате көрсетіледі:

```plaintext
Бұл құрылғының жұмыс істеуі үшін бос ресурстар жеткіліксіз (Код 12)
```

Мәселе образда `hw_video_model=none` {linkto(../../../../computing/iaas/instructions/images/image-metadata#iaas-image-metadata)[text=метатегі]} орнатылмаған жағдайда туындайды. Бұл жағдайда гипервизор ВМ үшін ресурстарды бөлу кезінде vGPU бейнеадаптерімен қақтығысатын кіріктірілген бейнеадаптерді қосымша эмуляциялайды. Қақтығыс салдарынан vGPU драйвері дұрыс инициализациялана алмайды.

### {heading(Шешім)[id=iaas-vgpu-windows-problem-decision]}

Жасалған ВМ үшін метатегті өзгерту мүмкін емес. ВМ-ді метатегі орнатылған образдан қайта жасау керек.

1. ВМ жиналған образға метатегті {linkto(../../../../computing/iaas/instructions/images/image-metadata#iaas-image-metadata-install)[text=орнатыңыз]}:

   ```console
   openstack image set --property hw_video_model=none <ОБРАЗ_ID>
   ```

1. ВМ-ді жаңартылған образдан қайта {linkto(../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=жасаңыз]}.
