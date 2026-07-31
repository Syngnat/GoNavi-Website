#!/usr/bin/env sh
set -eu

# Atomically point the Nginx document root back at a known release.
if [ "$#" -ne 1 ]; then
  printf 'Usage: %s <release-id>\n' "$0" >&2
  exit 64
fi

release_root=${GONAVI_RELEASE_ROOT:-/srv/gonavi-website}
release_id=$1
case "$release_id" in
  ''|.|..|*/*)
    printf '%s\n' "Invalid release id: $release_id" >&2
    exit 64
    ;;
esac
release_dir="$release_root/releases/$release_id"
current_link="$release_root/current"
next_link="$release_root/.next-rollback-$$"

test -f "$release_dir/index.html"
test -f "$release_dir/zh/index.html"

exec 9>"$release_root/.deploy.lock"
if ! flock -n 9; then
  printf '%s\n' 'A GoNavi deployment is already in progress.' >&2
  exit 1
fi

ln -s "$release_dir" "$next_link"
mv -Tf "$next_link" "$current_link"
printf 'Rolled back GoNavi to: %s\n' "$release_id"
