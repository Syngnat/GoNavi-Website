#!/usr/bin/env bash
# GoNavi 自建统计汇总脚本
# 用法: analytics-report.sh [天数]
# 按 uid 去重 = 独立访客(UV)，按行数 = 页面浏览(PV)
set -euo pipefail

LOG=/var/log/nginx/gonavi-stats.log
days="${1:-}"
if [ ! -f "$LOG" ]; then
  echo "统计日志不存在: $LOG"
  exit 1
fi

filter=""
if [ -n "$days" ]; then
  since=$(date -d "-${days} days" '+%Y-%m-%dT%H:%M:%S')
  filter="awk -F'\t' -v s=\"\$since\" '\$1 >= s'"
fi

echo "=========================================="
echo " GoNavi 网站统计 ($(date '+%Y-%m-%d %H:%M'))"
echo "=========================================="

# 汇总统计（可用天数过滤）
if [ -n "$filter" ]; then
  tmp=$(mktemp)
  eval "grep -v '^$' $LOG | $filter" > "$tmp"
else
  tmp="$LOG"
fi

total=$(wc -l < <(grep -v '^$' "$tmp") 2>/dev/null || echo 0)
uv=$(awk -F'\t' 'NF>=2 && $2!="" {print $2}' "$tmp" 2>/dev/null | sort -u | wc -l)
echo ""
echo "总页面浏览(PV): $total"
echo "独立访客(UV)  : $uv"
echo "="

# 每日分布
echo ""
echo "每日 PV / UV:"
awk -F'\t' 'NF>=2 && $2!="" {d=substr($1,1,10); pv[d]++; uv[d"\t"$2]=1} END{for(d in pv) {n=0; for(k in uv) split(k,a,"\t")} }' "$tmp" 2>/dev/null
awk -F'\t' 'NF>=2 && $2!="" {d=substr($1,1,10); pv[d]++; uv[d"\t"$2]=1}
  END{for(d in pv) printf "%s\tPV=%d\n", d, pv[d]}' "$tmp" 2>/dev/null | sort

# 页面 TOP
echo ""
echo "页面浏览 TOP:"
awk -F'\t' 'NF>=3 && $3!="" {cnt[$3]++} END{for(p in cnt) print cnt[p], p}' "$tmp" 2>/dev/null | sort -rn | head -20

if [ -n "$days" ]; then rm -f "$tmp"; fi