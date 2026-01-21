/**
 * @file YYC3 Logo组件
 * @description 提供YYC3品牌Logo展示
 * @component YYC3Logo
 * @author YYC³
 * @version 1.0.0
 * @created 2025-01-30
 * @updated 2025-01-30
 * @copyright Copyright (c) 2025 YYC³
 * @license MIT
 */

export function YYC3Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative"></div>
      <span className="text-xl font-bold text-foreground">YYC³</span>
    </div>
  )
}
