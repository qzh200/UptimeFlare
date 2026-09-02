// This is a simplified example config file for quickstart
// Some not frequently used features are omitted/commented out here
// For a full-featured example, please refer to `uptime.config.full.ts`

// Don't edit this line
import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  // Title for your status page
  title: 'hoshiumi',
  // Links shown at the header of your status page, could set `highlight` to `true`
  links: [
    { link: 'https://github.com/qzh200', label: 'GitHub' },
    { link: 'https://blog.hoshiumi.xyz/', label: 'Blog' },
    { link: 'mailto:hi@hoshiumi.xyz', label: 'Email Me', highlight: true },
  ],
}

const workerConfig: WorkerConfig = {
  // Define all your monitors here
  monitors: [
  {
    id: 'blog',
    name: 'Hoshiumi Blog',
    method: 'GET',
    target: 'https://blog.hoshiumi.xyz/',
    tooltip: '个人博客',
    statusPageLink: 'https://blog.hoshiumi.xyz/',
    expectedCodes: [200],
    timeout: 10000,
  },
  {
    id: 'sink',
    name: 'Sink',
    method: 'GET',
    target: 'https://sink.hoshiumi.xyz/',
    tooltip: '短链接服务',
    statusPageLink: 'https://sink.hoshiumi.xyz/',
    expectedCodes: [200],
    timeout: 10000,
  },
  {
    id: 'comment',
    name: 'Comment',
    method: 'GET',
    target: 'https://comment.hoshiumi.xyz/',
    tooltip: 'Waline 评论服务',
    statusPageLink: 'https://comment.hoshiumi.xyz/',
    expectedCodes: [200],
    timeout: 10000,
  },
  {
    id: 'r2',
    name: 'R2 Storage',
    method: 'GET',
    target: 'https://r2.hoshiumi.xyz/old_img/ChatGPT%20Image%202026%E5%B9%B47%E6%9C%8827%E6%97%A5%2010_12_09.png',
    tooltip: '博客 R2 静态资源',
    statusPageLink: 'https://blog.hoshiumi.xyz/',
    expectedCodes: [200],
    timeout: 10000,
  },
],
  // [Optional] Notification settings
  notification: {
    // [Optional] Notification webhook settings, if not specified, no notification will be sent
    // More info at Wiki: https://github.com/lyc8503/UptimeFlare/wiki/Setup-notification
    webhook: {
      // [Required] webhook URL (example: Telegram Bot API)
      url: 'https://api.telegram.org/bot123456:ABCDEF/sendMessage',
      // [Optional] HTTP method, default to 'GET' for payloadType=param, 'POST' otherwise
      // method: 'POST',
      // [Optional] headers to be sent
      // headers: {
      //   foo: 'bar',
      // },
      // [Required] Specify how to encode the payload
      // Should be one of 'param', 'json' or 'x-www-form-urlencoded'
      // 'param': append url-encoded payload to URL search parameters
      // 'json': POST json payload as body, set content-type header to 'application/json'
      // 'x-www-form-urlencoded': POST url-encoded payload as body, set content-type header to 'x-www-form-urlencoded'
      payloadType: 'x-www-form-urlencoded',
      // [Required] payload to be sent
      // $MSG will be replaced with the human-readable notification message
      payload: {
        chat_id: 12345678,
        text: '$MSG',
      },
      // [Optional] timeout calling this webhook, in millisecond, default to 5000
      timeout: 10000,
    },
    // [Optional] timezone used in notification messages, default to "Etc/GMT"
    timeZone: 'Asia/Shanghai',
    // [Optional] grace period in minutes before sending a notification
    // notification will be sent only if the monitor is down for N continuous checks after the initial failure
    // if not specified, notification will be sent immediately
    gracePeriod: 5,
  },
}

// You can define multiple maintenances here
// During maintenance, an alert will be shown at status page
// Also, related downtime notifications will be skipped (if any)
// Of course, you can leave it empty if you don't need this feature
//
// Example:
// const maintenances: MaintenanceConfig[] = [
//   {
//     monitors: ['blog'],
//     title: 'Blog maintenance',
//     body: 'Database migration in progress.',
//     start: '2026-01-01T00:00:00+08:00',
//     end: '2026-01-01T01:00:00+08:00',
//     color: 'blue',
//   },
// ]

const maintenances: MaintenanceConfig[] = []

// Don't edit this line
export { maintenances, pageConfig, workerConfig }
