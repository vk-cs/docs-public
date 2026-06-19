#!/bin/bash
set -euo pipefail

# Цвета
BLUE='\033[0;34m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

ROOT="${1:-.}"

IGNORE_EXT_RE='\.(png|jpg|jpeg|gif|svg|webp|pdf|zip|tar|gz|tgz|7z|mp4|mov|avi|mkv|mp3|wav|json|yaml|yml|toml|xml|md)$'

SELF_MARK="__SELF__"
EMPTY_ANCHOR_MARK="__EMPTY_ANCHOR__"

extract_ids() {
  local file="$1"
  grep -oE 'id[[:space:]]*=[[:space:]]*("([^"]+)"|'\''([^'\'']+)'\''|[A-Za-z0-9_.:-]+)' "$file" 2>/dev/null \
    | sed -E 's/^id[[:space:]]*=[[:space:]]*//; s/^"//; s/"$//; s/^'\''//; s/'\''$//'
}

resolve_target() {
  local src_file="$1"
  local rel_path="$2"

  local src_dir abs dir base target
  src_dir="$(cd "$(dirname "$src_file")" && pwd -P)"

  abs="$(cd "$src_dir" && cd "$(dirname "$rel_path")" 2>/dev/null && pwd -P)/$(basename "$rel_path")"

  if [[ -d "$abs" ]]; then
    dir="$abs"
    base="$(basename "$dir")"
    target="$dir/$base.md"
    printf '%s\n' "$target"
    return 0
  fi

  printf '%s\n' "$abs"
}

# Вывод: src<TAB>lineNo<TAB>rawToken<TAB>pathOrMark<TAB>anchorOrMark
extract_links_from_file() {
  local file="$1"

  awk -v src="$file" -v SELF="__SELF__" -v EMPTY="__EMPTY_ANCHOR__" '
    {
      line=$0
      n=NR
      while (match(line, /\([^()]*\)/)) {
        token = substr(line, RSTART+1, RLENGTH-2)
        line  = substr(line, RSTART+RLENGTH)

        # интересуют только #, ./, ../
        if (token !~ /^(#|\.\/|\.\.\/)/) {
          continue
        }

        # 1) локальная: #anchor
        if (token ~ /^#[^#[:space:]][^[:space:]]*$/) {
          anchor = substr(token, 2)
          if (anchor != "") {
            printf "%s\t%d\t%s\t%s\t%s\n", src, n, token, SELF, anchor
          }
          continue
        }

        # 2) внешняя с якорем: ./...#anchor или ../...#anchor
        if (token ~ /^(\.\/|\.\.\/)[^#[:space:]]+#[^#[:space:]][^[:space:]]*$/) {
          split(token, parts, "#")
          path = parts[1]
          anchor = parts[2]
          if (path != "" && anchor != "") {
            printf "%s\t%d\t%s\t%s\t%s\n", src, n, token, path, anchor
          }
          continue
        }

        # 3) внешняя без якоря: ./... или ../...
        # (без пробелов; без #)
        if (token ~ /^(\.\/|\.\.\/)[^#[:space:]]+$/) {
          path = token
          printf "%s\t%d\t%s\t%s\t%s\n", src, n, token, path, EMPTY
          continue
        }
      }
    }
  ' "$file"
}

missing_target=0
missing_anchor=0
empty_anchor=0

while IFS= read -r -d '' md; do
  while IFS=$'\t' read -r src lineNo rawToken path anchor; do

    # Локальная ссылка (#anchor)
    if [[ "$path" == "$SELF_MARK" ]]; then
      if ! extract_ids "$src" | grep -Fxq -- "$anchor"; then
        printf "${RED}[MISSING_ANCHOR]${NC}\t%s:%s\t-> (#%s)\traw:(%s)\n" "$src" "$lineNo" "$anchor" "$rawToken"
        missing_anchor=$((missing_anchor+1))
      fi
      continue
    fi

    # Игнорируем, если в пути есть расширение
    if [[ "$path" =~ $IGNORE_EXT_RE ]]; then
      continue
    fi

    # Внешняя ссылка без якоря: проверяем только существование target,
    # но в любом случае показываем EMPTY_ANCHOR (если target существует).
    if [[ "$anchor" == "$EMPTY_ANCHOR_MARK" ]]; then
      target="$(resolve_target "$src" "$path")"

      if [[ ! -f "$target" ]]; then
        printf "${RED}[MISSING_TARGET]${NC}\t%s:%s\t-> (%s)\traw:(%s)\tresolved:%s\n" \
          "$src" "$lineNo" "$path" "$rawToken" "$target"
        missing_target=$((missing_target+1))
        continue
      fi

     # printf 'EMPTY_ANCHOR\t%s:%s\t-> (%s)\traw:(%s)\ttarget:%s\n' \
     #   "$src" "$lineNo" "$path" "$rawToken" "$target"
      empty_anchor=$((empty_anchor+1))
      continue
    fi

    # Внешняя ссылка с якорем
    target="$(resolve_target "$src" "$path")"

    if [[ ! -f "$target" ]]; then
      printf "${RED}[MISSING_TARGET]${NC}\t%s:%s\t-> (%s#%s)\traw:(%s)\tresolved:%s\n" \
        "$src" "$lineNo" "$path" "$anchor" "$rawToken" "$target"
      missing_target=$((missing_target+1))
      continue
    fi

    if ! extract_ids "$target" | grep -Fxq -- "$anchor"; then
      printf "${RED}[MISSING_ANCHOR]${NC}\t%s:%s\t-> (%s#%s)\traw:(%s)\ttarget:%s\n" \
        "$src" "$lineNo" "$path" "$anchor" "$rawToken" "$target"
      missing_anchor=$((missing_anchor+1))
    fi

  done < <(extract_links_from_file "$md")
done < <(find "$ROOT" -type f -name '*.md' -print0)

printf '\nDone. missing_target=%d missing_anchor=%d empty_anchor=%d\n' \
  "$missing_target" "$missing_anchor" "$empty_anchor"

# Падаем, если есть битые ссылки или отсутствующие якоря.
# EMPTY_ANCHOR не считаем ошибкой (по вашему описанию "валидны").
(( missing_target == 0 && missing_anchor == 0 ))