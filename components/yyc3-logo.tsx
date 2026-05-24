/**
 * @file YYC3 Logo组件
 * @description 提供YYC³品牌Logo展示，集成真实的品牌视觉资源
 * @component YYC3Logo
 * @author YYC³
 * @version 2.1.0
 * @created 2025-01-30
 * @updated 2026-05-22 - 修复 Hydration Error，改用原生 img 标签
 * @copyright Copyright (c) 2025 YYC³
 * @license MIT
 */

export function YYC3Logo({
  className = "",
  size = 32,
  showText = true,
}: {
  className?: string
  size?: number
  showText?: boolean
}) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <img
        src="/yyc3-icons/yyc3_128x128.png"
        alt="YYC³ Logo - 言語云 YanYu Cloud"
        width={size}
        height={size}
        className="rounded-lg object-contain"
        style={{ width: size, height: size }}
      />
      {showText && (
        <span className="text-xl font-bold text-foreground">YYC³</span>
      )}
    </div>
  )
}
