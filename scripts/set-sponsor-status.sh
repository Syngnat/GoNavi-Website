#!/usr/bin/env sh
set -eu

if [ "$#" -ne 2 ]; then
  printf '%s\n' "Usage: $0 <sponsor-id> <on|off>" >&2
  exit 64
fi

sponsor_id=$1
status=$2
config_path=${GONAVI_SPONSOR_CONFIG_PATH:-/srv/gonavi-website/runtime/sponsor-config.json}

case "$status" in
  on) enabled=true ;;
  off) enabled=false ;;
  *)
    printf '%s\n' 'Status must be on or off.' >&2
    exit 64
    ;;
esac

test -f "$config_path"
tmp_path=$(mktemp "${config_path}.tmp.XXXXXX")
trap 'rm -f "$tmp_path"' EXIT HUP INT TERM

python3 - "$config_path" "$tmp_path" "$sponsor_id" "$enabled" <<'PY'
import json
import os
import sys

config_path, tmp_path, sponsor_id, enabled = sys.argv[1:]
with open(config_path, encoding="utf-8") as config_file:
    config = json.load(config_file)

sponsors = config.get("sponsors", {})
if sponsor_id not in sponsors:
    raise SystemExit(f"Unknown sponsor: {sponsor_id}")

sponsors[sponsor_id]["enabled"] = enabled == "true"
config["sponsors"] = sponsors
with open(tmp_path, "w", encoding="utf-8") as output_file:
    json.dump(config, output_file, ensure_ascii=False, indent=2)
    output_file.write("\n")
os.chmod(tmp_path, 0o644)
os.replace(tmp_path, config_path)
PY

printf 'Sponsor %s is now %s. Refresh the website to load the change.\n' "$sponsor_id" "$status"
