The method of connecting the File Storage to the instance depends on the operating system and the storage access protocol selected when creating it.:

- NFS is a "Network File System" that allows transparent file sharing between servers. It is a client-server application that allows you to view files on a virtual server and update them as if they were locally. Using NFS, you can mount all or part of the file system.
- CIFS is the "Internet Shared File System" used by operating systems for file sharing. CIFS uses a client-server programming model. The client program requests the server program to access the file or send a message to the program running on the server. The server performs the requested action and returns a response. CIFS is a public or open version of the Server Message Block Protocol (SMB), and it uses the TCP/IP protocol.NFS and CIFS are the main file systems used in NAS.

## Windows

### NFS

The connection of the NFS storage in Windows is made using the client, which is installed additionally.

The NFS client can be installed via the GUI or using Powershell. To install in graphical mode, open the Server Manager console and select the component (Features) called Client for NFS.

By default, the NFS Graphical Management Console is not installed with this component. To fix this, you need to install the Services for Network File System Management Tools option in the Remote Server Administration Tools -> Role Administration Tools -> File Services Tools section.

All the system components listed above can be installed with just one Powershell command:

```bash
Install-WindowsFeature NFS-Client, RSAT-NFS-Admin
```

After the installation is complete, launch the Services for Network File System Managemen console and open the NFS Client properties window (Client for NFS).

In the NFS client settings, you can set:

- The transport protocol used (Transport protocols) is TCP+UDP by default.
- Type of NFS storage mount: Hard or Soft.
- The File Permissions tab specifies the default permissions for the folders and files being created on the NFS resource.
- The Security tab specifies authentication protocols that can be used to authenticate to the NFS server.

After configuration and under the administrator account, you can mount the NFS directory using the command described in the properties of the created NFS File Storage:

### CIFS

Since the CIFS protocol is already present in Windows by default, the connection can be performed without installing additional components.

To connect, execute the command specified in the properties of the created CIFS File Storage.

## Linux

### NFS

Before starting to mount an NFS resource, make sure that the nfs-common package is installed

```bash
sudo apt-get install nfs-common
```

After checking or installing the package, it is enough to use the command specified in the properties of the created NFS storage.

### CIFS

To mount the CIFS file storage, you need to install a set of utilities:

Ubuntu:

```bash
sudo apt-get install cifs-utils
```

CentOS:

```bash
yum install cifs-utils
```

After installing the packages, you need to create a folder to mount the storage:

```bash
mkdir <your_File_storage>
```

Then use the mount command available in the properties of the created CIFS storage.
