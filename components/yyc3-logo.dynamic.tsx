"use client"

import dynamic from "next/dynamic"
import type { ComponentType } from "react"

const YYC3LogoComponent = dynamic(
  () => import("./yyc3-logo").then((mod) => mod.YYC3Logo as ComponentType<any>),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center space-x-2">
        <div
          className="rounded-lg bg-primary/20 animate-pulse"
          style={{ width: 32, height: 32 }}
        />
        <span className="text-xl font-bold text-foreground">YYC³</span>
      </div>
    ),
  }
)

export { YYC3LogoComponent as YYC3Logo }
