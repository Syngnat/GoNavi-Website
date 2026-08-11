#!/usr/bin/env bash
# GoNavi 自建统计汇总脚本
# 用法: analytics-report.sh [天数]
# 兼容新旧日志格式（旧4列: time|uid|p|ua；新7列: time|uid|act|p|file|plat|ua）
# 按 uid 去重 = 独立访客(UV)，按行数 = 页面浏览(PV)，act=download 行数 = 下载触发量
set -euo pipefail

LOG=/var/log/nginx/gonavi-stats.log
days="${1:-}"
if [ ! -f "$LOG" ]; then
  echo "统计日志不存在: $LOG"
  exit 1
fi

# 过滤天数（可选）
tmp="$LOG"
if [ -n "$days" ]; then
  since=$(date -d "-${days} days" '+%Y-%m-%dT%H:%M:%S')
  tmp=$(mktemp)
  awk -F'\t' -v s="$since" '$1 >= s' "$LOG" > "$tmp"
fi

cleanup() { [ -n "$days" ] && rm -f "$tmp"; }
trap cleanup EXIT

echo "=========================================="
echo " GoNavi 网站统计 ($(date '+%Y-%m-%d %H:%M'))"
echo "=========================================="

# 解析日志：兼容 4 列(旧) 和 7 列(新)
# 输出: 时间 uid act p file plat
python3 - "$tmp" <<'PY' | tail -n +1
import sys, collections
from datetime import datetime

log = sys.argv[1]
rows = []
for ln in open(log, encoding='utf-8', errors='replace'):
    ln = ln.rstrip('\n')
    if not ln: continue
    parts = ln.split('\t')
    if len(parts) >= 4:
        ts, uid, p = parts[0], parts[1], parts[2]
        act = parts[2] if len(parts) >= 4 and parts[2] in ('download',) else ''
        # 新格式: parts[2]=act, parts[3]=p ; 旧格式: parts[2]=p
        if parts[2] == 'download':
            act, p = 'download', parts[3]
            file = parts[4] if len(parts) > 4 else ''
            plat = parts[5] if len(parts) > 5 else ''
        else:
            act, file, plat = '', parts[2], ''
        rows.append((ts, uid, act, p, file, plat))

total = len(rows)
uv = len(set(r[1] for r in rows if r[1]))
dl = len([r for r in rows if r[2] == 'download'])

print(f"\n总页面浏览(PV): {total}")
print(f"独立访客(UV)  : {uv}")
print(f"下载触发量     : {dl}")
print("=")

# 每日
print("\n每日 PV / UV / 下载:")
daily_pv = collections.Counter(r[0][:10] for r in rows)
daily_uv = {}
daily_dl = collections.Counter()
for r in rows:
    d = r[0][:10]
    daily_uv.setdefault(d, set()).add(r[1])
    if r[2] == 'download':
        daily_dl[d] += 1
for d in sorted(set(daily_pv) | set(daily_uv) | set(daily_dl)):
    print(f"  {d}  PV={daily_pv[d]}  UV={len(daily_uv.get(d,set()))}  下载={daily_dl[d]}")

# 页面 TOP
print("\n页面浏览 TOP:")
cnt = collections.Counter(r[3] for r in rows if r[3])
for p, c in cnt.most_common(20):
    print(f"  {c:4d}  {p}")

# 下载明细 TOP
print("\n下载文件 TOP:")
dlc = collections.Counter(r[4] for r in rows if r[2]=='download' and r[4])
for f, c in dlc.most_common(15):
    print(f"  {c:4d}  {f}")
PY