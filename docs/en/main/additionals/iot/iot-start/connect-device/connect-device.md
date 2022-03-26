## Create an agent template
Now, from the template, you need to create an agent instance to connect the device.

For this:
1. Go to the Agents page and click Add Agent.
2. Fill out the form as follows:
    - Name: Agent for the emulator;
    - Identifier: emulatorAgent;
    - Template: Agent template for the emulator.
3. Click Save to save the new agent.

After the agent for the device is created, it is necessary to indicate to the system that this agent has the right to operate on the previously created device.

To do this, follow these steps:
1. To do this, you must perform the following steps:
2. Go to the Devices page.
3. Click on the "Emulator" device in the device list.
4. Click on the "Edit" button.
5. Select "Agent for emulator" in the column "Agent"
6. Click on the "Next step" button.
7. Save your changes.

Now the agent is authorized to work with our device.

## Device connection
To connect a device to the platform:
1. [Download emulator](https://github.com/vk-cs/iot-emulators/releases) for your platform.
2. Copy the authorization data from the agent page. To do this, go to the "Agents" → "Authorization data" section.

<tabs>
<tablist>
<tab>For MacOS</tab>
<tab>For Linux</tab>
<tab>For Windows</tab>
</tablist>
<tabpanel>

3. Open a terminal for your operating system.
4. In the terminal, go to the directory where the archive with the emulator was unpacked.
5. Launch the emulator in the console with authorization data:
./bin/darwin_amd64/starting_guide -login {login} -password {password}.

</tabpanel>
<tabpanel>

3. Open the terminal of your operating system.
4. In the terminal, go to the directory where the archive with the emulator was unpacked.
5. Launch the emulator in the console with authorization data:
./bin/linux_amd64/starting_guide -login {login} -password {password}.

</tabpanel>
<tabpanel>

3. Open a command prompt (cmd.exe).
4. In the command line, go to the directory where the archive with the emulator was unpacked.
5. In the command line, start the emulator with authorization data:
bin\windows_amd64\starting_guide.exe -login {login} -password {password}.

</tabpanel>
</tabs>