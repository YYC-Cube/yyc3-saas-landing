/**
 * AI 性能优化工具
 * 提供请求去重、批处理和性能监控功能
 */

import { getCachedResponse } from "./cache"
import { trackAIUsage } from "./analytics"

/**
 * 请求去重 Map
 */
const pendingRequests = new Map<string, Promise<any>>()

/**
 * 带缓存和去重的 AI 请求包装器
 */
export async function cachedAIRequest<T>(params: {
  feature: string
  cacheKey: string
  generator: () => Promise<T>
  ttl?: number
  userId?: string
}): Promise<T> {
  const { feature, cacheKey, generator, ttl = 3600, userId = "system" } = params

  const startTime = Date.now()

  try {
    // 检查是否有相同的请求正在进行（请求去重）
    if (pendingRequests.has(cacheKey)) {
      console.log("[请求去重]", cacheKey)
      return await pendingRequests.get(cacheKey)
    }

    // 创建请求 Promise
    const requestPromise = getCachedResponse(
      cacheKey,
      async () => {
        const result = await generator()
        return JSON.stringify(result)
      },
      ttl,
    ).then((cached) => JSON.parse(cached) as T)

    // 存储到去重 Map
    pendingRequests.set(cacheKey, requestPromise)

    // 执行请求
    const result = await requestPromise

    // 记录成功日志
    const latency = Date.now() - startTime
    await trackAIUsage({
      userId,
      feature,
      model: "cached",
      tokensUsed: 0,
      latencyMs: latency,
      success: true,
    })

    return result
  } catch (error) {
    // 记录失败日志
    const latency = Date.now() - startTime
    await trackAIUsage({
      userId,
      feature,
      model: "cached",
      tokensUsed: 0,
      latencyMs: latency,
      success: false,
      errorMessage: error instanceof Error ? error.message : "Unknown error",
    })

    throw error
  } finally {
    // 清理去重 Map
    pendingRequests.delete(cacheKey)
  }
}

/**
 * 批处理请求
 */
export class BatchProcessor<T, R> {
  private queue: Array<{ input: T; resolve: (value: R) => void; reject: (error: any) => void }> = []
  private timer: NodeJS.Timeout | null = null
  private readonly batchSize: number
  private readonly maxWaitMs: number
  private readonly processor: (inputs: T[]) => Promise<R[]>

  constructor(params: { batchSize: number; maxWaitMs: number; processor: (inputs: T[]) => Promise<R[]> }) {
    this.batchSize = params.batchSize
    this.maxWaitMs = params.maxWaitMs
    this.processor = params.processor
  }

  async add(input: T): Promise<R> {
    return new Promise((resolve, reject) => {
      this.queue.push({ input, resolve, reject })

      // 如果达到批处理大小，立即处理
      if (this.queue.length >= this.batchSize) {
        this.flush()
      } else if (!this.timer) {
        // 否则设置定时器
        this.timer = setTimeout(() => this.flush(), this.maxWaitMs)
      }
    })
  }

  private async flush() {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }

    if (this.queue.length === 0) return

    const batch = this.queue.splice(0, this.batchSize)
    const inputs = batch.map((item) => item.input)

    try {
      const results = await this.processor(inputs)

      batch.forEach((item, index) => {
        item.resolve(results[index])
      })
    } catch (error) {
      batch.forEach((item) => {
        item.reject(error)
      })
    }
  }
}

/**
 * 流式响应优化
 */
export function optimizeStreamResponse(stream: ReadableStream): ReadableStream {
  // 添加流式响应的性能优化
  // 例如：压缩、分块优化等
  return stream
}

/**
 * 性能指标收集
 */
export interface PerformanceMetrics {
  requestCount: number
  avgLatency: number
  p95Latency: number
  p99Latency: number
  errorRate: number
  cacheHitRate: number
}

const metricsWindow: Array<{ latency: number; success: boolean; cached: boolean }> = []
const MAX_METRICS_SIZE = 1000

export function recordMetric(latency: number, success: boolean, cached: boolean) {
  metricsWindow.push({ latency, success, cached })

  // 保持窗口大小
  if (metricsWindow.length > MAX_METRICS_SIZE) {
    metricsWindow.shift()
  }
}

export function getPerformanceMetrics(): PerformanceMetrics {
  if (metricsWindow.length === 0) {
    return {
      requestCount: 0,
      avgLatency: 0,
      p95Latency: 0,
      p99Latency: 0,
      errorRate: 0,
      cacheHitRate: 0,
    }
  }

  const latencies = metricsWindow.map((m) => m.latency).sort((a, b) => a - b)
  const successCount = metricsWindow.filter((m) => m.success).length
  const cachedCount = metricsWindow.filter((m) => m.cached).length

  return {
    requestCount: metricsWindow.length,
    avgLatency: latencies.reduce((a, b) => a + b, 0) / latencies.length,
    p95Latency: latencies[Math.floor(latencies.length * 0.95)],
    p99Latency: latencies[Math.floor(latencies.length * 0.99)],
    errorRate: ((metricsWindow.length - successCount) / metricsWindow.length) * 100,
    cacheHitRate: (cachedCount / metricsWindow.length) * 100,
  }
}
