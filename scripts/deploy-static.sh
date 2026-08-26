#!/usr/bin/env sh
set -eu

# Build the current checkout in Docker and atomically publish it for the host
# Nginx.  Set GONAVI_RELEASE_ROOT to override the server-side release path.
repo_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
release_root=${GONAVI_RELEASE_ROOT:-/srv/gonavi-website}
releases_dir="$release_root/releases"
current_link="$release_root/current"
sponsor_config_path=${GONAVI_SPONSOR_CONFIG_PATH:-$release_root/runtime/sponsor-config.json}

source_revision=$(git -C "$repo_dir" rev-parse --short=12 HEAD)
if [ -n "$(git -C "$repo_dir" status --porcelain)" ]; then
  source_revision="${source_revision}-dirty"
fi

# The sponsor controls live outside immutable releases, so changing an
# individual campaign never requires rebuilding or re-publishing the website.
install -d -m 755 "$(dirname "$sponsor_config_path")"
if [ ! -f "$sponsor_config_path" ]; then
  install -m 644 "$repo_dir/public/sponsor-config.json" "$sponsor_config_path"
fi
# Nginx worker processes must be able to read this file through the release
# symlink; an atomic update created by mktemp would otherwise be mode 0600.
chmod 644 "$sponsor_config_path"
install -m 755 "$repo_dir/scripts/set-sponsor-status.sh" "$release_root/set-sponsor-status.sh"

# Keep the Hermes daily website report in sync when this deployment runs on the
# production host. Other environments do not need Hermes and simply skip it.
hermes_report_script=${HERMES_DAILY_STATS_SCRIPT:-/root/.hermes/scripts/gonavi_daily_stats.py}
if [ -d "$(dirname "$hermes_report_script")" ]; then
  install -m 755 "$repo_dir/scripts/gonavi-daily-stats.py" "$hermes_report_script"
  install -m 755 "$repo_dir/scripts/gonavi-weekly-stats.py" "$(dirname "$hermes_report_script")/gonavi_weekly_stats.py"
fi

release_id="${source_revision}-$(date -u +%Y%m%dT%H%M%SZ)"
release_dir="$releases_dir/$release_id"
staging_dir="$release_root/.staging-$release_id"
next_link="$release_root/.next-$release_id"

install -d -m 755 "$releases_dir"
exec 9>"$release_root/.deploy.lock"
if ! flock -n 9; then
  printf '%s\n' 'A GoNavi deployment is already in progress.' >&2
  exit 1
fi

# Memory guard: docker builds on this VPS OOM if available RAM is too low.
# Count swap too (swap-backed builds are slow but safe). Skip only when
# there is genuinely no headroom at all.
mem_available_kb=$(awk '/MemAvailable/ {print $2}' /proc/meminfo)
swap_free_kb=$(awk '/SwapFree/ {print $2}' /proc/meminfo)
mem_available_mb=$(( (mem_available_kb + swap_free_kb) / 1024 ))
if [ "$mem_available_mb" -lt 400 ]; then
  printf 'Skip deploy: only %s MB memory headroom (RAM+swap < 400 MB).\n' "$mem_available_mb" >&2
  exit 3
fi

if [ -e "$release_dir" ] || [ -e "$staging_dir" ] || [ -e "$next_link" ]; then
  printf '%s\n' "Release path already exists: $release_id" >&2
  exit 1
fi

previous_release=''
if [ -L "$current_link" ]; then
  previous_release=$(basename "$(readlink -f "$current_link")")
fi

DOCKER_BUILDKIT=1 docker build \
  --build-arg CACHE_BUST="$(date -u +%Y%m%dT%H%M%SZ)" \
  --target output \
  --output "type=local,dest=$staging_dir" \
  "$repo_dir"

ln -sfn "$sponsor_config_path" "$staging_dir/sponsor-config.json"
test -f "$staging_dir/index.html"
test -f "$staging_dir/zh/index.html"
find "$staging_dir" -type d -exec chmod 755 {} +
find "$staging_dir" -type f -exec chmod 644 {} +

mv "$staging_dir" "$release_dir"
ln -s "$release_dir" "$next_link"
mv -Tf "$next_link" "$current_link"

printf 'Published GoNavi release: %s\n' "$release_id"
if [ -n "$previous_release" ]; then
  printf 'Rollback with: %s/scripts/rollback-static.sh %s\n' "$repo_dir" "$previous_release"
fi
