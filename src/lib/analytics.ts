/**
 * 自建匿名访问统计：Nginx 将 /__stats 写入独立日志，再由 Hermes 汇总。
 * 仅保存随机浏览器标识、页面路径、事件类别、赞助商标识和来源域名；不采集身份信息。
 * 每日播报会按赞助商展示曝光、点击和 UV 点击率统计。
 */

/** 是否启用统计（默认开启，设为 false 可关闭） */
export const isAnalyticsEnabled = true;

export const ANALYTICS_STORAGE_KEY = 'gonavi_uid_v1';
export const ANALYTICS_ENDPOINT = '/__stats';
