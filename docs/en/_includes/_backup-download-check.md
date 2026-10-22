{includetag(check)}

1. Make sure that the folder of each copy contains all five files (`content`, `object_segments`, `volume_segments`, `sha_list`, and `volume_metadata`). To do this, run the command:

   ```console
   ls -l ./<COPY_FOLDER>/
   ```

   Here `<COPY_FOLDER>` is the folder that contains the backup copy files.

1. If the `content` file was downloaded in parts (`content1`, `content2`, and so on), join them via natural sorting:

   ```console
   cat $(ls ./<COPY_FOLDER>/content[0-9]* | sort -V) > ./<COPY_FOLDER>/content
   ```

   Here `<COPY_FOLDER>` is the folder that contains the backup copy files.

   {note:warn}
   Do not use the regular `sort` command without the `-V` option. It shuffles the parts of the file and corrupts the disk data.
   {/note}

1. Make sure that the `content` file was downloaded completely. To do this, take the last element in the `object_segments` file. Compare the sum of `object_offset` and `object_length` with the size of the `content` file:

   ```console
   python3 -I - <<'EOF'
   import json, os
   d = "./<COPY_FOLDER>"
   seg = json.load(open(os.path.join(d, "object_segments")))
   last = seg[-1]
   print("by map:", last["object_offset"] + last["object_length"],
         "file:", os.path.getsize(os.path.join(d, "content")))
   EOF
   ```

   Here `<COPY_FOLDER>` is the folder that contains the backup copy files.

   If the numbers do not match, the file was not downloaded completely. Download the copy again.

{/includetag}
