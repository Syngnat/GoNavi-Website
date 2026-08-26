#!/usr/bin/env python3
"""GoNavi 官网每周统计播报：汇总近 7 天（含今天）的页面、下载与赞助商数据。

周日 09:30 运行。无数据时静默。兼容旧日志和当前 8 列日志格式。
浏览器的 referrer policy 会移除跨站查询串，因此不统计搜索关键字。
"""

import os
import sys
import urllib.parse
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo

LOG = os.environ.get("GONAVI_STATS_LOG", "/var/log/nginx/gonavi-stats.log")
CN_TZ = ZoneInfo("Asia/Shanghai")
SPONSOR_NAMES = {
    "apismart": "APISmart",
    "hualong": "HuaLongAI",
}

if not os.path.exists(LOG) or os.path.getsize(LOG) == 0:
    sys.exit(0)

today = datetime.now(CN_TZ).date()
start = (today - timedelta(days=6)).isoformat()
end = today.isoformat()


def cn_day(line: str) -> str:
    timestamp = line.split("\t", 1)[0]
    try:
        parsed = datetime.fromisoformat(timestamp)
        if parsed.tzinfo is None:
            return parsed.date().isoformat()
        return parsed.astimezone(CN_TZ).date().isoformat()
    except ValueError:
        return timestamp[:10]


def decode(value: str) -> str:
    try:
        return urllib.parse.unquote(value)
    except Exception:
        return value


def sponsor_label(sponsor_id: str) -> str:
    return SPONSOR_NAMES.get(sponsor_id, sponsor_id or "未知赞助商")


lines = []
try:
    with open(LOG, encoding="utf-8", errors="replace") as log_file:
        lines = log_file.readlines()
    try:
        with open(f"{LOG}.1", encoding="utf-8", errors="replace") as rotated_log:
            lines = rotated_log.readlines() + lines
    except Exception:
        pass
except Exception:
    sys.exit(0)

window_lines = [line for line in lines if line.strip() and start <= cn_day(line) <= end]
if not window_lines:
    sys.exit(0)

rows = []
for line in window_lines:
    parts = line.rstrip("\n").split("\t")
    if len(parts) < 3 or not parts[1]:
        continue

    if len(parts) >= 8:
        rows.append(
            dict(
                day=cn_day(line),
                uid=parts[1],
                act=parts[2],
                p=decode(parts[3]),
                file=decode(parts[4]),
            )
        )
    else:
        rows.append(dict(day=cn_day(line), uid=parts[1], act="", p=decode(parts[2]), file=""))

page_rows = [row for row in rows if not row["act"]]
download_rows = [row for row in rows if row["act"] == "download"]
pv = len(page_rows)
uv = len({row["uid"] for row in page_rows})
download_count = len(download_rows)
download_uv = len({row["uid"] for row in download_rows})
download_page_uv = len({row["uid"] for row in page_rows if "/download" in row["p"]})
conversion = f"{download_uv * 100 / download_page_uv:.1f}%" if download_page_uv else "—"

pages = {}
daily = {}
download_files = {}
for row in page_rows:
    if row["p"]:
        pages[row["p"]] = pages.get(row["p"], 0) + 1
    daily[row["day"]] = daily.get(row["day"], 0) + 1

for row in download_rows:
    if row["file"]:
        download_files[row["file"]] = download_files.get(row["file"], 0) + 1

sponsor_stats = {}
for row in rows:
    if row["act"] not in {"sponsor_impression", "sponsor_click"} or not row["file"]:
        continue
    stats = sponsor_stats.setdefault(row["file"], {"impressions": [], "clicks": []})
    if row["act"] == "sponsor_impression":
        stats["impressions"].append(row)
    else:
        stats["clicks"].append(row)

top_pages = sorted(pages.items(), key=lambda item: -item[1])[:8]

output = [f"📊 GoNavi 官网周报（{start} ~ {end}）", ""]
output.append(f"👥 独立访客(UV)：**{uv}**")
output.append(f"👁  页面浏览(PV)：**{pv}**")
output.append(f"⬇️  下载触发：**{download_count}** 次（**{download_uv}** 人下载，转化率 {conversion}）")
output.append("")

if sponsor_stats:
    output.append("🤝 赞助商表现（按独立访客计算跳转率）：")
    for sponsor_id, stats in sorted(sponsor_stats.items()):
        impression_count = len(stats["impressions"])
        click_count = len(stats["clicks"])
        impression_uv = len({row["uid"] for row in stats["impressions"]})
        click_uv = len({row["uid"] for row in stats["clicks"]})
        click_rate = f"{click_uv * 100 / impression_uv:.1f}%" if impression_uv else "—"
        output.append(
            f"  {sponsor_label(sponsor_id)}：曝光 **{impression_count}** 次（**{impression_uv}** 人），"
            f"跳转 **{click_count}** 次（**{click_uv}** 人），跳转率 **{click_rate}**"
        )
    output.append("")

if daily:
    output.append("📈 近 7 天每日 PV：")
    for day in sorted(daily):
        output.append(f"  {day}  {daily[day]}")
    output.append("")

if top_pages:
    output.append("🔥 本周热门页面：")
    for path, count in top_pages:
        output.append(f"  {path} ×{count}")
    output.append("")

if download_files:
    output.append("📦 下载文件：")
    for filename, count in sorted(download_files.items(), key=lambda item: -item[1])[:5]:
        output.append(f"  {filename} ×{count}")

print("\n".join(output))
