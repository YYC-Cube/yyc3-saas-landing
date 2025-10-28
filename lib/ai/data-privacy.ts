/**
 * 数据隐私保护工具库
 * 提供数据脱敏、敏感信息检测和隐私保护功能
 */

// 敏感字段列表
const SENSITIVE_FIELDS = [
  "password",
  "ssn",
  "creditCard",
  "bankAccount",
  "idCard",
  "passport",
  "secret",
  "token",
  "apiKey",
]

// 敏感信息正则模式
const PATTERNS = {
  email: /([a-zA-Z0-9._-]+)@([a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g,
  phone: /(\d{3})\d{4}(\d{4})/g,
  idCard: /(\d{6})\d{8}(\d{4})/g,
  creditCard: /(\d{4})\d{8}(\d{4})/g,
  ipAddress: /(\d{1,3}\.\d{1,3}\.)\d{1,3}\.\d{1,3}/g,
}

/**
 * 脱敏单个字符串
 */
export function sanitizeString(text: string): string {
  let sanitized = text

  // 脱敏邮箱
  sanitized = sanitized.replace(PATTERNS.email, (match, name, domain) => {
    const visibleChars = Math.min(2, name.length)
    return `${name.slice(0, visibleChars)}***@${domain}`
  })

  // 脱敏手机号
  sanitized = sanitized.replace(PATTERNS.phone, "$1****$2")

  // 脱敏身份证号
  sanitized = sanitized.replace(PATTERNS.idCard, "$1********$2")

  // 脱敏信用卡号
  sanitized = sanitized.replace(PATTERNS.creditCard, "$1********$2")

  // 脱敏 IP 地址
  sanitized = sanitized.replace(PATTERNS.ipAddress, "$1***.***")

  return sanitized
}

/**
 * 脱敏对象数据
 */
export function sanitizeData<T extends Record<string, any>>(data: T): T {
  if (!data || typeof data !== "object") {
    return data
  }

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeData(item)) as T
  }

  const sanitized = {} as T

  for (const [key, value] of Object.entries(data)) {
    // 移除敏感字段
    if (SENSITIVE_FIELDS.some((field) => key.toLowerCase().includes(field))) {
      sanitized[key as keyof T] = "[REDACTED]" as any
      continue
    }

    // 递归处理嵌套对象
    if (value && typeof value === "object") {
      sanitized[key as keyof T] = sanitizeData(value)
      continue
    }

    // 脱敏字符串
    if (typeof value === "string") {
      sanitized[key as keyof T] = sanitizeString(value) as any
      continue
    }

    sanitized[key as keyof T] = value
  }

  return sanitized
}

/**
 * 检测文本中是否包含敏感信息
 */
export function containsSensitiveInfo(text: string): {
  hasSensitiveInfo: boolean
  types: string[]
} {
  const types: string[] = []

  if (PATTERNS.email.test(text)) types.push("邮箱")
  if (PATTERNS.phone.test(text)) types.push("手机号")
  if (PATTERNS.idCard.test(text)) types.push("身份证号")
  if (PATTERNS.creditCard.test(text)) types.push("信用卡号")
  if (PATTERNS.ipAddress.test(text)) types.push("IP地址")

  return {
    hasSensitiveInfo: types.length > 0,
    types,
  }
}

/**
 * 用户隐私偏好设置
 */
export interface PrivacySettings {
  allowAIProcessing: boolean
  allowDataCollection: boolean
  allowPersonalization: boolean
  dataRetentionDays: number
  autoDeleteHistory: boolean
}

/**
 * 默认隐私设置
 */
export const DEFAULT_PRIVACY_SETTINGS: PrivacySettings = {
  allowAIProcessing: true,
  allowDataCollection: true,
  allowPersonalization: true,
  dataRetentionDays: 90,
  autoDeleteHistory: false,
}

/**
 * 验证用户是否允许 AI 处理
 */
export async function checkAIPermission(userId: string): Promise<boolean> {
  // 这里应该从数据库获取用户设置
  // 暂时返回 true 作为示例
  return true
}

/**
 * 记录数据处理日志
 */
export interface DataProcessingLog {
  userId: string
  action: string
  dataType: string
  purpose: string
  timestamp: Date
  ipAddress?: string
}

export function logDataProcessing(log: DataProcessingLog): void {
  // 记录到审计日志
  console.log("[数据处理日志]", {
    ...log,
    ipAddress: log.ipAddress ? sanitizeString(log.ipAddress) : undefined,
  })
}
