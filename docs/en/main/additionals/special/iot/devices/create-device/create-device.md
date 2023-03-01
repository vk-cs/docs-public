Before creating a device:

1. Create a driver.
1. Create a device template.

Instructions for creating the listed entities are given below.

## Creating a driver

A driver is a description of the method of communication between an agent and an end device.

To create a driver:

1. Go to **Драйверы** IoT Platform [personal account](https://iot.mcs.mail.ru/).
1. Click the **Добавить драйвер** button.
1. Fill the fields:

   - **Название**: driver name.
   - **Идентификатор**: driver unique id IoT Platform.
   - **Протокол**: [protocol](../connection/) of communication.

1. Click the **Следующий шаг** button.
1. Click the **Добавить параметр** for the corresponding subsection. For example, the parameters in the section **Параметры События** will control the frequency of sensor polling by the agent at the device, and in the section **Параметры Состояния** — the frequency of the agent polling switches at the device. In the form that opens, specify the values and click the **Сохранить** button:

   - **Название**: parameter name.
   - **Тип значения**: the type of data to be written to the parameter.
   - **Обязательный параметр**: whether the parameter is required.
   - **Значение по умолчанию**: the default metric for the parameter.

1. Click the **Сохранить** button below the page.

   The driver will be created and will appear in the **Драйверы**.

## Creating a device template

The device template allows you to describe typical devices for quick subsequent connection of new devices to the platform.

To create a template for your device:

1. Go to **Шаблоны устройств** IoT Platform [personal account](https://iot.mcs.mail.ru/).
1. Click the **Добавить шаблон** button.
1. Fill the fields:

   - **Название шаблона**: the template name.
   - **Идентификатор**: template id.

1. Click the **Следующий шаг** button.
1. Select the previously created driver option in the **Драйвер** field.
1. Click the **Следующий шаг** button.
1. Add device parameters if necessary and click the **Следующий шаг** button.
1. Specify the template structure: if necessary, specify the node, sensor or unit.

   <warn>

   The final element of the structure should be a sensor.

   </warn>

1. Click the **Сохранить** button below the list.

   The template will be created and will appear in the section **Шаблоны устройств**.

## Creating a device instance

1. Go to **Устройства** IoT Platform [personal account](https://iot.mcs.mail.ru/).
1. Click the **Добавить устройство** button.
1. Fill the fields:

   - **Название**: a device name.
   - **Идентификатор**: a device id.
   - **Шаблон устройства**: used device template.
   - **Агент**: device agent.

1. Click the **Следующий шаг** button.
1. Fill the field:

   - **Название тега**: a device tag name.
   - **Идентификатор тега**: a device tag id.
   - **Родительский узел**: the name of the parent node according to the selected device template.

1. Click the **Следующий шаг** button.
1. Repeat the previous step.
1. Click the **Сохранить** button.

   The device will be created and will appear in the **Устройства**.

After creating a virtual copy of the device, set the settings for connecting the device to the platform — [create and configure](../../agents/create-agent/) the agent.
