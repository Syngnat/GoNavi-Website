/**
 * 简易访客统计（自建，替代已停服的 countapi.xyz）
 *
 * 原理：
 *  - 每个访客首次访问时生成一个持久化的匿名 UID（localStorage），换 IP 也能识别同一访客。
 *  - 每次页面加载向 /__stats 发送一次带 {uid, path} 的信标请求。
 *  - nginx 用独立日志格式把 uid + path 记入 gonavi-stats.log；之后按 uid 去重 = 独立访客(UV)，
 *    按行数 = 页面浏览(PV)。
 *
 * 查看统计：
 *  - 原始日志：/var/log/nginx/gonavi-stats.log
 *  - 汇总脚本：/opt/gonavi-website/scripts/analytics-report.sh
 */

/** 版本号：改一次会重置旧访客的 UID（用于区分部署前后） */
const STATS_VERSION = 'v1';

export const ANALYTICS_NAMESPACE = 'GoNavi';

/** 是否启用统计（默认开启，设为 false 可关闭） */
export const isAnalyticsEnabled = true;

/** 生成/读取当前访客的持久 UID */
function visitorId(): string | null {
  try {
    const key = `gonavi_uid_${STATS_VERSION}`;
    let id = localStorage.getItem(key);
    if (!id) {
      id = 'u_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
      localStorage.setItem(key, id);
    }
    return id;
  } catch {
    return null; // localStorage 不可用（隐私模式等）——降级为不记录
  }
}

/** 上报一次页面访问（fire-and-forget，失败静默） */
export function trackPageView(path: string): void {
  const uid = visitorId();
  if (!uid) return;
  // 手动拼接，避免 URLSearchParams 把路径里的 / 编码成 %2F
  const q = `uid=${encodeURIComponent(uid)}&p=${path}`;
  // sendBeacon 在页面卸载时也能可靠送达，且不阻塞
  const ok = navigator.sendBeacon(`/__stats?${q}`);
  if (!ok) {
    fetch(`/__stats?${q}`, { method: 'GET', keepalive: true }).catch(() => {});
  }
}