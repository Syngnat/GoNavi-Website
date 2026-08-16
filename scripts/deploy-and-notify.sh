#!/usr/bin/env bash
# Deploy the GoNavi website and notify Syngnat on Telegram with the outcome.
# Used by the GitHub release webhook (github-webhook-receiver.py).
set -u

TAG="${1:-?}"
DEPLOY="/opt/gonavi-website/scripts/deploy-static.sh"
SEND=(/usr/local/lib/hermes-agent/venv/bin/hermes send --to telegram --quiet)

run_log="$(mktemp /tmp/gonavi-deploy-XXXXXX.log)"
if bash "$DEPLOY" >"$run_log" 2>&1; then
  "${SEND[@]}" "✅ GoNavi ${TAG} 官网部署完成，下载页已更新。"
else
  rc=$?
  tail_lines="$(tail -c 900 "$run_log")"
  "${SEND[@]}" "⚠️ GoNavi ${TAG} 官网部署失败（exit ${rc}）
${tail_lines}"
fi
rm -f "$run_log"
exit 0
