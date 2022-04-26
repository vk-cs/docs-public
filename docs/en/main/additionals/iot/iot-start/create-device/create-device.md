## Create a driver

A driver is a description of how the agent communicates with the end device.

To create a driver:

1. Go to the Drivers page.
2. Click the Add Driver button. A form will open to fill out.
3. Specify the following values:
   - Name: Emulator driver;
   - Identifier: emulatorDriver;
   - Protocol: embedded.
4. Click Next Step. The form for adding driver parameters will open.
5. Click the Add Parameter button in the Event Parameters section. This parameter will control how often the agent polls the device for sensors.
6. Specify in the form fields:
   - Name: event_scrape_interval;
   - Value type: duration;
   - Mandatory parameter: Yes;
   - Default value: 30s.
7. Click Save.
8. Click the Add Parameter button in the Status Parameters section. This setting will control how often the agent polls the switches for the device.
9. Specify the following values ​​in the form fields:
   - Name: state_scrape_interval;
   - Value type: duration;
   - Mandatory parameter: Yes;
   - Default value: 30s.
10. Click the "Save" button.
11. Click "Save" to save the driver emulator.

## Create a device template

The device template allows you to describe typical devices for quick subsequent connection of new devices to the platform.

To create a template for your device:

1. Go to the Device Templates page and click Add Template.
2. Specify the following values ​​in the form fields:
   - Template name: Emulator template;
   - Identifier: emulatorTemplate.
3. Click Next Step.
4. Select in the "Driver" field: Emulator driver.
5. Click Next Step.
6. Skip adding device options and click Next Step.
   Go to the device tree creation tab. At this stage, it is necessary to describe the useful content of your device, which includes a set of sensors (events) and switches (states).
   You need to set the following content: - temperature sensor; - humidity sensor; - indoor lighting switch.
7. Click Add Sensor on the template root menu to add a temperature sensor to the device.
8. Fill out the form as follows:
   - Name: Temperature;
   - Identifier: temperature;
   - Sensor type: event;
   - Unit. measurements: C;
   - Value type: float;
   - Autosave to operational storage: yes;
   - Autosave to long-term storage: yes;
   - Parent tag: Template root node;
   - Stream processing rules: empty;
   - Driver parameters: empty;
   - Attributes: empty.
9. Click Save.
10. Click Add Sensor on the template root node menu to add a humidity sensor.
11. Fill out the form as follows:
    - Name: Humidity;
    - Identifier: humidity;
    - Sensor type: event;
    - Unit. measurements: %;
    - Value type: float;
    - Autosave to operational storage: yes;
    - Autosave to long-term storage: yes;
    - Parent tag: Template root node;
    - Stream processing rules: empty;
    - Driver parameters: empty;
    - Attributes: empty.
12. Click Save.
13. Click "Add Sensor" on the template's root node menu to add a light switch.
14. Fill out the form:
    - Name: Light;
    - Identifier: light;
    - Sensor type: states;
    - Unit. dimensions: empty;
    - Value type: boolean;
    - Changeable state: no;
    - Autosave to digital twin: yes;
    - Parent tag: Template root node;
    - Stream processing rules: empty;
    - Driver parameters: empty;
    - Attributes: empty.
15. Click Save.
16. Click the Save button to create the template.

## Device creation

To instantiate your device, follow these steps:

1. Go to the Devices page and click Add Device.
2. Fill out the form:
   - Name: Emulator;
   - Identifier: emulator;
   - Device template: Emulator template;
   - Agent: No agent.
3. Click Next Step
4. Fill out the form:
   - Tag name: Emulator;
   - Tag ID: emulator;
   - Parent Node: The root of the project.
5. Click Next Step.
6. Repeat the previous step.
7. Click the Save button to create the device.

After creating a virtual copy of the device, you must specify the settings for connecting the device to the platform. Connecting the device to the platform is provided by specialized software - an agent. Read about how to create an agent [here](https://mcs.mail.ru/docs/ru/additionals/IoT/IoT-start/connect-device).

Despite the fact that the agent functionality emulator is built into the device firmware, the agent still needs to be configured for your device in the platform's administrative console.
