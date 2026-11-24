# {heading(Ошибка видеоадаптера с кодом 12 на ВМ с vGPU)[id=iaas-vgpu-windows-problem]}

На ВМ с {linkto(../../../../computing/gpu/concepts/vgpu#gpu-vgpu)[text=vGPU]} и ОС Windows, собранной из собственного образа, в диспетчере устройств в свойствах видеоадаптера указана ошибка:

```plaintext
Недостаточно свободных ресурсов для работы данного устройства (Код 12)
```

Проблема возникает, если у образа не задан {linkto(../../../../computing/iaas/instructions/images/image-metadata#iaas-image-metadata)[text=метатег]} `hw_video_model=none`. В этом случае гипервизор дополнительно эмулирует для ВМ встроенный видеоадаптер, который конфликтует с видеоадаптером vGPU при распределении ресурсов. Из-за конфликта драйвер vGPU не может корректно инициализироваться.

### {heading(Решение)[id=iaas-vgpu-windows-problem-decision]}

Изменить метатег для уже созданной ВМ нельзя. Нужно пересоздать ВМ из образа с установленным метатегом.

1. {linkto(../../../../computing/iaas/instructions/images/image-metadata#iaas-image-metadata-install)[text=Задайте]} метатег образу, на основе которого собрана ВМ:

   ```console
   openstack image set --property hw_video_model=none <ID_ОБРАЗА>
   ```

1. {linkto(../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=Создайте]} ВМ заново из обновленного образа.
