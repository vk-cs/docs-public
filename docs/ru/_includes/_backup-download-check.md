{includetag(check)}

1. Убедитесь, что в папке каждой копии находятся все пять файлов (`content`, `object_segments`, `volume_segments`, `sha_list` и `volume_metadata`), выполнив команду:

   ```console
   ls -l ./<ПАПКА_КОПИИ>/
   ```

   Здесь `<ПАПКА_КОПИИ>` — папка, в которой находятся файлы копии.

1. Если файл `content` скачан частями (`content1`, `content2` и так далее), склейте их с натуральной сортировкой:

   ```console
   cat $(ls ./<ПАПКА_КОПИИ>/content[0-9]* | sort -V) > ./<ПАПКА_КОПИИ>/content
   ```

   Здесь `<ПАПКА_КОПИИ>` — папка, в которой находятся файлы копии.

   {note:warn}
   Не используйте обычную сортировку `sort` без параметра `-V`: она перемешает части файла и повредит данные диска.
   {/note}

1. Убедитесь, что файл `content` скачан полностью. Для этого в файле `object_segments` возьмите последний элемент и сравните сумму `object_offset` и `object_length` с размером файла `content`:

   ```console
   python3 -I - <<'EOF'
   import json, os
   d = "./<ПАПКА_КОПИИ>"
   seg = json.load(open(os.path.join(d, "object_segments")))
   last = seg[-1]
   print("по карте:", last["object_offset"] + last["object_length"],
         "файл:", os.path.getsize(os.path.join(d, "content")))
   EOF
   ```

   Здесь `<ПАПКА_КОПИИ>` — папка, в которой находятся файлы копии.

   Если числа не совпадают, файл скачан не полностью — скачайте копию заново.

{/includetag}
