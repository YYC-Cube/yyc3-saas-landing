/**
 * AI 响应缓存管理
 * 提供智能缓存策略以提升性能和降低成本
 */

import { Redis } from "@upstash/redis"

// 初始化 Redis 客户端（如果配置了 Upstash）
let redis: Redis | null = null

if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
  redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  })
}

/**
 * 生成缓存键
 */
export function generateCacheKey(feature: string, params: Record<string, any>): string {
  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}:${JSON.stringify(params[key])}`)
    .join("|")

  return `ai:${feature}:${sortedParams}`
}

/**
 * 获取缓存的响应
 */
export async function getCachedResponse(key: string, generator: () => Promise<string>, ttl = 3600): Promise<string> {
  // 如果没有配置 Redis，直接生成响应
  if (!redis) {
    return await generator()
  }

  try {
    // 检查缓存
    const cached = await redis.get(key)
    if (cached) {
      console.log("[缓存命中]", key)
      return cached as string
    }

    // 生成新响应
    console.log("[缓存未命中]", key)
    const response = await generator()

    // 缓存响应
    await redis.setex(key, ttl, response)

    return response
  } catch (error) {
    console.error("[缓存错误]", error)
    // 缓存失败时直接返回生成的响应
    return await generator()
  }
}

/**
 * 使缓存失效
 */
export async function invalidateCache(pattern: string): Promise<void> {
  if (!redis) return

  try {
    const keys = await redis.keys(pattern)
    if (keys.length > 0) {
      await redis.del(...keys)
      console.log("[缓存失效]", `删除 ${keys.length} 个缓存`)
    }
  } catch (error) {
    console.error("[缓存失效错误]", error)
  }
}

/**
 * 缓存统计信息
 */
export interface CacheStats {
  hits: number
  misses: number
  hitRate: number
  totalKeys: number
}

export async function getCacheStats(): Promise<CacheStats> {
  if (!redis) {
    return { hits: 0, misses: 0, hitRate: 0, totalKeys: 0 }
  }

  try {
    const keys = await redis.keys("ai:*")
    // 这里简化处理，实际应该从专门的统计表获取
    return {
      hits: 0,
      misses: 0,
      hitRate: 0,
      totalKeys: keys.length,
    }
  } catch (error) {
    console.error("[获取缓存统计错误]", error)
    return { hits: 0, misses: 0, hitRate: 0, totalKeys: 0 }
  }
}
