#!/usr/bin/env sh
set -eu

# Build the current checkout in Docker and atomically publish it for the host
# Nginx.  Set GONAVI_RELEASE_ROOT to override the server-side release path.
repo_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
release_root=${GONAVI_RELEASE_ROOT:-/srv/gonavi-website}
releases_dir="$release_root/releases"
current_link="$release_root/current"

source_revision=$(git -C "$repo_dir" rev-parse --short=12 HEAD)
if [ -n "$(git -C "$repo_dir" status --porcelain)" ]; then
  source_revision="${source_revision}-dirty"
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
