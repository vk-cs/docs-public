# {heading(Cannot continue with installation error)[id=iaas-error-cannot-continue-with-installation]}

{include(/en/_includes/_translated_by_ai_en.md)}

When attempting to create a VM, the message `Cannot continue with installation, no valid storage devices detected` appears.

This error occurs because the installation image lacks drivers for the VirtIO disk controller.

### {heading(Solution)[id=iaas-error-cannot-continue-with-installation-decision]}

Add the VirtIO drivers to the installation image.