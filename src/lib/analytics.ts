/**
 * 简易访客统计
 *
 * 使用 countapi.xyz（免费）记录页面访问量，无需注册、无需付费。
 * 每个页面独立计数，数据存储在云端。
 *
 * 如需查看统计，访问：
 * https://api.countapi.xyz/get/GoNavi-Website/{path}
 * 例如首页：https://api.countapi.xyz/get/GoNavi-Website/index
 */

export const ANALYTICS_NAMESPACE = 'GoNavi-Website';

/** 是否启用统计（默认开启，设为 false 可关闭） */
export const isAnalyticsEnabled = true;