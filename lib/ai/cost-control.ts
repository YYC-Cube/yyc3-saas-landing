/**
 * AI 成本控制工具
 * 提供使用限制、预算管理和成本优化功能
 */

export interface UsageLimit {
  plan: "starter" | "professional" | "enterprise"
  monthlyTokenLimit: number
  monthlyCostLimit: number
  dailyRequestLimit: number
}

const PLAN_LIMITS: Record<string, UsageLimit> = {
  starter: {
    plan: "starter",
    monthlyTokenLimit: 100000,
    monthlyCostLimit: 10,
    dailyRequestLimit: 1000,
  },
  professional: {
    plan: "professional",
    monthlyTokenLimit: 1000000,
    monthlyCostLimit: 100,
    dailyRequestLimit: 10000,
  },
  enterprise: {
    plan: "enterprise",
    monthlyTokenLimit: Number.POSITIVE_INFINITY,
    monthlyCostLimit: Number.POSITIVE_INFINITY,
    dailyRequestLimit: Number.POSITIVE_INFINITY,
  },
}

/**
 * 检查用户使用限制
 */
export async function checkUsageLimit(userId: string): Promise<{
  allowed: boolean
  reason?: string
  remaining: {
    tokens: number
    cost: number
    requests: number
  }
}> {
  // 这里应该从数据库获取用户的订阅方案和使用量
  // 暂时使用模拟数据
  const userPlan = "professional"
  const limits = PLAN_LIMITS[userPlan]

  // 模拟当前使用量
  const currentUsage = {
    monthlyTokens: 456789,
    monthlyCost: 45.67,
    dailyRequests: 1234,
  }

  // 检查各项限制
  if (currentUsage.monthlyTokens >= limits.monthlyTokenLimit) {
    return {
      allowed: false,
      reason: "已达到月度 Token 使用限制",
      remaining: {
        tokens: 0,
        cost: limits.monthlyCostLimit - currentUsage.monthlyCost,
        requests: limits.dailyRequestLimit - currentUsage.dailyRequests,
      },
    }
  }

  if (currentUsage.monthlyCost >= limits.monthlyCostLimit) {
    return {
      allowed: false,
      reason: "已达到月度成本限制",
      remaining: {
        tokens: limits.monthlyTokenLimit - currentUsage.monthlyTokens,
        cost: 0,
        requests: limits.dailyRequestLimit - currentUsage.dailyRequests,
      },
    }
  }

  if (currentUsage.dailyRequests >= limits.dailyRequestLimit) {
    return {
      allowed: false,
      reason: "已达到每日请求限制",
      remaining: {
        tokens: limits.monthlyTokenLimit - currentUsage.monthlyTokens,
        cost: limits.monthlyCostLimit - currentUsage.monthlyCost,
        requests: 0,
      },
    }
  }

  return {
    allowed: true,
    remaining: {
      tokens: limits.monthlyTokenLimit - currentUsage.monthlyTokens,
      cost: limits.monthlyCostLimit - currentUsage.monthlyCost,
      requests: limits.dailyRequestLimit - currentUsage.dailyRequests,
    },
  }
}

/**
 * 成本优化建议
 */
export interface CostOptimization {
  currentCost: number
  potentialSavings: number
  recommendations: Array<{
    title: string
    description: string
    estimatedSavings: number
    priority: "high" | "medium" | "low"
  }>
}

export async function getCostOptimizations(userId: string): Promise<CostOptimization> {
  // 分析用户的使用模式并提供优化建议
  return {
    currentCost: 45.67,
    potentialSavings: 12.34,
    recommendations: [
      {
        title: "启用响应缓存",
        description: "对重复查询启用缓存可以减少 30% 的 API 调用",
        estimatedSavings: 6.78,
        priority: "high",
      },
      {
        title: "使用更经济的模型",
        description: "对简单任务使用 GPT-3.5 而非 GPT-4 可以节省 50% 成本",
        estimatedSavings: 3.45,
        priority: "medium",
      },
      {
        title: "优化 Prompt 长度",
        description: "精简 Prompt 可以减少 Token 使用量",
        estimatedSavings: 2.11,
        priority: "low",
      },
    ],
  }
}

/**
 * 预算告警
 */
export async function checkBudgetAlert(userId: string): Promise<{
  shouldAlert: boolean
  level: "warning" | "critical" | null
  message: string
}> {
  const limit = await checkUsageLimit(userId)

  // 检查是否接近限制
  const tokenUsagePercent = (1 - limit.remaining.tokens / PLAN_LIMITS.professional.monthlyTokenLimit) * 100
  const costUsagePercent = (1 - limit.remaining.cost / PLAN_LIMITS.professional.monthlyCostLimit) * 100

  if (tokenUsagePercent >= 90 || costUsagePercent >= 90) {
    return {
      shouldAlert: true,
      level: "critical",
      message: `您已使用 ${Math.max(tokenUsagePercent, costUsagePercent).toFixed(1)}% 的月度配额`,
    }
  }

  if (tokenUsagePercent >= 75 || costUsagePercent >= 75) {
    return {
      shouldAlert: true,
      level: "warning",
      message: `您已使用 ${Math.max(tokenUsagePercent, costUsagePercent).toFixed(1)}% 的月度配额`,
    }
  }

  return {
    shouldAlert: false,
    level: null,
    message: "",
  }
}
