/**
 * @file YYC3 Logo组件
 * @description 提供YYC³品牌Logo展示，集成真实的品牌视觉资源
 * @component YYC3Logo
 * @author YYC³
 * @version 2.0.0
 * @created 2025-01-30
 * @updated 2026-05-22 - 集成 yyc3-icons 图片资源
 * @copyright Copyright (c) 2025 YYC³
 * @license MIT
 */

import Image from "next/image"

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
      <Image
        src="/yyc3-icons/yyc3_128x128.png"
        alt="YYC³ Logo - 言語云 YanYu Cloud"
        width={size}
        height={size}
        className="rounded-lg object-contain"
        priority
      />
      {showText && (
        <span className="text-xl font-bold text-foreground">YYC³</span>
      )}
    </div>
  )
}
