The article will tell you how to install monitoring in an existing Linux virtual machine.

1. Go to the VK Cloud panel.
2. Find the target virtual machine in the list.
3. Click on it.
4. Go to the tab Information -> Monitoring settings.
5. Copy the command that appears on the tab.
6. Connect to the virtual machine via ssh.
7. Run the command copied in step 5.
8. The agent is installed and will be launched every time the virtual machine starts.
9. Metrics for this virtual machine can be found by the label \`host\`, whose value is = hostname of the VM.
