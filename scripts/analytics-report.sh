#!/usr/bin/env bash
# GoNavi 自建统计汇总脚本
# 用法: analytics-report.sh [天数]
# 兼容日志格式：旧4列(time|uid|p|ua)、7列(time|uid|act|p|file|plat|ua)、8列(+ref)、9列(+kw)
# PV=页面浏览, UV=独立访客(按uid), 下载=act=download, 来源=ref, 搜索关键字=kw, 转化率=下载/下载页浏览
set -euo pipefail

LOG=/var/log/nginx/gonavi-stats.log
days="${1:-}"
if [ ! -f "$LOG" ]; then
  echo "统计日志不存在: $LOG"
  exit 1
fi

if [ -n "$days" ] && ! [[ "$days" =~ ^[0-9]+$ ]]; then
  echo "天数必须是非负整数" >&2
  exit 2
fi

echo "=========================================="
echo " GoNavi 网站统计 ($(TZ=Asia/Shanghai date '+%Y-%m-%d %H:%M'))"
echo "=========================================="

python3 - "$LOG" "$days" <<'PY'
import sys, collections, urllib.parse
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo

log, days_arg = sys.argv[1], sys.argv[2]
CN_TZ = ZoneInfo("Asia/Shanghai")
now = datetime.now(CN_TZ)
cutoff = now - timedelta(days=int(days_arg)) if days_arg else None

def _cn_time(ts: str):
    try:
        parsed = datetime.fromisoformat(ts)
        if parsed.tzinfo is None:
            return parsed.replace(tzinfo=CN_TZ)
        return parsed.astimezone(CN_TZ)
    except ValueError:
        return None


def _eng(ref: str) -> str:
    """识别搜索引擎名：按主机名关键词匹配，失败取主域。"""
    r = (ref or "").lower()
    for k in ("google", "bing", "baidu", "sogou", "yandex", "360", "so.com"):
        if k in r:
            return {"google":"google","bing":"bing","baidu":"baidu","sogou":"sogou","yandex":"yandex","360":"360","so.com":"360"}[k]
    return (ref or "?").split(".")[0] if ref else "?"

def dec(x):
    try: return urllib.parse.unquote(x)
    except: return x

rows = []
def _read_lines(path):
    try:
        with open(path, encoding='utf-8', errors='replace') as f:
            return f.readlines()
    except Exception:
        return []
for ln in _read_lines(log) + _read_lines(log + '.1'):  # 兼容 logrotate 轮转文件
    ln = ln.rstrip('\n')
    if not ln: continue
    parts = ln.split('\t')
    # 兼容: 4列(time|uid|p|ua) 7列(+act/file/plat) 8列(+ref) 9列(+kw)
    if len(parts) < 3: continue
    ts, uid = parts[0], parts[1]
    cn_time = _cn_time(ts)
    if cutoff and (cn_time is None or cn_time < cutoff):
        continue
    day = cn_time.date().isoformat() if cn_time else ts[:10]
    if len(parts) >= 8:
        # 新8/9列: time|uid|act|p|file|plat|ref|[kw]|ua （act 可能为空）
        act = 'download' if parts[2] == 'download' else ''
        p   = parts[3]
        file= parts[4]
        plat= parts[5]
        ref = dec(parts[6])
        kw  = dec(parts[7]) if len(parts) >= 9 else ''
    else:
        # 旧4列: time|uid|p|ua
        act, p = '', parts[2]
        file = plat = ref = kw = ''
    rows.append(dict(ts=ts, day=day, uid=uid, act=act, p=p, file=file, plat=plat, ref=ref, kw=kw))

total = len(rows)
uv = len(set(r['uid'] for r in rows if r['uid']))
dl = sum(1 for r in rows if r['act'] == 'download')
# 下载页浏览（/download 相关页面）
dl_page = sum(1 for r in rows if r['act'] != 'download' and '/download' in r['p'])
dl_uid = len({r['uid'] for r in rows if r['act'] == 'download'})
dl_page_uid = len({r['uid'] for r in rows if r['act'] != 'download' and '/download' in r['p']})

print(f"\n总页面浏览(PV): {total}")
print(f"独立访客(UV)  : {uv}")
print(f"下载触发量     : {dl} 次（{dl_uid} 人下载）")
if dl_page_uid:
    print(f"下载转化率     : {dl_uid}/{dl_page_uid} = {dl_uid*100/dl_page_uid:.1f}%（按人数口径）")
print("=")

# 每日
print("\n每日 PV / UV / 下载:")
daily_pv, daily_uv, daily_dl = collections.Counter(), {}, collections.Counter()
for r in rows:
    d = r['day']
    daily_pv[d] += 1
    daily_uv.setdefault(d, set()).add(r['uid'])
    if r['act'] == 'download': daily_dl[d] += 1
for d in sorted(set(daily_pv) | set(daily_uv) | set(daily_dl)):
    print(f"  {d}  PV={daily_pv[d]}  UV={len(daily_uv.get(d,set()))}  下载={daily_dl[d]}")

# 访问来源
print("\n访问来源 TOP:")
refs = collections.Counter(r['ref'] or '(直接访问)' for r in rows)
for ref, c in refs.most_common(12):
    print(f"  {c:4d}  {ref}")

# 搜索关键字（仅搜索引擎来源带 kw）
print("\n搜索关键字 TOP:")
kws = collections.Counter(
    (_eng(r['ref']), r['kw'])
    for r in rows if r['kw']
)
if kws:
    for (eng, kw), c in kws.most_common(15):
        print(f"  {c:4d}  {eng} · {kw}")
else:
    print("  （暂无，等待搜索引擎流量）")

# 页面 TOP
print("\n页面浏览 TOP:")
cnt = collections.Counter(r['p'] for r in rows if r['p'])
for p, c in cnt.most_common(20):
    print(f"  {c:4d}  {p}")

# 下载文件 TOP
print("\n下载文件 TOP (按平台):")
dlc = collections.Counter((r['file'], r['plat']) for r in rows if r['act']=='download')
for (f, plat), c in dlc.most_common(15):
    print(f"  {c:4d}  {f}  [{plat}]")
PY